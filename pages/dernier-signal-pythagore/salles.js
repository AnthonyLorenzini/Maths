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
  const {s,b,sc}=sh.d.nav,C=22,W=18,H=14,M=18;
  let g="";for(let i=0;i<=W;i++)g+=`<line x1="${M+i*C}" y1="${M}" x2="${M+i*C}" y2="${M+H*C}" stroke="#2f4268" stroke-width="${i%5?1:1.6}"/>`;
  for(let j=0;j<=H;j++)g+=`<line x1="${M}" y1="${M+j*C}" x2="${M+W*C}" y2="${M+j*C}" stroke="#2f4268" stroke-width="${j%5?1:1.6}"/>`;
  _s=sh.name.length*53+3;let ast="";for(let i=0;i<26;i++){const x=M+rnd()*W*C,y=M+rnd()*H*C;ast+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5+rnd()*3).toFixed(1)}" fill="#6b7da3" opacity=".55"/>`}
  const P=p=>[M+p[0]*C,M+(H-p[1])*C];const [sx,sy]=P(s),[bx,by]=P(b);
  const svg=`<svg viewBox="0 0 ${M*2+W*C} ${M*2+H*C}" role="img" aria-label="Carte quadrillée"><rect x="${M}" y="${M}" width="${W*C}" height="${H*C}" fill="#06101f"/>${ast}${g}
   <g transform="translate(${sx} ${sy})"><circle r="9" fill="${sh.c}" opacity=".25"/><path d="M-9 -6 L11 0 L-9 6 L-4 0 Z" fill="${sh.c}" stroke="#fff" stroke-width="1"/></g>
   <g transform="translate(${bx} ${by})"><circle r="12" fill="#ffb547" opacity=".25" class="pulse"/><path d="M0 -9 L9 0 L0 9 L-9 0 Z" fill="#ffb547" stroke="#fff" stroke-width="1"/></g>
   <text x="${sx+12}" y="${sy-10}" ${F} font-size="11" font-weight="700" fill="${sh.c}">VOUS</text><text x="${bx+13}" y="${by-12}" ${F} font-size="11" font-weight="700" fill="#ffb547">BALISE</text></svg>`;
  return `<div class="doc"><div class="tag">Carte de navigation</div>${svg}<p class="note">1 carreau = <b>${fr(sc)} al</b> (années-lumière). Les sommets du vaisseau et de la balise sont sur des nœuds du quadrillage.</p></div>`;
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
const fm=(sh)=>sh;
return [
 {id:"sas",name:"Sas d'arrivée",short:"Sas",part:"la coque",chap:"Divisibilité",
  story:"Une tempête solaire a percé votre coque. Pour la réparer, il faut entrer par le sas. Il s'ouvre avec un code : <b>la somme des nombres premiers</b> affichés sur les 6 panneaux. Attention : certains panneaux sont des leurres.",
  fix:"Coque scellée ! Le sas s'ouvre.",
  hint:"Un nombre est premier s'il n'a que deux diviseurs : 1 et lui-même. Teste les petits nombres premiers : 2, 3, 5, 7, 11, 13. Un leurre est le produit de deux nombres premiers.",
  docs:sh=>`<div class="doc"><div class="tag">Panneaux du sas · touchez un panneau pour le marquer</div><div class="tiles">${sh.d.sas.map((n,i)=>`<button class="tile" data-tog="${i}" data-n="${n}"><span class="lt">${"ABCDEF"[i]}</span><b>${n}</b><span class="st">?</span></button>`).join("")}</div><p class="note">Marque chaque panneau : <b>premier</b>, ou <b>leurre</b>. Le code est la somme des nombres premiers.</p></div>`,
  postes:()=>[],tiles:true,
  suggest:(v,sh)=>{const t=v.tog||{};const k=Object.keys(t);if(k.length<6)return null;return sh.d.sas.reduce((s,n,i)=>s+(t[i]==="p"?n:0),0)}},
 {id:"labo",name:"Laboratoire",short:"Labo",part:"la réserve de carburant",chap:"Pourcentages",
  story:"Coque scellée ! La réserve de carburant a fondu pendant la tempête. Le laboratoire doit la reconstituer. Lisez le journal du laboratoire, puis trouvez la <b>réserve finale</b>.",
  fix:"Réserve reconstituée !",
  hint:"Si on perd 20 % de 50 L, il reste 80 % de 50 L = 40 L. Ici, la valeur qui reste est un pourcentage de la réserve d'avant : cherche 1 %, puis 100 %. Pour une hausse de q %, la réserve devient (100 + q) % de ce qu'elle était.",
  docs:sh=>{const [R,p,q]=sh.d.labo,V1=R*(100-p)/100;return `<div class="doc journal"><div class="tag">Journal du laboratoire</div>
   <p><b>Avant la tempête</b> : la réserve de carburant (inconnue) était pleine.</p>
   <p><b>Après la tempête</b> : la réserve a baissé de <b>${p} %</b>. Il reste <b>${V1} L</b>.</p>
   <p><b>Réparation</b> : on remet la réserve à son niveau d'avant la tempête, puis on l'augmente de <b>${q} %</b> pour tenir le voyage.</p>
   <p class="muted">Température du banc d'essai : 21 °C. Panneau de secours : 12 kW.</p>
   <p class="q">Quelle sera la réserve finale ?</p></div>`},
  postes:()=>[post("R","Réserve avant la tempête","L"),post("F","Réserve finale","L")],
  suggest:v=>v.F||null},
 {id:"machines",name:"Salle des machines",short:"Machines",part:"les moteurs",chap:"Pythagore",
  story:"Les moteurs sont déréglés. Chaque plaque est un triangle rectangle : trouvez son <b>côté manquant</b>. La tempête a faussé une plaque : son côté n'est pas un nombre entier. Le code est <b>la somme des 3 bons côtés</b>.",
  fix:"Moteurs relancés !",
  hint:"Repère l'angle droit. Le côté en face est l'hypoténuse, le plus long. Hypoténuse inconnue : on additionne les carrés, puis racine carrée. Côté de l'angle droit inconnu : on soustrait. La plaque fausse a une racine qui n'est pas entière.",
  docs:sh=>`<div class="doc"><div class="tag">Plaques de réglage</div><div class="plaques">${[0,1,2,3].map(i=>triangle(sh,i)).join("")}</div></div>`,
  postes:()=>[1,2,3,4].map(i=>({id:"p"+i,label:"Plaque "+i+" : côté manquant",unit:"cm",bad:true})),
  suggest:v=>{let s=0,n=0;for(let i=1;i<=4;i++){if(v["b"+i])continue;if(v["p"+i]==null||v["p"+i]==="")return null;s+=parseFloat(String(v["p"+i]).replace(",","."));n++}return n===3?s:null}},
 {id:"nav",name:"Navigation",short:"Navig.",part:"le cap",chap:"Pythagore + Grandeurs",
  story:"Il faut rejoindre la balise du réacteur. Le pilote automatique a besoin de <b>la durée du voyage</b>. Le vaisseau fonce en ligne droite, à vitesse constante. Le code est cette durée, en années.",
  fix:"Cap verrouillé !",
  hint:"Compte les carreaux : un écart horizontal et un écart vertical forment un angle droit. La distance en ligne droite est l'hypoténuse. Convertis les carreaux en al, puis durée = distance ÷ vitesse.",
  docs:sh=>carte(sh)+`<div class="doc"><div class="tag">Tableau de bord du vaisseau</div><p>Vitesse de croisière : <b>${fr(sh.d.nav.v)} al par an</b>.</p><p class="muted">Carburant : OK. Boucliers : 80 %.</p></div>`,
  postes:()=>[post("c","Distance en ligne droite","carreaux"),post("D","Distance","al"),post("T","Durée du voyage","ans")],
  suggest:v=>v.T||null},
 {id:"comms",name:"Communications",short:"Comms",part:"l'antenne",chap:"Grandeurs",
  story:"Il faut prévenir la flotte. L'émetteur va fonctionner un moment : cela consomme de l'énergie, et l'énergie se paie. Le code est <b>le coût de l'émission</b>, en centimes.",
  fix:"Signal envoyé !",
  hint:"Énergie (kWh) = puissance (kW) × durée (h). Convertis les W en kW et la durée en heures. Coût = énergie × prix d'un kWh. Le mode veille ne compte pas : l'émetteur est allumé.",
  docs:sh=>{const c=sh.d.com,[h,m]=c.t;return `<div class="doc journal"><div class="tag">Relevé de l'émetteur</div>
   <p>Puissance en émission : <b>${String(c.P).replace(/\B(?=(\d{3})+$)/g," ")} W</b></p>
   <p>Durée d'émission : <b>${h?h+" h ":""}${m?m+" min":""}</b></p>
   <p>Prix de l'énergie : <b>${c.px} centimes</b> le kWh</p>
   <p class="muted">Mode veille : ${c.vei} W (éteint).</p>
   <p class="q">Quel est le coût de l'émission, en centimes ?</p></div>`},
  postes:()=>[post("E","Énergie consommée","kWh"),post("K","Coût","centimes")],
  suggest:v=>v.K||null},
 {id:"serre",name:"Serre",short:"Serre",part:"l'oxygène",chap:"Grandeurs + Pourcentages",
  story:"Dernière panne : l'oxygène. La serre doit remplir sa cuve d'eau. Combien de temps la pompe va-t-elle fonctionner ? <b>Ce nombre de minutes</b> est la <b>barre d'énergie</b> de votre vaisseau : retenez-le, le réacteur en aura besoin !",
  fix:"Oxygène rétabli !",
  hint:"Volume du pavé = longueur × largeur × hauteur, avec la même unité. 1 dm³ = 1 L. La cuve est déjà remplie à p % : il reste (100 − p) % à ajouter. Durée = volume à ajouter ÷ débit.",
  docs:sh=>{const [,, ,p,d]=sh.d.ser;return `<div class="doc"><div class="tag">Cuve de la serre</div><div class="cuve">${cuve(sh)}</div>
   <p>La cuve est déjà remplie à <b>${p} %</b> de sa capacité.</p><p>La pompe a un débit de <b>${d} L par minute</b>.</p><p class="muted">Température de la serre : 22 °C.</p>
   <p class="q">Combien de minutes faut-il pour remplir complètement la cuve ?</p></div>`},
  postes:()=>[post("V","Volume de la cuve","L"),post("A","Volume à ajouter","L"),post("T","Durée de remplissage","min")],
  suggest:v=>v.T||null}
];
})();
