'use strict';
const el = id => document.getElementById(id);
const art = el('art');
const translations = {
  en: {
    studio:'Avatar Studio', intro:'Fill the canvas with a flag and place your portrait in front. Images stay on this device.',
    preview:'Live preview', hint:'Drop an image here or choose a file. Transparent areas reveal the flag.',
    image:'Foreground image', choose:'Choose image', background:'Flag background', palette:'Palette',
    trans:'Transgender', pride:'Rainbow', nb:'Nonbinary', size:'Foreground size', edit:'Preview tool',
    move:'Move foreground', remove:'Click to remove a color', help:'Click a solid background to remove it. For a complex background, use a cutout with transparency. Drag or use the arrow keys to move.',
    auto:'Removed a connected solid background. Restore foreground to undo.', reset:'Restore foreground', save:'Download PNG', invalid:'Choose a readable PNG, JPG or WebP image.', failed:'Could not export this image.'
  },
  'zh-TW': {
    studio:'頭像工坊', intro:'讓旗幟鋪滿畫布，把你的頭像放在前面。圖片只在本機處理。',
    preview:'即時預覽', hint:'將圖片拖到這裡，或點「選擇圖片」。透明區域會直接透出旗幟。',
    image:'前景圖片', choose:'選擇圖片', background:'旗幟背景', palette:'配色',
    trans:'跨性別旗', pride:'彩虹旗', nb:'非二元旗', size:'前景大小', edit:'預覽操作',
    move:'移動前景', remove:'點選去底色', help:'純色背景可點選移除；複雜背景建議先準備透明底圖片。拖曳前景或用方向鍵調整位置。',
    auto:'已移除相連的純色背景。可點「還原前景」恢復。', reset:'還原前景', save:'下載 PNG', invalid:'請選擇可讀取的 PNG、JPG 或 WebP 圖片。', failed:'圖片無法匯出。'
  },
  ja: {
    studio:'アイコン工房', intro:'旗を背景いっぱいに広げ、その前に画像を配置します。画像は端末内で処理します。',
    preview:'プレビュー', hint:'画像をドロップするか、ファイルを選んでください。透明な部分に旗が表示されます。',
    image:'前景画像', choose:'画像を選択', background:'背景の旗', palette:'配色',
    trans:'トランスジェンダー', pride:'レインボー', nb:'ノンバイナリー', size:'前景の大きさ', edit:'操作',
    move:'前景を移動', remove:'クリックで背景色を消去', help:'単色の背景はクリックで消せます。複雑な背景には切り抜き済みの透過画像が適しています。ドラッグまたは矢印キーで移動できます。',
    auto:'つながった単色の背景を消去しました。「前景を元に戻す」で取り消せます。', reset:'前景を元に戻す', save:'PNG を保存', invalid:'読み込める PNG・JPG・WebP を選んでください。', failed:'画像を書き出せませんでした。'
  }
};
let lang;
try {
  lang = localStorage.getItem('jy-language');
  const mode = localStorage.getItem('jy-theme');
  if (['light','dark'].includes(mode)) document.documentElement.style.colorScheme = mode;
} catch {}
const words = translations[lang] || {};
if (words.studio) {
  for (const label of document.querySelectorAll('[data-t]')) {
    if (words[label.dataset.t]) label.textContent = words[label.dataset.t];
  }
  document.documentElement.lang = lang;
  document.title = words.studio + ' · Jiyouyang';
  art.setAttribute('aria-label',words.preview);
}

const palettes = {
  trans: ['#5bcefa','#f5a9b8','#ffffff','#f5a9b8','#5bcefa'],
  pride: ['#e64343','#fc9445','#ffe465','#3ba96e','#416bd1','#83438e'],
  nb: ['#ffdf56','#fff','#985bb6','#28252c']
};
let photo = null;
let revision = 0;
let center = {x:0.5, y:0.5};
let drag = null;
let sourcePixels;
const mask = document.createElement('canvas');
const maskContext = mask.getContext('2d', {willReadFrequently:true});

function render(canvas) {
  const ctx = canvas.getContext('2d');
  const {width, height} = canvas;
  ctx.clearRect(0, 0, width, height);
  if (photo) {
    const scale = Number(el('size').value) / 100;
    const bounds = [(center.x-scale/2)*width, (center.y-scale/2)*height, scale*width, scale*height];
    ctx.drawImage(photo, ...bounds);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(mask, ...bounds);
  }
  ctx.globalCompositeOperation = 'destination-over';
  const bands = palettes[el('palette').value];
  bands.forEach((color,i) => {
    const top = Math.round(height*i/bands.length);
    ctx.fillStyle = color;
    ctx.fillRect(0, top, width, Math.round(height*(i+1)/bands.length)-top);
  });
  ctx.globalCompositeOperation = 'source-over';
}

