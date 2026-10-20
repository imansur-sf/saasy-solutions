(()=>{
'use strict';
const $=s=>document.querySelector(s),clamp=(t,a=0,b=1)=>Math.max(a,Math.min(b,t)),part=(t,a,b)=>clamp((t-a)/(b-a)),smooth=t=>t*t*(3-2*t),lerp=(a,b,t)=>a+(b-a)*t;
const about=$('#about'),stage=$('.about-stage'),canvas=$('.booth-cutscene'),ctx=canvas.getContext('2d'),frame=$('.character-frame'),avatar=$('.about-avatar'),bio=$('.about-text>p:not(.about-links)'),links=[...document.querySelectorAll('.about-links a')],caption=$('.story-caption'),title=$('#about .section-title'),status=$('.character-status');
const civilianPhoto=$('.civilian-portrait'),mosaic=document.createElement('canvas'),mosaicCtx=mosaic.getContext('2d');
const sheet=new Image();sheet.src='assets/imran-walk-sprites.png';let storyHeight=0,lastPhase='',lastDisabled=false;
function measure(){const h=stage.offsetHeight;if(h!==storyHeight){storyHeight=h;about.style.setProperty('--story-height',h+'px')}}
function fill(x,y,w,h,color){ctx.fillStyle=color;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
function label(text,x,y,size=10,color='#ffcc4a'){ctx.fillStyle=color;ctx.font=size+'px "Press Start 2P"';ctx.textAlign='center';ctx.fillText(text,Math.round(x),Math.round(y))}
function seed(i){const n=Math.sin(i*91.7+42.3)*48271.19;return n-Math.floor(n)}
function sprite(kind,index,x,ground,height,alpha=1,scale=1){if(!sheet.complete||!sheet.naturalWidth||alpha<=0)return;const sourceW=sheet.naturalWidth/4,sourceH=sheet.naturalHeight/2,w=height*.75*scale,h=height*scale;ctx.save();ctx.globalAlpha=alpha;ctx.imageSmoothingEnabled=false;ctx.drawImage(sheet,index*sourceW,kind*sourceH,sourceW,sourceH,Math.round(x-w/2),Math.round(ground-h*.94),Math.round(w),Math.round(h));ctx.restore()}
function booth(x,ground,w,h,open,glow,front){let left=x-w/2,top=ground-h;const k=w/138;ctx.save();ctx.translate(Math.round(left),Math.round(top));ctx.scale(k,k);if(!front){fill(-6,290,150,10,'#07090d');fill(0,8,138,278,'#591a22');fill(8,40,122,238,'#0a1119');fill(12,48,114,226,'#15232d');fill(19,56,100,210,'#10202b');for(let i=0;i<3;i++){fill(20+i*35,55,2,207,'#254451')}fill(30,78,24,40,'#46545b');fill(35,84,14,22,'#141922');fill(38,112,9,18,'#a5a6a2');if(glow){ctx.globalAlpha=glow;fill(12,48,114,226,'#9e2026');fill(35,58,66,206,'#ed373a');ctx.globalAlpha=1}fill(-5,0,148,34,'#38141c');fill(0,0,138,26,'#af3338');fill(8,5,122,17,'#ded4ae');label('PHONE',69,17,9,'#3a191a');fill(0,28,10,250,'#ca4544');fill(128,28,10,250,'#79242a');fill(0,278,138,10,'#d14a40');fill(7,288,124,6,'#1a1117')}
else{let dw=118*(1-open);fill(10,35,dw,242,'#bd3b3e');fill(15,40,Math.max(0,dw-10),231,'#091722');if(dw>8){for(let row=0;row<4;row++)for(let col=0;col<2;col++){fill(18+col*dw*.47,44+row*54,Math.max(1,dw*.42-3),46,glow>.3?'#982e31':'#233f4b');fill(21+col*dw*.47,46+row*54,Math.max(1,dw*.1),42,'#ffffff0d')}fill(10+dw-11,159,4,16,'#e7bb62')}fill(8,32,4,247,'#ff6c5a')}
ctx.restore()}
function explosion(x,y,p,radius){if(p<=0||p>=1)return;ctx.save();const out=part(p,0,.75),fade=1-part(p,.55,1);for(let i=0;i<65;i++){const angle=seed(i)*Math.PI*2,speed=(.35+seed(i+80))*(radius*1.45),distance=speed*smooth(out),size=Math.max(3,Math.round((5+seed(i+160)*15)*(1-p*.5)/3)*3);ctx.globalAlpha=fade*(.5+seed(i+30)*.5);fill(x+Math.cos(angle)*distance,y+Math.sin(angle)*distance+p*p*radius*.32,size,size,['#ffcc4a','#ff6b1a','#cb3531','#a45632','#41414b'][i%5])}ctx.globalAlpha=fade;for(let i=0;i<12;i++){const a=i/12*Math.PI*2,dist=out*radius*.58,s=radius*(.13+seed(i+240)*.15)*(1+out*.5);fill(x+Math.cos(a)*dist-s/2,y+Math.sin(a)*dist-s/2,s,s,i%3?'#2f2930':'#5c3330')}ctx.globalAlpha=(1-part(p,.1,.52))*.9;let s=radius*(.25+out*.55);fill(x-s/2,y-s/2,s,s,'#ff6b1a');fill(x-s/4,y-s/4,s/2,s/2,'#ffcc4a');ctx.restore()}
function debris(x,ground,w,h,p){if(p<=0||p>=1)return;ctx.save();ctx.globalAlpha=1-part(p,.55,1);for(let i=0;i<7;i++){const sign=i%2?1:-1,px=x+sign*p*(80+seed(i)*130),py=ground-h*.58-p*(100+seed(i+5)*80)+p*p*170;ctx.save();ctx.translate(px,py);ctx.rotate(sign*p*(1+i*.2));fill(-w*.08,-h*.14,w*.16,h*.28,i%2?'#9a3036':'#e0604c');fill(-w*.04,-h*.11,w*.08,h*.22,'#1a2d37');ctx.restore()}ctx.restore()}
function setProfile(q){const line=parseFloat(getComputedStyle(bio).lineHeight),rows=Math.ceil(bio.offsetHeight/line),visible=Math.min(bio.offsetHeight,Math.floor(q*(rows+1))*line);bio.style.opacity=q>.01?'1':'0';bio.style.clipPath=q>=1?'none':'inset(0 0 '+Math.max(0,bio.offsetHeight-visible)+'px 0)';const cursor=$('.terminal-cursor');cursor.style.opacity=q>.01&&q<.99?'1':'0';cursor.style.transform='translateY('+Math.max(0,visible-12)+'px)';links.forEach((a,i)=>{const t=part(q,.42+i*.12,.70+i*.12);a.style.opacity=t;a.style.transform='translateY('+(Math.round((1-t)*28/4)*4)+'px) scale('+(0.94+.06*t)+')';a.inert=t<.95;a.classList.toggle('socket-lock',t>.8&&t<.99);const old=a.querySelector('.pixel-resolve');if(old)old.hidden=true})}
window.renderBoothStory=function(disabled){
lastDisabled=disabled;measure();const vw=innerWidth,vh=innerHeight,span=Math.max(1,about.offsetHeight-stage.offsetHeight),p=disabled?1:clamp((scrollY-about.offsetTop)/span);window.boothProgress=p;
const rect=frame.getBoundingClientRect(),sr=stage.getBoundingClientRect(),targetX=rect.left+rect.width/2,targetGround=rect.bottom-sr.top;
frame.style.transform='none';frame.style.opacity='1';frame.querySelectorAll('.pixel-resolve').forEach(c=>c.hidden=true);$('.portrait-scan').style.opacity='0';title.style.opacity='1';title.style.clipPath='none';
civilianPhoto.style.opacity=disabled?'0':String(1-part(p,.07,.085));civilianPhoto.setAttribute('aria-hidden',disabled||p>=.195?'true':'false');
const portrait=smooth(part(p,.89,.97));avatar.style.opacity=portrait;avatar.style.clipPath=portrait>=1?'none':'inset('+(100-Math.floor(portrait*12)/12*100)+'% 0 0 0)';status.style.opacity=part(p,.96,1);frame.style.outlineColor=p<.88?'#ff6b1a55':'#ff6b1a00';setProfile(smooth(part(p,.90,1)));
const phase=p<.075?'IMRAN MANSUR // SCROLL TO GO OFF-SCRIPT':p<.17?'REAL WORLD → PIXEL WORLD':p<.26?'STEPPING OUT OF THE FRAME':p<.445?'NEXT STOP: A CHANGE OF ALLEGIANCE':p<.54?'PLEASE HOLD. ALTER EGO LOADING…':p<.68?'DARK SIDE UNLOCKED':p<.88?'YOUR SITH LORD HAS ARRIVED':p<.97?'TAKING MY RIGHTFUL PLACE':'PROFILE READY // LINKS UNLOCKED';if(phase!==lastPhase){caption.textContent=phase;lastPhase=phase}caption.style.opacity=disabled?'0':String(1-part(p,.98,1));$('.story-controls').style.opacity=disabled?'0':'1';
if(disabled){ctx.clearRect(0,0,canvas.width,canvas.height);return}
const cw=Math.ceil(vw/2),ch=Math.ceil(vh/2);if(canvas.width!==cw||canvas.height!==ch){canvas.width=cw;canvas.height=ch}ctx.setTransform(.5,0,0,.5,0,0);ctx.clearRect(0,0,vw,vh);ctx.imageSmoothingEnabled=false;
if(p>=1)return;
const mobile=vw<641,ground=Math.min(vh-120,targetGround+(mobile?80:112)),height=mobile?170:264,bh=mobile?235:318,bw=bh*138/294,boothX=mobile?vw*.76:vw*.69,cycle=Math.floor(p*120)%4,door=1-smooth(part(p,.44,.49)),glow=part(p,.48,.54)*(1-part(p,.56,.62)),blast=part(p,.53,.685);
// The source portrait remains untouched; its live rendering becomes coarse pixels.
if(p>=.07&&p<.195&&civilianPhoto.complete&&civilianPhoto.naturalWidth){
  const q=part(p,.07,.17),cells=[100,66,40,25,16,10][Math.min(5,Math.floor(q*6))],size=Math.min(civilianPhoto.naturalWidth,civilianPhoto.naturalHeight);
  if(mosaic.width!==cells){mosaic.width=cells;mosaic.height=cells}
  mosaicCtx.imageSmoothingEnabled=false;mosaicCtx.clearRect(0,0,cells,cells);mosaicCtx.drawImage(civilianPhoto,(civilianPhoto.naturalWidth-size)/2,(civilianPhoto.naturalHeight-size)/2,size,size,0,0,cells,cells);
  ctx.save();ctx.globalAlpha=1-part(p,.14,.195);ctx.imageSmoothingEnabled=false;ctx.drawImage(mosaic,Math.round(rect.left+4),Math.round(rect.top-sr.top+4),rect.width-8,rect.height-8);ctx.restore();
  for(let i=0;i<18;i++){const progress=part(p,.1,.23),x=rect.left+seed(i)*rect.width,y=rect.top-sr.top+seed(i+32)*rect.height;ctx.globalAlpha=(1-progress)*progress*2;fill(x+(seed(i+70)-.5)*progress*45,y-progress*26,4,4,i%3?'#ff6b1a':'#ffcc4a')}ctx.globalAlpha=1;
}
ctx.globalAlpha=part(p,.17,.27)*(1-part(p,.83,.94))*.8;for(let x=24;x<vw-20;x+=12)fill(x,ground+5,8,3,'#68574a');ctx.globalAlpha=1;
const boothOpacity=part(p,.12,.22);
if(p<.565){ctx.save();ctx.globalAlpha=boothOpacity;booth(boothX,ground,bw,bh,door,glow,false);ctx.restore()}
if(p>.14&&p<.485){
 const step=smooth(part(p,.17,.255)),walk=part(p,.255,.445),startX=targetX+(mobile?16:36),x=lerp(lerp(targetX,startX,step),boothX,walk),feet=lerp(targetGround-7,ground,step),h=lerp(185,height,step),alpha=part(p,.14,.185)*(1-part(p,.445,.482));
 sprite(0,cycle,x,feet-(p>.24?cycle%2*2:0),h,alpha);
}
if(p<.565){ctx.save();ctx.globalAlpha=boothOpacity;booth(boothX,ground,bw,bh,door,glow,true);ctx.restore()}
if(p>.53&&p<.70){debris(boothX,ground,bw,bh,part(p,.535,.70));explosion(boothX,ground-bh*.5,blast,bh*.65)}
if(p>.625){const across=smooth(part(p,.68,.87)),dock=smooth(part(p,.87,.945)),x=lerp(boothX,targetX,across),feet=lerp(ground,targetGround-7,dock),alpha=part(p,.625,.68)*(1-part(p,.915,.97));sprite(1,p<.87?cycle:0,x,feet-(p<.87?cycle%2*2:0),height,alpha,lerp(1,185/height,dock));}

};
$('#story-replay').onclick=()=>{scrollTo({top:about.offsetTop,behavior:'instant'});window.renderScroll()};$('#story-skip').onclick=()=>{measure();scrollTo({top:about.offsetTop+about.offsetHeight-stage.offsetHeight,behavior:'instant'});window.renderScroll()};sheet.onload=()=>window.renderScroll();civilianPhoto.addEventListener('load',()=>window.renderScroll());new ResizeObserver(()=>{measure();window.renderScroll()}).observe(stage);window.addEventListener('load',()=>{measure();window.renderScroll()});measure();window.renderScroll();
})();
