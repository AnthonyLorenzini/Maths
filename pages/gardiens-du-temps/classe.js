/* Écran de classe (vidéoprojecteur) : progression en direct, découvertes, révélation finale. */
(function(){
const G=window.GDT,R=G.rooms,SY=window.SYNC,U=window.GU,SC=window.SCENES;
const $=id=>document.getElementById(id),app=$("app"),fx=$("fx");
let CODE="";try{CODE=localStorage.getItem("gdt-prof-code")||""}catch(e){}
let SES=null,prev=null,queue=[],showing=false;
const P=p=>`sessions/${CODE}/${p}`;
const newCode=()=>{const a="ABCDEFGHJKMNPQRSTUVWXYZ23456789";let c="";for(let i=0;i<4;i++)c+=a[Math.floor(Math.random()*a.length)];return c};

async function boot(){
  if(SY.local)CODE="LOCAL";
  if(CODE){try{SES=await SY.get(P(""))}catch(e){SES=null}}
  if(!SES||!SES.meta)return renderCreate();
  await SY.calibrate(CODE);start()}
function start(){prev=snapshot(SES);renderMain();setInterval(poll,1500);setInterval(clock,500)}

function renderCreate(){
  app.innerHTML=`<div class="center"><div class="card create"><div class="astro"><i></i><i></i><i></i><b></b></div>
  <div class="kick">Écran de classe</div><h1>Les Gardiens du temps</h1>
  <p>Combien d'équipes ?</p><div class="nsel">${[4,5,6,7,8].map(n=>`<button class="btn ${n===8?"solid":""}" data-n="${n}">${n}</button>`).join("")}</div>
  <p class="sub">Les équipes impaires jouent la version <b>${U.SUN} Soleil</b>, les paires la version <b>${U.MOON} Lune</b>.</p></div></div>`;
  app.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>create(+b.dataset.n))}
async function create(n){
  CODE=SY.local?"LOCAL":newCode();try{localStorage.setItem("gdt-prof-code",CODE)}catch(e){}
  await SY.put(P(""),{meta:{game:"gdt",n,created:Date.now()},chrono:{running:false,base:0,startAt:0},ships:{}});
  await SY.calibrate(CODE);SES=await SY.get(P(""));start()}

async function poll(){try{const s=await SY.get(P(""));if(!s||!s.meta)return;SES=s;const now=snapshot(s);detect(prev,now);prev=now;renderGrid()}catch(e){}}
const snapshot=s=>{const o={};U.teams(s.meta.n).forEach(t=>{const x=U.st(s,t.id);o[t.id]={ch:x.ch,fo:x.fo,sceau:!!x.sceau}});return o};
function detect(a,b){if(!a)return;for(const id in b){const t=U.team(id),x=a[id]||{ch:0,fo:0,sceau:false},y=b[id];
  ["chiffres","formes"].forEach(route=>{const k=U.key(route);if(y[k]>x[k]){const nx=G.routes[route][y[k]];
    if(nx)queue.push({t,room:nx,txt:`L'équipe <b style="color:${t.c}">${t.name}</b> entre ${prep(nx)} <b>${R[nx].nom}</b> !`});
    else queue.push({t,room:G.routes[route][2],txt:`L'équipe <b style="color:${t.c}">${t.name}</b> a terminé la ${G.routeNames[route]} !`})}});
  if(y.sceau&&!x.sceau)queue.push({t,room:"sceau",txt:`L'équipe <b style="color:${t.c}">${t.name}</b> a réparé la frise du temps !`,gold:true})}
  pump()}
const prep=r=>({bab:"à",inde:"en",fibo:"à",egy:"en",eucl:"à",arch:"à"})[r];
function pump(){if(showing||!queue.length)return;showing=true;const q=queue.shift();
  const el=document.createElement("div");el.className="toast"+(q.gold?" gold":"");el.style.setProperty("--tc",q.t.c);
  el.innerHTML=`<div class="tsc scene">${SC[q.room]}</div><div class="ttx">${q.txt}</div>`;$("toasts").appendChild(el);
  setTimeout(()=>el.classList.add("out"),3600);setTimeout(()=>{el.remove();showing=false;pump()},4100)}

function renderMain(){
  app.innerHTML=`<div class="wall">
   <header class="top"><div class="brand"><div class="astro sm"><i></i><i></i><i></i><b></b></div><div><div class="kick">La frise du temps</div><h1>Les Gardiens du temps</h1></div></div>
   <div class="code"><div class="kick">Code iPad</div><b>${CODE}</b></div>
   <div class="clockbox"><div class="clock" id="clock">00:00</div><button class="btn" id="cbtn"></button></div></header>
   <div class="grid" id="grid"></div>
   <footer class="foot"><button class="lnk" id="reveal">✦ Révéler le secret à la classe</button><button class="lnk" id="fs">Plein écran</button><button class="lnk" id="reset">Nouvelle partie</button></footer></div>`;
  $("cbtn").onclick=toggleClock;$("reveal").onclick=()=>{if(confirm("Révéler le secret de la frise à toute la classe ?"))finale()};
  $("fs").onclick=()=>{const d=document.documentElement;(d.requestFullscreen||d.webkitRequestFullscreen||(()=>{})).call(d)};
  $("reset").onclick=()=>{if(confirm("Créer une nouvelle partie ? (nouveau code à taper sur l'iPad)")){try{localStorage.removeItem("gdt-prof-code")}catch(e){}location.reload()}};
  renderGrid();clock()}
function renderGrid(){const g=$("grid");if(!g)return;const n=SES.meta.n;
  const tile=(t,room,state,s)=>{const h=((s.hints||{})[room])||0;return `<div class="tile ${state}" style="--tc:${t.c}"><div class="scene">${SC[room]}</div>${state==="done"?'<div class="chk">✓</div>':state==="cur"?`<div class="now">en cours</div>${h?`<div class="hint">${h===2?"💡💡":"💡"}</div>`:""}`:""}<div class="lab">${R[room].nom}</div></div>`};
  g.innerHTML=`<div class="gh"></div><div class="gh">${G.routeNames.chiffres}</div><div class="gh">${G.routeNames.formes}</div><div class="gh">Frise</div>`+
  U.teams(n).map(t=>{const s=U.st(SES,t.id),tot=s.ch+s.fo;
    return `<div class="tl" style="--tc:${t.c}"><span class="tdot"></span><div><div class="tn">${t.name}</div><div class="tv">${U.vIcon(t.v)} ${U.vName(t.v)} · ${tot}/6</div></div></div>
    <div class="trk">${G.routes.chiffres.map((r,i)=>tile(t,r,U.roomState(SES,t.id,"chiffres",i),s)).join("")}</div>
    <div class="trk">${G.routes.formes.map((r,i)=>tile(t,r,U.roomState(SES,t.id,"formes",i),s)).join("")}</div>
    <div class="tile sc ${s.sceau?"done gold":tot>=6?"cur":"locked"}" style="--tc:${t.c}"><div class="scene">${SC.sceau}</div>${s.sceau?'<div class="chk">✓</div>':""}<div class="lab">${s.sceau?"Frise réparée":"Sceau final"}</div></div>`}).join("")}

/* chrono commun (temps écoulé) */
const el=()=>{const c=SES.chrono||{};return(c.base||0)+(c.running?(SY.now()-c.startAt)/1000:0)};
function clock(){const c=$("clock"),b=$("cbtn");if(!c)return;c.textContent=U.fmt(el());b.textContent=(SES.chrono||{}).running?"Pause":el()>0?"Reprendre":"Lancer le chrono"}
async function toggleClock(){const c=SES.chrono||{};const nc=c.running?{running:false,base:el(),startAt:0}:{running:true,base:c.base||0,startAt:SY.now()};SES.chrono=nc;clock();await SY.put(P("chrono"),nc).catch(()=>{})}

/* révélation finale, projetée pour toute la classe */
function finale(){
  const pts=[["bab","1800 av. J.-C.",3],["egy","1650 av. J.-C.",1],["eucl","300 av. J.-C.",4],["arch","250 av. J.-C.",1],["inde","628",5],["fibo","1202",9]];
  fx.innerHTML=`<div class="finale"><button class="x" id="fx-x">×</button><div class="kick">La frise est réparée</div>
   <div class="ftl"><div class="ax"></div>${pts.map(([r,y,d],i)=>`<div class="fp" style="left:${8+i*16.8}%;--rc:${R[r].c}" data-i="${i}"><b>${d}</b><div class="fs scene">${SC[r]}</div><i>${R[r].nom}<br>${y}</i></div>`).join("")}</div>
   <div class="fnum" id="fnum"></div>
   <div class="fpi" id="fpi">π</div>
   <div class="fstory" id="fst"><p>Le savoir arraché à toutes les époques, c'était <b>π</b>, le nombre d'Archimède. Chaque époque en gardait un morceau :
   les Babyloniens l'approchaient par 3 + 1/8 (<b>3,125</b>), les calculs du papyrus d'Ahmès donnent environ <b>3,16</b>, Archimède l'encadre très près de <b>3,14</b>, Fibonacci trouve environ <b>3,1418</b>.</p>
   <p>Aujourd'hui, les ordinateurs en ont calculé plus de cent mille milliards de chiffres… et personne n'a jamais trouvé le dernier.</p>
   <p class="bravo">Bravo, Gardiens du temps : la frise est sauvée !</p></div></div>`;
  $("fx-x").onclick=()=>fx.innerHTML="";
  const fps=fx.querySelectorAll(".fp");let s="";
  fps.forEach((p,i)=>setTimeout(()=>{p.classList.add("lit");s+=pts[i][2];$("fnum").textContent=s},700+i*800));
  setTimeout(()=>{$("fnum").textContent="3,14159…";$("fnum").classList.add("on")},700+6*800+300);
  setTimeout(()=>$("fpi").classList.add("on"),700+6*800+1500);
  setTimeout(()=>$("fst").classList.add("on"),700+6*800+2600)}

boot();
})();
