(()=>{
const $=s=>document.querySelector(s),clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v)),range=(v,a,b)=>clamp((v-a)/(b-a)),ease=t=>t*t*(3-2*t);
const home=$('#home'),stage=$('.intro-stage'),screen=$('.intro-screen'),dock=$('.video-dock'),header=$('.site-header'),panel=$('.panel-hero'),prompt=$('.start-prompt'),label=$('.scene-label'),hud=$('#hud-stage'),progress=$('.scroll-progress');
const reduce=matchMedia('(prefers-reduced-motion: reduce)');let disabled=reduce.matches,pending=false;
function wipe(el,p){let points=['0 0','100% 0'];for(let i=10;i>=0;i--){const h=clamp(p*1.22-(i%3)*.065)*100;points.push((i*10)+'% '+h+'%',Math.max(0,i*10-10)+'% '+h+'%')}points.push('0 0');el.style.clipPath=p>=.999?'none':'polygon('+points.join(',')+')'}

const pixelFields=new WeakMap();
function pixelResolve(el,p,index){
  let field=pixelFields.get(el);
  if(!field){const canvas=document.createElement('canvas');canvas.className='pixel-resolve';canvas.setAttribute('aria-hidden','true');el.append(canvas);field={canvas,ctx:canvas.getContext('2d'),width:0,height:0,last:-1};pixelFields.set(el,field)}
  const width=el.offsetWidth+24,height=el.offsetHeight+24;
  if(width!==field.width||height!==field.height){field.canvas.width=width;field.canvas.height=height;field.width=width;field.height=height;field.last=-1}
  const step=Math.round(p*90);
  if(field.last===step)return;field.last=step;
  const ctx=field.ctx;ctx.clearRect(0,0,width,height);
  if(disabled||p<=0||p>=1){field.canvas.hidden=true;return}field.canvas.hidden=false;
  const seed=(x,y)=>{const n=Math.sin(x*127.1+y*311.7+index*19.3)*43758.5453;return n-Math.floor(n)};
  const size=18,cols=Math.ceil((width-24)/size),rows=Math.ceil((height-24)/size);
  ctx.imageSmoothingEnabled=false;
  for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
    const rand=seed(col,row),delay=.10+row/rows*.22+rand*.26;
    const local=range(p,delay,Math.min(.98,delay+.37));
    if(local>=1)continue;
    const x=12+col*size,y=12+row*size,w=Math.min(size,width-12-x),h=Math.min(size,height-12-y);
    if(local<.42){ctx.fillStyle=(row+col)%2?'#171920':'#252831';ctx.fillRect(x,y,w,h)}
    else if(local<.60){ctx.fillStyle=rand>.75?'#ffcc4a':rand>.45?'#c65123':'#633121';ctx.fillRect(x,y,w,h)}
    else{const unit=local<.80?9:4;ctx.fillStyle=rand>.65?'#ffcc4a':'#ff6b1a';for(let sy=0;sy<h;sy+=unit)for(let sx=0;sx<w;sx+=unit){if(seed(col+sx,row+sy)>(local-.60)/.40)ctx.fillRect(x+sx,y+sy,Math.min(unit,w-sx),Math.min(unit,h-sy))}}
  }
  const finish=range(p,.78,.995);
  if(finish>0&&finish<1){for(let i=0;i<12;i++){let rand=seed(i,44),side=i%4,x=side<2?(side?width-15:12):12+rand*(width-24),y=side>=2?(side===2?12:height-15):12+rand*(height-24);let travel=Math.round(finish*12/3)*3;ctx.globalAlpha=1-finish;ctx.fillStyle=i%3?'#ff6b1a':'#ffcc4a';ctx.fillRect(Math.round(x+(side===0?-travel:side===1?travel:0)),Math.round(y+(side===2?-travel:side===3?travel:0)),3,3)}ctx.globalAlpha=1}
}


function characterReveal(){
  if(window.renderBoothStory){window.renderBoothStory(disabled);return;}
  const frame=$('.character-frame'),avatar=$('.about-avatar'),bio=$('.about-text>p:not(.about-links)'),links=$('.about-links'),title=$('#about .section-title');
  const entry=(el,a,b)=>disabled?1:ease(range(innerHeight-el.getBoundingClientRect().top,a,Math.min(b,innerHeight*.7)));
  const portrait=entry(frame,35,375);
  frame.style.transform='translateY('+(Math.round((1-portrait)*36/4)*4)+'px) scale('+(0.94+.06*portrait)+')';frame.style.opacity=clamp(portrait*2);
  pixelResolve(frame,portrait,47);
  const scan=$('.portrait-scan');scan.style.transform='translateY('+(Math.round(portrait*192/4)*4)+'px)';scan.style.opacity=portrait>.02&&portrait<.97?'1':'0';
  $('.character-status').style.opacity=range(portrait,.82,1);
  const tp=entry(title,15,240);title.style.opacity=tp;wipe(title,tp);
  const text=entry(bio,50,430),line=parseFloat(getComputedStyle(bio).lineHeight),rows=Math.ceil(bio.offsetHeight/line),visible=Math.min(bio.offsetHeight,Math.floor(text*(rows+1))*line);
  bio.style.clipPath=text>=1?'none':'inset(0 0 '+Math.max(0,bio.offsetHeight-visible)+'px 0)';bio.style.opacity=text>.02?'1':'0';
  const cursor=$('.terminal-cursor');cursor.style.transform='translateY('+Math.max(0,visible-12)+'px)';cursor.style.opacity=text>.02&&text<.98?'1':'0';
  [...links.querySelectorAll('a')].forEach((a,i)=>{const q=entry(links,45+i*45,225+i*45),offset=Math.round((1-q)*36/4)*4;a.style.transform='translateY('+offset+'px) scale('+(0.94+.06*q)+')';a.style.opacity=q;a.inert=q<.90;a.classList.toggle('socket-lock',q>.82&&q<.99);pixelResolve(a,q,80+i)});
}

