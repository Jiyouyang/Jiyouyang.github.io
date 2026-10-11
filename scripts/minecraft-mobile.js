const i18n = {
  'zh-CN': {
    'meta.title':'Minecraft Java 版移动端下载 · Jiyouyang','meta.description':'Minecraft Java 版 Android 与 iOS 移动端下载入口。','nav.label':'移动端下载页面导航','nav.back':'返回 Minecraft 专区','nav.title':'Java 移动端','hero.title':'Minecraft Java 版移动端下载','hero.intro':'选择 Android 或 iOS 查看对应的移动端启动器。<br>选项卡只切换平台，下方按钮才会打开下载网页。','hero.status':'Android 与 iOS 下载入口均已接入','platform.title':'选择移动平台','platform.subtitle':'点击选项卡切换平台，再使用下方按钮前往对应下载网页。','platform.label':'移动平台','download.action':'前往下载网页','footer.motto':'把好用的，分享给需要的人。','footer.back':'返回 Minecraft 专区 ↗','settings.open':'打开网站设置','settings.short':'网站设置','settings.title':'外观与语言','settings.close':'关闭设置','settings.color':'主题颜色','settings.mode':'深浅模式','settings.language':'翻译语言','color.graphite':'石墨','color.blue':'蓝色','color.violet':'紫色','color.green':'绿色','color.orange':'橙色','mode.auto':'跟随系统','mode.light':'浅色','mode.dark':'深色'
  },
  'zh-TW': {
    'meta.title':'Minecraft Java 版行動端下載 · Jiyouyang','meta.description':'Minecraft Java 版 Android 與 iOS 行動端下載入口。','nav.label':'行動端下載頁面導覽','nav.back':'返回 Minecraft 專區','nav.title':'Java 行動端','hero.title':'Minecraft Java 版行動端下載','hero.intro':'選擇 Android 或 iOS 查看對應的行動端啟動器。<br>選項卡只切換平台，下方按鈕才會開啟下載網頁。','hero.status':'Android 與 iOS 下載入口均已接入','platform.title':'選擇行動平台','platform.subtitle':'點擊選項卡切換平台，再使用下方按鈕前往對應下載網頁。','platform.label':'行動平台','download.action':'前往下載網頁','footer.motto':'把好用的，分享給需要的人。','footer.back':'返回 Minecraft 專區 ↗','settings.open':'開啟網站設定','settings.short':'網站設定','settings.title':'外觀與語言','settings.close':'關閉設定','settings.color':'主題顏色','settings.mode':'深淺模式','settings.language':'翻譯語言','color.graphite':'石墨','color.blue':'藍色','color.violet':'紫色','color.green':'綠色','color.orange':'橙色','mode.auto':'跟隨系統','mode.light':'淺色','mode.dark':'深色'
  },
  en: {
    'meta.title':'Minecraft Java Mobile Downloads · Jiyouyang','meta.description':'Android and iOS mobile launcher downloads for Minecraft Java Edition.','nav.label':'Mobile download navigation','nav.back':'Back to Minecraft','nav.title':'Java Mobile','hero.title':'Minecraft Java Mobile Downloads','hero.intro':'Choose Android or iOS to view the matching mobile launcher.<br>The tabs only switch platforms; the button below opens the download page.','hero.status':'Android and iOS download destinations are connected','platform.title':'Choose a mobile platform','platform.subtitle':'Use the tabs to switch platforms, then use the button below to open its download page.','platform.label':'Mobile platform','download.action':'Open download page','footer.motto':'Share useful things with people who need them.','footer.back':'Back to Minecraft ↗','settings.open':'Open site settings','settings.short':'Site settings','settings.title':'Appearance & Language','settings.close':'Close settings','settings.color':'Accent color','settings.mode':'Appearance mode','settings.language':'Translation language','color.graphite':'Graphite','color.blue':'Blue','color.violet':'Violet','color.green':'Green','color.orange':'Orange','mode.auto':'System','mode.light':'Light','mode.dark':'Dark'
  },
  ja: {
    'meta.title':'Minecraft Java 版モバイルダウンロード · Jiyouyang','meta.description':'Minecraft Java 版の Android・iOS 向けモバイルランチャーダウンロードページです。','nav.label':'モバイルダウンロードページナビゲーション','nav.back':'Minecraft へ戻る','nav.title':'Java モバイル','hero.title':'Minecraft Java 版モバイルダウンロード','hero.intro':'Android または iOS を選び、対応するモバイルランチャーを確認できます。<br>タブは切り替え専用で、下のボタンからダウンロードページを開きます。','hero.status':'Android・iOS のダウンロード先を接続済み','platform.title':'モバイル環境を選択','platform.subtitle':'タブで切り替え、下のボタンから対応するダウンロードページへ進みます。','platform.label':'モバイル環境','download.action':'ダウンロードページを開く','footer.motto':'便利なものを、必要な人へ。','footer.back':'Minecraft へ戻る ↗','settings.open':'サイト設定を開く','settings.short':'サイト設定','settings.title':'外観と言語','settings.close':'設定を閉じる','settings.color':'テーマカラー','settings.mode':'表示モード','settings.language':'翻訳言語','color.graphite':'グラファイト','color.blue':'ブルー','color.violet':'バイオレット','color.green':'グリーン','color.orange':'オレンジ','mode.auto':'システム','mode.light':'ライト','mode.dark':'ダーク'
  }
};

