# CODEX 项目交接文档

> 最后更新：2026-10-11  
> 当前仓库：`Jiyouyang/Jiyouyang.github.io`  
> 当前分支：`main`  
> 线上地址：https://jiyouyang.github.io/

## 维护约定（后续 Codex 必读）

这是本项目的持续交接文档。今后每次完成用户提出的功能、文案、翻译、视觉、交互、链接或部署调整时，必须在同一次提交中同步更新本文件，至少记录：需求、实现、涉及文件、验证结果、遗留问题和新决策。不要只修改代码而遗漏交接文档。

开始新任务前应先阅读本文件，再检查线上分支是否有更新；不要依据聊天记忆覆盖仓库中的较新内容。完成后应进行与改动风险相称的验证，并发布到 `main`（除非用户明确要求只在本地保存）。

## 1. 项目目标与当前定位

本站已经从最初的个人博客/资源混合页面，收敛为一个简洁的“资源分享站”。博客入口与博客内容已移除，首页只保留资源发现和筛选功能。Minecraft 被提升为资源库中的第一个重点入口，并拥有独立的站内内容专区，方便未来继续增加 Minecraft 相关入口。

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
- 点击顶部搜索按钮会平滑滚动到资源搜索栏并主动聚焦输入框，以唤起系统键盘。
- 分类：全部、开发、学习、工具、游戏。
- 资源支持按标题、简介、域名和分类即时检索。
- Minecraft 资源卡片位于资源列表第一位，并进入站内 `/minecraft.html`。

首页当前资源数据在 `app.js` 的 `resources` 数组中，包括 Minecraft、MDN、GitHub、Apple Developer、freeCodeCamp、JLPT、Jisho、Can I Use、SteamDB 等。

### Minecraft 专区 `/minecraft.html`

这是 Minecraft 的“大选项”/内容聚合页。当前包含四张站内卡片：

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

专区的目的不是只放一个下载卡片，而是作为可持续扩充的 Minecraft 内容容器；以后用户还会加入更多 Minecraft 相关跳转选项。

### 基岩版下载页 `/minecraft-download.html`

- 页面名称：Minecraft 基岩版（已删除此前所有“国际”字样）。
- Windows 与 Android 是页内选项卡。
- **点击选项卡只能切换卡片内容，绝对不能跳转外部网站。**
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

主页中的“原神”入口紧随 Minecraft，进入独立原神专区。当前已加入一张站内卡片：

- **原神国际版下载** → `/genshin-download.html`
- 卡片、专区与下载页沿用黑白基调、五种主题色、深浅模式及四语言。
- 今后可以继续加入其他原神资源卡片。

### 原神国际版下载页 `/genshin-download.html`

- 平台页签从左到右为 Android、iOS。页签只切换展示内容，不导航到外部网站。
- Android 有两个同等重要、同样视觉权重的下载按钮：
  - Google Play 官方下载：<https://play.google.com/store/apps/details/Genshin_Impact?id=com.miHoYo.GenshinImpact&hl=en_NZ&pli=1>
  - APK 下载：<https://genshin-impact.cn.uptodown.com/android/dw/1218436799-x>
- Android 简介明确写有“如无法打开，请使用科学上网”。
- iOS 下载按钮前往：<https://apps.apple.com/us/app/genshin-impact-6th-anniversary/id1517783697>
- iOS 简介明确写有“请使用非中国大陆地区 Apple 账号”。
- 只有下载按钮打开外链。APK 地址由用户指定，可能指向特定版本；以后改版本时要检查地址是否仍有效。

## 3. 视觉与设计系统

### 基调

- 从早期蓝紫渐变改为 Apple 风格黑白/石墨基调。
- 浅色背景接近 `#f5f5f7`，深色背景为黑色；表面、描边和文字使用 Apple 风格中性色阶。
- 默认主题色为石墨，不使用高饱和渐变作为默认视觉。
- 保持大圆角、充足留白、粗体大标题、简短说明和轻阴影。
- 卡片头图为抽象文字/字形构图（如 MC、MOD），不是写实封面图。
- 用户曾要求移除首页 Hero 下方三个装饰图标；不要恢复。

### 液态玻璃

