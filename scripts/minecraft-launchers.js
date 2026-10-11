const i18n = {
  'zh-CN': {
    'meta.title':'Minecraft Java 版启动器下载 · Jiyouyang','meta.description':'Minecraft Java 版官方、PCL 与 HMCL 启动器下载入口。','nav.label':'启动器下载页面导航','nav.back':'返回 Minecraft 专区','nav.title':'Java 启动器','hero.title':'Minecraft Java 版启动器下载','hero.intro':'选择官方启动器、PCL 或 HMCL。<br>选项卡只切换渠道，下方按钮才会打开下载网页。','hero.status':'三个启动器渠道均已接入','platform.title':'选择启动器渠道','platform.subtitle':'点击选项卡查看简介，再使用下方按钮前往对应下载网页。','platform.label':'启动器渠道','tab.official':'官方','tab.pcl':'PCL','tab.hmcl':'HMCL','download.action':'前往下载网页','footer.motto':'把好用的，分享给需要的人。','footer.back':'返回 Minecraft 专区 ↗','settings.open':'打开网站设置','settings.short':'网站设置','settings.title':'外观与语言','settings.close':'关闭设置','settings.color':'主题颜色','settings.mode':'深浅模式','settings.language':'翻译语言','color.graphite':'石墨','color.blue':'蓝色','color.violet':'紫色','color.green':'绿色','color.orange':'橙色','mode.auto':'跟随系统','mode.light':'浅色','mode.dark':'深色'
  },
  'zh-TW': {
    'meta.title':'Minecraft Java 版啟動器下載 · Jiyouyang','meta.description':'Minecraft Java 版官方、PCL 與 HMCL 啟動器下載入口。','nav.label':'啟動器下載頁面導覽','nav.back':'返回 Minecraft 專區','nav.title':'Java 啟動器','hero.title':'Minecraft Java 版啟動器下載','hero.intro':'選擇官方啟動器、PCL 或 HMCL。<br>選項卡只切換管道，下方按鈕才會開啟下載網頁。','hero.status':'三個啟動器管道均已接入','platform.title':'選擇啟動器管道','platform.subtitle':'點擊選項卡查看簡介，再使用下方按鈕前往對應下載網頁。','platform.label':'啟動器管道','tab.official':'官方','tab.pcl':'PCL','tab.hmcl':'HMCL','download.action':'前往下載網頁','footer.motto':'把好用的，分享給需要的人。','footer.back':'返回 Minecraft 專區 ↗','settings.open':'開啟網站設定','settings.short':'網站設定','settings.title':'外觀與語言','settings.close':'關閉設定','settings.color':'主題顏色','settings.mode':'深淺模式','settings.language':'翻譯語言','color.graphite':'石墨','color.blue':'藍色','color.violet':'紫色','color.green':'綠色','color.orange':'橙色','mode.auto':'跟隨系統','mode.light':'淺色','mode.dark':'深色'
  },
  en: {
    'meta.title':'Minecraft Java Launchers · Jiyouyang','meta.description':'Download links for the official Minecraft Launcher, PCL, and HMCL.','nav.label':'Launcher download navigation','nav.back':'Back to Minecraft','nav.title':'Java Launchers','hero.title':'Minecraft Java Launchers','hero.intro':'Choose the official launcher, PCL, or HMCL.<br>The tabs only switch channels; the button below opens the download page.','hero.status':'All three launcher channels are connected','platform.title':'Choose a launcher','platform.subtitle':'Use the tabs to view a short introduction, then open its download page below.','platform.label':'Launcher channel','tab.official':'Official','tab.pcl':'PCL','tab.hmcl':'HMCL','download.action':'Open download page','footer.motto':'Share useful things with people who need them.','footer.back':'Back to Minecraft ↗','settings.open':'Open site settings','settings.short':'Site settings','settings.title':'Appearance & Language','settings.close':'Close settings','settings.color':'Accent color','settings.mode':'Appearance mode','settings.language':'Translation language','color.graphite':'Graphite','color.blue':'Blue','color.violet':'Violet','color.green':'Green','color.orange':'Orange','mode.auto':'System','mode.light':'Light','mode.dark':'Dark'
  },
  ja: {
    'meta.title':'Minecraft Java 版ランチャー · Jiyouyang','meta.description':'公式 Minecraft Launcher、PCL、HMCL のダウンロード入口です。','nav.label':'ランチャーダウンロードページナビゲーション','nav.back':'Minecraft へ戻る','nav.title':'Java ランチャー','hero.title':'Minecraft Java 版ランチャー','hero.intro':'公式ランチャー、PCL、HMCL から選べます。<br>タブは切り替え専用で、下のボタンからダウンロードページを開きます。','hero.status':'3つのランチャーを接続済み','platform.title':'ランチャーを選択','platform.subtitle':'タブで概要を確認し、下のボタンから対応するページへ進みます。','platform.label':'ランチャー','tab.official':'公式','tab.pcl':'PCL','tab.hmcl':'HMCL','download.action':'ダウンロードページを開く','footer.motto':'便利なものを、必要な人へ。','footer.back':'Minecraft へ戻る ↗','settings.open':'サイト設定を開く','settings.short':'サイト設定','settings.title':'外観と言語','settings.close':'設定を閉じる','settings.color':'テーマカラー','settings.mode':'表示モード','settings.language':'翻訳言語','color.graphite':'グラファイト','color.blue':'ブルー','color.violet':'バイオレット','color.green':'グリーン','color.orange':'オレンジ','mode.auto':'システム','mode.light':'ライト','mode.dark':'ダーク'
  }
};

