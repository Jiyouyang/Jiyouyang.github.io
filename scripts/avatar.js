'use strict';
const el = id => document.getElementById(id);
const art = el('art');
const labels = [...document.querySelectorAll('[data-t]')];
const translations = {
  en: ['Resources','Avatar Studio','Avatar Studio','Add a flag to your portrait. Photos stay on this device.','Live preview','Drop a photo here or choose an image. Drag the sticker to fine-tune its position.','Original','Choose image','Flag sticker','Palette','Transgender','Rainbow','Nonbinary','Shape','Ripple seal','Ribbon','Position','Bottom right','Bottom left','Top right','Top left','Bottom center','Custom','Sticker size','Download PNG','Choose a readable PNG, JPG or WebP image.','Could not export this image.'],
  ja: ['リソース','アイコン工房','アイコン工房','写真に旗を添えましょう。画像は端末内で処理します。','プレビュー','画像を選ぶか、ここにドロップ。ステッカーはドラッグで移動できます。','元画像','画像を選択','旗ステッカー','配色','トランスジェンダー','レインボー','ノンバイナリー','形状','波形バッジ','リボン','位置','右下','左下','右上','左上','中央下','自由配置','サイズ','PNG を保存','読み込める PNG・JPG・WebP を選んでください。','画像を書き出せませんでした。'],
  'zh-TW': ['資源分享','頭像工坊','頭像工坊','為頭像貼上一枚屬於你的旗幟。照片只在本機處理。','即時預覽','將圖片拖到這裡，或選擇圖片開始。拖曳貼紙可微調位置。','原圖','選擇圖片','旗幟貼紙','配色','跨性別旗','彩虹旗','非二元旗','形狀','波紋徽章','燕尾緞帶','位置','右下','左下','右上','左上','底部置中','自由位置','貼紙大小','下載 PNG','請選擇可讀取的 PNG、JPG 或 WebP 圖片。','圖片無法匯出。']
};
let lang;
try {
  lang = localStorage.getItem('jy-language');
  const mode = localStorage.getItem('jy-theme');
  if (['dark','light'].includes(mode)) document.documentElement.style.colorScheme = mode;
} catch {}
const words = Object.hasOwn(translations,lang) && translations[lang];
if (words) {
  labels.forEach((label,i) => label.textContent = words[i]);
  document.documentElement.lang = lang;
  document.title = words[1] + ' · Jiyouyang';
  art.setAttribute('aria-label',words[4]);
}
const palettes = {
  trans: ['#5bcefa','#f5a9b8','#fff','#f5a9b8','#5bcefa'],
  pride: ['#e64343','#fc9445','#ffe465','#3ba96e','#416bd1','#83438e'],
  nb: ['#ffdf56','#fff','#985bb6','#28252c']
};
let photo = null, revision = 0, center = {x:.8,y:.8}, drag = null;
function geometry(w,h) {
  const width = Math.min(w,h)*Number(el('size').value)/100;
  const height = el('shape').value === 'seal' ? width : width*.62;
  const margin = Math.min(w,h)*.04;
  const pos = el('position').value;
  const fit = (n,r,limit) => Math.max(r, Math.min(limit-r,n));
  if (pos !== 'custom') center = {
    x:pos[1]==='c' ? .5 : pos[1]==='l' ? (margin+width/2)/w : 1-(margin+width/2)/w,
    y:pos[0]==='t' ? (margin+height/2)/h : 1-(margin+height/2)/h
  };
  return {x:fit(center.x*w,width/2,w), y:fit(center.y*h,height/2,h), width,height};
}
function landscape(c,w,h) {
  const sky=c.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,'#adc3ef'); sky.addColorStop(.68,'#ffd2c3'); sky.addColorStop(1,'#f7acae');
  c.fillStyle=sky; c.fillRect(0,0,w,h);
  c.fillStyle='#fff1d4'; c.beginPath(); c.arc(w*.68,h*.33,w*.135,0,2*Math.PI); c.fill();
  ['#958499','#645d80','#413e5b'].forEach((color,i) => {
    c.beginPath(); c.moveTo(0,h);
    for(let x=0;x<=120;x++) c.lineTo(w*x/120,h*(.62+i*.12+.065*Math.sin(x/23+i*2)+.035*Math.sin(x/10+i)));
    c.lineTo(w,h); c.fillStyle=color; c.fill();
  });
}
function render(canvas) {
  const w=canvas.width,h=canvas.height,c=canvas.getContext('2d');
  c.clearRect(0,0,w,h);
  if(photo) c.drawImage(photo,0,0,w,h); else landscape(c,w,h);
  const g=geometry(w,h);
  c.save(); c.translate(g.x,g.y); c.scale(g.width,g.height);
  c.beginPath();
  if(el('shape').value==='seal') {
    for(let i=0;i<=360;i++) {
      const a=i*Math.PI/180,r=.46+.036*Math.cos(12*a);
      c.lineTo(r*Math.cos(a),r*Math.sin(a));
    }
  } else {
    for(const [x,y] of [[-.49,-.46],[.49,-.46],[.34,0],[.49,.46],[-.49,.46],[-.33,0]]) c.lineTo(x,y);
  }
  c.closePath(); c.save(); c.clip();
  const colors=palettes[el('palette').value];
  colors.forEach((color,i)=>{c.fillStyle=color;c.fillRect(-.5,-.5+i/colors.length,1,1/colors.length+.002)});
  c.restore(); c.strokeStyle='#fff'; c.lineWidth=.018; c.stroke(); c.restore();
}
const refresh=()=>render(art);
async function openPhoto(file) {
  if (!file) return;
  const version=++revision;
  const url=URL.createObjectURL(file);
  try {
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)) throw Error();
    const img=new Image(); img.src=url; await img.decode();
    if(version!==revision) return;
    photo=img;
    const scale=Math.min(1,900/Math.max(img.width,img.height));
    art.width=Math.max(1,Math.round(img.width*scale)); art.height=Math.max(1,Math.round(img.height*scale));
    el('dimensions').textContent=img.width+' × '+img.height;
    el('save').disabled=false; el('status').textContent=''; refresh();
  } catch {if(version===revision) el('status').textContent=words?.[25] || '请选择可读取的 PNG、JPG 或 WebP 图片。'}
  finally {URL.revokeObjectURL(url)}
}
el('choose').onclick=()=>el('file').click();
el('file').onchange=e=>{openPhoto(e.target.files[0]);e.target.value=''};
el('drop').ondragover=e=>e.preventDefault();
el('drop').ondrop=e=>{e.preventDefault();openPhoto(e.dataTransfer.files[0])};
for (const id of ['shape','palette','position','size']) el(id).oninput=()=>{el('percent').value=el('size').value+'%';refresh()};
function point(e) {
  const box=art.getBoundingClientRect();
  return {x:(e.clientX-box.left)/box.width,y:(e.clientY-box.top)/box.height};
}
art.onpointerdown=e=>{
  if(drag) return;
  const p=point(e),g=geometry(art.width,art.height);
  if(Math.abs(p.x*art.width-g.x)>g.width/2 || Math.abs(p.y*art.height-g.y)>g.height/2) return;
  drag={id:e.pointerId,x:p.x-g.x/art.width,y:p.y-g.y/art.height};art.setPointerCapture(e.pointerId);
};
art.onpointermove=e=>{
  if(drag?.id!==e.pointerId) return;
  const p=point(e);
  center={x:p.x-drag.x,y:p.y-drag.y}; el('position').value='custom';refresh();
};
art.onlostpointercapture=()=>drag=null;
el('save').onclick=async()=>{
  try {
    const out=document.createElement('canvas');out.width=photo.naturalWidth;out.height=photo.naturalHeight;
    render(out);
    const blob=await new Promise(resolve=>out.toBlob(resolve,'image/png'));
    const url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='jiyouyang-avatar.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
  } catch {el('status').textContent=words?.[26] || '图片导出失败。'}
};
refresh();
