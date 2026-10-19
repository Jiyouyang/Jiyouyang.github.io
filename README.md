# Jiyouyang · 资源分享

一个采用 Apple 风格黑白基调与液态玻璃视觉的精选资源分享站，可直接部署到 GitHub Pages。

网站设置提供六种风格：经典保留液态玻璃与留白，终端采用等宽字体与荧光面板，科技采用陶瓷装甲、切角图形和机械接缝，黑金典藏采用墨黑暖金、细线边框、徽章图案与典藏标题排版，哥伦比娅采用角色美术、月光蓝白、星月轨道与羽翼轮廓，绪山真寻采用奶油粉紫、动画相片、淡化街景与贴纸手账卡片。终端首次进入为深色绿色，科技为浅色橙色，黑金典藏为深色暖金（橙色档），哥伦比娅为浅色蓝色，绪山真寻为浅色紫色；六套风格分别保存颜色与深浅模式，语言设置通用。

## 功能

- 开发、学习、工具、电脑工具、游戏资源分类
- 首页“电脑工具”卡片进入独立专区，专区内可整卡前往 Google Chrome、Python、Steam、图吧工具箱、IDM、Watt 工具箱和 v2rayN 的官方页面，以及 IDM_Cracker GitHub 项目、The Pirate Bay 和 Nyaa 的原站
- 资源名称、说明与域名即时搜索
- 石墨、蓝、紫、绿、橙五种主题色
- 跟随系统、浅色、深色外观
- 简体中文、繁体中文、英语、日语
- 手机与桌面响应式布局
- Minecraft 专区：基岩版与国服下载、Java 版模组、桌面端启动器、移动端入口与双网站种子查询；国服下载页提供 Android、电脑和 iOS 官方入口
- 原神专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 绝区零专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 崩坏：星穹铁道（崩铁）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及可用兑换码查询
- 明日方舟：终末地（终末地）专区：国际版 Android / iOS / Windows 下载入口、国服官网直达卡片及兑换码查询
- 首页可展开的更新公告

## 内容维护

首页资源数据位于 `scripts/app.js` 的 `resources` 数组，公告位于同文件的 `announcements` 数组。每项资源包含链接、域名、分类、封面字符以及四种语言的标题与说明。

Minecraft 正式入口为 `minecraft.html`，子页面是 `minecraft-download.html`、`minecraft-china.html`、`minecraft-mods.html`、`minecraft-launchers.html`、`minecraft-mobile.html` 和 `minecraft-seed.html`。国服下载页的 Android、Windows 与 iOS 选项卡只切换内容，下载按钮分别前往网易官方下载入口与中国区 App Store。种子查询页不设选项卡，两个并列按钮分别前往 Minecraft Search 与 Chunkbase。对应逻辑集中在 `scripts/`（专区使用 `scripts/minecraft-hub.js`，国服下载页使用 `scripts/minecraft-china.js`，种子查询页使用 `scripts/minecraft-seed.js`）。电脑工具专区位于 `computer-tools.html`，四语言与设置逻辑位于 `scripts/computer-tools.js`。原神、绝区零、崩铁与终末地专区及下载页逻辑同样位于 `scripts/`。旧版 `minecraft.js` 与 `preview.html` 已归档到 `archive/legacy/`，不参与正式页面。详细维护约定见 `CODEX_HANDOFF.md`。

十七个正式页面共用 `styles/card-controls.css` 中的卡片图片区样式；首页“每周精选”在其中使用单块浅色底板与右上角图形布局，资源库普通卡片不受该规则影响。新的浅色玻璃选择器只用于下载页面的 `.platform-tabs` 平台/渠道选择，不覆盖主页分类或设置面板等其他分段控件。页面其余基础样式仍在各自 HTML 中。修改这份共享样式后，须同步更新全部正式页面的 CSS 缓存版本号。

## 部署

全部 17 个正式页面加载 `scripts/site-style.js`、`styles/site-style.css`、`styles/mecha.css`、`styles/blackgold.css`、`styles/columbina.css` 与 `styles/mahiro.css`。脚本在首屏绘制前恢复风格并在设置中加入四语言切换器；五份样式文件分别以对应的 `data-style` 隔离视觉覆盖，共享的风格预览控件放在 `site-style.css` 中。新增页面须引用这六份文件；新增组件须验证六套风格及滑块边界。不要删除各页原有设置处理函数，风格切换会复用它们。

哥伦比娅主题只在选中时加载本地角色图片，并在页脚展示四语言来源与非官方说明；来源入口指向中国大陆米游社官方页面，页面运行时不依赖海外图片地址。切换其他风格后图片与说明隐藏。素材原图、来源及版权记录位于 `assets/themes/columbina/`，图片不可用时仍有纯 CSS 月亮背景，正常功能不依赖图片。

仓库根目录保留 `.nojekyll`，GitHub Pages 使用 `main` 分支根目录发布。

绪山真寻主题选中后才从 B 站和堆糖的国内图片 CDN 请求画面，失败或超时自动使用相同图片的同源备用文件；切换后隐藏。来源、版权及文件哈希见 `assets/themes/mahiro/README.md`，四语言页脚同时提供原出处链接。未选中该主题时不请求其图片；不改变其他主题、原有资源链接或下载交互。

浏览器标签页、Apple 主屏幕与桌面快捷方式图标使用 `assets/site-cover.jpg`。
