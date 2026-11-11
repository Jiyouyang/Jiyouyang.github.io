# Jiyouyang · 资源分享

一个采用 Apple 风格黑白基调与液态玻璃视觉的精选资源分享站，可直接部署到 GitHub Pages。

网站设置提供六种风格，顺序为经典、终端、科技、黑金典藏、哥伦比娅、芙宁娜。经典保留液态玻璃与留白，终端采用等宽字体与荧光面板，科技采用陶瓷装甲、切角图形和机械接缝，黑金典藏采用墨黑暖金、细线边框、徽章图案与典藏标题排版，哥伦比娅采用月光蓝白、星月羽翼，芙宁娜采用枫丹蓝金、水纹、礼帽与歌剧舞台边框。芙宁娜首次进入为深色蓝色，也支持珍珠白浅色、跟随系统与其余配色；六套风格分别保存颜色与深浅模式，语言设置通用。

## 功能

- 开发、学习、工具、游戏四类资源与“全部”筛选
- 首页“电脑工具”卡片进入独立专区，专区内可整卡前往 Google Chrome、Python、Steam、图吧工具箱、IDM、Watt 工具箱和 v2rayN 的官方页面，以及 IDM_Cracker GitHub 项目、The Pirate Bay 和 Nyaa 的原站
- 资源名称、说明与域名即时搜索
- 卡片收藏、链接复制、“我的常用”排序、大卡片/紧凑列表切换
- 全站快捷搜索：别名、分类结果、最近搜索与 Ctrl/⌘+K、/ 快捷键
- 石墨、蓝、紫、绿、橙五种主题色
- 跟随系统、浅色、深色外观
- 简体中文、繁体中文、英语、日语
- 手机与桌面响应式布局
- Minecraft 专区：基岩版与国服下载、Java 版模组、桌面端启动器、移动端入口与双网站种子查询；国服下载页提供 Android、电脑和 iOS 官方入口
- 原神专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 绝区零专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 崩坏：星穹铁道（崩铁）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 明日方舟：终末地（终末地）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及兑换码查询
- 首页可展开的置顶公告与按日期折叠的更新日志

## 内容维护

共享资源目录位于 `scripts/resource-catalog.js` 的 `window.JYCatalog`，包括原有 14 项首页资源（`home: true`）与 28 项专区卡片。首页 `scripts/app.js` 从目录筛出首页资源，公告仍位于该文件的 `announcements` 数组。每项资源包含链接、域名、分类、封面字符、四语言标题/说明、来源类型、平台及别名。专区卡片文案修改时，同步更新目录镜像；`tests/library-experience.cjs` 核对四语言一致性。

`scripts/library-experience.js` 负责收藏、排序、复制链接、快捷搜索、搜索历史、紧凑列表与返回位置恢复；视觉补充集中在 `styles/library-experience.css`。17 页均先加载资源目录、再加载增强脚本、最后加载原页面脚本。收藏与偏好只存于当前浏览器，不涉及账号或外部同步；禁止存储时降级为本页临时使用，自动复制失败时提供可选中的链接。复制下载链接会跟随当前平台与可见按钮更新。

首页筛选共四类：开发、学习、工具、游戏（另有“全部”）。工具类统一包含电脑工具专区、Jisho 与 Can I use，避免同名筛选分散资源。下载页平台/渠道栏支持左右方向键、Home/End 与单一 Tab 焦点入口；原有鼠标及触屏交互不变。iOS 图标继续使用原生 Apple 字符和镂空样式，非 Apple 字体环境由 `assets/fonts/` 中的 OFL 单字形字体兼容。

Minecraft 正式入口为 `minecraft.html`，子页面是 `minecraft-download.html`、`minecraft-china.html`、`minecraft-mods.html`、`minecraft-launchers.html`、`minecraft-mobile.html` 和 `minecraft-seed.html`。国服下载页的 Android、Windows 与 iOS 选项卡只切换内容，下载按钮分别前往网易官方下载入口与中国区 App Store。种子查询页不设选项卡，两个并列按钮分别前往 Minecraft Search 与 Chunkbase。对应逻辑集中在 `scripts/`（专区使用 `scripts/minecraft-hub.js`，国服下载页使用 `scripts/minecraft-china.js`，种子查询页使用 `scripts/minecraft-seed.js`）。电脑工具专区位于 `computer-tools.html`，四语言与设置逻辑位于 `scripts/computer-tools.js`。原神、绝区零、崩铁与终末地专区及下载页逻辑同样位于 `scripts/`。旧版 `minecraft.js` 与 `preview.html` 已归档到 `archive/legacy/`，不参与正式页面。详细维护约定见 `CODEX_HANDOFF.md`。

十七个正式页面共用 `styles/card-controls.css` 中的卡片图片区样式；首页“每周精选”在其中使用单块浅色底板与右上角图形布局，资源库普通卡片不受该规则影响。新的浅色玻璃选择器只用于下载页面的 `.platform-tabs` 平台/渠道选择，不覆盖主页分类或设置面板等其他分段控件。页面其余基础样式仍在各自 HTML 中。修改这份共享样式后，须同步更新全部正式页面的 CSS 缓存版本号。

## 部署

全部 17 个正式页面加载 `scripts/site-style.js`、`styles/site-style.css`、`styles/mecha.css`、`styles/blackgold.css`、`styles/columbina.css` 与 `styles/furina.css`。脚本在首屏绘制前恢复风格并在设置中加入四语言切换器；五份样式文件分别以对应的 `data-style` 隔离视觉覆盖，共享的风格预览控件放在 `site-style.css` 中。新增页面须引用这六份文件；新增组件须验证六套风格及滑块边界。不要删除各页原有设置处理函数，风格切换会复用它们。已移除的风格不会保留隐藏入口、图片或样式，旧选择自动回到经典风格并清理无效的独立风格偏好，不影响其余数据。

哥伦比娅主题只在选中时加载本地角色图片，并在页脚展示四语言来源与非官方说明；来源入口指向中国大陆米游社官方页面，页面运行时不依赖海外图片地址。切换其他风格后图片与说明隐藏。素材原图、来源及版权记录位于 `assets/themes/columbina/`，图片不可用时仍有纯 CSS 月亮背景，正常功能不依赖图片。

仓库根目录保留 `.nojekyll`，GitHub Pages 使用 `main` 分支根目录发布。

芙宁娜选项紧随哥伦比娅，选中后才直接从 B站 BWIKI 的 `patchwiki.biligame.com` 国内域名加载官方生日贺图，首屏和背景共用该图；提供同字节本地备用图、错误/超时降级与四语言来源说明。记录见 `assets/themes/furina/README.md`，检查入口为 `tests/furina-art.cjs`。

浏览器标签页、Apple 主屏幕与桌面快捷方式图标使用 `assets/site-cover.jpg`。
