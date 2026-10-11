const i18n = {
  'zh-CN': {
    'meta.title':'原神国际版下载 · Jiyouyang','meta.description':'原神国际版 Android 与 iOS 下载入口。','nav.label':'原神下载页面导航','nav.back':'返回原神专区','nav.title':'下载中心',
    'hero.title':'原神国际版下载','hero.intro':'选择 Android 或 iOS 查看下载方式。<br>选项卡只切换平台，下方按钮才会打开下载网页。','hero.status':'Android 与 iOS 下载入口已接入',
    'platform.title':'选择移动平台','platform.subtitle':'点击选项卡切换平台，再使用下方按钮前往对应下载页面。','platform.label':'移动平台',
    'download.google':'前往 Google Play 官方下载','download.apk':'APK 下载','download.ios':'前往 App Store 下载',
    'footer.motto':'把好用的，分享给需要的人。','footer.back':'返回原神专区 ↗',
    'settings.open':'打开网站设置','settings.short':'网站设置','settings.title':'外观与语言','settings.close':'关闭设置','settings.color':'主题颜色','settings.mode':'深浅模式','settings.language':'翻译语言',
    'color.graphite':'石墨','color.blue':'蓝色','color.violet':'紫色','color.green':'绿色','color.orange':'橙色','mode.auto':'跟随系统','mode.light':'浅色','mode.dark':'深色'
  },
  'zh-TW': {
    'meta.title':'原神國際版下載 · Jiyouyang','meta.description':'原神國際版 Android 與 iOS 下載入口。','nav.label':'原神下載頁面導覽','nav.back':'返回原神專區','nav.title':'下載中心',
    'hero.title':'原神國際版下載','hero.intro':'選擇 Android 或 iOS 查看下載方式。<br>選項卡只切換平台，下方按鈕才會開啟下載網頁。','hero.status':'Android 與 iOS 下載入口已接入',
    'platform.title':'選擇行動平台','platform.subtitle':'點擊選項卡切換平台，再使用下方按鈕前往對應下載頁面。','platform.label':'行動平台',
    'download.google':'前往 Google Play 官方下載','download.apk':'APK 下載','download.ios':'前往 App Store 下載',
    'footer.motto':'把好用的，分享給需要的人。','footer.back':'返回原神專區 ↗',
    'settings.open':'開啟網站設定','settings.short':'網站設定','settings.title':'外觀與語言','settings.close':'關閉設定','settings.color':'主題顏色','settings.mode':'深淺模式','settings.language':'翻譯語言',
    'color.graphite':'石墨','color.blue':'藍色','color.violet':'紫色','color.green':'綠色','color.orange':'橙色','mode.auto':'跟隨系統','mode.light':'淺色','mode.dark':'深色'
  },
  en: {
    'meta.title':'Genshin Impact Global Download · Jiyouyang','meta.description':'Android and iOS download links for Genshin Impact global edition.','nav.label':'Genshin Impact download navigation','nav.back':'Back to Genshin Impact','nav.title':'Downloads',
    'hero.title':'Genshin Impact Global Download','hero.intro':'Choose Android or iOS to view download options.<br>The tabs only switch platforms; the buttons below open download pages.','hero.status':'Android and iOS download options are available',
    'platform.title':'Choose a mobile platform','platform.subtitle':'Switch platforms with the tabs, then use a button below to open a download page.','platform.label':'Mobile platform',
    'download.google':'Download from Google Play','download.apk':'Download APK','download.ios':'Download from the App Store',
    'footer.motto':'Share useful things with people who need them.','footer.back':'Back to Genshin Impact ↗',
    'settings.open':'Open site settings','settings.short':'Site settings','settings.title':'Appearance & Language','settings.close':'Close settings','settings.color':'Accent color','settings.mode':'Appearance mode','settings.language':'Translation language',
    'color.graphite':'Graphite','color.blue':'Blue','color.violet':'Violet','color.green':'Green','color.orange':'Orange','mode.auto':'System','mode.light':'Light','mode.dark':'Dark'
  },
  ja: {
    'meta.title':'原神グローバル版ダウンロード · Jiyouyang','meta.description':'原神グローバル版の Android・iOS ダウンロード先です。','nav.label':'原神ダウンロードページナビゲーション','nav.back':'原神へ戻る','nav.title':'ダウンロード',
    'hero.title':'原神グローバル版ダウンロード','hero.intro':'Android または iOS を選んでダウンロード先を確認できます。<br>タブは切り替え専用で、下のボタンからダウンロードページを開きます。','hero.status':'Android・iOS のダウンロード先を接続済み',
    'platform.title':'モバイル環境を選択','platform.subtitle':'タブで切り替え、下のボタンから対応するページへ進みます。','platform.label':'モバイル環境',
    'download.google':'Google Play からダウンロード','download.apk':'APK をダウンロード','download.ios':'App Store からダウンロード',
    'footer.motto':'便利なものを、必要な人へ。','footer.back':'原神へ戻る ↗',
    'settings.open':'サイト設定を開く','settings.short':'サイト設定','settings.title':'外観と言語','settings.close':'設定を閉じる','settings.color':'テーマカラー','settings.mode':'表示モード','settings.language':'翻訳言語',
    'color.graphite':'グラファイト','color.blue':'ブルー','color.violet':'バイオレット','color.green':'グリーン','color.orange':'オレンジ','mode.auto':'システム','mode.light':'ライト','mode.dark':'ダーク'
  }
};

