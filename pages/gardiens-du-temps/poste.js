/* Poste central (iPad) : les éclaireurs valident leur salle et découvrent la suivante. */
(function(){
const G=window.GDT,R=G.rooms,SY=window.SYNC,U=window.GU,SC=window.SCENES;
const qs=new URLSearchParams(location.search),SIDE=qs.get("s"),DOUBLE=qs.get("double")==="1";
const $=id=>document.getElementById(id),app=$("app"),fx=$("fx");
const LOCK=20,IDLE=90;
let CODE="";try{CODE=localStorage.getItem("gdt-code")||""}catch(e){}
let SES=null,view="home",ctx={},idleT=null,tick=null;
const P=p=>`sessions/${CODE}/${p}`;

/* ---------- mode deux portails : deux postes côte à côte ---------- */
if(DOUBLE&&!SIDE){document.body.classList.add("duoBody");app.innerHTML=`<div class="duo"><iframe src="poste.html?s=L"></iframe><div class="duoSep"></div><iframe src="poste.html?s=R"></iframe></div>`;return}
if(SIDE)document.body.classList.add("narrow");

async function boot(){
  if(SY.local){CODE="LOCAL";SES=await SY.get(P(""));if(!SES||!SES.meta){SES={meta:{game:"gdt",n:8,created:Date.now()},ships:{}};await SY.put(P(""),SES)}return start()}
  if(!CODE)return renderJoin();
  try{SES=await SY.get(P(""))}catch(e){SES=null}
  if(!SES||!SES.meta)return renderJoin("Partie introuvable : vérifie le code affiché sur le grand écran.");
  start()}
function start(){render();setInterval(poll,2000);document.addEventListener("pointerdown",armIdle,true)}
async function poll(){try{const s=await SY.get(P(""));if(s&&s.meta){SES=s;if(view==="home"||view==="team")render()}}catch(e){}}
function armIdle(){clearTimeout(idleT);if(view!=="home")idleT=setTimeout(()=>go("home"),IDLE*1000)}
function go(v,c){view=v;if(c)ctx=Object.assign({},ctx,c);clearInterval(tick);render();armIdle()}

/* ---------- connexion à la partie ---------- */
function renderJoin(err){
  app.innerHTML=`<div class="center"><div class="card join"><div class="astro"><i></i><i></i><i></i><b></b></div>
  <div class="kick">Poste central</div><h1>Les Gardiens du temps</h1>
  <p>Tape le <b>code de la partie</b> affiché sur le grand écran.</p>
  <form id="jf"><input id="jc" class="inp code" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="ABCD"><button class="btn solid">Rejoindre</button></form>
  <p class="err">${err||""}</p></div></div>`;
  $("jf").onsubmit=async e=>{e.preventDefault();const c=$("jc").value.trim().toUpperCase();if(c.length<4)return;
    try{const m=await SY.get(`sessions/${c}/meta`);if(!m||m.game!=="gdt")throw 0;CODE=c;try{localStorage.setItem("gdt-code",c)}catch(e){}SES=await SY.get(P(""));start()}
    catch(e){renderJoin("Code inconnu. Regarde bien le grand écran.")}}}

/* ---------- rendu ---------- */
function render(){({home,team,room,ok:okView,sceau}[view]||home)()}
const T=()=>U.team(ctx.team),S=()=>U.st(SES,ctx.team);
const routeOf=room=>G.routes.chiffres.includes(room)?"chiffres":"formes";
const thumb=(room,state,c)=>`<div class="tile ${state}" style="--tc:${c}"><div class="scene">${SC[room]}</div>${state==="done"?'<div class="chk">✓</div>':state==="cur"?'<div class="now">ici</div>':""}<div class="lab">${R[room].nom}</div></div>`;

function home(){
  const n=(SES.meta&&SES.meta.n)||8;
  app.innerHTML=`<div class="home">
   <header class="hhead"><div class="astro sm"><i></i><i></i><i></i><b></b></div><div><div class="kick">Poste central</div><h1>Les Gardiens du temps</h1></div></header>
   <h2 class="ask">Touche le nom de ton équipe</h2>
   <div class="teams">${U.teams(n).map(t=>{const s=U.st(SES,t.id),done=s.ch+s.fo;
     return `<button class="tbtn" style="--tc:${t.c}" data-t="${t.id}"><span class="tdot"></span><span class="tname">${t.name}</span><span class="tv">${U.vIcon(t.v)}</span>
     <span class="tprog">${[0,1,2,3,4,5].map(i=>`<i class="${i<done?"on":""}"></i>`).join("")}<i class="sc ${s.sceau?"on":""}"></i></span></button>`}).join("")}</div>
   <footer class="hfoot"><span>Un seul Gardien par équipe à la fois · Partie ${CODE}</span>
   ${SIDE?`<button class="lnk" id="duoOff">Revenir à 1 portail</button>`:`<button class="lnk" id="duoOn">Mode 2 portails</button>`}<button class="lnk" id="quit">Changer de partie</button></footer></div>`;
  app.querySelectorAll(".tbtn").forEach(b=>b.onclick=()=>go("team",{team:b.dataset.t}));
  const on=$("duoOn"),off=$("duoOff");if(on)on.onclick=()=>location.href="poste.html?double=1";if(off)off.onclick=()=>window.top.location.href="poste.html";
  $("quit").onclick=()=>{if(SY.local)return;try{localStorage.removeItem("gdt-code")}catch(e){}window.top.location.href="poste.html"}}

function team(){
  const t=T(),s=S();
  const card=route=>{const rooms=G.routes[route],n=s[U.key(route)],cur=rooms[n];
    return `<section class="rcard"><div class="rhead"><span class="kick">${G.routeNames[route]}</span><span class="rcount">${n} / 3</span></div>
     <div class="rtiles">${rooms.map((r,i)=>thumb(r,U.roomState(SES,t.id,route,i),t.c)).join("")}</div>
     ${cur?`<button class="btn solid wide" data-r="${cur}">Entrer : ${R[cur].nom} →</button>`:`<div class="rdone">Route terminée ✓</div>`}</section>`};
  const both=s.ch>=3&&s.fo>=3;
  app.innerHTML=`<div class="teamv" style="--tc:${t.c}">
   <header class="bar"><button class="back" id="bk">← Équipes</button><div class="tt"><span class="tdot"></span>${t.name} <span class="ver">${U.vIcon(t.v)} Version ${U.vName(t.v)}</span></div></header>
   <div class="routes">${card("chiffres")}${card("formes")}</div>
   <section class="scard ${both?"open":""}">${s.sceau?`<div><b>Frise réparée ✓</b> Gardez le secret : il sera révélé à toute la classe.</div>`:both?`<div><b>Vos 6 salles sont réparées !</b><br>Complétez la frise, puis ouvrez le Sceau.</div><button class="btn solid" id="sc">Ouvrir le Sceau final</button>`:`<div>Le <b>Sceau final</b> s'ouvrira quand vos 6 salles seront réparées.</div>`}</section></div>`;
  $("bk").onclick=()=>go("home");
  app.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>go("room",{room:b.dataset.r,input:"",msg:""}));
  const sc=$("sc");if(sc)sc.onclick=()=>go("sceau",{digits:"",comma:-1,step:1,msg:""})}

/* pièce manquante d'une salle */
const reveal=(room,v)=>R[room].reveal?R[room].reveal[v]:`<div class="onpaper">Tout est sur votre fiche.<br>Résolvez l'épreuve, puis revenez valider ici.</div>`;
const KEYS={heure:"123456789 0",fraction:"123456789/0",decimal:"123456789,0",entier:"123456789 0"};
function display(type,s){if(type==="heure"){const d=(s+"____").slice(0,4).split("");return `${d[0]}${d[1]} h ${d[2]}${d[3]}`.replace(/_/g,'<u>&nbsp;</u>')}return s||'<u>&nbsp;</u>'}

function room(){
  const t=T(),r=R[ctx.room],route=routeOf(ctx.room),i=G.routes[route].indexOf(ctx.room),s=S();
  if(U.roomState(SES,t.id,route,i)!=="cur")return go("team");
  const lockLeft=()=>Math.ceil((((s.lock||{})[ctx.room]||0)-SY.now())/1000);
  app.innerHTML=`<div class="roomv" style="--tc:${t.c};--rc:${r.c}">
   <header class="bar"><button class="back" id="bk">← ${t.name}</button><div class="kick">${G.routeNames[route]} · salle ${i+1} / 3</div></header>
   <div class="banner scene">${SC[ctx.room]}<div class="bt"><h1>${r.nom}</h1><span>${r.lieu}</span></div></div>
   <div class="rgrid">
    <section class="left"><div class="kick">Votre mission</div><p class="mis">${r.mission}</p>
      <div class="kick">La pièce manquante</div><div class="art">${reveal(ctx.room,t.v)}</div></section>
    <section class="right"><div class="kick">Votre réponse</div>
      <div class="disp" id="disp">${display(r.type,ctx.input)}</div>
      <div class="pad" id="pad">${KEYS[r.type].split("").map(k=>k===" "?"<span></span>":`<button data-k="${k}">${k}</button>`).join("")}<button data-k="del" class="del">⌫</button></div>
      <button class="btn solid wide" id="val">Valider</button>
      <p class="msg" id="msg">${ctx.msg||""}</p>
      <button class="lnk" id="hint">Bloqués ? Coup de pouce</button></section>
   </div></div>`;
  $("bk").onclick=()=>go("team");
  const max=r.type==="heure"?4:7;
  app.querySelectorAll("#pad button").forEach(b=>b.onclick=()=>{const k=b.dataset.k;
    if(k==="del")ctx.input=ctx.input.slice(0,-1);
    else if((k==="/"||k===",")&&(ctx.input.includes(k)||!ctx.input))return;
    else if(ctx.input.length<max)ctx.input+=k;
    $("disp").innerHTML=display(r.type,ctx.input)});
  $("val").onclick=()=>check(t,r,route,i);
  $("hint").onclick=()=>openHint(t,r);
  const lockUI=()=>{const l=lockLeft();const on=l>0;$("val").disabled=on;app.querySelectorAll("#pad button").forEach(b=>b.disabled=on);
    if(on)$("msg").innerHTML=(ctx.msg?ctx.msg+"<br>":"")+`<span class="lockt">Le portail se recharge… ${l} s</span>`;return on};
  if(lockUI())tick=setInterval(()=>{if(!lockUI()){clearInterval(tick);$("msg").innerHTML=ctx.msg||""}},500)}

async function check(t,r,route,i){
  const a=U.norm(r.type,ctx.input);if(!a)return;
  if(r.type==="heure"&&a.length<3){ctx.msg="Écris l'heure en entier : heures, puis minutes.";return render()}
  const h=await U.hash(ctx.room,t.v,a);
  if(r.ok[t.v].includes(h)){
    await SY.patch(P(`ships/${t.id}`),{[U.key(route)]:i+1});await SY.put(P(`ships/${t.id}/t/${ctx.room}`),SY.now()).catch(()=>{});
    SES=await SY.get(P("")).catch(()=>SES)||SES;
    portal(r.c,()=>go("ok",{done:ctx.room,next:G.routes[route][i+1]||null}))}
  else{const tip=(r.wrong[t.v]||{})[a];ctx.msg=tip?`<b>Écho brouillé.</b> ${tip}`:`<b>Écho brouillé.</b> Ce n'est pas la bonne réponse : vérifiez votre épreuve.`;ctx.input="";
    await SY.put(P(`ships/${t.id}/lock/${ctx.room}`),SY.now()+LOCK*1000).catch(()=>{});SES=await SY.get(P("")).catch(()=>SES)||SES;render();
    const d=$("disp");if(d){d.classList.add("shake")}}}

/* animation du portail du temps */
function portal(c,cb){fx.innerHTML=`<div class="portal" style="--rc:${c}"><i></i><i></i><i></i><i></i><b></b></div>`;setTimeout(()=>{fx.innerHTML="";cb()},1700)}

function okView(){
  const t=T(),d=R[ctx.done],nx=ctx.next?R[ctx.next]:null;
  app.innerHTML=`<div class="okv" style="--tc:${t.c};--rc:${d.c}">
   <div class="echo"><div class="kick">Écho clair · ${d.nom}</div><h1>Salle réparée ✦</h1>
    <div class="clue"><div class="kick">Indice de date : recopiez-le sur la fiche</div><p>${d.clue}</p></div>
    <p class="sub">Le chiffre du temps se trouve sur votre fiche.</p></div>
   ${nx?`<div class="next"><div class="kick">Salle suivante découverte</div>
     <div class="nrow"><div class="nscene scene">${SC[ctx.next]}<div class="bt"><h2>${nx.nom}</h2><span>${nx.lieu}</span></div></div>
     <div class="nart"><div class="art">${reveal(ctx.next,t.v)}</div><p class="mem"><b>Éclaireur :</b> mémorise la pièce manquante et rapporte-la à ton binôme.</p></div></div></div>`
   :`<div class="next fin"><h2>Route terminée !</h2><p>Placez vos époques sur la frise. Quand vos 6 salles seront réparées, revenez ouvrir le Sceau final.</p></div>`}
   <button class="btn solid wide" id="done">Terminé</button></div>`;
  $("done").onclick=()=>go("home")}

function openHint(t,r){
  const s=S(),n=((s.hints||{})[ctx.room]||0);
  SY.put(P(`ships/${t.id}/hints/${ctx.room}`),Math.max(n,1)).catch(()=>{});
  fx.innerHTML=`<div class="modal"><div class="hcard" style="--rc:${r.c}"><div class="hhd">${r.nom} · coup de pouce</div>
   <div class="h"><div class="kick">Coup de pouce 1</div><p>${r.h1}</p></div>
   <div class="h" id="h2" hidden><div class="kick">Coup de pouce 2</div><p>${r.h2[t.v]}</p></div>
   <div class="hb"><button class="btn" id="more" disabled>Encore bloqués ? (20 s)</button><button class="btn solid" id="hx">Fermer</button></div></div></div>`;
  let k=20;const m=$("more"),iv=setInterval(()=>{k--;if(k<=0){clearInterval(iv);m.disabled=false;m.textContent="Coup de pouce 2"}else m.textContent=`Encore bloqués ? (${k} s)`},1000);
  m.onclick=()=>{$("h2").hidden=false;m.hidden=true;SY.put(P(`ships/${t.id}/hints/${ctx.room}`),2).catch(()=>{})};
  $("hx").onclick=()=>{clearInterval(iv);fx.innerHTML=""}}

/* ---------- Sceau final ---------- */
function sceau(){
  const t=T();
  const slots=(gaps)=>{let h="";for(let i=0;i<6;i++){h+=`<div class="slot">${ctx.digits[i]??""}</div>`;if(i<5)h+=`<div class="gap ${gaps?"tap":""} ${ctx.comma===i?"comma":""}" data-g="${i}"></div>`}return h};
  let body="";
  if(ctx.step===1)body=`<div class="kick">Étape 1</div><h2>Tapez vos 6 chiffres du temps</h2><p class="sub">De l'époque la plus ancienne à la plus récente.</p>
   <div class="slots">${slots(false)}</div><div class="pad six">${"1234567890".split("").map(k=>`<button data-k="${k}">${k}</button>`).join("")}<button data-k="del" class="del">⌫</button></div>`;
  if(ctx.step===2)body=`<div class="kick">Étape 2</div><h2>Placez la virgule</h2><p class="sub">Touchez l'endroit où la mettre pour obtenir un nombre <b>entre 3 et 4</b>.</p>
   <div class="slots">${slots(true)}</div><button class="btn solid" id="cv">Valider</button>`;
  if(ctx.step===3)body=`<div class="kick">Étape 3</div><h2>Ce nombre se cache dans votre calculatrice…</h2>
   <div class="slots">${slots(false)}</div><p class="sub">Retournez à votre table et trouvez la <b>touche</b> qui affiche ce nombre. Revenez quand vous l'avez trouvée.</p>
   <div class="hb"><button class="btn" id="later">On va chercher</button><button class="btn solid" id="found">On l'a trouvée !</button></div>`;
  if(ctx.step===4)body=`<div class="sealdone"><div class="astro"><i></i><i></i><i></i><b></b></div><h1>La frise est réparée !</h1>
   <p>Bravo, Gardiens. <b>Gardez le secret</b> : il sera révélé à toute la classe sur le grand écran.</p><p class="sub">En attendant, les épreuves bonus vous attendent sur votre fiche.</p><button class="btn solid" id="end">Terminé</button></div>`;
  app.innerHTML=`<div class="sceauv" style="--tc:${t.c}"><header class="bar"><button class="back" id="bk">← ${t.name}</button><div class="kick">Sceau final</div></header>
   <div class="sbody">${body}<p class="msg" id="msg">${ctx.msg||""}</p></div></div>`;
  $("bk").onclick=()=>go("team");
  app.querySelectorAll(".pad button").forEach(b=>b.onclick=async()=>{const k=b.dataset.k;ctx.msg="";
    if(k==="del")ctx.digits=ctx.digits.slice(0,-1);else if(ctx.digits.length<6)ctx.digits+=k;
    if(ctx.digits.length===6){const h=await U.sha(`${G.salt}|sceau|-|${ctx.digits}`);
      if(h===G.sceau){ctx.step=2}else ctx.msg="La frise est encore déréglée. Vérifiez l'ordre des époques et chaque chiffre du temps.<br>Touchez ⌫ pour corriger."}
    render()});
  app.querySelectorAll(".gap.tap").forEach(g=>g.onclick=()=>{ctx.comma=+g.dataset.g;ctx.msg="";render()});
  const cv=$("cv");if(cv)cv.onclick=()=>{if(ctx.comma<0){ctx.msg="Touchez d'abord un espace entre deux chiffres.";return render()}
    if(ctx.comma!==0){ctx.msg="Ce nombre n'est pas entre 3 et 4. Déplacez la virgule.";return render()}ctx.step=3;render()};
  const lt=$("later");if(lt)lt.onclick=()=>go("home");
  const fd=$("found");if(fd)fd.onclick=async()=>{await SY.patch(P(`ships/${t.id}`),{sceau:true});await SY.put(P(`ships/${t.id}/t/sceau`),SY.now()).catch(()=>{});portal("#f2c14e",()=>{ctx.step=4;render()})};
  const en=$("end");if(en)en.onclick=()=>go("home")}

boot();
})();
