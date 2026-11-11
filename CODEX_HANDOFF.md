# CODEX 项目交接文档

> 更新：2026-11-11 · 仓库：`Jiyouyang/Jiyouyang.github.io` · 分支：`main`
> 网站：https://jiyouyang.github.io/ · 最近网站功能提交：`bef84b020456e3861f5d1ffd771b694f5d776087`（资源库增强）

本文集中保存现行规则、网站现状和维护入口。精简前全文（含全部需求演变、备份 SHA、时间、测试与部署记录）[原样归档](docs/history/CODEX_HANDOFF-2026-11-11-original.md)；[本次全部整理说明](docs/HANDOFF_SIMPLIFICATION.md)。历史方案若已被后续要求取代，只作追溯，不按旧记录恢复网站。

## 1. 强制维护流程

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

### 17 个正式页面

下表脚本路径均位于 `scripts/`；各页仍维护自身基础样式、翻译、设置和弹窗，不能漏改同类页面。

| HTML | 页面职责 | 对应脚本 |
| --- | --- | --- |
| `index.html` | 首页、筛选、精选、公告与设置 | `app.js` |
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
| `scripts/resource-catalog.js` | `window.JYCatalog`：原 14 项首页资源（`home: true`）及 28 项专区镜像；四语言、来源、平台、别名 |
| `scripts/library-experience.js` / `styles/library-experience.css` | 收藏/排序、复制及降级、快捷搜索/历史、紧凑列表、返回状态、标签与按压反馈 |
| `scripts/app.js` | 首页字典、公告时间线、目录筛选、原主题/设置逻辑 |
| `styles/card-controls.css` | 共用卡片图区、下载平台/渠道滑块及几何修复；`20261022-bugfix1` |
| `scripts/site-style.js` / `styles/site-style.css` | 风格设置、偏好/后退恢复、主题预览及终端视觉；`20261023-furina1` |
| `styles/mecha.css` / `styles/blackgold.css` | 科技 / 黑金典藏独立视觉；`20261018-mecha1` / `20261018-blackgold1` |
| `styles/columbina.css` / `styles/furina.css` / `styles/mahiro.css` | 三角色独立视觉；`20261018-columbina1` / `20261023-furina1` / `20261019-mahiro1` |
| `assets/themes/{columbina,furina,mahiro}/` | 原图/同字节备用、来源、版权、哈希记录，各目录 README 不丢失 |
| `assets/fonts/` | Apple 字符后备字体、原许可及来源 |
| `assets/site-cover.jpg` / `site.webmanifest` | 网站/桌面图标与 standalone PWA 信息 |
| `archive/legacy/minecraft.js` / `archive/legacy/preview.html` | 已标记遗留、正式页面不引用；只归档，不擅自删除 |
| `README.md` / `docs/ROLLBACK.md` | 项目入口概览 / 历史备份与网站文件回滚说明 |

17 页均加载共享样式和风格脚本。`site-style.js` 在 `<head>`、正文绘制前恢复风格；底部先加载资源目录，再加载增强脚本，最后原页面脚本。目录、增强 JS/CSS 及首页 `app.js` 当前版本为 `20261111-library1`。改哪个运行文件就同步更新所有引用页的版本，新页面也须接入；不要把过往版本号当当前值。

旧全面升级的 `site.css`、`site.js`、`scripts/verify-ui.cjs` 已回滚移除；现行共享文件不是把那套升级恢复。未经用户再次要求，不自行引回旧共用体系。

## 3. 页面内容与跳转约定

### 首页与资源库

- 品牌 Jiyouyang，固定液态玻璃导航含居中“资源分享”、搜索和齿轮“网站设置”（不再叫“外观”）；搜索与设置留距离，手机两按钮点按区域均为 44px，窄屏设置可只显示齿轮但保留可访问名称。
- 首页 14 项资源：Minecraft、原神、绝区零、崩坏：星穹铁道、明日方舟：终末地、电脑工具、MDN、GitHub、Apple Developer、freeCodeCamp、JLPT、Jisho、Can I use、SteamDB。前六项按此顺序在前，五个游戏入口均进入站内专区；简介反映实际内容，并保留“崩铁”“终末地”等检索词。
- 分类为“全部、开发、学习、工具、游戏”，实际四类；`tools` 已合并电脑工具、Jisho 与 Can I use，不再保留两个同名工具筛选。只把首页分类叫“工具”，不因此改掉“电脑工具”专区/卡片名称，仍可扩展手机工具。
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

