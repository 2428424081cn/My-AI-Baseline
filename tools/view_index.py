#!/usr/bin/env python3
"""Selective viewer, embed generator, and validator for index.md.

Index line format (manual edits follow the same format):
    part --- style --- sample --- path

Examples:
    python tools/view_index.py                      # summary by part & style
    python tools/view_index.py -s md3 -t css        # all md3 CSS files
    python tools/view_index.py -s linekit button    # search 'button' in linekit
    python tools/view_index.py -s nebula -t svg -k search
    python tools/view_index.py -s md3 button --embed
    python tools/view_index.py -s md3 button --cat
    python tools/view_index.py --check              # verify paths & coverage
    python tools/view_index.py -i                   # interactive filter mode
"""
from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
INDEX_FILE = ROOT / "index.md"
SKIP_DIRS = {".git", "分离前效果", "__pycache__"}


@dataclass(frozen=True)
class Entry:
    line_no: int
    part: str
    style: str
    sample: str
    path: str

    @property
    def kind(self) -> str:
        head = self.sample.split(" ", 1)[0]
        return head.split(":", 1)[0].lower()

    @property
    def tag(self) -> str:
        return self.sample.split(" ", 1)[0].lower()

    def format_line(self) -> str:
        return f"{self.part} --- {self.style} --- {self.sample} --- {self.path}"


def parse_index(index_path: Path = INDEX_FILE) -> tuple[list[Entry], list[tuple[int, str]]]:
    entries: list[Entry] = []
    bad_lines: list[tuple[int, str]] = []
    for i, raw in enumerate(index_path.read_text(encoding="utf-8").splitlines(), 1):
        s = raw.strip()
        if not s or s.startswith("#"):
            continue
        parts = [p.strip() for p in s.split("---")]
        if len(parts) != 4 or not all(parts):
            bad_lines.append((i, raw))
            continue
        entries.append(Entry(i, parts[0], parts[1], parts[2], parts[3]))
    return entries, bad_lines


def filter_entries(
    entries: list[Entry],
    part: str | None = None,
    style: str | None = None,
    kind: str | None = None,
    keywords: list[str] | None = None,
) -> list[Entry]:
    res = entries
    if part:
        p = part.lower()
        res = [e for e in res if e.part.lower() == p]
    if style:
        s = style.lower()
        res = [e for e in res if e.style.lower() == s]
    if kind:
        t = kind.lower()
        res = [e for e in res if e.kind == t or e.tag == t or t in e.tag.split(":")]
    for kw in keywords or []:
        k = kw.lower()
        res = [
            e for e in res
            if k in e.part.lower()
            or k in e.style.lower()
            or k in e.sample.lower()
            or k in e.path.lower()
        ]
    return res


def embed_snippet(e: Entry) -> str:
    p = e.path
    if p.endswith(".css"):
        return f'<link rel="stylesheet" href="{p}">'
    if p.endswith(".js"):
        defer = " defer" if e.style == "linekit" else ""
        return f'<script src="{p}"{defer}></script>'
    if e.tag == "svg:favicon":
        return f'<link rel="icon" type="image/svg+xml" href="{p}">'
    if p.endswith(".svg"):
        return (ROOT / p).read_text(encoding="utf-8").strip()
    return f"# {p}"


def print_summary(entries: list[Entry]) -> None:
    print(f"index.md: {len(entries)} entries\n")
    groups: Counter[tuple[str, str]] = Counter((e.part, e.style) for e in entries)
    for (part, style), total in sorted(groups.items()):
        sub = [e for e in entries if e.part == part and e.style == style]
        kinds = ", ".join(f"{k}:{v}" for k, v in sorted(Counter(e.kind for e in sub).items()))
        print(f"  {part:<8} {style:<10} {total:>3}  ({kinds})")
    print("\nExamples:")
    print("  python tools/view_index.py -s md3 -t css")
    print("  python tools/view_index.py -s linekit button --embed")
    print("  python tools/view_index.py -s nebula -t icon -k search")
    print("  python tools/view_index.py -i")


