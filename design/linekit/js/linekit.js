/* LineKit Core — 通过 data-lk-* 声明式驱动，业务脚本与组件实现解耦。 */
(function (global) {
  'use strict';

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function icon(name, options) {
    return global.LineIcons ? global.LineIcons.create(name, options) : document.createElement('span');
  }

  function toast(options = {}) {
    const settings = typeof options === 'string' ? { title: options } : options;
    let region = document.querySelector('.lk-toast-region');
    if (!region) {
      region = document.createElement('div');
      region.className = 'lk-toast-region';
      region.setAttribute('aria-live', 'polite');
      region.setAttribute('aria-atomic', 'false');
      document.body.appendChild(region);
    }

    const item = document.createElement('div');
    item.className = 'lk-toast';
    item.setAttribute('role', settings.type === 'error' ? 'alert' : 'status');
    item.appendChild(icon(settings.icon || (settings.type === 'error' ? 'alert' : 'check-circle')));

    const content = document.createElement('div');
    content.className = 'lk-toast-content';
    const title = document.createElement('strong');
    title.className = 'lk-toast-title';
    title.textContent = settings.title || '操作完成';
    content.appendChild(title);
    if (settings.message) {
      const message = document.createElement('span');
      message.className = 'lk-toast-message';
      message.textContent = settings.message;
      content.appendChild(message);
    }
    item.appendChild(content);

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'lk-toast-close';
    close.dataset.lkToastClose = '';
    close.setAttribute('aria-label', '关闭提示');
    close.appendChild(icon('close', { size: 17 }));
    item.appendChild(close);
    region.appendChild(item);

    requestAnimationFrame(() => item.classList.add('is-visible'));
    const duration = settings.duration === 0 ? 0 : (settings.duration || 3200);
    let timer = duration ? window.setTimeout(() => dismissToast(item), duration) : null;
    item.addEventListener('pointerenter', () => window.clearTimeout(timer));
    item.addEventListener('pointerleave', () => {
      if (duration) timer = window.setTimeout(() => dismissToast(item), 1600);
    });
    return item;
  }

  function dismissToast(item) {
    if (!item || !item.isConnected || item.classList.contains('is-leaving')) return;
    item.classList.add('is-leaving');
    window.setTimeout(() => item.remove(), reduceMotion() ? 0 : 140);
  }

  async function copy(value) {
    const text = String(value || '');
    if (!text) throw new Error('没有可复制的内容');
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return text;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    textarea.remove();
    if (!successful) throw new Error('浏览器未允许复制');
    return text;
  }

  function openDialog(target) {
    const dialog = typeof target === 'string' ? document.getElementById(target) : target;
    if (!(dialog instanceof HTMLDialogElement)) return;
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    dialog.dispatchEvent(new CustomEvent('lk:dialog-open', { bubbles: true }));
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open || dialog.classList.contains('is-closing')) return;
    dialog.classList.add('is-closing');
    window.setTimeout(() => {
      dialog.close();
      dialog.classList.remove('is-closing');
      dialog.dispatchEvent(new CustomEvent('lk:dialog-close', { bubbles: true }));
    }, reduceMotion() ? 0 : 140);
  }

  function activateTab(tab, focus = false) {
    const group = tab.closest('[data-lk-tabs]');
    if (!group) return;
    const tabs = Array.from(group.querySelectorAll(':scope > [role="tab"], :scope .lk-tabs > [role="tab"]'));
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    const visiblePanels = new Set(tabs.filter(item => item.getAttribute('aria-selected') === 'true').map(item => item.getAttribute('aria-controls')));
    const panelIds = new Set(tabs.map(item => item.getAttribute('aria-controls')));
    panelIds.forEach(panelId => {
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = !visiblePanels.has(panelId);
        panel.setAttribute('tabindex', '0');
      }
    });
    if (focus) tab.focus();
    group.dispatchEvent(new CustomEvent('lk:tab-change', { bubbles: true, detail: { tab, panelId: tab.getAttribute('aria-controls') } }));
  }

  function closeDropdown(dropdown, returnFocus = false) {
    if (!dropdown) return;
    const toggle = dropdown.querySelector('[data-lk-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-lk-dropdown-menu]');
    if (!toggle || !menu) return;
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  function openDropdown(dropdown, focusFirst = false) {
    const toggle = dropdown.querySelector('[data-lk-dropdown-toggle]');
    const menu = dropdown.querySelector('[data-lk-dropdown-menu]');
    if (!toggle || !menu) return;
    document.querySelectorAll('[data-lk-dropdown]').forEach(other => { if (other !== dropdown) closeDropdown(other); });
    menu.hidden = false;
    menu.classList.remove('is-entering');
    void menu.offsetWidth;
    menu.classList.add('is-entering');
    toggle.setAttribute('aria-expanded', 'true');
    if (focusFirst) menu.querySelector('.lk-menu-item')?.focus();
  }

  function setProgress(target, value) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    const normalized = Math.min(100, Math.max(0, Number(value) || 0));
    element.style.setProperty('--lk-progress', normalized / 100);
    element.setAttribute('aria-valuenow', String(normalized));
    const output = element.closest('.lk-progress')?.querySelector('[data-lk-progress-value]');
    if (output) output.textContent = `${Math.round(normalized)}%`;
  }

  function applyTheme(theme, notify = false) {
    const next = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.lkTheme = next;
    document.querySelectorAll('[data-lk-theme-toggle]').forEach(button => {
      button.innerHTML = '';
      button.appendChild(icon(next === 'dark' ? 'sun' : 'moon'));
      button.setAttribute('aria-label', next === 'dark' ? '切换到浅色模式' : '切换到深色模式');
      button.setAttribute('title', next === 'dark' ? '浅色模式' : '深色模式');
    });
    try { localStorage.setItem('linekit-theme', next); } catch (_) { /* 隐私模式下仅保留当前页状态 */ }
    if (notify) toast({ title: next === 'dark' ? '夜间墨水已启用' : '日间稿纸已启用', icon: next === 'dark' ? 'moon' : 'sun' });
  }

  function initialTheme() {
    try { return localStorage.getItem('linekit-theme') || 'light'; }
    catch (_) { return 'light'; }
  }

  function onClick(event) {
    const open = event.target.closest('[data-lk-open]');
    if (open) { openDialog(open.dataset.lkOpen); return; }

    const close = event.target.closest('[data-lk-close]');
    if (close) { closeDialog(close.closest('dialog')); return; }

    const tab = event.target.closest('[role="tab"][aria-controls]');
    if (tab && tab.closest('[data-lk-tabs]')) { activateTab(tab); return; }

    const dropdownToggle = event.target.closest('[data-lk-dropdown-toggle]');
    if (dropdownToggle) {
      const dropdown = dropdownToggle.closest('[data-lk-dropdown]');
      const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeDropdown(dropdown) : openDropdown(dropdown);
      return;
    }

    const dropdownItem = event.target.closest('.lk-dropdown-menu .lk-menu-item');
    if (dropdownItem) closeDropdown(dropdownItem.closest('[data-lk-dropdown]'));

    if (!event.target.closest('[data-lk-dropdown]')) {
      document.querySelectorAll('[data-lk-dropdown]').forEach(dropdown => closeDropdown(dropdown));
    }

    const copyButton = event.target.closest('[data-lk-copy], [data-lk-copy-target]');
    if (copyButton) {
      const source = copyButton.dataset.lkCopyTarget ? document.querySelector(copyButton.dataset.lkCopyTarget) : null;
      const value = copyButton.dataset.lkCopy || (source ? ('value' in source ? source.value : source.textContent) : '');
      copy(value.trim()).then(() => {
        toast({ title: copyButton.dataset.lkCopySuccess || '已复制到剪贴板', icon: 'copy' });
        copyButton.dispatchEvent(new CustomEvent('lk:copy', { bubbles: true, detail: { value } }));
      }).catch(error => toast({ title: '复制失败', message: error.message, type: 'error' }));
      return;
    }

    const dismiss = event.target.closest('[data-lk-dismiss]');
    if (dismiss) {
      const target = dismiss.dataset.lkDismiss ? document.querySelector(dismiss.dataset.lkDismiss) : dismiss.closest('.lk-alert');
      target?.remove();
      return;
    }

    const toastClose = event.target.closest('[data-lk-toast-close]');
    if (toastClose) { dismissToast(toastClose.closest('.lk-toast')); return; }

    const themeToggle = event.target.closest('[data-lk-theme-toggle]');
    if (themeToggle) applyTheme(document.documentElement.dataset.lkTheme === 'dark' ? 'light' : 'dark', true);
  }

  function onKeydown(event) {
    const tab = event.target.closest('[role="tab"]');
    const tablist = tab?.closest('[role="tablist"]');
    if (tab && tablist && ['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
      event.preventDefault();
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const current = tabs.indexOf(tab);
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : event.key === 'ArrowRight' ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length;
      activateTab(tabs[index], true);
      return;
    }

    const dropdownToggle = event.target.closest('[data-lk-dropdown-toggle]');
    if (dropdownToggle && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        openDropdown(dropdownToggle.closest('[data-lk-dropdown]'), true);
      }
      return;
    }

    const menu = event.target.closest('[data-lk-dropdown-menu]');
    if (menu && ['ArrowDown','ArrowUp','Escape'].includes(event.key)) {
      event.preventDefault();
      const dropdown = menu.closest('[data-lk-dropdown]');
      if (event.key === 'Escape') { closeDropdown(dropdown, true); return; }
      const items = Array.from(menu.querySelectorAll('.lk-menu-item'));
      const current = items.indexOf(document.activeElement);
      const index = event.key === 'ArrowDown' ? (current + 1) % items.length : (current - 1 + items.length) % items.length;
      items[index]?.focus();
    }
    if (event.key === 'Escape') document.querySelectorAll('[data-lk-dropdown]').forEach(dropdown => closeDropdown(dropdown));
  }

  function init() {
    applyTheme(initialTheme());
    global.LineIcons?.mount();
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('cancel', event => {
      if (event.target instanceof HTMLDialogElement) {
        event.preventDefault();
        closeDialog(event.target);
      }
    });
    document.addEventListener('click', event => {
      if (!(event.target instanceof HTMLDialogElement)) return;
      const rect = event.target.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) closeDialog(event.target);
    });
  }

  global.LineKit = { toast, copy, openDialog, closeDialog, activateTab, setProgress, applyTheme, init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})(window);
