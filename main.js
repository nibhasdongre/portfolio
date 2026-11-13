document.getElementById('y').textContent=new Date().getFullYear();
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
// filters
const cards=[...document.querySelectorAll('.card')];
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.filters button').forEach(x=>x.classList.toggle('on',x===b));
  cards.forEach(c=>c.classList.toggle('hide',b.dataset.f!=='all'&&!c.dataset.cat.split(' ').includes(b.dataset.f)));
});
// cursor: one glowing violet dot
if(matchMedia('(pointer:fine)').matches){const d=document.getElementById('dot');document.body.classList.add('cur');
  addEventListener('pointermove',e=>{d.style.opacity=1;d.style.transform=`translate(${e.clientX}px,${e.clientY}px)`});
  document.addEventListener('mouseleave',()=>d.style.opacity=0)}
// project visuals
const P={v:'#6B4EFF',p:'#ff7a9c',c:'#5ee3c5',a:'#ffc46b',b:'#8fa8ff',t:'#c9c7d6'};
const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(7);
const pts=Array.from({length:40},()=>({x:rnd(),y:rnd(),a:rnd()*6.28,k:rnd()}));
const dot=(g,x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,6.28);g.fill()};
const tx=(g,s,x,y,c=P.t,al='left')=>{g.font='11px "IBM Plex Mono",monospace';g.fillStyle=c;g.textAlign=al;g.fillText(s,x,y)};
const leg=(g,it,x,y)=>it.forEach(([s,c],i)=>{dot(g,x,y+i*17-4,4,c);tx(g,s,x+11,y+i*17)});
const cl=v=>Math.max(0,Math.min(1,v)),ez=x=>x*x*(3-2*x),lp=(a,b,f)=>a+(b-a)*f;
const rb=(g,x,y,w,h,c,a=1)=>{g.globalAlpha=a;g.fillStyle=c;g.beginPath();g.roundRect?g.roundRect(x,y,w,h,Math.min(5,h/2)):g.rect(x,y,w,h);g.fill();g.globalAlpha=1};
const em=(g,e,x,y,s,a=1)=>{g.globalAlpha=a;g.font=s+'px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(e,x,y);g.globalAlpha=1};
const ring=(g,x,y,r,c,a=1,lw=2)=>{g.strokeStyle=c;g.lineWidth=lw;g.globalAlpha=a;g.beginPath();g.arc(x,y,r,0,6.28);g.stroke();g.globalAlpha=1};
const along=(A,p)=>{const L=[];let s=0;for(let i=1;i<A.length;i++){const l=Math.hypot(A[i][0]-A[i-1][0],A[i][1]-A[i-1][1]);L.push(l);s+=l}let d=p*s;for(let i=0;i<L.length;i++){if(d<=L[i]||i===L.length-1){const f=cl(d/L[i]);return[lp(A[i][0],A[i+1][0],f),lp(A[i][1],A[i+1][1],f)]}d-=L[i]}};
const VZ={
 /* 1: brand doc lands in a network, 3 nearest creators come out as profiles */
 graph(g,w,h,t){const T=7,cy=Math.floor(t/T),ph=t%T,rn=k=>{const x=Math.sin(k*127.1)*43758.5;return x-Math.floor(x)},C3=[P.p,P.a,P.b],EM=['😎','🤩','📸','🎤','🎮','🎬'];
  const N=pts.slice(0,24).map((o,i)=>({x:w*(.06+.56*o.x)+Math.sin(t*.8+o.a)*3,y:h*(.14+.72*o.y)+Math.cos(t*.9+o.a)*3,c:C3[i%3]}));
  const D={x:w*(.14+.4*rn(cy*2+1)),y:h*(.28+.44*rn(cy*2+2))};
  const near=N.map((n,i)=>[Math.hypot(n.x-D.x,n.y-D.y),i]).sort((a,b)=>a[0]-b[0]).slice(0,3).map(a=>a[1]);
  const d=ez(cl(ph)),hl=ez(cl((ph-1.3)/.5)),out=ez(cl((ph-2.8)/1.2)),fade=1-cl(ph-6);
  g.lineWidth=1;g.strokeStyle='rgba(143,168,255,.2)';
  N.forEach((a,i)=>N.forEach((b,j)=>{if(j>i&&Math.hypot(a.x-b.x,a.y-b.y)<w*.15){g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}}));
  near.forEach(i=>{g.strokeStyle=P.c;g.lineWidth=2;g.globalAlpha=hl*(1-out);g.beginPath();g.moveTo(D.x,D.y);g.lineTo(N[i].x,N[i].y);g.stroke();g.globalAlpha=1});
  N.forEach((n,i)=>{const k=near.indexOf(i);if(k<0){dot(g,n.x,n.y,5,n.c);return}
   const x=lp(n.x,w*.84,out),y=lp(n.y,h*(.2+.3*k),out),a=out>0?fade:1;
   g.globalAlpha=a;dot(g,x,y,5+3*hl+14*out,hl>.5&&out<.3?P.c:n.c);g.globalAlpha=1;if(out>.4)em(g,EM[(k+cy)%6],x,y,26*out,a)});
  if(out<1)em(g,'📄',D.x,lp(-20,D.y,d),26,1-out)},
 /* 2: doc enters the box, four parallel paths, cost tracking, package out */
 agent(g,w,h,t){const ph=t%8,cy=h/2,sx=w*.24,jx=w*.62,mx=(sx+jx)/2,L=[P.p,P.a,P.c,P.b],IC=['✏️','🎙️','🔎','🎨'];
  g.strokeStyle='rgba(255,255,255,.28)';g.lineWidth=1.5;g.beginPath();g.roundRect?g.roundRect(w*.15,h*.06,w*.55,h*.88,14):g.rect(w*.15,h*.06,w*.55,h*.88);g.stroke();
  L.forEach((c,i)=>{const ly=h*(.17+.22*i),A=[[sx,cy],[sx+w*.06,ly],[jx-w*.06,ly],[jx,cy]],p=cl((ph-1.4-i*.25)/2.6);
   g.strokeStyle=c;g.globalAlpha=.4;g.lineWidth=2;g.beginPath();A.forEach((q,k)=>k?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();g.globalAlpha=1;
   g.globalAlpha=p>.45?.95:.3;dot(g,mx,ly,17,c);g.globalAlpha=1;em(g,IC[i],mx,ly,18);
   if(p>0&&p<1){const q=along(A,p);dot(g,q[0],q[1],4,'#fff')}});
  const all=ez(cl((ph-4.2)/.4)),pk=ez(cl((ph-4.8)/1.7));
  g.globalAlpha=.3*all;dot(g,jx,cy,18,P.c);g.globalAlpha=1;ring(g,jx,cy,18,all>.5?P.c:'rgba(255,255,255,.5)');em(g,'💲',jx,cy,17);
  em(g,'📄',lp(w*.05,sx,ez(cl(ph/1.1))),cy,26,1-cl((ph-1.2)/.4));
  if(ph>4.6)em(g,'📦',lp(jx,w*.9,pk),cy,30,cl((ph-4.6)/.3)*(1-cl(ph-7.2)))},
 /* 3: sliding pictures: regression, clustering, classification */
 price(g,w,h,t){const pos=t/3.2,i0=Math.floor(pos),o=i0+ez(cl((pos-i0-.78)/.22)),px=w*.1,pw=w*.8,py=h*.08,pH=h*.74;
  const X=u=>px+pw*(.06+.88*u),Y=v=>py+pH*(.06+.88*v);
  for(let k=0;k<3;k++){let x=((k-o)%3+3)%3;if(x>1.5)x-=3;if(Math.abs(x)>=1)continue;
   g.save();g.translate(x*w,0);rb(g,px,py,pw,pH,'rgba(255,255,255,.04)');g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=1.5;g.strokeRect(px,py,pw,pH);
   if(k===0){g.strokeStyle='rgba(255,255,255,.25)';g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(0),Y(1));g.lineTo(X(1),Y(1));g.stroke();
    g.strokeStyle='#fff';g.setLineDash([6,5]);g.beginPath();g.moveTo(X(0),Y(.85));g.lineTo(X(1),Y(.2));g.stroke();g.setLineDash([]);
    pts.slice(0,32).forEach(q=>{const r=(q.k-.5)*.28;dot(g,X(q.x),Y(.85-.65*q.x+r)+Math.sin(t*2+q.a)*2,Math.abs(r)>.11?5.5:4,Math.abs(r)>.11?P.p:P.b)})}
   else if(k===1){[[.25,.3,P.p],[.7,.35,P.a],[.45,.75,P.c]].forEach(c=>{g.globalAlpha=.13;dot(g,X(c[0]),Y(c[1]),pH*.27,c[2]);g.globalAlpha=1});
    pts.slice(0,30).forEach((q,i)=>{const c=[[.25,.3,P.p],[.7,.35,P.a],[.45,.75,P.c]][i%3];dot(g,X(c[0]+(q.x-.5)*.3+Math.sin(t+q.a)*.01),Y(c[1]+(q.y-.5)*.34),4.5,c[2])});
    [[.25,.3],[.7,.35],[.45,.75]].forEach(c=>ring(g,X(c[0]),Y(c[1]),7,'#fff',.9,2))}
   else{g.fillStyle=P.p;g.globalAlpha=.09;g.beginPath();g.moveTo(X(0),Y(0));g.lineTo(X(1),Y(0));g.lineTo(X(1),Y(.7));g.lineTo(X(0),Y(.3));g.fill();g.fillStyle=P.c;g.beginPath();g.moveTo(X(0),Y(.3));g.lineTo(X(1),Y(.7));g.lineTo(X(1),Y(1));g.lineTo(X(0),Y(1));g.fill();g.globalAlpha=1;
    g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(X(0),Y(.3));g.lineTo(X(1),Y(.7));g.stroke();
    pts.slice(0,30).forEach(q=>{const b=.3+.4*q.x,up=q.y<b,v=up?Math.min(q.y,b-.09):Math.max(q.y,b+.09);if(up)dot(g,X(q.x),Y(v)+Math.sin(t*2+q.a)*2,4.5,P.p);else rb(g,X(q.x)-4,Y(v)-4+Math.sin(t*2+q.a)*2,9,9,P.c)})}
   g.restore()}
  const cur=((Math.round(o)%3)+3)%3;[0,1,2].forEach(i=>dot(g,w/2+(i-1)*16,h*.93,i===cur?5:3.5,i===cur?P.v:'rgba(255,255,255,.3)'))},
 /* 4: pdf is split into text and images, stored in a database, shown live on a monitor */
 catalog(g,w,h,t){const ph=t%9,cy=h/2,pdx=w*.1,dbx=w*.45,mx0=w*.66,mw=w*.28,mh=h*.5,my=cy-mh/2-h*.04,fo=1-cl((ph-8.3)/.6),pw=w*.12,pH=h*.56,pa=1-ez(cl((ph-1.4)/.6));
  rb(g,pdx-pw/2,cy-pH/2,pw,pH,'#e8e6f0',pa);rb(g,pdx-pw/2,cy-pH/2,pw,10,P.p,pa);[0,1,2].forEach(i=>rb(g,pdx-pw/2+8,cy-pH/2+20+i*14,pw-16-i*8,6,'#8b8fa3',pa));rb(g,pdx-pw/2+8,cy+pH*.08,pw-16,pH*.28,P.a,pa);
  const dbw=w*.11,dbh=h*.5,e=dbw*.2,dt=cy-dbh/2;
  for(let k=0;k<3;k++){const y0=dt+k*dbh/3,lit=ph>2.8+k*.7;g.fillStyle=lit?'rgba(107,78,255,.75)':'rgba(107,78,255,.2)';g.beginPath();g.rect(dbx-dbw/2,y0+e/2,dbw,dbh/3);g.fill();g.strokeStyle=P.v;g.lineWidth=2;g.beginPath();g.ellipse(dbx,y0+e/2+dbh/3,dbw/2,e,0,0,3.1416);g.stroke()}
  g.fillStyle='rgba(107,78,255,.9)';g.beginPath();g.ellipse(dbx,dt+e/2,dbw/2,e,0,0,6.29);g.fill();g.strokeStyle=P.v;g.beginPath();g.moveTo(dbx-dbw/2,dt+e/2);g.lineTo(dbx-dbw/2,dt+dbh+e/2);g.moveTo(dbx+dbw/2,dt+e/2);g.lineTo(dbx+dbw/2,dt+dbh+e/2);g.stroke();
  [[P.b,34,8],[P.p,22,22],[P.b,30,8],[P.a,22,22],[P.b,26,8]].forEach((c,i)=>{const f1=ez(cl((ph-1.2)/.8)),f2=ez(cl((ph-2.2-i*.25)/.9));if(ph<1.2||f2>=1)return;
   const x=lp(lp(pdx,pdx+w*.1+(i%2)*w*.03,f1),dbx,f2),y=lp(lp(cy-h*.22+i*h*.11,cy-h*.25+i*h*.12,f1),dt-4,f2),s=1-.6*f2;rb(g,x-c[1]*s/2,y-c[2]*s/2,c[1]*s,c[2]*s,c[0])});
  for(let j=0;j<3;j++){const p=cl((ph-4.6-j*.25)/.8);if(p>0&&p<1)dot(g,lp(dbx+dbw/2+6,mx0,p),cy,4,P.v)}
  g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=3;g.beginPath();g.roundRect?g.roundRect(mx0,my,mw,mh,8):g.rect(mx0,my,mw,mh);g.stroke();g.beginPath();g.moveTo(mx0+mw/2,my+mh);g.lineTo(mx0+mw/2,my+mh+10);g.moveTo(mx0+mw*.3,my+mh+10);g.lineTo(mx0+mw*.7,my+mh+10);g.stroke();
  if(ph>5.2){rb(g,mx0+6,my+6,mw-12,8,P.v,fo);dot(g,mx0+mw-14,my+10,3.5,P.c);
   [P.p,P.a,P.c,P.b].forEach((c,j)=>{const s=ez(cl((ph-5.4-j*.3)/.4)),cx=mx0+8+(j%2)*(mw/2-4),cyy=my+22+Math.floor(j/2)*(mh/2-10),cw=mw/2-16,ch=mh/2-20;rb(g,cx,cyy,cw*s,ch*s,'rgba(255,255,255,.1)',fo);rb(g,cx+3,cyy+3,(cw-6)*s,ch*.55*s,c,fo)});
   g.fillStyle=P.c;g.globalAlpha=(.5+.5*Math.sin(t*5))*fo;g.beginPath();g.arc(mx0+mw-14,my+10,6,0,6.28);g.globalAlpha=.25*fo;g.fill();g.globalAlpha=1}},
 /* 5: video to audio to transcript to sentiment */
 wave(g,w,h,t){const ph=t%8,cy=h*.44,X=[.12,.37,.62,.87].map(v=>v*w),s=Math.min(w*.15,60),cyc=Math.floor(t/8)%3,act=i=>ez(cl((ph-i*1.6)/.5));
  for(let i=0;i<3;i++){const a=X[i]+s*.62,b=X[i+1]-s*.62;g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=2;g.beginPath();g.moveTo(a,cy);g.lineTo(b,cy);g.moveTo(b-7,cy-6);g.lineTo(b,cy);g.lineTo(b-7,cy+6);g.stroke();
   const f=cl((ph-i*1.6-.5)/1);if(f>0&&f<1)dot(g,lp(a,b,f),cy,4,'#fff')}
  let a=act(0);rb(g,X[0]-s/2,cy-s*.4,s,s*.8,P.p,.3+.7*a);g.fillStyle='#fff';g.beginPath();g.moveTo(X[0]-s*.1,cy-s*.18);g.lineTo(X[0]+s*.16,cy);g.lineTo(X[0]-s*.1,cy+s*.18);g.fill();
  a=act(1);for(let i=0;i<7;i++){const v=.35+.65*Math.abs(Math.sin(t*5+i*1.3))*a;rb(g,X[1]-s/2+i*s/7,cy-s*.4*v,s/10,s*.8*v,P.v,.35+.65*a)}
  a=act(2);for(let i=0;i<4;i++)rb(g,X[2]-s/2,cy-s*.36+i*s*.22,s*(i===3?.6:1)*(.25+.75*a),7,P.b,.3+.7*a);
  a=act(3);ring(g,X[3],cy,s*.5,[P.c,P.a,P.p][cyc],.3+.7*a,3);em(g,['😊','😐','😟'][cyc],X[3],cy,s*.6*a,a);
  const gw=s*1.6,gx=X[3]-gw/2,gy=cy+s*.8,gr=g.createLinearGradient(gx,0,gx+gw,0);gr.addColorStop(0,P.p);gr.addColorStop(.5,P.a);gr.addColorStop(1,P.c);
  g.globalAlpha=.3+.7*a;g.fillStyle=gr;g.beginPath();g.roundRect?g.roundRect(gx,gy,gw,8,4):g.rect(gx,gy,gw,8);g.fill();g.globalAlpha=1;dot(g,gx+gw*lp(.5,[.88,.5,.12][cyc],a),gy+4,7,'#fff')}
};
document.querySelectorAll('canvas[data-v]').forEach(cv=>{
  const g=cv.getContext('2d'),f=VZ[cv.dataset.v];let w,h,on=false,t0=performance.now();
  const frame=n=>{g.clearRect(0,0,w,h);f(g,w,h,n)};
  const size=()=>{const d=devicePixelRatio||1;w=cv.clientWidth;h=cv.clientHeight;if(!w)return;cv.width=w*d;cv.height=h*d;g.setTransform(d,0,0,d,0,0);frame(5.6)};
  const loop=n=>{if(!on)return;frame((n-t0)/1000);requestAnimationFrame(loop)};
  new ResizeObserver(size).observe(cv);
  if(!calm)new IntersectionObserver(e=>{on=e[0].isIntersecting;if(on)requestAnimationFrame(loop)}).observe(cv);
});
/* =========================================================
   Skill constellation — force-directed, draggable graph
   ========================================================= */

const GROUPS = [
  { name: 'Programming & Data', color: '#6B4EFF', skills: ['Python', 'SQL', 'NumPy', 'pandas', 'EDA', 'Feature Eng.', 'matplotlib', 'seaborn'] },
  { name: 'Machine Learning', color: '#ff7a9c', skills: ['Classification', 'Regression', 'Clustering', 'Tuning', 'Model Eval', 'scikit-learn'] },
  { name: 'Mathematics', color: '#ffc46b', skills: ['Statistics', 'Probability', 'Linear Algebra'] },
];
const CROSS = [
  ['Python', 'pandas'], ['Python', 'scikit-learn'], ['pandas', 'Feature Eng.'], ['SQL', 'Feature Eng.'], ['NumPy', 'Linear Algebra'],
  ['Statistics', 'Model Eval'], ['Probability', 'Classification'], ['Statistics', 'Regression'], ['Clustering', 'Feature Eng.'],
  ['matplotlib', 'EDA'], ['seaborn', 'EDA'], ['Tuning', 'Model Eval'],
];
const TAU = Math.PI * 2;
function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function initSkills(canvas, { onCount } = {}) {
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1;
  let nodes = [], links = [];
  const byName = {};
  const mouse = { x: -999, y: -999, in: false };
  let hover = null, drag = null, focusGroup = -1;
  const packets = [];

  function build() {
    nodes = []; links = [];
    const R = Math.min(w, h) * 0.3;
    GROUPS.forEach((g, gi) => {
      const a = (gi / GROUPS.length) * TAU - Math.PI / 2;
      const hub = { id: g.name, label: g.name, hub: true, group: gi, x: w / 2 + Math.cos(a) * R, y: h / 2 + Math.sin(a) * R, vx: 0, vy: 0, r: 7 };
      nodes.push(hub); byName[g.name] = hub;
      g.skills.forEach((s, si) => {
        const b = a + (si - g.skills.length / 2) * 0.35;
        const n = { id: s, label: s, group: gi, x: hub.x + Math.cos(b) * 60, y: hub.y + Math.sin(b) * 60, vx: 0, vy: 0, r: 3.6 };
        nodes.push(n); byName[s] = n;
        links.push({ a: hub, b: n, len: Math.min(w, h) * 0.13, cross: false });
      });
    });
    for (let i = 0; i < GROUPS.length; i++) {
      links.push({ a: byName[GROUPS[i].name], b: byName[GROUPS[(i + 1) % GROUPS.length].name], len: Math.min(w, h) * 0.42, cross: false, ring: true });
    }
    CROSS.forEach(([a, b]) => byName[a] && byName[b] && links.push({ a: byName[a], b: byName[b], len: Math.min(w, h) * 0.3, cross: true }));
    onCount && onCount(nodes.filter((n) => !n.hub).length);
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  const neighbors = (n) => {
    const s = new Set([n]);
    links.forEach((l) => { if (l.a === n) s.add(l.b); if (l.b === n) s.add(l.a); });
    return s;
  };

  function step() {
    const k = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = Math.random(); dy = Math.random(); d2 = 1; }
        const d = Math.sqrt(d2);
        const f = Math.min(1200 / d2, 4) * k;
        a.vx += (dx / d) * f; a.vy += (dy / d) * f; b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
      }
    }
    for (const l of links) {
      const dx = l.b.x - l.a.x, dy = l.b.y - l.a.y, d = Math.hypot(dx, dy) || 1;
      const s = l.cross ? 0.0006 : l.ring ? 0.002 : 0.006;
      const f = (d - l.len) * s;
      l.a.vx += (dx / d) * f; l.a.vy += (dy / d) * f; l.b.vx -= (dx / d) * f; l.b.vy -= (dy / d) * f;
    }
    for (const n of nodes) {
      n.vx += (w / 2 - n.x) * 0.0008; n.vy += (h / 2 - n.y) * 0.0008;
      if (mouse.in && !drag) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 90 && d > 0) { n.vx += (dx / d) * (1 - d / 90) * 0.6; n.vy += (dy / d) * (1 - d / 90) * 0.6; }
      }
      if (n === drag) { n.x += (mouse.x - n.x) * 0.35; n.y += (mouse.y - n.y) * 0.35; n.vx = n.vy = 0; continue; }
      n.vx *= 0.82; n.vy *= 0.82;
      n.x = Math.max(20, Math.min(w - 20, n.x + n.vx));
      n.y = Math.max(20, Math.min(h - 36, n.y + n.vy));
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);

    ctx.save(); ctx.translate(w / 2, h / 2);
    for (let i = 1; i <= 3; i++) {
      ctx.strokeStyle = `rgba(255,255,255,${0.035 - i * 0.006})`; ctx.setLineDash([2, 8]); ctx.lineDashOffset = t * (i % 2 ? 10 : -10);
      ctx.beginPath(); ctx.arc(0, 0, Math.min(w, h) * (0.16 * i), 0, TAU); ctx.stroke();
    }
    ctx.restore(); ctx.setLineDash([]);

    const hl = hover ? neighbors(hover) : null;
    const isLit = (n) => (hl ? hl.has(n) : focusGroup >= 0 ? n.group === focusGroup : true);

    for (const l of links) {
      const lit = hl ? hl.has(l.a) && hl.has(l.b) && (l.a === hover || l.b === hover) : focusGroup >= 0 ? l.a.group === focusGroup && l.b.group === focusGroup : true;
      const col = GROUPS[l.b.group].color;
      ctx.strokeStyle = lit ? rgba(col, l.cross ? 0.35 : 0.5) : 'rgba(255,255,255,0.04)';
      ctx.lineWidth = lit && hl ? 1.4 : 1;
      if (l.cross) ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(l.a.x, l.a.y); ctx.lineTo(l.b.x, l.b.y); ctx.stroke();
      ctx.setLineDash([]);
    }

    if (!reduced && Math.random() < 0.25 && packets.length < 30) {
      const l = links[Math.floor(Math.random() * links.length)];
      packets.push({ l, t: 0, s: 0.008 + Math.random() * 0.012 });
    }
    ctx.globalCompositeOperation = 'lighter';
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i]; p.t += p.s;
      if (p.t >= 1) { packets.splice(i, 1); continue; }
      const x = p.l.a.x + (p.l.b.x - p.l.a.x) * p.t, y = p.l.a.y + (p.l.b.y - p.l.a.y) * p.t;
      const col = GROUPS[p.l.b.group].color;
      ctx.fillStyle = rgba(col, isLit(p.l.a) ? 0.9 : 0.15);
      ctx.beginPath(); ctx.arc(x, y, 1.4, 0, TAU); ctx.fill();
    }

    for (const n of nodes) {
      const col = GROUPS[n.group].color;
      const lit = isLit(n);
      const r = n.r * (n === hover ? 1.6 : 1);
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * (n.hub ? 6 : 4));
      g.addColorStop(0, rgba(col, lit ? 0.45 : 0.08)); g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, r * (n.hub ? 6 : 4), 0, TAU); ctx.fill();
      ctx.fillStyle = rgba(col, lit ? 1 : 0.25);
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, TAU); ctx.fill();
      if (n.hub) {
        ctx.strokeStyle = rgba(col, lit ? 0.6 : 0.15); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 5 + Math.sin(t * 2 + n.group) * 2, 0, TAU); ctx.stroke();
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    for (const n of nodes) {
      const lit = isLit(n);
      ctx.font = n.hub ? '700 12px "Space Grotesk", sans-serif' : '500 10.5px "IBM Plex Mono", monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillStyle = n.hub ? (lit ? '#eceef6' : 'rgba(236,238,246,.25)') : (lit ? 'rgba(236,238,246,.9)' : 'rgba(236,238,246,.15)');
      ctx.fillText(n.label, n.x, n.y + n.r + (n.hub ? 10 : 5));
    }
  }

  const pos = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
  canvas.addEventListener('pointermove', (e) => {
    pos(e); mouse.in = true;
    if (!drag) {
      hover = null;
      let best = 22;
      for (const n of nodes) { const d = Math.hypot(n.x - mouse.x, n.y - mouse.y); if (d < best) { best = d; hover = n; } }
    }
  });
  canvas.addEventListener('pointerdown', (e) => {
    pos(e);
    if (hover) { drag = hover; canvas.setPointerCapture(e.pointerId); }
  });
  const release = () => { drag = null; };
  canvas.addEventListener('pointerup', release);
  canvas.addEventListener('pointercancel', release);
  canvas.addEventListener('pointerleave', () => { mouse.in = false; hover = null; });

  let rt;
  new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(resize, 80); }).observe(canvas);
  resize();

  let visible = false;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '100px' }).observe(canvas);

  if (reduced) {
    for (let i = 0; i < 300; i++) step();
    draw(0);
    const redraw = () => draw(0);
    canvas.addEventListener('pointermove', redraw);
  } else {
    for (let i = 0; i < 120; i++) step();
    const start = performance.now();
    (function loop(now) {
      requestAnimationFrame(loop);
      if (!visible) return;
      step();
      draw((now - start) / 1000);
    })(start);
  }

  return {
    focus(i) { focusGroup = i; if (reduced) draw(0); },
  };
}

initSkills(document.getElementById('skillCanvas'));