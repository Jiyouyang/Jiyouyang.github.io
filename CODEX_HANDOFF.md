# CODEX 项目交接文档

> 最后更新：2026-10-14
> 当前仓库：`Jiyouyang/Jiyouyang.github.io`  
> 当前分支：`main`  
> 线上地址：https://jiyouyang.github.io/

## 维护约定（后续 Codex 必读）

这是本项目的持续交接文档。今后每次完成用户提出的功能、文案、翻译、视觉、交互、链接或部署调整时，必须在同一次提交中同步更新本文件，至少记录：需求、实现、涉及文件、验证结果、遗留问题和新决策。不要只修改代码而遗漏交接文档。

开始新任务前应先阅读本文件，再检查线上分支是否有更新；不要依据聊天记忆覆盖仓库中的较新内容。完成后应进行与改动风险相称的验证，并发布到 `main`（除非用户明确要求只在本地保存）。

### 每次改动前的 GitHub 完整备份（强制）

- 每次用户要求更改本仓库时，包括代码、页面、文案、翻译、设计、链接、配置、部署和文档，**先备份，再编辑任何文件**。同一轮内若用户追加了新的独立改动，也先为该改动保留新的修改前版本。
- 先读取本文件，核对 GitHub `main` 最新提交、当前分支与工作区状态。备份必须代表即将修改的完整仓库基线，而不是只保存本次要改的文件。正常干净工作区直接以该基线提交**同时建立 GitHub 备份分支和带注释的 Git 标签**：分支命名为 `backup/pre-change-YYYY-MM-DD_HH-mm-ss_UTC`，标签命名为 `backup-YYYY-MM-DD_HH-mm-ss_UTC`；两者使用同一个 UTC 时间，精确到秒，不覆盖或复用旧备份。
- 标签必须推送到仓库的 **Releases → Tags** 页面，就像 `pre-visual-upgrade-20261011` 一样；GitHub 会自动提供该标签版本的 ZIP 和 tar.gz 源码下载。用户要的是 Tags 页面可见、可下载的备份；除非另有要求，不必额外创建带说明的 Release 条目或重复上传 ZIP 附件。
- 若工作区有未提交修改或未跟踪的项目文件，不能假定 `HEAD` 已包含“所有内容”。先以不覆盖用户工作的方式把这些内容纳入独立、可恢复的 GitHub 快照；若无法确认完整范围或无法安全上传，暂停编辑并向用户说明。不得为了备份而丢弃、重置或擅自混入用户的修改。
- 编辑前必须核验远端备份分支与标签都确实存在、都指向同一个预期基线提交，且该提交包含当时仓库的全部文件；带注释标签核验时应查看其剥离后的提交 SHA（`^{}`），不能把标签对象 SHA 误当成提交 SHA。任一备份未验证成功时，不开始本次改动，也不声称已完整备份。
- 在本文件的本次更新记录中写明备份的 UTC 时间、分支名、标签名和基线提交 SHA。完成改动后再验证、提交并发布；回滚应从备份分支或标签恢复为新提交，不强制推送覆盖历史。

### “滚回上一个版本”的范围（强制）

- 用户说“滚回上一个版本”时，默认**只恢复实际网站相关文件**：正式页面、页面正在使用的 CSS/JavaScript、网站图片与图标、PWA 文件，以及确有必要的发布配置。先确认目标版本和具体文件清单，再逐一恢复；不要对仓库根目录执行无差别的 `git restore -- .`、`git reset --hard` 或等效操作。
- 非网站文件及其最新内容必须保留，包括但不限于 `CODEX_HANDOFF.md`、`docs/ROLLBACK.md`、`README.md`、测试/维护脚本和其他项目文档；GitHub 备份分支与标签也必须保留。若某文件是否属于网站运行范围不明确，先核实用途，不擅自回滚。
- 回滚后只向当前版 `CODEX_HANDOFF.md` 追加回滚原因、目标版本、改动范围、备份和验证记录；不得用旧版本的交接文档覆盖现行规则。用户明确指定文档也要回滚时，才单独处理其点名的文件。

## 1. 项目目标与当前定位

### 本次视觉升级的回滚点

- 升级前完整基线：`dcc9d01b0e9c9e024b48fb1242ad54c86e420242`。
- 已推送远端备份分支 `backup/pre-visual-upgrade-20261011` 与固定标签 `pre-visual-upgrade-20261011`。
- **2026-10-11 已按用户要求恢复到该视觉版本。** 恢复通过新提交保留 Git 历史，没有强制推送。操作步骤见 `docs/ROLLBACK.md`。
- 恢复前的升级版另外保存在 `backup/pre-change-2026-10-11_10-08-23_UTC`，基线提交 `89a16cad9c5f3cd909c6df282c2ec06a0fe4c0c2`；需要重回升级版时可从此分支恢复。

本站已经从最初的个人博客/资源混合页面，收敛为一个简洁的“资源分享站”。博客入口与博客内容已移除，首页只保留资源发现和筛选功能。Minecraft、原神、绝区零、崩坏：星穹铁道与明日方舟：终末地拥有独立的站内内容专区，方便未来继续增加相关入口。

整体目标：

- 以 Apple 官网式黑白基调为主，保持克制、留白和清晰层级。
- 使用高透明度液态玻璃效果，但可读性优先，不能因透明而让文字和控件难以辨认。
- 手机端是重要使用场景，尤其需要适配 iPhone Safari 的固定导航、触控热区、键盘唤起与桌面图标。
- 所有主要页面共享主题色、深浅模式和四语言设置。
- 资源卡片负责进入站内分类页或外部资源；“选项卡只切换内容，下载按钮才打开外链”是必须保持的交互原则。

## 2. 当前信息架构

### 首页 `/index.html`

- 网站名称：Jiyouyang。
- 当前定位：资源分享，不再展示博客。
- 顶部固定液态玻璃导航：品牌、居中的“资源分享”、搜索按钮、齿轮“网站设置”。
- 搜索按钮与设置按钮之间保留距离，避免移动端误触。
- 手机端导航的搜索和齿轮按钮均有 44px 点按区域；设置入口在窄屏显示齿轮图标，可访问性名称仍为“网站设置”。
- 点击顶部搜索按钮会平滑滚动到资源搜索栏并主动聚焦输入框，以唤起系统键盘。
- 分类：全部、开发、学习、工具、电脑工具、游戏。
- 电脑工具分类目前有 Google Chrome、Steam、图吧工具箱三张卡片；点击整张卡片直接打开外部网站。Chrome 前往 Google 官方下载引导页 <https://www.google.com/chrome/>，Steam 前往官网 <https://store.steampowered.com/>，图吧工具箱前往已核对的原版官方下载页 <https://www.tbtool.cn/download/index.html>。
- 资源支持按标题、简介、域名和分类即时检索。
- 搜索支持按资源名称、简介、域名及分类即时筛选；升级版特有的搜索清空按钮和键盘快捷聚焦已随回滚移除。
- Minecraft、原神、绝区零、崩坏：星穹铁道、明日方舟：终末地资源卡片依次位于资源列表前列，分别进入站内专区。
- 首页 Minecraft、原神、绝区零、崩铁与终末地卡片的简介均按当前实际入口描述。

首页当前资源数据在 `scripts/app.js` 的 `resources` 数组中，包括 Minecraft、原神、绝区零、崩铁、终末地、MDN、GitHub、Apple Developer、freeCodeCamp、JLPT、Jisho、Can I Use、Google Chrome、Steam、图吧工具箱、SteamDB 等。

### Minecraft 专区 `/minecraft.html`

这是 Minecraft 的“大选项”/内容聚合页。当前包含五张站内卡片：

1. **Minecraft 基岩版下载** → `/minecraft-download.html`
   - 标题不再写“国际”“双端”或“启动器双端”。
   - 简体中文简介：`支持 Windows 与 Android 双端，选择对应平台前往下载。`
   - 设备范围放在简介，不塞进标题。
2. **Minecraft Java 版模组下载** → `/minecraft-mods.html`
   - 提供 CurseForge 与 Modrinth 两个平台。
   - 简介需要保留无法访问时使用合适网络访问方式的提示；中文按用户原意表达为“如无法访问请使用科学上网”。
3. **Minecraft Java 版启动器下载** → `/minecraft-launchers.html`
   - 标题不再写“桌面端”。
   - 简体中文简介：`适用于桌面端，可选择官方启动器、PCL 或 HMCL。`
   - 桌面端范围放在简介，不塞进标题。
4. **Minecraft Java 版移动端下载** → `/minecraft-mobile.html`
   - 提供 Android 与 iOS 两个移动端入口。
   - Android 对应 Fold Craft Launcher，iOS 对应 Amethyst iOS。
   - 选项卡只切换内容，下方按钮才打开下载网页。
5. **Minecraft 种子查询** → `/minecraft-seed.html`
   - 专区卡片进入站内详情页，使用站内箭头 →。
   - 简体中文简介：`可输入自己想查的种子号，选择查询网站查看种子地图。`
   - 详情页不设选项卡；只有“查询网站 1”和“查询网站 2”两个按钮打开外链。四语言、五种主题色和深浅模式均须同步。

专区的目的不是只放一个下载卡片，而是作为可持续扩充的 Minecraft 内容容器；以后用户还会加入更多 Minecraft 相关跳转选项。

### 种子查询页 `/minecraft-seed.html`

- 页面采用与其他 Minecraft 详情页一致的导航、卡片、按钮和网站设置；没有平台选项卡。
- 两个按钮参照基岩版 Android 双下载按钮：同一行优先并排，网站 1 为主按钮、网站 2 为柔和底色的次按钮；空间不足时可换行。
- 查询网站 1：<https://minecraftsearch.com/zh-CN/工具/种子地图#seed=123&platform=bedrock_26.50&dimension=overworld&x=0&z=0&zoom=16.000>
- 查询网站 2：<https://www.chunkbase.com/apps/>
- 两个外链仅由明确的查询按钮打开；页面本身不输入或保存种子号。站点 1 链接包含用户提供的 `seed=123` 等初始参数。