def check_index(entries: list[Entry], bad_lines: list[tuple[int, str]]) -> int:
    ok = True
    if bad_lines:
        ok = False
        print("Format errors:")
        for ln, text in bad_lines:
            print(f"  line {ln}: {text}")

    missing = [e for e in entries if not (ROOT / e.path).exists()]
    if missing:
        ok = False
        print("Missing files referenced in index.md:")
        for e in missing:
            print(f"  line {e.line_no}: {e.path}")

    dups = [p for p, c in Counter(e.path for e in entries).items() if c > 1]
    if dups:
        ok = False
        print("Duplicate paths in index.md:")
        for p in dups:
            print(f"  {p}")

    indexed = {e.path for e in entries}
    unindexed: list[str] = []
    for path in sorted(ROOT.rglob("*")):
        if path.is_dir():
            continue
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        rel_s = rel.as_posix()
        if rel_s.lower() == "index.md":
            continue
        if rel_s not in indexed:
            unindexed.append(rel_s)
    if unindexed:
        ok = False
        print("Files in repo not listed in index.md:")
        for u in unindexed:
            print(f"  {u}")

    if ok:
        print(f"OK: {len(entries)} entries, 0 format errors, 0 missing, 0 unindexed.")
    return 0 if ok else 1


def interactive(entries: list[Entry]) -> int:
    parts = sorted({e.part for e in entries})
    styles = sorted({e.style for e in entries})
    kinds = sorted({e.kind for e in entries})
    print(f"Parts  : {', '.join(parts)}")
    print(f"Styles : {', '.join(styles)}")
    print(f"Types  : {', '.join(kinds)}")
    print("Press Enter to skip any filter.\n")

    part = input("Part   > ").strip() or None
    style = input("Style  > ").strip() or None
    kind = input("Type   > ").strip() or None
    kw_raw = input("Keyword> ").strip()
    keywords = kw_raw.split() if kw_raw else []
    mode = input("Output [list/paths/embed/cat] (default: list)> ").strip().lower() or "list"

    matched = filter_entries(entries, part, style, kind, keywords)
    print(f"\nMatched {len(matched)} entries:\n")
    render_results(matched, mode)
    return 0


def render_results(matched: list[Entry], mode: str) -> None:
    if not matched:
        print("(no matches)")
        return
    if mode == "paths":
        for e in matched:
            print(e.path)
    elif mode == "embed":
        for e in matched:
            print(embed_snippet(e))
    elif mode == "cat":
        for e in matched:
            print(f"===== {e.path} =====")
            print((ROOT / e.path).read_text(encoding="utf-8"))
    else:
        for e in matched:
            print(e.format_line())


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    parser = argparse.ArgumentParser(
        description="Selective viewer for index.md (format: part --- style --- sample --- path)."
    )
    parser.add_argument("keywords", nargs="*", help="Keywords to match across all fields")
    parser.add_argument("-p", "--part", help="Filter by part (e.g. design, tools, spec)")
    parser.add_argument("-s", "--style", help="Filter by style (e.g. linekit, md3, nebula, brand)")
    parser.add_argument("-t", "--type", dest="kind", help="Filter by type/tag (e.g. css, svg, js, icon, button)")
    parser.add_argument("-k", "--keyword", action="append", default=[], help="Extra keyword filter (repeatable)")
    parser.add_argument("-a", "--all", action="store_true", help="Show all entries")
    parser.add_argument("--paths", action="store_true", help="Print file paths only")
    parser.add_argument("--embed", action="store_true", help="Print ready-to-embed HTML/SVG snippets")
    parser.add_argument("--cat", action="store_true", help="Print file contents of matched entries")
    parser.add_argument("--check", action="store_true", help="Validate index.md format, paths, and coverage")
    parser.add_argument("-i", "--interactive", action="store_true", help="Interactive filter prompt")
    args = parser.parse_args()

    entries, bad_lines = parse_index()

    if args.check:
        return check_index(entries, bad_lines)
    if args.interactive:
        return interactive(entries)

    keywords = [*args.keywords, *args.keyword]
    has_filter = any([args.all, args.part, args.style, args.kind, keywords])
    if not has_filter:
        print_summary(entries)
        return 0

    matched = filter_entries(entries, args.part, args.style, args.kind, keywords)
    mode = "cat" if args.cat else "embed" if args.embed else "paths" if args.paths else "list"
    render_results(matched, mode)
    return 0


if __name__ == "__main__":
    sys.exit(main())