const androidIcon='<svg viewBox="0 0 24 24"><path d="m8 5-2-3m10 3 2-3M6 9h12v9H6zM4 10v6m16-6v6M9 18v4m6-4v4"/><circle cx="9" cy="7" r=".5"/><circle cx="15" cy="7" r=".5"/></svg>';
const platforms={
  android:{
    url:'https://play.google.com/store/apps/details/Genshin_Impact?id=com.miHoYo.GenshinImpact&hl=en_NZ&pli=1',
    secondaryUrl:'https://genshin-impact.cn.uptodown.com/android/dw/1218436799-x',
    icon:androidIcon,
    content:{
      'zh-CN':['Android 平台','原神国际版 · Android','可选择 Google Play 官方下载或 APK 下载。如无法打开，请使用科学上网。',['国际版','Android','双下载入口']],
      'zh-TW':['Android 平台','原神國際版 · Android','可選擇 Google Play 官方下載或 APK 下載。如無法開啟，請使用科學上網。',['國際版','Android','雙下載入口']],
      en:['ANDROID','Genshin Impact Global · Android','Choose the official Google Play page or the APK download. If a page does not open, use a suitable network connection.',['Global Edition','Android','Two download options']],
      ja:['ANDROID','原神グローバル版 · Android','公式 Google Play または APK からダウンロードできます。ページが開けない場合は、適切なネットワーク接続方法をご利用ください。',['グローバル版','Android','2つのダウンロード先']]
    }
  },
  ios:{
    url:'https://apps.apple.com/us/app/genshin-impact-6th-anniversary/id1517783697',
    icon:'<span class="apple-symbol" aria-hidden="true"></span>',
    content:{
      'zh-CN':['iOS 平台','原神国际版 · iOS','前往 App Store 下载。请使用非中国大陆地区 Apple 账号。',['国际版','iOS / iPadOS','App Store']],
      'zh-TW':['iOS 平台','原神國際版 · iOS','前往 App Store 下載。請使用非中國大陸地區的 Apple 帳號。',['國際版','iOS / iPadOS','App Store']],
      en:['iOS','Genshin Impact Global · iOS','Download from the App Store. Please use an Apple Account registered outside mainland China.',['Global Edition','iOS / iPadOS','App Store']],
      ja:['iOS','原神グローバル版 · iOS','App Store からダウンロードできます。中国本土以外の地域の Apple Account をご利用ください。',['グローバル版','iOS / iPadOS','App Store']]
    }
  }
};

