# CODEX 项目交接文档

> 更新：2026-11-27 · 仓库：`Jiyouyang/Jiyouyang.github.io` · 分支：`main`
> 网站：https://jiyouyang.github.io/ · 最近网站更新：2026-11-27（修复从收藏入口打开资源的最近访问记录）

本文集中保存现行规则、网站现状和维护入口。精简前全文（含全部需求演变、备份 SHA、时间、测试与部署记录）[原样归档](docs/history/CODEX_HANDOFF-2026-11-11-original.md)；[本次全部整理说明](docs/HANDOFF_SIMPLIFICATION.md)。历史方案若已被后续要求取代，只作追溯，不按旧记录恢复网站。

## 1. 强制维护流程

### 用户上传的部署原包

1. “原包”指用户当次发来、要求部署的代码压缩包。以该包为对照，尽量原样保留全部内容，包括新设计理念、布局、视觉、文案、动效、交互细节、资源和代码实现。
2. 为完整接入原包，仅调整原有仓库的入口、数据、主题接线或其他兼容代码时，可直接执行。已确认的错误可直接修复；交付时说明错误、修复及验证。
3. 拟改变原包的内容、设计理念、主题外观、交互方式或动效（包括时长、缓动与触发条件）时，无论改动大小，先逐项说明原内容、拟改内容、原因和影响，经用户确认再改；实施中新增的此类差异也须另行确认。
4. 判断依据是部署后对原包内容和体验的实际影响。即使只改仓库里的 CSS 或脚本，只要会改变原包的设计选择（例如把入场动画变短），也须执行第 3 条。对于已复现的故障，若修复同时需要重新选择视觉或交互方案，先请用户确认该设计差异。
5. 四语言、移动端和多主题适配优先复用现有仓库代码。本次 JY//OS 是新访客默认主题，尊重已有访客保存的选择；各主题共享适用于当前页面的交互。优先保留各主题原有入口与按钮，新增控件沿用当前主题的配色、字体和圆角；切角、扫光和状态面板等 JY//OS 专属视觉只在该主题内启用。
6. 交付时说明发现的问题、具体改动、涉及文件、验证结果与线上版本。核验结论写明对照范围，例如卡片动画 CSS 的逐字节比对、浏览器模拟视口或真机测试。

### 修改前完整备份

1. 先读本文，核对当前分支、工作区和 GitHub `main`；不依据聊天记忆覆盖较新内容。任何代码、页面、文案、翻译、设计、链接、配置、部署或文档改动，均须先备份再编辑。同一轮追加新的独立改动也要另备份。
2. 备份完整仓库，而非只备份本次文件。干净工作区以核对后的基线提交建立 GitHub 分支 `backup/pre-change-YYYY-MM-DD_HH-mm-ss_UTC` 和带注释标签 `backup-YYYY-MM-DD_HH-mm-ss_UTC`；两者时间相同、精确到秒，不覆盖或复用旧备份。
3. 有未提交或未跟踪项目文件时，先用不覆盖工作区的独立快照把它们纳入 GitHub；不能把 HEAD 当作全部内容。范围不明或无法安全上传就暂停并说明，不丢弃、重置或擅自混入用户修改。
4. 编辑前核验远端分支和标签均存在、均指向同一完整基线。带注释标签须检查剥离后的提交 SHA（`^{}`），不是标签对象 SHA。任一项未核验成功，不编辑、不声称备份完成。
5. 标签须出现在 **Releases → Tags**，提供 GitHub 自动生成的 ZIP / tar.gz，参照 `pre-visual-upgrade-20261011`；无另行要求不必额外创建 Release 或重复上传压缩包。
6. 本次更新记录写明备份 UTC 时间、分支、标签和基线 SHA；保留全部旧备份。

### “滚回上一个版本”的边界

- 默认只恢复实际网站文件：正式 HTML、运行中的 CSS/JS、网站图片/图标、PWA 和确有必要的发布配置。先核对目标版本和文件清单，再逐项恢复；禁止对根目录无差别恢复或硬重置。
- `CODEX_HANDOFF.md`、`README.md`、`docs/ROLLBACK.md`、测试/维护脚本及其他文档保留最新版，备份分支/标签也保留；用途不明先查证。只有用户明确点名要求时才回退相应文档。
- 从备份恢复为新提交，不强制推送覆盖历史。向当前交接文档追加原因、目标、范围、备份和验证，不以旧文档覆盖现行规则。历史操作参考 [ROLLBACK.md](docs/ROLLBACK.md)，不可照搬旧路径清单。

### 完成、公告与发布

- 每次完成用户要求的功能、文案、翻译、视觉、交互、链接或部署调整，在同一提交更新本文，记录需求、实现、文件、验证、遗留问题和新决策；涉及入口变化时同步 README、首页简介及资源目录。
- 网站更新同时向 `scripts/app.js` 的 `announcements` 加一条四语言简要记录，最新在前，除非用户明确不记录。仅改文档、不改变网站内容/外观/交互的文件整理，或删除、修改公告本身，不再额外生成公告；删除公告按 `id` 移除。
- 验证与风险相称后提交并发布到 `main`，除非用户明确只在本地保存。修改运行资源时递增相应 HTML 的 `?v=`；推送后核验 Pages 实际页面，不只看本地或构建成功。

## 2. 项目定位与文件入口

纯静态 HTML/CSS/原生 JavaScript，无框架、构建步骤、后端或账户同步；GitHub Pages 从 `main` 根目录发布，`.nojekyll` 保留。网站只做资源分享，不恢复已移除的博客。正式 HTML 保留根目录 URL；新 JS 放 `scripts/`、共享 CSS 放 `styles/`、维护文档优先放 `docs/`、图片/字体放 `assets/`。

### 18 个正式页面

下表脚本路径均位于 `scripts/`；各页仍维护自身基础样式、翻译、设置和弹窗，不能漏改同类页面。

| HTML | 页面职责 | 对应脚本 |
| --- | --- | --- |
| `index.html` | 首页、筛选、精选、公告与设置 | `app.js` |
| `avatar.html` | 头像工坊独立编辑页 | `avatar.js` |
| `computer-tools.html` | 十张工具整卡外链 | `computer-tools.js` |
| `minecraft.html` | 六张 Minecraft 站内入口 | `minecraft-hub.js` |
| `minecraft-download.html` | 基岩版 Windows / Android | `minecraft-download.js` |
| `minecraft-china.html` | 国服 Android / iOS / Windows | `minecraft-china.js` |
| `minecraft-mods.html` | CurseForge / Modrinth 渠道 | `minecraft-mods.js` |
| `minecraft-launchers.html` | 官方 / PCL / HMCL | `minecraft-launchers.js` |
| `minecraft-mobile.html` | Java 移动端 Android / iOS | `minecraft-mobile.js` |
| `minecraft-seed.html` | 种子查询双网站，无选项卡 | `minecraft-seed.js` |
| `genshin.html` / `genshin-download.html` | 原神三卡专区 / 国际版三平台 | `genshin.js` / `genshin-download.js` |
| `zzz.html` / `zzz-download.html` | 绝区零三卡专区 / 国际版三平台 | `zzz.js` / `zzz-download.js` |
| `hsr.html` / `hsr-download.html` | 崩铁三卡专区 / 国际版三平台 | `hsr.js` / `hsr-download.js` |
| `endfield.html` / `endfield-download.html` | 终末地三卡专区 / 国际版三平台 | `endfield.js` / `endfield-download.js` |

### 共享文件与缓存

