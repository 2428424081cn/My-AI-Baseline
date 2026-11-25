# My-AI-Baseline Index
# Format: part --- style --- sample --- path
# Viewer: python tools/view_index.py [-p PART] [-s STYLE] [-t TYPE] [-k KEYWORD] [--embed] [--check] [-i]

## core
design --- brand --- svg:favicon (site logo / favicon) --- design/brand/icons/iron.svg
spec --- all --- doc:spec (collaboration rules, writing rules, UI baseline) --- SPEC.md
tools --- index --- py:viewer (filter, view, embed, check index.md) --- tools/view_index.py
tools --- git --- hook:commit-msg (Conventional Commits + Task/Agent) --- tools/githooks/commit-msg
tools --- git --- hook:pre-push (block main push & force push) --- tools/githooks/pre-push
tools --- log --- py:log (hash-chained append/verify) --- tools/log_append.py

## linekit
design --- linekit --- css:tokens (--lk-*, [data-lk-theme="dark"]) --- design/linekit/tokens.css
design --- linekit --- css:base (.lk-icon, .lk-sr-only, @keyframes lk-spin) --- design/linekit/base.css
design --- linekit --- js:icons (LineIcons.svg/create/mount, [data-lk-icon]) --- design/linekit/js/icons.js
design --- linekit --- js:runtime (LineKit.toast/copy/openDialog/activateTab/setProgress/applyTheme) --- design/linekit/js/linekit.js
design --- linekit --- css:button (.lk-btn --primary --accent --soft --ghost --danger --icon --sm --lg --block .is-loading) --- design/linekit/components/button.css
design --- linekit --- css:field (.lk-field .lk-label .lk-input .lk-select .lk-textarea .lk-input-wrap .lk-hint .lk-error .has-error) --- design/linekit/components/field.css
design --- linekit --- css:checkbox-radio (.lk-choice .lk-choice-mark .lk-choice--radio) --- design/linekit/components/checkbox-radio.css
design --- linekit --- css:switch (.lk-switch .lk-switch-track .lk-switch-thumb) --- design/linekit/components/switch.css
design --- linekit --- css:card (.lk-card --flat --interactive) --- design/linekit/components/card.css
design --- linekit --- css:badge (.lk-badge --accent --soft --dot) --- design/linekit/components/badge.css
design --- linekit --- css:avatar (.lk-avatar --lg) --- design/linekit/components/avatar.css
design --- linekit --- css:divider (.lk-divider --dash) --- design/linekit/components/divider.css
design --- linekit --- css:note (.lk-note) --- design/linekit/components/note.css
design --- linekit --- css:alert (.lk-alert .lk-alert-title .lk-alert-text --accent [data-lk-dismiss]) --- design/linekit/components/alert.css
design --- linekit --- css:tabs (.lk-tabs .lk-tab[aria-selected] .lk-tab-panel [data-lk-tabs]) --- design/linekit/components/tabs.css
design --- linekit --- css:accordion (.lk-accordion .lk-accordion-item .lk-accordion-content) --- design/linekit/components/accordion.css
design --- linekit --- css:dropdown-menu (.lk-dropdown .lk-dropdown-menu .lk-menu-item .lk-menu-separator [data-lk-dropdown]) --- design/linekit/components/dropdown-menu.css
design --- linekit --- css:dialog (.lk-dialog .lk-dialog-header .lk-dialog-body .lk-dialog-footer [data-lk-open] [data-lk-close]) --- design/linekit/components/dialog.css
design --- linekit --- css:toast (.lk-toast-region .lk-toast LineKit.toast()) --- design/linekit/components/toast.css
design --- linekit --- css:progress (.lk-progress .lk-progress-track .lk-progress-bar LineKit.setProgress()) --- design/linekit/components/progress.css
design --- linekit --- css:spinner (.lk-spinner) --- design/linekit/components/spinner.css
design --- linekit --- css:skeleton (.lk-skeleton --text --title) --- design/linekit/components/skeleton.css
design --- linekit --- css:empty-state (.lk-empty .lk-empty-title .lk-empty-text) --- design/linekit/components/empty-state.css
design --- linekit --- css:table (.lk-table-wrap > .lk-table) --- design/linekit/components/table.css
design --- linekit --- css:tooltip (.lk-tooltip[data-lk-tooltip]) --- design/linekit/components/tooltip.css
design --- linekit --- css:code-block (.lk-code .lk-code-head .lk-inline-code [data-lk-copy-target]) --- design/linekit/components/code-block.css
design --- linekit --- css:layout (.lk-stack .lk-cluster .lk-grid .lk-mt-* .lk-text-muted .lk-text-accent) --- design/linekit/components/layout.css
design --- linekit --- svg:icon (search) --- design/linekit/icons/search.svg
design --- linekit --- svg:icon (plus) --- design/linekit/icons/plus.svg
design --- linekit --- svg:icon (minus) --- design/linekit/icons/minus.svg
design --- linekit --- svg:icon (close) --- design/linekit/icons/close.svg
design --- linekit --- svg:icon (check) --- design/linekit/icons/check.svg
design --- linekit --- svg:icon (arrow-right) --- design/linekit/icons/arrow-right.svg
design --- linekit --- svg:icon (arrow-left) --- design/linekit/icons/arrow-left.svg
design --- linekit --- svg:icon (arrow-up-right) --- design/linekit/icons/arrow-up-right.svg
design --- linekit --- svg:icon (chevron-down) --- design/linekit/icons/chevron-down.svg
design --- linekit --- svg:icon (chevron-right) --- design/linekit/icons/chevron-right.svg
design --- linekit --- svg:icon (menu) --- design/linekit/icons/menu.svg
design --- linekit --- svg:icon (more) --- design/linekit/icons/more.svg
design --- linekit --- svg:icon (home) --- design/linekit/icons/home.svg
design --- linekit --- svg:icon (grid) --- design/linekit/icons/grid.svg
design --- linekit --- svg:icon (layers) --- design/linekit/icons/layers.svg
design --- linekit --- svg:icon (user) --- design/linekit/icons/user.svg
design --- linekit --- svg:icon (users) --- design/linekit/icons/users.svg
design --- linekit --- svg:icon (settings) --- design/linekit/icons/settings.svg
design --- linekit --- svg:icon (bell) --- design/linekit/icons/bell.svg
design --- linekit --- svg:icon (calendar) --- design/linekit/icons/calendar.svg
design --- linekit --- svg:icon (clock) --- design/linekit/icons/clock.svg
design --- linekit --- svg:icon (folder) --- design/linekit/icons/folder.svg
design --- linekit --- svg:icon (file) --- design/linekit/icons/file.svg
design --- linekit --- svg:icon (image) --- design/linekit/icons/image.svg
design --- linekit --- svg:icon (download) --- design/linekit/icons/download.svg
design --- linekit --- svg:icon (upload) --- design/linekit/icons/upload.svg
design --- linekit --- svg:icon (copy) --- design/linekit/icons/copy.svg
design --- linekit --- svg:icon (edit) --- design/linekit/icons/edit.svg
design --- linekit --- svg:icon (trash) --- design/linekit/icons/trash.svg
design --- linekit --- svg:icon (heart) --- design/linekit/icons/heart.svg
design --- linekit --- svg:icon (star) --- design/linekit/icons/star.svg
design --- linekit --- svg:icon (bookmark) --- design/linekit/icons/bookmark.svg
design --- linekit --- svg:icon (link) --- design/linekit/icons/link.svg
design --- linekit --- svg:icon (eye) --- design/linekit/icons/eye.svg
design --- linekit --- svg:icon (eye-off) --- design/linekit/icons/eye-off.svg
design --- linekit --- svg:icon (lock) --- design/linekit/icons/lock.svg
design --- linekit --- svg:icon (filter) --- design/linekit/icons/filter.svg
design --- linekit --- svg:icon (refresh) --- design/linekit/icons/refresh.svg
design --- linekit --- svg:icon (play) --- design/linekit/icons/play.svg
design --- linekit --- svg:icon (pause) --- design/linekit/icons/pause.svg
design --- linekit --- svg:icon (check-circle) --- design/linekit/icons/check-circle.svg
design --- linekit --- svg:icon (info) --- design/linekit/icons/info.svg
design --- linekit --- svg:icon (alert) --- design/linekit/icons/alert.svg
design --- linekit --- svg:icon (help) --- design/linekit/icons/help.svg
design --- linekit --- svg:icon (send) --- design/linekit/icons/send.svg
design --- linekit --- svg:icon (shopping-bag) --- design/linekit/icons/shopping-bag.svg
design --- linekit --- svg:icon (chart) --- design/linekit/icons/chart.svg
design --- linekit --- svg:icon (sun) --- design/linekit/icons/sun.svg
design --- linekit --- svg:icon (moon) --- design/linekit/icons/moon.svg
design --- linekit --- svg:icon (code) --- design/linekit/icons/code.svg
design --- linekit --- svg:icon (external) --- design/linekit/icons/external.svg
design --- linekit --- svg:icon (location) --- design/linekit/icons/location.svg
design --- linekit --- svg:icon (mail) --- design/linekit/icons/mail.svg
design --- linekit --- svg:icon (coffee) --- design/linekit/icons/coffee.svg
design --- linekit --- svg:icon (leaf) --- design/linekit/icons/leaf.svg