### 基岩版下载页 `/minecraft-download.html`

- 页面名称：Minecraft 基岩版（已删除此前所有“国际”字样）。
- Windows 与 Android 是页内选项卡。
- **点击选项卡只能切换卡片内容，绝对不能跳转外部网站。**
- 下载页选项卡在旧版中通过按钮切换并更新选中状态；升级版增加的键盘箭头操作与 URL hash 分享恢复已随回滚移除。
- 只有卡片下方的下载按钮才能打开对应外链。
- Windows 下载：<https://mc.minebbs.com/?platform=3&environment=1>
- Android 下载页面 1：<https://mc.minebbs.com/?platform=1&environment=1>
- Android 下载页面 2：<https://mcapks.net>
- Android 简介需说明：如果下载页面 1 没有想要的版本，请尝试链接 2。
- 已按用户要求移除页面底部额外的“页面说明”卡片，只保留必要内容与页脚。

### Java 模组页 `/minecraft-mods.html`

- 选项卡：CurseForge、Modrinth。
- 选项卡只切换展示内容，按钮才打开外链。
- CurseForge：<https://www.curseforge.com/minecraft/search?page=1&pageSize=20&sortBy=relevancy>
- Modrinth：<https://modrinth.com/discover/mods>
- 简介需要表达“如无法访问请使用科学上网”；英文与日文使用更中性的“appropriate network access method”。

### Java 启动器页 `/minecraft-launchers.html`

- 页面名称：Minecraft Java 版启动器下载。
- 三个页内选项卡从左到右：官方启动器、PCL、HMCL。
- 选项卡只切换，下载按钮才打开对应网站。
- 官方启动器：<https://www.minecraft.net/zh-hans/download>
- PCL：<https://github.com/Meloong-Git/PCL>
- HMCL：<https://github.com/HMCL-dev/HMCL/releases/tag/v3.16.4>
- 这是桌面端启动器集合，但“桌面端”只在简介中说明，不放进页面或卡片主标题。

### Java 移动端页 `/minecraft-mobile.html`

- 页面名称：Minecraft Java 版移动端下载。
- 两个页内选项卡：Android、iOS。
- 选项卡只切换展示内容，下载按钮才打开外部网站。
- Android / Fold Craft Launcher：<https://foldcraftlaunch.com/download/>
- iOS / Amethyst iOS：<https://github.com/herbrine8403/Amethyst-iOS-MyRemastered/releases>
- 页面继承五种主题色、深浅模式及简中、繁中、英文、日文翻译。

### 原神专区 `/genshin.html`

主页中的“原神”入口紧随 Minecraft，进入独立原神专区。当前包含三张卡片：

- **原神国际版下载** → `/genshin-download.html`
- **原神国服下载** → 直接打开 <https://ys.mihoyo.com/main/m/?from_fab=1>
- **原神兑换码** → 直接打开 <https://www.crimsonwitch.com/codes/Genshin_Impact> 查询当前可用兑换码；卡片操作文案为“查询可用兑换码”。
- 卡片、专区与下载页沿用黑白基调、五种主题色、深浅模式及四语言。
- 今后可以继续加入其他原神资源卡片。

### 原神国际版下载页 `/genshin-download.html`

- 平台页签从左到右为 Android、iOS、Windows。页签只切换展示内容，不导航到外部网站。
- Android 有两个同等重要、同样视觉权重的下载按钮：
  - Google Play 官方下载：<https://play.google.com/store/apps/details/Genshin_Impact?id=com.miHoYo.GenshinImpact&hl=en_NZ&pli=1>
  - APK 下载：<https://genshin-impact.cn.uptodown.com/android/dw/1218436799-x>
- Android 简介明确写有“如无法打开，请使用科学上网”。
- iOS 下载按钮前往：<https://apps.apple.com/us/app/genshin-impact-6th-anniversary/id1517783697>
- iOS 简介明确写有“请使用非中国大陆地区 Apple 账号”。
- Windows 下载按钮前往 HoYoPlay 官方启动器：<https://hoyoplay.hoyoverse.com>
- 只有下载按钮打开外链。APK 地址由用户指定，可能指向特定版本；以后改版本时要检查地址是否仍有效。

### 绝区零专区 `/zzz.html`

- 首页“绝区零”卡片位于原神之后，进入独立专区。
- 三张卡片参照原神：**绝区零国际版下载** → `/zzz-download.html`；**绝区零国服下载** → <https://zzz.mihoyo.com/main/>；**绝区零兑换码** → <https://www.crimsonwitch.com/codes/Zenless_Zone_Zero>。
- 国服官网和兑换码查询为卡片直达外链；国际版下载先进入站内平台选择页。兑换码页面只用于查询，是否有可用码以目标站当时显示为准。
- 后续如在此对话继续维护绝区零内容，仍先读取本文件并核对 GitHub 最新版本，执行完整备份规则。

### 绝区零国际版下载页 `/zzz-download.html`

- 平台页签从左到右为 Android、iOS、Windows；页签只切换内容，下载按钮才打开外链。
- Android 两个按钮：Google Play 官方页面 <https://play.google.com/store/apps/details?id=com.HoYoverse.Nap>；APKPure 的 XAPK 安装包页面 <https://apkpure.net/zenless-zone-zero/com.HoYoverse.Nap/download>。后者是第三方页面，使用不带版本号的入口，仍需定期核对版本和可用性。
- iOS：美国区 App Store <https://apps.apple.com/us/app/zenless-zone-zero/id1606356401>；提示使用非中国大陆地区 Apple 账号。
- Windows：HoYoPlay 官方启动器 <https://hoyoplay.hoyoverse.com/>。
- 沿用现有黑白基调、五种主题色、深浅模式与简中、繁中、英语、日语四语言。

### 崩坏：星穹铁道（崩铁）专区 `/hsr.html`

- 首页“崩坏：星穹铁道”卡片位于绝区零之后，进入独立专区；搜索“崩铁”也可找到。
- 三张卡片沿用原神与绝区零的层级：**国际版下载** → `/hsr-download.html`；**国服下载** → <https://sr.mihoyo.com/>；**兑换码查询** → <https://www.crimsonwitch.com/codes/Honkai_Star_Rail>。
- 国服官网与兑换码查询为卡片直达外链，国际版先进入站内下载选择页。兑换码页面用于查询，实际可用码以目标站显示为准。
- 后续如在此对话继续维护崩铁内容，先读取本文件并核对 GitHub 最新版本，执行完整备份规则。

### 崩坏：星穹铁道国际版下载页 `/hsr-download.html`

- 平台页签依次为 Android、iOS、Windows；页签只切换内容，下载按钮才打开外链。
- Android：Google Play 官方页面 <https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea>；APKPure 无版本号的 XAPK 下载页面 <https://apkpure.net/honkai-star-rail/com.HoYoverse.hkrpgoversea/download>。APKPure 为第三方页面，应定期核对包类型与可用性。
- iOS：美国区 App Store <https://apps.apple.com/us/app/honkai-star-rail/id1599719154>；提示使用非中国大陆地区 Apple 账号。
- Windows：HoYoPlay 官方启动器 <https://hoyoplay.hoyoverse.com/>。
- 沿用现有黑白基调、五种主题色、深浅模式与简中、繁中、英语、日语四语言。

### 明日方舟：终末地（终末地）专区 `/endfield.html`

- 首页“明日方舟：终末地”卡片位于崩铁之后，进入独立专区；搜索“终末地”也可找到。
- 三张卡片沿用原神、绝区零与崩铁的层级：**国际版下载** → `/endfield-download.html`；**国服下载** → <https://endfield.hypergryph.com/>；**兑换码查询** → <https://www.redeem-code-tracker.com/games/arknights-endfield>。
- 国服官网与兑换码列表为卡片直达外链；国际版先进入站内下载选择页。兑换码列表由第三方维护，实际可用性以页面当时信息和游戏内兑换结果为准。
- 后续在此对话继续维护终末地内容时，先读取本交接文档、核对 GitHub 最新版本并执行完整备份规则。

### 明日方舟：终末地国际版下载页 `/endfield-download.html`

- 平台页签依次为 Android、iOS、Windows；页签只切换内容，下载按钮才打开外链。
- Android：Google Play 官方页面 <https://play.google.com/store/apps/details?id=com.gryphline.endfield.gp>；APKPure 无版本号的 APK 下载页面 <https://apkpure.net/arknights-endfield/com.gryphline.endfield.gp/download>。APKPure 为第三方页面，包格式和版本仍需定期核对。
- iOS：美国区 App Store <https://apps.apple.com/us/app/arknights-endfield/id6752642477>；提示使用非中国大陆地区 Apple 账号。
- Windows：GRYPHLINE 国际服官网 <https://endfield.gryphline.com/en-us>，从官方页面获取 Windows 启动器。
- 沿用现有黑白基调、五种主题色、深浅模式与简中、繁中、英语、日语四语言。

## 3. 视觉与设计系统

### 基调

- 从早期蓝紫渐变改为 Apple 风格黑白/石墨基调。
- 浅色背景接近 `#f5f5f7`，深色背景为黑色；表面、描边和文字使用 Apple 风格中性色阶。
- 默认主题色为石墨，不使用高饱和渐变作为默认视觉。
- 保持大圆角、充足留白、粗体大标题、简短说明和轻阴影。
- 当前 15 个正式页面各自保留原有页面样式，手机端沿用原响应式单列布局。升级版共享的 `site.css` 已从当前版本移除，但仍可在备份分支找回。
- 2026-10-11 在保留各页原有结构与黑白基调的前提下，新增现位于 `styles/card-controls.css` 的共享样式，统一主页精选/资源卡片、Minecraft、原神与绝区零专区卡片、所有下载页平台插图，并只为下载页的 `.platform-tabs` 平台/渠道选择使用新版浅色玻璃滑块。主页分类、设置面板及其他分段控件继续沿用原先设计。
- 升级版曾调整深色背景及强调色对比度；当前回滚版沿用升级前的颜色实现，后续须以页面现存 CSS 为准。
- 卡片头图为抽象文字/字形构图（如 MC、MOD），不是写实封面图。
- 用户曾要求移除首页 Hero 下方三个装饰图标；不要恢复。