| 文件 | 职责 / 当前版本 |
| --- | --- |
| `scripts/resource-catalog.js` | `window.JYCatalog`：15 项首页资源（`home: true`）及 28 项专区镜像；四语言、来源、平台、别名 |
| `scripts/library-experience.js` / `styles/library-experience.css` | 收藏/排序、复制及降级、快捷搜索/历史、紧凑列表、返回状态、标签与按压反馈 |
| `scripts/app.js` | 首页字典、公告时间线、目录筛选、原主题/设置逻辑 |
| `styles/card-controls.css` | 共用卡片图区、下载平台/渠道滑块及几何修复；`20261022-bugfix1` |
| `scripts/site-style.js` / `styles/site-style.css` | 风格设置、有效偏好清理/后退恢复、主题预览及终端视觉；JS `20261121-picker1` / CSS `20261121-picker1` |
| `styles/mecha.css` / `styles/blackgold.css` | 科技 / 黑金典藏独立视觉；`20261018-mecha1` / `20261018-blackgold1` |
| `styles/columbina.css` / `styles/furina.css` | 两角色独立视觉；`20261121-picker1` / `20261121-picker1` |
| `styles/mtf.css` | 独立 MTF 蓝粉白全屏旗帜背景与五色/深浅/响应式；`20261121-picker1` |
| `assets/themes/{columbina,furina,mtf}/` | 角色图/同字节备用及 MTF 公有领域旗帜；来源、许可、哈希见各目录 README |
| `assets/fonts/` | Apple 字符后备字体、原许可及来源 |
| `assets/site-cover.jpg` / `site.webmanifest` | 网站/桌面图标与 standalone PWA 信息 |
| `archive/legacy/minecraft.js` / `archive/legacy/preview.html` | 已标记遗留、正式页面不引用；只归档，不擅自删除 |
| `README.md` / `docs/ROLLBACK.md` | 项目入口概览 / 历史备份与网站文件回滚说明 |

17 页均加载共享样式和风格脚本。`site-style.js` 在 `<head>`、正文绘制前恢复风格；底部先加载资源目录，再加载增强脚本，最后原页面脚本。目录版本为 `20261126-avatar-card`，增强 JS 为 `20261111-library1`，增强 CSS 保留 `20261111-style-removal1`；共享风格 CSS 为 `20261121-picker1`，MTF CSS 为 `20261121-picker1`，共享风格 JS 为 `20261121-picker1`，首页 `app.js` 为 `20261126-avatar-card`。改哪个运行文件就同步更新所有引用页的版本，新页面也须接入。

旧全面升级的 `site.css`、`site.js`、`scripts/verify-ui.cjs` 已回滚移除；现行共享文件不是把那套升级恢复。未经用户再次要求，不自行引回旧共用体系。

## 3. 页面内容与跳转约定

### 首页与资源库

- 品牌 Jiyouyang，首页固定液态玻璃导航中央留白，进入站内页后在顶部显示层级路径，上级可点击。首页保留品牌、搜索和齿轮“网站设置”（不再叫“外观”）；搜索与设置留距离，手机两按钮点按区域均为 44px，窄屏设置可只显示齿轮但保留可访问名称。
- 首页 15 项资源：头像工坊、Minecraft、原神、绝区零、崩坏：星穹铁道、明日方舟：终末地、电脑工具、MDN、GitHub、Apple Developer、freeCodeCamp、JLPT、Jisho、Can I use、SteamDB。前六项按此顺序在前，五个游戏入口均进入站内专区；简介反映实际内容，并保留“崩铁”“终末地”等检索词。
- 分类为“全部、开发、学习、工具、游戏”，实际四类；`tools` 包含头像工坊、电脑工具、Jisho 与 Can I use，不再保留两个同名工具筛选。只把首页分类叫“工具”，不因此改掉“电脑工具”专区/卡片名称，仍可扩展手机工具。
- 首页搜索栏即时筛选名称、用途/简介、域名、分类；导航搜索打开全站面板，支持 MC 等别名、分类结果、收藏/推荐、最近六条已执行搜索。Ctrl/⌘+K 或 / 打开，上下键选择、Enter 打开、Esc 关闭并恢复滚动/焦点；不叠在设置弹窗上。
- 卡片收藏/复制控件放在链接外，避免嵌套交互；“我的常用”支持取消与排序，不足两项退出排序。来源/平台标签区分站内专区、站内选择、官方、第三方和社区项目；不将非官方项目标成官方。
- 首页大卡片/紧凑列表可切换；收藏、顺序与布局刷新后保留，跨页/标签页同步。复制下载链接随当前可见平台按钮的地址、文字与数量更新，点击时读实际链接；复制失败提供可选中的手动复制链接。返回资源库恢复筛选、词和位置，反馈与按压尊重减少动态效果。

### Minecraft：六项入口及名称

| 卡片 / 详情页 | 必须保持的文案或行为 |
| --- | --- |
| Minecraft 基岩版下载 | 标题不加“国际”“双端”“启动器双端”；简介“支持 Windows 与 Android 双端，选择对应平台前往下载。”；页内 Windows / Android |
| Minecraft Java 版模组下载 | CurseForge / Modrinth；中文保留“如无法访问请使用科学上网”，英文/日文中性表达合适网络访问方式 |
| Minecraft Java 版启动器下载 | 标题不写“桌面端”；简介“适用于桌面端，可选择官方启动器、PCL 或 HMCL。”；标签简写“官方 / PCL / HMCL”，不改主标题 |
| Minecraft Java 版移动端下载 | Android 为 Fold Craft Launcher，iOS 为 Amethyst iOS |
| Minecraft 种子查询 | 先进入站内详情；简介“可输入自己想查的种子号，选择查询网站查看种子地图。”；页面不输入/保存种子，仅两个查询按钮、无选项卡 |
| Minecraft 国服下载 | 先进入站内三平台页；顺序 Android / iOS / Windows，默认 Android，iOS 居中留白与旧下载页一致 |

Minecraft 是持续扩充的内容容器；后续按用户指定类型加卡片，需要选择或详情才建站内页。当前无需做 Java 游戏本体下载页，启动器不等于游戏安装包。基岩版底部多余“页面说明”卡片已删除，不恢复。

### 工具专区：十张整卡外链

| 名称 | 原有目标地址 |
| --- | --- |
| Google Chrome | <https://www.google.com/chrome/> |
| Python | <https://www.python.org/downloads/> |
| Steam | <https://store.steampowered.com/> |
| 图吧工具箱 | <https://www.tbtool.cn/download/index.html> |
| IDM | <https://www.internetdownloadmanager.com/> |
| IDM_Cracker | <https://github.com/YuHuanTin/IDM_Cracker> |
| Watt 工具箱 | <https://steampp.net/> |
| v2rayN | <https://v2rayn.2dust.link/> |
| 海盗船 BT 下载 | <https://thepiratebay.org/> |
| Nyaa BT 下载 | <https://nyaa.si/> |

这些工具集中在专区而非散回首页，不设切换页签。Python/IDM/Watt/v2rayN 等使用官方通用入口，不固定安装包；Watt 与 v2rayN 以维护者仓库所列主页为准，图吧以原版官网为准，不采用相似域名/镜像。“海盗船”暂按 The Pirate Bay（海盗湾）理解，若用户指别站须确认；其在旧环境被代理拒绝不代表用户网络不可用，不擅换镜像。IDM_Cracker 是用户指定的 GitHub 项目，不是 IDM 官方下载。首页简介和搜索需涵盖这些工具名。

### 四个游戏专区与国际版下载

每个专区三卡：国际版先进入本站下载页，国服和兑换码整卡直达外链。原神操作文案为“查询可用兑换码”；查询列表由外站维护，不承诺始终有可用码，终末地还须以游戏内兑换结果为准。允许继续扩充资源，移动导航用“崩铁”“终末地”等短名称。

