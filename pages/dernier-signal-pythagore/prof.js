/* Tableau de bord du professeur : suivi en direct, chrono commun, QR codes. */
(function(){
const $=id=>document.getElementById(id);
const DATA=window.DONNEES,SHIPS=DATA.ships,ROOMS=window.ROOMS,SYNC=window.SYNC,DEC=window.DEC,COR=window.CORRIGE;
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let CODE="";try{CODE=localStorage.getItem("ds4e-prof-code")||""}catch(e){}
let SES=null,showSol=false,sound=false,seenAsk={};let actx=null;
function beep(){try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();[0,.18].forEach((d,i)=>{const o=actx.createOscillator(),g=actx.createGain();o.frequency.value=i?1100:820;o.connect(g);g.connect(actx.destination);g.gain.setValueAtTime(.18,actx.currentTime+d);g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+d+.16);o.start(actx.currentTime+d);o.stop(actx.currentTime+d+.17)})}catch(e){}}
const P=p=>`sessions/${CODE}/${p}`;
const pens=()=>Object.values(SES&&SES.ships||{}).reduce((s,x)=>s+(x&&x.pen||0),0);
const elapsed=()=>{const c=SES.chrono||{};return(c.base||0)+(c.running?(SYNC.now()-c.startAt)/1000:0)};
const remaining=()=>Math.max(0,(SES.meta.dur||3000)-elapsed()-60*pens());
const step=id=>((SES.ships||{})[id]||{}).step||0;
const allDone=()=>SHIPS.every(s=>step(s.id)>=6);
function newCode(){const a="ABCDEFGHJKMNPQRSTUVWXYZ23456789";let c="";for(let i=0;i<4;i++)c+=a[Math.floor(Math.random()*a.length)];return c}
const fresh=()=>({meta:{dur:3000,askLock:60,created:Date.now()},chrono:{running:false,startAt:0,base:0},ships:{},final:null,log:null});
async function create(){CODE=SYNC.local?"LOCAL":newCode();try{localStorage.setItem("ds4e-prof-code",CODE)}catch(e){}await SYNC.put(P(""),fresh());await SYNC.calibrate(CODE);SES=await SYNC.get(P(""));renderAll()}
async function boot(){
  if(!SYNC.local&&!window.DS_CONFIG.dbUrl&&!new URLSearchParams(location.search).get("db")){}
  if(CODE){await SYNC.calibrate(CODE);SES=await SYNC.get(P("")).catch(()=>null)}
  if(!SES||!SES.meta){if(SYNC.local)return create();return renderStart()}
  renderAll();setInterval(poll,1500);setInterval(tickClock,500);
}
function fbInner(){const cur=SYNC.local?"":SYNC.base;return `<ol class="steps"><li><span>Allez sur <b>console.firebase.google.com</b> et créez un projet (Google Analytics : non).</span></li><li><span>Menu « Build » → <b>Realtime Database</b> → « Créer une base de données » → région <b>Belgique (europe-west1)</b> → démarrer en <b>mode test</b>.</span></li><li><span>Onglet <b>Règles</b> : remplacez tout par le texte ci-dessous, puis « Publier ».</span></li><li><span>Copiez l'adresse de la base (en haut de l'onglet Données, du type <b>https://…firebasedatabase.app</b>) et collez-la ici.</span></li></ol>
   <pre>{ "rules": { "sessions": { "$code": { ".read": true, ".write": true } } } }</pre>
   <div class="row"><input id="dbUrl" style="width:100%;font-size:15px" placeholder="https://mon-projet-default-rtdb.europe-west1.firebasedatabase.app" value="${esc(cur)}"><button class="btn" id="dbSave">Enregistrer et tester</button></div><p id="dbMsg" class="note"></p>${SYNC.local?"":`<button class="btn danger" id="dbOff">Revenir au mode local</button>`}`}