function renderPlatform(){
  const platform=platforms[selectedPlatform];
  const [label,name,description,details]=platform.content[language]||platform.content['zh-CN'];
  $('#platform-art').innerHTML=platform.icon;
  $('#platform-label').textContent=label;
  $('#platform-name').textContent=name;
  $('#platform-description').textContent=description;
  $('#platform-details').innerHTML=details.map(()=>'<span class="detail"></span>').join('');
  [...$('#platform-details').children].forEach((element,index)=>{element.textContent=details[index];});
  $('#download-link').href=platform.url;
  $('#download-label').textContent=t(selectedPlatform==='android'?'download.google':'download.ios');
  const secondary=$('#download-link-secondary');
  secondary.hidden=!platform.secondaryUrl;
  if(platform.secondaryUrl)secondary.href=platform.secondaryUrl;else secondary.removeAttribute('href');
  $('#download-label-secondary').textContent=t('download.apk');
  const buttons=[...document.querySelectorAll('[data-platform]')];
  const activeIndex=Math.max(0,buttons.findIndex(button=>button.dataset.platform===selectedPlatform));
  $('.platform-tabs').style.setProperty('--active-index',activeIndex);
  buttons.forEach((button,index)=>{button.classList.toggle('active',index===activeIndex);button.setAttribute('aria-selected',String(index===activeIndex));});
}

const $=selector=>document.querySelector(selector);
const settings=$('#settings');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
let preference='auto',accentPreference='graphite',language='zh-CN',selectedPlatform='android';
try{preference=localStorage.getItem('jy-theme')||'auto';accentPreference=localStorage.getItem('jy-accent')||'graphite';language=localStorage.getItem('jy-language')||'zh-CN';}catch{}
if(!i18n[language])language='zh-CN';
const t=key=>i18n[language][key]||i18n['zh-CN'][key]||key;
const persist=(key,value)=>{try{localStorage.setItem(key,value);}catch{}};
function applyAccent(){document.documentElement.dataset.accent=accentPreference;document.querySelectorAll('[data-accent-choice]').forEach(button=>{const active=button.dataset.accentChoice===accentPreference;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});persist('jy-accent',accentPreference);}
function applyTheme(){document.documentElement.dataset.theme=preference==='auto'?(systemTheme.matches?'dark':'light'):preference;$('meta[name="theme-color"]').content=document.documentElement.dataset.theme==='dark'?'#000000':'#f5f5f7';const buttons=[...document.querySelectorAll('[data-mode]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.mode===preference));$('.mode-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});persist('jy-theme',preference);}
function applyLanguage(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n);});document.querySelectorAll('[data-i18n-html]').forEach(element=>{element.innerHTML=t(element.dataset.i18nHtml);});document.querySelectorAll('[data-i18n-label]').forEach(element=>{element.setAttribute('aria-label',t(element.dataset.i18nLabel));});document.title=t('meta.title');$('meta[name="description"]').content=t('meta.description');renderPlatform();const buttons=[...document.querySelectorAll('[data-language]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.language===language));$('.language-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});persist('jy-language',language);}
$('#settings-trigger').onclick=()=>{settings.showModal();document.body.style.overflow='hidden';};$('#close-settings').onclick=()=>settings.close();settings.addEventListener('click',event=>{const bounds=settings.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)settings.close();});settings.addEventListener('close',()=>{document.body.style.overflow='';});
document.querySelectorAll('[data-accent-choice]').forEach(button=>{button.onclick=()=>{accentPreference=button.dataset.accentChoice;applyAccent();};});document.querySelectorAll('[data-mode]').forEach(button=>{button.onclick=()=>{preference=button.dataset.mode;applyTheme();};});document.querySelectorAll('[data-language]').forEach(button=>{button.onclick=()=>{language=button.dataset.language;applyLanguage();};});systemTheme.addEventListener('change',()=>{if(preference==='auto')applyTheme();});document.querySelectorAll('[data-platform]').forEach(button=>{button.onclick=event=>{event.preventDefault();selectedPlatform=button.dataset.platform;renderPlatform();};});$('#year').textContent=new Date().getFullYear();applyAccent();applyTheme();applyLanguage();