| 游戏 | 国服直达 | 兑换码查询 |
| --- | --- | --- |
| 原神 | <https://ys.mihoyo.com/main/m/?from_fab=1> | <https://www.crimsonwitch.com/codes/Genshin_Impact> |
| 绝区零 | <https://zzz.mihoyo.com/main/> | <https://www.crimsonwitch.com/codes/Zenless_Zone_Zero> |
| 崩铁 | <https://sr.mihoyo.com/> | <https://www.crimsonwitch.com/codes/Honkai_Star_Rail> |
| 终末地 | <https://endfield.hypergryph.com/> | <https://www.redeem-code-tracker.com/games/arknights-endfield> |

四个国际版页均为 Android / iOS / Windows。Android 双入口同等醒目、同视觉权重并排，不与基岩版/种子查询的主次按钮混淆；iOS 提示非中国大陆地区 Apple 账号。原神 Android 保留无法打开时的网络访问提示；Google Play 按钮简中“Google Play 下载”、繁中“Google Play 下載”，英文/日文短标签“Google Play”。原神 Windows 为“官方启动器下载”，使用中空 Windows 标识。

### 下载/查询原地址（不要在文档整理时改链接）

| 页面 / 平台或渠道 | 目标地址 |
| --- | --- |
| 基岩版 Windows | <https://mc.minebbs.com/?platform=3&environment=1> |
| 基岩版 Android 1 / 2 | <https://mc.minebbs.com/?platform=1&environment=1> / <https://mcapks.net> |
| 国服 Windows / Android | <https://adl.netease.com/d/g/mc/c/gw?type=pc> / <https://adl.netease.com/d/g/mc/c/gwnew?type=android> |
| 国服 iOS（中国区） | <https://apps.apple.com/cn/app/%E6%88%91%E7%9A%84%E4%B8%96%E7%95%8C-%E7%A7%BB%E5%8A%A8%E7%89%88/id1243986797> |
| CurseForge / Modrinth | <https://www.curseforge.com/minecraft/search?page=1&pageSize=20&sortBy=relevancy> / <https://modrinth.com/discover/mods> |
| Java 官方 / PCL / HMCL | <https://www.minecraft.net/zh-hans/download> / <https://github.com/Meloong-Git/PCL> / <https://github.com/HMCL-dev/HMCL/releases/tag/v3.16.4> |
| Fold Craft Launcher / Amethyst iOS | <https://foldcraftlaunch.com/download/> / <https://github.com/herbrine8403/Amethyst-iOS-MyRemastered/releases> |
| 种子查询网站 1 | <https://minecraftsearch.com/zh-CN/工具/种子地图#seed=123&platform=bedrock_26.50&dimension=overworld&x=0&z=0&zoom=16.000> |
| 种子查询网站 2 | <https://www.chunkbase.com/apps/> |
| 原神 Google Play / APK | <https://play.google.com/store/apps/details/Genshin_Impact?id=com.miHoYo.GenshinImpact&hl=en_NZ&pli=1> / <https://genshin-impact.cn.uptodown.com/android/dw/1218436799-x> |
| 原神 iOS | <https://apps.apple.com/us/app/genshin-impact-6th-anniversary/id1517783697> |
| 绝区零 Google Play / XAPK | <https://play.google.com/store/apps/details?id=com.HoYoverse.Nap> / <https://apkpure.net/zenless-zone-zero/com.HoYoverse.Nap/download> |
| 绝区零 iOS | <https://apps.apple.com/us/app/zenless-zone-zero/id1606356401> |
| 崩铁 Google Play / XAPK | <https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea> / <https://apkpure.net/honkai-star-rail/com.HoYoverse.hkrpgoversea/download> |
| 崩铁 iOS | <https://apps.apple.com/us/app/honkai-star-rail/id1599719154> |
| 原神 / 绝区零 / 崩铁 Windows | <https://hoyoplay.hoyoverse.com/> |
| 终末地 Google Play / APK | <https://play.google.com/store/apps/details?id=com.gryphline.endfield.gp> / <https://apkpure.net/arknights-endfield/com.gryphline.endfield.gp/download> |
| 终末地 iOS | <https://apps.apple.com/us/app/arknights-endfield/id6752642477> |
| 终末地 Windows 官方入口 | <https://endfield.gryphline.com/en-us> |

基岩版 Android 说明“页面 1 没有所需版本请尝试链接 2”；种子双按钮优先同行、1 主 2 次，空间不足可换行，网站 1 保留用户给定初始参数。网易地址是下载引导，不保证直接返回安装包，iOS 可能需要中国区账号。原神 APK 固定版本需核验，其他三款 APKPure 为无版本入口但包格式/版本仍要核验，均不能冒充官方。

## 4. 视觉、交互与无障碍红线

- 经典风格为 Apple 黑白/石墨、浅底近 `#f5f5f7`、黑色深底、中性色表面与描边；大圆角、留白、粗标题、短说明、轻阴影，不恢复高饱和渐变。各页保留内嵌基础样式和手机单列结构。
- 导航、设置与分段控件用半透明、模糊/饱和、细亮边和内高光；参考而非照搬截图，阅读清晰优先。居中导航标签不额外叠纯白内块；不恢复 Hero 下方三个装饰图标。
- 普通卡片头图为柔和灰白/随主题变化底板、居中字形（MC/MOD 等），不是写实封面。下载标识底板保持干净，隐藏旧 `.download-card::before` 圆斑，不在右上角再叠灰圆阴影。
- “每周精选”MDN / JLPT 使用独立 `.featured-*` 浅色连续单面板：右上大图形、下方文字、底部域名/箭头，颜色比参考图浅且与全站统一；改精选不得连带改 `.resource-*`、专区或其他卡片，除非用户明确扩大范围。
- 参考图新版滑块只用于下载平台/渠道 `.platform-tabs`；首页分类、设置模式/语言及其他分段控件沿用旧设计，不扩大覆盖。所有主题的指示块两端等距；`.segmented::before` / `.platform-tabs::before` 的 `border-box`、步进位移和轨道计算须保留，不靠裁切或位移补偿掩盖越界。窄屏长标签可收缩/换行；减少动态效果要覆盖伪元素。
- 进入站内选项/详情卡用小箭头 →，整卡直达外网用 ↗，统一以首页小箭头 18px 为基准，不恢复 28px。页签必须是只切内容的 button，只有明确下载/前往按钮才打开外链；整卡直达外链是上述既定例外。保留安全新标签页属性。
- 下载按钮沿用基岩版紧凑规格、垂直 padding/字号/图标/圆角；原神不另加 48px 最小高度，文字不换行、宽度按文字延伸，极窄屏只缩横向间距。四款国际版 Android 双按钮等权重并排；基岩版/种子页保留主次区别。
- 九个下载页平台/渠道栏已支持左右循环、Home/End 和单一 Tab 焦点，复用原点击更新，鼠标和 `aria-selected` 同步；不更改默认平台、目的链接或样式。不把旧回滚记录中“键盘操作已移除”当现状；URL hash 分享恢复不因键盘功能而自动恢复。
- 采用系统字体栈（SF Pro/PingFang 等）、适当字号、44px 触控区、`focus-visible`、ARIA、`tablist`/`tab`、`aria-selected`/`aria-pressed`、搜索结果 `aria-live="polite"`；固定导航和滚动偏移不遮搜索。浅/深/跟随系统、无存储与减少动态效果都要可用，主要文字/按钮保持可读对比度。

### iOS 图标与网站图标（用户指定）

