/* LineKit Icons — 独立图标模块，可单独引入。零依赖，统一 24 × 24 视窗。 */
(function (global) {
  'use strict';

  const paths = {
    search: '<circle cx="10.7" cy="10.5" r="6.8"/><path d="m15.8 15.9 4.4 4.2"/>',
    plus: '<path d="M12 4.8c.2 4.6-.1 9.7 0 14.4M4.8 12c4.7-.1 9.7.2 14.4 0"/>',
    minus: '<path d="M4.8 12c4.7-.1 9.7.2 14.4 0"/>',
    close: '<path d="m6.2 6.1 11.7 11.8M17.9 6.2 6.1 17.9"/>',
    check: '<path d="m4.8 12.4 4.4 4.5c3.1-5.4 6.1-8.1 10.2-10.1"/>',
    'arrow-right': '<path d="M4 12c5.2.1 10.5-.1 15.6 0M14 6.2c1.9 2.1 3.6 4 5.8 5.8-2.2 1.8-3.8 3.8-5.7 5.8"/>',
    'arrow-left': '<path d="M20 12c-5.2.1-10.5-.1-15.6 0M10 6.2C8.1 8.3 6.4 10.2 4.2 12c2.2 1.8 3.8 3.8 5.7 5.8"/>',
    'arrow-up-right': '<path d="M6.3 17.8 18 6.2M7.1 6.1c3.7.2 7.3-.1 10.9.1.1 3.7-.2 7.2 0 10.7"/>',
    'chevron-down': '<path d="m5.2 8.7 6.9 7 6.7-7.2"/>',
    'chevron-right': '<path d="m8.7 5.1 7 6.8-7.2 6.9"/>',
    menu: '<path d="M4 7.1c5.4-.1 10.7.2 16 0M4 12.1c5.4.1 10.7-.2 16 0M4 17c5.4-.1 10.7.2 16 0"/>',
    more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
    home: '<path d="m3.2 11.4 8.9-7.7 8.7 7.5M5.7 9.7c-.1 3.8.1 7.2 0 10.5 4.2.2 8.4-.1 12.6.1.1-3.5-.1-7 0-10.5M9.7 20.1v-6.4h4.8v6.4"/>',
    grid: '<rect x="3.4" y="3.6" width="6.5" height="6.4" rx="1.1"/><rect x="14.1" y="3.5" width="6.4" height="6.5" rx="1.1"/><rect x="3.5" y="14.1" width="6.5" height="6.4" rx="1.1"/><rect x="14" y="14.1" width="6.5" height="6.4" rx="1.1"/>',
    layers: '<path d="m3.2 8.4 8.9-4.8 8.7 4.8-8.8 4.8zM3.5 12.4l8.5 4.6 8.6-4.6M3.6 16.2l8.4 4.5 8.5-4.5"/>',
    user: '<circle cx="12" cy="7.8" r="4.1"/><path d="M4.3 20.5c.6-4.2 3.3-6.4 7.7-6.4s7.2 2.1 7.7 6.4"/>',
    users: '<circle cx="9.2" cy="8.1" r="3.8"/><path d="M2.9 20.2c.5-3.8 2.7-5.8 6.4-5.8 3.6 0 5.8 2 6.3 5.8M15.7 4.7c2.9-.4 4.7 1.1 4.7 3.5 0 2-1.2 3.2-3.1 3.5M17.5 14.7c2.3.6 3.5 2.3 3.8 5"/>',
    settings: '<circle cx="12" cy="12" r="3.1"/><path d="M9.7 3.5h4.6l.7 2.6 2.1 1.2 2.5-.8 2.3 4-1.9 1.9v2.5l1.9 1.8-2.3 4-2.5-.7-2.1 1.2-.7 2.6H9.7L9 21.2l-2.1-1.2-2.5.7-2.3-4 1.9-1.8v-2.5l-1.9-1.9 2.3-4 2.5.8L9 6.1z"/>',
    bell: '<path d="M5.2 16.7c1.4-1.8 1.6-4.1 1.5-6.8.1-3.4 2-5.6 5.3-5.6s5.2 2.2 5.3 5.6c-.1 2.7.1 5 1.5 6.8zM9.7 19.6c.5 1.2 1.2 1.7 2.3 1.7s1.9-.5 2.4-1.7M3.8 16.8h16.4"/>',
    calendar: '<rect x="3.3" y="5.2" width="17.4" height="15.5" rx="2"/><path d="M7.5 3.2v4M16.5 3.2v4M3.5 9.7h17M7.4 13.1h2M11 13.1h2M14.8 13.1h2M7.4 16.5h2M11 16.5h2"/>',
    clock: '<circle cx="12" cy="12" r="8.8"/><path d="M12 6.7v5.6l3.8 2.2"/>',
    folder: '<path d="M3.1 6.4c2.2-.2 4.4.1 6.6 0l2 2.4h9.2c.2 3.7-.1 7.5 0 11.2-5.9.2-11.8-.1-17.7.1z"/>',
    file: '<path d="M6 3.2h7.5l4.5 4.6v13H6zM13.2 3.5v4.7h4.5M9 12h6M9 15.5h6"/>',
    image: '<rect x="3.1" y="4" width="17.8" height="16" rx="2"/><circle cx="8.2" cy="9" r="1.7"/><path d="m4 17 5.2-5 3.8 3.4 2.5-2.3 4.4 4"/>',
    download: '<path d="M12 3.4v11.4M7.3 10.5l4.7 4.7 4.7-4.7M4 17.2v3.4h16v-3.4"/>',
    upload: '<path d="M12 15.2V3.8M7.3 8.5 12 3.8l4.7 4.7M4 17.2v3.4h16v-3.4"/>',
    copy: '<rect x="8" y="7.8" width="12" height="12.4" rx="1.8"/><path d="M16 7.7V4H4v12.3h4"/>',
    edit: '<path d="m14.8 5.1 4.1 4.1M4 20l1.3-5.3L16.5 3.5c1.5-1.2 4.8 1.9 3.5 3.4L8.8 18.7zM4.8 14.9l3.5 3.5"/>',
    trash: '<path d="M4.2 6.7h15.6M9 3.5h6l.8 3.2H8.2zM6.1 6.8l.8 13.7h10.2l.8-13.7M10 10.4v6.6M14 10.4v6.6"/>',
    heart: '<path d="M12 20.2C9.8 17.4 3.4 13.8 3.4 8.7c0-4.6 5.7-5.7 8.6-1.8 2.9-3.9 8.6-2.8 8.6 1.8 0 5.1-6.4 8.7-8.6 11.5Z"/>',
    star: '<path d="m12 3.4 2.6 5.5 6 .7-4.4 4.2 1.2 5.9-5.4-2.9-5.4 2.9 1.2-5.9-4.4-4.2 6-.7z"/>',
    bookmark: '<path d="M6.1 3.5h11.8v17.3L12 17.1l-5.9 3.7z"/>',
    link: '<path d="m9.5 14.6 5-5M7.7 16.5l-1.2 1.1c-3.8 3.4-7.1-1.1-3.8-4.2l3.5-3.5c2.7-2.5 5.6-.9 6.3.4M16.3 7.5l1.2-1.1c3.8-3.4 7.1 1.1 3.8 4.2l-3.5 3.5c-2.7 2.5-5.6.9-6.3-.4"/>',
    eye: '<path d="M2.7 12c3.5-5.7 6.6-7.2 9.3-7.2s5.8 1.5 9.3 7.2c-3.5 5.7-6.6 7.2-9.3 7.2S6.2 17.7 2.7 12Z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="m4 4 16 16M9.4 5.2c.9-.3 1.7-.4 2.6-.4 2.7 0 5.8 1.5 9.3 7.2a16.3 16.3 0 0 1-3 3.8M6.2 7.2A17.4 17.4 0 0 0 2.7 12c3.5 5.7 6.6 7.2 9.3 7.2 1.2 0 2.5-.3 3.8-.9M9.8 9.8a3 3 0 0 0 4.4 4.4"/>',
    lock: '<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M7.8 10V7.3a4.2 4.2 0 0 1 8.4 0V10M12 14v2.5"/>',
    filter: '<path d="M3.3 4.5h17.4l-6.8 7.8v6.9l-3.8 1.3v-8.2z"/>',
    refresh: '<path d="M20 7.2V3.5l-2.3 2.4A8.7 8.7 0 0 0 4 9.1M4 16.8v3.7l2.3-2.4A8.7 8.7 0 0 0 20 14.9M4.1 9.2a8.8 8.8 0 0 0 0 5.6M19.9 14.8a8.8 8.8 0 0 0 0-5.6"/>',
    play: '<path d="m8 4.8 11.2 7.1L8 19.2z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m7.4 12.2 3 3.1 6.4-6.6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 10.6v6M12 7.2v.2"/>',
    alert: '<path d="M12 3.3 21 20H3zM12 8.8v5.2M12 17.2v.2"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 8.8c.2-3.5 5.4-3.5 5.4-.2 0 2.3-2.8 2.5-2.8 4.8M12 16.8v.2"/>',
    send: '<path d="m3.2 4 17.6 8-17.6 8 2.1-7.9zM5.3 12h15.3"/>',
    'shopping-bag': '<path d="M5 7.5h14l1 13H4zM8.5 9V6.5a3.5 3.5 0 0 1 7 0V9"/>',
    chart: '<path d="M4 3.8v16.4h16M7.5 15.8v-4M12 15.8V7.5M16.5 15.8V4.8"/>',
    sun: '<circle cx="12" cy="12" r="4.1"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
    moon: '<path d="M20.2 15.3A8.9 8.9 0 0 1 8.7 3.8a8.9 8.9 0 1 0 11.5 11.5Z"/>',
    code: '<path d="m8.3 6.2-6 5.8 6 5.8M15.7 6.2l6 5.8-6 5.8M13.7 3.8l-3.4 16.4"/>',
    external: '<path d="M13.5 3.5h7v7M20.2 3.8 11 13M18 13.5v7h-14.5v-15H11"/>',
    location: '<path d="M19.5 9.5c0 5.6-7.5 11.2-7.5 11.2S4.5 15.1 4.5 9.5a7.5 7.5 0 0 1 15 0Z"/><circle cx="12" cy="9.5" r="2.4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    coffee: '<path d="M4.5 8h12v6.7a5.3 5.3 0 0 1-5.3 5.3H9.8a5.3 5.3 0 0 1-5.3-5.3zM16.5 9.5h1.2a2.8 2.8 0 0 1 0 5.6h-1.5M7 3.5c-1 1.1 1.1 1.5 0 2.7M11 3.5c-1 1.1 1.1 1.5 0 2.7M3 21h16"/>',
    leaf: '<path d="M20.5 3.5C10 3.2 4 7.4 4.2 13.2c.1 4 3.4 6.5 7 5.5 5.4-1.5 8.1-7.4 9.3-15.2ZM3.5 21c2.6-6.2 6.8-9.7 12.8-12.6"/>'
  };

  const groups = {
    '基础操作': ['search','plus','minus','close','check','arrow-right','arrow-left','arrow-up-right','chevron-down','chevron-right','menu','more'],
    '界面导航': ['home','grid','layers','user','users','settings','bell','calendar','clock','folder','file','image'],
    '编辑与状态': ['download','upload','copy','edit','trash','heart','star','bookmark','link','eye','eye-off','lock','filter','refresh','play','pause'],
    '反馈与业务': ['check-circle','info','alert','help','send','shopping-bag','chart','sun','moon','code','external','location','mail','coffee','leaf']
  };

  const categoryOf = {};
  Object.keys(groups).forEach(group => groups[group].forEach(name => { categoryOf[name] = group; }));

  function escape(value) {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function svg(name, options = {}) {
    if (!paths[name]) return '';
    const label = options.label ? ` role="img" aria-label="${escape(options.label)}"` : ' aria-hidden="true"';
    const className = `lk-icon${options.className ? ' ' + escape(options.className) : ''}`;
    const pixelSize = Number(options.size) || 24;
    const size = options.size ? ` style="--lk-icon-size:${pixelSize}px"` : '';
    return `<svg class="${className}" width="${pixelSize}" height="${pixelSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${Number(options.stroke) || 'var(--lk-icon-stroke, 1.8)'}" stroke-linecap="round" stroke-linejoin="round"${label}${size}>${paths[name]}</svg>`;
  }

  function create(name, options) {
    const template = document.createElement('template');
    template.innerHTML = svg(name, options).trim();
    return template.content.firstElementChild;
  }

  function mount(root = document) {
    root.querySelectorAll('[data-lk-icon]').forEach(host => {
      const icon = create(host.dataset.lkIcon, { label: host.getAttribute('aria-label') || '' });
      if (!icon) return;
      Array.from(host.attributes).forEach(attr => {
        if (attr.name === 'data-lk-icon') return;
        if (attr.name === 'class') icon.setAttribute('class', `${icon.getAttribute('class')} ${attr.value}`);
        else if (attr.name !== 'aria-label') icon.setAttribute(attr.name, attr.value);
      });
      host.replaceWith(icon);
    });
  }

  global.LineIcons = { paths, groups, categoryOf, svg, create, mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mount());
  else mount();
})(window);
