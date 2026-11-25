/* ==========================================================================
   Linen M3 Design System — Decoupled Vanilla JS Runtime
   Zero Dependencies | Event Delegation | CustomEvents | A11y Ready
   Works with static HTML AND dynamically injected DOM without manual re-bind.
   ========================================================================== */
(function (global) {
  'use strict';

  var LM3 = (global.LinenM3 = global.LinenM3 || {});

  /* ---- Helpers ---- */
  function emit(target, name, detail) {
    if (!target) return;
    target.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail || {} }));
  }

  function qs(sel, root) {
    if (!sel) return null;
    if (typeof sel !== 'string') return sel;
    return (root || document).querySelector(sel);
  }

  function safeStorageGet(key) {
    try { return global.localStorage ? global.localStorage.getItem(key) : null; }
    catch (e) { return null; }
  }

  function safeStorageSet(key, val) {
    try { if (global.localStorage) global.localStorage.setItem(key, val); }
    catch (e) { /* Ignore in restricted sandboxes */ }
  }

  function prefersReducedMotion() {
    return global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ========================================================================
     1. MD3 Radial Touch Ripple (Delegated)
     ======================================================================== */
  var RIPPLE_SELECTOR =
    '.lm3-btn, .lm3-icon-btn, .lm3-fab, .lm3-chip, .lm3-segmented__btn, ' +
    '.lm3-nav-item, .lm3-tab, .lm3-menu__item, .lm3-list-item--interactive, [data-lm3-ripple="true"]';

  function spawnRipple(el, event) {
    if (!el || prefersReducedMotion()) return;
    if (document.documentElement.getAttribute('data-lm3-ripple') === 'false') return;
    if (el.getAttribute('data-lm3-ripple') === 'false' || el.disabled) return;
    var rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    var x = typeof event.clientX === 'number' ? event.clientX - rect.left : rect.width / 2;
    var y = typeof event.clientY === 'number' ? event.clientY - rect.top : rect.height / 2;
    var maxX = Math.max(x, rect.width - x);
    var maxY = Math.max(y, rect.height - y);
    var radius = Math.sqrt(maxX * maxX + maxY * maxY);

    var ripple = document.createElement('span');
    ripple.className = 'lm3-ripple';
    ripple.style.width = radius * 2 + 'px';
    ripple.style.height = radius * 2 + 'px';
    ripple.style.left = x - radius + 'px';
    ripple.style.top = y - radius + 'px';
    el.appendChild(ripple);

    var cleaned = false;
    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }
    ripple.addEventListener('animationend', cleanup, { once: true });
    setTimeout(cleanup, 620);
  }

  /* ========================================================================
     2. Tabs Controller (Sliding Ink Indicator / Pill Indicator)
     ======================================================================== */
  function updateTabIndicator(tablist) {
    if (!tablist) return;
    var active = tablist.querySelector('.lm3-tab[aria-selected="true"]');
    var indicator = tablist.querySelector('.lm3-tablist__indicator');
    if (!indicator) {
      indicator = document.createElement('span');
      indicator.className = 'lm3-tablist__indicator';
      indicator.setAttribute('aria-hidden', 'true');
      tablist.appendChild(indicator);
    }
    if (!active) {
      indicator.style.width = '0px';
      return;
    }
    var listRect = tablist.getBoundingClientRect();
    var tabRect = active.getBoundingClientRect();
    var left = tabRect.left - listRect.left + tablist.scrollLeft;
    indicator.style.width = tabRect.width + 'px';
    indicator.style.transform = 'translateX(' + left + 'px)';
  }

  function selectTab(tab) {
    if (!tab) return;
    var tabsRoot = tab.closest('[data-lm3-tabs], .lm3-tabs');
    var tablist = tab.closest('.lm3-tablist');
    if (!tablist) return;

    var tabs = Array.prototype.slice.call(tablist.querySelectorAll('.lm3-tab'));
    var idx = tabs.indexOf(tab);
    tabs.forEach(function (t) {
      var isTarget = t === tab;
      t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      t.setAttribute('tabindex', isTarget ? '0' : '-1');
    });
    updateTabIndicator(tablist);

    var targetId = tab.getAttribute('aria-controls') || tab.getAttribute('data-target');
    var panel = null;
    if (tabsRoot) {
      var panels = tabsRoot.querySelectorAll(':scope > .lm3-tabpanel, :scope > .lm3-tabpanels > .lm3-tabpanel');
      Array.prototype.forEach.call(panels, function (p, pIdx) {
        var match = targetId ? p.id === targetId : pIdx === idx;
        if (match) {
          p.removeAttribute('hidden');
          panel = p;
        } else {
          p.setAttribute('hidden', '');
        }
      });
    }
    emit(tabsRoot || tablist, 'lm3:tab-change', { tab: tab, panel: panel, index: idx, targetId: targetId });
  }

  function refreshTabs(root) {
    var lists = (root || document).querySelectorAll('.lm3-tablist');
    Array.prototype.forEach.call(lists, updateTabIndicator);
  }

  LM3.tabs = {
    select: selectTab,
    refresh: refreshTabs
  };

  /* ========================================================================
     3. Expressive Sliders
     ======================================================================== */
  function syncSlider(sliderEl) {
    if (!sliderEl) return;
    var input = sliderEl.querySelector('.lm3-slider__input');
    if (!input) return;
    var min = parseFloat(input.min || '0');
    var max = parseFloat(input.max || '100');
    var val = parseFloat(input.value || '0');
    var pct = max > min ? ((val - min) / (max - min)) * 100 : 0;
    pct = Math.max(0, Math.min(100, pct));
    sliderEl.style.setProperty('--lm3-slider-pct', pct + '%');

    var unit = sliderEl.getAttribute('data-unit') || '';
    var decimals = sliderEl.getAttribute('data-decimals');
    var formatted = decimals !== null ? val.toFixed(parseInt(decimals, 10)) + unit : val + unit;

    var bubble = sliderEl.querySelector('.lm3-slider__bubble');
    if (bubble) bubble.textContent = formatted;
    var valText = sliderEl.querySelector('.lm3-slider__value-text');
    if (valText) valText.textContent = formatted;
  }

  function refreshSliders(root) {
    var sliders = (root || document).querySelectorAll('.lm3-slider');
    Array.prototype.forEach.call(sliders, syncSlider);
  }

  LM3.slider = {
    sync: syncSlider,
    refresh: refreshSliders
  };

  /* ========================================================================
     4. Dialog & Side Sheet Managers
     ======================================================================== */
  var lastFocusedEl = null;

  function openOverlay(backdrop, eventName) {
    if (!backdrop) return;
    lastFocusedEl = document.activeElement;
    backdrop.classList.add('is-open');
    backdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    var focusTarget = backdrop.querySelector('[autofocus], input, textarea, button:not([data-lm3-dialog-close]):not([data-lm3-sheet-close])');
    if (focusTarget) {
      setTimeout(function () { try { focusTarget.focus(); } catch (e) {} }, 60);
    }
    emit(backdrop, eventName, { element: backdrop });
  }

  function closeOverlay(backdrop, eventName) {
    if (!backdrop || !backdrop.classList.contains('is-open')) return;
    backdrop.classList.remove('is-open');
    backdrop.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.lm3-dialog-backdrop.is-open, .lm3-sheet-backdrop.is-open')) {
      document.body.style.overflow = '';
    }
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      try { lastFocusedEl.focus(); } catch (e) {}
      lastFocusedEl = null;
    }
    emit(backdrop, eventName, { element: backdrop });
  }

  LM3.dialog = {
    open: function (target) { openOverlay(qs(target), 'lm3:dialog-open'); },
    close: function (target) { closeOverlay(qs(target), 'lm3:dialog-close'); },
    closeAll: function () {
      var list = document.querySelectorAll('.lm3-dialog-backdrop.is-open');
      Array.prototype.forEach.call(list, function (el) { closeOverlay(el, 'lm3:dialog-close'); });
    }
  };

  LM3.sheet = {
    open: function (target) { openOverlay(qs(target), 'lm3:sheet-open'); },
    close: function (target) { closeOverlay(qs(target), 'lm3:sheet-close'); },
    closeAll: function () {
      var list = document.querySelectorAll('.lm3-sheet-backdrop.is-open');
      Array.prototype.forEach.call(list, function (el) { closeOverlay(el, 'lm3:sheet-close'); });
    }
  };

  /* ========================================================================
     5. Dropdown Menu Manager
     ======================================================================== */
  function closeAllDropdowns(except) {
    var open = document.querySelectorAll('.lm3-dropdown.is-open');
    Array.prototype.forEach.call(open, function (dd) {
      if (dd !== except) {
        dd.classList.remove('is-open');
        var trig = dd.querySelector('[data-lm3-dropdown-trigger]');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      }
    });
  }

  LM3.dropdown = {
    closeAll: closeAllDropdowns
  };

  /* ========================================================================
     6. Snackbar / Toast Engine
     ======================================================================== */
  var toastViewport = null;

  function ensureToastViewport() {
    if (toastViewport && document.body.contains(toastViewport)) return toastViewport;
    toastViewport = document.createElement('div');
    toastViewport.className = 'lm3-toast-viewport';
    toastViewport.setAttribute('role', 'region');
    toastViewport.setAttribute('aria-live', 'polite');
    toastViewport.setAttribute('aria-label', '通知提示');
    document.body.appendChild(toastViewport);
    return toastViewport;
  }

  var TOAST_ICONS = {
    info: 'info',
    success: 'check-circle',
    warning: 'alert-triangle',
    error: 'alert-circle'
  };

  function toast(options) {
    if (typeof options === 'string') {
      options = { message: options };
    }
    options = options || {};
    var message = options.message || '';
    var variant = options.variant || 'info';
    var duration = typeof options.duration === 'number' ? options.duration : 3600;

    var vp = ensureToastViewport();
    var el = document.createElement('div');
    el.className = 'lm3-toast lm3-toast--' + variant;
    el.setAttribute('role', 'status');

    var iconHtml = LM3.icons
      ? LM3.icons.render(options.icon || TOAST_ICONS[variant] || 'sparkle', { size: 18 })
      : '';

    el.innerHTML =
      (iconHtml ? '<span class="lm3-toast__icon">' + iconHtml + '</span>' : '') +
      '<span class="lm3-toast__msg"></span>' +
      (options.actionLabel ? '<button type="button" class="lm3-toast__action"></button>' : '') +
      '<button type="button" class="lm3-toast__close" aria-label="关闭">' +
      (LM3.icons ? LM3.icons.render('close', { size: 15 }) : '&times;') +
      '</button>';

    el.querySelector('.lm3-toast__msg').textContent = message;

    var dismissed = false;
    var timer = null;

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearTimeout(timer);
      el.classList.remove('is-visible');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 260);
    }

    var actionBtn = el.querySelector('.lm3-toast__action');
    if (actionBtn && options.actionLabel) {
      actionBtn.textContent = options.actionLabel;
      actionBtn.addEventListener('click', function () {
        if (typeof options.onAction === 'function') options.onAction();
        dismiss();
      });
    }

    el.querySelector('.lm3-toast__close').addEventListener('click', dismiss);

    vp.appendChild(el);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.classList.add('is-visible');
      });
    });

    if (duration > 0) {
      timer = setTimeout(dismiss, duration);
      el.addEventListener('mouseenter', function () { clearTimeout(timer); });
      el.addEventListener('mouseleave', function () { timer = setTimeout(dismiss, 1400); });
    }

    emit(document, 'lm3:toast', { message: message, variant: variant });
    return { dismiss: dismiss, element: el };
  }

  LM3.toast = toast;

  /* ========================================================================
     7. Theme & Material You Accent Controller
     ======================================================================== */
  var ACCENTS = ['terracotta', 'sage', 'indigo', 'amber'];

  function getMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function setMode(mode) {
    var next = mode === 'toggle' ? (getMode() === 'dark' ? 'light' : 'dark') : mode;
    if (next !== 'dark' && next !== 'light') next = 'light';
    document.documentElement.setAttribute('data-theme', next);
    safeStorageSet('lm3-theme-mode', next);
    syncThemeControls();
    emit(document, 'lm3:theme-change', { mode: next, accent: getAccent() });
    return next;
  }

  function getAccent() {
    return document.documentElement.getAttribute('data-accent') || 'terracotta';
  }

  function setAccent(accent) {
    if (ACCENTS.indexOf(accent) === -1) accent = 'terracotta';
    if (accent === 'terracotta') {
      document.documentElement.removeAttribute('data-accent');
    } else {
      document.documentElement.setAttribute('data-accent', accent);
    }
    safeStorageSet('lm3-theme-accent', accent);
    syncThemeControls();
    emit(document, 'lm3:theme-change', { mode: getMode(), accent: accent });
    return accent;
  }

  function syncThemeControls() {
    var mode = getMode();
    var accent = getAccent();
    var toggles = document.querySelectorAll('[data-lm3-theme-toggle]');
    Array.prototype.forEach.call(toggles, function (btn) {
      btn.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
      var iconEl = btn.querySelector('[data-lm3-theme-icon]');
      if (iconEl && LM3.icons) {
        iconEl.innerHTML = LM3.icons.render(mode === 'dark' ? 'sun' : 'moon', { size: 18 });
      }
    });
    var swatches = document.querySelectorAll('[data-lm3-accent-set]');
    Array.prototype.forEach.call(swatches, function (sw) {
      var isCurrent = sw.getAttribute('data-lm3-accent-set') === accent;
      sw.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
      sw.classList.toggle('is-active', isCurrent);
    });
  }

  LM3.theme = {
    getMode: getMode,
    setMode: setMode,
    getAccent: getAccent,
    setAccent: setAccent,
    accents: ACCENTS
  };

  /* ========================================================================
     8. Clipboard Copy Utility (Works even inside sandboxed iframes)
     ======================================================================== */
  function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text).catch(function () {
        return fallbackCopy(text);
      });
    }
    return fallbackCopy(text);
  }

  function fallbackCopy(text) {
    return new Promise(function (resolve) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        resolve(true);
      } catch (e) {
        resolve(false);
      }
    });
  }

  LM3.copy = copyText;

  /* ========================================================================
     9. Delegated Global Event Listeners (Zero-Leak, Dynamic-DOM Friendly)
     ======================================================================== */
  var initialized = false;

  function bindGlobalDelegation() {
    if (initialized || typeof document === 'undefined') return;
    initialized = true;

    /* Pointerdown: MD3 Ripple + Slider Active state */
    document.addEventListener('pointerdown', function (e) {
      if (e.button !== 0) return;
      var target = e.target.closest(RIPPLE_SELECTOR);
      if (target) spawnRipple(target, e);

      var slider = e.target.closest('.lm3-slider');
      if (slider) {
        slider.classList.add('is-active');
        var clearActive = function () {
          slider.classList.remove('is-active');
          document.removeEventListener('pointerup', clearActive);
          document.removeEventListener('pointercancel', clearActive);
        };
        document.addEventListener('pointerup', clearActive);
        document.addEventListener('pointercancel', clearActive);
      }
    });

    /* Input: Slider Live Sync */
    document.addEventListener('input', function (e) {
      if (e.target && e.target.classList && e.target.classList.contains('lm3-slider__input')) {
        var slider = e.target.closest('.lm3-slider');
        if (slider) syncSlider(slider);
      }
    });

    /* Click Delegation for All Declarative Components */
    document.addEventListener('click', function (e) {
      var target = e.target;

      /* (a) Theme Mode Toggle */
      var themeBtn = target.closest('[data-lm3-theme-toggle]');
      if (themeBtn) {
        var mode = setMode('toggle');
        if (themeBtn.getAttribute('data-silent') !== 'true') {
          toast({
            message: mode === 'dark' ? '已切换至 Claude 暖炭深色模式' : '已切换至 Claude 宣纸浅色模式',
            icon: mode === 'dark' ? 'moon' : 'sun',
            duration: 2200
          });
        }
        return;
      }

      /* (b) Material You Accent Switcher */
      var accentBtn = target.closest('[data-lm3-accent-set]');
      if (accentBtn) {
        var nextAccent = accentBtn.getAttribute('data-lm3-accent-set');
        setAccent(nextAccent);
        return;
      }

      /* (c) Tabs */
      var tab = target.closest('.lm3-tab');
      if (tab) {
        selectTab(tab);
        return;
      }

      /* (d) Segmented Buttons */
      var segBtn = target.closest('.lm3-segmented__btn');
      if (segBtn) {
        var group = segBtn.closest('[data-lm3-segmented]');
        if (group) {
          var isMulti = group.getAttribute('data-lm3-segmented') === 'multi';
          if (isMulti) {
            var cur = segBtn.getAttribute('aria-pressed') === 'true';
            segBtn.setAttribute('aria-pressed', cur ? 'false' : 'true');
          } else {
            var btns = group.querySelectorAll('.lm3-segmented__btn');
            Array.prototype.forEach.call(btns, function (b) {
              b.setAttribute('aria-pressed', b === segBtn ? 'true' : 'false');
            });
          }
          var selected = Array.prototype.slice
            .call(group.querySelectorAll('.lm3-segmented__btn[aria-pressed="true"]'))
            .map(function (b) { return b.getAttribute('data-value') || b.textContent.trim(); });
          emit(group, 'lm3:segmented-change', {
            value: selected[0] || null,
            values: selected,
            button: segBtn
          });
        }
        return;
      }

      /* (e) Chip Dismiss Button */
      var chipClose = target.closest('.lm3-chip__close');
      if (chipClose) {
        e.stopPropagation();
        var chip = chipClose.closest('.lm3-chip');
        if (chip) {
          chip.classList.add('is-dismissing');
          setTimeout(function () {
            emit(chip.parentNode || document, 'lm3:chip-dismiss', {
              label: chip.textContent.trim(),
              value: chip.getAttribute('data-value')
            });
            if (chip.parentNode) chip.parentNode.removeChild(chip);
          }, 180);
        }
        return;
      }

      /* (f) Filter Chip Toggle */
      var filterChip = target.closest('.lm3-chip[data-lm3-chip="filter"]');
      if (filterChip) {
        var isSingleGroup = filterChip.closest('[data-lm3-chip-group="single"]');
        if (isSingleGroup) {
          var siblings = isSingleGroup.querySelectorAll('.lm3-chip[data-lm3-chip="filter"]');
          Array.prototype.forEach.call(siblings, function (c) {
            c.setAttribute('aria-pressed', c === filterChip ? 'true' : 'false');
          });
        } else {
          var pressed = filterChip.getAttribute('aria-pressed') === 'true';
          filterChip.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        }
        emit(filterChip, 'lm3:chip-change', {
          pressed: filterChip.getAttribute('aria-pressed') === 'true',
          value: filterChip.getAttribute('data-value') || filterChip.textContent.trim()
        });
        return;
      }

      /* (g) Toggle Icon Button */
      var toggleBtn = target.closest('[data-lm3-toggle]');
      if (toggleBtn) {
        var nextPressed = toggleBtn.getAttribute('aria-pressed') !== 'true';
        toggleBtn.setAttribute('aria-pressed', nextPressed ? 'true' : 'false');
        emit(toggleBtn, 'lm3:toggle', { pressed: nextPressed });
        return;
      }

      /* (h) Accordion Trigger */
      var accTrig = target.closest('.lm3-accordion__trigger');
      if (accTrig) {
        var item = accTrig.closest('.lm3-accordion__item');
        var acc = accTrig.closest('.lm3-accordion');
        if (item) {
          var willOpen = !item.classList.contains('is-open');
          if (acc && acc.getAttribute('data-lm3-accordion') === 'single' && willOpen) {
            var others = acc.querySelectorAll('.lm3-accordion__item.is-open');
            Array.prototype.forEach.call(others, function (o) {
              o.classList.remove('is-open');
              var ot = o.querySelector('.lm3-accordion__trigger');
              if (ot) ot.setAttribute('aria-expanded', 'false');
            });
          }
          item.classList.toggle('is-open', willOpen);
          accTrig.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
          emit(item, 'lm3:accordion-change', { open: willOpen });
        }
        return;
      }

      /* (i) Dropdown Trigger & Menu Items */
      var ddTrig = target.closest('[data-lm3-dropdown-trigger]');
      if (ddTrig) {
        var dd = ddTrig.closest('.lm3-dropdown');
        if (dd) {
          var opening = !dd.classList.contains('is-open');
          closeAllDropdowns(dd);
          dd.classList.toggle('is-open', opening);
          ddTrig.setAttribute('aria-expanded', opening ? 'true' : 'false');
        }
        return;
      }

      var menuItem = target.closest('.lm3-menu__item');
      if (menuItem) {
        var parentDd = menuItem.closest('.lm3-dropdown');
        emit(parentDd || menuItem, 'lm3:menu-select', {
          item: menuItem,
          value: menuItem.getAttribute('data-value') || menuItem.textContent.trim()
        });
        if (parentDd && parentDd.getAttribute('data-close-on-select') !== 'false') {
          closeAllDropdowns();
        }
        return;
      }

      if (!target.closest('.lm3-dropdown')) {
        closeAllDropdowns();
      }

      /* (j) Dialog Open / Close */
      var dlgOpen = target.closest('[data-lm3-dialog-open]');
      if (dlgOpen) {
        LM3.dialog.open(dlgOpen.getAttribute('data-lm3-dialog-open'));
        return;
      }
      var dlgClose = target.closest('[data-lm3-dialog-close]');
      if (dlgClose) {
        LM3.dialog.close(dlgClose.closest('.lm3-dialog-backdrop'));
        return;
      }
      if (target.classList && target.classList.contains('lm3-dialog-backdrop') && !target.hasAttribute('data-static')) {
        LM3.dialog.close(target);
        return;
      }

      /* (k) Side Sheet Open / Close */
      var sheetOpen = target.closest('[data-lm3-sheet-open]');
      if (sheetOpen) {
        LM3.sheet.open(sheetOpen.getAttribute('data-lm3-sheet-open'));
        return;
      }
      var sheetClose = target.closest('[data-lm3-sheet-close]');
      if (sheetClose) {
        LM3.sheet.close(sheetClose.closest('.lm3-sheet-backdrop'));
        return;
      }
      if (target.classList && target.classList.contains('lm3-sheet-backdrop')) {
        LM3.sheet.close(target);
        return;
      }

      /* (l) Copy Code / Snippet Button */
      var copyBtn = target.closest('[data-lm3-copy]');
      if (copyBtn) {
        var selector = copyBtn.getAttribute('data-lm3-copy');
        var rawText = '';
        if (selector === 'codeblock') {
          var block = copyBtn.closest('.lm3-codeblock');
          var pre = block && block.querySelector('pre');
          rawText = pre ? pre.textContent : '';
        } else if (selector.charAt(0) === '#') {
          var node = document.querySelector(selector);
          rawText = node ? node.textContent : '';
        } else {
          rawText = selector;
        }
        copyText(rawText).then(function () {
          var prevHtml = copyBtn.innerHTML;
          copyBtn.innerHTML =
            (LM3.icons ? LM3.icons.render('check', { size: 14 }) : '✓') +
            '<span>已复制</span>';
          toast({ message: '代码已复制到剪贴板', variant: 'success', duration: 2000 });
          setTimeout(function () { copyBtn.innerHTML = prevHtml; }, 1600);
        });
      }
    });

    /* Keyboard Navigation (Escape + Tabs Arrows) */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        LM3.dialog.closeAll();
        LM3.sheet.closeAll();
      }
      if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft') && document.activeElement && document.activeElement.classList.contains('lm3-tab')) {
        var list = document.activeElement.closest('.lm3-tablist');
        if (!list) return;
        var tabs = Array.prototype.slice.call(list.querySelectorAll('.lm3-tab'));
        var idx = tabs.indexOf(document.activeElement);
        var nextIdx = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
        tabs[nextIdx].focus();
        selectTab(tabs[nextIdx]);
        e.preventDefault();
      }
    });

    /* Resize & Load: Recalculate Sliding Tab Indicators */
    var resizeTimer = null;
    global.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { refreshTabs(); }, 80);
    });
    global.addEventListener('load', function () {
      refreshTabs();
      refreshSliders();
    });
  }

  /* ========================================================================
     10. Init Entrypoint
     ======================================================================== */
  function init(root) {
    bindGlobalDelegation();
    if (!root) {
      var savedMode = safeStorageGet('lm3-theme-mode');
      if (savedMode === 'dark' || savedMode === 'light') {
        document.documentElement.setAttribute('data-theme', savedMode);
      }
      var savedAccent = safeStorageGet('lm3-theme-accent');
      if (savedAccent && ACCENTS.indexOf(savedAccent) !== -1 && savedAccent !== 'terracotta') {
        document.documentElement.setAttribute('data-accent', savedAccent);
      }
    }
    if (LM3.icons && typeof LM3.icons.hydrate === 'function') {
      LM3.icons.hydrate(root);
    }
    refreshSliders(root);
    syncThemeControls();
    requestAnimationFrame(function () { refreshTabs(root); });
  }

  LM3.init = init;
  LM3.version = '1.0.0';

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { init(); });
    } else {
      init();
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
