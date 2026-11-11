/* Shared resource index. home entries feed the home library; child entries mirror
   existing hub cards for favorites and quick search. Update all four languages
   here when changing a matching hub card; tests/library-experience.cjs checks parity.
   source describes the destination, never an endorsement of an internal hub. */
window.JYCatalog = [
  {
    "id": "mdn",
    "category": "development",
    "url": "https://developer.mozilla.org/zh-CN/",
    "domain": "developer.mozilla.org",
    "glyph": "</>",
    "x": "78%",
    "y": "20%",
    "content": {
      "zh-CN": [
        "MDN Web Docs",
        "完整可靠的 Web 技术文档，适合查询 HTML、CSS 与 JavaScript。"
      ],
      "zh-TW": [
        "MDN Web Docs",
        "完整可靠的 Web 技術文件，適合查詢 HTML、CSS 與 JavaScript。"
      ],
      "en": [
        "MDN Web Docs",
        "Reliable web documentation for HTML, CSS, JavaScript, and browser APIs."
      ],
      "ja": [
        "MDN Web Docs",
        "HTML、CSS、JavaScript、ブラウザー API の信頼できる技術資料。"
      ]
    },
    "home": true,
    "source": "official",
    "platforms": [
      "web"
    ],
    "aliases": [
      "MDN",
      "Mozilla",
      "HTML",
      "CSS",
      "JavaScript"
    ]
  },
  {
    "id": "github",
    "category": "development",
    "url": "https://github.com/",
    "domain": "github.com",
    "glyph": "{ }",
    "x": "24%",
    "y": "18%",
    "content": {
      "zh-CN": [
        "GitHub",
        "托管代码、管理项目并探索全球开发者的开源作品。"
      ],
      "zh-TW": [
        "GitHub",
        "託管程式碼、管理專案並探索全球開發者的開源作品。"
      ],
      "en": [
        "GitHub",
        "Host code, manage projects, and explore open-source work from developers worldwide."
      ],
      "ja": [
        "GitHub",
        "コードのホスティング、プロジェクト管理、オープンソース探索の定番。"
      ]
    },
    "home": true,
    "source": "official",
    "platforms": [
      "web"
    ],
    "aliases": [
      "GitHub",
      "git",
      "开源",
      "開源"
    ]
  },
  {
    "id": "apple-dev",
    "category": "development",
    "url": "https://developer.apple.com/",
    "domain": "developer.apple.com",
    "glyph": "⌘",
    "x": "72%",
    "y": "78%",
    "content": {
      "zh-CN": [
        "Apple Developer",
        "Apple 平台的设计规范、开发文档、示例代码与工具入口。"
      ],
      "zh-TW": [
        "Apple Developer",
        "Apple 平台的設計規範、開發文件、範例程式碼與工具入口。"
      ],
      "en": [
        "Apple Developer",
        "Design guidance, documentation, sample code, and tools for Apple platforms."
      ],
      "ja": [
        "Apple Developer",
        "Apple プラットフォーム向けの設計指針、資料、サンプル、ツール。"
      ]
    },
    "home": true,
    "source": "official",
    "platforms": [
      "web"
    ],
    "aliases": [
      "Apple",
      "iOS",
      "macOS",
      "苹果开发",
      "蘋果開發"
    ]
  },
  {
    "id": "freecodecamp",
    "category": "learning",
    "url": "https://www.freecodecamp.org/chinese/",
    "domain": "freecodecamp.org",
    "glyph": "01",
    "x": "18%",
    "y": "72%",
    "content": {
      "zh-CN": [
        "freeCodeCamp",
        "通过课程和实践项目免费学习编程与 Web 开发。"
      ],
      "zh-TW": [
        "freeCodeCamp",
        "透過課程和實作專案免費學習程式設計與 Web 開發。"
      ],
      "en": [
        "freeCodeCamp",
        "Learn programming and web development through free lessons and practical projects."
      ],
      "ja": [
        "freeCodeCamp",
        "無料のレッスンと実践プロジェクトでプログラミングを学べます。"
      ]
    },
    "home": true,
    "source": "official",
    "platforms": [
      "web"
    ],
    "aliases": [
      "freeCodeCamp",
      "编程",
      "程式設計"
    ]
  },
  {
    "id": "jlpt",
    "category": "learning",
    "url": "https://www.jlpt.jp/cn/",
    "domain": "jlpt.jp",
    "glyph": "あ",
    "x": "82%",
    "y": "24%",
    "content": {
      "zh-CN": [
        "JLPT",
        "日语能力考试官方信息、考试安排和练习样题。"
      ],
      "zh-TW": [
        "JLPT",
        "日語能力考試官方資訊、考試安排和練習題。"
      ],
      "en": [
        "JLPT",
        "Official test information, schedules, and sample questions for Japanese learners."
      ],
      "ja": [
        "JLPT",
        "日本語能力試験の公式情報、日程、問題例を確認できます。"
      ]
    },
    "home": true,
    "source": "official",
    "platforms": [
      "web"
    ],
    "aliases": [
      "JLPT",
      "日语考试",
      "日語考試",
      "日本語能力試験"
    ]
  },
  {
    "id": "jisho",
    "category": "tools",
    "url": "https://jisho.org/",
    "domain": "jisho.org",
    "glyph": "辞",
    "x": "20%",
    "y": "22%",
    "content": {
      "zh-CN": [
        "Jisho",
        "简洁好用的日英词典，支持汉字、例句与多种检索方式。"
      ],
      "zh-TW": [
        "Jisho",
        "簡潔好用的日英辭典，支援漢字、例句與多種檢索方式。"
      ],
      "en": [
        "Jisho",
        "A fast Japanese–English dictionary with kanji, examples, and flexible search."
      ],
      "ja": [
        "Jisho",
        "漢字、例文、多彩な検索に対応した使いやすい日英辞書。"
      ]
    },
    "home": true,
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "Jisho",
      "辞书",
      "辭典",
      "词典",
      "辞書"
    ]
  },
  {
    "id": "caniuse",
    "category": "tools",
    "url": "https://caniuse.com/",
    "domain": "caniuse.com",
    "glyph": "✓",
    "x": "76%",
    "y": "76%",
    "content": {
      "zh-CN": [
        "Can I use",
        "快速查看 Web 功能在不同浏览器和版本中的兼容情况。"
      ],
      "zh-TW": [
        "Can I use",
        "快速查看 Web 功能在不同瀏覽器和版本中的相容情況。"
      ],
      "en": [
        "Can I use",
        "Check browser support for web features across versions and platforms."
      ],
      "ja": [
        "Can I use",
        "Web 機能のブラウザー・バージョン別対応状況をすぐ確認できます。"
      ]
    },
    "home": true,
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "Can I use",
      "caniuse",
      "浏览器兼容",
      "瀏覽器相容"
    ]
  },
  {
    "id": "computer",
    "category": "tools",
    "url": "/computer-tools.html",
    "domain": "jiyouyang.github.io/computer-tools",
    "glyph": "PC",
    "x": "78%",
    "y": "22%",
    "internal": true,
    "content": {
      "zh-CN": [
        "电脑工具",
        "进入电脑工具专区，查看 Chrome、Python、Steam、图吧工具箱、IDM、IDM_Cracker、Watt 工具箱、v2rayN、海盗船 BT 下载和 Nyaa BT 下载。"
      ],
      "zh-TW": [
        "電腦工具",
        "進入電腦工具專區，查看 Chrome、Python、Steam、圖吧工具箱、IDM、IDM_Cracker、Watt 工具箱、v2rayN、海盜船 BT 下載和 Nyaa BT 下載。"
      ],
      "en": [
        "PC Tools",
        "Open the PC Tools hub for Chrome, Python, Steam, Tuba Toolbox, IDM, IDM_Cracker, Watt Toolkit, v2rayN, The Pirate Bay, and Nyaa."
      ],
      "ja": [
        "PC ツール",
        "PC ツールのページで Chrome、Python、Steam、図吧ツールボックス、IDM、IDM_Cracker、Watt Toolkit、v2rayN、The Pirate Bay、Nyaa を確認できます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "desktop"
    ],
    "aliases": [
      "电脑工具",
      "電腦工具",
      "PC tools",
      "Chrome",
      "Python",
      "Steam",
      "图吧",
      "IDM",
      "Watt",
      "v2rayN"
    ]
  },
  {
    "id": "steamdb",
    "category": "games",
    "url": "https://steamdb.info/",
    "domain": "steamdb.info",
    "glyph": "DB",
    "x": "22%",
    "y": "80%",
    "content": {
      "zh-CN": [
        "SteamDB",
        "查询 Steam 游戏价格、更新记录、在线人数与历史数据。"
      ],
      "zh-TW": [
        "SteamDB",
        "查詢 Steam 遊戲價格、更新記錄、線上人數與歷史資料。"
      ],
      "en": [
        "SteamDB",
        "Explore Steam pricing, update history, player counts, and historical data."
      ],
      "ja": [
        "SteamDB",
        "Steam の価格、更新履歴、プレイヤー数、過去データを確認できます。"
      ]
    },
    "home": true,
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "SteamDB",
      "Steam",
      "游戏价格",
      "遊戲價格"
    ]
  },
  {
    "id": "minecraft",
    "category": "games",
    "url": "/minecraft.html",
    "domain": "jiyouyang.github.io/minecraft",
    "glyph": "MC",
    "x": "78%",
    "y": "22%",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft",
        "进入 Minecraft 专区，浏览国服与基岩版下载、Java 版模组、启动器等内容。"
      ],
      "zh-TW": [
        "Minecraft",
        "進入 Minecraft 專區，瀏覽中國版與基岩版下載、Java 版模組、啟動器等內容。"
      ],
      "en": [
        "Minecraft",
        "Explore Minecraft China and Bedrock downloads, Java mods, launchers, and more."
      ],
      "ja": [
        "Minecraft",
        "Minecraft 専用ページで、中国版・統合版のダウンロードや Java 版の MOD・ランチャーを探せます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "desktop",
      "android",
      "ios"
    ],
    "aliases": [
      "MC",
      "Minecraft",
      "我的世界",
      "マイクラ"
    ]
  },
  {
    "id": "genshin",
    "category": "games",
    "url": "/genshin.html",
    "domain": "jiyouyang.github.io/genshin",
    "glyph": "GI",
    "x": "24%",
    "y": "24%",
    "internal": true,
    "content": {
      "zh-CN": [
        "原神",
        "进入原神专区，查看多平台下载、国服官网与可用兑换码。"
      ],
      "zh-TW": [
        "原神",
        "進入原神專區，查看多平台下載、國服官網與可用兌換碼。"
      ],
      "en": [
        "Genshin Impact",
        "Find downloads, the mainland China official site, and available redemption codes in the Genshin Impact hub."
      ],
      "ja": [
        "原神",
        "原神専用ページで、ダウンロード、中国版公式サイト、利用可能な交換コードを確認できます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "原神",
      "Genshin",
      "GI"
    ]
  },
  {
    "id": "hsr",
    "category": "games",
    "url": "/hsr.html",
    "domain": "jiyouyang.github.io/hsr",
    "glyph": "HSR",
    "x": "24%",
    "y": "76%",
    "internal": true,
    "content": {
      "zh-CN": [
        "崩坏：星穹铁道",
        "进入崩铁专区，查看国际版多平台下载、国服官网与可用兑换码。"
      ],
      "zh-TW": [
        "崩壞：星穹鐵道",
        "進入星穹鐵道專區，查看國際版多平台下載、國服官網與可用兌換碼。"
      ],
      "en": [
        "Honkai: Star Rail",
        "Find global downloads, the mainland China official site, and available redemption codes in the Honkai: Star Rail hub."
      ],
      "ja": [
        "崩壊：スターレイル",
        "専用ページでグローバル版のダウンロード、中国版公式サイト、利用可能な交換コードを確認できます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "崩铁",
      "崩鐵",
      "星铁",
      "星穹鐵道",
      "Honkai",
      "HSR",
      "スターレイル"
    ]
  },
  {
    "id": "zzz",
    "category": "games",
    "url": "/zzz.html",
    "domain": "jiyouyang.github.io/zzz",
    "glyph": "ZZZ",
    "x": "78%",
    "y": "24%",
    "internal": true,
    "content": {
      "zh-CN": [
        "绝区零",
        "进入绝区零专区，查看国际版多平台下载、国服官网与可用兑换码。"
      ],
      "zh-TW": [
        "絕區零",
        "進入絕區零專區，查看國際版多平台下載、國服官網與可用兌換碼。"
      ],
      "en": [
        "Zenless Zone Zero",
        "Find global downloads, the mainland China official site, and available redemption codes in the Zenless Zone Zero hub."
      ],
      "ja": [
        "ゼンレスゾーンゼロ",
        "専用ページでグローバル版のダウンロード、中国版公式サイト、利用可能な交換コードを確認できます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "绝区零",
      "絕區零",
      "ZZZ",
      "Zenless",
      "ゼンゼロ"
    ]
  },
  {
    "id": "endfield",
    "category": "games",
    "url": "/endfield.html",
    "domain": "jiyouyang.github.io/endfield",
    "glyph": "AE",
    "x": "76%",
    "y": "72%",
    "internal": true,
    "content": {
      "zh-CN": [
        "明日方舟：终末地",
        "进入终末地专区，查看国际版多平台下载、国服官网与兑换码查询。"
      ],
      "zh-TW": [
        "明日方舟：終末地",
        "進入終末地專區，查看國際版多平台下載、國服官網與兌換碼查詢。"
      ],
      "en": [
        "Arknights: Endfield",
        "Find global downloads, the mainland China official site, and redemption codes in the Endfield hub."
      ],
      "ja": [
        "アークナイツ：エンドフィールド",
        "専用ページでグローバル版のダウンロード、中国版公式サイト、交換コードの確認先を探せます。"
      ]
    },
    "home": true,
    "source": "hub",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "终末地",
      "終末地",
      "Endfield",
      "エンドフィールド"
    ]
  },
  {
    "id": "minecraft-card",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-download.html",
    "domain": "jiyouyang.github.io/minecraft-download",
    "glyph": "MC",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft 基岩版下载",
        "支持 Windows 与 Android 双端，选择对应平台前往下载。"
      ],
      "zh-TW": [
        "Minecraft 基岩版下載",
        "支援 Windows 與 Android 雙端，選擇對應平台前往下載。"
      ],
      "en": [
        "Minecraft Bedrock Edition Download",
        "Supports both Windows and Android; choose a platform to continue."
      ],
      "ja": [
        "Minecraft 統合版ダウンロード",
        "Windows と Android の両方に対応しています。プラットフォームを選んで進んでください。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android"
    ],
    "aliases": [
      "基岩版",
      "統合版",
      "Bedrock"
    ]
  },
  {
    "id": "minecraft-mods",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-mods.html",
    "domain": "jiyouyang.github.io/minecraft-mods",
    "glyph": "MOD",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft Java 版模组下载",
        "在 CurseForge 与 Modrinth 中选择模组来源并前往对应网站。"
      ],
      "zh-TW": [
        "Minecraft Java 版模組下載",
        "在 CurseForge 與 Modrinth 中選擇模組來源並前往對應網站。"
      ],
      "en": [
        "Minecraft Java Mods",
        "Choose CurseForge or Modrinth as your mod source and open the matching website."
      ],
      "ja": [
        "Minecraft Java 版 MOD ダウンロード",
        "CurseForge または Modrinth を選び、対応する MOD サイトへ進みます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "java"
    ],
    "aliases": [
      "模组",
      "模組",
      "MOD",
      "CurseForge",
      "Modrinth"
    ]
  },
  {
    "id": "minecraft-launcher",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-launchers.html",
    "domain": "jiyouyang.github.io/minecraft-launchers",
    "glyph": "JAVA",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft Java 版启动器下载",
        "适用于桌面端，可选择官方启动器、PCL 或 HMCL。"
      ],
      "zh-TW": [
        "Minecraft Java 版啟動器下載",
        "適用於桌面端，可選擇官方啟動器、PCL 或 HMCL。"
      ],
      "en": [
        "Minecraft Java Launchers",
        "For desktop use; choose the official launcher, PCL, or HMCL."
      ],
      "ja": [
        "Minecraft Java 版ランチャー",
        "デスクトップ向けです。公式ランチャー、PCL、HMCL から選べます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "desktop"
    ],
    "aliases": [
      "启动器",
      "啟動器",
      "launcher",
      "PCL",
      "HMCL"
    ]
  },
  {
    "id": "minecraft-mobile",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-mobile.html",
    "domain": "jiyouyang.github.io/minecraft-mobile",
    "glyph": "MOB",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft Java 版移动端下载",
        "支持 Android 与 iOS，可选择对应的移动端启动器下载入口。"
      ],
      "zh-TW": [
        "Minecraft Java 版行動端下載",
        "支援 Android 與 iOS，可選擇對應的行動端啟動器下載入口。"
      ],
      "en": [
        "Minecraft Java Mobile Downloads",
        "Supports Android and iOS, with a mobile launcher download option for each platform."
      ],
      "ja": [
        "Minecraft Java 版モバイルダウンロード",
        "Android と iOS に対応し、それぞれのモバイルランチャーを選べます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "android",
      "ios"
    ],
    "aliases": [
      "移动端",
      "行動端",
      "mobile",
      "FCL",
      "Amethyst"
    ]
  },
  {
    "id": "minecraft-seed",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-seed.html",
    "domain": "jiyouyang.github.io/minecraft-seed",
    "glyph": "SEED",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft 种子查询",
        "可输入自己想查的种子号，选择查询网站查看种子地图。"
      ],
      "zh-TW": [
        "Minecraft 種子查詢",
        "可輸入想查詢的種子編號，選擇網站查看種子地圖。"
      ],
      "en": [
        "Minecraft Seed Lookup",
        "Enter the seed number you want to check and choose a site to view its map."
      ],
      "ja": [
        "Minecraft シード検索",
        "調べたいシード値を入力し、サイトを選んでマップを確認できます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "web"
    ],
    "aliases": [
      "种子",
      "種子",
      "seed",
      "Chunkbase"
    ]
  },
  {
    "id": "minecraft-china",
    "parent": "minecraft",
    "category": "games",
    "url": "/minecraft-china.html",
    "domain": "jiyouyang.github.io/minecraft-china",
    "glyph": "CN",
    "internal": true,
    "content": {
      "zh-CN": [
        "Minecraft 国服下载",
        "提供安卓端、电脑端与 iOS 端，选择平台后前往官方页面下载。"
      ],
      "zh-TW": [
        "Minecraft 中國版下載",
        "提供 Android、電腦與 iOS 版本，選擇平台後前往官方頁面下載。"
      ],
      "en": [
        "Minecraft China Downloads",
        "Choose Android, PC, or iOS, then continue to its official download page."
      ],
      "ja": [
        "Minecraft 中国版ダウンロード",
        "Android・PC・iOS から選び、公式ダウンロードページへ進めます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国服",
      "國服",
      "中國版",
      "中国版",
      "China",
      "网易",
      "網易"
    ]
  },
  {
    "id": "genshin-download",
    "parent": "genshin",
    "category": "games",
    "url": "/genshin-download.html",
    "domain": "jiyouyang.github.io/genshin-download",
    "glyph": "GI",
    "internal": true,
    "content": {
      "zh-CN": [
        "原神国际版下载",
        "选择 Android、iOS 或 Windows，再前往对应的下载页面。"
      ],
      "zh-TW": [
        "原神國際版下載",
        "選擇 Android、iOS 或 Windows，再前往對應的下載頁面。"
      ],
      "en": [
        "Genshin Impact Global Download",
        "Choose Android, iOS, or Windows, then open the matching download page."
      ],
      "ja": [
        "原神グローバル版ダウンロード",
        "Android・iOS・Windows から選び、対応するダウンロードページへ進みます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国际版",
      "國際版",
      "global",
      "グローバル",
      "download"
    ]
  },
  {
    "id": "genshin-cn-download",
    "parent": "genshin",
    "category": "games",
    "url": "https://ys.mihoyo.com/main/m/?from_fab=1",
    "domain": "ys.mihoyo.com",
    "glyph": "CN",
    "internal": false,
    "content": {
      "zh-CN": [
        "原神国服下载",
        "直接前往原神国服官网，选择适合设备的版本下载。"
      ],
      "zh-TW": [
        "原神國服下載",
        "直接前往原神國服官網，選擇適合裝置的版本下載。"
      ],
      "en": [
        "Genshin Impact China Download",
        "Go directly to the official mainland China site to choose a download for your device."
      ],
      "ja": [
        "原神中国版ダウンロード",
        "中国本土向けの公式サイトへ直接移動し、端末に合うダウンロードを選べます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国服",
      "國服",
      "China",
      "中国版"
    ]
  },
  {
    "id": "genshin-codes",
    "parent": "genshin",
    "category": "games",
    "url": "https://www.crimsonwitch.com/codes/Genshin_Impact",
    "domain": "www.crimsonwitch.com",
    "glyph": "CDK",
    "internal": false,
    "content": {
      "zh-CN": [
        "原神兑换码",
        "前往兑换码页面，查询当前可用的原神兑换码。"
      ],
      "zh-TW": [
        "原神兌換碼",
        "前往兌換碼頁面，查詢目前可用的原神兌換碼。"
      ],
      "en": [
        "Genshin Impact Codes",
        "Open the codes page to check currently available Genshin Impact redemption codes."
      ],
      "ja": [
        "原神 交換コード",
        "交換コードのページを開き、現在利用できる原神のコードを確認できます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "兑换码",
      "兌換碼",
      "code",
      "CDK",
      "交換コード"
    ]
  },
  {
    "id": "zzz-download",
    "parent": "zzz",
    "category": "games",
    "url": "/zzz-download.html",
    "domain": "jiyouyang.github.io/zzz-download",
    "glyph": "ZZZ",
    "internal": true,
    "content": {
      "zh-CN": [
        "绝区零国际版下载",
        "选择 Android、iOS 或 Windows，再前往对应的下载页面。"
      ],
      "zh-TW": [
        "絕區零國際版下載",
        "選擇 Android、iOS 或 Windows，再前往對應的下載頁面。"
      ],
      "en": [
        "Zenless Zone Zero Global Download",
        "Choose Android, iOS, or Windows, then open the matching download page."
      ],
      "ja": [
        "ゼンレスゾーンゼログローバル版ダウンロード",
        "Android・iOS・Windows から選び、対応するダウンロードページへ進みます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国际版",
      "國際版",
      "global",
      "グローバル",
      "download"
    ]
  },
  {
    "id": "zzz-cn-download",
    "parent": "zzz",
    "category": "games",
    "url": "https://zzz.mihoyo.com/main/",
    "domain": "zzz.mihoyo.com",
    "glyph": "CN",
    "internal": false,
    "content": {
      "zh-CN": [
        "绝区零国服下载",
        "直接前往绝区零国服官网，选择适合设备的版本下载。"
      ],
      "zh-TW": [
        "絕區零國服下載",
        "直接前往絕區零國服官網，選擇適合裝置的版本下載。"
      ],
      "en": [
        "Zenless Zone Zero China Download",
        "Go directly to the official mainland China site to choose a download for your device."
      ],
      "ja": [
        "ゼンレスゾーンゼロ中国版ダウンロード",
        "中国本土向けの公式サイトへ直接移動し、端末に合うダウンロードを選べます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国服",
      "國服",
      "China",
      "中国版"
    ]
  },
  {
    "id": "zzz-codes",
    "parent": "zzz",
    "category": "games",
    "url": "https://www.crimsonwitch.com/codes/Zenless_Zone_Zero",
    "domain": "www.crimsonwitch.com",
    "glyph": "CDK",
    "internal": false,
    "content": {
      "zh-CN": [
        "绝区零兑换码",
        "前往兑换码页面，查询当前可用的绝区零兑换码。"
      ],
      "zh-TW": [
        "絕區零兌換碼",
        "前往兌換碼頁面，查詢目前可用的絕區零兌換碼。"
      ],
      "en": [
        "Zenless Zone Zero Codes",
        "Open the codes page to check currently available Zenless Zone Zero redemption codes."
      ],
      "ja": [
        "ゼンレスゾーンゼロ 交換コード",
        "交換コードのページを開き、現在利用できるゼンレスゾーンゼロのコードを確認できます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "兑换码",
      "兌換碼",
      "code",
      "CDK",
      "交換コード"
    ]
  },
  {
    "id": "hsr-download",
    "parent": "hsr",
    "category": "games",
    "url": "/hsr-download.html",
    "domain": "jiyouyang.github.io/hsr-download",
    "glyph": "HSR",
    "internal": true,
    "content": {
      "zh-CN": [
        "崩坏：星穹铁道国际版下载",
        "选择 Android、iOS 或 Windows，再前往对应的下载页面。"
      ],
      "zh-TW": [
        "崩壞：星穹鐵道國際版下載",
        "選擇 Android、iOS 或 Windows，再前往對應的下載頁面。"
      ],
      "en": [
        "Honkai: Star Rail Global Download",
        "Choose Android, iOS, or Windows, then open the matching download page."
      ],
      "ja": [
        "崩壊：スターレイルグローバル版ダウンロード",
        "Android・iOS・Windows から選び、対応するダウンロードページへ進みます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国际版",
      "國際版",
      "global",
      "グローバル",
      "download"
    ]
  },
  {
    "id": "hsr-cn-download",
    "parent": "hsr",
    "category": "games",
    "url": "https://sr.mihoyo.com/",
    "domain": "sr.mihoyo.com",
    "glyph": "CN",
    "internal": false,
    "content": {
      "zh-CN": [
        "崩坏：星穹铁道国服下载",
        "直接前往崩坏：星穹铁道国服官网，选择适合设备的版本下载。"
      ],
      "zh-TW": [
        "崩壞：星穹鐵道國服下載",
        "直接前往崩壞：星穹鐵道國服官網，選擇適合裝置的版本下載。"
      ],
      "en": [
        "Honkai: Star Rail China Download",
        "Go directly to the official mainland China site to choose a download for your device."
      ],
      "ja": [
        "崩壊：スターレイル中国版ダウンロード",
        "中国本土向けの公式サイトへ直接移動し、端末に合うダウンロードを選べます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国服",
      "國服",
      "China",
      "中国版"
    ]
  },
  {
    "id": "hsr-codes",
    "parent": "hsr",
    "category": "games",
    "url": "https://www.crimsonwitch.com/codes/Honkai_Star_Rail",
    "domain": "www.crimsonwitch.com",
    "glyph": "CDK",
    "internal": false,
    "content": {
      "zh-CN": [
        "崩坏：星穹铁道兑换码",
        "前往兑换码页面，查询当前可用的崩坏：星穹铁道兑换码。"
      ],
      "zh-TW": [
        "崩壞：星穹鐵道兌換碼",
        "前往兌換碼頁面，查詢目前可用的崩壞：星穹鐵道兌換碼。"
      ],
      "en": [
        "Honkai: Star Rail Codes",
        "Open the codes page to check currently available Honkai: Star Rail redemption codes."
      ],
      "ja": [
        "崩壊：スターレイル 交換コード",
        "交換コードのページを開き、現在利用できる崩壊：スターレイルのコードを確認できます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "兑换码",
      "兌換碼",
      "code",
      "CDK",
      "交換コード"
    ]
  },
  {
    "id": "endfield-download",
    "parent": "endfield",
    "category": "games",
    "url": "/endfield-download.html",
    "domain": "jiyouyang.github.io/endfield-download",
    "glyph": "AE",
    "internal": true,
    "content": {
      "zh-CN": [
        "明日方舟：终末地国际版下载",
        "选择 Android、iOS 或 Windows，再前往对应的下载页面。"
      ],
      "zh-TW": [
        "明日方舟：終末地國際版下載",
        "選擇 Android、iOS 或 Windows，再前往對應的下載頁面。"
      ],
      "en": [
        "Arknights: Endfield Global Download",
        "Choose Android, iOS, or Windows, then open the matching download page."
      ],
      "ja": [
        "アークナイツ：エンドフィールドグローバル版ダウンロード",
        "Android・iOS・Windows から選び、対応するダウンロードページへ進みます。"
      ]
    },
    "source": "selection",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国际版",
      "國際版",
      "global",
      "グローバル",
      "download"
    ]
  },
  {
    "id": "endfield-cn-download",
    "parent": "endfield",
    "category": "games",
    "url": "https://endfield.hypergryph.com/",
    "domain": "endfield.hypergryph.com",
    "glyph": "CN",
    "internal": false,
    "content": {
      "zh-CN": [
        "明日方舟：终末地国服下载",
        "直接前往明日方舟：终末地国服官网，选择适合设备的版本下载。"
      ],
      "zh-TW": [
        "明日方舟：終末地國服下載",
        "直接前往明日方舟：終末地國服官網，選擇適合裝置的版本下載。"
      ],
      "en": [
        "Arknights: Endfield China Download",
        "Go directly to the official mainland China site to choose a download for your device."
      ],
      "ja": [
        "アークナイツ：エンドフィールド中国版ダウンロード",
        "中国本土向けの公式サイトへ直接移動し、端末に合うダウンロードを選べます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "android",
      "ios"
    ],
    "aliases": [
      "国服",
      "國服",
      "China",
      "中国版"
    ]
  },
  {
    "id": "endfield-codes",
    "parent": "endfield",
    "category": "games",
    "url": "https://www.redeem-code-tracker.com/games/arknights-endfield",
    "domain": "www.redeem-code-tracker.com",
    "glyph": "CDK",
    "internal": false,
    "content": {
      "zh-CN": [
        "明日方舟：终末地兑换码",
        "前往兑换码页面，查询当前可用的明日方舟：终末地兑换码。"
      ],
      "zh-TW": [
        "明日方舟：終末地兌換碼",
        "前往兌換碼頁面，查詢目前可用的明日方舟：終末地兌換碼。"
      ],
      "en": [
        "Arknights: Endfield Codes",
        "Open the codes page to check currently available Arknights: Endfield redemption codes."
      ],
      "ja": [
        "アークナイツ：エンドフィールド 交換コード",
        "交換コードのページを開き、現在利用できるアークナイツ：エンドフィールドのコードを確認できます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "兑换码",
      "兌換碼",
      "code",
      "CDK",
      "交換コード"
    ]
  },
  {
    "id": "computer-tools-chrome",
    "parent": "computer",
    "category": "tools",
    "url": "https://www.google.com/chrome/",
    "domain": "www.google.com",
    "glyph": "C",
    "internal": false,
    "content": {
      "zh-CN": [
        "Google Chrome",
        "前往 Google 官方页面，下载适合电脑的 Chrome 浏览器。"
      ],
      "zh-TW": [
        "Google Chrome",
        "前往 Google 官方頁面，下載適合電腦的 Chrome 瀏覽器。"
      ],
      "en": [
        "Google Chrome",
        "Get the Chrome browser for your computer from Google’s official page."
      ],
      "ja": [
        "Google Chrome",
        "Google 公式ページからパソコン用 Chrome ブラウザーをダウンロード。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "macos",
      "linux",
      "android",
      "ios"
    ],
    "aliases": [
      "Chrome",
      "谷歌浏览器",
      "Google"
    ]
  },
  {
    "id": "computer-tools-python",
    "parent": "computer",
    "category": "tools",
    "url": "https://www.python.org/downloads/",
    "domain": "www.python.org",
    "glyph": "PY",
    "internal": false,
    "content": {
      "zh-CN": [
        "Python",
        "前往 Python 官方下载页，选择适合电脑系统的版本。"
      ],
      "zh-TW": [
        "Python",
        "前往 Python 官方下載頁，選擇適合電腦系統的版本。"
      ],
      "en": [
        "Python",
        "Visit Python’s official download page to choose a version for your computer."
      ],
      "ja": [
        "Python",
        "Python の公式ダウンロードページで、パソコンに合うバージョンを選べます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "aliases": [
      "Python"
    ]
  },
  {
    "id": "computer-tools-steam",
    "parent": "computer",
    "category": "tools",
    "url": "https://store.steampowered.com/",
    "domain": "store.steampowered.com",
    "glyph": "ST",
    "internal": false,
    "content": {
      "zh-CN": [
        "Steam",
        "前往 Steam 官方网站，浏览游戏或获取客户端。"
      ],
      "zh-TW": [
        "Steam",
        "前往 Steam 官方網站，瀏覽遊戲或取得用戶端。"
      ],
      "en": [
        "Steam",
        "Visit the official Steam site to browse games or get the desktop client."
      ],
      "ja": [
        "Steam",
        "Steam の公式サイトでゲームを探し、PC クライアントを入手できます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "aliases": [
      "Steam"
    ]
  },
  {
    "id": "computer-tools-tbtool",
    "parent": "computer",
    "category": "tools",
    "url": "https://www.tbtool.cn/download/index.html",
    "domain": "www.tbtool.cn",
    "glyph": "TB",
    "internal": false,
    "content": {
      "zh-CN": [
        "图吧工具箱",
        "前往图吧工具箱官方下载页，获取硬件检测与测试工具合集。"
      ],
      "zh-TW": [
        "圖吧工具箱",
        "前往圖吧工具箱官方下載頁，取得硬體檢測與測試工具合集。"
      ],
      "en": [
        "Tuba Toolbox",
        "Get this hardware diagnostics toolkit from its official download page."
      ],
      "ja": [
        "図吧ツールボックス",
        "公式ダウンロードページからハードウェア診断ツール集を入手できます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows"
    ],
    "aliases": [
      "图吧工具箱",
      "圖吧工具箱",
      "Tuba"
    ]
  },
  {
    "id": "computer-tools-idm",
    "parent": "computer",
    "category": "tools",
    "url": "https://www.internetdownloadmanager.com/",
    "domain": "www.internetdownloadmanager.com",
    "glyph": "IDM",
    "internal": false,
    "content": {
      "zh-CN": [
        "IDM 下载器",
        "前往 Internet Download Manager 官网，了解功能并获取 Windows 试用版。"
      ],
      "zh-TW": [
        "IDM 下載器",
        "前往 Internet Download Manager 官網，了解功能並取得 Windows 試用版。"
      ],
      "en": [
        "Internet Download Manager (IDM)",
        "Visit the official site to explore IDM and download the Windows trial."
      ],
      "ja": [
        "Internet Download Manager (IDM)",
        "公式サイトで機能を確認し、Windows 向け試用版をダウンロードできます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows"
    ],
    "aliases": [
      "IDM",
      "Internet Download Manager"
    ]
  },
  {
    "id": "computer-tools-idm-cracker",
    "parent": "computer",
    "category": "tools",
    "url": "https://github.com/YuHuanTin/IDM_Cracker",
    "domain": "github.com",
    "glyph": "IC",
    "internal": false,
    "content": {
      "zh-CN": [
        "IDM_Cracker",
        "前往 YuHuanTin 的 IDM_Cracker GitHub 仓库。"
      ],
      "zh-TW": [
        "IDM_Cracker",
        "前往 YuHuanTin 的 IDM_Cracker GitHub 儲存庫。"
      ],
      "en": [
        "IDM_Cracker",
        "Open YuHuanTin’s IDM_Cracker repository on GitHub."
      ],
      "ja": [
        "IDM_Cracker",
        "YuHuanTin の IDM_Cracker GitHub リポジトリを開きます。"
      ]
    },
    "source": "project",
    "platforms": [
      "windows"
    ],
    "aliases": [
      "IDM_Cracker"
    ]
  },
  {
    "id": "computer-tools-watt",
    "parent": "computer",
    "category": "tools",
    "url": "https://steampp.net/",
    "domain": "steampp.net",
    "glyph": "WT",
    "internal": false,
    "content": {
      "zh-CN": [
        "Watt 工具箱",
        "前往 Watt Toolkit（原 Steam++）官网，了解并获取跨平台 Steam 工具箱。"
      ],
      "zh-TW": [
        "Watt 工具箱",
        "前往 Watt Toolkit（原 Steam++）官網，了解並取得跨平台 Steam 工具箱。"
      ],
      "en": [
        "Watt Toolkit",
        "Visit the official site for Watt Toolkit, formerly Steam++, a cross-platform Steam toolkit."
      ],
      "ja": [
        "Watt Toolkit",
        "Steam++ から改名した Watt Toolkit の公式サイトを開きます。"
      ]
    },
    "source": "official",
    "platforms": [
      "desktop"
    ],
    "aliases": [
      "Watt",
      "Steam++",
      "SteamTools"
    ]
  },
  {
    "id": "computer-tools-v2rayn",
    "parent": "computer",
    "category": "tools",
    "url": "https://v2rayn.2dust.link/",
    "domain": "v2rayn.2dust.link",
    "glyph": "V2",
    "internal": false,
    "content": {
      "zh-CN": [
        "v2rayN",
        "前往项目维护者列出的 v2rayN 官方主页，查看适合电脑的版本。"
      ],
      "zh-TW": [
        "v2rayN",
        "前往專案維護者列出的 v2rayN 官方主頁，查看適合電腦的版本。"
      ],
      "en": [
        "v2rayN",
        "Open the v2rayN homepage listed by its maintainers to find a desktop version."
      ],
      "ja": [
        "v2rayN",
        "開発者が案内する v2rayN の公式ページで、PC 向けの配布ファイルを確認できます。"
      ]
    },
    "source": "official",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "aliases": [
      "v2rayN"
    ]
  },
  {
    "id": "computer-tools-pirate",
    "parent": "computer",
    "category": "tools",
    "url": "https://thepiratebay.org/",
    "domain": "thepiratebay.org",
    "glyph": "PB",
    "internal": false,
    "content": {
      "zh-CN": [
        "海盗船 BT 下载",
        "前往 The Pirate Bay 原站，浏览 BT 种子与磁力链接。"
      ],
      "zh-TW": [
        "海盜船 BT 下載",
        "前往 The Pirate Bay 原站，瀏覽 BT 種子與磁力連結。"
      ],
      "en": [
        "The Pirate Bay",
        "Open The Pirate Bay's original domain to browse torrents and magnet links."
      ],
      "ja": [
        "The Pirate Bay",
        "The Pirate Bay の元のドメインで Torrent やマグネットリンクを探せます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "The Pirate Bay",
      "海盗船",
      "海盜船",
      "海盗湾",
      "BT"
    ]
  },
  {
    "id": "computer-tools-nyaa",
    "parent": "computer",
    "category": "tools",
    "url": "https://nyaa.si/",
    "domain": "nyaa.si",
    "glyph": "NY",
    "internal": false,
    "content": {
      "zh-CN": [
        "Nyaa BT 下载",
        "前往 Nyaa 原站，浏览动漫等资源的 BT 种子。"
      ],
      "zh-TW": [
        "Nyaa BT 下載",
        "前往 Nyaa 原站，瀏覽動漫等資源的 BT 種子。"
      ],
      "en": [
        "Nyaa",
        "Open Nyaa's original domain to browse anime and other torrents."
      ],
      "ja": [
        "Nyaa",
        "Nyaa の元のドメインでアニメなどの Torrent を探せます。"
      ]
    },
    "source": "thirdparty",
    "platforms": [
      "web"
    ],
    "aliases": [
      "Nyaa",
      "BT"
    ]
  }
];

