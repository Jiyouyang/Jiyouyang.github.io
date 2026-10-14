# Jiyouyang · 资源分享

一个采用 Apple 风格黑白基调与液态玻璃视觉的精选资源分享站，可直接部署到 GitHub Pages。

## 功能

- 开发、学习、工具、电脑工具、游戏资源分类
- 首页“电脑工具”卡片进入独立专区，专区内的 Google Chrome、Steam、图吧工具箱和 IDM 卡片可直接前往官方页面
- 资源名称、说明与域名即时搜索
- 石墨、蓝、紫、绿、橙五种主题色
- 跟随系统、浅色、深色外观
- 简体中文、繁体中文、英语、日语
- 手机与桌面响应式布局
- Minecraft 专区：基岩版下载、Java 版模组、桌面端启动器、移动端入口与双网站种子查询
- 原神专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 绝区零专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 崩坏：星穹铁道（崩铁）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 明日方舟：终末地（终末地）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及兑换码查询
- 首页可展开的更新公告

## 内容维护

首页资源数据位于 `scripts/app.js` 的 `resources` 数组，公告位于同文件的 `announcements` 数组。每项资源包含链接、域名、分类、封面字符以及四种语言的标题与说明。

Minecraft 正式入口为 `minecraft.html`，子页面是 `minecraft-download.html`、`minecraft-mods.html`、`minecraft-launchers.html`、`minecraft-mobile.html` 和 `minecraft-seed.html`。种子查询页不设选项卡，两个并列按钮分别前往 Minecraft Search 与 Chunkbase。对应逻辑集中在 `scripts/`（专区使用 `scripts/minecraft-hub.js`，种子查询页使用 `scripts/minecraft-seed.js`）。电脑工具专区位于 `computer-tools.html`，四语言与设置逻辑位于 `scripts/computer-tools.js`。原神、绝区零、崩铁与终末地专区及下载页逻辑同样位于 `scripts/`。旧版 `minecraft.js` 与 `preview.html` 已归档到 `archive/legacy/`，不参与正式页面。详细维护约定见 `CODEX_HANDOFF.md`。

十六个正式页面共用 `styles/card-controls.css` 中的卡片图片区样式；首页“每周精选”在其中使用单块浅色底板与右上角图形布局，资源库普通卡片不受该规则影响。新的浅色玻璃选择器只用于下载页面的 `.platform-tabs` 平台/渠道选择，不覆盖主页分类或设置面板等其他分段控件。页面其余基础样式仍在各自 HTML 中。修改这份共享样式后，须同步更新十六个页面的 CSS 缓存版本号。

## 部署

仓库根目录保留 `.nojekyll`，GitHub Pages 使用 `main` 分支根目录发布。

浏览器标签页、Apple 主屏幕与桌面快捷方式图标使用 `assets/site-cover.jpg`。
