const i18n = {
  'zh-CN': {
    'meta.title':'Minecraft Java 版模组下载 · Jiyouyang','meta.description':'CurseForge 与 Modrinth 的 Minecraft Java 版模组入口。','nav.label':'模组下载页面导航','nav.back':'返回 Minecraft 专区','nav.title':'Java 模组','hero.title':'Minecraft Java 版模组下载','hero.intro':'选择 CurseForge 或 Modrinth 浏览 Java 版模组。<br>如无法访问请使用科学上网。','hero.status':'两个模组平台均已接入','platform.title':'选择模组平台','platform.subtitle':'点击选项卡切换平台，使用下方按钮前往对应网站。','platform.label':'模组平台','download.action':'前往模组网站','footer.motto':'把好用的，分享给需要的人。','footer.back':'返回 Minecraft 专区 ↗','settings.open':'打开网站设置','settings.short':'网站设置','settings.title':'外观与语言','settings.close':'关闭设置','settings.color':'主题颜色','settings.mode':'深浅模式','settings.language':'翻译语言','color.graphite':'石墨','color.blue':'蓝色','color.violet':'紫色','color.green':'绿色','color.orange':'橙色','mode.auto':'跟随系统','mode.light':'浅色','mode.dark':'深色'
  },
  'zh-TW': {
    'meta.title':'Minecraft Java 版模組下載 · Jiyouyang','meta.description':'CurseForge 與 Modrinth 的 Minecraft Java 版模組入口。','nav.label':'模組下載頁面導覽','nav.back':'返回 Minecraft 專區','nav.title':'Java 模組','hero.title':'Minecraft Java 版模組下載','hero.intro':'選擇 CurseForge 或 Modrinth 瀏覽 Java 版模組。<br>如無法存取，請使用科學上網。','hero.status':'兩個模組平台均已接入','platform.title':'選擇模組平台','platform.subtitle':'點擊選項卡切換平台，使用下方按鈕前往對應網站。','platform.label':'模組平台','download.action':'前往模組網站','footer.motto':'把好用的，分享給需要的人。','footer.back':'返回 Minecraft 專區 ↗','settings.open':'開啟網站設定','settings.short':'網站設定','settings.title':'外觀與語言','settings.close':'關閉設定','settings.color':'主題顏色','settings.mode':'深淺模式','settings.language':'翻譯語言','color.graphite':'石墨','color.blue':'藍色','color.violet':'紫色','color.green':'綠色','color.orange':'橙色','mode.auto':'跟隨系統','mode.light':'淺色','mode.dark':'深色'
  },
  en: {
    'meta.title':'Minecraft Java Mods · Jiyouyang','meta.description':'Minecraft Java mod directories on CurseForge and Modrinth.','nav.label':'Mod download page navigation','nav.back':'Back to Minecraft','nav.title':'Java Mods','hero.title':'Minecraft Java Mods','hero.intro':'Choose CurseForge or Modrinth to browse Java Edition mods.<br>If the site is unavailable in your region, use an appropriate network access method.','hero.status':'Both mod platforms are connected','platform.title':'Choose a mod platform','platform.subtitle':'Use the tabs to switch platforms, then use the button below to open the selected website.','platform.label':'Mod platform','download.action':'Open mod website','footer.motto':'Share useful things with people who need them.','footer.back':'Back to Minecraft ↗','settings.open':'Open site settings','settings.short':'Site settings','settings.title':'Appearance & Language','settings.close':'Close settings','settings.color':'Accent color','settings.mode':'Appearance mode','settings.language':'Translation language','color.graphite':'Graphite','color.blue':'Blue','color.violet':'Violet','color.green':'Green','color.orange':'Orange','mode.auto':'System','mode.light':'Light','mode.dark':'Dark'
  },
  ja: {
    'meta.title':'Minecraft Java MOD ダウンロード · Jiyouyang','meta.description':'CurseForge と Modrinth の Minecraft Java MOD ページです。','nav.label':'MOD ダウンロードページナビゲーション','nav.back':'Minecraft へ戻る','nav.title':'Java MOD','hero.title':'Minecraft Java 版 MOD ダウンロード','hero.intro':'CurseForge または Modrinth を選んで Java 版 MOD を探せます。<br>アクセスできない場合は、適切なネットワーク接続方法をご利用ください。','hero.status':'2つの MOD プラットフォームを接続済み','platform.title':'MOD プラットフォームを選択','platform.subtitle':'タブで切り替え、下のボタンから選択したサイトへ進みます。','platform.label':'MOD プラットフォーム','download.action':'MOD サイトを開く','footer.motto':'便利なものを、必要な人へ。','footer.back':'Minecraft へ戻る ↗','settings.open':'サイト設定を開く','settings.short':'サイト設定','settings.title':'外観と言語','settings.close':'設定を閉じる','settings.color':'テーマカラー','settings.mode':'表示モード','settings.language':'翻訳言語','color.graphite':'グラファイト','color.blue':'ブルー','color.violet':'バイオレット','color.green':'グリーン','color.orange':'オレンジ','mode.auto':'システム','mode.light':'ライト','mode.dark':'ダーク'
  }
};