const platforms = {
  android: {
    url:'https://foldcraftlaunch.com/download/',
    icon:'<svg viewBox="0 0 24 24"><path d="m8 5-2-3m10 3 2-3M6 9h12v9H6zM4 10v6m16-6v6M9 18v4m6-4v4"/><circle cx="9" cy="7" r=".5"/><circle cx="15" cy="7" r=".5"/></svg>',
    content:{
      'zh-CN':['Android 平台','Fold Craft Launcher','适用于 Android 设备的 Minecraft Java 版启动器，点击下方按钮前往官方下载页面。',['Java 版','Android','Fold Craft Launcher']],
      'zh-TW':['Android 平台','Fold Craft Launcher','適用於 Android 裝置的 Minecraft Java 版啟動器，點擊下方按鈕前往官方下載頁面。',['Java 版','Android','Fold Craft Launcher']],
      en:['ANDROID','Fold Craft Launcher','A Minecraft Java Edition launcher for Android devices. Use the button below to open its official download page.',['Java Edition','Android','Fold Craft Launcher']],
      ja:['ANDROID','Fold Craft Launcher','Android 端末向けの Minecraft Java 版ランチャーです。下のボタンから公式ダウンロードページを開けます。',['Java 版','Android','Fold Craft Launcher']]
    }
  },
  ios: {
    url:'https://github.com/herbrine8403/Amethyst-iOS-MyRemastered/releases',
    icon:'<span class="apple-symbol" aria-hidden="true"></span>',
    content:{
      'zh-CN':['iOS 平台','Amethyst iOS','适用于 iPhone 与 iPad 的 Minecraft Java 版移动端项目，点击下方按钮查看 GitHub Releases。',['Java 版','iOS / iPadOS','GitHub Releases']],
      'zh-TW':['iOS 平台','Amethyst iOS','適用於 iPhone 與 iPad 的 Minecraft Java 版行動端專案，點擊下方按鈕查看 GitHub Releases。',['Java 版','iOS / iPadOS','GitHub Releases']],
      en:['iOS','Amethyst iOS','A mobile Minecraft Java Edition project for iPhone and iPad. Use the button below to view its GitHub releases.',['Java Edition','iOS / iPadOS','GitHub Releases']],
      ja:['iOS','Amethyst iOS','iPhone・iPad 向けの Minecraft Java 版モバイルプロジェクトです。下のボタンから GitHub Releases を確認できます。',['Java 版','iOS / iPadOS','GitHub Releases']]
    }
  }
};

const $=selector=>document.querySelector(selector);
const settings=$('#settings');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
let selectedPlatform='android',preference='auto',accentPreference='graphite',language='zh-CN';
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