- 默认经典为 Apple 黑白/石墨、浅底近 `#f5f5f7`、黑色深底、中性色表面与描边；大圆角、留白、粗标题、短说明、轻阴影，不恢复高饱和渐变。各页保留内嵌基础样式和手机单列结构。
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

设置顺序：风格调整 → 五种主题颜色 → 跟随系统/浅色/深色 → 简中/繁中/English/日本語。七风格预览顺序如下，芙宁娜必须在哥伦比娅与绪山真寻之间；科技只改显示名，内部 `mecha`/文件/键不改，历史名称“机甲”不重写。

| 风格 / 标识 | 首次默认 | 设计与隔离要求 |
| --- | --- | --- |
| 经典 `classic` | 石墨、跟随系统 | 原液态玻璃与圆角留白，无偏好时默认，不被新风格覆盖 |
| 终端 `terminal` | 绿色、深色 | 等宽字、绿黑/浅灰绿、荧光边、琥珀标签、低亮网格、矩形面板 |
| 科技 `mecha` | 橙色、浅色 | 陶瓷白/钛灰、深导航、斜切/机械环/面板接缝；深色蓝灰机舱；第三预览独占行 |
| 黑金典藏 `blackgold` | 橙色档暖金、深色 | 墨黑/象牙白、金线/徽章/内边框、衬线标题与无衬线正文；第四预览独占行，不加图片/字体依赖 |
| 哥伦比娅 `columbina` | 蓝色、浅色 | 月光蓝/珍珠白/蓝紫羽翼/莓红，深色午夜蓝；星月轨道、手机上下/桌面分栏、角色脸部不压字、背景低透明而卡片可读 |
| 芙宁娜 `furina` | 蓝色、深色 | 枫丹蓝金/珍珠白、水纹/珍珠环/礼帽/水滴/舞台框与票券边饰 |
| 绪山真寻 `mahiro` | 紫色、浅色 | 《お兄ちゃんはおしまい！》奶油白/粉紫/薄荷、胶带相片/贴纸/点阵虚线手账；深色柔梅紫 |

全套覆盖首页、公告、精选/资源/专区、下载插图/按钮、搜索、平台/渠道、设置及页脚，支持五色、三档模式、四语言。网站视觉规则限定各自 `data-style`，不改变旧风格、业务内容/链接或滑块尺寸算法；每个风格独立恢复配色/模式，语言通用，不自动切换已有用户设置。预览/新设置不等于恢复旧升级的“外观实时预览/恢复默认”等功能。

经典五色：石墨 `#1d1d1f`、蓝 `#0071e3`、紫 `#7656d6`、绿 `#248a3d`、橙 `#c45100`。主题色通过 CSS 变量/`color-mix()` 同时影响按钮、活动底板、插图、MC/MOD、强调线和背景，不只改按钮；独立风格可映射自身色板。`data-theme`/`data-accent` 驱动变量，跟随系统须实时响应，Safari `theme-color` 跟实际背景更新。

### 角色素材与最新范围

