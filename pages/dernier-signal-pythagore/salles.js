/* Contenu des salles : histoire, documents lisibles, carnet de calculs, indices. */
window.ROOMS=(function(){
const fr=n=>String(n).replace(".",",");
const F='font-family="Chakra Petch, sans-serif"';
const dimTxt=cm=>cm>=100&&cm%10===0?fr(cm/100)+" m":cm+" cm";
let _s=1;const rnd=()=>{_s=(_s*16807)%2147483647;return _s/2147483647};

/* triangle rectangle d'une plaque (figure tournée) */
function triangle(sh,i){
  const [t,a,b]=sh.d.mac[i];const L=["ABC","DEF","GHI","JKL"][i];
  let l1,l2,hyp,k1,k2,kh;                       /* longueurs réelles + texte affiché */
  if(t==="hyp"){l1=a;l2=b;hyp=Math.sqrt(a*a+b*b);k1=a+" cm";k2=b+" cm";kh="?"}
  else{hyp=a;l1=b;l2=Math.sqrt(a*a-b*b);k1=b+" cm";k2="?";kh=a+" cm"}
  _s=(sh.name.length*97+i*131+7)%2147483;
  const th=(rnd()*360)*Math.PI/180;
  let P=[[0,0],[l1,0],[0,-l2]].map(([x,y])=>[x*Math.cos(th)-y*Math.sin(th),x*Math.sin(th)+y*Math.cos(th)]);
  const xs=P.map(p=>p[0]),ys=P.map(p=>p[1]);const bw=Math.max(...xs)-Math.min(...xs),bh=Math.max(...ys)-Math.min(...ys);
  const sc=Math.min(116/bw,80/bh);const cx=(Math.max(...xs)+Math.min(...xs))/2,cy=(Math.max(...ys)+Math.min(...ys))/2;
  P=P.map(([x,y])=>[100+(x-cx)*sc,76+(y-cy)*sc]);
  const [R,A,B]=P,G=[(R[0]+A[0]+B[0])/3,(R[1]+A[1]+B[1])/3];
  const out=(p,q,d)=>{const m=[(p[0]+q[0])/2,(p[1]+q[1])/2],v=[m[0]-G[0],m[1]-G[1]],n=Math.hypot(v[0],v[1])||1;return[m[0]+v[0]/n*d,m[1]+v[1]/n*d]};
  const ou=(p,d)=>out(p,p,d);
  const u=[(A[0]-R[0])/(Math.hypot(A[0]-R[0],A[1]-R[1])),(A[1]-R[1])/Math.hypot(A[0]-R[0],A[1]-R[1])],v=[(B[0]-R[0])/Math.hypot(B[0]-R[0],B[1]-R[1]),(B[1]-R[1])/Math.hypot(B[0]-R[0],B[1]-R[1])];
  const sq=[[R[0]+u[0]*10,R[1]+u[1]*10],[R[0]+(u[0]+v[0])*10,R[1]+(u[1]+v[1])*10],[R[0]+v[0]*10,R[1]+v[1]*10]];
  const lab=(p,txt,q)=>{const [x,y]=out(p,q,24);return `<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" text-anchor="middle" ${F} font-weight="700" font-size="12.5" fill="${txt==="?"?"#ffb547":"#e8eefc"}">${txt}</text>`};
  const vl=(p,c)=>{const [x,y]=ou(p,13);return `<text x="${x.toFixed(1)}" y="${(y+5).toFixed(1)}" text-anchor="middle" ${F} font-weight="700" font-size="14" fill="#8ea0bc">${c}</text>`};
  /* R = sommet de l'angle droit = 2e lettre ; A = 1re ; B = 3e */
  const svg=`<svg viewBox="0 0 200 152" role="img" aria-label="Plaque ${i+1}"><polygon points="${R} ${A} ${B}" fill="${sh.c}" fill-opacity=".12" stroke="${sh.c}" stroke-width="2.6" stroke-linejoin="round"/><polyline points="${sq.join(" ")}" fill="none" stroke="#e8eefc" stroke-width="1.6"/>
   ${lab(R,k1,A)}${lab(R,k2,B)}${lab(A,kh,B)}${vl(R,L[1])}${vl(A,L[0])}${vl(B,L[2])}</svg>`;
  return `<div class="plaque"><div class="tag">Plaque ${i+1}</div>${svg}<div class="cap">Triangle ${L} rectangle en ${L[1]}</div></div>`;
}

/* carte de navigation */
function carte(sh){
  const {s,b,sc}=sh.d.nav,C=22,W=18,H=14,M=22;
  let g="";for(let i=0;i<=W;i++)g+=`<line x1="${M+i*C}" y1="${M}" x2="${M+i*C}" y2="${M+H*C}" stroke="#2f4268" stroke-width="${i%5?1:1.6}"/>`;
  for(let j=0;j<=H;j++)g+=`<line x1="${M}" y1="${M+j*C}" x2="${M+W*C}" y2="${M+j*C}" stroke="#2f4268" stroke-width="${j%5?1:1.6}"/>`;
  _s=sh.name.length*53+3;let ast="";for(let i=0;i<26;i++){const x=M+rnd()*W*C,y=M+rnd()*H*C;ast+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5+rnd()*3).toFixed(1)}" fill="#6b7da3" opacity=".55"/>`}
  let ax="";for(let i=0;i<=W;i++)ax+=`<text x="${M+i*C}" y="${M+H*C+13}" text-anchor="middle" ${F} font-size="9.5" fill="#8ea0bc">${i}</text>`;
  for(let j=0;j<=H;j++)ax+=`<text x="${M-5}" y="${M+(H-j)*C+3.5}" text-anchor="end" ${F} font-size="9.5" fill="#8ea0bc">${j}</text>`;
  const P=p=>[M+p[0]*C,M+(H-p[1])*C];const [sx,sy]=P(s),[bx,by]=P(b);
  const svg=`<svg viewBox="0 0 ${M*2+W*C+8} ${M*2+H*C+8}" role="img" aria-label="Carte quadrillée"><rect x="${M}" y="${M}" width="${W*C}" height="${H*C}" fill="#06101f"/>${ast}${g}${ax}
   <g transform="translate(${sx} ${sy})"><circle r="9" fill="${sh.c}" opacity=".25"/><path d="M-9 -6 L11 0 L-9 6 L-4 0 Z" fill="${sh.c}" stroke="#fff" stroke-width="1"/></g>
   <g transform="translate(${bx} ${by})"><circle r="12" fill="#ffb547" opacity=".25" class="pulse"/><path d="M0 -9 L9 0 L0 9 L-9 0 Z" fill="#ffb547" stroke="#fff" stroke-width="1"/></g>
   <text x="${sx+12}" y="${sy-10}" ${F} font-size="11" font-weight="700" fill="${sh.c}">VOUS</text><text x="${bx+13}" y="${by-12}" ${F} font-size="11" font-weight="700" fill="#ffb547">BALISE</text></svg>`;
  return `<div class="doc"><div class="tag">Carte de navigation</div>${svg}<p class="note">1 carreau = <b>${fr(sc)} al</b> (années-lumière). Le vaisseau et la balise sont sur des croisements du quadrillage : lisez leurs positions grâce aux nombres sur les bords.</p></div>`;
}

/* pavé de la cuve */
function cuve(sh){
  const [L,l,h]=sh.d.ser;
  const svg=`<svg viewBox="0 0 300 190" role="img" aria-label="Cuve en forme de pavé">
   <path d="M40 60 L100 30 L270 30 L210 60 Z" fill="#bfe3ff" fill-opacity=".16" stroke="#bfe3ff" stroke-width="2"/><path d="M210 60 L270 30 L270 120 L210 150 Z" fill="#0b2a44" stroke="#bfe3ff" stroke-width="2"/>
   <rect x="40" y="60" width="170" height="90" fill="#06182a" stroke="#bfe3ff" stroke-width="2"/><rect x="40" y="108" width="170" height="42" fill="#2f9be0" opacity=".55"/><path d="M210 108 L270 78 L270 120 L210 150 Z" fill="#2f9be0" opacity=".35"/>
   <text x="125" y="172" text-anchor="middle" ${F} font-weight="700" font-size="14" fill="#ffb547">longueur ${dimTxt(L)}</text>
   <text x="256" y="152" text-anchor="start" ${F} font-weight="700" font-size="14" fill="#ffb547" transform="rotate(-27 256 152)">largeur ${dimTxt(l)}</text>
   <text x="30" y="108" text-anchor="end" ${F} font-weight="700" font-size="14" fill="#ffb547" transform="rotate(-90 30 108)">hauteur ${dimTxt(h)}</text></svg>`;
  return svg;
}

const post=(id,label,unit)=>({id,label,unit});
const premier=n=>n>1&&Array.from({length:Math.floor(Math.sqrt(n))-1},(_,i)=>i+2).every(k=>n%k);
const fact=n=>{const o=[];let m=n;for(let k=2;k*k<=m;k++)while(m%k===0){o.push(k);m/=k}if(m>1)o.push(m);return o.join(" × ")};
const num=n=>String(n).replace(/\B(?=(\d{3})+$)/g," ");
const steps=a=>`<ol class="steps">${a.map(x=>`<li>${x}</li>`).join("")}</ol>`;

return [
 {id:"sas",name:"Sas d'arrivée",short:"Sas",part:"la coque",chap:"Divisibilité",
  story:"Une tempête solaire vient de percer la coque de votre vaisseau. Impossible de réparer de l'extérieur : il faut entrer par le sas. Mais la porte reste verrouillée tant que le bon code n'est pas tapé.",
  want:"le code d'ouverture du sas",
  steps:["Pour chaque panneau, cherchez s'il a un diviseur autre que 1 et lui-même (essayez 2, 3, 5, 7, 11, 13).","Marquez le panneau : <b>premier</b> s'il n'a aucun autre diviseur, <b>leurre</b> sinon. Pour chaque leurre, notez dans le cahier sa décomposition (par exemple 91 = 7 × 13).","Additionnez les nombres des panneaux premiers."],
  codeis:"la somme des nombres premiers (3 chiffres)",
  fix:"Coque scellée ! Le sas s'ouvre.",
  hints:["Un nombre est premier s'il n'a que deux diviseurs : 1 et lui-même. Les leurres sont des produits de deux nombres premiers, souvent 7, 11 ou 13 : testez ces trois-là en priorité.","Pour tester un nombre n : divisez-le par 2, 3, 5, 7, 11, 13. Si aucune division ne tombe juste, il est premier (car 17 × 17 dépasse tous ces nombres)."],
  docs:sh=>`<div class="doc"><div class="tag">Panneaux du sas · touchez un panneau pour le marquer</div><div class="tiles">${sh.d.sas.map((n,i)=>`<button class="tile" data-tog="${i}" data-n="${n}"><span class="lt">${"ABCDEF"[i]}</span><b>${n}</b><span class="st">?</span></button>`).join("")}</div><p class="note">Touchez une fois : <b>premier</b> (vert). Deux fois : <b>leurre</b> (rouge). Trois fois : on efface. Le code, c'est à vous de le calculer et de le taper.</p></div>`,
  postes:()=>[],tiles:true,
  suggest:(v,sh)=>{const t=v.tog||{};if(Object.keys(t).length<6)return null;return sh.d.sas.reduce((s,n,i)=>s+(t[i]==="p"?n:0),0)},
  sol:sh=>{const L=sh.d.sas.map(n=>premier(n)?`<li><b>${n}</b> : premier (aucun diviseur parmi 2, 3, 5, 7, 11, 13).</li>`:`<li><b>${n}</b> : leurre, ${n} = ${fact(n)}.</li>`).join("");const pr=sh.d.sas.filter(premier);return `<ul>${L}</ul><p>Code = ${pr.join(" + ")} = <b>${pr.reduce((a,b)=>a+b,0)}</b></p>`}},

 {id:"labo",name:"Laboratoire",short:"Labo",part:"la réserve de carburant",chap:"Pourcentages",
  story:"Coque scellée ! Mais la chaleur de la tempête a fait fondre une partie du carburant. Le laboratoire peut reconstituer la réserve, à condition de savoir quelle quantité il y avait au départ. Lisez son journal.",
  want:"la réserve de carburant finale, en litres",
  steps:["Après la baisse, quel pourcentage de la réserve d'avant reste-t-il ?","Cette quantité restante est ce pourcentage de la réserve d'avant. Retrouvez la <b>réserve d'avant la tempête</b>.","La réserve est remise à ce niveau, puis augmentée : calculez la <b>réserve finale</b>."],
  codeis:"la réserve finale, en litres",
  fix:"Réserve reconstituée !",
  hints:["Si une quantité baisse de 20 %, il en reste 80 %. Exemple : il reste 40 L, ce qui représente 80 % de la réserve d'avant (50 L). Ici le pourcentage restant n'est pas 20 : lisez bien l'énoncé.","Pour retrouver la réserve d'avant : cherchez à quoi correspond 1 % (divisez la quantité restante par le pourcentage restant), puis multipliez par 100. Pour la hausse de q %, multipliez par (100 + q) ÷ 100."],
  docs:sh=>{const [R,p,q]=sh.d.labo,V1=R*(100-p)/100;return `<div class="doc journal"><div class="tag">Journal du laboratoire</div>
   <p>① <b>Avant la tempête</b> : la réserve de carburant était pleine (quantité inconnue).</p>
   <p>② <b>Après la tempête</b> : la réserve a <b>baissé de ${p} %</b>. Il reste <b>${V1} L</b>.</p>
   <p>③ <b>Réparation</b> : on remet la réserve à son niveau d'avant la tempête, puis on l'<b>augmente de ${q} %</b> pour tenir le voyage.</p>
   <p class="muted">Autres relevés : température du banc d'essai 21 °C, panneau de secours 12 kW.</p></div>`},
  postes:()=>[post("T","① Pourcentage qui reste après la baisse","%"),post("R","② Réserve avant la tempête","L"),post("F","③ Réserve finale","L")],
  suggest:v=>v.F||null,
  sol:sh=>{const [R,p,q]=sh.d.labo,V1=R*(100-p)/100,F=R*(100+q)/100;return `<ol><li>Après une baisse de ${p} %, il reste ${100-p} %.</li><li>${100-p} % de la réserve = ${V1} L. 1 % = ${V1} ÷ ${100-p} = ${V1/(100-p)} L, donc réserve d'avant = ${V1/(100-p)} × 100 = <b>${R} L</b>.</li><li>Hausse de ${q} % : ${R} × ${(100+q)/100} = <b>${F} L</b>.</li></ol>`}},

 {id:"machines",name:"Salle des machines",short:"Machines",part:"les moteurs",chap:"Pythagore",
  story:"Réserve rétablie ! Il faut maintenant relancer les moteurs. Chacun se règle avec une plaque triangulaire dont un côté s'est effacé. La tempête a aussi faussé l'une des quatre plaques : elle est impossible à régler.",
  want:"la somme des côtés manquants des 3 plaques correctes",
  steps:["Sur chaque plaque, repérez l'angle droit (petit carré) et l'<b>hypoténuse</b> : le côté en face.","Écrivez dans le cahier l'égalité de Pythagore, puis calculez le côté manquant : on <b>additionne</b> les carrés si l'hypoténuse manque, on <b>soustrait</b> sinon.","Une plaque a un côté manquant qui n'est <b>pas un nombre entier</b> : c'est la plaque fausse, cochez-la.","Additionnez les 3 côtés manquants entiers."],
  codeis:"la somme des 3 côtés manquants entiers",
  fix:"Moteurs relancés !",
  hints:["Hypoténuse manquante : BC² = AB² + AC². Côté de l'angle droit manquant : AC² = BC² − AB². Attention : l'hypoténuse est toujours le plus grand des trois côtés.","Après avoir trouvé le carré du côté, cherchez sa racine carrée. Si ce n'est pas un nombre entier (la calculatrice affiche des décimales), c'est la plaque fausse : ne l'ajoutez pas."],
  docs:sh=>`<div class="doc"><div class="tag">Plaques de réglage · longueurs en cm</div><div class="plaques">${[0,1,2,3].map(i=>triangle(sh,i)).join("")}</div></div>`,
  postes:()=>[1,2,3,4].map(i=>({id:"p"+i,label:"Plaque "+i+" : côté manquant",unit:"cm",bad:true})),
  suggest:v=>{let s=0,n=0;for(let i=1;i<=4;i++){if(v["b"+i])continue;if(v["p"+i]==null||v["p"+i]==="")return null;s+=parseFloat(String(v["p"+i]).replace(",","."));n++}return n===3?s:null},
  sol:sh=>{let tot=0;const L=sh.d.mac.map(([t,a,b],i)=>{const sq=t==="hyp"?a*a+b*b:a*a-b*b,r=Math.sqrt(sq),ok=Number.isInteger(r);if(ok)tot+=r;const eq=t==="hyp"?`${a}² + ${b}² = ${a*a} + ${b*b} = ${sq}`:`${a}² − ${b}² = ${a*a} − ${b*b} = ${sq}`;return `<li>Plaque ${i+1} (${t==="hyp"?"hypoténuse manquante":"côté de l'angle droit manquant"}) : ${eq}, donc côté = √${sq} ${ok?"= <b>"+r+" cm</b>":"≈ "+r.toFixed(2).replace(".",",")+" : <b>plaque fausse</b>"}.</li>`}).join("");return `<ol>${L}</ol><p>Code = <b>${tot}</b></p>`}},

 {id:"nav",name:"Navigation",short:"Navig.",part:"le cap",chap:"Pythagore + Grandeurs",
  story:"Moteurs relancés ! Le vaisseau est prêt à partir vers la balise du réacteur, mais le pilote automatique ne connaît pas la durée du voyage. Il fonce en <b>ligne droite</b>, à <b>vitesse constante</b>. À vous de la calculer avec la carte.",
  want:"la durée du voyage, en années",
  steps:["Sur la carte, lisez la position de <b>VOUS</b> et de la <b>BALISE</b> grâce aux nombres des bords. Calculez l'<b>écart horizontal</b> et l'<b>écart vertical</b> (en carreaux).","Ces deux écarts sont les côtés de l'angle droit d'un triangle rectangle. La distance en ligne droite est l'<b>hypoténuse</b> : calculez-la avec Pythagore (en carreaux).","Convertissez en années-lumière : multipliez par la valeur d'un carreau (légende de la carte).","Durée = distance ÷ vitesse. Le résultat est un nombre entier d'années."],
  codeis:"la durée du voyage, en années",
  fix:"Cap verrouillé !",
  hints:["Imaginez un escalier de VOUS vers la BALISE : des carreaux vers la droite (écart horizontal), puis des carreaux vers le haut (écart vertical). Cet escalier dessine un angle droit.","Distance² = (écart horizontal)² + (écart vertical)². Cherchez la racine carrée : c'est un nombre entier de carreaux. Ensuite : × valeur d'un carreau, puis ÷ vitesse."],
  docs:sh=>carte(sh)+`<div class="doc"><div class="tag">Tableau de bord du vaisseau</div><p>Vitesse de croisière : <b>${fr(sh.d.nav.v)} al par an</b> <span class="muted">(1 al = 1 année-lumière)</span></p><p class="muted">Carburant : OK. Boucliers : 80 %.</p></div>`,
  postes:()=>[post("h","① Écart horizontal","carreaux"),post("v","① Écart vertical","carreaux"),post("c","② Distance en ligne droite","carreaux"),post("D","③ Distance","al"),post("T","④ Durée du voyage","ans")],
  suggest:v=>v.T||null,
  sol:sh=>{const {s,b,sc,v}=sh.d.nav,dx=Math.abs(b[0]-s[0]),dy=Math.abs(b[1]-s[1]),dc=Math.round(Math.hypot(dx,dy));return `<ol><li>VOUS (${s[0]} ; ${s[1]}), BALISE (${b[0]} ; ${b[1]}) : écart horizontal ${dx}, écart vertical ${dy}.</li><li>Distance² = ${dx}² + ${dy}² = ${dx*dx} + ${dy*dy} = ${dc*dc}, donc distance = √${dc*dc} = ${dc} carreaux.</li><li>${dc} × ${fr(sc)} = ${dc*sc} al.</li><li>Durée = ${dc*sc} ÷ ${fr(v)} = <b>${Math.round(dc*sc/v)} ans</b>.</li></ol>`}},

 {id:"comms",name:"Communications",short:"Comms",part:"l'antenne",chap:"Grandeurs",
  story:"Cap verrouillé ! Avant de partir, il faut prévenir la flotte que votre vaisseau est réparé. L'émetteur va fonctionner un moment : cela consomme de l'énergie, et l'énergie se paie. Le commandant veut connaître le coût de l'émission.",
  want:"le coût de l'émission, en centimes",
  steps:["Convertissez la puissance en <b>kW</b> (1 kW = 1 000 W).","Convertissez la durée en <b>heures</b> (30 min = 0,5 h ; 15 min = 0,25 h).","Énergie (kWh) = puissance (kW) × durée (h).","Coût = énergie × prix d'un kWh. Le mode veille ne compte pas : l'émetteur est allumé."],
  codeis:"le coût, en centimes",
  fix:"Signal envoyé !",
  hints:["Une puissance de 1 500 W, c'est 1,5 kW. Une durée de 1 h 30, c'est 1,5 h. Une énergie se multiplie : kW × h = kWh.","Coût = énergie en kWh × prix d'un kWh en centimes. Le résultat est un nombre entier de centimes."],
  docs:sh=>{const c=sh.d.com,[h,m]=c.t;return `<div class="doc journal"><div class="tag">Relevé de l'émetteur</div>
   <p>Puissance en émission : <b>${num(c.P)} W</b></p>
   <p>Durée d'émission : <b>${h?h+" h ":""}${m?m+" min":""}</b></p>
   <p>Prix de l'énergie : <b>${c.px} centimes</b> le kWh</p>
   <p class="muted">Mode veille : ${c.vei} W (émetteur éteint).</p></div>`},
  postes:()=>[post("P","① Puissance","kW"),post("t","② Durée","h"),post("E","③ Énergie consommée","kWh"),post("K","④ Coût","centimes")],
  suggest:v=>v.K||null,
  sol:sh=>{const c=sh.d.com,[h,m]=c.t,t=h+m/60,E=c.P/1000*t;return `<ol><li>${num(c.P)} W = ${fr(c.P/1000)} kW.</li><li>${h} h ${m} min = ${fr(t)} h.</li><li>Énergie = ${fr(c.P/1000)} × ${fr(t)} = ${fr(E)} kWh.</li><li>Coût = ${fr(E)} × ${c.px} = <b>${Math.round(E*c.px)} centimes</b>.</li></ol>`}},

 {id:"serre",name:"Serre",short:"Serre",part:"l'oxygène",chap:"Grandeurs + Pourcentages",
  story:"Signal envoyé ! Dernière panne : l'oxygène. La serre ne produit plus d'air frais car sa cuve d'eau s'est vidée en partie. La pompe doit la remplir. Combien de temps va-t-elle fonctionner ? <b>Ce nombre de minutes</b> sera la <b>barre d'énergie</b> de votre vaisseau : <b>retenez-le</b>, le réacteur en aura besoin !",
  want:"la durée de remplissage, en minutes (votre barre d'énergie)",
  steps:["Convertissez les 3 dimensions en <b>dm</b> (1 m = 10 dm ; 10 cm = 1 dm), puis calculez le volume : longueur × largeur × hauteur. 1 dm³ = 1 L.","La cuve est remplie à un certain pourcentage : quel <b>pourcentage reste à remplir</b> ?","Calculez le volume d'eau à ajouter, en litres.","Durée = volume à ajouter ÷ débit de la pompe."],
  codeis:"la durée, en minutes",
  fix:"Oxygène rétabli !",
  hints:["Pour un volume en litres, mesurez tout en dm : 1,5 m = 15 dm, 80 cm = 8 dm. Alors volume (en dm³) = longueur × largeur × hauteur, et 1 dm³ = 1 L.","Si la cuve est pleine à 20 %, il reste 80 % à remplir : volume à ajouter = 80 % du volume de la cuve. Puis durée = volume à ajouter ÷ débit."],
  docs:sh=>{const [,, ,p,d]=sh.d.ser;return `<div class="doc"><div class="tag">Cuve de la serre</div><div class="cuve">${cuve(sh)}</div>
   <p>La cuve est déjà remplie à <b>${p} %</b> de sa capacité.</p><p>La pompe a un débit de <b>${d} L par minute</b>.</p><p class="muted">Température de la serre : 22 °C.</p></div>`},
  postes:()=>[post("V","① Volume de la cuve","L"),post("Q","② Pourcentage à remplir","%"),post("A","③ Volume à ajouter","L"),post("T","④ Durée de remplissage","min")],
  suggest:v=>v.T||null,
  sol:sh=>{const [L,l,h,p,d]=sh.d.ser,V=L*l*h/1000,A=V*(100-p)/100;return `<ol><li>${L/10} dm × ${l/10} dm × ${h/10} dm = ${V} dm³ = <b>${V} L</b>.</li><li>Remplie à ${p} % : il reste ${100-p} %.</li><li>${100-p} % de ${V} L = <b>${A} L</b>.</li><li>${A} ÷ ${d} = <b>${A/d} min</b> : c'est la barre d'énergie.</li></ol>`}}
];
})();