- 所有 iOS 页签小图标和卡片大图标直接复用旧原神页 `genshin-download.html` / `scripts/genshin-download.js` 的 ``（`U+F8FF`）、`.tab-apple` / `.apple-symbol` 及透明内部/描边 CSS；不换手机轮廓、近似 Apple SVG 或另行手绘。两种尺寸均检查四语言、五色、三档外观；图标一致不意味着所有页面平台顺序都要改。
- Apple 系统字体优先，后接 `assets/fonts/jy-apple-fallback.woff2`（644 字节），避免非 Apple 缺字。后备为按 OFL 重命名的 Font Awesome Free Brands 6.7.2 Apple 子集，`U+F179` 映射 `U+F8FF`，名为 JY Apple Fallback；不分发 Apple 系统字体，保留 `assets/fonts/LICENSE-font-awesome.txt` 与来源记录。
- favicon、Apple 主屏幕和桌面/PWA 图标统一使用用户蓝发动漫人物抱黄色小鸡的 `assets/site-cover.jpg`，不是 Hero 大封面；保留抽象卡片。未来若按用户意愿生成 PNG/ICO，仍保留原图构图，不擅自替换指定图片。

## 5. 七套风格、翻译与偏好

设置顺序：风格调整 → 五种主题颜色 → 跟随系统/浅色/深色 → 简中/繁中/English/日本語。七风格预览顺序如下，芙宁娜紧随哥伦比娅，MTF 追加在最后；科技只改显示名，内部 `mecha`/文件/键不改，历史名称“机甲”不重写。

| 风格 / 标识 | 首次默认 | 设计与隔离要求 |
| --- | --- | --- |
| JY//OS `tech` | 石墨（青蓝）、深色 | 新访客默认，设置首项；样式在 `styles/tech.css`，首页状态面板在 `scripts/tech-hud.js` |
| 经典 `classic` | 石墨、跟随系统 | 原液态玻璃与圆角留白，可手动选用，已保存选择优先 |
| 终端 `terminal` | 绿色、深色 | 等宽字、绿黑/浅灰绿、荧光边、琥珀标签、低亮网格、矩形面板 |
| 科技 `mecha` | 橙色、浅色 | 陶瓷白/钛灰、深导航、斜切/机械环/面板接缝；深色蓝灰机舱；第三预览独占行 |
| 黑金典藏 `blackgold` | 橙色档暖金、深色 | 墨黑/象牙白、金线/徽章/内边框、衬线标题与无衬线正文；第四预览独占行，不加图片/字体依赖 |
| 哥伦比娅 `columbina` | 蓝色、浅色 | 月光蓝/珍珠白/蓝紫羽翼/莓红，深色午夜蓝；星月轨道、手机上下/桌面分栏、角色脸部不压字、背景低透明而卡片可读 |
| 芙宁娜 `furina` | 蓝色、深色 | 枫丹蓝金/珍珠白、水纹/珍珠环/礼帽/水滴/舞台框与票券边饰 |
| MTF 跨性别 `mtf` | 蓝色、浅色 | 蓝粉白全屏固定旗帜背景、折光玻璃与独立卡片边饰；深色为柔和夜蓝，不复用已删除角色主题 |

全套覆盖首页、公告、精选/资源/专区、下载插图/按钮、搜索、平台/渠道、设置及页脚，支持五色、三档模式、四语言。网站视觉规则限定各自 `data-style`，不改变旧风格、业务内容/链接或滑块尺寸算法；每个风格独立恢复配色/模式，语言通用，不自动切换已有用户设置。预览/新设置不等于恢复旧升级的“外观实时预览/恢复默认”等功能。

经典五色：石墨 `#1d1d1f`、蓝 `#0071e3`、紫 `#7656d6`、绿 `#248a3d`、橙 `#c45100`。主题色通过 CSS 变量/`color-mix()` 同时影响按钮、活动底板、插图、MC/MOD、强调线和背景，不只改按钮；独立风格可映射自身色板。`data-theme`/`data-accent` 驱动变量，跟随系统须实时响应，Safari `theme-color` 跟实际背景更新。

### 图片素材与最新范围

- 哥伦比娅原画 `assets/themes/columbina/character.png`（1024×1024、约 1.7 MB），SHA-256 `94b632023e5daa0e9c5bb535ce0a7b49b48accd54618988248c5dda2548b4ec2`；原图不变。页脚来源为米游社 <https://www.miyoushe.com/ys/article/71350081>，资料参考 <https://baike.mihoyo.com/ys/obc/content/507505/detail>；实际图片仍为本站同源文件，不等于已取得米游社同图 CDN 直链。
- 芙宁娜实际主请求为 B站 BWIKI `patchwiki.biligame.com`，官方 2024 生日图的本地同字节备用 `assets/themes/furina/artwork.png`（1000×1000、1,746,100 字节），SHA-256 `b5345a4e8f9d73b32dff5bd12477521a578ceb0f758029224ba20a1b2a4dae10`。
- 图片只在选中对应风格时按需创建/请求，离开隐藏，不让无关风格加载。芙宁娜通过 `createThemeArt` 在错误或 8 秒超时后用本地同图备用，再失败保留 CSS 装饰；哥伦比娅本地原图失败也保留 CSS 月亮和业务功能。来源、版权、非官方说明四语言同步，不去水印、不冒充原创/开源/官方授权，不复制参考截图的系统文字、设备信息或字幕。
- MTF 以共同的跨性别骄傲旗配色为灵感，不称其为 MTF 专属旗、不提供医疗建议。旗帜源码来自 [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Transgender_Pride_flag.svg)，该图标为公有领域；同源 `assets/themes/mtf/pride-flag.svg`（273 字节，SHA-256 `a46c2d7f8524ce172136c8810256b9b0b0fb3301c8b98e680394554d865f5fc8`），蓝 `#5BCEFA` / 粉 `#F5A9B8` / 白，源文件保持五条等高与 5:3 比例；背景适应视口铺满五条等高横纹。选中后才创建单一全屏固定背景，不再创建小旗帜框；错误或 8 秒超时留同样五条横纹的 CSS 背景，迟到加载可恢复；四语言来源/说明，运行时不请求境外图片。
- **此前用户“图片源不用再管了”指旧图片源跟进，仍不继续、也不冒称米游社同图直链已完成；本次用户明确授权搜索全新 MTF 资料和背景，按新需求另行实施。** 其他角色图与来源不改，当前环境下载成功不代表中国大陆各运营商均可直连。

### 四语言与存储

所有新增/修改文案同步 `zh-CN`、`zh-TW`、`en`、`ja`，覆盖标题、meta description、简介、按钮、设置、动态卡片、公告及可访问性名称；页面字典配合 `data-i18n` / `data-i18n-html` / `data-i18n-label`，不依赖外部翻译。专区文案更新还要同步共享目录镜像。名称：科技/科技/Technology/テクノロジー；黑金典藏/黑金典藏/Black & Gold/ブラック＆ゴールド；哥伦比娅/哥倫比婭/Columbina/コロンビーナ，不按“哥伦比亚”误拼改角色名。

| 存储键 | 内容与边界 |
| --- | --- |
| `localStorage`：`jy-accent`、`jy-theme`、`jy-language` | 当前色调、外观、全站语言；无偏好默认 JY//OS 石墨、深色 |
| `jy-style`、`jy-style-{tech,classic,terminal,mecha,blackgold,columbina,furina,mtf}` | 当前风格及各自 `{accent, theme}`；当前 `jy-accent`/`jy-theme` 始终与之对应 |
| `jy-favorites`、`jy-library-view`、`jy-search-history` | ID/顺序、`cards`/`list`、最多六条已执行搜索；目录校验、去重，仅当前浏览器，不跨设备 |
| `sessionStorage.jy-library-return` | 筛选、搜索词、滚动/锚点；仅后退或专区返回资源库时恢复，最多一天 |