function reveal(){document.querySelectorAll('#tools>.panel').forEach(el=>{let r=el.getBoundingClientRect(),p=ease(range(innerHeight-r.top,40,innerHeight*.62));if(disabled)p=1;el.style.opacity=String(clamp(p*2));el.style.transform='translateY('+((1-p)*72)+'px) scale('+(0.94+p*.06)+')';wipe(el,p)});document.querySelectorAll('.tool-card').forEach((el,i)=>{let r=el.getBoundingClientRect(),p=ease(range(innerHeight-r.top,-20+(i%3)*18,480+(i%3)*18));if(disabled)p=1;let shift=Math.round((1-p)*40/4)*4;el.style.opacity=String(p);el.style.transform=p===1?'':'translate('+((i%3-1)*shift)+'px,'+shift+'px) scale('+(0.94+p*.06)+')';el.style.clipPath='none';pixelResolve(el,p,i)});characterReveal();}
function hMarker(p){return !disabled&&p<.75}
function draw(){pending=false;let y=scrollY,vh=innerHeight,vw=innerWidth,p=disabled?1:clamp(y/(home.offsetHeight-vh)),z=ease(range(p,.04,.74));let r=dock.getBoundingClientRect(),sr=stage.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top-sr.top+r.height/2,s=r.width/vw,clip=Math.max(0,(vh-r.height/s)/2);const cover=Math.max(vh/(vw*9/16),vw/(vh*16/9));$('.opening-video').style.transform='scale('+(cover+(1-cover)*z)+')';header.inert=hMarker(p);screen.style.transform='translate('+((cx-vw/2)*z)+'px,'+((cy-vh/2)*z)+'px) scale('+(1+(s-1)*z)+')';screen.style.clipPath='inset('+(clip*z)+'px 0 '+(clip*z)+'px 0)';let h=ease(range(p,.5,.82));header.style.opacity=String(h);header.style.transform='translateY('+(-145*(1-h))+'px)';header.style.pointerEvents=h>.8?'auto':'none';panel.style.opacity=String(ease(range(p,.35,.76)));panel.style.transform='translateY('+((1-h)*30)+'px) scale('+(0.96+.04*h)+')';let elements=[$('.hero-title'),$('.hero-subtitle'),$('.hero-actions')];elements.forEach((el,i)=>{let q=disabled?1:ease(range(p,.60+i*.055,.81+i*.055));el.style.opacity=q;el.style.transform='translateY('+(Math.round((1-q)*32/4)*4)+'px)';wipe(el,q)});prompt.style.opacity=String(1-range(p,.04,.24));label.style.opacity=String(1-range(p,.65,.88));let total=Math.max(1,document.documentElement.scrollHeight-vh);progress.style.transform='scaleX('+clamp(y/total)+')';hud.textContent=p<.75?'STAGE 01 / ENTER THE DARK SIDE':y<home.offsetHeight-100?'STAGE 01 / HERO ASSEMBLED':$('#about').getBoundingClientRect().top<vh*.7?'STAGE 03 / THE SITH LORD':'STAGE 02 / EQUIP YOUR LOADOUT';reveal();}
function schedule(){if(!pending){pending=true;requestAnimationFrame(draw)}}
function toggle(v){disabled=v;document.body.classList.toggle('no-motion',v);$('#motion-toggle').setAttribute('aria-pressed',v);$('#motion-toggle').textContent=v?'MOTION OFF':'MOTION ON';if(v&&!dock.querySelector('video')){let copy=$('.opening-video').cloneNode(true);copy.removeAttribute('autoplay');copy.controls=true;copy.removeAttribute('aria-hidden');dock.removeAttribute('aria-hidden');dock.append(copy)}draw()}
$('#motion-toggle').onclick=()=>toggle(!disabled);reduce.onchange=e=>toggle(e.matches);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);new MutationObserver(schedule).observe($('#tool-grid'),{childList:true});window.renderScroll=draw;window.addEventListener('load',()=>{toggle(disabled);draw()});draw();
})();