### 液态玻璃

- 导航栏、设置弹窗、分段选择器使用半透明背景、`backdrop-filter: blur(...) saturate(...)`、细亮边和内高光。
- 视觉参考 iOS 高透明液态玻璃，但不能完全复制参考图。
- 滑块/分段控件的活动底板要清楚，文字与背景必须有足够对比度。
- 顶部导航中“资源分享”等居中标签与设置面板应在视觉上融合，不要出现多余的内层纯白底块。
- 下载页的平台/渠道选择使用新版浅色玻璃滑块；设置面板、主页分类及其他分段控件沿用升级前设计。公告收起高度继续与导航协调。

### 可选主题色

所有正式页面均提供五种主题色，并通过 CSS 自定义属性影响按钮、活动滑块、强调文字、卡片插图和柔和背景：

- 石墨：`#1d1d1f`（默认）
- 蓝色：`#0071e3`
- 紫色：`#7656d6`
- 绿色：`#248a3d`
- 橙色：`#c45100`

重要决策：主题色不能只改变按钮。资源卡片插图、MC/MOD 图形、强调线和选中状态也应通过 `var(--accent)`、`color-mix()` 等同步变色。

### 深浅模式

- 三档：跟随系统、浅色、深色。
- 默认跟随系统。
- 系统主题变化时，若用户仍选择“跟随系统”，页面应实时更新。
- `meta[name="theme-color"]` 随浅/深模式切换，改善 Safari 浏览器顶部区域的融合感。

### 响应式与无障碍

- 使用系统字体栈（SF Pro / PingFang 等），移动端保持适当字号和触控尺寸。
- 使用 `focus-visible`、ARIA 标签、`aria-selected`/`aria-pressed`、语义化 `role="tablist"` 与 `role="tab"`。
- 搜索结果容器使用 `aria-live="polite"`。
- 固定导航和搜索滚动位置针对移动端留出了偏移，避免搜索框被导航遮住。

## 4. 设置与多语言

设置按钮使用齿轮图标，文字统一为“网站设置”，不再叫“外观”。设置弹窗包含：

1. 主题颜色：石墨、蓝、紫、绿、橙。
2. 深浅模式：跟随系统、浅色、深色。
3. 翻译语言：简体中文、繁体中文、英语、日语。

设置面板使用升级前的布局和交互，保留主题颜色、深浅模式和四语言选择。升级版的外观预览、恢复默认设置及 `site.js` 增强逻辑已随本次回滚移除。

偏好使用 `localStorage` 跨页面共享：

- `jy-accent`
- `jy-theme`
- `jy-language`

每个正式页面的 HTML 在正文绘制前读取主题与色调，减少闪烁；对应 JS 再同步按钮状态、页面标题、meta description、ARIA 文案和动态卡片内容。

任何新增页面或文案必须同时提供以下四种语言，且同步更新页面标题、说明、按钮、设置文字和可访问性标签：

- `zh-CN`
- `zh-TW`
- `en`
- `ja`

最近一次命名决策（必须保持）：

- `Minecraft 基岩版下载`，设备信息写在简介。
- `Minecraft Java 版启动器下载`，桌面端信息写在简介。
- 不要恢复“Minecraft 基岩版启动器双端下载”或“Minecraft Java 版桌面端启动器下载”等冗长名称。
- 上述命名撤回已同步到简中、繁中、英文和日文。

## 5. 图标与 PWA

- 浏览器 favicon、Apple 主屏幕图标和桌面快捷方式图标统一使用 `assets/site-cover.jpg`。
- 这张图片是用户提供的蓝发动漫人物抱黄色小鸡的方形图片。
- 用户曾澄清：该图只用于网站小图标/保存到桌面的图标，不应作为首页大幅 Hero 封面。
- 首页原来的视觉封面/抽象卡片已恢复，不要再把该图片当作页面大封面。
- `site.webmanifest` 提供 standalone 显示与图标信息。

## 6. 文件职责

| 文件 | 当前职责 |
| --- | --- |
| `.nojekyll` | 让 GitHub Pages 直接发布静态文件 |
| `index.html` | 首页结构、样式、导航、资源区和设置弹窗 |
| `scripts/app.js` | 首页四语言文案、资源数据、搜索/筛选、主题与设置逻辑 |
| `styles/card-controls.css` | 全站卡片图区和下载页平台/渠道选择器的共享视觉样式 |
| `minecraft.html` | Minecraft 聚合页结构与样式 |
| `scripts/minecraft-hub.js` | Minecraft 聚合页四语言与共享设置逻辑 |
| `minecraft-download.html` | 基岩版 Windows/Android 下载选择页 |
| `scripts/minecraft-download.js` | 基岩版平台数据、按钮链接、多语言和设置逻辑 |
| `minecraft-mods.html` | Java 模组平台选择页 |
| `scripts/minecraft-mods.js` | CurseForge/Modrinth 数据、多语言和设置逻辑 |
| `minecraft-launchers.html` | Java 启动器选择页 |
| `scripts/minecraft-launchers.js` | 官方/PCL/HMCL 数据、多语言和设置逻辑 |
| `minecraft-mobile.html` | Java 版 Android/iOS 移动端选择页 |
| `scripts/minecraft-mobile.js` | Fold Craft Launcher/Amethyst iOS 数据、多语言和设置逻辑 |
| `minecraft-seed.html` | 无选项卡的 Minecraft 种子查询详情页与双网站按钮 |
| `scripts/minecraft-seed.js` | 种子查询页四语言、主题与设置逻辑 |
| `genshin.html` | 原神内容专区、国际版站内卡片、国服直达卡片和设置弹窗 |
| `scripts/genshin.js` | 原神专区四语言与主题设置逻辑 |
| `genshin-download.html` | 原神国际版 Android/iOS/Windows 下载选择页 |
| `scripts/genshin-download.js` | 四个下载链接、三平台切换、四语言与设置逻辑 |
| `zzz.html` | 绝区零内容专区、国际版站内卡片、国服与兑换码直达卡片 |
| `scripts/zzz.js` | 绝区零专区四语言与主题设置逻辑 |
| `zzz-download.html` | 绝区零国际版 Android/iOS/Windows 下载选择页 |
| `scripts/zzz-download.js` | 四个下载链接、三平台切换、四语言与设置逻辑 |
| `hsr.html` | 崩铁内容专区、国际版站内卡片、国服与兑换码直达卡片 |
| `scripts/hsr.js` | 崩铁专区四语言与主题设置逻辑 |
| `hsr-download.html` | 崩铁国际版 Android/iOS/Windows 下载选择页 |
| `scripts/hsr-download.js` | 四个下载链接、三平台切换、四语言与设置逻辑 |
| `endfield.html` | 终末地内容专区、国际版站内卡片、国服与兑换码直达卡片 |
| `scripts/endfield.js` | 终末地专区四语言与主题设置逻辑 |
| `endfield-download.html` | 终末地国际版 Android/iOS/Windows 下载选择页 |
| `scripts/endfield-download.js` | 四个下载链接、三平台切换、四语言与设置逻辑 |
| `assets/site-cover.jpg` | favicon、Apple Touch Icon、桌面/PWA 图标 |
| `site.webmanifest` | PWA 名称、颜色、启动方式和图标 |
| `archive/legacy/preview.html` | 历史预览文件；不是当前正式入口 |
| `archive/legacy/minecraft.js` | 旧版“Minecraft 国际版”实现；已加弃用注释，当前正式页面不引用 |
| `README.md` | 已更新的项目概览与正式页面维护入口；详细约定仍以本文件为准 |
| `docs/ROLLBACK.md` | 备份标签、下载 ZIP 入口及保留历史的回滚步骤 |

当前 HTML 通过查询参数给 JS/图标做缓存更新。修改正式 JS 后应同步递增对应 HTML 的 `?v=`，避免 GitHub Pages/Safari 使用旧缓存。

当前正式 HTML 保留各页内嵌基础样式，另在 15 个页面末尾引用 `styles/card-controls.css` 覆盖同类卡片与选择器；不引用旧升级版的 `site.css` 或 `site.js`。修改共享组件样式时，全部页面的 `card-controls.css?v=` 缓存号须同步递增。

## 7. 已完成的主要需求历史

- 将用户提供的压缩包网站部署到 `Jiyouyang/Jiyouyang.github.io`。
- 把用户图片设置为 favicon、Apple Touch Icon 与桌面保存图标；撤销把它作为大封面的误解。
- 移除首页 Hero 下方三个装饰图标。
- 将蓝紫默认配色改为 Apple 风格黑白基调。
- 增大顶部导航文字并加入高透明液态玻璃滑块效果。
- 新增调色盘式主题设置、深浅模式与四语言翻译。
- 去除顶部导航中分段项的多余内层白底，使其与导航玻璃底融合。
- 搜索按钮左移并与设置按钮拉开距离；点击后自动滚动至搜索栏并唤起系统键盘。
- 主题色会同步影响资源卡片插图，而不只改变按钮。
- 删除博客，仅保留资源分享。
- 创建 Minecraft 聚合专区，并把原下载入口移入该专区。
- 创建基岩版双平台选择页，修正为“选项卡仅切换、按钮才跳转”。
- 为 Android 增加第二下载入口及缺少版本时的提示。
- 删除基岩版页面底部多余的页面说明。
- 创建 Java 模组下载页（CurseForge / Modrinth）。
- 创建 Java 启动器页（官方 / PCL / HMCL）。
- 删除 Minecraft 基岩版入口及详情中的“国际”字样。
- 多次调整名称后，最终决定把“双端/桌面端”从标题移到简介，四语言已经同步。