- 哥伦比娅原画 `assets/themes/columbina/character.png`（1024×1024、约 1.7 MB），SHA-256 `94b632023e5daa0e9c5bb535ce0a7b49b48accd54618988248c5dda2548b4ec2`；原图不变。页脚来源为米游社 <https://www.miyoushe.com/ys/article/71350081>，资料参考 <https://baike.mihoyo.com/ys/obc/content/507505/detail>；实际图片仍为本站同源文件，不等于已取得米游社同图 CDN 直链。
- 真寻实际主请求为 Bilibili `i0.hdslb.com` / 堆糖 `c-ssl.dtstatic.com`，本地 `assets/themes/mahiro/` 存同字节 JPEG（约 502 KiB）；芙宁娜实际主请求为 B站 BWIKI `patchwiki.biligame.com`，官方 2024 生日图的本地同字节备用 `assets/themes/furina/artwork.png`（1000×1000、1,746,100 字节），SHA-256 `b5345a4e8f9d73b32dff5bd12477521a578ceb0f758029224ba20a1b2a4dae10`。
- 图片只在选中对应风格时按需创建/请求，离开隐藏，不让无关风格加载。真寻/芙宁娜错误或 8 秒超时用本地同图备用，再失败保留 CSS 装饰；哥伦比娅本地原图失败也保留 CSS 月亮和业务功能。共用加载函数 `createThemeArt` 不因复用更改真寻原请求参数。来源、版权、非官方说明四语言同步，不去水印、不冒充原创/开源/官方授权，不复制参考截图的系统文字、设备信息或字幕。
- **最新用户决定（2026-11-11）：“图片源不用再管了”。不再继续图片源任务，不列为待完成项目，也不能把此前米游社直链未完成说成已完成。** 保留现有图片、来源记录及失败降级；当前环境下载成功不代表中国大陆各运营商均可直连。

### 四语言与存储

所有新增/修改文案同步 `zh-CN`、`zh-TW`、`en`、`ja`，覆盖标题、meta description、简介、按钮、设置、动态卡片、公告及可访问性名称；页面字典配合 `data-i18n` / `data-i18n-html` / `data-i18n-label`，不依赖外部翻译。专区文案更新还要同步共享目录镜像。名称：科技/科技/Technology/テクノロジー；黑金典藏/黑金典藏/Black & Gold/ブラック＆ゴールド；哥伦比娅/哥倫比婭/Columbina/コロンビーナ，不按“哥伦比亚”误拼改角色名。

| 存储键 | 内容与边界 |
| --- | --- |
| `localStorage`：`jy-accent`、`jy-theme`、`jy-language` | 当前色调、外观、全站语言；无偏好默认经典石墨、跟随系统 |
| `jy-style`、`jy-style-{classic,terminal,mecha,blackgold,columbina,furina,mahiro}` | 当前风格及各自 `{accent, theme}`；当前 `jy-accent`/`jy-theme` 始终与之对应 |
| `jy-favorites`、`jy-library-view`、`jy-search-history` | ID/顺序、`cards`/`list`、最多六条已执行搜索；目录校验、去重，仅当前浏览器，不跨设备 |
| `sessionStorage.jy-library-return` | 筛选、搜索词、滚动/锚点；仅后退或专区返回资源库时恢复，最多一天 |

每页 HTML 在绘制前读主题/色调，风格脚本监听语言/模式/颜色并同步内存、存储、按钮、ARIA、标题/描述和 Safari 顶栏；后退缓存恢复读取最新偏好。设置内部程序点击避免冒泡误关；无存储仍可本页使用，正确提示临时模式，不承诺跨页持久化。

## 6. 公告的固定规则

公告在导航下方，左右宽度及收起高度与导航协调（经典手机总高 56px、桌面 62px）；保留原窄摘要，点击展开标题/日期/详情，空列表隐藏。置顶优先并在摘要每 3000ms 垂直轮播，展开同时保留；减少动态效果仍切文字但不播滚动动画。普通更新按日期折叠，标记新增/优化/修复及最新。

保留用户原拼写 `jiyoyang` 的“jiyoyang是Eghver恶魔主人喵”、作者公告和制作公告；制作公告摘要“本站由Jiyouyang & Codex制作”，展开为完整“本站由Jiyouyang & Codex（基于ChatGPT 6Astra & 6Sol)制作”，不要把作者姓名误拆为额外公告。旧 Eghver/旧 jiyouyang 公告的替换删除经过见归档，不根据旧记录擅自恢复。

新增/修改公告必须逐一检查四语言、五色、浅/深/跟随系统的文字、图标、活动态及玻璃对比度，不仅补翻译；同步首页静态回退摘要/日期和脚本缓存。删除/修改公告不再生成“删改公告”的新公告，文档仍随实际网站变更更新。