## md3
design --- md3 --- css:tokens (--lm3-*, [data-theme="dark"], [data-accent]) --- design/md3/tokens.css
design --- md3 --- css:base (.lm3-icon, .lm3-ripple, .lm3-focusable, @keyframes lm3-spin) --- design/md3/base.css
design --- md3 --- js:icons (LinenM3.icons.render/register/hydrate, [data-lm3-icon]) --- design/md3/js/icons.js
design --- md3 --- js:runtime (LinenM3.toast/dialog/sheet/dropdown/tabs/slider/theme) --- design/md3/js/linen-m3.js
design --- md3 --- svg:sprite (#lm3-icon-*) --- design/md3/sprite.svg
design --- md3 --- css:typography (.lm3-root .lm3-type-display-lg … .lm3-type-label-sm) --- design/md3/components/typography.css
design --- md3 --- css:button (.lm3-btn filled / tonal / elevated / outlined / text / danger, sizes, loading) --- design/md3/components/button.css
design --- md3 --- css:icon-button (.lm3-icon-btn) --- design/md3/components/icon-button.css
design --- md3 --- css:fab (.lm3-fab) --- design/md3/components/fab.css
design --- md3 --- css:segmented-button (.lm3-segmented .lm3-segmented__btn [data-lm3-segmented]) --- design/md3/components/segmented-button.css
design --- md3 --- css:chip (.lm3-chip [data-lm3-chip] [data-lm3-chip-group]) --- design/md3/components/chip.css
design --- md3 --- css:card (.lm3-card) --- design/md3/components/card.css
design --- md3 --- css:text-field (.lm3-field .lm3-field__label .lm3-field__helper .is-error) --- design/md3/components/text-field.css
design --- md3 --- css:prompt-composer (.lm3-composer) --- design/md3/components/prompt-composer.css
design --- md3 --- css:switch (.lm3-switch) --- design/md3/components/switch.css
design --- md3 --- css:checkbox (.lm3-checkbox .lm3-checkbox__input .lm3-checkbox__box) --- design/md3/components/checkbox.css
design --- md3 --- css:radio (.lm3-radio) --- design/md3/components/radio.css
design --- md3 --- css:slider (.lm3-slider LinenM3.slider) --- design/md3/components/slider.css
design --- md3 --- css:tabs (.lm3-tablist --pill .lm3-tab .lm3-tabpanel [data-lm3-tabs]) --- design/md3/components/tabs.css
design --- md3 --- css:navigation (.lm3-nav-item .lm3-rail-item) --- design/md3/components/navigation.css
design --- md3 --- css:list (.lm3-list .lm3-list-item--interactive) --- design/md3/components/list.css
design --- md3 --- css:top-app-bar (.lm3-appbar .lm3-appbar__group) --- design/md3/components/top-app-bar.css
design --- md3 --- css:badge (.lm3-badge .lm3-status-dot--pulse) --- design/md3/components/badge.css
design --- md3 --- css:dialog (.lm3-dialog [data-lm3-dialog-open] [data-lm3-dialog-close]) --- design/md3/components/dialog.css
design --- md3 --- css:sheet (.lm3-sheet [data-lm3-sheet-open] [data-lm3-sheet-close]) --- design/md3/components/sheet.css
design --- md3 --- css:menu (.lm3-menu .lm3-menu__item [data-lm3-dropdown-trigger]) --- design/md3/components/menu.css
design --- md3 --- css:snackbar (.lm3-toast-viewport .lm3-toast --success --warning --error LinenM3.toast()) --- design/md3/components/snackbar.css
design --- md3 --- css:tooltip ([data-lm3-tooltip]) --- design/md3/components/tooltip.css
design --- md3 --- css:accordion (.lm3-accordion .lm3-accordion__trigger [data-lm3-accordion]) --- design/md3/components/accordion.css
design --- md3 --- css:progress (.lm3-progress .lm3-progress-circular) --- design/md3/components/progress.css
design --- md3 --- css:avatar (.lm3-avatar .lm3-avatar-group) --- design/md3/components/avatar.css
design --- md3 --- css:callout (.lm3-callout) --- design/md3/components/callout.css
design --- md3 --- css:skeleton (.lm3-skeleton --line --circle) --- design/md3/components/skeleton.css
design --- md3 --- css:code-block (.lm3-codeblock [data-lm3-copy]) --- design/md3/components/code-block.css
design --- md3 --- css:divider (.lm3-divider) --- design/md3/components/divider.css
design --- md3 --- css:keycap (.lm3-kbd) --- design/md3/components/keycap.css
design --- md3 --- svg:icon (claude-burst, 灵感星芒) --- design/md3/icons/claude-burst.svg
design --- md3 --- svg:icon (sparkle, 智能闪烁) --- design/md3/icons/sparkle.svg
design --- md3 --- svg:icon (wand, 魔法润色) --- design/md3/icons/wand.svg
design --- md3 --- svg:icon (brain, 深度思考) --- design/md3/icons/brain.svg
design --- md3 --- svg:icon (bot, AI 助手) --- design/md3/icons/bot.svg
design --- md3 --- svg:icon (terminal, 命令行) --- design/md3/icons/terminal.svg
design --- md3 --- svg:icon (code, 代码片段) --- design/md3/icons/code.svg
design --- md3 --- svg:icon (layers, 组件层级) --- design/md3/icons/layers.svg
design --- md3 --- svg:icon (zap, 极速响应) --- design/md3/icons/zap.svg
design --- md3 --- svg:icon (home, 首页) --- design/md3/icons/home.svg
design --- md3 --- svg:icon (compass, 探索发现) --- design/md3/icons/compass.svg
design --- md3 --- svg:icon (menu, 导航菜单) --- design/md3/icons/menu.svg
design --- md3 --- svg:icon (sidebar, 侧边栏) --- design/md3/icons/sidebar.svg
design --- md3 --- svg:icon (arrow-right, 向右箭头) --- design/md3/icons/arrow-right.svg
design --- md3 --- svg:icon (arrow-left, 向左箭头) --- design/md3/icons/arrow-left.svg
design --- md3 --- svg:icon (arrow-up-right, 跳转外链) --- design/md3/icons/arrow-up-right.svg
design --- md3 --- svg:icon (chevron-down, 向下展开) --- design/md3/icons/chevron-down.svg
design --- md3 --- svg:icon (chevron-right, 向右进入) --- design/md3/icons/chevron-right.svg
design --- md3 --- svg:icon (external-link, 外部打开) --- design/md3/icons/external-link.svg
design --- md3 --- svg:icon (plus, 新建添加) --- design/md3/icons/plus.svg
design --- md3 --- svg:icon (minus, 减少折叠) --- design/md3/icons/minus.svg
design --- md3 --- svg:icon (close, 关闭取消) --- design/md3/icons/close.svg
design --- md3 --- svg:icon (check, 确认勾选) --- design/md3/icons/check.svg
design --- md3 --- svg:icon (copy, 复制内容) --- design/md3/icons/copy.svg
design --- md3 --- svg:icon (edit, 编辑撰写) --- design/md3/icons/edit.svg
design --- md3 --- svg:icon (trash, 删除移除) --- design/md3/icons/trash.svg
design --- md3 --- svg:icon (search, 全局搜索) --- design/md3/icons/search.svg
design --- md3 --- svg:icon (filter, 条件筛选) --- design/md3/icons/filter.svg
design --- md3 --- svg:icon (sliders, 参数微调) --- design/md3/icons/sliders.svg
design --- md3 --- svg:icon (refresh, 重新生成) --- design/md3/icons/refresh.svg
design --- md3 --- svg:icon (send, 发送提交) --- design/md3/icons/send.svg
design --- md3 --- svg:icon (download, 下载导出) --- design/md3/icons/download.svg
design --- md3 --- svg:icon (upload, 上传导入) --- design/md3/icons/upload.svg
design --- md3 --- svg:icon (message, 对话消息) --- design/md3/icons/message.svg
design --- md3 --- svg:icon (mail, 电子邮箱) --- design/md3/icons/mail.svg
design --- md3 --- svg:icon (bell, 通知提醒) --- design/md3/icons/bell.svg
design --- md3 --- svg:icon (file-text, 富文本文档) --- design/md3/icons/file-text.svg
design --- md3 --- svg:icon (folder, 项目文件夹) --- design/md3/icons/folder.svg
design --- md3 --- svg:icon (bookmark, 收藏书签) --- design/md3/icons/bookmark.svg
design --- md3 --- svg:icon (paperclip, 添加附件) --- design/md3/icons/paperclip.svg
design --- md3 --- svg:icon (share, 分享协作) --- design/md3/icons/share.svg
design --- md3 --- svg:icon (globe, 联网检索) --- design/md3/icons/globe.svg
design --- md3 --- svg:icon (info, 信息提示) --- design/md3/icons/info.svg
design --- md3 --- svg:icon (check-circle, 成功完成) --- design/md3/icons/check-circle.svg
design --- md3 --- svg:icon (alert-triangle, 警示注意) --- design/md3/icons/alert-triangle.svg
design --- md3 --- svg:icon (alert-circle, 错误异常) --- design/md3/icons/alert-circle.svg
design --- md3 --- svg:icon (help-circle, 帮助文档) --- design/md3/icons/help-circle.svg
design --- md3 --- svg:icon (lock, 隐私加密) --- design/md3/icons/lock.svg
design --- md3 --- svg:icon (shield-check, 安全护航) --- design/md3/icons/shield-check.svg
design --- md3 --- svg:icon (sun, 浅色纸感) --- design/md3/icons/sun.svg
design --- md3 --- svg:icon (moon, 深色暖炭) --- design/md3/icons/moon.svg
design --- md3 --- svg:icon (palette, 动态配色) --- design/md3/icons/palette.svg
design --- md3 --- svg:icon (user, 个人账户) --- design/md3/icons/user.svg
design --- md3 --- svg:icon (users, 团队协作) --- design/md3/icons/users.svg
design --- md3 --- svg:icon (settings, 系统设置) --- design/md3/icons/settings.svg
design --- md3 --- svg:icon (star, 精选星标) --- design/md3/icons/star.svg
design --- md3 --- svg:icon (heart, 喜爱点赞) --- design/md3/icons/heart.svg
design --- md3 --- svg:icon (eye, 预览查看) --- design/md3/icons/eye.svg
design --- md3 --- svg:icon (clock, 历史时间) --- design/md3/icons/clock.svg
design --- md3 --- svg:icon (calendar, 日程排期) --- design/md3/icons/calendar.svg
design --- md3 --- svg:icon (command, 快捷指令) --- design/md3/icons/command.svg

## nebula
design --- nebula --- css:tokens (--brand-*, --gray-*, --surface, [data-theme="dark"]) --- design/nebula/tokens.css
design --- nebula --- css:base (.ui-row, .ui-col, .ui-kbd, .ui-icon, .tint-*, .ui-ripple) --- design/nebula/base.css
design --- nebula --- js:runtime (UI.toast/modal/drawer/tabs/ring/theme/copy/utils) --- design/nebula/js/nebula-ui.js
design --- nebula --- svg:sprite (#i-*) --- design/nebula/sprite.svg
design --- nebula --- css:card (.ui-card --hover __head __title __body __foot) --- design/nebula/components/card.css
design --- nebula --- css:button (.ui-btn --primary --icon --sm --lg --loading) --- design/nebula/components/button.css
design --- nebula --- css:field (.ui-field .ui-field__label .ui-input .ui-select) --- design/nebula/components/field.css
design --- nebula --- css:switch (.ui-switch --sm) --- design/nebula/components/switch.css
design --- nebula --- css:checkbox-radio (.ui-check .ui-radio .ui-check-item) --- design/nebula/components/checkbox-radio.css
design --- nebula --- css:slider (.ui-slider (JS paints --p)) --- design/nebula/components/slider.css
design --- nebula --- css:alert (.ui-alert [data-alert-close]) --- design/nebula/components/alert.css
design --- nebula --- css:toast (.ui-toast-wrap .ui-toast UI.toast()) --- design/nebula/components/toast.css
design --- nebula --- css:tooltip ([data-tip]) --- design/nebula/components/tooltip.css
design --- nebula --- css:skeleton (.ui-skel) --- design/nebula/components/skeleton.css
design --- nebula --- css:progress (.ui-progress) --- design/nebula/components/progress.css
design --- nebula --- css:progress-ring (.ui-ring[data-value] UI.ring.set()) --- design/nebula/components/progress-ring.css
design --- nebula --- css:modal (.ui-modal [data-modal-open] [data-modal-close]) --- design/nebula/components/modal.css
design --- nebula --- css:drawer (.ui-drawer [data-drawer-open] [data-drawer-close]) --- design/nebula/components/drawer.css
design --- nebula --- css:dropdown (.ui-dropdown [data-dropdown-trigger]) --- design/nebula/components/dropdown.css
design --- nebula --- css:tabs (.ui-tabs [data-tab] .ui-tab-pane[data-pane]) --- design/nebula/components/tabs.css
design --- nebula --- css:breadcrumb (.ui-crumb .ui-crumb__sep) --- design/nebula/components/breadcrumb.css
design --- nebula --- css:pagination (.ui-page .ui-page__btn [data-page]) --- design/nebula/components/pagination.css
design --- nebula --- css:table (.ui-table) --- design/nebula/components/table.css
design --- nebula --- css:avatar (.ui-avatar) --- design/nebula/components/avatar.css
design --- nebula --- css:badge-tag (.ui-badge .ui-tag [data-tag-close]) --- design/nebula/components/badge-tag.css
design --- nebula --- css:accordion (.ui-acc .open) --- design/nebula/components/accordion.css
design --- nebula --- svg:icon (search) --- design/nebula/icons/search.svg
design --- nebula --- svg:icon (x) --- design/nebula/icons/x.svg
design --- nebula --- svg:icon (check) --- design/nebula/icons/check.svg
design --- nebula --- svg:icon (plus) --- design/nebula/icons/plus.svg
design --- nebula --- svg:icon (minus) --- design/nebula/icons/minus.svg
design --- nebula --- svg:icon (edit) --- design/nebula/icons/edit.svg
design --- nebula --- svg:icon (trash) --- design/nebula/icons/trash.svg
design --- nebula --- svg:icon (download) --- design/nebula/icons/download.svg
design --- nebula --- svg:icon (upload) --- design/nebula/icons/upload.svg
design --- nebula --- svg:icon (copy) --- design/nebula/icons/copy.svg
design --- nebula --- svg:icon (share) --- design/nebula/icons/share.svg
design --- nebula --- svg:icon (refresh) --- design/nebula/icons/refresh.svg
design --- nebula --- svg:icon (filter) --- design/nebula/icons/filter.svg
design --- nebula --- svg:icon (external) --- design/nebula/icons/external.svg
design --- nebula --- svg:icon (more-h) --- design/nebula/icons/more-h.svg
design --- nebula --- svg:icon (more-v) --- design/nebula/icons/more-v.svg
design --- nebula --- svg:icon (chevron-down) --- design/nebula/icons/chevron-down.svg
design --- nebula --- svg:icon (chevron-up) --- design/nebula/icons/chevron-up.svg
design --- nebula --- svg:icon (chevron-left) --- design/nebula/icons/chevron-left.svg
design --- nebula --- svg:icon (chevron-right) --- design/nebula/icons/chevron-right.svg
design --- nebula --- svg:icon (arrow-right) --- design/nebula/icons/arrow-right.svg
design --- nebula --- svg:icon (arrow-left) --- design/nebula/icons/arrow-left.svg
design --- nebula --- svg:icon (arrow-up-right) --- design/nebula/icons/arrow-up-right.svg
design --- nebula --- svg:icon (check-circle) --- design/nebula/icons/check-circle.svg
design --- nebula --- svg:icon (x-circle) --- design/nebula/icons/x-circle.svg
design --- nebula --- svg:icon (alert-circle) --- design/nebula/icons/alert-circle.svg
design --- nebula --- svg:icon (alert-triangle) --- design/nebula/icons/alert-triangle.svg
design --- nebula --- svg:icon (info) --- design/nebula/icons/info.svg
design --- nebula --- svg:icon (help) --- design/nebula/icons/help.svg
design --- nebula --- svg:icon (user) --- design/nebula/icons/user.svg
design --- nebula --- svg:icon (users) --- design/nebula/icons/users.svg
design --- nebula --- svg:icon (settings) --- design/nebula/icons/settings.svg
design --- nebula --- svg:icon (home) --- design/nebula/icons/home.svg
design --- nebula --- svg:icon (bell) --- design/nebula/icons/bell.svg
design --- nebula --- svg:icon (calendar) --- design/nebula/icons/calendar.svg
design --- nebula --- svg:icon (clock) --- design/nebula/icons/clock.svg
design --- nebula --- svg:icon (mail) --- design/nebula/icons/mail.svg
design --- nebula --- svg:icon (lock) --- design/nebula/icons/lock.svg
design --- nebula --- svg:icon (eye) --- design/nebula/icons/eye.svg
design --- nebula --- svg:icon (eye-off) --- design/nebula/icons/eye-off.svg
design --- nebula --- svg:icon (heart) --- design/nebula/icons/heart.svg
design --- nebula --- svg:icon (star) --- design/nebula/icons/star.svg
design --- nebula --- svg:icon (bookmark) --- design/nebula/icons/bookmark.svg
design --- nebula --- svg:icon (folder) --- design/nebula/icons/folder.svg
design --- nebula --- svg:icon (file-text) --- design/nebula/icons/file-text.svg
design --- nebula --- svg:icon (image) --- design/nebula/icons/image.svg
design --- nebula --- svg:icon (camera) --- design/nebula/icons/camera.svg
design --- nebula --- svg:icon (phone) --- design/nebula/icons/phone.svg
design --- nebula --- svg:icon (map-pin) --- design/nebula/icons/map-pin.svg
design --- nebula --- svg:icon (globe) --- design/nebula/icons/globe.svg
design --- nebula --- svg:icon (link) --- design/nebula/icons/link.svg
design --- nebula --- svg:icon (message) --- design/nebula/icons/message.svg
design --- nebula --- svg:icon (send) --- design/nebula/icons/send.svg
design --- nebula --- svg:icon (cart) --- design/nebula/icons/cart.svg
design --- nebula --- svg:icon (credit-card) --- design/nebula/icons/credit-card.svg
design --- nebula --- svg:icon (dollar) --- design/nebula/icons/dollar.svg
design --- nebula --- svg:icon (bar-chart) --- design/nebula/icons/bar-chart.svg
design --- nebula --- svg:icon (pie-chart) --- design/nebula/icons/pie-chart.svg
design --- nebula --- svg:icon (activity) --- design/nebula/icons/activity.svg
design --- nebula --- svg:icon (trending-up) --- design/nebula/icons/trending-up.svg
design --- nebula --- svg:icon (database) --- design/nebula/icons/database.svg
design --- nebula --- svg:icon (server) --- design/nebula/icons/server.svg
design --- nebula --- svg:icon (cloud) --- design/nebula/icons/cloud.svg
design --- nebula --- svg:icon (code) --- design/nebula/icons/code.svg
design --- nebula --- svg:icon (terminal) --- design/nebula/icons/terminal.svg
design --- nebula --- svg:icon (zap) --- design/nebula/icons/zap.svg
design --- nebula --- svg:icon (sun) --- design/nebula/icons/sun.svg
design --- nebula --- svg:icon (moon) --- design/nebula/icons/moon.svg
design --- nebula --- svg:icon (wifi) --- design/nebula/icons/wifi.svg
design --- nebula --- svg:icon (play) --- design/nebula/icons/play.svg
design --- nebula --- svg:icon (pause) --- design/nebula/icons/pause.svg
design --- nebula --- svg:icon (volume) --- design/nebula/icons/volume.svg
design --- nebula --- svg:icon (mic) --- design/nebula/icons/mic.svg
design --- nebula --- svg:icon (log-out) --- design/nebula/icons/log-out.svg
design --- nebula --- svg:icon (menu) --- design/nebula/icons/menu.svg
design --- nebula --- svg:icon (grid) --- design/nebula/icons/grid.svg
design --- nebula --- svg:icon (list) --- design/nebula/icons/list.svg
design --- nebula --- svg:icon (layers) --- design/nebula/icons/layers.svg
design --- nebula --- svg:icon (box) --- design/nebula/icons/box.svg
design --- nebula --- svg:icon (briefcase) --- design/nebula/icons/briefcase.svg
design --- nebula --- svg:icon (shield) --- design/nebula/icons/shield.svg
design --- nebula --- svg:icon (target) --- design/nebula/icons/target.svg
design --- nebula --- svg:icon (thumbs-up) --- design/nebula/icons/thumbs-up.svg
design --- nebula --- svg:icon (sliders) --- design/nebula/icons/sliders.svg
design --- nebula --- svg:icon (tag) --- design/nebula/icons/tag.svg
design --- nebula --- svg:icon (paperclip) --- design/nebula/icons/paperclip.svg
design --- nebula --- svg:icon (loader) --- design/nebula/icons/loader.svg
design --- nebula --- svg:icon (keyboard) --- design/nebula/icons/keyboard.svg