每页 HTML 在绘制前读主题/色调，风格脚本监听语言/模式/颜色并同步内存、存储、按钮、ARIA、标题/描述和 Safari 顶栏；后退缓存恢复读取最新偏好。设置内部程序点击避免冒泡误关；无存储仍可本页使用，正确提示临时模式，不承诺跨页持久化。

已移除的主题不留选项、样式、图片或隐藏实现，也不另建主题归档。无效的独立风格偏好会清理；当前选择失效则恢复经典自己的已存配色/模式，若无则石墨/跟随系统，不继承被移除主题的配色。收藏、语言、列表、搜索与其余风格偏好不清除；现有 Git 历史、完整备份及交接原文历史记录不重写。

## 6. 公告的固定规则

公告在导航下方，左右宽度及收起高度与导航协调（经典手机总高 56px、桌面 62px）；保留原窄摘要，点击展开标题/日期/详情，空列表隐藏。置顶优先并在摘要每 3000ms 垂直轮播，展开同时保留；减少动态效果仍切文字但不播滚动动画。普通更新按日期折叠，标记新增/优化/修复及最新。

保留用户原拼写 `jiyoyang` 的“jiyoyang是Eghver恶魔主人喵”、作者公告和制作公告；制作公告摘要“本站由Jiyouyang & Codex制作”，展开为完整“本站由Jiyouyang & Codex（基于ChatGPT 6Astra & 6Sol)制作”，不要把作者姓名误拆为额外公告。旧 Eghver/旧 jiyouyang 公告的替换删除经过见归档，不根据旧记录擅自恢复。

新增/修改公告必须逐一检查四语言、五色、浅/深/跟随系统的文字、图标、活动态及玻璃对比度，不仅补翻译；同步首页静态回退摘要/日期和脚本缓存。删除/修改公告不再生成“删改公告”的新公告，文档仍随实际网站变更更新。

## 7. 验证入口与已知边界

| 检查 | 用途 |
| --- | --- |
| `node --check scripts/<文件>.js`、`git diff --check` | 语法/差异；另核对所有站内路径、外部目标与资源版本 |
| `node tests/library-experience.cjs <URL>` | 原资源保留、28 项专区四语言镜像、收藏/排序/持久化、别名/历史/返回、动态复制/降级、存储拒绝和七主题布局 |
| `node tests/site-style.cjs <URL> mtf` | 17 页、经典对照、五色/三模式/四语言、七主题偏好、搜索/公告/平台与系统主题（可改参数检查其他独立风格） |
| `node tests/slider-geometry.cjs <URL> [逗号分隔页面]` | 七风格各指示块边界/两端留白、320/390/768/1440、四语言、动画终点/减少动态效果 |
| `node tests/style-isolation.cjs <URL> <Git基线>` | 修改前后旧风格计算样式对照；基线须按此次改动核对，历史 SHA 不盲用 |
| `node tests/columbina-art.cjs <URL>` / `node tests/furina-art.cjs <URL>` | 分别检查角色构图/按需加载/切换隐藏/来源/失败降级；芙宁娜支持 `--live` 实连核验 |
| `node tests/small-bugfixes.cjs <URL>` | 工具分类合并、九页平台键盘/点击、实际 Apple 后备字形、七风格窄屏 |
| `node tests/removed-style.cjs <URL>` | 删除前后风格清单差异、五个专属文件确实删除、17 页四语言无残留/请求、经典偏好恢复、其余数据保留和存储拒绝 |
| `node tests/mtf-theme.cjs <URL>` | MTF 旗帜安全源码/哈希、同源按需加载、17 页全屏/滚动构图与滑块、四语言、切换隐藏及失败/超时/迟到恢复 |

MTF 专项通过浏览器截图逐行核对手机、桌面和超宽屏的五条等高横纹，并核对图片失败、超时与迟到恢复时的画面。

浏览器脚本需运行中的本地静态服务器、Playwright 与 Chromium，默认 `/usr/bin/chromium`，可用 `CHROMIUM_PATH` 指定。涉及滑块须测实际指示块几何（已有标准误差 <0.12px），不只测页面无横向溢出；真实图片请求与确定性回退分开验证。历史线上浏览器测试只限定信任当前环境代理 CA 的 SPKI，没有关闭全局 TLS 验证。

每次改动至少核对：

- [ ] 编辑前完整备份分支/Tags 已核验；回滚不覆盖维护文档。
- [ ] 四语言、五色对控件及图形的联动、浅/深/跟随系统正确。
- [ ] 平台只切内容、明确外链按钮/直达卡片才导航；链接与站内路径正确。
- [ ] 手机导航、搜索、设置不重叠且易点按；相关主题、滑块、键盘/焦点检查通过。
- [ ] JS 语法、差异、运行资源缓存版本、README/目录/交接记录同步。
- [ ] 推送 `main` 后核验 Pages 实际页面；仅文档任务则核对远端文档及网站未变。

较早资源库验收：14 项首页逐字段、28 项专区 × 四语言 = 112 项、29 个平台下载复制、当时七主题共 336 组布局，以及 17 页/300 组主题回归通过；`bef84b0` 的线上验收成功。更早测试数字、截图、SHA 和局限全部见原文归档，不当作每次都已重跑；移除旧主题与新增 MTF 的分别检查见文末。

当前无已确认阻断使用错误、无待续的资源库增强。以下为保留风险或未来选择，不是擅自开工清单：

- 真实 iPhone Safari / Android Chrome 的视觉、键盘唤起、滚动、深色和各运营商网络仍需实机；自动浏览器检查不能代替。
- 外链受第三方及地区网络限制；HMCL 固定 `v3.16.4` 不自动更新，原神 APK 固定版本、APKPure 包格式/可用性、图吧官网迁移都需维护时核验。
- JPEG favicon 对旧平台可能不如 PNG/ICO 稳定；是否生成标准多尺寸版本由用户决定，不能换掉原图。
- 页面内字典/设置/弹窗仍分散；增删文案/入口逐页同步四语言、README、首页简介与目录镜像，不误认为旧 `site.js` 已在运行。
- Minecraft 后续入口按用户实际需求加；遗留文件仅归档，删除另评估；旧图片源任务不继续，新 MTF 素材按明确新需求维护。

## 8. 历史回滚点与本次整理记录

- 全面视觉升级前：`dcc9d01b0e9c9e024b48fb1242ad54c86e420242`，分支 `backup/pre-visual-upgrade-20261011`、标签 `pre-visual-upgrade-20261011`，2026-10-11 已恢复；升级版本另存 `backup/pre-change-2026-10-11_10-08-23_UTC`（`89a16cad9c5f3cd909c6df282c2ec06a0fe4c0c2`）。只按现行网站文件范围回滚。
- 资源库增强前最后正式上线版：`dbe9c444e03f9f23e8bef3d32e82d1e7a0833e88`。含当时未提交资源库草稿的完整快照为 `70ecf4d0594419fbd2b468d8287fefe0d92e0d98`，对应分支 `backup/pre-change-2026-11-11_08-57-19_UTC` 和标签 `backup-2026-11-11_08-57-19_UTC`；不要把草稿备份当作最后正式上线版。
- 其余历次需求/部署、完整备份引用、旧路径/缓存号、测试结果和失败尝试均原样保存在 [精简前全文](docs/history/CODEX_HANDOFF-2026-11-11-original.md)。本文未复述不代表删除该信息；被后续取代的旧决定只作为历史。

### 2026-11-11：交接文档精简（仅文档）

