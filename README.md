# Jiyouyang · 资源分享

一个采用 Apple 风格黑白基调与液态玻璃视觉的精选资源分享站，可直接部署到 GitHub Pages。

## 功能

- 开发、学习、工具、游戏资源分类
- 资源名称、说明与域名即时搜索
- 石墨、蓝、紫、绿、橙五种主题色
- 跟随系统、浅色、深色外观
- 简体中文、繁体中文、英语、日语
- 手机与桌面响应式布局
- Minecraft 专区：基岩版下载、Java 版模组、桌面端启动器与移动端入口
- 原神专区：国际版 Android / iOS / Windows 下载入口及国服官网直达卡片
- 首页可展开的更新公告

## 内容维护

首页资源数据位于 `app.js` 的 `resources` 数组，公告位于同文件的 `announcements` 数组。每项资源包含链接、域名、分类、封面字符以及四种语言的标题与说明。

Minecraft 正式入口为 `minecraft.html`，子页面是 `minecraft-download.html`、`minecraft-mods.html`、`minecraft-launchers.html` 和 `minecraft-mobile.html`，分别由同名 JS（专区由 `minecraft-hub.js`）管理。原神专区由 `genshin.html` / `genshin.js` 提供，下载页由 `genshin-download.html` / `genshin-download.js` 提供。`minecraft.js` 与 `preview.html` 仅是旧版遗留文件，不参与正式页面。详细维护约定见 `CODEX_HANDOFF.md`。

八个正式页面共用 `card-controls.css` 中的卡片图片区样式；其中新的浅色玻璃选择器只用于下载页面的 `.platform-tabs` 平台/渠道选择，不覆盖主页分类或设置面板等其他分段控件。页面其余基础样式仍在各自 HTML 中。修改这份共享样式后，须同步更新八个页面的 CSS 缓存版本号。

## 部署

仓库根目录保留 `.nojekyll`，GitHub Pages 使用 `main` 分支根目录发布。

浏览器标签页、Apple 主屏幕与桌面快捷方式图标使用 `assets/site-cover.jpg`。