## 8. 关键技术决策

- 纯静态 HTML/CSS/原生 JavaScript，无构建步骤、无框架、无后端。
- 由 GitHub Pages 从 `main` 分支仓库根目录发布。
- 多语言采用页面内字典与 `data-i18n`/`data-i18n-html`/`data-i18n-label` 属性，不依赖外部翻译服务。
- 主题通过根节点的 `data-theme` 和 `data-accent` 驱动 CSS 变量。
- 用户偏好只存于浏览器 `localStorage`，没有账户同步。
- 外部链接在实际下载/前往按钮上处理；切换选项卡使用 button，不能使用会导航的 anchor。
- Minecraft 采用“首页资源卡 → Minecraft 聚合页 → 具体类型页 → 外部按钮”的层级，方便继续扩展。
- 网站图标直接使用 JPEG。兼容性若出现问题，可未来生成标准 PNG/ICO 尺寸，但不能擅自替换用户指定图像。

## 9. 已知问题与技术债务

当前没有已确认阻断使用的错误；最近一次部署已验证页面标题、设备范围简介和四语言翻译正确上线。但存在以下维护风险：

1. `README.md` 的旧入口说明已更新；以后增删页面仍需保持 README 与本文件一致。
2. 旧文件 `archive/legacy/minecraft.js` 与 `archive/legacy/preview.html` 已加遗留标记，当前正式页面不引用，仅保留作历史参考。
3. 回滚后，各页视觉样式、字典、设置逻辑和弹窗 HTML 仍独立维护；未来新增设置项时须检查全部页面。升级版的共享 CSS/JS 可在备份分支查阅，不应误认为仍在当前 `main` 中。
4. 升级版曾加入 Chromium 浏览器回归脚本，但当前版本已随回滚移除；真实 iPhone Safari、Android Chrome 设备测试仍未完成。
5. JPEG favicon 在部分旧浏览器或平台可能不如 PNG/ICO 稳定；目前 Safari/Apple Touch Icon 是用户最关心的场景。
6. 外部下载站可用性受第三方网站及地区网络限制影响，本站无法保证。
7. HMCL 链接固定到 `v3.16.4` release；新版本发布后不会自动更新。
8. 各页面翻译字典独立维护，新增或重命名文案时必须逐页检查四种语言。

## 10. 尚未完成/未来方向

用户明确表示 Minecraft 专区以后还会增加更多 Minecraft 相关跳转选项；种子查询已于 2026-10-11 加入，下一批具体内容尚未提供。当前无需创建 Java 游戏本体下载页，也不要把“Java 版启动器下载”误解成 Java 游戏安装包下载。

建议的下一步按优先级排列：

1. 根据用户下一次提供的 Minecraft 内容类型，在 `/minecraft.html` 增加同视觉体系的新卡片；仅在需要站内选择或详情时建立独立页面。
2. 今后扩展专区时，同步更新 `README.md`、首页入口简介与本交接文档。
3. 如确定不再需要历史预览，另行评估是否删除 `archive/legacy/minecraft.js` 和 `archive/legacy/preview.html`；目前只归档、不删除。
4. 目前页面采用各页内嵌样式；除非用户再次要求升级，不要自行把已回滚的 `site.css` / `site.js` 共用体系加回当前站点。
5. 对 iPhone Safari、Android Chrome 和桌面浏览器进行一次系统视觉/键盘/滚动/深色模式回归。
6. 视用户意愿为 favicon 生成标准多尺寸 PNG/ICO，同时保留原图构图。

## 11. 修改与发布检查清单

每次改动至少检查：

- [ ] 编辑前已在 GitHub 建立并核验同时间命名、指向同一完整基线的备份分支与 Releases → Tags 标签；工作区未提交内容也已妥善保存。
- [ ] 若为网站回滚，仅恢复经核对的网站文件；交接文档、回滚说明、README 与维护脚本未被旧版覆盖。
- [ ] 新增/修改文案是否同步简中、繁中、英文、日文。
- [ ] 主题色是否影响活动控件及相关图形，而不只是按钮。
- [ ] 浅色、深色、跟随系统是否可用。
- [ ] 选项卡是否只切换内容，没有意外导航。
- [ ] 只有明确的下载/前往按钮才打开外链。
- [ ] 手机端导航、搜索、设置按钮是否不重叠且容易点按。
- [ ] JS 语法检查通过；HTML 引用的缓存版本已更新。
- [ ] 下载链接与站内路径无误。
- [ ] `CODEX_HANDOFF.md` 已同步记录本次需求、改动和验证。
- [ ] 推送到 `main` 后核验 GitHub Pages 实际页面，而不是只检查本地文件。

## 12. 最近部署基线

### 2026-10-14：新增电脑工具分类与三个官网卡片

- 需求：以后在本对话维护电脑相关内容；首页大类新增“电脑工具”选项卡，先后加入 Google Chrome 官方下载引导页、Steam 官网和图吧工具箱官方下载页，均可点击整张卡片直接跳转。
- 编辑前先后于 **2026-10-14 22:48:54 UTC**、**22:52:17 UTC**、**22:52:28 UTC** 建立并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-14_22-48-54_UTC`、`backup/pre-change-2026-10-14_22-52-17_UTC`、`backup/pre-change-2026-10-14_22-52-28_UTC`，及对应带注释标签 `backup-2026-10-14_22-48-54_UTC`、`backup-2026-10-14_22-52-17_UTC`、`backup-2026-10-14_22-52-28_UTC`。六个远端引用剥离后均指向完整基线提交 `517370ec306ad3f4bc36463c8006474eda4ae176`，当时工作区干净，仓库有 39 个受版本控制文件。
- 首页 `index.html` 新增筛选按钮，静态资源总数从 13 改为 16、分类数从 4 改为 5；窄屏筛选项改为两行三列，六个选项均可见。`scripts/app.js` 新增三张外链卡片与四语言分类、说明和更新公告，沿用现有整卡 `<a>` 跳转与主题色样式；`README.md` 同步维护说明。
- 图吧工具箱地址以原版官网 <https://www.tbtool.cn/> 的下载页为准；该域名同时由图吧工具箱更新公告 <https://tb.saop.cc/update/> 确认。没有使用搜索结果中的仿冒站或第三方分发页。
- 验证：`node --check scripts/app.js` 与 `git diff --check` 通过；数据检查确认首页 16 条资源、电脑工具分类恰有 3 张直接外链卡片、四语言标题与简介齐全、筛选按钮和静态计数匹配、脚本缓存号已更新。三个目标链接在 2026-10-14 均返回 HTTP 200。当前没有浏览器控制工具，真实手机端视觉仍待设备验证；发布后再核对 GitHub Pages 实际文件。
- 遗留与决策：本次仅新增首页分类和外链卡片，不另建站内下载页；图吧工具箱固定指向原版官方的下载引导页，后续应随官网迁移核对地址。

### 2026-10-14：制作公告收起时使用短标题

- 需求：在首页公告栏收起且轮播到制作公告时，显示“本站由Jiyouyang & Codex制作”；展开后继续显示完整标题“本站由Jiyouyang & Codex（基于ChatGPT 6Astra & 6Sol)制作”及原有内容。
- 编辑前于 **2026-10-14 10:26:56 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-14_10-26-56_UTC` 与带注释标签 `backup-2026-10-14_10-26-56_UTC`；两者剥离后均指向基线提交 `31bff3642285f36aed8b45995b93dd680eadad1c`，包含当时仓库的 39 个受版本控制文件；工作区干净，远端 `main` 一致。
- `scripts/app.js` 为该公告新增四语言 `summary` 短标题，收起轮播优先显示该字段；展开列表仍读取 `content` 完整标题。`index.html` 同步首屏静态短标题并递增脚本缓存版本；两条置顶与 3 秒切换保留。五种主题色及三种明暗模式沿用原有样式。
- 验证：`node --check scripts/app.js` 与 `git diff --check` 通过；确认四语言短标题齐全，收起轮播读取 `summary`、展开列表读取完整 `content`，首页静态短标题与脚本缓存版本已同步，两条置顶和 3000ms 轮播均保留。发布后核验 GitHub Pages；真实手机端视觉仍待设备验证。

### 2026-10-14：修正置顶公告数量