function fbBind(){
  $("dbSave").onclick=async()=>{const u=$("dbUrl").value.trim().replace(/\/$/,"");const m=$("dbMsg");
    if(!SYNC.okdb(u)){m.textContent="Adresse non reconnue : elle doit ressembler à https://xxx.firebasedatabase.app";return}
    m.textContent="Test de la connexion…";try{const r=await fetch(u+"/sessions/test.json",{method:"PUT",body:JSON.stringify({t:Date.now()})});if(!r.ok)throw new Error(r.status);localStorage.setItem("ds4e-db",u);m.textContent="Connexion réussie ✓ Rechargement…";setTimeout(()=>location.reload(),700)}catch(e){m.textContent="Échec ("+e.message+"). Vérifiez l'adresse et les règles (étape 3)."}};
  const off=$("dbOff");if(off)off.onclick=()=>{localStorage.removeItem("ds4e-db");location.reload()};
}
function fbOpen(){$("layer").innerHTML=`<div class="overlay" id="ov"><div class="box wide"><h2>Synchronisation en direct</h2><p class="${SYNC.local?"note":""}" style="margin:6px 0">${SYNC.local?"⚠ Mode local : le jeu ne fonctionne que sur cet appareil.":"✅ Synchronisation en direct branchée."}</p>${fbInner()}<button class="btn" id="closeOv">Fermer</button></div></div>`;fbBind();$("closeOv").onclick=()=>$("layer").innerHTML=""}
function renderStart(){
  const cur=SYNC.local?"":SYNC.base;
  $("app").innerHTML=`<div class="center"><div class="card join" style="max-width:560px"><h1>Dernier <span>Signal</span></h1><p class="tag">Tableau de bord du professeur</p>
  <p class="${SYNC.local?"note":""}" style="margin:6px 0">${SYNC.local?"⚠ Aucune base de synchronisation : le jeu fonctionne sur un seul appareil.":"✅ Synchronisation en direct branchée."}</p>
  <button class="btn primary big" id="newGame">Nouvelle partie</button>
  <div class="homebtns"><a class="btn" href="index.html?apercu=1" target="_blank">Visiter les salles (aperçu + corrigé)</a><a class="btn" href="../../index.html">← Retour au site</a></div>
  <details class="fb" ${SYNC.local?"open":""}><summary>Brancher la synchronisation en direct (Firebase)</summary>${fbInner()}</details></div></div>`;
  $("newGame").onclick=async()=>{await create();setInterval(poll,1500);setInterval(tickClock,500)};
  fbBind();
}
async function poll(){try{const s=await SYNC.get(P(""));if(s&&s.meta){SES=s;renderLive()}}catch(e){}}
function chronoBtn(){const c=SES.chrono;return c.running?"Pause":(c.base>0?"Reprendre":"Démarrer")}
async function toggleChrono(){const c=SES.chrono;let n;if(c.running)n={running:false,startAt:0,base:elapsed()};else n={running:true,startAt:SYNC.now(),base:c.base||0};SES.chrono=n;await SYNC.put(P("chrono"),n);renderLive()}
function tickClock(){if(!SES)return;const c=$("clock");if(c){c.textContent=fmt(remaining());c.classList.toggle("low",remaining()<=300&&(SES.chrono.running||SES.chrono.base>0))}}
function url(id){const d=location.href.split("?")[0].replace(/prof\.html$/,"");return `${d}index.html?s=${CODE}${id?"&v="+id:""}${SYNC.local?"":"&db="+encodeURIComponent(SYNC.base)}`}
function renderAll(){
  $("app").innerHTML=`<header class="ptop"><div><p class="tag">Flotte Hélios · Opération Pythagore</p><h1>Dernier <span>Signal</span></h1></div>
   <div class="pcode"><span class="tag">Code de la partie</span><b id="pcode">${CODE}</b></div>
   <div class="pclock"><div class="clock" id="clock">--:--</div><div class="tag" id="pen"></div></div>
   <div class="pctl"><button class="btn primary" id="play"></button><select id="dur" class="btn"><option value="2400">40 min</option><option value="2700">45 min</option><option value="3000">50 min</option><option value="3300">55 min</option><option value="3600">60 min</option></select><button class="btn ${SYNC.local?"primary":""}" id="fbBtn">🔗 Synchronisation${SYNC.local?" ⚠":" ✓"}</button><button class="btn" id="qrBtn">QR codes</button><select id="askLock" class="btn" title="Brouillage des écrans après une demande d'indice"><option value="30">Brouillage 30 s</option><option value="60">Brouillage 60 s</option><option value="90">Brouillage 90 s</option><option value="120">Brouillage 2 min</option></select><button class="btn" id="snd">🔕 Son</button><a class="btn" href="index.html?apercu=1" target="_blank" style="text-decoration:none">Visiter les salles</a><button class="btn" id="solBtn">Solutions</button><button class="btn" id="noteBtn">Notes</button><button class="btn danger" id="reset">Nouvelle partie</button></div></header>
   ${SYNC.local?`<div class="alert" style="--c:#ffb454"><div class="alh"><b>⚠ Mode local</b> : les téléphones des élèves ne seront pas vus ici. <button class="btn primary" id="fbBan">Brancher la synchronisation (Firebase)</button></div></div>`:""}<div id="alerts"></div><div class="pgrid"><section><div class="scene" id="hero"></div><div class="card" id="reactor"></div><div class="card"><div class="tag">Journal de bord</div><ul id="log" class="log"></ul></div></section><section id="ships" class="ships"></section></div><div id="layer"></div>`;
  $("play").onclick=toggleChrono;$("dur").onchange=async e=>{SES.meta.dur=+e.target.value;await SYNC.patch(P("meta"),{dur:+e.target.value});renderLive()};
  $("qrBtn").onclick=qr;$("noteBtn").onclick=notes;$("fbBtn").onclick=fbOpen;if($("fbBan"))$("fbBan").onclick=fbOpen;$("solBtn").onclick=()=>{showSol=!showSol;$("solBtn").classList.toggle("primary",showSol);renderLive()};
  let armed=false;$("reset").onclick=()=>{if(!armed){armed=true;$("reset").textContent="Confirmer ?";setTimeout(()=>{armed=false;$("reset").textContent="Nouvelle partie"},3000);return}create()};
  $("dur").value=String(SES.meta.dur);$("askLock").value=String(SES.meta.askLock||60);$("askLock").onchange=async e=>{SES.meta.askLock=+e.target.value;await SYNC.patch(P("meta"),{askLock:+e.target.value})};$("snd").onclick=()=>{sound=!sound;$("snd").textContent=sound?"🔔 Son activé":"🔕 Son";if(sound)beep()};renderLive();
}
const frn=n=>String(n).replace(".",",");
function notes(){
  const rows=SHIPS.map(s=>{const o=(SES.ships||{})[s.id]||{},c=SCORE.calc(SES.ships||{},s.id),hu=String(o.hu||"").split(",").filter(Boolean),n1=hu.filter(x=>x.endsWith("1")).length,n2=hu.filter(x=>x.endsWith("2")).length;
    return `<tr><td><b style="color:${s.c}">${s.name}</b></td><td>${c.st} / 6</td><td>${n1}</td><td>${n2}</td><td>${o.asks||0}</td><td>−${frn(c.ded/4)}</td><td>+${frn(c.credit/4)} <small class="muted">(${c.bonus} merci${c.bonus>1?"s":""})</small></td><td><button class="btn adjb" data-adj="-1" data-s="${s.id}">−0,25</button> <b>${c.adj>0?"+":""}${frn(c.adj/4)}</b> <button class="btn adjb" data-adj="1" data-s="${s.id}">+0,25</button></td><td><b>${frn(c.note)} / 20</b></td></tr>`}).join("");
  $("layer").innerHTML=`<div class="overlay" id="ov"><div class="box wide"><h2>Notes des groupes</h2><p class="muted">Chaque groupe est noté sur son propre vaisseau : <b>20 / 20</b> s'il répare ses 6 salles sans aide, sinon au prorata des salles réparées. Indice 1 : −0,25 · Indice 2 : −0,25 · Appel au commandant : −0,5. <b>Entraide :</b> un groupe qui a fini regagne +0,25 chaque fois qu'un groupe en difficulté le remercie (jamais au-dessus de ce qu'il a perdu). La colonne « Ajust. » est votre correction manuelle.</p>
   <table class="notes"><thead><tr><th>Groupe</th><th>Salles</th><th>Indice 1</th><th>Indice 2</th><th>Appels</th><th>Aides</th><th>Entraide</th><th>Ajust.</th><th>Note</th></tr></thead><tbody>${rows}</tbody></table><button class="btn" id="closeOv">Fermer</button></div></div>`;
  $("closeOv").onclick=()=>$("layer").innerHTML="";
  $("ov").onclick=async e=>{const b=e.target.closest("[data-adj]");if(!b)return;const id=b.dataset.s,o=(SES.ships=SES.ships||{})[id]=(SES.ships[id]||{});o.adj=(o.adj||0)+(+b.dataset.adj);await SYNC.patch(P("ships/"+id),{adj:o.adj});notes()}
}
function qr(){
  const tiles=[{id:"",name:"Tous",c:"#e8eefc"}].concat(SHIPS).map(s=>`<div class="qr"><b style="color:${s.c}">${s.name}</b><img alt="QR ${s.name}" width="190" height="190" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=6&color=0a1020&bgcolor=ffffff&data=${encodeURIComponent(url(s.id))}"><small>${esc(url(s.id)).replace(/^https?:\/\//,"")}</small></div>`).join("");
  $("layer").innerHTML=`<div class="overlay" id="ov"><div class="box wide"><h2>Rejoindre la partie · code ${CODE}</h2><p class="muted">Chaque groupe scanne le QR de son vaisseau. « Tous » ouvre le choix du vaisseau.</p><div class="qrs">${tiles}</div><button class="btn" id="closeOv">Fermer</button></div></div>`;
  $("closeOv").onclick=()=>$("layer").innerHTML="";
}
function renderLive(){
  if(!$("clock"))return;
  const c=SES.chrono;$("play").textContent=chronoBtn();$("pen").textContent=pens()?`−${pens()} min de pénalités`:(c.running?"Mission en cours":c.base>0?"En pause":"Mission non démarrée");
  const asks=SHIPS.filter(s=>{const o=(SES.ships||{})[s.id];return o&&o.ask&&o.ask.status==="open"}).sort((a,b)=>SES.ships[a.id].ask.t-SES.ships[b.id].ask.t);
  let fresh=false;asks.forEach(s=>{const t=SES.ships[s.id].ask.t;if(!seenAsk[s.id+t]){seenAsk[s.id+t]=1;fresh=true}});
  if(fresh){if(sound)beep();document.title="🔔 Indice demandé · Dernier Signal"}else if(!asks.length)document.title="Dernier Signal · Tableau de bord";
  const al=$("alerts");const keep=document.activeElement&&document.activeElement.dataset&&document.activeElement.dataset.free;
  if(!keep)al.innerHTML=asks.map(s=>{const a=SES.ships[s.id].ask,rm=a.room==="reacteur"?{name:"Réacteur commun",hints:REACTOR_HINTS,part:"le réacteur"}:ROOMS.find(r=>r.id===a.room);const age=Math.round((SYNC.now()-a.t)/1000);
    return `<div class="alert" style="--c:${s.c}"><div class="alh"><span class="bell">🔔</span><b style="color:${s.c}">${s.name.toUpperCase()}</b> demande un indice · <span>${rm.name}</span><span class="muted"> · il y a ${age} s</span></div>
     <div class="alb"><button class="btn" data-rep="m" data-s="${s.id}">Envoyer l'indice 1 (méthode)</button><button class="btn" data-rep="c" data-s="${s.id}">Envoyer l'indice 2 (calcul)</button><button class="btn" data-rep="v" data-s="${s.id}">J'arrive à votre table</button><input data-free="${s.id}" placeholder="Message libre…" style="flex:1;min-width:140px;font-size:15px;width:auto"><button class="btn primary" data-rep="t" data-s="${s.id}">Envoyer</button><button class="mini" data-rep="x" data-s="${s.id}">Ignorer</button></div></div>`}).join("");
  const stp=Object.fromEntries(SHIPS.map(s=>[s.id,step(s.id)]));
  $("hero").innerHTML=DEC.hero(SHIPS,stp,!!SES.final,allDone());
  const done=SHIPS.filter(s=>step(s.id)>=6).length;
  $("reactor").innerHTML=`<div class="tag">Réacteur</div><p class="rstate"><b style="color:${SES.final?"var(--ok)":allDone()?"var(--amber)":"var(--muted)"}">${SES.final?"Rallumé : mission réussie !":allDone()?"Prêt : les groupes se mettent d'accord":done+" / 5 vaisseaux réparés"}</b></p>
   ${showSol?`<p class="sol">Barres : ${SHIPS.map(s=>`<span style="color:${s.c}">${s.name} ${COR.frags[SHIPS.indexOf(s)]}</span>`).join(" · ")}<br>somme ${COR.somme} · a = PGCD = ${COR.pgcd} · b = ${COR.lots} · code = <b>${COR.final}</b></p>`:""}`;
  const now=SYNC.now();
  $("ships").innerHTML=SHIPS.map(s=>{const o=(SES.ships||{})[s.id],st=o?o.step||0:0,hints=(o&&o.asks)||0,sc=SCORE.calc(SES.ships||{},s.id),pend=o&&o.ask&&o.ask.status==="open",idle=o&&o.t?(now-o.t)/60000:0;
    const stuck=o&&st<6&&(SES.chrono.running)&&idle>5;
    const room=st>=6?"Vaisseau réparé":ROOMS[st].name;
    return `<div class="sh ${stuck?"stuck":""} ${pend?"calling":""}" style="--c:${s.c}"><div class="shh"><b style="color:${s.c}">${s.name}</b><span class="tag">${o?(st>=6?"✓ réparé":"salle "+(st+1)+" / 6"):"pas encore connecté"}</span></div>
     <div class="segs">${Array.from({length:6},(_,i)=>`<i class="${i<st?"on":""}${i===st&&o?" cur":""}"></i>`).join("")}</div>
     <div class="shm"><span>${o?esc(room):"—"}</span><span class="muted">${pend?"🔔 ":""}Note ${frn(sc.live)}/20${sc.credit?" (+"+frn(sc.credit/4)+" entraide)":""} · 📞 ${hints} · −${(o&&o.pen)||0} min · ${o&&o.t?(idle<1?"actif":"inactif "+Math.round(idle)+" min"):""}</span></div>
     ${showSol&&st<6?`<div class="sol">Code : <b>${COR.ans[s.id][ROOMS[st].id]}</b></div>`:""}
     <div class="shb"><button class="mini" data-a="up" data-s="${s.id}" title="Débloquer la salle suivante">+1 salle</button><button class="mini" data-a="down" data-s="${s.id}">−1</button></div></div>`}).join("");
  const log=Object.values(SES.log||{}).sort((a,b)=>b.t-a.t).slice(0,10);
  const sn=id=>(SHIPS.find(s=>s.id===id)||{}).name||id;
  $("log").innerHTML=log.map(l=>`<li><span class="muted">${new Date(l.t).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}</span> <b>${sn(l.ship)}</b> ${l.ev==="room"?"a réparé : "+(ROOMS.find(r=>r.id===l.txt)||{}).part:l.ev==="bad"?"code refusé ("+esc(l.txt)+")":l.ev==="ask"?"demande un indice ("+esc(l.txt)+")":l.ev==="reply"?"→ réponse du commandant : "+esc(l.txt):l.ev==="hint"?"indice utilisé ("+esc(l.txt)+")":l.ev==="thx"?"remercie l'équipage "+esc(l.txt)+" pour son aide":l.ev==="join"?"a rejoint la partie":l.ev==="final"?"a rallumé le réacteur !":esc(l.ev)}</li>`).join("")||`<li class="muted">Aucun évènement pour l'instant.</li>`;
  tickClock();
}
const REACTOR_HINTS=window.REACTOR_HINTS;
document.addEventListener("click",async e=>{
  const rp=e.target.closest("[data-rep]");if(rp&&SES){const id=rp.dataset.s,o=SES.ships[id],a=o&&o.ask;if(!a)return;const rm=a.room==="reacteur"?{hints:REACTOR_HINTS}:ROOMS.find(r=>r.id===a.room);let text="",kind=rp.dataset.rep;
    if(kind==="m")text=rm.hints[0];else if(kind==="c")text=rm.hints[1];else if(kind==="v")text="Le commandant arrive à votre table !";else if(kind==="t"){const f=document.querySelector(`[data-free="${id}"]`);text=(f&&f.value||"").trim();if(!text)return}
    const upd=kind==="x"?{status:"seen"}:{status:"answered",reply:{t:SYNC.now(),text,kind}};Object.assign(a,upd);await SYNC.patch(P(`ships/${id}/ask`),upd);
    if(kind!=="x")SYNC.put(P(`log/${SYNC.now()}_${id}r`),{t:SYNC.now(),ship:id,ev:"reply",txt:text.slice(0,70)}).catch(()=>{});renderLive();return}
  const b=e.target.closest(".mini");if(!b||!SES)return;const id=b.dataset.s,o=(SES.ships||{})[id]||{step:0,pen:0};let n=(o.step||0)+(b.dataset.a==="up"?1:-1);n=Math.max(0,Math.min(6,n));
  SES.ships=SES.ships||{};SES.ships[id]=Object.assign(o,{step:n,t:SYNC.now()});await SYNC.patch(P("ships/"+id),{step:n,t:SYNC.now(),pen:o.pen||0});renderLive();
});
boot();
})();
