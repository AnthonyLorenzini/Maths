/* Décors SVG — Dernier Signal · Opération Pythagore (4e)
   Chaque scène est une chaîne SVG 800×420. Les nombres utiles au calcul sont aussi repris
   dans des cartes lisibles (jeu.js) : le décor sert à l'immersion. */
window.DEC=(function(){
const F='font-family="Chakra Petch, sans-serif"';
let CTX=null;let _s=7;const rnd=()=>{_s=(_s*16807)%2147483647;return _s/2147483647};
const seed=n=>{_s=n};

/* ---------- définitions communes ---------- */
const D=(u,c)=>`<defs>
<linearGradient id="${u}wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26385a"/><stop offset=".5" stop-color="#16233b"/><stop offset="1" stop-color="#0a101d"/></linearGradient>
<linearGradient id="${u}metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a7ea5"/><stop offset=".45" stop-color="#37486e"/><stop offset="1" stop-color="#202d49"/></linearGradient>
<linearGradient id="${u}steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22314f"/><stop offset=".28" stop-color="#8aa0c6"/><stop offset=".5" stop-color="#4b5e86"/><stop offset="1" stop-color="#18243d"/></linearGradient>
<linearGradient id="${u}tube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2943"/><stop offset=".3" stop-color="#9fb4d8"/><stop offset=".55" stop-color="#52668e"/><stop offset="1" stop-color="#18233b"/></linearGradient>
<linearGradient id="${u}floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2740"/><stop offset="1" stop-color="#070b14"/></linearGradient>
<linearGradient id="${u}glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe3ff" stop-opacity=".35"/><stop offset=".5" stop-color="#7fb4e8" stop-opacity=".08"/><stop offset="1" stop-color="#bfe3ff" stop-opacity=".25"/></linearGradient>
<radialGradient id="${u}glow"><stop offset="0" stop-color="${c}" stop-opacity=".85"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>
<radialGradient id="${u}vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
<pattern id="${u}grate" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#101a2e"/><path d="M0 7H14M7 0V14" stroke="#2f4268" stroke-width="2"/></pattern>
<pattern id="${u}hz" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="26" height="26" fill="#161616"/><rect width="13" height="26" fill="#e8a317"/></pattern>
<pattern id="${u}scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="1.4" fill="#000" opacity=".28"/></pattern>
<pattern id="${u}hex" width="26" height="22.5" patternUnits="userSpaceOnUse"><path d="M13 0L26 7.5V22.5L13 30M0 7.5L13 0M0 7.5V22.5L13 30" fill="none" stroke="#2f4268" stroke-width="1"/></pattern>
<filter id="${u}neon" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="${u}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="${u}grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .07 0"/></filter>
</defs>`;
const plate=(c)=>CTX?`<g transform="translate(12 10)"><rect width="${34+CTX.length*8.2}" height="26" rx="6" fill="#050a14" stroke="${c}" stroke-opacity=".7" stroke-width="1.5"/><circle cx="14" cy="13" r="3.4" fill="${c}"/><text x="26" y="17.5" ${F} font-weight="700" font-size="12" letter-spacing="2" fill="${c}">${CTX}</text></g>`:"";
const wrap=(u,c,body,extra="")=>`<svg viewBox="0 0 800 420" role="img" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${D(u,c)}${body}<rect width="800" height="420" fill="url(#${u}vig)"/><rect width="800" height="420" filter="url(#${u}grain)"/>${plate(c)}${extra}</svg>`;

/* ---------- briques ---------- */
const rivets=(x,y,w,h,n=0)=>{let s="";const pts=[[x+7,y+7],[x+w-7,y+7],[x+7,y+h-7],[x+w-7,y+h-7]];for(let i=1;i<n;i++){pts.push([x+7+(w-14)*i/n,y+7],[x+7+(w-14)*i/n,y+h-7])}
  pts.forEach(p=>s+=`<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="#8da2c9" opacity=".7"/><circle cx="${p[0]+.7}" cy="${p[1]+.8}" r="1.4" fill="#0b1426" opacity=".8"/>`);return s};
const panel=(u,x,y,w,h,o={})=>`<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r??6}" fill="url(#${u}${o.f||"metal"})" stroke="#0a1224" stroke-width="2"/><rect x="${x+2}" y="${y+2}" width="${w-4}" height="${h-4}" rx="${(o.r??6)-1}" fill="none" stroke="#a9bde0" stroke-opacity=".22"/>${rivets(x,y,w,h,o.n||0)}</g>`;
const pipe=(u,d,w,col="#4b5e86",anim="")=>`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${d}" stroke="#070d1a" stroke-width="${w+5}"/><path d="${d}" stroke="${col}" stroke-width="${w}"/><path d="${d}" stroke="#fff" stroke-opacity=".22" stroke-width="${Math.max(2,w/4)}" transform="translate(-${w/5} -${w/5})"/>${anim}</g>`;
const lamp=(u,x,y,col,r=5,cls="blink",d=0)=>`<g><circle cx="${x}" cy="${y}" r="${r*3}" fill="${col}" opacity=".22" class="${cls}" style="animation-delay:${d}s"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}" class="${cls}" style="animation-delay:${d}s"/><circle cx="${x-r/3}" cy="${y-r/3}" r="${r/3}" fill="#fff" opacity=".7"/></g>`;
const vent=(u,x,y,w,h,n=6)=>{let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="#070d1a" stroke="#34466d"/>`;for(let i=0;i<n;i++){const yy=y+4+i*(h-8)/n;s+=`<rect x="${x+4}" y="${yy}" width="${w-8}" height="${(h-8)/n-3}" fill="#1a2744"/>`}return s};
const bundle=(x1,y1,x2,y2,n=5,sag=40)=>{let s="";for(let i=0;i<n;i++){const o=(i-n/2)*4,col=["#e8a317","#ff6b6b","#5fd68a","#7cc8ff","#c9a2ff"][i%5];s+=`<path d="M${x1} ${y1+o} C${x1+(x2-x1)*.3} ${y1+sag+o} ${x1+(x2-x1)*.7} ${y2+sag+o} ${x2} ${y2+o}" fill="none" stroke="#050a14" stroke-width="5"/><path d="M${x1} ${y1+o} C${x1+(x2-x1)*.3} ${y1+sag+o} ${x1+(x2-x1)*.7} ${y2+sag+o} ${x2} ${y2+o}" fill="none" stroke="${col}" stroke-width="2.6" opacity=".9"/>`}return s};
const screen=(u,x,y,w,h,c,rows=5,title="")=>{let s=`<rect x="${x-6}" y="${y-6}" width="${w+12}" height="${h+12}" rx="9" fill="#0a1224" stroke="#33476d" stroke-width="2"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#06101f"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${c}" opacity=".07"/>`;
  for(let i=0;i<rows;i++){const ww=(.35+((i*37)%55)/100)*(w-20);s+=`<rect x="${x+10}" y="${y+12+i*(h-20)/rows}" width="${ww}" height="4" rx="2" fill="${c}" opacity="${.35+((i*13)%5)/10}"/>`}
  if(title)s+=`<text x="${x+w/2}" y="${y+h-8}" text-anchor="middle" ${F} font-size="10" letter-spacing="2" fill="${c}" opacity=".9">${title}</text>`;
  return s+`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#${u}scan)"/><rect x="${x}" y="${y}" width="${w*.5}" height="${h}" fill="url(#${u}glass)" opacity=".25"/>`};
const gauge=(u,cx,cy,r,val,c,lab="")=>{let t="";for(let i=0;i<=10;i++){const a=Math.PI*(1.15+0.7*i/10)*1,x1=cx+Math.cos(Math.PI*(1+i/10*1))*r*.8;}
  let ticks="";for(let i=0;i<=10;i++){const a=Math.PI*(0.85+1.3*i/10);ticks+=`<line x1="${cx+Math.cos(a)*r*.78}" y1="${cy+Math.sin(a)*r*.78}" x2="${cx+Math.cos(a)*r*.93}" y2="${cy+Math.sin(a)*r*.93}" stroke="#a9bde0" stroke-width="${i%5?1:2}"/>`}
  const a=Math.PI*(0.85+1.3*val);return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0a1224" stroke="#4b5e86" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r*.9}" fill="#0f1a30"/>${ticks}<path d="M${cx+Math.cos(Math.PI*.85)*r*.62} ${cy+Math.sin(Math.PI*.85)*r*.62} A${r*.62} ${r*.62} 0 0 1 ${cx+Math.cos(a)*r*.62} ${cy+Math.sin(a)*r*.62}" fill="none" stroke="${c}" stroke-width="4" opacity=".8"/><line x1="${cx}" y1="${cy}" x2="${cx+Math.cos(a)*r*.7}" y2="${cy+Math.sin(a)*r*.7}" stroke="#ff6b6b" stroke-width="2.5" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="4" fill="#cfd9ee"/><text x="${cx}" y="${cy+r*.55}" text-anchor="middle" ${F} font-size="${r*.2}" fill="${c}" letter-spacing="1">${lab}</text>`};
const stars=(n,y0=0,y1=420,x0=0,x1=800,sd=11)=>{seed(sd);let s="";for(let i=0;i<n;i++){const r=rnd(),x=x0+rnd()*(x1-x0),y=y0+rnd()*(y1-y0);s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.4+r*1.3).toFixed(1)}" fill="#fff" opacity="${(.3+r*.7).toFixed(2)}" ${r>.86?`class="twinkle" style="animation-delay:${(r*9).toFixed(1)}s"`:""}/>`}return s};
const floor=(u,y,h=420-y)=>`<rect x="0" y="${y}" width="800" height="${h}" fill="url(#${u}floor)"/><rect x="0" y="${y}" width="800" height="${h}" fill="url(#${u}grate)" opacity=".5"/><rect x="0" y="${y}" width="800" height="5" fill="#8da2c9" opacity=".3"/>`;
const ceiling=(u,c)=>`<rect x="0" y="0" width="800" height="46" fill="url(#${u}metal)"/><rect x="0" y="46" width="800" height="6" fill="#050a14"/>${pipe(u,"M0 24 H800",11,"#3f527a")}${pipe(u,"M0 36 H800",5,"#e8a317")}${[100,300,500,700].map(x=>`<rect x="${x-3}" y="8" width="6" height="40" fill="#0a1224" opacity=".8"/>`).join("")}${[130,400,670].map((x,i)=>lamp(u,x,52,"#fff6d8",4,"flick",i*.7)+`<polygon points="${x-10},56 ${x+10},56 ${x+70},330 ${x-70},330" fill="#fff6d8" opacity=".045"/>`).join("")}`;

/* ---------- vaisseau ---------- */
const shipArt=(u,c,s=1,fl=1,id="")=>`<g transform="scale(${s*fl} ${s})">
<g class="flame"><ellipse cx="-62" cy="0" rx="34" ry="8" fill="${c}" opacity=".35" filter="url(#${u}soft)"/><path d="M-46 -5 L-92 0 L-46 5 Z" fill="#fff" opacity=".85"/><path d="M-46 -8 L-74 0 L-46 8 Z" fill="${c}" opacity=".9"/></g>
<path d="M-48 -14 L-30 -30 L28 -22 L70 -6 L82 0 L70 6 L28 22 L-30 30 L-48 14 Z" fill="url(#${u}steel)" stroke="#0a1224" stroke-width="2"/>
<path d="M-30 -30 L-6 -62 L18 -60 L10 -22 Z" fill="url(#${u}metal)" stroke="#0a1224" stroke-width="2"/><path d="M-30 30 L-6 62 L18 60 L10 22 Z" fill="url(#${u}metal)" stroke="#0a1224" stroke-width="2"/>
<path d="M-6 -62 L-12 -66 L-4 -68 L2 -63Z M-6 62 L-12 66 L-4 68 L2 63Z" fill="${c}"/>
<path d="M-20 -13 H40 L70 -4 V4 L40 13 H-20 Z" fill="${c}" opacity=".22"/><path d="M26 -9 L56 -3 L56 3 L26 9 Z" fill="#0b2a44" stroke="#bfe3ff" stroke-width="1.3"/><path d="M30 -6 L50 -2 L38 -1 Z" fill="#fff" opacity=".6"/>
<rect x="-40" y="-3" width="62" height="6" fill="${c}" opacity=".85"/>${[-34,-22,-10,2,14].map(x=>`<rect x="${x}" y="-12" width="6" height="4" rx="1" fill="#bfe3ff" opacity=".7"/>`).join("")}
<circle cx="-40" cy="-20" r="2.5" fill="#ff6b6b" class="blink"/><circle cx="-40" cy="20" r="2.5" fill="#5fd68a" class="blink" style="animation-delay:.6s"/></g>`;

/* ================= HÉROS : la flotte (écran du professeur) ================= */
const SHIP_P=[[120,92],[120,166],[120,240],[120,314],[120,388]];
const hero=(ships,prog,final,total)=>{const u="h";seed(5);
  const px=(i,st)=>{const x0=130,x1=560,y=70+i*62,k=Math.min(st,(window.NR||6))/(window.NR||6);return[x0+(x1-x0)*k,y+Math.sin(k*3.1)*10]};
  let sh="";ships.forEach((s,i)=>{const st=prog[s.id]||0,[x,y]=px(i,st);
    sh+=`<g transform="translate(${x} ${y})" class="${st>=(window.NR||6)?"docked":"cruise"}"><g>${shipArt(u,s.c,.42,1)}</g><text x="0" y="-30" text-anchor="middle" ${F} font-weight="700" font-size="13" letter-spacing="2" fill="${s.c}">${s.name.toUpperCase()}</text></g>`;
    sh+=`<line x1="130" y1="${70+i*62}" x2="560" y2="${70+i*62}" stroke="${s.c}" stroke-opacity=".13" stroke-dasharray="3 8"/>`;
    for(let k=0,n=(window.NR||6);k<=n;k++){sh+=`<circle cx="${130+430*k/n}" cy="${70+i*62}" r="${k<=st?3.4:2}" fill="${k<=st?s.c:"#33476d"}" opacity="${k<=st?.9:.6}"/>`}});
  const core=final?"#5fd68a":(total?"#ffb547":"#53627f");
  return `<svg viewBox="0 0 800 420" role="img" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">${D(u,"#ffb547")}
<rect width="800" height="420" fill="#050914"/>
<ellipse cx="560" cy="120" rx="360" ry="200" fill="#4a2a78" opacity=".28" filter="url(#hsoft)"/><ellipse cx="180" cy="330" rx="300" ry="150" fill="#1d4f7a" opacity=".3" filter="url(#hsoft)"/><ellipse cx="420" cy="220" rx="240" ry="90" fill="#8a3c5e" opacity=".18" filter="url(#hsoft)"/>
${stars(150)}
<circle cx="60" cy="440" r="200" fill="#1b4a7a"/><circle cx="60" cy="440" r="200" fill="url(#hvig)"/><path d="M-140 430 A200 200 0 0 1 250 360" fill="none" stroke="#7cc8ff" stroke-width="4" opacity=".55"/>
${sh}
<g transform="translate(650 210)"><circle r="150" fill="url(#hglow)" opacity="${final?.7:.32}" class="pulse"/>
<g class="spin"><circle r="92" fill="none" stroke="#3d4f77" stroke-width="16"/><circle r="92" fill="none" stroke="#9fb4d8" stroke-width="2" stroke-dasharray="3 9"/>${[0,60,120,180,240,300].map(a=>`<g transform="rotate(${a})"><rect x="84" y="-12" width="16" height="24" rx="3" fill="#5a6f9a" stroke="#0a1224"/><rect x="88" y="-4" width="8" height="8" fill="${core}" opacity=".9"/></g>`).join("")}</g>
${[0,90,180,270].map(a=>`<rect transform="rotate(${a})" x="-6" y="-84" width="12" height="60" fill="url(#htube)" stroke="#0a1224"/>`).join("")}
<circle r="44" fill="#0a1224" stroke="#8da2c9" stroke-width="3"/><circle r="34" fill="${core}" opacity="${final?.95:.45}" filter="url(#hneon)" class="${final?"pulse":""}"/><circle r="14" fill="#fff" opacity="${final?.9:.25}"/>
</g><text x="650" y="338" text-anchor="middle" ${F} font-weight="700" font-size="14" letter-spacing="4" fill="${core}">RÉACTEUR</text>
${total?`<text x="650" y="360" text-anchor="middle" ${F} font-size="13" letter-spacing="3" fill="${core}">${final?"SIGNAL RÉTABLI":"5 / 5 · RÉACTEUR PRÊT"}</text>`:""}
<rect width="800" height="420" fill="url(#hvig)"/></svg>`};

/* ================= SALLE 1 · LE SAS ================= */
const sas=(c,nums,N)=>{const u="a";seed(21);
  let plates="";nums.forEach((n,i)=>{const col=i%3,row=(i/3)|0,x=406+col*118,y=118+row*96;
    plates+=`<g><rect x="${x}" y="${y}" width="106" height="82" rx="8" fill="#0a1224" stroke="#4b5e86" stroke-width="3"/><rect x="${x+5}" y="${y+5}" width="96" height="72" rx="5" fill="#07111f"/><rect x="${x+5}" y="${y+5}" width="96" height="72" rx="5" fill="${c}" opacity=".08"/>
    <text x="${x+53}" y="${y+54}" text-anchor="middle" ${F} font-weight="700" font-size="40" fill="${c}" filter="url(#${u}neon)">${n}</text>
    <text x="${x+12}" y="${y+19}" ${F} font-size="10" fill="#8ea0bc" letter-spacing="2">${"ABCDEF"[i]}</text>${lamp(u,x+92,y+16,"#ffb547",3.2,"blink",i*.4)}<rect x="${x+5}" y="${y+5}" width="96" height="72" rx="5" fill="url(#${u}scan)"/></g>`});
  let bolts="";for(let i=0;i<12;i++){const a=i*30*Math.PI/180;bolts+=`<g transform="translate(${190+Math.cos(a)*142} ${222+Math.sin(a)*142}) rotate(${i*30})"><rect x="-10" y="-6" width="20" height="12" rx="3" fill="url(#${u}steel)" stroke="#0a1224" stroke-width="1.6"/></g>`}
  return wrap(u,c,`<rect width="800" height="420" fill="url(#${u}wall)"/>
  ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${i*100+6}" y="60" width="88" height="260" fill="#0f1a30" stroke="#22324f" opacity=".6"/>`).join("")}
  ${ceiling(u,c)}${bundle(300,54,420,90,4,34)}${bundle(660,54,560,100,3,26)}
  ${panel(u,24,64,332,332,{r:14,n:6})}
  <circle cx="190" cy="222" r="158" fill="#0a1224"/><circle cx="190" cy="222" r="150" fill="url(#${u}hz)"/><circle cx="190" cy="222" r="136" fill="url(#${u}steel)" stroke="#0a1224" stroke-width="4"/>${bolts}
  <circle cx="190" cy="222" r="112" fill="#1b2943" stroke="#0a1224" stroke-width="4"/><circle cx="190" cy="222" r="96" fill="#0c1730"/><circle cx="190" cy="222" r="96" fill="url(#${u}hex)"/>
  <g class="spin slow"><circle cx="190" cy="222" r="74" fill="none" stroke="#8da2c9" stroke-width="7"/>${[0,60,120,180,240,300].map(a=>`<rect transform="rotate(${a} 190 222)" x="186" y="150" width="8" height="64" rx="4" fill="#8da2c9" stroke="#0a1224"/>`).join("")}<circle cx="190" cy="222" r="20" fill="#5a6f9a" stroke="#0a1224" stroke-width="3"/><circle cx="190" cy="222" r="7" fill="${c}" opacity=".8"/></g>
  <path d="M150 140 L168 176 L152 188 L174 226" fill="none" stroke="#ff6b6b" stroke-width="3" opacity=".85" filter="url(#${u}neon)"/><path d="M150 140 L168 176 L152 188 L174 226" fill="none" stroke="#fff" stroke-width="1"/>
  ${[[150,140],[168,176],[174,226]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#ffe08a" class="blink" style="animation-delay:${i*.3}s"/>`).join("")}
  ${panel(u,386,66,346,262,{r:12,n:5})}<text x="559" y="100" text-anchor="middle" ${F} font-weight="700" font-size="15" letter-spacing="4" fill="${c}">NOMBRE-CLÉ · N = ${N}</text>
  <line x1="400" y1="108" x2="718" y2="108" stroke="${c}" stroke-opacity=".5"/>${plates}
  ${panel(u,742,110,44,132,{r:8})}${lamp(u,764,136,"#ff6b6b",5,"blink")}${lamp(u,764,166,"#ffb547",5,"blink",.4)}${lamp(u,764,196,"#5fd68a",5,"blink",.8)}
  ${floor(u,352)}<rect x="24" y="360" width="332" height="18" fill="url(#${u}hz)" opacity=".9"/>
  <g transform="translate(760 316)"><rect x="-26" y="0" width="52" height="82" rx="6" fill="#1b2943" stroke="#0a1224" stroke-width="2"/><ellipse cx="0" cy="-8" rx="21" ry="22" fill="#cfd9ee" stroke="#0a1224" stroke-width="2"/><ellipse cx="0" cy="-8" rx="14" ry="15" fill="#0b2a44"/><path d="M-26 14 H26" stroke="#ffb547" stroke-width="4"/></g>
  <g transform="translate(572 354)"><rect x="-34" y="0" width="68" height="46" rx="4" fill="#2a3b5a" stroke="#0a1224" stroke-width="2"/><rect x="-34" y="0" width="68" height="10" fill="#e8a317"/><text x="0" y="32" text-anchor="middle" ${F} font-size="10" fill="#cfd9ee" letter-spacing="2">URGENCE</text></g>
  <g class="spark">${[0,1,2,3,4].map(i=>`<line x1="${150+i*4}" y1="${142+i*3}" x2="${132+i*(i%2?-6:9)}" y2="${128-i*7}" stroke="#ffe08a" stroke-width="1.6"/>`).join("")}</g>
  <rect x="86" y="379" width="208" height="22" rx="4" fill="#0a1224" stroke="#e8a317"/><text x="190" y="395" text-anchor="middle" ${F} font-weight="700" font-size="13" letter-spacing="6" fill="#ff6b6b" class="blink">SAS VERROUILLÉ</text>`)};

/* ================= SALLE 2 · LE LABORATOIRE ================= */
const labo=(c,v)=>{const u="b";seed(33);const [VA,pa,VB,pb]=v||[240,25,160,50];
  const sc=190/Math.max(VA,VB),yb=318,W=112;
  const tank=(x,name,V,p)=>{const h=V*sc,ha=h*p/100,yt=yb-h,ya=yb-ha,tick=[0,.25,.5,.75,1].map(f=>{const y=yb-h*f;return `<line x1="${x-6}" y1="${y}" x2="${x+4}" y2="${y}" stroke="#cfd9ee" stroke-width="1.6"/><text x="${x-9}" y="${y+3}" text-anchor="end" ${F} font-size="8.5" fill="#8ea0bc">${f*100}</text>`}).join("");
    return `<g>${panel(u,x-22,70,W+44,34,{r:8})}<text x="${x+W/2}" y="85" text-anchor="middle" ${F} font-weight="700" font-size="12" letter-spacing="4" fill="${c}">CUVE ${name}</text><text x="${x+W/2}" y="99" text-anchor="middle" ${F} font-size="11" fill="#e8eefc">${V} L · ${p} % d'additif</text>
    <rect x="${x-4}" y="108" width="${W+8}" height="222" rx="20" fill="#0a1224" stroke="#4b5e86" stroke-width="4"/><rect x="${x+2}" y="114" width="${W-4}" height="210" rx="16" fill="#06101f"/>
    <rect x="${x+2}" y="${yt}" width="${W-4}" height="${h}" fill="#7cc8ff" opacity=".42"/><rect x="${x+2}" y="${ya}" width="${W-4}" height="${ha}" fill="${c}" opacity=".8"/>
    <path d="M${x+2} ${yt} Q${x+W*.25} ${yt-6} ${x+W*.5} ${yt} T${x+W-2} ${yt}" fill="none" stroke="#bfe3ff" stroke-width="2" opacity=".8"/><line x1="${x+2}" y1="${ya}" x2="${x+W-2}" y2="${ya}" stroke="#fff" stroke-width="1.4" stroke-dasharray="4 3" opacity=".8"/>
    <text x="${x+W/2}" y="${(ya+yb)/2+4}" text-anchor="middle" ${F} font-weight="700" font-size="12" fill="#1a1200">additif</text>${tick}<rect x="${x+2}" y="114" width="${W-4}" height="210" rx="16" fill="url(#${u}glass)"/>
    <circle cx="${x+W/2}" cy="${yb-ha/2-0}" r="0" fill="none"/><rect x="${x+W/2-9}" y="330" width="18" height="12" rx="3" fill="#34466d" stroke="#0a1224"/></g>`};
  const bub=[0,1,2,3,4,5].map(i=>`<circle cx="${548+i*18}" cy="${300-i*6}" r="${3+(i%3)}" fill="#bfe3ff" opacity=".5" class="blink" style="animation-delay:${i*.35}s"/>`).join("");
  return wrap(u,c,`<rect width="800" height="420" fill="url(#${u}wall)"/>
  ${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${i*100+6}" y="56" width="88" height="270" fill="#0f1a30" stroke="#22324f" opacity=".55"/>`).join("")}
  ${ceiling(u,c)}${bundle(0,66,800,60,4,10)}
  ${tank(46,"A",VA,pa)}${tank(232,"B",VB,pb)}
  ${pipe(u,"M102 342 V362 H590 V330",9,"#4b5e86")}${pipe(u,"M288 342 V356",9,"#4b5e86")}
  <g transform="translate(160 364)"><circle r="11" fill="#0a1224" stroke="#e8a317" stroke-width="3"/><path d="M-8 0H8M0 -8V8" stroke="#e8a317" stroke-width="3"/></g><g transform="translate(340 358)"><circle r="11" fill="#0a1224" stroke="#e8a317" stroke-width="3"/><path d="M-8 0H8M0 -8V8" stroke="#e8a317" stroke-width="3"/></g>
  <g>${panel(u,500,70,128,34,{r:8})}<text x="564" y="85" text-anchor="middle" ${F} font-weight="700" font-size="12" letter-spacing="3" fill="${c}">MÉLANGE</text><text x="564" y="99" text-anchor="middle" ${F} font-size="11" fill="#e8eefc">A + B · ? % d'additif</text>
   <rect x="496" y="108" width="136" height="222" rx="22" fill="#0a1224" stroke="#4b5e86" stroke-width="4"/><rect x="502" y="114" width="124" height="210" rx="18" fill="#06101f"/>
   <rect x="502" y="214" width="124" height="110" fill="#7cc8ff" opacity=".16"/><line x1="502" y1="214" x2="626" y2="214" stroke="#fff" stroke-width="1.5" stroke-dasharray="5 4" opacity=".7"/>
   <text x="564" y="206" text-anchor="middle" ${F} font-size="10" letter-spacing="2" fill="#8ea0bc">VOLUME TOTAL ?</text>${bub}<rect x="502" y="114" width="124" height="210" rx="18" fill="url(#${u}glass)"/></g>
  ${panel(u,662,96,124,200,{r:10,n:3})}<rect x="672" y="106" width="104" height="104" rx="8" fill="#05101f" stroke="#33476d"/>
  <path d="M684 190 A40 40 0 0 1 764 190" fill="none" stroke="#22324f" stroke-width="10"/><path d="M684 190 A40 40 0 0 1 724 150" fill="none" stroke="${c}" stroke-width="10" opacity=".6" class="pulse"/><text x="724" y="188" text-anchor="middle" ${F} font-weight="700" font-size="30" fill="${c}" filter="url(#${u}neon)">?</text><text x="724" y="204" text-anchor="middle" ${F} font-size="9" letter-spacing="2" fill="#8ea0bc">% ADDITIF</text>
  <text x="724" y="232" text-anchor="middle" ${F} font-size="10" letter-spacing="2" fill="${c}">ANALYSEUR</text>${lamp(u,684,258,"#5fd68a",4,"blink")}${lamp(u,708,258,"#ffb547",4,"blink",.4)}${lamp(u,732,258,"#ff6b6b",4,"blink",.8)}<rect x="676" y="272" width="96" height="10" rx="3" fill="#0a1224" stroke="#33476d"/>
  ${floor(u,376,44)}
  `)};
const machines=(c,plates)=>{const u="c";seed(44);
  const blades=(r,n)=>{let s="";for(let i=0;i<n;i++){const a=360*i/n;s+=`<path transform="rotate(${a})" d="M0 -${r*.18} Q${r*.3} -${r*.55} ${r*.14} -${r*.92} Q-${r*.08} -${r*.6} -${r*.06} -${r*.18} Z" fill="url(#${u}steel)" stroke="#0a1224" stroke-width="1.6"/>`}return s};
  const turbine=(x,y,r,rev)=>`<g transform="translate(${x} ${y})"><circle r="${r+14}" fill="#0a1224"/><circle r="${r+8}" fill="url(#${u}steel)" stroke="#0a1224" stroke-width="3"/>${Array.from({length:16},(_,i)=>`<circle cx="${Math.cos(i*Math.PI/8)*(r+3)}" cy="${Math.sin(i*Math.PI/8)*(r+3)}" r="2.6" fill="#0a1224"/>`).join("")}<circle r="${r-4}" fill="#050a14"/><circle r="${r-4}" fill="${c}" opacity=".12"/><g class="spin ${rev?"rev":""}">${blades(r-6,9)}</g><circle r="${r*.2}" fill="#5a6f9a" stroke="#0a1224" stroke-width="3"/><circle r="${r*.07}" fill="${c}" filter="url(#${u}neon)"/></g>`;
  const piston=(x,d)=>`<g transform="translate(${x} 250)"><rect x="-18" y="0" width="36" height="86" rx="6" fill="url(#${u}tube)" stroke="#0a1224" stroke-width="2"/><g class="pist" style="animation-delay:${d}s"><rect x="-7" y="-46" width="14" height="60" fill="#cfd9ee" stroke="#0a1224"/><rect x="-14" y="-52" width="28" height="12" rx="3" fill="#5a6f9a" stroke="#0a1224"/></g><rect x="-22" y="76" width="44" height="14" rx="3" fill="#2a3b5a" stroke="#0a1224"/></g>`;
  let sl="";plates.forEach((p,i)=>{const x=282+i*58;sl+=`<g><rect x="${x}" y="168" width="50" height="50" rx="5" fill="#0a1224" stroke="#4b5e86" stroke-width="2"/><path d="M${x+10} ${i%2?200:208} L${x+40} ${i%2?208:208} L${x+10} ${i%2?178:182} Z" fill="none" stroke="${c}" stroke-width="2" opacity=".9"/><text x="${x+25}" y="228" text-anchor="middle" ${F} font-weight="700" font-size="13" fill="${c}">${i+1}</text>${lamp(u,x+42,176,p===null?"#ff6b6b":"#ffb547",2.6,"blink",i*.3)}</g>`});
  return wrap(u,c,`<rect width="800" height="420" fill="url(#${u}wall)"/>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${i*100+6}" y="58" width="88" height="270" fill="#0f1a30" stroke="#22324f" opacity=".55"/>`).join("")}
  ${ceiling(u,c)}${pipe(u,"M0 100 H110 Q130 100 130 120 V158",14,"#3f527a")}${pipe(u,"M800 100 H690 Q670 100 670 120 V158",14,"#3f527a")}${pipe(u,"M262 52 V150 H538 V52",10,"#e8a317")}
  ${turbine(124,244,92,false)}${turbine(676,244,92,true)}
  ${piston(268,0)}${piston(332,.35)}${piston(468,.7)}${piston(532,.15)}
  <g>${panel(u,262,112,276,136,{r:10,n:5})}<text x="400" y="134" text-anchor="middle" ${F} font-weight="700" font-size="12" letter-spacing="5" fill="${c}">PLAQUES DE RÉGLAGE</text>${sl}
  <rect x="274" y="150" width="252" height="2" fill="${c}" opacity=".4"/></g>
  ${gauge(u,400,300,34,.62,c,"BAR")}
  <g class="steam">${[0,1,2].map(i=>`<circle cx="${224+i*10}" cy="${108-i*6}" r="${8+i*3}" fill="#cfd9ee" opacity=".22"/>`).join("")}${[0,1,2].map(i=>`<circle cx="${590-i*10}" cy="${108-i*6}" r="${8+i*3}" fill="#cfd9ee" opacity=".22"/>`).join("")}</g>
  ${floor(u,344)}<rect x="0" y="344" width="800" height="9" fill="url(#${u}hz)"/>
  <g>${[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map(i=>`<line x1="${i*50}" y1="372" x2="${i*50}" y2="420" stroke="#8da2c9" stroke-opacity=".5" stroke-width="4"/>`).join("")}<rect x="0" y="366" width="800" height="7" fill="url(#${u}steel)" stroke="#0a1224"/></g>
  ${bundle(0,320,262,300,5,30)}${bundle(800,320,538,300,5,30)}`)};

/* ================= SALLE 4 · LA NAVIGATION ================= */
const nav=(c)=>{const u="d";seed(55);
  return wrap(u,c,`<rect width="800" height="420" fill="#04070f"/>
  <g><ellipse cx="520" cy="70" rx="290" ry="80" fill="#4a2a78" opacity=".35" filter="url(#${u}soft)"/><ellipse cx="200" cy="120" rx="200" ry="60" fill="#1d4f7a" opacity=".35" filter="url(#${u}soft)"/></g>${stars(170,0,250,0,800,9)}
  <circle cx="640" cy="236" r="130" fill="#8a4a2a"/><circle cx="640" cy="236" r="130" fill="url(#${u}vig)"/><path d="M520 200 Q640 170 760 220 M520 240 Q640 215 760 262 M530 280 Q640 262 750 300" fill="none" stroke="#c9774a" stroke-width="7" opacity=".6"/><ellipse cx="640" cy="236" rx="190" ry="22" transform="rotate(-14 640 236)" fill="none" stroke="#e8c9a0" stroke-width="5" opacity=".5"/>
  <circle cx="150" cy="104" r="22" fill="#cfe3ff"/><circle cx="142" cy="98" r="22" fill="#04070f" opacity=".35"/>
  <polygon points="0,0 800,0 800,34 640,112 160,112 0,34" fill="url(#${u}metal)" stroke="#050a14" stroke-width="3"/>${pipe(u,"M20 18 H780",8,"#3f527a")}${lamp(u,400,92,"#fff6d8",4,"flick")}
  <path d="M0 34 L160 112 L160 330 L0 330 Z" fill="url(#${u}wall)" stroke="#050a14" stroke-width="3"/><path d="M800 34 L640 112 L640 330 L800 330 Z" fill="url(#${u}wall)" stroke="#050a14" stroke-width="3"/>
  <path d="M160 112 L160 220 M640 112 V220 M400 112 V150" stroke="#050a14" stroke-width="8"/><path d="M160 112 H640" stroke="#a9bde0" stroke-opacity=".35" stroke-width="2"/>
  ${screen(u,16,96,120,92,c,5,"TRAJECTOIRE")}${screen(u,16,206,120,80,"#5fd68a",4,"SYSTÈMES")}${screen(u,664,96,120,92,"#7cc8ff",5,"RADAR")}${screen(u,664,206,120,80,"#ff8a6b",4,"ALERTES")}
  <g transform="translate(400 300)"><ellipse cx="0" cy="36" rx="210" ry="30" fill="#000" opacity=".5"/><path d="M-220 34 L-170 -20 H170 L220 34 Z" fill="url(#${u}steel)" stroke="#050a14" stroke-width="3"/><ellipse cx="0" cy="-20" rx="170" ry="20" fill="#06101f" stroke="${c}" stroke-width="2"/>
   <ellipse cx="0" cy="-20" rx="150" ry="16" fill="url(#${u}hex)" opacity=".8"/>
   <g class="floaty"><path d="M-100 -22 Q0 -70 100 -22" fill="none" stroke="${c}" stroke-width="2" opacity=".8"/><path d="M-70 -22 Q0 -92 70 -22" fill="none" stroke="${c}" stroke-width="1.6" opacity=".6"/><line x1="-120" y1="-20" x2="120" y2="-20" stroke="${c}" stroke-width="1" opacity=".5"/>
   ${[[-70,-50],[-20,-72],[30,-46],[76,-62],[8,-30]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="${3+(i%2)*2}" fill="${i===1?"#ffb547":c}" filter="url(#${u}neon)" class="pulse" style="animation-delay:${i*.4}s"/>`).join("")}<polyline points="-70,-50 -20,-72 30,-46 76,-62" fill="none" stroke="#ffb547" stroke-width="1.6" stroke-dasharray="4 4" class="dash"/></g>
   <g transform="translate(130 -20)"><circle r="26" fill="#05101f" stroke="#4b5e86" stroke-width="3"/><circle r="26" fill="none" stroke="${c}" stroke-width="1" stroke-dasharray="2 5"/><path d="M0 0 L22 0" stroke="${c}" stroke-width="2" class="sweep"/></g></g>
  ${floor(u,350)}
  <g transform="translate(120 360)"><path d="M-40 60 L-30 0 Q0 -30 30 0 L40 60 Z" fill="#0b1426" stroke="#1d2c4a" stroke-width="3"/><rect x="-26" y="-34" width="52" height="40" rx="14" fill="#0e1830" stroke="#1d2c4a" stroke-width="3"/></g>
  <g transform="translate(680 360)"><path d="M-40 60 L-30 0 Q0 -30 30 0 L40 60 Z" fill="#0b1426" stroke="#1d2c4a" stroke-width="3"/><rect x="-26" y="-34" width="52" height="40" rx="14" fill="#0e1830" stroke="#1d2c4a" stroke-width="3"/></g>
  ${bundle(200,390,600,392,5,10)}${[0,1,2,3,4,5,6].map(i=>lamp(u,230+i*56,336,["#5fd68a","#ffb547","#7cc8ff"][i%3],2.8,"blink",i*.25)).join("")}`)};

/* ================= SALLE 5 · LES COMMUNICATIONS ================= */
const comms=(c)=>{const u="e";seed(66);
  const wave=(r,o)=>`<path d="M${-r} ${-r*.6} A${r} ${r} 0 0 1 ${-r} ${r*.6}" fill="none" stroke="${c}" stroke-width="3" opacity="${o}" class="wv" style="animation-delay:${r/40}s"/>`;
  return wrap(u,c,`<defs><linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05071a"/><stop offset=".5" stop-color="#1a1f4a"/><stop offset="1" stop-color="#5a2f5e"/></linearGradient></defs>
  <rect width="800" height="420" fill="url(#${u}sky)"/>${stars(150,0,260,0,800,17)}
  <path d="M0 160 Q200 90 400 150 T800 110 V190 H0 Z" fill="#5fd68a" opacity=".16" filter="url(#${u}soft)" class="aurora"/><path d="M0 200 Q250 130 500 190 T800 150 V230 H0 Z" fill="#7cc8ff" opacity=".12" filter="url(#${u}soft)"/>
  <circle cx="660" cy="96" r="46" fill="#cfd9ee"/><circle cx="644" cy="84" r="9" fill="#9aa9c4"/><circle cx="676" cy="108" r="6" fill="#9aa9c4"/><circle cx="662" cy="76" r="4" fill="#9aa9c4"/>
  <path d="M0 290 Q150 250 300 280 T620 270 T800 290 V420 H0 Z" fill="#1a1428"/><path d="M0 310 Q200 280 420 305 T800 300 V420 H0 Z" fill="#0f0c1c"/>
  <g transform="translate(300 270)">
   <path d="M-20 90 L0 -150 L20 90 Z" fill="url(#${u}steel)" stroke="#050a14" stroke-width="2"/>${[-110,-70,-30,10,50].map((y,i)=>`<path d="M${-16+(i*2.4)} ${y} L${16-(i*2.4)} ${y+22} M${16-(i*2.4)} ${y} L${-16+(i*2.4)} ${y+22}" stroke="#050a14" stroke-width="2" opacity=".8"/>`).join("")}
   ${lamp(u,0,-152,"#ff6b6b",4,"blink")}
   <g transform="translate(0 -110) rotate(-22)"><path d="M-90 20 Q0 -90 90 20 Q0 -4 -90 20 Z" fill="url(#${u}steel)" stroke="#050a14" stroke-width="3"/><path d="M-90 20 Q0 -4 90 20" fill="none" stroke="#050a14" stroke-width="2"/><line x1="0" y1="8" x2="0" y2="-62" stroke="#9fb4d8" stroke-width="3"/><circle cx="0" cy="-64" r="6" fill="${c}" filter="url(#${u}neon)" class="pulse"/>
    ${[0,1,2,3].map(i=>`<path d="M${-60+i*40} 14 L${-8+i*4} -50" stroke="#050a14" stroke-width="1.5" opacity=".7"/>`).join("")}</g>
   <g transform="translate(34 -150) rotate(-22)">${wave(26,.9)}${wave(50,.6)}${wave(74,.35)}${wave(98,.2)}</g>
   <path d="M0 -150 L-130 100 M0 -150 L140 104" stroke="#8da2c9" stroke-width="2" opacity=".7"/></g>
  <g transform="translate(560 292)">${panel(u,-90,0,180,98,{r:8,n:3})}<rect x="-76" y="12" width="152" height="40" rx="4" fill="#05101f"/>
   <text x="0" y="40" text-anchor="middle" ${F} font-weight="700" font-size="26" fill="${c}" filter="url(#${u}neon)">⚡ ÉMETTEUR</text><rect x="-76" y="12" width="152" height="40" fill="url(#${u}scan)"/>
   ${[0,1,2,3,4].map(i=>`<rect x="${-72+i*30}" y="62" width="24" height="10" rx="2" fill="${i<4?c:"#33476d"}" opacity=".85"/>`).join("")}${[0,1,2].map(i=>`<circle cx="${-50+i*50}" cy="86" r="5" fill="#0a1224" stroke="#8da2c9"/>`).join("")}</g>
  ${pipe(u,"M470 360 H300 V340",9,"#4b5e86")}${bundle(470,366,640,392,4,18)}
  <g transform="translate(130 330)"><rect x="-52" y="0" width="104" height="70" rx="6" fill="#1b2943" stroke="#050a14" stroke-width="2"/>${vent(u,-44,8,88,26,4)}<text x="0" y="56" text-anchor="middle" ${F} font-size="11" letter-spacing="3" fill="#ffb547">GÉNÉRATEUR</text>${lamp(u,40,44,"#5fd68a",3.2)}</g>
  <rect x="0" y="388" width="800" height="32" fill="url(#${u}hz)" opacity=".85"/><rect x="0" y="388" width="800" height="4" fill="#050a14"/>`)};

/* ================= SALLE 6 · LA SERRE ================= */
const serre=(c)=>{const u="f";seed(77);
  const leaf=(x,y,r,col)=>`<path d="M${x} ${y} Q${x+r} ${y-r*.6} ${x+r*1.6} ${y-r*.1} Q${x+r} ${y+r*.5} ${x} ${y} Z" fill="${col}" stroke="#06210f" stroke-width="1" opacity=".95"/><path d="M${x} ${y} L${x+r*1.45} ${y-r*.1}" stroke="#06210f" stroke-width=".9" opacity=".6"/>`;
  const plant=(x,y,s,col,fruit)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 Q-4 -40 2 -80" fill="none" stroke="#2f7a3f" stroke-width="5"/>${leaf(0,-20,22,col)}${leaf(0,-34,-22,col).replace(/(\d+\.?\d*)/g,m=>m)}${leaf(2,-52,20,col)}${leaf(2,-66,-20,col)}${leaf(2,-80,18,col)}${fruit?`<circle cx="9" cy="-30" r="6" fill="#ff5a4a"/><circle cx="-9" cy="-48" r="6" fill="#ff7a4a"/><circle cx="10" cy="-60" r="5" fill="#ff5a4a"/>`:""}</g>`;
  let ribs="";for(let i=0;i<9;i++){const x=40+i*90;ribs+=`<path d="M${x} 350 Q${x+(x<400?40:-40)} 150 400 40" fill="none" stroke="#a9bde0" stroke-opacity=".28" stroke-width="3"/>`}
  for(let k=0;k<5;k++)ribs+=`<ellipse cx="400" cy="${350-k*62}" rx="${380-k*50}" ry="${40+k*4}" fill="none" stroke="#a9bde0" stroke-opacity=".16" stroke-width="2"/>`;
  return wrap(u,c,`<defs><linearGradient id="${u}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#15294a"/><stop offset="1" stop-color="#2a4f5a"/></linearGradient><radialGradient id="${u}gl"><stop offset="0" stop-color="#e060ff" stop-opacity=".55"/><stop offset="1" stop-color="#e060ff" stop-opacity="0"/></radialGradient></defs>
  <rect width="800" height="420" fill="url(#${u}sk)"/>${stars(60,0,160,0,800,23)}<ellipse cx="400" cy="260" rx="380" ry="200" fill="#0b2a22" opacity=".55"/>
  ${ribs}<rect x="0" y="0" width="800" height="420" fill="url(#${u}glass)" opacity=".5"/>
  ${[110,260,540,690].map(x=>`<g><rect x="${x-4}" y="40" width="8" height="60" fill="#0a1224"/><ellipse cx="${x}" cy="108" rx="44" ry="13" fill="#1b2943" stroke="#050a14" stroke-width="2"/><ellipse cx="${x}" cy="106" rx="30" ry="6" fill="#e060ff" opacity=".9" filter="url(#${u}neon)"/><polygon points="${x-30},110 ${x+30},110 ${x+80},330 ${x-80},330" fill="#e060ff" opacity=".07"/></g>`).join("")}
  ${floor(u,330)}<rect x="0" y="330" width="800" height="10" fill="#5a3a22"/>
  ${[60,150,240].map(x=>`<g><rect x="${x-34}" y="300" width="68" height="34" rx="5" fill="#3a2a1c" stroke="#150e08" stroke-width="2"/>${plant(x,300,.9+(x%3)/12,"#3fae5a",x===150)}</g>`).join("")}
  ${[560,650,740].map(x=>`<g><rect x="${x-34}" y="300" width="68" height="34" rx="5" fill="#3a2a1c" stroke="#150e08" stroke-width="2"/>${plant(x,300,1+(x%3)/14,"#5fd68a",x===650)}</g>`).join("")}
  <g transform="translate(400 190)"><ellipse cx="0" cy="146" rx="124" ry="16" fill="#000" opacity=".45"/>
   <path d="M-110 20 L110 20 L110 140 L-110 140 Z" fill="#06182a" stroke="#bfe3ff" stroke-width="3"/><path d="M-110 20 L-80 -8 L140 -8 L110 20 Z" fill="#bfe3ff" fill-opacity=".18" stroke="#bfe3ff" stroke-width="2"/><path d="M110 20 L140 -8 L140 112 L110 140 Z" fill="#0b2a44" stroke="#bfe3ff" stroke-width="2"/>
   <path d="M-110 70 L110 70 L110 140 L-110 140 Z" fill="#2f9be0" opacity=".6"/><path d="M110 70 L140 42 L140 112 L110 140 Z" fill="#2f9be0" opacity=".4"/><path d="M-110 70 Q-55 60 0 70 T110 70" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="2" class="wave"/>
   ${[0,1,2,3,4,5].map(i=>`<line x1="-110" y1="${30+i*20}" x2="-98" y2="${30+i*20}" stroke="#cfd9ee" stroke-width="2"/>`).join("")}
   <circle cx="-40" cy="100" r="3" fill="#fff" opacity=".7" class="bubble"/><circle cx="30" cy="110" r="2.4" fill="#fff" opacity=".7" class="bubble" style="animation-delay:.9s"/>
   ${panel(u,-130,148,260,22,{r:5})}<text x="0" y="163" text-anchor="middle" ${F} font-size="10" letter-spacing="5" fill="${c}">CUVE D'EAU DE LA SERRE</text></g>
  ${pipe(u,"M290 330 H210 V300 M510 330 H590 V300",8,"#4b5e86")}
  <g transform="translate(400 372)">${panel(u,-60,-12,120,40,{r:8})}${gauge(u,-30,8,16,.5,c,"")}<text x="22" y="14" text-anchor="middle" ${F} font-size="11" fill="${c}" letter-spacing="2">POMPE</text>${lamp(u,30,20,"#5fd68a",3.2)}</g>
  ${pipe(u,"M340 372 H250 V340",7,"#4b5e86")}${pipe(u,"M460 372 H550 V340",7,"#4b5e86")}
  <g class="drip">${[0,1,2].map(i=>`<ellipse cx="${236+i*0}" cy="${326+i*8}" rx="2.4" ry="4" fill="#9fd8ff" opacity=".8"/>`).join("")}</g>`)};

return {hero,sas,labo,machines,nav,comms,serre,shipArt,D,setCtx:t=>{CTX=t}};
})();