- 用户澄清“本站由Jiyouyang & Codex（基于ChatGPT 6Astra & 6Sol)制作”是一整条新公告；此前把“本站作者：ji you yang”误作另一条独立公告。
- 编辑前于 **2026-10-14 10:17:49 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-14_10-17-49_UTC` 与带注释标签 `backup-2026-10-14_10-17-49_UTC`；两者剥离后均指向基线提交 `ac9451443e8d5b4545d69c9e0de8dd278612fa5a`，包含当时仓库的 39 个受版本控制文件。
- 从 `scripts/app.js` 删除误加的 `2026-10-14-author-name` 记录，保留完整的 Jiyouyang & Codex 制作公告及原有“本站作者是可爱傲娇小男娘喵”公告；两条继续每 3 秒切换。`index.html` 仅递增脚本缓存版本，不添加普通更新公告。
- 验证：`node --check scripts/app.js` 与 `git diff --check` 通过；确认仅余两条 `pinned: true` 公告，二者均有四语言内容，轮播间隔仍为 3000ms，脚本缓存版本已更新。五种主题色、三种明暗模式和公告样式未改；发布后核验 GitHub Pages。真实手机端显示仍待设备验证。

### 2026-10-14：新增两条置顶公告并按三秒轮播

- 需求：新增“本站作者：ji you yang”和“本站由Jiyouyang & Codex（基于ChatGPT 6Astra & 6Sol)制作”两条置顶公告；后一条以用户最后修订的“制作”结尾为准，标题区每 3 秒循环。
- 编辑前于 **2026-10-14 10:15:41 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-14_10-15-41_UTC` 与带注释标签 `backup-2026-10-14_10-15-41_UTC`。两者剥离后均指向基线提交 `3732160972885744651f567f0ad0c9f8c79b162b`，包含当时仓库的 39 个受版本控制文件；工作区干净，远端 `main` 与该提交一致。
- 在 `scripts/app.js` 增加两条四语言置顶记录，保留原有作者公告；现有 `announcementRotationDelay = 3000` 会让三条按顺序循环。`index.html` 更新首屏静态公告、日期与脚本缓存版本；公告继续沿用石墨、蓝、紫、绿、橙及浅色、深色、跟随系统模式的既有变量。
- 验证：`node --check scripts/app.js` 与 `git diff --check` 通过；确认三条 `pinned: true` 公告均有简中、繁中、英文、日文内容，轮播间隔仍为 3000ms，首页静态标题和脚本缓存版本已同步。五种主题色和三种明暗模式继续由现有公告样式变量控制。本次未提供浏览器控制工具，真实手机端显示仍待设备验证；发布后检查 GitHub Pages 首页及脚本。

### 2026-10-13：替换唯一置顶公告为作者公告

- 需求：删除当前唯一的 Eghver 置顶公告，新增“本站作者是可爱傲娇小男娘喵”置顶公告；用户确认删除的就是当前仅存的那一条。
- 编辑前于 **2026-10-13 23:07:15 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-13_23-07-15_UTC` 与带注释标签 `backup-2026-10-13_23-07-15_UTC`。两者剥离后均指向基线提交 `dea556962cba0a146e575814f2ea8c24220de99e`，包含当时仓库的 39 个受版本控制文件；本地工作区干净，远端 `main` 与该提交一致。
- 在 `scripts/app.js` 中以新 ID 替换旧置顶记录，保留简中、繁中、英文、日文四语言；`index.html` 同步更新首屏静态公告与日期，递增脚本缓存版本。仅保留这一条置顶公告，不额外生成“删除公告”的普通更新记录。
- 公告沿用已有玻璃背景、`var(--accent)` 与 `var(--soft)` 主题变量，覆盖石墨、蓝、紫、绿、橙及浅色、深色、跟随系统模式；公告列表与资源卡片逻辑不变。
- 验证：`node --check scripts/app.js` 与 `git diff --check` 通过；确认公告数据中仅有一个 `pinned: true`，四语言标题齐全，首页静态标题、日期和脚本缓存版本一致。公告样式仍使用现有五种主题色变量及明暗模式；本次未提供浏览器控制工具，真实移动设备视觉仍待设备端确认。发布后核验 GitHub Pages 页面与脚本。

### 2026-10-13：新增明日方舟：终末地专区

- 需求：以后在此对话维护终末地时读取本交接文档；首页新增明日方舟：终末地大类入口，分项参照原神与绝区零，包含国际版下载、国服下载和兑换码查询，链接由 Codex 查询选定。
- 修改前于 **2026-10-13 22:55:27 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-13_22-55-27_UTC` 与带注释标签 `backup-2026-10-13_22-55-27_UTC`。两者剥离后均指向基线提交 `64a59746cf06410b01139e37173812d904b8a235`；修改前工作区干净，远端 `main` 同为该提交。
- 首页资源库新增“明日方舟：终末地”（简介含“终末地”以供搜索），排序在崩铁之后；新增四语言更新公告并提升 `app.js` 缓存号。两个新页面沿用崩铁专区与下载页结构、五种主题色、深浅模式和四语言设置；Android、iOS、Windows 选项卡只切换内容，按钮打开外链。移动导航使用“终末地”等短标题。
- 链接：国服 <https://endfield.hypergryph.com/>；兑换码查询 <https://www.redeem-code-tracker.com/games/arknights-endfield>；Google Play <https://play.google.com/store/apps/details?id=com.gryphline.endfield.gp>；APKPure APK <https://apkpure.net/arknights-endfield/com.gryphline.endfield.gp/download>；美国区 App Store <https://apps.apple.com/us/app/arknights-endfield/id6752642477>；Windows 国际服官网 <https://endfield.gryphline.com/en-us>。APKPure 与兑换码查询是第三方入口。
- 涉及文件：`index.html`、`scripts/app.js`、`endfield.html`、`scripts/endfield.js`、`endfield-download.html`、`scripts/endfield-download.js`、`README.md` 和本文件。首页静态资源数同步为 13，正式页面总数为 15。
- 验证：`scripts/app.js`、`scripts/endfield.js`、`scripts/endfield-download.js` 通过 `node --check`；检查了 13 条首页资源、四语言翻译键、三平台内容与站内文件引用，平台按钮没有导航链接，`git diff --check` 通过。六个外部目标在 2026-10-13 均返回 HTTP 200，APKPure 当时标为 APK；未提供浏览器控制工具，真实设备视觉表现仍待设备端确认。
- 新决策：终末地后续更新沿用本交接文档的备份与同步维护约定；Windows 使用国际服官方入口，Android 第三方链接不固定版本号，兑换码列表不承诺始终有可用码。

### 2026-10-12：新增绝区零专区与国际版下载页

- 需求：在游戏大类新增绝区零入口，按原神专区结构提供国际版下载、国服下载和可用兑换码查询；由 Codex 自行查找网址，并供后续绝区零更新沿用本交接文档。
- 编辑前于 **2026-10-12 13:51:53 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-12_13-51-53_UTC` 与带注释标签 `backup-2026-10-12_13-51-53_UTC`。远端分支与标签剥离后均指向基线提交 `75b02e05778707c67a8022e285333cc16e57dbd2`；克隆后的工作区原本干净，基线提交包含当时完整仓库树。
- 实现：首页新增绝区零卡片和四语言公告；新增 `/zzz.html` 三卡片专区及 `/zzz-download.html` Android/iOS/Windows 下载选择页。国服、兑换码与四个国际版下载网址详见上文；Android 第三方页面实际提供 XAPK，按钮如实标注。四语言、五种主题色、深浅模式沿用现有设置。
- 涉及文件：`scripts/app.js`、`index.html`、`zzz.html`、`scripts/zzz.js`、`zzz-download.html`、`scripts/zzz-download.js`、`README.md` 与本文件。
- 验证：三个修改或新增的 JS 均通过 `node --check`；两个新页面引用的翻译键已检查四语言完整；本地站内页面引用已核对，`git diff --check` 通过。六个外部目标（国服官网、兑换码、Google Play、APKPure、App Store、HoYoPlay）检查时均返回 HTTP 200。真实设备视觉表现仍待设备端确认。
- 决策：Android 第三方安装包链接使用不带版本号的 APKPure 页面，避免固定版本地址过期。第三方展示版本与提供的文件格式可能变化，今后更新时需重新核对。

### 2026-10-12：种子查询改为站内双网站页面

- 需求：Minecraft 种子查询卡片先进入与其他板块一致的详情页，不再直跳外链；详情页无选项卡，以基岩版 Android 双下载按钮为参照，提供“查询网站 1”和“查询网站 2”，并在原简介意思上稍作优化。
- 修改前于 **2026-10-12 13:13:59 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-12_13-13-59_UTC` 与带注释标签 `backup-2026-10-12_13-13-59_UTC`；标签剥离后与分支均指向基线提交 `665f6487a73c0f5bd2a6795717dfb7f6ace64b60`。当时本地工作区干净，且与 GitHub `main` 一致。
- 专区卡片改为站内链接与 → 箭头；新增 `/minecraft-seed.html` 和 `scripts/minecraft-seed.js`，页面两个按钮分别通往用户指定的 Minecraft Search 种子地图链接及原 Chunkbase 链接。卡片简介改为“可输入自己想查的种子号，选择查询网站查看种子地图。”两按钮沿用基岩版 Android 的主次按钮布局，没有选项卡。
- 简中、繁中、英文、日文的页面标题、简介、按钮、设置与可访问性文案已补全；石墨、蓝、紫、绿、橙五种主题色和跟随系统、浅色、深色模式沿用站点体系。首页增加四语言更新公告，两个业务脚本引用提升缓存版本；`README.md` 同步说明九个正式页面。
- 涉及文件：`minecraft.html`、`minecraft-seed.html`、`scripts/minecraft-hub.js`、`scripts/minecraft-seed.js`、`scripts/app.js`、`index.html`、`README.md` 和本文件。验证：三个修改的 JS 均通过 `node --check`，`git diff --check` 通过；新页 32 个翻译键在四语言中齐全。Chromium 在 390px 下通过四语言 × 五色调 × 浅/深模式共 40 组检查，两个按钮同行、外链与卡片站内跳转正确且页面无水平溢出；320px 下四语言的双按钮样式与基岩版 Android 页逐项一致且无水平溢出，跟随系统深色切换和四语言公告渲染通过。首页公告在五色调 × 浅/深模式的 10 组检查中正常。查询网站 1 返回 HTTP 200；真实 iPhone Safari 与 Android Chrome 的视觉表现仍需设备端确认。

### 2026-10-11：Minecraft 专区新增种子查询