const platforms = {
  curseforge: {
    url: 'https://www.curseforge.com/minecraft/search?page=1&pageSize=20&sortBy=relevancy',
    icon: '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>',
    content: {
      'zh-CN':['模组平台','CurseForge','浏览 CurseForge 上的 Minecraft Java 版模组。如无法访问请使用科学上网。',['Java 版','模组','CurseForge']],
      'zh-TW':['模組平台','CurseForge','瀏覽 CurseForge 上的 Minecraft Java 版模組。如無法存取，請使用科學上網。',['Java 版','模組','CurseForge']],
      en:['MOD PLATFORM','CurseForge','Browse Minecraft Java Edition mods on CurseForge. If unavailable in your region, use an appropriate network access method.',['Java Edition','Mods','CurseForge']],
      ja:['MOD プラットフォーム','CurseForge','CurseForge で Minecraft Java 版 MOD を探せます。アクセスできない場合は、適切なネットワーク接続方法をご利用ください。',['Java 版','MOD','CurseForge']]
    }
  },
  modrinth: {
    url: 'https://modrinth.com/discover/mods',
    icon: '<svg viewBox="0 0 24 24"><path d="M12 3 4 7v10l8 4 8-4V7zM4 7l8 4 8-4M12 11v10"/></svg>',
    content: {
      'zh-CN':['模组平台','Modrinth','浏览 Modrinth 上的 Minecraft Java 版模组。如无法访问请使用科学上网。',['Java 版','模组','Modrinth']],
      'zh-TW':['模組平台','Modrinth','瀏覽 Modrinth 上的 Minecraft Java 版模組。如無法存取，請使用科學上網。',['Java 版','模組','Modrinth']],
      en:['MOD PLATFORM','Modrinth','Browse Minecraft Java Edition mods on Modrinth. If unavailable in your region, use an appropriate network access method.',['Java Edition','Mods','Modrinth']],
      ja:['MOD プラットフォーム','Modrinth','Modrinth で Minecraft Java 版 MOD を探せます。アクセスできない場合は、適切なネットワーク接続方法をご利用ください。',['Java 版','MOD','Modrinth']]
    }
  }
};

const $ = selector => document.querySelector(selector);
const settings = $('#settings');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let selectedPlatform = 'curseforge', preference = 'auto', accentPreference = 'graphite', language = 'zh-CN';
try { preference=localStorage.getItem('jy-theme')||'auto';accentPreference=localStorage.getItem('jy-accent')||'graphite';language=localStorage.getItem('jy-language')||'zh-CN'; } catch {}
if (!i18n[language]) language='zh-CN';
const t = key => i18n[language][key] || i18n['zh-CN'][key] || key;
const persist = (key,value) => { try { localStorage.setItem(key,value); } catch {} };

function renderPlatform(){
  const platform=platforms[selectedPlatform];
  const [label,name,description,details]=platform.content[language]||platform.content['zh-CN'];
  $('#platform-art').innerHTML=platform.icon;$('#platform-label').textContent=label;$('#platform-name').textContent=name;$('#platform-description').textContent=description;$('#download-link').href=platform.url;$('#download-label').textContent=t('download.action');
  $('#platform-details').innerHTML=details.map(detail=>'<span class="detail"></span>').join('');[...$('#platform-details').children].forEach((element,index)=>{element.textContent=details[index];});
  const buttons=[...document.querySelectorAll('[data-platform]')],activeIndex=Math.max(0,buttons.findIndex(button=>button.dataset.platform===selectedPlatform));$('.platform-tabs').style.setProperty('--active-index',activeIndex);buttons.forEach((button,index)=>{button.classList.toggle('active',index===activeIndex);button.setAttribute('aria-selected',String(index===activeIndex));});
}
function applyAccent(){document.documentElement.dataset.accent=accentPreference;document.querySelectorAll('[data-accent-choice]').forEach(button=>{const active=button.dataset.accentChoice===accentPreference;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});persist('jy-accent',accentPreference);}
function applyTheme(){document.documentElement.dataset.theme=preference==='auto'?(systemTheme.matches?'dark':'light'):preference;$('meta[name="theme-color"]').content=document.documentElement.dataset.theme==='dark'?'#000000':'#f5f5f7';const buttons=[...document.querySelectorAll('[data-mode]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.mode===preference));$('.mode-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});persist('jy-theme',preference);}
function applyLanguage(){document.documentElement.lang=language;document.querySelectorAll('[data-i18n]').forEach(element=>{element.textContent=t(element.dataset.i18n);});document.querySelectorAll('[data-i18n-html]').forEach(element=>{element.innerHTML=t(element.dataset.i18nHtml);});document.querySelectorAll('[data-i18n-label]').forEach(element=>{element.setAttribute('aria-label',t(element.dataset.i18nLabel));});document.title=t('meta.title');$('meta[name="description"]').content=t('meta.description');const buttons=[...document.querySelectorAll('[data-language]')],index=Math.max(0,buttons.findIndex(button=>button.dataset.language===language));$('.language-switch').style.setProperty('--active-index',index);buttons.forEach((button,i)=>{button.classList.toggle('active',i===index);button.setAttribute('aria-pressed',String(i===index));});renderPlatform();persist('jy-language',language);}
document.querySelectorAll('[data-platform]').forEach(button=>{button.onclick=event=>{event.preventDefault();event.stopPropagation();selectedPlatform=button.dataset.platform;renderPlatform();return false;};});
$('#settings-trigger').onclick=()=>{settings.showModal();document.body.style.overflow='hidden';};$('#close-settings').onclick=()=>settings.close();settings.addEventListener('click',event=>{const bounds=settings.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)settings.close();});settings.addEventListener('close',()=>{document.body.style.overflow='';});
document.querySelectorAll('[data-accent-choice]').forEach(button=>{button.onclick=()=>{accentPreference=button.dataset.accentChoice;applyAccent();};});document.querySelectorAll('[data-mode]').forEach(button=>{button.onclick=()=>{preference=button.dataset.mode;applyTheme();};});document.querySelectorAll('[data-language]').forEach(button=>{button.onclick=()=>{language=button.dataset.language;applyLanguage();};});systemTheme.addEventListener('change',()=>{if(preference==='auto')applyTheme();});$('#year').textContent=new Date().getFullYear();applyAccent();applyTheme();applyLanguage();
