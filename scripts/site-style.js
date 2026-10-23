/* Shared, optional visual styles. Existing page scripts retain ownership of content and controls. */
(() => {
  'use strict';
  const root = document.documentElement;
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const styles = ['classic', 'terminal', 'mecha', 'blackgold', 'columbina', 'furina', 'mahiro'];
  const storedStyle = read('jy-style');
  let style = styles.includes(storedStyle) ? storedStyle : 'classic';
  root.dataset.style = style;

  const copy = {
    'zh-CN': {
      title: '风格调整', classic: '经典', terminal: '终端', mecha: '科技',
      mechaDescription: '陶瓷装甲 · 精密切角',
      blackgold: '黑金典藏', blackgoldDescription: '墨黑鎏金 · 典藏质感',
      columbina: '哥伦比娅', columbinaDescription: '月光蓝白 · 羽翼与星海',
      mahiro: '绪山真寻', mahiroDescription: '奶油粉紫 · 轻甜日常手账',
      furina: '芙宁娜', furinaDescription: '枫丹蓝金 · 水光歌剧舞台',
      furinaCredit: '角色美术 © miHoYo · 国内图片源：B站 BWIKI · 非官方主题',
      mahiroCredit: '《别当欧尼酱了！》动画画面 · 图片来源：',
      mahiroSources: ['哔哩哔哩', '堆糖'], mahiroFan: '非官方粉丝主题',
      artCredit: '角色美术 © miHoYo · 来源：米游社 · 非官方网站',
      classicDescription: '柔和留白 · 液态玻璃', terminalDescription: '终端面板 · 荧光描边',
      hint: '即时切换，全站生效。每种风格分别记住配色与深浅模式。'
    },
    'zh-TW': {
      title: '風格調整', classic: '經典', terminal: '終端', mecha: '科技',
      mechaDescription: '陶瓷裝甲 · 精密切角',
      blackgold: '黑金典藏', blackgoldDescription: '墨黑鎏金 · 典藏質感',
      columbina: '哥倫比婭', columbinaDescription: '月光藍白 · 羽翼與星海',
      mahiro: '緒山真尋', mahiroDescription: '奶油粉紫 · 輕甜日常手帳',
      furina: '芙寧娜', furinaDescription: '楓丹藍金 · 水光歌劇舞臺',
      furinaCredit: '角色美術 © miHoYo · 中國大陸圖片來源：B站 BWIKI · 非官方主題',
      mahiroCredit: '《別當歐尼醬了！》動畫畫面 · 圖片來源：',
      mahiroSources: ['嗶哩嗶哩', '堆糖'], mahiroFan: '非官方粉絲主題',
      artCredit: '角色美術 © miHoYo · 來源：米遊社 · 非官方網站',
      classicDescription: '柔和留白 · 液態玻璃', terminalDescription: '終端面板 · 螢光描邊',
      hint: '即時切換，全站套用。每種風格分別記住配色與深淺模式。'
    },
    en: {
      title: 'Visual style', classic: 'Classic', terminal: 'Terminal', mecha: 'Technology',
      mechaDescription: 'Ceramic armor · Precision edges',
      blackgold: 'Black & Gold', blackgoldDescription: 'Gilded details · Timeless elegance',
      columbina: 'Columbina', columbinaDescription: 'Moonlit blue · Feathers & stars',
      mahiro: 'Mahiro Oyama', mahiroDescription: 'Cream & pastels · Everyday scrapbook',
      furina: 'Furina', furinaDescription: 'Fontaine blue & gold · An aquatic opera',
      furinaCredit: 'Character art © miHoYo · China image CDN: Bilibili BWIKI · Unofficial fan theme',
      mahiroCredit: 'ONIMAI anime stills · Image sources: ',
      mahiroSources: ['Bilibili', 'Duitang'], mahiroFan: 'Unofficial fan theme',
      artCredit: 'Character art © miHoYo · Source: Miyoushe · Unofficial fan theme',
      classicDescription: 'Soft space · Liquid glass', terminalDescription: 'Console panels · Neon lines',
      hint: 'Switch instantly across the site. Each style remembers its own color and appearance mode.'
    },
    ja: {
      title: 'スタイル', classic: 'クラシック', terminal: 'ターミナル', mecha: 'テクノロジー',
      mechaDescription: 'セラミック装甲・精密なエッジ',
      blackgold: 'ブラック＆ゴールド', blackgoldDescription: '漆黒と金彩・上質な佇まい',
      columbina: 'コロンビーナ', columbinaDescription: '月光の青と白・羽と星の海',
      mahiro: '緒山まひろ', mahiroDescription: 'クリームとパステル・日常の手帳',
      furina: 'フリーナ', furinaDescription: '青と金のフォンテーヌ・水の歌劇',
      furinaCredit: 'キャラクターアート © miHoYo · 中国向け画像CDN：bilibili BWIKI · 非公式テーマ',
      mahiroCredit: '「お兄ちゃんはおしまい！」アニメ画像 · 出典：',
      mahiroSources: ['bilibili', '堆糖'], mahiroFan: '非公式ファンテーマ',
      artCredit: 'キャラクターアート © miHoYo · 出典：米遊社 · 非公式ファンテーマ',
      classicDescription: 'ゆとりの余白・ガラス', terminalDescription: '端末パネル・ネオンの輪郭',
      hint: 'すぐに切り替わり、サイト全体に適用されます。配色と表示モードはスタイルごとに保存されます。'
    }
  };
  // Memory keeps switching usable even when the browser blocks localStorage.
  const preferences = {};
  function currentPreferences() {
    return {
      accent: root.dataset.accent || 'graphite',
      theme: document.querySelector('[data-mode].active')?.dataset.mode || 'auto'
    };
  }
  function savePreferences() {
    preferences[style] = currentPreferences();
    write('jy-style-' + style, JSON.stringify(preferences[style]));
  }
  function savedPreferences(name, fresh = false) {
    let saved = fresh ? null : preferences[name];
    if (!saved) { try { saved = JSON.parse(read('jy-style-' + name)); } catch {} }
    const defaults = {
      classic: { accent: 'graphite', theme: 'auto' },
      terminal: { accent: 'green', theme: 'dark' },
      mecha: { accent: 'orange', theme: 'light' },
      blackgold: { accent: 'orange', theme: 'dark' },
      columbina: { accent: 'blue', theme: 'light' },
      mahiro: { accent: 'violet', theme: 'light' },
      furina: { accent: 'blue', theme: 'dark' }
    }[name];
    return {
      accent: ['graphite', 'blue', 'violet', 'green', 'orange'].includes(saved?.accent) ? saved.accent : defaults.accent,
      theme: ['auto', 'light', 'dark'].includes(saved?.theme) ? saved.theme : defaults.theme
    };
  }

  function init() {
    const body = document.querySelector('#settings .settings-body');
    if (!body) return;
    const section = document.createElement('section');
    section.className = 'setting-block style-setting';
    section.innerHTML = '<h3 class="setting-label" id="style-label" data-style-text="title"></h3>' +
      '<div class="style-choices" role="group" aria-labelledby="style-label">' +
      styles.map(name => '<button type="button" class="style-choice" data-style-choice="' + name + '" aria-pressed="false">' +
        '<span class="style-preview style-preview-' + name + '" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="style-choice-title"><span data-style-text="' + name + '"></span><span class="style-check" aria-hidden="true">✓</span></span>' +
        '<span class="style-choice-description" data-style-text="' + name + 'Description"></span></button>').join('') +
      '</div><p class="style-hint" data-style-text="hint"></p>';
    body.prepend(section);

    // Native button activation stays in each page script; add standard horizontal
    // tab navigation and a single Tab stop to all download platform/channel lists.
    document.querySelectorAll('.platform-tabs[role="tablist"]').forEach(group => {
      const tabs = [...group.querySelectorAll('button[role="tab"]:not(:disabled)')];
      function syncTabStops() {
        const selected = tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || tabs[0];
        tabs.forEach(tab => { tab.tabIndex = tab === selected ? 0 : -1; });
      }
      group.addEventListener('keydown', event => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        const index = tabs.indexOf(event.target);
        if (index < 0) return;
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        tabs[next].focus(); tabs[next].click(); syncTabStops();
      });
      new MutationObserver(syncTabStops).observe(group, {
        subtree: true, attributes: true, attributeFilter: ['aria-selected']
      });
      syncTabStops();
    });

    // Decorative art is created only when this style is selected: other styles
    // never request the character image. Existing page content stays untouched.
    let scene, credit;
    function syncColumbina(text) {
      if (style === 'columbina' && !scene) {
        const hero = document.querySelector('.hero');
        if (hero) {
          scene = document.createElement('div');
          scene.className = 'columbina-scene';
          scene.setAttribute('aria-hidden', 'true');
          const artwork = document.createElement('img');
          artwork.alt = ''; artwork.width = 1024; artwork.height = 1024;
          artwork.decoding = 'async';
          artwork.addEventListener('error', () => scene.classList.add('is-unavailable'));
          artwork.src = '/assets/themes/columbina/character.png';
          scene.append(artwork); hero.append(scene);
        }
        const footer = document.querySelector('footer');
        if (footer) {
          credit = document.createElement('p'); credit.className = 'columbina-credit';
          const source = document.createElement('a');
          source.href = 'https://www.miyoushe.com/ys/article/71350081';
          source.target = '_blank'; source.rel = 'noopener noreferrer';
          credit.append(source); footer.append(credit);
        }
      }
      if (scene) scene.hidden = style !== 'columbina';
      if (credit) { credit.hidden = style !== 'columbina'; credit.firstChild.textContent = text.artCredit; }
    }

    // Domestic CDN URLs are the actual image requests, not just credit links.
    // Each image falls back once to the identical local copy, then to CSS decoration.
    let mahiroScene, mahiroBackdrop, mahiroCredit;
    function createThemeArt(className, remote, local, width, height) {
      const frame = document.createElement('div');
      frame.className = className; frame.setAttribute('aria-hidden', 'true');
      const artwork = document.createElement('img');
      artwork.alt = ''; artwork.width = width; artwork.height = height;
      artwork.decoding = 'async'; artwork.referrerPolicy = 'no-referrer';
      let fallback = false;
      let timeout;
      const useFallback = () => {
        clearTimeout(timeout);
        if (!fallback) { fallback = true; artwork.src = local; }
        else frame.classList.add('is-unavailable');
      };
      artwork.addEventListener('error', useFallback);
      artwork.addEventListener('load', () => clearTimeout(timeout));
      artwork.src = remote;
      // A stalled CDN must not leave the portrait blank indefinitely.
      timeout = setTimeout(useFallback, 8000);
      frame.append(artwork);
      return frame;
    }
    function syncMahiro(text) {
      if (style === 'mahiro' && !mahiroScene) {
        const hero = document.querySelector('.hero');
        if (hero) {
          mahiroScene = createThemeArt('mahiro-scene',
            'https://i0.hdslb.com/bfs/article/156c825e518568b4ca2b44ef21340d30b889d54d.jpg',
            '/assets/themes/mahiro/portrait.jpg', 1193, 1080);
          hero.prepend(mahiroScene);
          mahiroBackdrop = createThemeArt('mahiro-backdrop',
            'https://c-ssl.dtstatic.com/uploads/blog/202303/14/20230314024504_f75b6.thumb.1000_0.jpg',
            '/assets/themes/mahiro/background.jpg', 1000, 998);
          document.body.prepend(mahiroBackdrop);
        }
        const footer = document.querySelector('footer');
        if (footer) {
          mahiroCredit = document.createElement('p'); mahiroCredit.className = 'mahiro-credit';
          const label = document.createElement('span');
          mahiroCredit.append(label);
          for (const href of ['https://www.bilibili.com/opus/776676627299958848', 'https://www.duitang.com/blog/?id=1459346582']) {
            const source = document.createElement('a');
            source.href = href; source.target = '_blank'; source.rel = 'noopener noreferrer';
            mahiroCredit.append(source, document.createTextNode(' · '));
          }
          mahiroCredit.append(document.createElement('span'), document.createElement('br'),
            document.createTextNode('©ねことうふ・一迅社／「おにまい」製作委員会'));
          footer.append(mahiroCredit);
        }
      }
      if (mahiroScene) mahiroScene.hidden = style !== 'mahiro';
      if (mahiroBackdrop) mahiroBackdrop.hidden = style !== 'mahiro';
      if (mahiroCredit) {
        mahiroCredit.hidden = style !== 'mahiro';
        mahiroCredit.firstChild.textContent = text.mahiroCredit;
        mahiroCredit.querySelectorAll('a').forEach((link, index) => { link.textContent = text.mahiroSources[index]; });
        mahiroCredit.querySelector('span:last-of-type').textContent = text.mahiroFan;
      }
    }

    let furinaScene, furinaBackdrop, furinaCredit;
    function syncFurina(text) {
      if (style === 'furina' && !furinaScene) {
        const remote = 'https://patchwiki.biligame.com/images/ys/thumb/8/89/s8dltubvboh981ynwjo6jszgwqf1zwr.png/1000px-%E7%94%9F%E8%B4%BA%C2%B7%E8%8A%99%E5%AE%81%E5%A8%9C%C2%B72024.png';
        const hero = document.querySelector('.hero');
        if (hero) {
          furinaScene = createThemeArt('furina-scene', remote, '/assets/themes/furina/artwork.png', 1000, 1000);
          const motif = document.createElement('span'); motif.className = 'furina-hat';
          furinaScene.append(motif); hero.prepend(furinaScene);
          furinaBackdrop = createThemeArt('furina-backdrop', remote, '/assets/themes/furina/artwork.png', 1000, 1000);
          document.body.prepend(furinaBackdrop);
        }
        const footer = document.querySelector('footer');
        if (footer) {
          furinaCredit = document.createElement('p'); furinaCredit.className = 'furina-credit';
          const source = document.createElement('a');
          source.href = 'https://wiki.biligame.com/ys/芙宁娜';
          source.target = '_blank'; source.rel = 'noopener noreferrer';
          furinaCredit.append(source); footer.append(furinaCredit);
        }
      }
      if (furinaScene) furinaScene.hidden = style !== 'furina';
      if (furinaBackdrop) furinaBackdrop.hidden = style !== 'furina';
      if (furinaCredit) { furinaCredit.hidden = style !== 'furina'; furinaCredit.firstChild.textContent = text.furinaCredit; }
    }

    function sync() {
      const text = copy[root.lang] || copy['zh-CN'];
      syncColumbina(text);
      syncMahiro(text);
      syncFurina(text);
      section.querySelectorAll('[data-style-text]').forEach(element => { element.textContent = text[element.dataset.styleText]; });
      section.querySelectorAll('[data-style-choice]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.styleChoice === style));
      });
      // Run after page-specific applyTheme(), so Safari matches the active style's palette.
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = getComputedStyle(root).getPropertyValue('--bg').trim();
    }

    section.addEventListener('click', event => {
      const button = event.target.closest('[data-style-choice]');
      if (!button || button.dataset.styleChoice === style) return;
      savePreferences();
      style = button.dataset.styleChoice;
      const next = savedPreferences(style);
      root.dataset.style = style;
      write('jy-style', style);
      // Reuse existing handlers to keep their in-memory state, ARIA and storage in sync.
      document.querySelector('[data-accent-choice="' + next.accent + '"]')?.click();
      document.querySelector('[data-mode="' + next.theme + '"]')?.click();
      savePreferences();
      sync();
    });

    new MutationObserver(() => { savePreferences(); sync(); }).observe(root, {
      attributes: true, attributeFilter: ['lang', 'data-theme', 'data-accent']
    });
    // A System/Light change may leave data-theme unchanged, but is still a new preference.
    body.addEventListener('click', event => {
      // Internal clicks (including programmatic preference changes) are never backdrop clicks.
      event.stopPropagation();
      if (event.target.closest('[data-mode], [data-accent-choice]')) savePreferences();
    });
    // Safari can restore an old DOM from its back/forward cache after another page changes style.
    window.addEventListener('pageshow', event => {
      const storedStyle = read('jy-style');
      if (!event.persisted || !styles.includes(storedStyle)) return;
      style = storedStyle;
      root.dataset.style = style;
      const next = savedPreferences(style, true);
      document.querySelector('[data-accent-choice="' + next.accent + '"]')?.click();
      document.querySelector('[data-mode="' + next.theme + '"]')?.click();
      const language = read('jy-language');
      if (Object.hasOwn(copy, language)) document.querySelector('[data-language="' + language + '"]')?.click();
      sync();
    });
    savePreferences();
    sync();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
