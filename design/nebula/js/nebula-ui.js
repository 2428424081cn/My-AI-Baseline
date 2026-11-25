/*!
 * ============================================================
 * Nebula UI v1.0.0 — 交互层（零依赖 · 原生 JS）
 * ------------------------------------------------------------
 * 设计原则：
 *   1. 声明式：所有行为由 data-* 属性驱动，HTML 即文档；
 *   2. 低耦合：每个模块相互独立、可单独摘除，仅通过
 *      CustomEvent（ui:modal:open / ui:theme / ui:tab:change …）通信；
 *   3. 无污染：只暴露 window.UI 一个命名空间。
 *
 * 全局 API 速查：
 *   UI.toast({type,title,message,duration})  UI.toast.success(msg)
 *   UI.modal.open('#id')  UI.modal.close('#id')
 *   UI.drawer.open('#id') UI.drawer.close('#id')
 *   UI.tabs.select(root, name)
 *   UI.ring.set(el, value)          // 0~100
 *   UI.theme.toggle() / .set(t) / .get()
 *   UI.copy(text, cb)
 *   事件：ui:modal:open/close · ui:drawer:open/close · ui:toast
 *         ui:tab:change · ui:theme · ui:dropdown:open/close · ui:page:change
 * ============================================================
 */
(function (window, document) {
  'use strict';

  var UI = window.UI = { version: '1.0.0' };

  /* ================= 内部工具 ================= */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt); }
  function emit(type, detail) { document.dispatchEvent(new CustomEvent(type, { detail: detail || {} })); }
  function icon(name, cls) {
    return '<svg class="ui-icon' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  }
  /* localStorage 沙箱/隐私模式下静默降级 */
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* noop */ } }
  };

  var FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  UI.utils = { $: $, $$: $$, on: on, emit: emit, icon: icon };

  /* ================= 1. 主题 ================= */
  function applyTheme(t) { document.documentElement.setAttribute('data-theme', t); }
  UI.theme = {
    get: function () { return document.documentElement.getAttribute('data-theme') || 'light'; },
    set: function (t) {
      applyTheme(t); store.set('nebula-theme', t);
      emit('ui:theme', { theme: t });
    },
    toggle: function () { this.set(this.get() === 'dark' ? 'light' : 'dark'); }
  };
  (function initTheme() {
    var saved = store.get('nebula-theme');
    if (saved) { applyTheme(saved); }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { applyTheme('dark'); }
  })();

  /* ================= 2. 按钮涟漪 ================= */
  document.addEventListener('pointerdown', function (e) {
    var btn = e.target.closest('.ui-btn');
    if (!btn || btn.disabled || btn.classList.contains('ui-btn--loading')) return;
    var r = btn.getBoundingClientRect();
    var d = Math.max(r.width, r.height) * 1.15;
    var s = document.createElement('span');
    s.className = 'ui-ripple';
    s.style.width = s.style.height = d + 'px';
    s.style.left = (e.clientX - r.left - d / 2) + 'px';
    s.style.top = (e.clientY - r.top - d / 2) + 'px';
    btn.appendChild(s);
    setTimeout(function () { s.remove(); }, 680);
  });

  /* ================= 3. 滚动锁定（共享计数） ================= */
  var lockCount = 0;
  function lockScroll() {
    if (lockCount === 0) {
      var pad = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      if (pad > 0) document.body.style.paddingRight = pad + 'px';
    }
    lockCount++;
  }
  function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
  function trapTab(e, layer) {
    var f = $$(FOCUSABLE, layer).filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ================= 4. Dropdown ================= */
  var openDropdown = null;
  function closeDropdowns() {
    $$('.ui-dropdown.open').forEach(function (dd) {
      dd.classList.remove('open');
      var t = $('[data-dropdown-trigger]', dd);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
    openDropdown = null;
  }
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-dropdown-trigger]');
    if (trigger) {
      var dd = trigger.closest('.ui-dropdown');
      if (!dd) return;
      var wasOpen = dd.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) {
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        openDropdown = dd;
        emit('ui:dropdown:open', { id: dd.id });
        var first = $('.ui-menu__item', dd);
        if (first) first.focus({ preventScroll: true });
      }
      return;
    }
    if (openDropdown) {
      var insideMenu = e.target.closest('.ui-menu');
      if (!insideMenu || e.target.closest('.ui-menu__item')) closeDropdowns();
    }
  });

  /* ================= 5. Modal ================= */
  function byId(id) { return typeof id === 'string' ? document.getElementById(id.replace(/^#/, '')) : id; }

  function openModal(id) {
    var m = byId(id);
    if (!m || m.classList.contains('open')) return;
    closeDropdowns();
    m._returnFocus = document.activeElement;
    m.classList.add('open');
    m.setAttribute('aria-hidden', 'false');
    lockScroll();
    var target = $('[data-autofocus]', m) || $(FOCUSABLE, m);
    setTimeout(function () { if (target) target.focus({ preventScroll: true }); }, 90);
    emit('ui:modal:open', { id: m.id });
  }
  function closeModal(id) {
    var m = byId(id);
    if (!m || !m.classList.contains('open')) return;
    m.classList.remove('open');
    m.setAttribute('aria-hidden', 'true');
    unlockScroll();
    if (m._returnFocus && m._returnFocus.focus) m._returnFocus.focus({ preventScroll: true });
    emit('ui:modal:close', { id: m.id });
  }
  UI.modal = { open: openModal, close: closeModal };

  /* ================= 6. Drawer ================= */
  function openDrawer(id) {
    var d = byId(id);
    if (!d || d.classList.contains('open')) return;
    closeDropdowns();
    d._returnFocus = document.activeElement;
    d.classList.add('open');
    d.setAttribute('aria-hidden', 'false');
    lockScroll();
    var target = $('[data-autofocus]', d) || $(FOCUSABLE, d);
    setTimeout(function () { if (target) target.focus({ preventScroll: true }); }, 90);
    emit('ui:drawer:open', { id: d.id });
  }
  function closeDrawer(id) {
    var d = byId(id);
    if (!d || !d.classList.contains('open')) return;
    d.classList.remove('open');
    d.setAttribute('aria-hidden', 'true');
    unlockScroll();
    if (d._returnFocus && d._returnFocus.focus) d._returnFocus.focus({ preventScroll: true });
    emit('ui:drawer:close', { id: d.id });
  }
  UI.drawer = { open: openDrawer, close: closeDrawer };

  /* ================= 7. 全局键盘 ================= */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (openDropdown) {
        var trig = $('[data-dropdown-trigger]', openDropdown);
        closeDropdowns();
        if (trig) trig.focus();
        return;
      }
      var m = $('.ui-modal.open'); if (m) { closeModal(m); return; }
      var d = $('.ui-drawer.open'); if (d) { closeDrawer(d); return; }
    }
    if (openDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      var items = $$('.ui-menu__item:not([disabled])', openDropdown);
      if (!items.length) return;
      e.preventDefault();
      var i = items.indexOf(document.activeElement);
      i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
      items[i].focus();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var layer = $('.ui-modal.open .ui-modal__panel');
    if (layer) { trapTab(e, layer); return; }
    layer = $('.ui-drawer.open .ui-drawer__panel');
    if (layer) trapTab(e, layer);
  });

  /* 点击遮罩关闭（伪元素背景点击会落在容器上） */
  document.addEventListener('mousedown', function (e) {
    if (e.target.classList && e.target.classList.contains('ui-modal')) closeModal(e.target);
    if (e.target.classList && e.target.classList.contains('ui-drawer')) closeDrawer(e.target);
  });

  /* ================= 8. Tabs ================= */
  var tabPills = [];
  function initTabs(root) {
    var nav = $('.ui-tabs__nav', root);
    var pill = $('.ui-tabs__pill', root);
    var items = $$('.ui-tabs__item', root);
    if (!nav || !items.length) return;
    if (pill) tabPills.push({ root: root, pill: pill });

    function move(btn, animate) {
      if (!pill || !btn) return;
      if (!animate) pill.style.transition = 'none';
      pill.style.left = btn.offsetLeft + 'px';
      pill.style.width = btn.offsetWidth + 'px';
      pill.style.height = btn.offsetHeight + 'px';
      pill.style.top = btn.offsetTop + 'px';
      if (!animate) { void pill.offsetWidth; pill.style.transition = ''; }
    }
    function select(btn, silent) {
      items.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      move(btn, !silent);
      var name = btn.getAttribute('data-tab');
      $$('.ui-tab-pane', root).forEach(function (p) {
        p.classList.toggle('active', p.getAttribute('data-pane') === name);
      });
      if (!silent) emit('ui:tab:change', { tab: name, root: root.id });
    }
    items.forEach(function (btn) {
      btn.setAttribute('role', 'tab');
      on(btn, 'click', function () { select(btn); });
    });
    on(nav, 'keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var cur = items.indexOf(document.activeElement);
      if (cur < 0) return;
      e.preventDefault();
      var next = items[(cur + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length];
      next.focus(); select(next);
    });
    var cur = $('.ui-tabs__item.active', root) || items[0];
    if (cur) select(cur, true);
    root._selectTab = select;
  }
  UI.tabs = {
    select: function (root, name) {
      var r = typeof root === 'string' ? $(root) : root;
      if (!r) return;
      var btn = $('.ui-tabs__item[data-tab="' + name + '"]', r);
      if (btn && r._selectTab) r._selectTab(btn);
    }
  };
  window.addEventListener('resize', function () {
    requestAnimationFrame(function () {
      tabPills.forEach(function (o) {
        var cur = $('.ui-tabs__item.active', o.root);
        if (!cur || !o.pill) return;
        o.pill.style.transition = 'none';
        o.pill.style.left = cur.offsetLeft + 'px';
        o.pill.style.width = cur.offsetWidth + 'px';
        o.pill.style.height = cur.offsetHeight + 'px';
        o.pill.style.top = cur.offsetTop + 'px';
        void o.pill.offsetWidth;
        o.pill.style.transition = '';
      });
    });
  });

  /* ================= 9. Toast ================= */
  var toastWrap = null;
  function toastWrapEl() {
    if (!toastWrap || !toastWrap.isConnected) {
      toastWrap = $('.ui-toast-wrap');
      if (!toastWrap) {
        toastWrap = document.createElement('div');
        toastWrap.className = 'ui-toast-wrap';
        document.body.appendChild(toastWrap);
      }
    }
    return toastWrap;
  }
  var TOAST_ICONS = { success: 'check-circle', error: 'x-circle', warning: 'alert-triangle', info: 'info' };
  function dismissToast(el) {
    if (!el || el._hiding) return;
    el._hiding = true;
    el.classList.remove('show');
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 320);
  }
  UI.toast = function (opts) {
    if (typeof opts === 'string') opts = { message: opts };
    var o = opts || {};
    var type = TOAST_ICONS[o.type] ? o.type : 'info';
    var dur = o.duration == null ? 4200 : o.duration;
    var el = document.createElement('div');
    el.className = 'ui-toast ui-toast--' + type;
    el.setAttribute('role', 'status');
    el.innerHTML =
      icon(TOAST_ICONS[type], 'ui-toast__icon') +
      '<div class="ui-toast__content">' +
        (o.title ? '<div class="ui-toast__title"></div>' : '') +
        (o.message ? '<div class="ui-toast__msg"></div>' : '') +
      '</div>' +
      '<button class="ui-toast__close" aria-label="关闭">' + icon('x') + '</button>' +
      (dur > 0 ? '<i class="ui-toast__bar" style="animation-duration:' + dur + 'ms"></i>' : '');
    var tEl = el.querySelector('.ui-toast__title');
    var mEl = el.querySelector('.ui-toast__msg');
    if (tEl) tEl.textContent = o.title || '';
    if (mEl) mEl.textContent = o.message || '';
    on(el.querySelector('.ui-toast__close'), 'click', function () { dismissToast(el); });

    var wrap = toastWrapEl();
    wrap.appendChild(el);
    while (wrap.children.length > 5) dismissToast(wrap.firstElementChild);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { el.classList.add('show'); });
    });
    var bar = el.querySelector('.ui-toast__bar');
    if (bar) on(bar, 'animationend', function () { dismissToast(el); });
    emit('ui:toast', { type: type });
    el.dismiss = function () { dismissToast(el); };
    return el;
  };
  ['success', 'error', 'warning', 'info'].forEach(function (t) {
    UI.toast[t] = function (msg, title) { return UI.toast({ type: t, message: msg, title: title }); };
  });

  /* ================= 10. Slider 填充 ================= */
  function paintSlider(input) {
    var min = parseFloat(input.min) || 0;
    var max = parseFloat(input.max); if (isNaN(max)) max = 100;
    var v = parseFloat(input.value); if (isNaN(v)) v = 0;
    input.style.setProperty('--p', (((v - min) / (max - min)) * 100) + '%');
  }

  /* ================= 11. 进度环 ================= */
  UI.ring = {
    set: function (el, v) {
      var node = typeof el === 'string' ? $(el) : el;
      if (!node) return;
      node.style.setProperty('--p', Math.max(0, Math.min(100, parseFloat(v) || 0)));
    }
  };

  /* ================= 12. 剪贴板 ================= */
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-999px;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* noop */ }
    ta.remove();
  }
  UI.copy = function (text, cb) {
    text = String(text);
    var done = function () { if (cb) cb(text); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
    } else { legacyCopy(text); done(); }
  };

  /* ================= 13. 统一点击委托 ================= */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-modal-open]')))    { openModal(t.getAttribute('data-modal-open')); return; }
    if ((t = e.target.closest('[data-modal-close]')))   { closeModal(e.target.closest('.ui-modal')); return; }
    if ((t = e.target.closest('[data-drawer-open]')))   { openDrawer(t.getAttribute('data-drawer-open')); return; }
    if ((t = e.target.closest('[data-drawer-close]')))  { closeDrawer(e.target.closest('.ui-drawer')); return; }
    if ((t = e.target.closest('[data-theme-toggle]')))  { UI.theme.toggle(); return; }
    if ((t = e.target.closest('[data-alert-close]')))   { closeAlert(t.closest('.ui-alert')); return; }
    if ((t = e.target.closest('[data-tag-close]')))     { removeTag(t.closest('.ui-tag')); return; }
    if ((t = e.target.closest('[data-eye]')))           { toggleEye(t); return; }
    if ((t = e.target.closest('[data-copy],[data-copy-target]'))) { doCopy(t); return; }
    if ((t = e.target.closest('.ui-page__btn[data-page]:not(.active):not(:disabled)'))) { setPage(t); return; }
  });

  /* Alert 折叠关闭 */
  function closeAlert(el) {
    if (!el || el._closing) return;
    el._closing = true;
    el.style.height = el.offsetHeight + 'px';
    void el.offsetWidth;
    el.classList.add('ui-alert--closing');
    setTimeout(function () { el.remove(); }, 340);
    emit('ui:alert:close');
  }
  /* Tag 移除 */
  function removeTag(el) {
    if (!el || el._closing) return;
    el._closing = true;
    el.classList.add('ui-tag--closing');
    setTimeout(function () { el.remove(); }, 240);
  }
  /* 密码可见切换 */
  function toggleEye(btn) {
    var wrap = btn.closest('.ui-input-wrap');
    var input = wrap && wrap.querySelector('input');
    if (!input) return;
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.classList.toggle('showing', show);
    input.focus({ preventScroll: true });
  }
  /* 复制 */
  function doCopy(btn) {
    var text = '';
    if (btn.hasAttribute('data-copy-target')) {
      var el = $(btn.getAttribute('data-copy-target'));
      if (el) text = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? el.value : el.textContent;
    } else {
      text = btn.getAttribute('data-copy') || '';
    }
    UI.copy(text.trim(), function () {
      UI.toast({ type: 'success', message: btn.getAttribute('data-copy-tip') || '已复制到剪贴板' });
    });
  }
  /* 分页按钮 */
  function setPage(btn) {
    var page = btn.getAttribute('data-page');
    var group = btn.closest('.ui-page');
    if (!page || page === '…') return;
    $$('.ui-page__btn', group).forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    emit('ui:page:change', { page: parseInt(page, 10), group: group.id });
  }

  /* ================= 14. 自动初始化 ================= */
  function initAll() {
    $$('.ui-tabs').forEach(initTabs);
    $$('.ui-slider').forEach(function (el) {
      paintSlider(el);
      on(el, 'input', function () { paintSlider(el); });
    });
    $$('.ui-ring[data-value]').forEach(function (el) {
      var v = parseFloat(el.getAttribute('data-value')) || 0;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { UI.ring.set(el, v); });
      });
    });
    $$('.ui-dropdown [data-dropdown-trigger]').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
      t.setAttribute('aria-haspopup', 'true');
    });
    $$('.ui-modal').forEach(function (m) { m.setAttribute('aria-hidden', 'true'); });
    $$('.ui-drawer').forEach(function (d) { d.setAttribute('aria-hidden', 'true'); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})(window, document);