## 7. 验证入口与已知边界

| 检查 | 用途 |
| --- | --- |
| `node --check scripts/<文件>.js`、`git diff --check` | 语法/差异；另核对所有站内路径、外部目标与资源版本 |
| `node tests/library-experience.cjs <URL>` | 原资源保留、28 项专区四语言镜像、收藏/排序/持久化、别名/历史/返回、动态复制/降级、存储拒绝和七主题布局 |
| `node tests/site-style.cjs <URL> furina` | 17 页、经典对照、五色/三模式/四语言、七主题偏好、搜索/公告/平台与系统主题 |
| `node tests/slider-geometry.cjs <URL> [逗号分隔页面]` | 六旧风格各指示块边界/两端留白、320/390/768/1440、四语言、动画终点/减少动态效果；芙宁娜几何另由 `furina-art.cjs` 覆盖 |
| `node tests/style-isolation.cjs <URL> <Git基线>` | 修改前后旧风格计算样式对照；基线须按此次改动核对，历史 SHA 不盲用 |
| `node tests/columbina-art.cjs <URL>` / `node tests/mahiro-art.cjs <URL>` / `node tests/furina-art.cjs <URL>` | 分别检查角色构图/按需加载/切换隐藏/来源/失败降级；真寻与芙宁娜支持 `--live` 实连核验 |
| `node tests/small-bugfixes.cjs <URL>` | 工具分类合并、九页平台键盘/点击、实际 Apple 后备字形、旧六风格窄屏 |

浏览器脚本需运行中的本地静态服务器、Playwright 与 Chromium，默认 `/usr/bin/chromium`，可用 `CHROMIUM_PATH` 指定。涉及滑块须测实际指示块几何（已有标准误差 <0.12px），不只测页面无横向溢出；真实图片请求与确定性回退分开验证。历史线上浏览器测试只限定信任当前环境代理 CA 的 SPKI，没有关闭全局 TLS 验证。

每次改动至少核对：

- [ ] 编辑前完整备份分支/Tags 已核验；回滚不覆盖维护文档。
- [ ] 四语言、五色对控件及图形的联动、浅/深/跟随系统正确。
- [ ] 平台只切内容、明确外链按钮/直达卡片才导航；链接与站内路径正确。
- [ ] 手机导航、搜索、设置不重叠且易点按；相关主题、滑块、键盘/焦点检查通过。
- [ ] JS 语法、差异、运行资源缓存版本、README/目录/交接记录同步。
- [ ] 推送 `main` 后核验 Pages 实际页面；仅文档任务则核对远端文档及网站未变。

最近资源库功能验收：14 项首页逐字段、28 项专区 × 四语言 = 112 项、29 个平台下载复制、七主题/两模式/四语言/三宽度/两布局共 336 组，及 17 页/300 组主题回归通过；线上部署 `bef84b0` 已成功，17 页资源引用、收藏与布局持久化、搜索/Esc、当前公告及平台复制已核验。更早测试数字、截图、SHA 和局限全部见原文归档，不当作每次都已重跑。

当前无已确认阻断使用错误、无待续的资源库增强。以下为保留风险或未来选择，不是擅自开工清单：

- 真实 iPhone Safari / Android Chrome 的视觉、键盘唤起、滚动、深色和各运营商网络仍需实机；自动浏览器检查不能代替。
- 外链受第三方及地区网络限制；HMCL 固定 `v3.16.4` 不自动更新，原神 APK 固定版本、APKPure 包格式/可用性、图吧官网迁移都需维护时核验。
- JPEG favicon 对旧平台可能不如 PNG/ICO 稳定；是否生成标准多尺寸版本由用户决定，不能换掉原图。
- 页面内字典/设置/弹窗仍分散；增删文案/入口逐页同步四语言、README、首页简介与目录镜像，不误认为旧 `site.js` 已在运行。
- Minecraft 后续入口按用户实际需求加；遗留文件仅归档，删除另评估；图片源按最新要求不再继续。

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