- 需求：简化交接文档，但保留全部原意、要求，并告知所有变动。
- 修改前完整备份：**2026-11-11 10:02:06 UTC**；分支 `backup/pre-change-2026-11-11_10-02-06_UTC`，带注释标签 `backup-2026-11-11_10-02-06_UTC`；远端分支和剥离标签均核验为 `bef84b020456e3861f5d1ffd771b694f5d776087`（71 个受控文件、干净工作区）。
- 实现：合并重复规则/页级公共说明/文件职责/缓存记录，将现状与历史分开；按 2026-10-22 与 11-11 已完成记录澄清分类、键盘、测试、图片源任务状态，不新增功能或放宽用户要求。
- 文件：重写本文；原文逐字节归档 `docs/history/CODEX_HANDOFF-2026-11-11-original.md`；完整变动对照 `docs/HANDOFF_SIMPLIFICATION.md`。网站 HTML/CSS/JS、素材、公告、README 与回滚说明均不改。
- 验证：归档逐字节/哈希一致，105 个原标题与 65 条历史、49 个原现状链接、32 组关键要求、17 页文件映射和文档链接检查通过；其余 70 个原文件逐字节未变，仅三份 Markdown 变动。无需重跑网站视觉测试、更改缓存或增加公告；详细结果见变动对照。
- 遗留/决策：无新增网站任务；旧资料完整保留、现行规则集中于本文，图片源继续不处理。

### 2026-11-11：完整删除绪山真寻主题

- 需求：按截图完整删除“绪山真寻”主题，不留隐藏入口、备用实现或主题归档；其余六套风格与功能不变。
- 修改前完整备份：**2026-11-11 10:30:12 UTC**；分支 `backup/pre-change-2026-11-11_10-30-12_UTC`，带注释标签 `backup-2026-11-11_10-30-12_UTC`；远端分支和剥离标签均核验为 `a90bef16de8945194a1cb4c27a33ae94276ed60a`，工作区原本干净。
- 实现：删除主题 CSS、两张图片、素材说明及专用测试；移除 17 页 CSS 引用、四语言选项/预览/版权/远程加载、列表圆角规则、创建该主题的旧公告及其他公告中已失效的位置描述。增加四语言移除公告，保留所有资源/下载链接；当前六主题文档与测试同步。
- 迁移：泛化清理已不支持的 `jy-style-*` 独立偏好；旧选择回到经典已存偏好或默认石墨/系统模式，不清除收藏、语言与其他风格设置；后退恢复及禁用存储也须可用。
- 文件：共享风格 JS/CSS、增强 CSS、17 页引用、首页公告、README、本文与回归测试；修改运行文件缓存为 `20261111-style-removal1`。原六套主题的独立 CSS、角色原图与 Apple 字形不改；旧文档原文和 Git 历史/备份保留，不存放被删除主题实现的归档副本。
- 验证：删除专项通过五个专属文件已删、17 页/68 组四语言检查、无残留请求、经典已有/默认偏好恢复、有效主题不重置、后退恢复及禁用存储；六套原主题 1,020 组样式对照完全一致。17 页/300 组配色语言模式、资源库 288 组布局及 29 个动态下载复制、14,208 个滑块位置、九页键盘与实际 Apple 后备字形检查均通过；芙宁娜素材专项的 17 页/四宽度/四语言、1,144 个滑块位置与全部失败/超时回退通过。17 页正文/原链接、剩余独立主题 CSS/图片、目录/增强逻辑、字体与原文归档逐字节未变；缓存/路径、JS 语法和差异检查通过。已查看手机设置截图，无残留空位。
- 遗留/决策：不恢复该主题、不继续图片源任务；真实 iPhone 与各地网络仍以实机为准。

### 2026-11-11：新增独立 MTF 跨性别主题

- 需求：全新 MTF 跨性别风格，允许网上检索资料和背景；不恢复已删除的主题，其他六套风格及资源功能保持不变。
- 修改前完整备份：**2026-11-11 10:56:50 UTC**；分支 `backup/pre-change-2026-11-11_10-56-50_UTC`、带注释标签 `backup-2026-11-11_10-56-50_UTC`；远端分支与剥离标签均为完整干净基线 `2aa4f139bfd6c73f656ee53615667601e4fa56c4`。
- 实现：新增独立 `styles/mtf.css` 与本地公有领域 SVG、来源/许可 README；共享设置追加第七选项、四语言、浅色蓝默认、独立 `jy-style-mtf` 与按需图形/失败降级。17 页接入并提升共享风格/首页脚本版本至 `20261111-mtf1`；首页普通四语言公告、README 与测试同步。
- 设计：蓝粉白、柔和流光、玻璃与旗帜，覆盖导航/首屏/精选/普通卡片/下载/收藏列表/搜索/公告/设置/页脚；保留内容和平台标识、原箭头、按钮层级与滑块尺寸算法。无外部运行时图片/字体/脚本依赖，不新增账户、追踪或医疗内容。
- 验证：MTF 全部 17 页、300 组配色/语言/模式、七主题独立偏好/刷新/后退/禁用存储通过；原六套风格 1,020 组修改前后样式对照完全一致。图形专项通过 17 页/68 组四宽度构图、四语言、1,144 个滑块位置、同源按需/离开隐藏、失败/8 秒超时/迟到成功恢复；本地 SVG 与实际原文件 SHA-256 一致。全站七主题 16,576 个滑块位置、资源库 336 组布局/112 项专区翻译/29 个动态复制、九页键盘与实际 Apple 后备字形、旧主题删除专项及芙宁娜素材回归通过。17 页正文和目的链接、全部原主题 CSS/图片、目录/增强逻辑、字体及历史文档逐字节未变；语法/路径/缓存/差异检查通过，已查看手机/桌面首屏及深色下载页截图。
- 遗留/决策：旧图片源跟进仍停止，原角色素材/六主题 CSS 和已删除主题状态保留；真实 iPhone、Android 与各地网络仍需实机验证。

### 2026-11-11：MTF 旗帜改为整页大背景

- 需求：参考哥伦比娅、芙宁娜的大背景呈现，将 MTF 旗帜改为整页背景；仅调整 MTF，不修改其他风格。
- 修改前完整备份：**2026-11-11 11:28:15 UTC**；分支 `backup/pre-change-2026-11-11_11-28-15_UTC`、带注释标签 `backup-2026-11-11_11-28-15_UTC`；远端分支与剥离标签均已核验为完整干净基线 `442bea4faab9162590c6b5ab3b3c329d8ccc7382`。
- 实现：移除首屏小旗帜框、装饰文字和预留分栏，首屏内容居中；同一原图固定铺满视口，保留五条横纹、不模糊裁切，滚动时仍在内容后方。浅色透明度 0.20、深色 0.22；失败/8 秒超时仍显示同纹 CSS 背景，迟到成功可恢复。
- 文件：`styles/mtf.css`、`scripts/site-style.js`、17 页对应缓存引用、首页四语言普通公告、专项测试、两份 README 及本文。修改资源版本 `20261111-mtf-background1`；其他主题、源 SVG/许可/哈希、下载与资源库逻辑、存储和历史文档保持不变。
- 验证与限制：备份已核验；编辑前完成超宽屏 SVG 铺满的浏览器像素试验。随后工作环境断开，改用 GitHub 连接生成同一原子提交；执行 JS 语法解析、单一背景按需/六主题隐藏/四语言来源及失败-超时-迟到恢复逻辑模拟、17 页正文/目的链接及缓存差异检查、MTF 规则隔离和深浅五色 48 项文字/旗帜合成对比度计算（最低约 4.52:1）。专项测试已按全屏/滚动/超宽屏/失败降级更新，但本轮无法运行完整 Playwright 回归或截图验收，不引用上一轮通过数字作为本轮结果。
- 当时待续：MTF 专项与通用风格回归，已于 2026-11-20 补做，见下方记录。

