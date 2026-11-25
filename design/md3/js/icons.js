/* ==========================================================================
   Linen M3 Design System — Handcrafted SVG Icon Registry (56 Icons)
   24x24 optical grid | 1.75px rounded editorial strokes | Zero dependencies
   Usage:
     1) Declarative: <span data-lm3-icon="sparkle" data-size="20"></span>
     2) JS API:      LinenM3.icons.render('sparkle', { size: 20, strokeWidth: 1.75 })
     3) SVG Sprite:  <svg class="lm3-icon"><use href="linen-m3/icons-sprite.svg#lm3-icon-sparkle"/></svg>
   ========================================================================== */
(function (global) {
  'use strict';

  var ICONS = {
    /* ---------- 1. AI & Creative (AI 与创作) ---------- */
    'claude-burst': {
      label: '灵感星芒',
      category: 'ai',
      keywords: ['claude', 'ai', 'burst', 'sun', 'spark', '灵感', '星芒', '标志'],
      body:
        '<path d="M12 2.5v5.2M12 16.3v5.2M2.5 12h5.2M16.3 12h5.2"/>' +
        '<path d="M5.28 5.28l3.68 3.68M15.04 15.04l3.68 3.68M18.72 5.28l-3.68 3.68M8.96 15.04l-3.68 3.68"/>' +
        '<circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/>'
    },
    'sparkle': {
      label: '智能闪烁',
      category: 'ai',
      keywords: ['sparkle', 'magic', 'ai', 'star', '智能', '闪烁', '生成'],
      body:
        '<path d="M12 3c.5 4.4 2.6 6.5 7 7-4.4.5-6.5 2.6-7 7-.5-4.4-2.6-6.5-7-7 4.4-.5 6.5-2.6 7-7Z"/>' +
        '<path d="M19 16.5c.25 1.4 1.1 2.25 2.5 2.5-1.4.25-2.25 1.1-2.5 2.5-.25-1.4-1.1-2.25-2.5-2.5 1.4-.25 2.25-1.1 2.5-2.5Z"/>'
    },
    'wand': {
      label: '魔法润色',
      category: 'ai',
      keywords: ['wand', 'magic', 'edit', 'polish', '魔法', '润色'],
      body:
        '<path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 6.2 19 5M11 13l-7 7a1.41 1.41 0 0 1-2-2l7-7"/>' +
        '<path d="m11 13 4-4a1.41 1.41 0 0 1 2 2l-4 4"/>'
    },
    'brain': {
      label: '深度思考',
      category: 'ai',
      keywords: ['brain', 'thinking', 'reasoning', 'mind', '思考', '推理', '大脑'],
      body:
        '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>' +
        '<path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>' +
        '<path d="M12 5v13"/>'
    },
    'bot': {
      label: 'AI 助手',
      category: 'ai',
      keywords: ['bot', 'assistant', 'agent', 'robot', '助手', '智能体'],
      body:
        '<path d="M12 7V4H9"/>' +
        '<rect x="4" y="7" width="16" height="12" rx="4"/>' +
        '<path d="M2 13h2M20 13h2"/>' +
        '<circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none"/>' +
        '<circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none"/>'
    },
    'terminal': {
      label: '命令行',
      category: 'ai',
      keywords: ['terminal', 'console', 'cli', 'shell', '终端', '命令行'],
      body:
        '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
        '<path d="m7.5 9.5 3 2.5-3 2.5M12.5 14.5h4"/>'
    },
    'code': {
      label: '代码片段',
      category: 'ai',
      keywords: ['code', 'dev', 'html', 'syntax', '代码', '开发'],
      body:
        '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5.5l-3 13"/>'
    },
    'layers': {
      label: '组件层级',
      category: 'ai',
      keywords: ['layers', 'components', 'stack', 'design', '层级', '组件'],
      body:
        '<path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/>' +
        '<path d="m3 12 9 4.5 9-4.5"/>' +
        '<path d="m3 16.5 9 4.5 9-4.5"/>'
    },
    'zap': {
      label: '极速响应',
      category: 'ai',
      keywords: ['zap', 'fast', 'bolt', 'flash', 'speed', '极速', '闪电'],
      body:
        '<path d="M13 2 4.5 13.5h6.5L10 22l9.5-11.5H13L13 2Z"/>'
    },

    /* ---------- 2. Navigation & Layout (导航与布局) ---------- */
    'home': {
      label: '首页',
      category: 'nav',
      keywords: ['home', 'house', 'main', '首页', '主页'],
      body:
        '<path d="M3.5 10.5 12 3.5l8.5 7"/>' +
        '<path d="M5.5 9v9.5a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9"/>' +
        '<path d="M9.5 20.5v-5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5v5.5"/>'
    },
    'compass': {
      label: '探索发现',
      category: 'nav',
      keywords: ['compass', 'explore', 'discover', '探索', '发现', '指南针'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2Z"/>'
    },
    'menu': {
      label: '导航菜单',
      category: 'nav',
      keywords: ['menu', 'hamburger', 'list', '菜单', '导航'],
      body:
        '<path d="M4 7h16M4 12h16M4 17h11"/>'
    },
    'sidebar': {
      label: '侧边栏',
      category: 'nav',
      keywords: ['sidebar', 'panel', 'layout', 'drawer', '侧边栏', '面板'],
      body:
        '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
        '<path d="M9 4v16"/>'
    },
    'arrow-right': {
      label: '向右箭头',
      category: 'nav',
      keywords: ['arrow', 'right', 'next', 'forward', '箭头', '下一步'],
      body:
        '<path d="M5 12h14M13 6l6 6-6 6"/>'
    },
    'arrow-left': {
      label: '向左箭头',
      category: 'nav',
      keywords: ['arrow', 'left', 'back', 'prev', '返回', '上一步'],
      body:
        '<path d="M19 12H5M11 6l-6 6 6 6"/>'
    },
    'arrow-up-right': {
      label: '跳转外链',
      category: 'nav',
      keywords: ['arrow', 'diagonal', 'link', 'goto', '跳转'],
      body:
        '<path d="M7 17 17 7M9 7h8v8"/>'
    },
    'chevron-down': {
      label: '向下展开',
      category: 'nav',
      keywords: ['chevron', 'down', 'expand', 'dropdown', '展开', '下拉'],
      body:
        '<path d="m6 9 6 6 6-6"/>'
    },
    'chevron-right': {
      label: '向右进入',
      category: 'nav',
      keywords: ['chevron', 'right', 'enter', '进入', '详情'],
      body:
        '<path d="m9 6 6 6-6 6"/>'
    },
    'external-link': {
      label: '外部打开',
      category: 'nav',
      keywords: ['external', 'open', 'newtab', '外链', '新窗口'],
      body:
        '<path d="M14 4h6v6M10 14 20 4"/>' +
        '<path d="M18 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4.5"/>'
    },

    /* ---------- 3. Actions & Editing (操作与编辑) ---------- */
    'plus': {
      label: '新建添加',
      category: 'action',
      keywords: ['plus', 'add', 'new', 'create', '添加', '新建'],
      body:
        '<path d="M12 5v14M5 12h14"/>'
    },
    'minus': {
      label: '减少折叠',
      category: 'action',
      keywords: ['minus', 'remove', 'less', '减少', '折叠'],
      body:
        '<path d="M5 12h14"/>'
    },
    'close': {
      label: '关闭取消',
      category: 'action',
      keywords: ['close', 'x', 'cancel', 'dismiss', '关闭', '取消'],
      body:
        '<path d="m6 6 12 12M18 6 6 18"/>'
    },
    'check': {
      label: '确认勾选',
      category: 'action',
      keywords: ['check', 'done', 'ok', 'tick', '确认', '完成', '勾选'],
      body:
        '<path d="m5 12.5 4.5 4.5L19 7.5"/>'
    },
    'copy': {
      label: '复制内容',
      category: 'action',
      keywords: ['copy', 'clipboard', 'duplicate', '复制', '剪贴板'],
      body:
        '<rect x="9" y="9" width="11" height="11" rx="2.2"/>' +
        '<path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/>'
    },
    'edit': {
      label: '编辑撰写',
      category: 'action',
      keywords: ['edit', 'pencil', 'write', 'compose', '编辑', '撰写'],
      body:
        '<path d="M12 20h9"/>' +
        '<path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"/>'
    },
    'trash': {
      label: '删除移除',
      category: 'action',
      keywords: ['trash', 'delete', 'remove', 'bin', '删除', '垃圾桶'],
      body:
        '<path d="M4 6.5h16M9.5 6.5V4.8c0-.72.58-1.3 1.3-1.3h2.4c.72 0 1.3.58 1.3 1.3v1.7"/>' +
        '<path d="M6.5 6.5 7.4 19a2 2 0 0 0 2 1.85h5.2a2 2 0 0 0 2-1.85l.9-12.5"/>' +
        '<path d="M10 11v5.5M14 11v5.5"/>'
    },
    'search': {
      label: '全局搜索',
      category: 'action',
      keywords: ['search', 'find', 'lookup', 'magnifier', '搜索', '查找'],
      body:
        '<circle cx="11" cy="11" r="7"/>' +
        '<path d="m20 20-3.8-3.8"/>'
    },
    'filter': {
      label: '条件筛选',
      category: 'action',
      keywords: ['filter', 'funnel', 'sort', '筛选', '过滤'],
      body:
        '<path d="M4 5.5h16l-6 7.2v5.3l-4 2v-7.3L4 5.5Z"/>'
    },
    'sliders': {
      label: '参数微调',
      category: 'action',
      keywords: ['sliders', 'tune', 'controls', 'adjust', '微调', '参数'],
      body:
        '<path d="M4 7h4M12 7h8M4 12h10M18 12h2M4 17h6M14 17h6"/>' +
        '<circle cx="10" cy="7" r="2"/>' +
        '<circle cx="16" cy="12" r="2"/>' +
        '<circle cx="12" cy="17" r="2"/>'
    },
    'refresh': {
      label: '重新生成',
      category: 'action',
      keywords: ['refresh', 'reload', 'retry', 'sync', '刷新', '重试', '重新生成'],
      body:
        '<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/>' +
        '<path d="M4 4v4h4"/>' +
        '<path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/>' +
        '<path d="M20 20v-4h-4"/>'
    },
    'send': {
      label: '发送提交',
      category: 'action',
      keywords: ['send', 'submit', 'paperplane', '发送', '提交'],
      body:
        '<path d="M20.5 3.5 10 14"/>' +
        '<path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z"/>'
    },
    'download': {
      label: '下载导出',
      category: 'action',
      keywords: ['download', 'export', 'save', '下载', '导出'],
      body:
        '<path d="M12 4v11M8 11l4 4 4-4"/>' +
        '<path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17"/>'
    },
    'upload': {
      label: '上传导入',
      category: 'action',
      keywords: ['upload', 'import', 'cloud', '上传', '导入'],
      body:
        '<path d="M12 15V4M8 8l4-4 4 4"/>' +
        '<path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17"/>'
    },

    /* ---------- 4. Communication & Files (沟通与文档) ---------- */
    'message': {
      label: '对话消息',
      category: 'comm',
      keywords: ['message', 'chat', 'comment', 'dialog', '对话', '消息', '聊天'],
      body:
        '<path d="M5 19.5 6.4 16A8 8 0 1 1 12 20a8.4 8.4 0 0 1-3.3-.67L5 19.5Z"/>'
    },
    'mail': {
      label: '电子邮箱',
      category: 'comm',
      keywords: ['mail', 'email', 'inbox', 'letter', '邮件', '邮箱'],
      body:
        '<rect x="3" y="5" width="18" height="14" rx="2.5"/>' +
        '<path d="m4 7 8 6 8-6"/>'
    },
    'bell': {
      label: '通知提醒',
      category: 'comm',
      keywords: ['bell', 'notification', 'alert', '通知', '提醒', '铃铛'],
      body:
        '<path d="M6 10a6 6 0 1 1 12 0c0 4.5 2 6 2 6H4s2-1.5 2-6Z"/>' +
        '<path d="M10 19a2 2 0 0 0 4 0"/>'
    },
    'file-text': {
      label: '富文本文档',
      category: 'comm',
      keywords: ['file', 'doc', 'document', 'note', 'article', '文档', '笔记'],
      body:
        '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/>' +
        '<path d="M14 3v5h5M8.5 12.5h7M8.5 16h5"/>'
    },
    'folder': {
      label: '项目文件夹',
      category: 'comm',
      keywords: ['folder', 'project', 'directory', 'collection', '文件夹', '项目'],
      body:
        '<path d="M3 7a2 2 0 0 1 2-2h4.2l2 2.2H19a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>'
    },
    'bookmark': {
      label: '收藏书签',
      category: 'comm',
      keywords: ['bookmark', 'save', 'tag', '收藏', '书签'],
      body:
        '<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V20l-6-3.8L6 20V4.5Z"/>'
    },
    'paperclip': {
      label: '添加附件',
      category: 'comm',
      keywords: ['paperclip', 'attach', 'file', '附件', '回形针'],
      body:
        '<path d="m20.5 11.2-8.4 8.4a5.2 5.2 0 0 1-7.35-7.35l8.4-8.4a3.5 3.5 0 0 1 4.95 4.95l-8.4 8.4a1.75 1.75 0 0 1-2.48-2.48l7.6-7.6"/>'
    },
    'share': {
      label: '分享协作',
      category: 'comm',
      keywords: ['share', 'publish', 'network', '分享', '协作'],
      body:
        '<circle cx="18" cy="5.5" r="2.5"/>' +
        '<circle cx="6" cy="12" r="2.5"/>' +
        '<circle cx="18" cy="18.5" r="2.5"/>' +
        '<path d="m8.2 10.8 7.6-4.1M8.2 13.2l7.6 4.1"/>'
    },
    'globe': {
      label: '联网检索',
      category: 'comm',
      keywords: ['globe', 'web', 'internet', 'world', '联网', '全球'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M3.5 9.5h17M3.5 14.5h17"/>' +
        '<path d="M12 3a13 13 0 0 0 0 18 13 13 0 0 0 0-18Z"/>'
    },

    /* ---------- 5. Status & Feedback (状态与安全) ---------- */
    'info': {
      label: '信息提示',
      category: 'status',
      keywords: ['info', 'about', 'notice', '信息', '提示'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M12 11.5v4.5"/>' +
        '<circle cx="12" cy="8.2" r="0.9" fill="currentColor" stroke="none"/>'
    },
    'check-circle': {
      label: '成功完成',
      category: 'status',
      keywords: ['success', 'check', 'verified', 'done', '成功', '通过'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="m8.5 12.2 2.4 2.4 4.8-5"/>'
    },
    'alert-triangle': {
      label: '警示注意',
      category: 'status',
      keywords: ['warning', 'alert', 'caution', '警告', '注意'],
      body:
        '<path d="M10.4 4.2a1.85 1.85 0 0 1 3.2 0l7.1 12.4A1.85 1.85 0 0 1 19.1 19.5H4.9a1.85 1.85 0 0 1-1.6-2.9l7.1-12.4Z"/>' +
        '<path d="M12 9.5v4"/>' +
        '<circle cx="12" cy="16.2" r="0.9" fill="currentColor" stroke="none"/>'
    },
    'alert-circle': {
      label: '错误异常',
      category: 'status',
      keywords: ['error', 'danger', 'issue', '错误', '异常'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M12 8v4.5"/>' +
        '<circle cx="12" cy="15.8" r="0.9" fill="currentColor" stroke="none"/>'
    },
    'help-circle': {
      label: '帮助文档',
      category: 'status',
      keywords: ['help', 'question', 'faq', '帮助', '疑问'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M9.5 9.3a2.6 2.6 0 0 1 5 .8c0 1.8-2.5 2.2-2.5 3.6"/>' +
        '<circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none"/>'
    },
    'lock': {
      label: '隐私加密',
      category: 'status',
      keywords: ['lock', 'private', 'secure', 'password', '锁定', '隐私'],
      body:
        '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/>' +
        '<path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>' +
        '<circle cx="12" cy="15.5" r="1.1" fill="currentColor" stroke="none"/>'
    },
    'shield-check': {
      label: '安全护航',
      category: 'status',
      keywords: ['shield', 'security', 'trust', 'safe', '安全', '认证'],
      body:
        '<path d="M12 3 4.5 6.2v5.4c0 4.6 3.2 8.2 7.5 9.4 4.3-1.2 7.5-4.8 7.5-9.4V6.2L12 3Z"/>' +
        '<path d="m9 12 2.1 2.1 4-4.2"/>'
    },

    /* ---------- 6. Interface, Theme & User (界面与偏好) ---------- */
    'sun': {
      label: '浅色纸感',
      category: 'ui',
      keywords: ['sun', 'light', 'day', 'theme', '浅色', '明亮', '太阳'],
      body:
        '<circle cx="12" cy="12" r="4"/>' +
        '<path d="M12 2.5v2M12 19.5v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2.5 12h2M19.5 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
    },
    'moon': {
      label: '深色暖炭',
      category: 'ui',
      keywords: ['moon', 'dark', 'night', 'theme', '深色', '夜间', '月亮'],
      body:
        '<path d="M20.2 14.4A8.2 8.2 0 1 1 9.6 3.8a6.8 6.8 0 0 0 10.6 10.6Z"/>'
    },
    'palette': {
      label: '动态配色',
      category: 'ui',
      keywords: ['palette', 'color', 'theme', 'accent', '配色', '主题', '色板'],
      body:
        '<path d="M12 3a9 9 0 1 0 0 18h1.2a2.3 2.3 0 0 0 1.65-3.9 2.2 2.2 0 0 1 1.55-3.75H18a3 3 0 0 0 3-3A7.5 7.5 0 0 0 12 3Z"/>' +
        '<circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/>' +
        '<circle cx="11.5" cy="7.5" r="1" fill="currentColor" stroke="none"/>' +
        '<circle cx="15.5" cy="8.8" r="1" fill="currentColor" stroke="none"/>' +
        '<circle cx="7.5" cy="14" r="1" fill="currentColor" stroke="none"/>'
    },
    'user': {
      label: '个人账户',
      category: 'ui',
      keywords: ['user', 'profile', 'account', 'person', '用户', '个人'],
      body:
        '<circle cx="12" cy="8" r="3.8"/>' +
        '<path d="M5 19.5a7 7 0 0 1 14 0"/>'
    },
    'users': {
      label: '团队协作',
      category: 'ui',
      keywords: ['users', 'team', 'group', 'members', '团队', '成员'],
      body:
        '<circle cx="9.5" cy="8.5" r="3.2"/>' +
        '<path d="M3.5 19a6 6 0 0 1 12 0"/>' +
        '<circle cx="16.8" cy="9.5" r="2.4"/>' +
        '<path d="M16.5 14.2a4.6 4.6 0 0 1 4 4.8"/>'
    },
    'settings': {
      label: '系统设置',
      category: 'ui',
      keywords: ['settings', 'gear', 'config', 'preferences', '设置', '偏好'],
      body:
        '<circle cx="12" cy="12" r="3"/>' +
        '<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>'
    },
    'star': {
      label: '精选星标',
      category: 'ui',
      keywords: ['star', 'favorite', 'rating', '星标', '精选'],
      body:
        '<path d="m12 3.3 2.65 5.38 5.95.86-4.3 4.2 1.02 5.92L12 16.86l-5.32 2.8 1.02-5.92-4.3-4.2 5.95-.86L12 3.3Z"/>'
    },
    'heart': {
      label: '喜爱点赞',
      category: 'ui',
      keywords: ['heart', 'like', 'love', '喜欢', '点赞'],
      body:
        '<path d="M12 20s-7.5-4.7-7.5-10.3A4.4 4.4 0 0 1 12 6.8a4.4 4.4 0 0 1 7.5 2.9C19.5 15.3 12 20 12 20Z"/>'
    },
    'eye': {
      label: '预览查看',
      category: 'ui',
      keywords: ['eye', 'preview', 'view', 'visible', '预览', '查看'],
      body:
        '<path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/>' +
        '<circle cx="12" cy="12" r="2.7"/>'
    },
    'clock': {
      label: '历史时间',
      category: 'ui',
      keywords: ['clock', 'time', 'history', 'recent', '时间', '历史'],
      body:
        '<circle cx="12" cy="12" r="9"/>' +
        '<path d="M12 7v5l3.3 2"/>'
    },
    'calendar': {
      label: '日程排期',
      category: 'ui',
      keywords: ['calendar', 'date', 'schedule', '日历', '日程'],
      body:
        '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/>' +
        '<path d="M8 3v4M16 3v4M3.5 10h17"/>'
    },
    'command': {
      label: '快捷指令',
      category: 'ui',
      keywords: ['command', 'cmd', 'shortcut', 'keyboard', '快捷键', '指令'],
      body:
        '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3Z"/>'
    }
  };

  var CATEGORIES = [
    { id: 'all', label: '全部图标' },
    { id: 'ai', label: 'AI 与创作' },
    { id: 'nav', label: '导航与布局' },
    { id: 'action', label: '操作与编辑' },
    { id: 'comm', label: '沟通与文档' },
    { id: 'status', label: '状态与安全' },
    { id: 'ui', label: '界面与偏好' }
  ];

  /**
   * Render an icon as a clean standalone inline <svg> string.
   * @param {string} name
   * @param {{ size?: number, strokeWidth?: number, className?: string, label?: string }} [opts]
   */
  function render(name, opts) {
    var def = ICONS[name];
    if (!def) return '';
    opts = opts || {};
    var size = opts.size || 20;
    var sw = opts.strokeWidth || 1.75;
    var cls = opts.className ? 'lm3-icon ' + opts.className : 'lm3-icon';
    var a11y = opts.label
      ? 'role="img" aria-label="' + opts.label.replace(/"/g, '&quot;') + '"'
      : 'aria-hidden="true"';
    return (
      '<svg class="' + cls + '" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + sw +
      '" stroke-linecap="round" stroke-linejoin="round" ' + a11y + '>' +
      def.body + '</svg>'
    );
  }

  /**
   * Register custom user icons at runtime without modifying library source.
   */
  function register(name, definition) {
    if (!name || !definition || !definition.body) return;
    ICONS[name] = {
      label: definition.label || name,
      category: definition.category || 'ui',
      keywords: definition.keywords || [name],
      body: definition.body
    };
  }

  /**
   * Hydrate all [data-lm3-icon] elements inside root (defaults to document).
   */
  function hydrate(root) {
    if (typeof document === 'undefined') return;
    var scope = root || document;
    var nodes = scope.querySelectorAll('[data-lm3-icon]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var name = el.getAttribute('data-lm3-icon');
      if (!name || !ICONS[name]) continue;
      if (el.getAttribute('data-lm3-icon-hydrated') === name && el.querySelector('svg')) continue;
      var size = parseFloat(el.getAttribute('data-size')) || 20;
      var sw = parseFloat(el.getAttribute('data-stroke')) || 1.75;
      var cls = el.getAttribute('data-icon-class') || '';
      el.innerHTML = render(name, { size: size, strokeWidth: sw, className: cls });
      el.setAttribute('data-lm3-icon-hydrated', name);
      el.classList.add('lm3-icon-host');
    }
  }

  function list() {
    return Object.keys(ICONS).map(function (name) {
      var item = ICONS[name];
      return {
        name: name,
        label: item.label,
        category: item.category,
        keywords: item.keywords,
        body: item.body
      };
    });
  }

  function generateSprite() {
    var symbols = Object.keys(ICONS).map(function (name) {
      return '  <symbol id="lm3-icon-' + name + '" viewBox="0 0 24 24">' + ICONS[name].body + '</symbol>';
    }).join('\n');
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">\n' +
      symbols +
      '\n</svg>\n'
    );
  }

  var api = {
    registry: ICONS,
    categories: CATEGORIES,
    render: render,
    register: register,
    hydrate: hydrate,
    list: list,
    generateSprite: generateSprite
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    global.LinenM3 = global.LinenM3 || {};
    global.LinenM3.icons = api;
    if (typeof document !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { hydrate(); });
      } else {
        hydrate();
      }
    }
  }
})(typeof window !== 'undefined' ? window : globalThis);
