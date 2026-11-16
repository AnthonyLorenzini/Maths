/* Page joueur : un téléphone par groupe. */
(function(){
const $=id=>document.getElementById(id);
const DATA=window.DONNEES,SHIPS=DATA.ships,ROOMS=window.ROOMS,SYNC=window.SYNC,DEC=window.DEC;
const qs=new URLSearchParams(location.search);
let CODE=(qs.get("s")||"").toUpperCase();if(!CODE&&SYNC.local)CODE="LOCAL";
if(!CODE){try{CODE=(localStorage.getItem("ds4e-code")||"").toUpperCase()}catch(e){}}
let SID=qs.get("v")||"";if(!SID){try{SID=localStorage.getItem("ds4e-ship:"+CODE)||""}catch(e){}}
let SES=null,ME=null,view="join",lastWrite=0,busy=false,overlayShown="";
const ship=id=>SHIPS.find(s=>s.id===id);
const fr=n=>String(n).replace(".",",");
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=v=>String(v||"").trim().replace(/\s+/g,"").replace(",",".").replace(/\.0+$/,"");
async function sha(room,sid,ans){const b=new TextEncoder().encode(`${DATA.salt}|${room}|${sid}|${ans}`);const h=await crypto.subtle.digest("SHA-256",b);return[...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join("")}
const P=p=>`sessions/${CODE}/${p}`;
const store=(k,v)=>{const key=`ds4e:${CODE}:${SID}:${k}`;if(v===undefined){try{return JSON.parse(localStorage.getItem(key))}catch(e){return null}}try{localStorage.setItem(key,JSON.stringify(v))}catch(e){}};

/* ---------- chrono partagé ---------- */
const pens=()=>Object.values(SES&&SES.ships||{}).reduce((s,x)=>s+(x&&x.pen||0),0);
function elapsed(){const c=SES.chrono||{};return(c.base||0)+(c.running?(SYNC.now()-c.startAt)/1000:0)}
const remaining=()=>SES?Math.max(0,(SES.meta&&SES.meta.dur||3000)-elapsed()-60*pens()):0;
const started=()=>!!(SES&&SES.chrono&&(SES.chrono.running||SES.chrono.base>0));
const allDone=()=>SYNC.local?ME.step>=6:SHIPS.every(s=>((SES.ships||{})[s.id]||{}).step>=6);

/* ---------- écritures ---------- */
function log(ev,txt){SYNC.put(P(`log/${SYNC.now()}_${SID}`),{t:SYNC.now(),ship:SID,ev,txt:txt||""}).catch(()=>{})}
function writeMe(extra){lastWrite=Date.now();const o=Object.assign({step:ME.step,pen:ME.pen||0,t:SYNC.now()},extra||{});SES.ships=SES.ships||{};SES.ships[SID]=Object.assign(SES.ships[SID]||{},o);return SYNC.patch(P("ships/"+SID),o).catch(()=>{})}
function addPen(){ME.pen=(ME.pen||0)+1;writeMe()}

/* ---------- démarrage ---------- */
async function boot(){
  if(!CODE){view="join";return renderJoin()}
  await SYNC.calibrate(CODE);
  if(SYNC.local&&!(await SYNC.get(P("meta")))){await SYNC.put(P(""),{meta:{dur:3000,created:Date.now()},chrono:{running:false,startAt:0,base:0},ships:{}})}
  SES=await SYNC.get(P("")).catch(()=>null);
  if(!SES||!SES.meta){document.body.innerHTML=`<div class="center"><div class="card"><h2>Partie introuvable</h2><p>Le code « ${esc(CODE)} » n'existe pas (ou plus). Scannez de nouveau le QR code du professeur.</p><button class="btn" onclick="try{localStorage.removeItem('ds4e-code')}catch(e){};location.href=location.pathname">Changer de code</button></div></div>`;return}
  try{localStorage.setItem("ds4e-code",CODE)}catch(e){}
  if(!ship(SID)){view="join";return renderJoin()}
  try{localStorage.setItem("ds4e-ship:"+CODE,SID)}catch(e){}
  SES.ships=SES.ships||{};ME=SES.ships[SID]||{step:0,pen:0};ME.step=ME.step||0;ME.pen=ME.pen||0;
  if(!SES.ships[SID]){await writeMe();log("join",ship(SID).name)}
  view=pickView();render();setInterval(poll,2500);setInterval(hudTick,1000);document.addEventListener("visibilitychange",()=>{if(!document.hidden)poll()})
}
function pickView(){
  if(SES.final)return ME.step>=6?"reactor":"done";
  if(ME.step>=6)return allDone()?"reactor":"done";
  if(!store("brief"))return"brief";
  return"room";
}
async function poll(){
  if(!SES||busy)return;
  let s;try{s=await SYNC.get(P(""))}catch(e){return}
  if(!s||!s.meta)return;
  const mine=(s.ships||{})[SID];
  SES=s;SES.ships=SES.ships||{};
  if(mine&&Date.now()-lastWrite>4000&&mine.step!==ME.step){ME.step=mine.step||0;ME.pen=mine.pen||0;view=pickView();render();return}
  if(mine&&Date.now()-lastWrite>4000)ME.pen=mine.pen||0;
  const was=view;
  if(view==="done"&&allDone())view="reactor";
  if(view==="brief"&&started()&&$("goBtn"))$("goBtn").disabled=false,$("wait")&&($("wait").textContent="Le professeur a lancé la mission !");
  hud();
  if(was!==view)render();
  endCheck();
}

/* ---------- affichage ---------- */
function hud(){
  const t=$("clock");if(!t||!SES)return;
  t.textContent=started()||true?fmt(remaining()):"";t.classList.toggle("low",remaining()<=300&&started());
  const run=SES.chrono&&SES.chrono.running;$("state").textContent=SES.final?"Mission réussie":!started()?"En attente du départ":run?"Mission en cours":"En pause";
  /* carte de la flotte */
  let s="";const X=i=>16+i*31;s+=`<line x1="${X(0)}" y1="64" x2="${X(6)}" y2="64" stroke="var(--line)" stroke-width="2"/>`;
  ["Sas","Labo","Mach.","Navig.","Comms","Serre","Réact."].forEach((L,i)=>{s+=`<circle cx="${X(i)}" cy="64" r="5" fill="${i===6&&SES.final?"var(--ok)":"var(--panel2)"}" stroke="var(--muted)"/><text x="${X(i)}" y="85" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-size="8" fill="var(--muted)">${L}</text>`});
  const stack={};SHIPS.forEach(sh=>{const st=Math.min(((SES.ships[sh.id]||{}).step)||0,6);const k=stack[st]=(stack[st]||0)+1;s+=`<circle cx="${X(st)}" cy="${56-k*10}" r="${sh.id===SID?5.5:4.2}" fill="${sh.c}" ${sh.id===SID?'stroke="#fff" stroke-width="1.5"':""}><title>${sh.name}</title></circle>`});
  $("map").innerHTML=s;
}
function hudTick(){if(!SES)return;hud();endCheck()}
function endCheck(){
  if(SES.final&&overlayShown!=="win"){overlayShown="win";overlay(`<div class="big">🛰️</div><h2 style="color:var(--ok)">Signal rétabli</h2><p>Le réacteur est rallumé. La flotte rentre sur Terre avec <b style="color:var(--amber)">${fmt(remaining())}</b> d'avance.</p><p>Débrief : quelles salles demandaient d'<b>additionner</b> des carrés, et lesquelles de <b>soustraire</b> ? Comment le saviez-vous ?</p>`)}
  else if(!SES.final&&started()&&remaining()<=0&&overlayShown!=="lose"){overlayShown="lose";overlay(`<div class="big">📡</div><h2 style="color:var(--bad)">Signal perdu</h2><p>Le temps est écoulé.</p>`)}
}
function overlay(h){$("layer").innerHTML=`<div class="overlay"><div class="box">${h}<button class="btn" id="closeOv">Fermer</button></div></div>`}
function flash(t){const d=document.createElement("div");d.className="flash";d.innerHTML=`<div>${t}</div>`;document.body.appendChild(d);setTimeout(()=>d.remove(),1400)}
function toast(t){const d=document.createElement("div");d.className="toast";d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),1900)}

function render(){
  const s=ship(SID);
  $("shipPill").innerHTML=s?`<span class="pill" style="color:${s.c}">${s.name}</span>`:"";
  hud();
  const st=$("stage");
  if(view==="join")return renderJoin();
  if(view==="brief")st.innerHTML=renderBrief(s);
  else if(view==="room")st.innerHTML=renderRoom(s);
  else if(view==="done")st.innerHTML=renderDone(s);
  else st.innerHTML=renderReactor(s);
  bindStage();window.scrollTo({top:0});
}
function renderJoin(){
  document.querySelector(".top")&&(document.querySelector(".top").style.display="none");
  const c=!SYNC.local&&!CODE;
  $("stage").innerHTML=`<div class="center"><div class="card join"><h1>Dernier <span>Signal</span></h1><p class="tag">Opération Pythagore</p>
   ${c?`<p>Entrez le code de la partie affiché par le professeur.</p><form id="codeForm"><input id="codeIn" placeholder="Code de la partie" autocapitalize="characters" autocomplete="off" maxlength="8"><button class="btn primary" type="submit">Valider</button></form>`
   :`<p>Choisissez le vaisseau de votre équipage.</p><div class="shipsel">${SHIPS.map(s=>`<button class="btn" style="border-color:${s.c};color:${s.c}" data-pick="${s.id}">${s.name}</button>`).join("")}</div>`}</div></div>`;
  const f=$("codeForm");if(f)f.addEventListener("submit",e=>{e.preventDefault();const v=$("codeIn").value.trim().toUpperCase();if(v)location.href=location.pathname+"?s="+encodeURIComponent(v)});
}
function renderBrief(s){
  return `<div class="brief"><div class="scene">${DEC.hero(SHIPS,Object.fromEntries(SHIPS.map(x=>[x.id,0])),false,false)}</div>
  <div class="card"><h2 style="color:${s.c}">Équipage ${s.name}</h2>
  <p><b>Flotte Hélios, an 2147.</b> Une tempête solaire a frappé les 5 vaisseaux. Le réacteur est éteint. Chaque équipage répare son vaisseau, salle par salle, avec ce qu'il a appris en maths. Puis les 5 équipages rallument le réacteur ensemble.</p>
  <ul class="rules"><li>Un seul téléphone pour le groupe. <b>Répartissez-vous le travail</b> : chacun calcule un poste.</li><li>Vous avez la calculatrice et le cahier de brouillon.</li><li class="bad">Mauvais code ou indice : <b>−1 min pour toute la flotte</b>.</li><li>Le réacteur a besoin de <b>tous les équipages</b>. Aidez ceux qui sont en retard !</li></ul>
  <p class="tag">Rôles conseillés</p><p class="muted">Lecteur · Calculateur · Vérificateur · Scribe · Chef de bord (tape le code)</p>
  <button class="btn primary big" id="goBtn" ${started()||SYNC.local?"":"disabled"}>Prêts, on décolle !</button><p class="tag" id="wait">${started()||SYNC.local?"":"En attente du professeur…"}</p></div></div>`;
}
function renderRoom(s){
  const r=ROOMS[ME.step],sv=store("room:"+r.id)||{};
  const hintOpen=(SES.ships[SID].hints||{})[r.id];
  const decor=DEC[r.id==="sas"?"sas":r.id==="labo"?"labo":r.id==="machines"?"machines":r.id==="nav"?"nav":r.id==="comms"?"comms":"serre"];
  const scene=r.id==="sas"?decor(s.c,s.d.sas):r.id==="machines"?decor(s.c,[1,1,1,1]):decor(s.c);
  const postes=r.postes(s).map(p=>`<label class="poste"><span>${p.label}</span><span class="fld"><input inputmode="decimal" data-p="${p.id}" value="${esc(sv[p.id]??"")}" autocomplete="off"><em>${p.unit}</em></span>${p.bad?`<label class="bad"><input type="checkbox" data-bad="${p.id}" ${sv["b"+p.id.slice(1)]?"checked":""}> plaque fausse</label>`:""}</label>`).join("");
  return `<div class="head"><h2>${r.name}</h2><span class="tag">Salle ${ME.step+1} / 6 · ${r.chap}</span></div>
  <p class="story"><b>Journal de bord.</b> ${r.story}</p>
  <div class="scene">${scene}</div>
  <div class="repair"><span class="tag" style="color:var(--amber)">On répare : ${r.part}</span></div>
  ${r.docs(s)}
  ${postes?`<div class="card carnet"><div class="tag">Carnet de calculs · chacun prend un poste</div>${postes}</div>`:""}
  <div class="bar">
   ${hintOpen?`<div class="hint">💡 ${r.hint}</div>`:`<button class="btn" id="hintBtn">Indice (−1 min)</button>`}
   <form class="answer" id="ansForm"><label for="code">Code de la salle</label><div class="row"><input id="code" inputmode="numeric" autocomplete="off" spellcheck="false" placeholder="Code"><button class="btn primary" type="submit">Valider</button></div><p class="rules">Mauvais code : −1 min pour toute la flotte</p></form>
  </div>`;
}
function renderDone(s){
  const others=SHIPS.filter(x=>x.id!==SID).map(x=>{const st=((SES.ships[x.id]||{}).step)||0;return `<li><span style="color:${x.c}">${x.name}</span> <span class="muted">${st>=6?"vaisseau réparé":"salle "+Math.min(st+1,6)+" / 6"}</span></li>`}).join("");
  return `<div class="brief"><div class="scene">${DEC.hero(SHIPS,Object.fromEntries(SHIPS.map(x=>[x.id,((SES.ships[x.id]||{}).step)||0])),false,false)}</div>
  <div class="card center2"><div class="big">✅</div><h2 style="color:${s.c}">Vaisseau réparé !</h2>
  <p>Votre barre d'énergie :</p><div class="frag" style="color:${s.c}">${s.frag}<small> min</small></div>
  <p><b>Notez ce nombre !</b> Le réacteur a besoin des 5 barres. Allez les chercher auprès des autres équipages, et aidez ceux qui sont en retard.</p>
  <ul class="others">${others}</ul><p class="tag">Le réacteur s'ouvrira quand les 5 vaisseaux seront réparés.</p></div></div>`;
}
function renderReactor(s){
  const sv=store("reactor")||{};
  const fields=SHIPS.map(x=>`<label class="poste"><span style="color:${x.c}">Barre de ${x.name}</span><span class="fld"><input inputmode="decimal" data-r="${x.id}" value="${x.id===SID?s.frag:esc(sv[x.id]??(SYNC.local?x.frag:""))}" ${x.id===SID?"readonly":""}><em>min</em></span></label>`).join("");
  const fin=SES.final;
  return `<div class="brief"><div class="head"><h2>Réacteur commun</h2><span class="tag">Les 5 équipages ensemble</span></div>
  <div class="scene">${DEC.hero(SHIPS,Object.fromEntries(SHIPS.map(x=>[x.id,6])),!!fin,true)}</div>
  <div class="card"><p class="story" style="margin:0"><b>Journal de bord.</b> Chaque vaisseau rapporte sa barre d'énergie (un temps de charge en minutes). Mettez les 5 nombres en commun.</p>
  <ol class="rules"><li>Chaque barre est découpée en <b>tronçons identiques</b>, les plus longs possible, <b>sans reste</b>. Longueur d'un tronçon : <b>a</b> minutes.</li><li>Nombre total de tronçons : <b>b</b>.</li><li>Le cœur du réacteur est un triangle rectangle dont les côtés de l'angle droit mesurent <b>a dm</b> et <b>b dm</b>.</li></ol>
  <p><b>Le code est la longueur de l'hypoténuse, en dm.</b></p></div>
  <div class="card carnet"><div class="tag">Carnet de calculs · les 5 barres</div>${fields}
  <label class="poste"><span>a : longueur d'un tronçon</span><span class="fld"><input inputmode="decimal" data-r="a" value="${esc(sv.a??"")}"><em>min</em></span></label>
  <label class="poste"><span>b : nombre de tronçons</span><span class="fld"><input inputmode="decimal" data-r="b" value="${esc(sv.b??"")}"><em></em></span></label></div>
  ${fin?`<div class="card center2"><div class="big">🛰️</div><h2 style="color:var(--ok)">Réacteur rallumé</h2></div>`:`<div class="bar">${(SES.ships[SID].hints||{}).reacteur?`<div class="hint">💡 Décompose les 5 nombres en facteurs premiers : les facteurs communs donnent le plus grand tronçon. Puis Pythagore avec a et b.</div>`:`<button class="btn" id="hintBtn">Indice (−1 min)</button>`}
   <form class="answer" id="ansForm"><label for="code">Code du réacteur</label><div class="row"><input id="code" inputmode="numeric" autocomplete="off" placeholder="Code"><button class="btn primary" type="submit">Valider</button></div><p class="rules">Mauvais code : −1 min pour toute la flotte</p></form></div>`}</div>`;
}

/* ---------- interactions ---------- */
function stageSave(room,key,val){const o=store(room)||{};o[key]=val;store(room,o)}
function updateSuggest(){
  if(view!=="room")return;const r=ROOMS[ME.step],s=ship(SID),sv=store("room:"+r.id)||{};
  const v=r.suggest(sv,s);const c=$("code");if(c&&v!=null&&!c.dataset.edited){c.value=Math.round(v*100)/100}
}
function bindStage(){
  const st=$("stage");
  if(view==="room"){
    const r=ROOMS[ME.step],sv=store("room:"+r.id)||{};
    if(r.tiles){const t=sv.tog||{};st.querySelectorAll(".tile").forEach(b=>setTile(b,t[b.dataset.tog]))}
    updateSuggest();
  }
  const f=$("ansForm");if(f){f.addEventListener("submit",e=>{e.preventDefault();check()});const c=$("code");c.addEventListener("input",()=>c.dataset.edited="1")}
  const h=$("hintBtn");if(h)h.onclick=useHint;
  const g=$("goBtn");if(g)g.onclick=()=>{store("brief",true);if(!started()){const c={running:true,startAt:SYNC.now(),base:0};SES.chrono=c;SYNC.put(P("chrono"),c)}view="room";render()};
}
function setTile(b,s){b.dataset.s=s||"";b.querySelector(".st").textContent=s==="p"?"premier":s==="l"?"leurre":"?";b.classList.toggle("p",s==="p");b.classList.toggle("l",s==="l")}
document.addEventListener("input",e=>{
  const t=e.target;if(view==="room"&&t.dataset.p){stageSave("room:"+ROOMS[ME.step].id,t.dataset.p,t.value);updateSuggest()}
  else if(view==="room"&&t.dataset.bad){stageSave("room:"+ROOMS[ME.step].id,"b"+t.dataset.bad.slice(1),t.checked);updateSuggest()}
  else if(view==="reactor"&&t.dataset.r){stageSave("reactor",t.dataset.r,t.value)}
});
document.addEventListener("click",e=>{
  const p=e.target.closest("[data-pick]");if(p){SID=p.dataset.pick;try{localStorage.setItem("ds4e-ship:"+CODE,SID)}catch(x){}location.href=location.pathname+"?s="+encodeURIComponent(CODE)+"&v="+SID;return}
  const tl=e.target.closest(".tile");if(tl&&view==="room"){const cur=tl.dataset.s,nx=cur===""?"p":cur==="p"?"l":"";setTile(tl,nx);const r=ROOMS[ME.step],sv=store("room:"+r.id)||{};sv.tog=sv.tog||{};sv.tog[tl.dataset.tog]=nx;if(!nx)delete sv.tog[tl.dataset.tog];store("room:"+r.id,sv);const c=$("code");if(c)delete c.dataset.edited;updateSuggest();return}
  if(e.target.id==="closeOv")$("layer").innerHTML="";
});
async function useHint(){
  const id=view==="reactor"?"reacteur":ROOMS[ME.step].id;SES.ships[SID].hints=SES.ships[SID].hints||{};SES.ships[SID].hints[id]=true;
  lastWrite=Date.now();SYNC.put(P(`ships/${SID}/hints/${id}`),true).catch(()=>{});addPen();log("hint",id);toast("Indice · −1 min pour la flotte");render();
}
async function check(){
  const inp=$("code"),v=norm(inp.value);if(!v)return;
  let good;const room=view==="reactor"?"reacteur":ROOMS[ME.step].id;
  const h=await sha(room,view==="reactor"?"flotte":SID,v);
  good=view==="reactor"?h===DATA.hFinal:h===ship(SID).h[room];
  if(good){
    if(view==="reactor"){SES.final=SYNC.now();await SYNC.put(P("final"),SES.final).catch(()=>{});log("final","Réacteur rallumé");render();endCheck();return}
    const r=ROOMS[ME.step];ME.step++;await writeMe();log("room",r.id);
    flash(r.fix);view=ME.step>=6?(allDone()?"reactor":"done"):"room";setTimeout(render,700);
  }else{
    addPen();log("bad",room);toast("Code refusé · −1 min pour la flotte");inp.classList.remove("shake");void inp.offsetWidth;inp.classList.add("shake");inp.select();hud();endCheck();
  }
}
boot();
})();