### 2026-11-20：补验整页旗帜并修复横纹重复

- 恢复工作环境后，截图发现旧 SVG 按原始比例留白，在部分屏幕上与 CSS 底层横纹叠加。新增 `pride-flag-viewport.svg` 作为按需加载的显示副本，通过 `preserveAspectRatio="none"` 使五条等高横纹铺满，原图和许可继续存档。同步更新 17 页共享脚本版本、首页四语言公告与素材文档。
- 修改前完整备份为 **2026-11-20 11:19:59 UTC**。GitHub 分支 `backup/pre-change-2026-11-20_11-19-59_UTC`、带注释标签 `backup-2026-11-20_11-19-59_UTC` 均已核验至 `63ea1bc7b1815a5f0817b7751b8be3ef1e8ac979`。
- MTF 专项通过 17 页、170 组滚动布局、四语言、1,144 个滑块位置，以及三种屏幕比例与图片失败、超时、迟到恢复的逐行像素检查。通用回归通过 17 页、300 组设定组合、偏好与主题切换。补验期间另通过其他六套主题的 1,020 项对照、资源库 336 组布局及 29 个下载链接复制检查。
- 手机结果来自 Chromium 模拟视口。真实 iPhone Safari 与 Android 实机验证仍待有设备时完成。素材来源沿用现有记录，已删除主题继续按交接规则维护。

### 2026-11-21：手机风格选择与背景浓度

- 650px 及以下的设置面板以当前风格预览作为展开按钮。选择后收起并将焦点返回按钮，桌面直接展示七套风格。
- 哥伦比娅、芙宁娜和 MTF 各支持淡雅、标准、鲜明三档浓度，首次为标准。对应 `jy-backdrop-<风格>` 偏好可跨页恢复，存储受限时在当前页面记忆。设置及普通公告包含四语言。
- 修改前 GitHub 完整备份时间为 2026-11-21 00:36:25 UTC，分支 `backup/pre-change-2026-11-21_00-36-25_UTC` 和带注释标签 `backup-2026-11-21_00-36-25_UTC` 已核验指向 `0c8b68a822a3cf34cecca11af905941110373163`。
- 入口见共享风格 JS/CSS、三份背景主题 CSS 和首页公告。浏览器检查见 `tests/theme-picker.cjs`，覆盖 320px 手机键盘、桌面、三主题各档实际透明度、跨页恢复、深浅及四语言。通用风格测试覆盖 17 页和 300 组组合。移动端验证使用 Chromium 模拟视口。

## 2026-11-26 · 头像工坊

首页导航新增独立入口 avatar.html，scripts/avatar.js 与 styles/avatar.css 负责本地图片解码、Canvas 贴纸绘制和原尺寸 PNG 导出。补充四语言入口、资源索引、公告与 README。以 375px 宽 Chromium 从首页进入，上传 1200×800 图片，切换旗帜、缎带与位置，验证下载尺寸及叠加像素。
备份时间 2026-11-26_10-23-06_UTC，分支 backup/pre-change-2026-11-26_10-23-06_UTC，带注释标签 backup-2026-11-26_10-23-06_UTC，基线 35f4c3570eabd277a9228d9a10a6c9f4ebfe8284。

### 2026-11-26 · 将头像工坊移入首页资源库

首页导航中央留白。「头像工坊」与游戏专区共用资源卡片，在「全部」和「工具」中显示，同页签进入 `avatar.html`。后续维护先读本文，再按第一节备份、验证、记录和发布。

编辑前完整备份于 2026-11-26 10:36:50 UTC，远端分支 `backup/pre-change-2026-11-26_10-36-50_UTC` 和带注释标签 `backup-2026-11-26_10-36-50_UTC` 均已核验至 `ce9079a086056fb05f877366fa41ca294051e87d`。

变更涉及首页导航、资源目录、四语言更新公告、各引用页缓存版本、README 与测试预期。本地 Chromium 已验证首页卡片跳转、四语言工具筛选及七主题布局，另检查四语言 × 三种外观 × 五种配色下的新公告与入口。

### 2026-11-26 · 专区导航层级路径

首页中央留白。17 个站内子页面使用有序列表显示首页、可选的父专区及当前页。首页段返回资源库，专区段返回对应卡片列表。父专区从资源目录读取四语言名称，当前页沿用页面字典；窄屏长路径可横向滑动。入口和资源目录地址沿用现有值。

修改前完整备份时间为 2026-11-26 10:43:40 UTC，远端分支 `backup/pre-change-2026-11-26_10-43-40_UTC` 和带注释标签 `backup-2026-11-26_10-43-40_UTC` 核验至 `8b0df9f475fca34a078f94f8fe9feec4a7f1bd5c`。

涉及各子页导航 HTML、`styles/breadcrumbs.css`、`scripts/breadcrumbs.js`、首页四语言公告、缓存版本及 README。本地 Chromium 验证资源库→Minecraft→种子查询及两个上级链接，17 页 × 四语言 × 320/390/810/1440px 均无导航控件相互遮挡，并检查原神下载页的七种风格及语言切换。

### 2026-11-26 · 头像全幅旗帜背景

头像工坊用整幅横纹旗帜作为背景，前景支持透明 PNG/WebP、连通纯色区域去除、还原、平移和缩放，按原图宽高导出 PNG。复杂背景使用预先抠好的透明图。首页入口和路径沿用现有设置。编辑器、资源目录、相关缓存、四语言公告和 README 已同步。

编辑前完整备份时间为 2026-11-26_10-52-27_UTC，远端分支 `backup/pre-change-2026-11-26_10-52-27_UTC` 和带注释标签 `backup-2026-11-26_10-52-27_UTC` 的目标提交已核验为 `b042daa20e2d626cf21fedbd24249fa30851fb99`。

Chromium 使用临时生成的色块检查五条旗纹、透明前景、JPEG 纯色背景自动与点选移除、还原、配色切换、原尺寸导出、四语言和手机布局。

2026-11-26：将上传的 JY//OS 主题接入全站，设置首项并作为新访客默认。备份时间 2026-11-26 22:54:53 UTC，分支 `backup/pre-change-2026-11-26_22-54-53_UTC`、标签 `backup-2026-11-26_22-54-53_UTC` 均指向 `2f676550694a261912045f2c41f5d891247980cb`。本地通过 18 页三种屏宽、主题切换及保存、四语言选择器和 Windows 下载链接检查。

### JY//OS 交互更新（2026-11-26）
- 更新包的命令面板、快捷键帮助、阅读进度、平台推荐、记忆和带平台的链接已接入 18 页。交互入口在 `scripts/tech-interactions.js`，随主题挂载或卸载。首次访问和既有主题偏好的规则继续沿用。
- 改动前备份于 2026-11-26 23:06:04 UTC，分支 `backup/pre-change-2026-11-26_23-06-04_UTC` 和标签 `backup-2026-11-26_23-06-04_UTC` 均已核验为 `4f1c5fad551ad0bcd26a8d6c22fe678f239c16d6`。
- 本地 Chromium 验证 18 页 × 320、390、1440px，以及搜索、帮助、主题切换、刷新保存、Windows 下载和平台记忆。已添加四语言首页公告。