const platforms = {
  official: {
    url:'https://www.minecraft.net/zh-hans/download',
    icon:'<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
    content:{
      'zh-CN':['官方渠道','Minecraft 官方启动器','Minecraft 官方下载入口，提供 Windows、Mac 等平台的启动器。',['官方','Java 版','多平台']],
      'zh-TW':['官方管道','Minecraft 官方啟動器','Minecraft 官方下載入口，提供 Windows、Mac 等平台的啟動器。',['官方','Java 版','多平台']],
      en:['OFFICIAL','Minecraft Launcher','The official Minecraft download page provides the launcher for Windows, Mac, and more.',['Official','Java Edition','Multi-platform']],
      ja:['公式','Minecraft Launcher','Windows、Mac などに対応した公式 Minecraft ランチャーのダウンロードページです。',['公式','Java 版','マルチプラットフォーム']]
    }
  },
  pcl: {
    url:'https://github.com/Meloong-Git/PCL',
    icon:'<svg viewBox="0 0 24 24"><path d="M4 17V7l8-4 8 4v10l-8 4zM8 9h8M8 13h5"/></svg>',
    content:{
      'zh-CN':['社区启动器','Plain Craft Launcher（PCL）','PCL 是面向 Minecraft Java 版的社区启动器，项目页面提供说明与获取方式。',['Java 版','社区项目','GitHub']],
      'zh-TW':['社群啟動器','Plain Craft Launcher（PCL）','PCL 是面向 Minecraft Java 版的社群啟動器，專案頁面提供說明與取得方式。',['Java 版','社群專案','GitHub']],
      en:['COMMUNITY LAUNCHER','Plain Craft Launcher (PCL)','A community launcher for Minecraft Java Edition, with project details and downloads on GitHub.',['Java Edition','Community','GitHub']],
      ja:['コミュニティ','Plain Craft Launcher（PCL）','Minecraft Java 版向けのコミュニティ製ランチャーで、GitHub に案内と入手方法があります。',['Java 版','コミュニティ','GitHub']]
    }
  },
  hmcl: {
    url:'https://github.com/HMCL-dev/HMCL/releases/tag/v3.16.4',
    icon:'<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4zM8 9h8M8 13h3m2 0h3"/></svg>',
    content:{
      'zh-CN':['跨平台启动器','Hello Minecraft! Launcher（HMCL）','HMCL 是多功能跨平台启动器，此发布页提供 Windows、通用 JAR 与 Linux 文件。',['Java 版','跨平台','v3.16.4']],
      'zh-TW':['跨平台啟動器','Hello Minecraft! Launcher（HMCL）','HMCL 是多功能跨平台啟動器，此發布頁提供 Windows、通用 JAR 與 Linux 檔案。',['Java 版','跨平台','v3.16.4']],
      en:['CROSS-PLATFORM','Hello Minecraft! Launcher (HMCL)','A multi-functional cross-platform launcher with Windows, universal JAR, and Linux files on this release page.',['Java Edition','Cross-platform','v3.16.4']],
      ja:['クロスプラットフォーム','Hello Minecraft! Launcher（HMCL）','多機能なクロスプラットフォームランチャーで、このリリースには Windows、JAR、Linux 用ファイルがあります。',['Java 版','クロスプラットフォーム','v3.16.4']]
    }
  }
};