- 导航栏、设置弹窗、分段选择器使用半透明背景、`backdrop-filter: blur(...) saturate(...)`、细亮边和内高光。
- 视觉参考 iOS 高透明液态玻璃，但不能完全复制参考图。
- 滑块/分段控件的活动底板要清楚，文字与背景必须有足够对比度。
- 顶部导航中“资源分享”等居中标签与设置面板应在视觉上融合，不要出现多余的内层纯白底块。

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
| `app.js` | 首页四语言文案、资源数据、搜索/筛选、主题与设置逻辑 |
| `minecraft.html` | Minecraft 聚合页结构与样式 |
| `minecraft-hub.js` | Minecraft 聚合页四语言与共享设置逻辑 |
| `minecraft-download.html` | 基岩版 Windows/Android 下载选择页 |
| `minecraft-download.js` | 基岩版平台数据、按钮链接、多语言和设置逻辑 |
| `minecraft-mods.html` | Java 模组平台选择页 |
| `minecraft-mods.js` | CurseForge/Modrinth 数据、多语言和设置逻辑 |
| `minecraft-launchers.html` | Java 启动器选择页 |
| `minecraft-launchers.js` | 官方/PCL/HMCL 数据、多语言和设置逻辑 |
| `minecraft-mobile.html` | Java 版 Android/iOS 移动端选择页 |
| `minecraft-mobile.js` | Fold Craft Launcher/Amethyst iOS 数据、多语言和设置逻辑 |
| `genshin.html` | 原神内容专区、下载子卡片和设置弹窗 |
| `genshin.js` | 原神专区四语言与主题设置逻辑 |
| `genshin-download.html` | 原神国际版 Android/iOS 下载选择页 |
| `genshin-download.js` | 三个下载链接、平台切换、四语言与设置逻辑 |
| `assets/site-cover.jpg` | favicon、Apple Touch Icon、桌面/PWA 图标 |
| `site.webmanifest` | PWA 名称、颜色、启动方式和图标 |
| `preview.html` | 历史预览文件；不是当前正式入口 |
| `minecraft.js` | 旧版“Minecraft 国际版”实现；当前正式页面不引用，属于遗留文件 |
| `README.md` | 基础项目说明，但部分内容已落后，应以本文件和实际代码为准 |

当前 HTML 通过查询参数给 JS/图标做缓存更新。修改正式 JS 后应同步递增对应 HTML 的 `?v=`，避免 GitHub Pages/Safari 使用旧缓存。

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

1. `README.md` 仍写着“Minecraft 国际版”，并把 `minecraft.js` 描述为正式实现，内容已经落后。
2. 根目录旧文件 `minecraft.js` 仍保留国际版旧文案和旧实现，当前正式页面不引用。后续应确认无历史依赖后删除，或加明显弃用注释。
3. 多个页面复制了大段设置 CSS、弹窗 HTML 和主题/翻译 JS，未来改设计时容易漏改某页。可在不破坏 GitHub Pages 静态部署的前提下抽取共享 CSS/JS。
4. 目前主要验证为静态语法、字符串、链接与线上内容检查；没有完整的多设备视觉回归测试。
5. JPEG favicon 在部分旧浏览器或平台可能不如 PNG/ICO 稳定；目前 Safari/Apple Touch Icon 是用户最关心的场景。
6. 外部下载站可用性受第三方网站及地区网络限制影响，本站无法保证。
7. HMCL 链接固定到 `v3.16.4` release；新版本发布后不会自动更新。
8. 各页面翻译字典独立维护，新增或重命名文案时必须逐页检查四种语言。

## 10. 尚未完成/未来方向

用户明确表示 Minecraft 专区以后还会增加更多 Minecraft 相关跳转选项，但尚未提供下一批具体内容。当前无需创建 Java 游戏本体下载页，也不要把“Java 版启动器下载”误解成 Java 游戏安装包下载。

建议的下一步按优先级排列：

1. 根据用户下一次提供的 Minecraft 内容类型，在 `/minecraft.html` 增加同视觉体系的新卡片和独立站内页。
2. 更新 `README.md`，删除“国际版”旧说明，并准确描述当前四个正式入口。
3. 确认后清理或归档旧 `minecraft.js` 和 `preview.html`，减少误改风险。
4. 抽取共享 `theme.css`、`settings.js`、`i18n` 辅助逻辑，降低多页同步成本。
5. 对 iPhone Safari、Android Chrome 和桌面浏览器进行一次系统视觉/键盘/滚动/深色模式回归。
6. 视用户意愿为 favicon 生成标准多尺寸 PNG/ICO，同时保留原图构图。

## 11. 修改与发布检查清单

每次改动至少检查：

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