### JY//OS 分类、视图与下载页适配（2026-11-26）
- 备份时间 2026-11-26 23:11:51 UTC，分支 `backup/pre-change-2026-11-26_23-11-51_UTC`、标签 `backup-2026-11-26_23-11-51_UTC` 均指向 `f9a632c15f06e1ce382ecdd05c66ca4e49b91431`。
- `scripts/tech-interactions.js` 和 `styles/tech.css` 接入分类计数、分类和视图滑动高亮、下载内容切换动画、手机横滑、桌面数字键提示及子页导航按钮分组。切换主题时清理标记、观察器、监听器及分组。减少动态效果设置适用于切换动画。
- 18 页更新缓存版本，首页添加四语言公告；回归脚本 `tests/tech-theme.cjs` 覆盖三种屏宽、分类计数与高亮对齐、主题切换清理、平台横滑和下载地址。

### 2026-11-27 · 适配 JY//OS 卡片与资源搜索更新包

- 基于当前 18 页接入包内新增功能。包内为旧版 17 页单主题快照，启动时清除主题偏好；本次沿用现行多主题加载和收藏反馈。
- 备份时间 2026-11-27 09:56:41 UTC，远端分支 `backup/pre-change-2026-11-27_09-56-41_UTC` 与带注释标签 `backup-2026-11-27_09-56-41_UTC` 的目标均核验为 `a3e5a940fc59eef8528e082ac60899763d947c7a`。
- 变更涉及 tech-interactions.js、tech-hud.js、tech.css、首页四语公告和 18 页资源版本。支持方向键、B 返回上级、最近资源、查询高亮、清除筛选和可分享的分类/搜索链接，保留其他查询参数。卡片加入切角、悬停倾斜、扫光与入场动画，保留减少动态效果支持，切换风格清理监听及标记。
- Chromium 通过现行 tech-theme 回归（18 页、三档宽度），另验证四语言清除筛选、分享链接回显、查询参数保留、高亮、键盘移动、最近访问。未做真实移动设备验证。

- 依用户补充，后续上传包优先保留原设计和实现，仅为现行站点兼容、错误修复和语言适配做必要改动。本轮复核恢复原包 620ms 切角展开关键帧、视口触发范围、屏幕位置顺序和 60ms 分批间隔。四语言公告同步。编辑前远端分支 `backup/pre-change-2026-11-27_10-01-28_UTC` 和注释标签 `backup-2026-11-27_10-01-28_UTC` 均于对应 UTC 时间核验至 `bce2073414e5cf4b8ef7702735b03ad2af44d1e6`。

### 2026-11-27 · 明确上传原包的改动确认要求

- 将用户对原包的定义、保留范围、事前逐项确认和交付核对要求写入第 1 节。本次仅更新交接文档。
- 编辑前备份时间 `2026-11-27_10-07-20_UTC`，已核验远端分支 `backup/pre-change-2026-11-27_10-07-20_UTC` 和注释标签 `backup-2026-11-27_10-07-20_UTC` 指向基线 `6a7d09ca8dd9220e57c01ad7c442e3dc03ac237e`。

### 2026-11-27 · 恢复本次上传包首次部署前的网站

用户要求先撤回以该上传包为基础的两次网站改动，再按现行原包确认规则重新部署。以新提交将 18 个页面、scripts/app.js、scripts/tech-hud.js、scripts/tech-interactions.js、styles/tech.css 逐文件恢复到 `a3e5a940fc59eef8528e082ac60899763d947c7a`。已核对 22 个网站文件与目标版本完全一致。上次接入和回滚的记录、现行交接规则及备份全部保留。重新接入待用户确认相对原包的差异。

编辑前备份 UTC 时间 `2026-11-27_10-08-56_UTC`，分支 `backup/pre-change-2026-11-27_10-08-56_UTC` 和注释标签 `backup-2026-11-27_10-08-56_UTC` 均已核验至 `13837e266df46f81c144024e65455679b6be283f`。

### 2026-11-27 · 从上传原包接入默认 JY//OS，八套主题共享交互

- 18 页统一引用 scripts/tech.js 与 styles/tech.css，保留现有资源目录、头像工坊、各主题偏好和四语言。命令面板、最近访问、快捷键、平台选择、筛选和阅读进度按页面控件启用。其他主题沿用各自的色彩、控件和反馈；JY//OS 保留原包切角、倾斜、扫光、分批入场及状态面板。
- 修正 T 键读错明暗设置，以及保存筛选时删除无关网址参数；现有资源库提供搜索记录读写，更新回归检查以验证切出 JY//OS 后共享交互仍可用。
- 首轮备份时间为 2026-11-27 10:15:38 UTC，分支 `backup/pre-change-2026-11-27_10-15-38_UTC`、注释标签 `backup-2026-11-27_10-15-38_UTC` 指向 `bd46fc8b4751ede92616c6baa9cd09753fddb4f0`。跨主题适配前包含未提交文件的完整备份时间为 2026-11-27 10:21:58 UTC，分支 `backup/pre-change-2026-11-27_10-21-58_UTC`、注释标签 `backup-2026-11-27_10-21-58_UTC` 均核验至 `ff10febb4cc2842a11ec4f9360f3bdd88a124332`。
- 本地 Chromium 验证 18 页三档宽度和主题切换；八套主题逐一验证面板搜索、T 键三档循环、筛选保留额外参数、下载页数字键。原包卡片视觉与动画 CSS 区段逐字节一致；未做真机验证。

### 2026-11-27 · 复核原包维护约定

补充第 1 节的变更判断、默认主题与跨主题适配范围，以及交付说明。复核了 18 个正式页面的脚本入口及原包卡片视觉与动画 CSS 区段。仅更新交接文档。编辑前备份 UTC 时间 `2026-11-27_10-26-22_UTC`，远端分支 `backup/pre-change-2026-11-27_10-26-22_UTC` 与注释标签 `backup-2026-11-27_10-26-22_UTC` 已核验至 `6cbd1b45160ff8f2adef5c3e58db6aaaf08a3ceb`。

### 2026-11-27 · 恢复其他七套主题的原生搜索和选中样式

- 首页沿用各主题原有搜索按钮打开共享命令面板。分类与视图保留原主题选中背景、文字、阴影、字重和圆角，滑动提示使用当前主题色。修改 tech.css、18 页缓存引用及首页四语公告。
- 编辑前备份于 2026-11-27 10:30:01 UTC，远端分支 `backup/pre-change-2026-11-27_10-30-01_UTC` 与注释标签 `backup-2026-11-27_10-30-01_UTC` 已核验至 `283a90a784503ffdfa9a57ef00c7bb95824730c9`。
- Chromium 逐一检查七套主题：首页原按钮打开命令面板，分类和视图选中控件的五项计算样式与禁用 tech.css 的对照一致。JY//OS 现行 18 页、三档宽度回归通过。移动端布局验证使用模拟视口。

### 2026-11-27 · 收藏入口补记最近访问

- 复现：在首页收藏头像工坊，用 Enter 从“我的常用”打开，跳转成功但最近访问没有写入。scripts/tech.js 的选择器匹配了错误的链接类名。改为识别实际收藏链接并取收藏条目 ID，沿用已有的访问去重和排序逻辑。
- 已同步首页四语言公告、18 页脚本缓存版本，并在 tests/tech-theme.cjs 加入收藏及打开收藏的回归断言。八套主题逐一验证收藏本身不记为访问、键盘打开后写入记录、命令面板显示最近访问分组及唯一对应链接；现行 18 页、三档宽度 Chromium 回归通过。本轮未进行真机验证。
- 编辑前完整备份 UTC 时间 `2026-11-27_10-43-23_UTC`，分支 `backup/pre-change-2026-11-27_10-43-23_UTC` 和注释标签 `backup-2026-11-27_10-43-23_UTC` 已核验至 `3357226a0dd697192cc703624a59258463e78453`。