- 需求：在 Minecraft 大专区增加“Minecraft 种子查询”选项，导向 `https://www.chunkbase.com/apps/`，简介写明“可输入自己想查的种子号”。
- 修改前于 **2026-10-11 23:03:43 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_23-03-43_UTC` 与带注释标签 `backup-2026-10-11_23-03-43_UTC`；标签剥离后与分支均指向基线提交 `c55c2cae43e5dfa9697efde56fef957e59810da0`。当时本地工作区干净，且与 GitHub `main` 一致。
- Minecraft 专区新增第五张卡片，整卡外部直达 Chunkbase，标识为 `SEED`，使用外链箭头 ↗。简中、繁中、英文、日文均补全标签、标题和简介；卡片继续使用既有主题变量，适配石墨、蓝、紫、绿、橙及浅色、深色、跟随系统模式。
- 首页新增四语言更新公告；`minecraft.html`、`index.html` 提升业务脚本缓存版本；`README.md` 与本文件同步记录。涉及文件：`minecraft.html`、`scripts/minecraft-hub.js`、`scripts/app.js`、`index.html`、`README.md`、`CODEX_HANDOFF.md`。
- 验证：`node --check` 检查两个修改的脚本通过，`git diff --check` 通过；Chromium 在 390px 宽度下检查了四语言 × 五色调 × 浅/深模式共 40 组，卡片文字、主题标识色、外链属性和页面水平溢出检查均通过；跟随系统模式的浅/深实时切换与首页公告渲染也通过。Chunkbase 目标地址返回 HTTP 200。真实 iPhone Safari、Android Chrome 的视觉表现仍需设备端确认。

### 2026-10-11：新增原神可用兑换码查询

- 需求：在原神专区新增“原神兑换码”选择项，将该入口的操作文案设为“查询可用兑换码”，并跳转到 `https://www.crimsonwitch.com/codes/Genshin_Impact`。
- 修改前于 **2026-10-11 10:46:12 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_10-46-12_UTC` 与带注释标签 `backup-2026-10-11_10-46-12_UTC`；两者剥离后均指向基线提交 `1752cb510432cf761390f05440b4e7da37175744`。
- 原神专区新增第三张外部直达卡片，使用 `CDK` 标识和外链箭头；专区介绍、状态、首页原神简介同步涵盖兑换码查询。简中、繁中、英文、日文文案均已补全，卡片继续继承现有五种主题色及深浅模式。
- 首页新增四语言更新公告；`genshin.html` 与 `index.html` 已提升对应业务脚本缓存版本。涉及文件：`genshin.html`、`genshin.js`、`app.js`、`index.html`、`README.md` 与本文件。
- 验证：`genshin.js` 与 `app.js` 通过 `node --check`；原神专区 HTML 引用的全部翻译键在四种语言中均完整；目标兑换码网址返回 HTTP 200；脚本缓存版本、外链箭头语义与文档已核对，`git diff --check` 通过。GitHub Pages 部署任务成功，线上 `/genshin.html` 已核验包含新卡片、目标链接和 `20261011-codes1` 脚本版本；当前环境的无界面 Chromium 未能生成截图，真实设备视觉仍需后续设备端确认。

### 2026-10-11：统一所有卡片图片与平台选择滑块

- 需求：以用户两张手机截图为参考，而不只修改截图所示区域；所有同类卡片图区改为柔和灰白背景、居中标识，所有平台/渠道选择滑块改为浅色玻璃选中态。
- 编辑前于 **2026-10-11 10:22:01 UTC** 建立并核验 GitHub 完整备份分支 `backup/pre-change-2026-10-11_10-22-01_UTC` 和标签 `backup-2026-10-11_10-22-01_UTC`；二者指向基线提交 `f29ef754578ca0d72375cea98d56a359e66934f9`。
- 新增 `card-controls.css`，8 个正式 HTML 同步引用；涵盖首页精选和资源卡、Minecraft/原神专区卡、5 个下载页插图及平台滑块。最初还覆盖了主页分类与设置分段控件，随后已按用户要求撤销这部分覆盖，只保留下载页 `.platform-tabs` 的新版样式。保留原有卡片内容、跳转关系、下载网址、主题色和四语言。
- `app.js` 新增四语言更新公告，`index.html` 更新脚本缓存号；`README.md` 与本文件同步说明。验证：8 个正式页面均引用相同版本的共享样式，所有目标组件选择器及四语言公告齐全，全部根目录 JS 通过 `node --check`，CSS 块结构和 `git diff --check` 通过；页面业务 JS 与下载链接未改。当前环境没有可用的浏览器控制能力，真实 iPhone Safari 视觉仍需设备端确认。

### 2026-10-11：每次备份同时发布到 GitHub Tags

- 需求：今后创建修改前备份时，也像此前 `pre-visual-upgrade-20261011` 那样，把备份放到仓库 Releases → Tags 页面，供 ZIP / tar.gz 下载。
- 本次在编辑前于 **2026-10-11 10:17:59 UTC** 创建并推送完整备份分支 `backup/pre-change-2026-10-11_10-17-59_UTC` 及带注释标签 `backup-2026-10-11_10-17-59_UTC`；远端核验二者均指向基线提交 `9630e9eb7115355c0d6a0cfe86ae8e03905461ff`，工作区原本干净。
- 仅修改 `CODEX_HANDOFF.md` 的备份规则、检查清单及本记录；网站文件和视觉内容未改，因此不新增首页公告。验证：备份远端引用及标签剥离后的提交一致，文档差异无空白错误。无遗留功能问题。

### 2026-10-11：明确网站回滚不回退交接与维护文件

- 需求：今后说“滚回上一个版本”时，只回滚实际网站文件，`CODEX_HANDOFF.md` 等非网站文件保持最新；将规则写入本文件。
- 编辑前已于 **2026-10-11 10:11:31 UTC** 创建并核验完整备份分支 `backup/pre-change-2026-10-11_10-11-31_UTC`，基线提交 `877340308d9df32c3f9e7e9fa7020dd4760598`；工作区原本干净。
- 修改 `CODEX_HANDOFF.md` 的强制规则和检查清单，并修正 `ROLLBACK.md` 中与新规则冲突的整仓恢复示例。网站页面、样式、脚本、资源和线上观感均不改；因此不新增网站公告。
- 验证：文档差异与空白检查通过；无网站文件改动。无遗留功能问题。

### 2026-10-11：按用户要求恢复全面视觉升级前版本

- 需求：“滚回上一个版本”，按此前“备份现有版以便不满意时滚回上一版”的语境，恢复到视觉升级前的固定基线 `dcc9d01b0e9c9e024b48fb1242ad54c86e420242`。
- 修改前于 **2026-10-11 10:08:23 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_10-08-23_UTC`，指向 `89a16cad9c5f3cd909c6df282c2ec06a0fe4c0c2`，包含回滚前全站代码与最新备份规则。
- 恢复 8 个正式 HTML、`app.js` 和 `README.md` 的升级前内容；移除仅属于升级版的 `site.css`、`site.js` 和 `scripts/verify-ui.cjs`。保留当前 `CODEX_HANDOFF.md` 的强制备份规则及 `ROLLBACK.md`，并更新维护现状。
- 按网站更新公告规则，仅在旧版 `app.js` 新增一条四语言“已恢复此前的网站外观”公告，`index.html` 对应更新脚本缓存号；其余页面代码均与回滚基线一致。
- 验证：全部根目录 JS 通过 `node --check`；对照旧基线确认除主页公告/脚本缓存号外，8 个正式页面与 README 已恢复原文件；旧版正式 HTML 不再引用移除的共享文件，`git diff --check` 无空白问题。推送 `main` 后仍须核对线上页面。

### 2026-10-11：确立每次修改前的完整备份规则

- 需求：今后每次用户要求更改，都先将更改前的所有仓库内容备份到 GitHub；备份名包含年份、日期和具体时间，并把规则写入本交接文档。
- 本次在编辑前已于 **2026-10-11 09:54:56 UTC** 建立并核验备份分支 `backup/pre-change-2026-10-11_09-54-56_UTC`，完整基线提交为 `d63ccc0af86d8714ad9923f0a6d5e8576ae032cd`。当时本地工作区干净，GitHub `main` 与本地 `HEAD` 一致。
- 仅修改 `CODEX_HANDOFF.md` 的维护约定与检查清单，不更改网站页面或交互，因此不新增首页公告。验证：远端备份分支指向预期提交，文档差异无空白错误；暂无遗留功能问题。

### 2026-10-11：全站视觉与交互升级，保留旧版备份

- 需求：全面升级全部页面，同时沿用黑白基调、液态玻璃、五种主题色、深浅模式与四语言；先备份旧版，支持不满意时回滚。
- 在编辑前已创建并推送备份分支与标签，基线为 `dcc9d01`，详见 `ROLLBACK.md`。
- 8 个正式页面统一接入 `site.css` / `site.js`。升级导航间距、字体层级、卡片头图/留白/阴影、分段玻璃滑块、下载布局、页脚及手机端设置底部面板。
- 下载按钮统一 44px 高度，原神 Android 两个入口继续等视觉权重且并排；内部/外部卡片的小箭头语义与所有原有下载地址保留。
- 增加外观实时预览、恢复默认设置、搜索清空与快捷键、无结果恢复入口、返回顶部、选项卡键盘操作及 hash 分享恢复。设置关闭后恢复滚动位置与焦点。
- iOS 标识用中空 SVG 轮廓替代 Apple 字体私有字符，避免 Windows/Android 缺字；所有设置入口统一齿轮图标。
- 置顶公告及 3 秒轮播保留；新增暂停/继续按钮，并在阅读展开内容、聚焦公告或后台标签页时暂停自动切换。普通更新公告已同步四语言，样式通过共享变量适配全部色调与深浅模式。
- 验证：`scripts/verify-ui.cjs` 已通过 8 页四语言、320/390/768/1440px 布局、主题设置、选项卡不导航、键盘切换、hash 恢复、搜索、公告和滚动恢复检查，浏览器 JS 报错为零。另检查原神按钮在 6 个宽度与 4 种语言的 24 种组合，均并排、未溢出且为 44px 高度。
- 对比备份确认全部原有外部资源/下载网址保持一致；跟随系统深浅切换可实时更新。强化小字号强调色与按钮底色对比，10 种深浅/色调组合的主要下载按钮文字对比度均超过 4.5:1（最低约 4.91:1）。
- 已查看首页、设置、原神下载及 Minecraft 专区的移动/桌面、浅色/深色截图。真实 iOS 键盘唤起与 Safari 渲染仍需设备端确认。
- 涉及文件：全部 8 个正式 HTML、`app.js`、新增 `site.css` / `site.js` / `scripts/verify-ui.cjs` / `ROLLBACK.md`，以及 `README.md`、本交接文档。部署版本缓存号为 `20261011-ui1`。