// Mark only pixels connected to the selected color. Keep original image data
// for export and limit the working mask to the preview resolution.
function removeColor(x,y,automatic=false) {
  const w = mask.width, h = mask.height;
  if (x < 0 || x >= w || y < 0 || y >= h) return;
  const pixels = sourcePixels.data;
  const erased = maskContext.getImageData(0,0,w,h);
  const start = y*w+x;
  const seed = start*4;
  if (!pixels[seed+3] || erased.data[seed+3]) return;
  const queue = new Uint32Array(w*h);
  let read = 0, count = 0;
  function visit(index) {
    const offset = index*4;
    if (erased.data[offset+3] || !pixels[offset+3]) return;
    for (let channel=0; channel<3; channel++) {
      if (Math.abs(pixels[offset+channel]-pixels[seed+channel])>30) return;
    }
    erased.data[offset+3] = 255;
    queue[count++] = index;
  }
  visit(start);
  while (read<count) {
    const index = queue[read++];
    if (index%w) visit(index-1);
    if (index%w<w-1) visit(index+1);
    if (index>=w) visit(index-w);
    if (index+w<w*h) visit(index+w);
  }
  if (automatic && (count < w*h*.03 || count > w*h*.92)) return false;
  maskContext.putImageData(erased,0,0);
  render(art);
  return true;
}

function restoreForeground() {
  center = {x:0.5,y:0.5};
  drag = null;
  el('status').textContent = '';
  el('size').value = 100;
  el('percent').value = '100%';
  el('edit').value = art.dataset.mode = 'move';
  maskContext.clearRect(0,0,mask.width,mask.height);
  render(art);
}

async function openPhoto(file) {
  if (!file) return;
  const version = ++revision;
  const url = URL.createObjectURL(file);
  try {
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw Error();
    const img = new Image(); img.src = url;
    await img.decode();
    if (version!==revision) return;
    const scale = Math.min(1,1000/Math.max(img.naturalWidth,img.naturalHeight));
    const w = Math.max(1,Math.round(img.naturalWidth*scale));
    const h = Math.max(1,Math.round(img.naturalHeight*scale));
    mask.width = art.width = w;
    mask.height = art.height = h;
    maskContext.drawImage(img,0,0,w,h);
    sourcePixels = maskContext.getImageData(0,0,w,h);
    photo = img;
    restoreForeground();
    const pixels = sourcePixels.data;
    const opaque = !pixels.some((value,index) => index%4===3 && value<250);
    if (opaque) {
      // A consistent color in all four corners is a conservative starting
      // point for a connected background. The restore button keeps this reversible.
      const corners = [w-1,(h-1)*w,w*h-1];
      const uniform = corners.every(i => [0,1,2].every(c => Math.abs(pixels[i*4+c]-pixels[c])<=18));
      if (uniform && removeColor(0,0,true)) {
        el('status').textContent = words.auto || '已移除相连的纯色背景。可点「还原前景」恢复。';
      } else {
        el('size').value = 85;
        el('percent').value = '85%';
        render(art);
      }
    }
    el('dimensions').textContent = img.naturalWidth+' × '+img.naturalHeight;
    for (const id of ['save','size','edit','reset']) el(id).disabled = false;
  } catch {
    if (version===revision) el('status').textContent = words.invalid || '请选择可读取的 PNG、JPG 或 WebP 图片。';
  } finally { URL.revokeObjectURL(url); }
}
el('choose').onclick = () => el('file').click();
el('file').onchange = e => {openPhoto(e.target.files[0]); e.target.value='';};
el('drop').ondragover = e => e.preventDefault();
el('drop').ondrop = e => {e.preventDefault(); openPhoto(e.dataTransfer.files[0]);};
el('palette').oninput = () => render(art);
el('size').oninput = () => {el('percent').value=el('size').value+'%'; render(art);};
el('reset').onclick = restoreForeground;
el('edit').onchange = () => { art.dataset.mode = el('edit').value; };
function point(e) {
  const box = art.getBoundingClientRect();
  return {x:(e.clientX-box.left)/box.width, y:(e.clientY-box.top)/box.height};
}
function move(x,y) {
  center = {x:Math.max(0,Math.min(1,x)), y:Math.max(0,Math.min(1,y))};
  render(art);
}
art.onpointerdown = e => {
  if (!photo || drag) return;
  const p = point(e);
  if (el('edit').value==='remove') {
    const scale = Number(el('size').value)/100;
    removeColor(Math.floor(((p.x-center.x)/scale+0.5)*mask.width),
                Math.floor(((p.y-center.y)/scale+0.5)*mask.height));
    return;
  }
  drag = {id:e.pointerId, x:p.x-center.x, y:p.y-center.y};
  art.setPointerCapture(e.pointerId);
};
art.onpointermove = e => {
  if (drag?.id!==e.pointerId) return;
  const p=point(e);
  move(p.x-drag.x,p.y-drag.y);
};
art.onlostpointercapture = () => { drag=null; };
art.onkeydown = e => {
  const offset = {ArrowUp:[0,-.01], ArrowDown:[0,.01], ArrowLeft:[-.01,0], ArrowRight:[.01,0]}[e.key];
  if (photo && offset) { e.preventDefault(); move(center.x+offset[0],center.y+offset[1]); }
};
el('save').onclick = async () => {
  try {
    const out = document.createElement('canvas');
    out.width = photo.naturalWidth; out.height = photo.naturalHeight;
    render(out);
    const blob = await new Promise(resolve=>out.toBlob(resolve,'image/png'));
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href=url; link.download='jiyouyang-avatar.png'; link.click();
    setTimeout(()=>URL.revokeObjectURL(url),60000);
  } catch { el('status').textContent = words.failed || '图片导出失败。'; }
};
render(art);
