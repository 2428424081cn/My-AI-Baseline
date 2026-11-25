#!/usr/bin/env python3
"""Hash-chained, append-only event log (SPEC.md §11, Appendix B.3).

The only allowed writer of .project/logs/events.jsonl.

Usage:
  python tools/log_append.py append --agent dev-01 --task T-001 --type CMD_EXEC \
      --level L0 --action "pytest -q" --result pass [--detail-ref PATH] [--approval-ref A-001]
  python tools/log_append.py verify
"""
import argparse
import hashlib
import json
import pathlib
import sys
import time

DEFAULT_LOG = pathlib.Path(".project/logs/events.jsonl")


def _digest(event: dict) -> str:
    body = json.dumps(event, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(body.encode("utf-8")).hexdigest()


def append(event: dict, log: pathlib.Path = DEFAULT_LOG) -> dict:
    log.parent.mkdir(parents=True, exist_ok=True)
    prev, seq = "GENESIS", 1
    if log.exists() and log.stat().st_size > 0:
        last = json.loads(log.read_text(encoding="utf-8").strip().splitlines()[-1])
        prev, seq = last["hash"], last["seq"] + 1
    record = {"seq": seq, "ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"), **event, "prev_hash": prev}
    record["hash"] = _digest(record)  # hash covers every field except "hash"
    with log.open("a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False, sort_keys=True) + "\n")
    return record


def verify(log: pathlib.Path = DEFAULT_LOG) -> bool:
    if not log.exists():
        return True
    prev = "GENESIS"
    for line in log.read_text(encoding="utf-8").splitlines():
        rec = json.loads(line)
        h = rec.pop("hash")
        if rec["prev_hash"] != prev or _digest(rec) != h:
            print(f"chain broken at seq {rec.get('seq')}", file=sys.stderr)
            return False
        prev = h
    return True


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--log", type=pathlib.Path, default=DEFAULT_LOG)
    sub = p.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("append")
    for name in ("agent", "task", "type", "level", "action"):
        a.add_argument(f"--{name}", required=True)
    a.add_argument("--target")
    a.add_argument("--result")
    a.add_argument("--detail-ref")
    a.add_argument("--approval-ref")
    sub.add_parser("verify")
    args = p.parse_args()

    if args.cmd == "verify":
        ok = verify(args.log)
        print("OK" if ok else "BROKEN")
        return 0 if ok else 1

    event = {
        "agent": args.agent, "task": args.task, "type": args.type, "level": args.level,
        "action": args.action, "target": args.target, "result": args.result,
        "detail_ref": args.detail_ref, "approval_ref": args.approval_ref,
    }
    print(json.dumps(append(event, args.log), ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