### 2026-10-11：小范围修正过时文案与维护说明

- 需求：阅读交接文档，修复可确认的待办与小问题，但不改动网站总体内容与设计。
- 首页 Minecraft 卡片不再误称“国际版下载”；原神卡片不再暗示现有下载入口尚未加入。简中、繁中、英文、日文同时更新。
- `README.md` 改为列出现有 Minecraft、原神入口及公告维护位置；`minecraft.js`、`preview.html` 仅加遗留标记，未删除历史文件。
- 首页公告新增四语言简要更新记录；`index.html` 递增 `app.js` 缓存版本。涉及文件：`app.js`、`index.html`、`README.md`、`minecraft.js`、`preview.html`、本文件。
- 验证：所有根目录 JS 通过 `node --check`；检查了 10 项资源和 4 条公告的四语言字段、正式 HTML 的站内文件引用，并通过 `git diff --check`。发布后仍须核对线上缓存版本。
- 设计、版面、主题设置、既有站内路径与外部下载网址均未改。仍未进行真实设备视觉回归，旧浏览器 JPEG favicon 兼容性与第三方链接可用性等风险保留。

### 2026-10-11：两条置顶公告每 3 秒滚动切换

- 新增置顶公告“jiyouyang也是可爱傲娇小男娘喵”，保留原有 Eghver 置顶公告，两条内容互不覆盖。
- 首页收起状态的公告标题区域改为垂直滚动轮播，两条置顶公告每 3 秒切换一次；展开列表同时保留两条完整公告。
- 简中、繁中、英文、日文内容已同步；滚动标题及公告栏继续适配石墨、蓝、紫、绿、橙五种主题色与浅色、深色、跟随系统模式。
- 尊重系统“减少动态效果”设置：该模式下仍每 3 秒切换文字，但不播放滚动动画。
- 更新首页静态回退内容并递增 `app.js` 缓存版本。

### 2026-10-11：新增 Eghver 置顶公告

- 首页公告栏新增置顶公告“Eghver恶魔是可爱傲娇小男娘喵”，收起时显示在“公告”标签右侧的标题位置。
- 公告加入 `pinned` 标记与置顶排序逻辑；以后新增普通公告时，这条置顶公告仍优先显示，展开列表中也保持在顶部。
- 简中、繁中、英文、日文内容已同步；公告继续通过现有 CSS 变量适配石墨、蓝、紫、绿、橙五种主题色及浅色、深色、跟随系统模式。
- 更新首页静态回退内容并递增 `app.js` 缓存版本，避免 GitHub Pages 或 Safari 沿用旧公告。

### 2026-10-11：公告横条高度对齐导航栏

- 首页公告与上方导航栏的左右宽度原本一致；手机端公告内层高度从 56px 调为 54px，加上上下边框后收起总高度为 56px，与导航栏一致。
- 桌面端原本已是相同总高度 62px，保持不变。展开内容、主题和翻译不变。
- 此次只是修改现有公告本身，按公告维护规则不额外新增一条公告记录。

### 2026-10-11：首页新增可展开更新公告

- 首页固定导航下方新增与导航近似宽高的液态玻璃公告横条，点按可展开更新详情；收起状态只显示公告标题和日期。
- 首条公告总结 2026-10-11 的原神专区、国际版三平台、国服直达、按钮与箭头调整。四语言、五种主题色、深浅模式沿用现有设置。
- 公告数据在 `scripts/app.js` 的 `announcements` 数组中，按最新在前排列。此后每次用户要求更新网站，应在同一次提交中加入一条简要更新记录（简中、繁中、英语、日语），除非用户明确要求不记录；用户指定删除时按 `id` 移除。不要把删除/修改公告的请求又追加成公告。
- 每条新增或修改的公告不仅要同步简中、繁中、英语、日语，还必须逐一适配石墨、蓝、紫、绿、橙五种主题色，并检查浅色、深色与跟随系统模式下的文字、图标、活动状态和玻璃背景对比度。此项为每次公告维护的必做项，不能只完成翻译。
- 公告为空时隐藏横条；`CODEX_HANDOFF.md` 仍须随每次网站改动一并更新。

### 2026-10-11：全站卡片箭头统一尺寸

- 以主页资源卡片的小箭头 18px 为基准，Minecraft 与原神专区的所有卡片箭头统一从 28px 调至 18px。
- 原神国服卡片不再需要单独的 18px 覆盖规则；主页资源卡片与精选卡片原本已是 18px，保持不变。
- 箭头方向继续遵循外部直达 ↗、进入本站选项页 →；卡片链接和内容不变。

### 2026-10-11：缩小原神国服外链箭头

- 原神国服卡片的 ↗ 从专区默认 28px 缩至 18px，与主页外部资源卡片的箭头尺寸一致。
- 原神国际版站内卡片的 →、链接与其余样式不变。

### 2026-10-11：原神国际版新增 Windows 下载选项

- `/genshin-download.html` 在 Android、iOS 后新增 Windows 选项卡；三项滑块适配移动端，点击选项卡仅切换内容。
- Windows 卡片使用与 Minecraft 一致的中空 Windows 标识，按钮文案为“官方启动器下载”，仅按钮打开 `https://hoyoplay.hoyoverse.com`。
- 简中、繁中、英文、日文同步新增 Windows 标题、简介、按钮及平台提示；原神专区国际版卡片简介也更新为三个平台。
- Android 的两个入口及 iOS 的 App Store 入口、主题色与深浅模式保持不变。

### 2026-10-11：统一卡片箭头语义

- 点击整张卡片直接前往外部网页时使用右上箭头 ↗；先进入本站选项/详情页时使用向右箭头 →。
- 主页动态资源卡片此前已按 `internal` 属性正确区分，Minecraft 专区和原神国际版站内卡片也已正确；本次只把原神国服直达外链卡片从 → 修正为 ↗。
- 卡片链接、布局、配色与四语言内容均不变。

### 2026-10-11：补全 Google Play 按钮繁体文案

- 原神国际版下载页繁体中文 Android 按钮由“Google Play”改为“Google Play 下載”。
- 简体中文继续显示“Google Play 下载”；英语与日语保持短标签“Google Play”，避免按钮过长。
- 按钮布局、尺寸、链接及其余翻译不变。

### 2026-10-11：新增原神国服下载直达卡片

- 原神专区在国际版卡片后新增同款“原神国服下载”卡片，点击直接打开 `https://ys.mihoyo.com/main/m/?from_fab=1`，不另建中转页面。
- 卡片沿用现有五种主题色、深浅模式和四语言翻译；专区状态文字同步反映国际版与国服入口。
- 国际版下载卡片及其平台下载链接保持不变。

### 2026-10-11：恢复 Google Play 按钮的“下载”二字

- 仅将原神国际版下载页的简体中文 Android 按钮文案由“Google Play”改为“Google Play 下载”，并更新初始 HTML 与脚本缓存版本。
- 其余语言、按钮尺寸和并排布局、下载链接及设置均不改动。

### 2026-10-11：修正原神下载按钮垂直尺寸

- 上一次的 `min-height:48px` 与额外行高使原神按钮比 Minecraft 的下载按钮更高；现已去除，直接沿用两页相同的按钮基础样式（上下 padding、字体、图标、圆角）。
- Android 的 Google Play / APK 保持同一行，宽度按文字延伸；文字不换行。极窄屏仅缩减左右 padding，垂直尺寸不变。
- 四语言按钮短标签同步；原下载网址、说明、主题色和语言设置不变。

### 2026-10-11：统一原神下载按钮尺寸

- 原神国际版下载页的 Android 两个按钮改为等尺寸、同一行并排；iOS 单按钮使用相同尺寸规格，接近 Minecraft 下载页的紧凑按钮。
- 四语言的按钮文字缩短以适配手机窄屏，平台说明和三个下载网址保持不变。
- 保留五种主题色、深浅模式与四语言切换；选项卡仍只切换平台，只有下载按钮打开外链。

### 2026-10-11：新增原神国际版下载

- 原神专区新增“原神国际版下载”站内卡片与独立下载页。
- Android / iOS 页签仅切换内容；Android 的 Google Play 与 APK 按钮同等醒目；iOS 使用 App Store 按钮。
- 平台说明加入用户指定的网络访问与 Apple 账号提示，四语言同步。
- 保留五种主题色、深浅模式与站点共享偏好。


### 2026-10-11：新增原神顶级专区

- 主页资源库新增“原神”大型站内入口，固定排列在 Minecraft 下方、其余资源之前。
- 新增 `/genshin.html` 原神独立专区；当时预留扩展位置，随后已加入国际版下载卡片。
- 原神入口与专区完整继承五种主题色、深浅模式及简中、繁中、英文、日文。

### 2026-10-10：修正 Java 移动端 iOS 图标

- 将 iOS 选项卡与 iOS 内容卡片中的手写 SVG 替换为系统标准 Apple 符号“”。
- 两处 Apple 图标使用透明内部与描边轮廓，保持和 Android、Windows 图标一致的中空线框观感。
- 两处图标继续继承当前主题强调色；文字、链接及其他功能不变。

### 2026-10-10：新增 Minecraft Java 版移动端下载