const $=selector=>document.querySelector(selector);
const settings=$('#settings');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
let selectedPlatform='official',preference='auto',accentPreference='graphite',language='zh-CN';
try{preference=localStorage.getItem('jy-theme')||'auto';accentPreference=localStorage.getItem('jy-accent')||'graphite';language=localStorage.getItem('jy-language')||'zh-CN';}catch{}
if(!i18n[language])language='zh-CN';
const t=key=>i18n[language][key]||i18n['zh-CN'][key]||key;
const persist=(key,value)=>{try{localStorage.setItem(key,value);}catch{}};
function renderPlatform(){const platform=platforms[selectedPlatform];const[label,name,description,details]=platform.content[language]||platform.content['zh-CN'];$('#platform-art').innerHTML=platform.icon;$('#platform-label').textContent=label;$('#platform-name').textContent=name;$('#platform-description').textContent=description;$('#download-link').href=platform.url;$('#download-label').textContent=t('download.action');$('#platform-details').innerHTML=details.map(()=>'<span class="detail"></span>').join('');[...$('#platform-details').children].forEach((element,index)=>{element.textContent=details[index];});const buttons=[...document.querySelectorAll('[data-platform]')],activeIndex=Math.max(0,buttons.findIndex(button=>button.dataset.platform===selectedPlatform));$('.platform-tabs').style.setProperty('--active-index',activeIndex);buttons.forEach((button,index)=>{button.classList.toggle('active',index===activeIndex);button.setAttribute('aria-selected',String(index===activeIndex));});}
function applyAccent(){document.documentElement.dataset.accent=accentPreference;document.querySelectorAll('[data-accent-choice]').forEach(button=>{const active=button.dataset.accentChoice===accentPreference;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});persist('jy-accent',accentPreference);}
function applyTheme(){document.documentElement.dataset.theme=preference==='auto'?(systemTheme.matches?'dark':'light'):preference;$('meta[name="theme-color"]').content=document.documentElement.dataset.theme==='dark'?'#000000':'#f5f5f7';const buttons=[...document.querySelectorAll('[data-mode]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.mode===preference));$('.mode-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});persist('jy-theme',preference);}
function applyLanguage(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n);});document.querySelectorAll('[data-i18n-html]').forEach(element=>{element.innerHTML=t(element.dataset.i18nHtml);});document.querySelectorAll('[data-i18n-label]').forEach(element=>{element.setAttribute('aria-label',t(element.dataset.i18nLabel));});document.title=t('meta.title');$('meta[name="description"]').content=t('meta.description');const buttons=[...document.querySelectorAll('[data-language]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.language===language));$('.language-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});renderPlatform();persist('jy-language',language);}
document.querySelectorAll('[data-platform]').forEach(button=>{button.onclick=event=>{event.preventDefault();event.stopPropagation();selectedPlatform=button.dataset.platform;renderPlatform();return false;};});
$('#settings-trigger').onclick=()=>{settings.showModal();document.body.style.overflow='hidden';};$('#close-settings').onclick=()=>settings.close();settings.addEventListener('click',event=>{const bounds=settings.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)settings.close();});settings.addEventListener('close',()=>{document.body.style.overflow='';});
document.querySelectorAll('[data-accent-choice]').forEach(button=>{button.onclick=()=>{accentPreference=button.dataset.accentChoice;applyAccent();};});document.querySelectorAll('[data-mode]').forEach(button=>{button.onclick=()=>{preference=button.dataset.mode;applyTheme();};});document.querySelectorAll('[data-language]').forEach(button=>{button.onclick=()=>{language=button.dataset.language;applyLanguage();};});systemTheme.addEventListener('change',()=>{if(preference==='auto')applyTheme();});$('#year').textContent=new Date().getFullYear();applyAccent();applyTheme();applyLanguage();