- Minecraft 聚合页新增第四张站内卡片“Minecraft Java 版移动端下载”。
- 新增 Android 与 iOS 两个选项卡；选项卡仅切换内容，下载按钮才打开外链。
- Android 接入 Fold Craft Launcher，iOS 接入 Amethyst iOS GitHub Releases。
- 新页面完整适配五种主题色、深浅模式及四语言。

### 2026-10-10：精简 Java 启动器选项卡文字

- 仅将 Java 启动器下载页红圈内的三个选项卡精简为“官方 / PCL / HMCL”。
- 简体、繁体、英文、日文同步；其中英文的 PCL/HMCL 原本已是精简文字。
- 页面标题、卡片标题、简介、下载链接和其他功能均保持不变。

在创建本交接文档前，最近一次功能部署提交为：

- `bc4cdae848f804437cbf061ae50505fcf33cbad1` — 将 Minecraft 的双端/桌面端范围从标题移到卡片简介，并同步四语言及详情页命名。

该版本已在线验证：

- Minecraft 聚合页显示“Minecraft 基岩版下载”。
- 基岩版简介明确支持 Windows 与 Android 双端。
- Minecraft 聚合页显示“Minecraft Java 版启动器下载”。
- Java 启动器简介明确适用于桌面端。
- 旧的“双端启动器/桌面端启动器”冗长标题不再出现。

### 2026-10-11：移除平台标识图右上角灰色圆形阴影

- 用户指出所有下载页的平台标识图右上角存在灰色圆形阴影，要求统一去除。
- 修改前已于 **2026-10-11 10:30:59 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_10-30-59_UTC` 与带注释标签 `backup-2026-10-11_10-30-59_UTC`；两者均指向基线提交 `4aae8846b24be23b2d0fee2b8aacc19a89884339`。
- 在共享 `card-controls.css` 中统一隐藏 `.download-card::before` 的旧圆形装饰，覆盖 Minecraft 与原神所有使用相同下载卡片的平台图；平台图本身、选项滑块、文字、链接和功能均不变。
- 8 个正式页面同步提升共享样式缓存版本；首页增加简中、繁中、英文、日文更新公告，并提升 `app.js` 缓存版本。
- 新视觉规则：平台标识图保持干净的整块柔和底板，不在边角叠加圆形光斑或阴影。

### 2026-10-11：新版滑块仅保留在下载页平台选择

- 用户明确新版参考图滑块只应应用于各下载页面的平台/渠道选择；主页分类、网站设置及其他滑块都要沿用原先设计。
- 修改前已于 **2026-10-11 10:33:17 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_10-33-17_UTC` 与带注释标签 `backup-2026-10-11_10-33-17_UTC`；两者均指向基线提交 `8f8cf295106cf59b0a484a8d395495c59c57560b`。
- `card-controls.css` 已移除对 `.segmented` 与 `.filters` 的全部新版覆盖，只保留 `.platform-tabs` 的浅色玻璃选中态、焦点态、深色模式与减少动态效果适配。卡片图片升级及上一轮移除灰色圆影的修正继续保留。
- 8 个正式页面同步提升共享 CSS 缓存版本，首页增加四语言更新公告并提升 `app.js` 缓存版本；`README.md` 与本文件同步明确新的样式边界。
- 后续规则：只有下载页面用于切换平台或下载渠道的 `.platform-tabs` 使用新版滑块；不得把该样式扩展到主页分类、主题模式、翻译语言或其他分段控件，除非用户再次明确要求。

### 2026-10-11：每周精选改为浅色单面板卡片

- 用户要求只调整首页“每周精选”的 MDN 与 JLPT 卡片：参考圈选截图恢复单块连续底板、右上角大图形、左下方文字与底部域名/外链箭头的布局，同时颜色应比截图更浅并与全站其他卡片协调。资源库普通卡片和其他全部卡片不得变化。
- 开始修改前发现 GitHub `main` 已新增原神兑换码功能与部署核验提交，先以 `git pull --ff-only` 安全同步到 `57c431e39d6c2c147b22cabbef73f049a859c37c`，未覆盖这些较新内容。
- 修改前已于 **2026-10-11 11:02:34 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_11-02-34_UTC` 与带注释标签 `backup-2026-10-11_11-02-34_UTC`；两者均指向上述最新基线提交。
- `card-controls.css` 仅移除对 `.featured-card` / `.featured-glyph` 的分段图片区覆盖，并为精选卡片伪元素设置更浅的连续渐变；布局由首页原有精选卡片规则负责。未修改 `.resource-card`、`.resource-visual`、专区卡片、下载卡片或任何滑块规则。
- 8 个正式页面同步提升共享 CSS 缓存版本；首页新增四语言更新公告并提升 `app.js` 缓存版本；`README.md` 同步说明精选卡片的独立样式边界。
- 后续规则：首页“每周精选”可使用独立的 `.featured-*` 视觉；调整它时不得连带修改资源库 `.resource-*` 或其他页面卡片，除非用户明确扩大范围。

### 2026-10-11：整理仓库根目录文件

- 用户要求减少 GitHub 根目录中平铺的文件，并明确不得改动网站实际内容、外观或功能。
- 修改前已于 **2026-10-11 11:09:43 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-11_11-09-43_UTC` 与带注释标签 `backup-2026-10-11_11-09-43_UTC`；两者均指向基线提交 `952de25b1ab8721ee60a788d37da831dfc9046f4`。
- 8 个正式 JavaScript 文件原样移动到 `scripts/`，共享样式原样移动到 `styles/`，未使用的旧版 `minecraft.js` / `preview.html` 移动到 `archive/legacy/`，回滚文档移动到 `docs/ROLLBACK.md`。正式 HTML 继续位于根目录，因此现有页面 URL 全部不变。
- 正式 HTML 只更新静态资源引用路径；脚本与 CSS 文件内容、查询参数版本、页面结构、文案、链接、视觉和交互均不改变。本次不新增网站公告。
- 验证：逐文件以 `cmp` 对比移动前的 Git 基线，12 个移动文件内容完全一致；8 个正式页面均指向存在的 `/scripts/` 与 `/styles/` 文件；全部脚本通过 `node --check`，`git diff --check` 通过。
- 后续新增正式 JavaScript 放入 `scripts/`，共享样式放入 `styles/`，维护文档优先放入 `docs/`；`CODEX_HANDOFF.md`、`README.md`、正式 HTML、`.nojekyll`、PWA 清单与 `assets/` 保持现有位置。

### 2026-10-13：移除 jiyouyang 置顶公告

- 用户要求删除公告栏中“jiyouyang 是小男娘”的置顶公告；保留 Eghver 置顶公告和其他普通更新公告。
- 开始修改前发现远端 `main` 已新增 Minecraft 种子查询与绝区零专区，先通过 `git pull --ff-only` 同步至提交 `c4a2c03af5bb0171f781fdcadec3f089d13b3534`，未覆盖这些更新。
- 修改前已于 **2026-10-13 09:58:47 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-13_09-58-47_UTC` 与带注释标签 `backup-2026-10-13_09-58-47_UTC`；两者均指向上述最新基线提交。
- 从 `scripts/app.js` 的 `announcements` 数组中完整移除 `2026-10-11-jiyouyang` 四语言记录；首页静态回退标题与展开内容改为仍保留的 Eghver 置顶公告，并提升首页脚本缓存版本。
- 按公告维护规则，删除或修改公告的请求不再额外生成一条网站更新公告；页面其他公告、资源、样式和交互保持不变。


### 2026-10-13：新增崩坏：星穹铁道专区

- 需求：以后在此对话维护崩铁时读取本交接文档；首页新增崩坏：星穹铁道大类入口，分项参照原神与绝区零，包含国际版下载、国服下载与兑换码查询，链接由 Codex 查询选定。
- 修改前于 **2026-10-13 22:44:24 UTC** 创建并核验完整 GitHub 备份分支 `backup/pre-change-2026-10-13_22-44-24_UTC` 与带注释标签 `backup-2026-10-13_22-44-24_UTC`。两者剥离后均指向基线提交 `f72abe92ab375dc3a6fb2ed691b1d76dce9166c2`；修改前工作区干净，远端 `main` 同为该提交。
- 首页资源库新增“崩坏：星穹铁道”（简介含“崩铁”以供搜索），排序在绝区零之后；新增四语言更新公告并提升 `app.js` 缓存号。两个新页面沿用绝区零专区与下载页结构、五种主题色、深浅模式和四语言设置；Android、iOS、Windows 选项卡只切换内容，下载按钮打开外链。移动导航使用“崩铁”等短标题，避免长名称挤占空间。
- 链接：国服 <https://sr.mihoyo.com/>；兑换码查询 <https://www.crimsonwitch.com/codes/Honkai_Star_Rail>；Google Play <https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea>；APKPure XAPK <https://apkpure.net/honkai-star-rail/com.HoYoverse.hkrpgoversea/download>；美国区 App Store <https://apps.apple.com/us/app/honkai-star-rail/id1599719154>；Windows HoYoPlay <https://hoyoplay.hoyoverse.com/>。APKPure 是第三方入口，采用不含版本号的页面；兑换码页面仅供查询，实际可用码由目标站显示。
- 涉及文件：`index.html`、`scripts/app.js`、`hsr.html`、`scripts/hsr.js`、`hsr-download.html`、`scripts/hsr-download.js`、`README.md` 和本文件。首页静态资源数同步为 12。
- 验证：三个修改或新增的 JS 文件通过 `node --check`；脚本数据检查覆盖 12 个资源、四语言字段、三平台与四个下载链接；新页面站内引用均存在，平台按钮没有导航链接，`git diff --check` 通过。外部地址通过网页检索核对；Crimson Witch 对自动抓取返回 403，浏览器可用性与具体兑换码仍需日后核对。当前环境未提供浏览器控制工具，未进行真实设备视觉回归。
- 新决策：崩铁后续更新沿用本交接文档的备份与同步维护约定，专区层级与其他两款 HoYoverse 游戏保持一致。
