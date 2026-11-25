/* Décors des salles (SVG 320 × 180), dessinés pour le jeu. */
window.SCENES=(function(){
const sky=(id,a,b,c)=>`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".65" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="320" height="180" fill="url(#${id})"/>`;
const stars=(n,seed,op)=>{let s="",x=seed;for(let i=0;i<n;i++){x=(x*9301+49297)%233280;const px=x/233280*320;x=(x*9301+49297)%233280;const py=x/233280*80;s+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(i%3?.6:1)}" fill="#fff" opacity="${op}"/>`}return s};
const palm=(x,y,h,col)=>`<path d="M${x} ${y}q2 -${h/2} -1 -${h}" stroke="${col}" stroke-width="2.4" fill="none"/>`+[[-14,-4],[-10,6],[12,-5],[10,6],[0,-10]].map(([dx,dy])=>`<path d="M${x-1} ${y-h}q${dx/2} ${dy/2-6} ${dx} ${dy+2}" stroke="${col}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`).join("");
const S={};

/* Babylone : ziggourat au crépuscule, palmiers, Euphrate */
S.bab=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gb","#f0a070","#f6c48a","#fbe2b0")}
<circle cx="248" cy="104" r="26" fill="#ffd08a" opacity=".9"/>
<path d="M0 132 L320 132 L320 180 L0 180Z" fill="#7a3b22"/>
<g fill="#5a2a18"><path d="M70 132 h150 v-16 h-14 v-16 h-14 v-16 h-14 v-14 h-50 v14 h-14 v16 h-14 v16 h-14 v16 h-16z"/>
<path d="M134 70 h22 v-10 h-22z"/></g>
<path d="M145 132 L145 70" stroke="#8a4628" stroke-width="7"/><path d="M141 132 L145 70 L149 132" fill="#9b5232" opacity=".6"/>
<g fill="#4a2214">${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<rect x="${i*27}" y="122" width="22" height="12"/><rect x="${i*27+2}" y="118" width="6" height="5"/><rect x="${i*27+14}" y="118" width="6" height="5"/>`).join("")}</g>
${palm(28,132,40,"#2e140c")}${palm(292,132,46,"#2e140c")}${palm(270,132,32,"#2e140c")}
<path d="M0 150 Q80 144 160 152 T320 148 L320 180 L0 180Z" fill="#3a5a7a" opacity=".85"/><path d="M20 160 h40 M120 164 h30 M220 158 h50" stroke="#f4b46a" stroke-width="1.2" opacity=".6"/></svg>`;

/* Égypte : désert doré, pyramides, Nil, felouque */
S.egy=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("ge","#f7c35f","#ffe3a3","#fff1cf")}
<circle cx="90" cy="62" r="24" fill="#fff6d6"/><circle cx="90" cy="62" r="34" fill="#fff6d6" opacity=".25"/>
<path d="M0 128 Q160 116 320 130 L320 180 L0 180Z" fill="#e1a94b"/>
<path d="M150 128 L205 58 L262 128Z" fill="#c98a33"/><path d="M205 58 L262 128 L220 128Z" fill="#a8702a"/>
<path d="M240 128 L272 88 L306 128Z" fill="#c98a33"/><path d="M272 88 L306 128 L282 128Z" fill="#a8702a"/>
<path d="M100 128 L124 98 L150 128Z" fill="#d39a42"/><path d="M124 98 L150 128 L132 128Z" fill="#b07a30"/>
<path d="M0 146 Q160 136 320 150 L320 166 Q160 154 0 162Z" fill="#3e8fb0"/>
<path d="M40 150 l18 0 l-3 5 l-13 0z" fill="#6b3f1c"/><path d="M49 150 L49 126 L60 148Z" fill="#fff8e6"/>
<g stroke="#4f7a2a" stroke-width="1.6">${[8,14,20,286,294,302,310].map((x,i)=>`<path d="M${x} 168 q${i%2?3:-3} -12 ${i%2?1:-1} -20"/><circle cx="${x+(i%2?1:-1)}" cy="146" r="3" fill="#6b9a36" stroke="none"/>`).join("")}</g>
<path d="M0 166 Q160 158 320 168 L320 180 L0 180Z" fill="#d49a40"/></svg>`;

/* Alexandrie : phare, colonnes de la Bibliothèque, mer bleue */
S.eucl=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gx","#4f86c6","#86b8e4","#cfe7fb")}
<circle cx="60" cy="40" r="14" fill="#fff8dc" opacity=".9"/>
<path d="M0 126 L320 122 L320 180 L0 180Z" fill="#2f6aa6"/>
<path d="M0 134 Q60 130 120 136 T240 132 T320 134" stroke="#bfe0fb" stroke-width="1" fill="none" opacity=".6"/>
<path d="M200 128 L320 120 L320 140 L190 140Z" fill="#d8c79c"/>
<g fill="#efe4c6"><path d="M238 120 h44 l-4 -40 h-36z"/><path d="M246 80 h28 l-3 -26 h-22z"/><path d="M252 54 h16 l-2 -16 h-12z"/></g>
<path d="M260 38 l-6 -10 q6 -12 6 -14 q0 2 6 14z" fill="#ffb347"/><circle cx="260" cy="30" r="14" fill="#ffd27a" opacity=".35"/>
<g fill="#f6efd9"><path d="M14 136 h120 v-6 h-120z"/><path d="M18 104 h112 l-56 -18z"/><path d="M16 104 h116 v4 h-116z"/>
${[22,40,58,76,94,112].map(x=>`<rect x="${x}" y="108" width="9" height="22"/>`).join("")}</g>
<g stroke="#9cb7d6" stroke-width=".6" fill="none" opacity=".8"><circle cx="160" cy="96" r="16"/><circle cx="176" cy="96" r="16"/><path d="M160 96 L176 96 L168 82.1Z"/></g>
<path d="M0 150 Q80 146 160 152 T320 150 L320 180 L0 180Z" fill="#245a92"/></svg>`;

/* Syracuse : temple grec, trière, grand soleil rond */
S.arch=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gs","#86bde8","#c7b8e6","#f6d0d6")}
${''}<circle cx="170" cy="118" r="40" fill="#ffd3a1"/><circle cx="170" cy="118" r="52" fill="#ffd3a1" opacity=".2"/>
<path d="M0 118 L320 118 L320 180 L0 180Z" fill="#4b2a6e"/>
<path d="M60 128 Q170 120 300 130" stroke="#ffd3a1" stroke-width="2" opacity=".45" fill="none"/><path d="M90 138 Q170 132 260 140" stroke="#ffd3a1" stroke-width="1.4" opacity=".3" fill="none"/>
<path d="M0 112 L90 104 L104 180 L0 180Z" fill="#2a163e"/>
<g fill="#e9d6f0"><path d="M10 104 h70 v-4 h-70z"/><path d="M8 80 h74 l-37 -14z"/><path d="M8 80 h74 v4 h-74z"/>${[14,27,40,53,66].map(x=>`<rect x="${x}" y="84" width="7" height="16"/>`).join("")}</g>
<g transform="translate(212 132)"><path d="M0 0 h64 l-8 10 h-50z" fill="#2a163e"/><path d="M28 0 V-34" stroke="#2a163e" stroke-width="2"/><path d="M29 -32 q16 14 0 28z" fill="#f3e4f7"/>${[6,14,22,30,38,46,54].map(x=>`<path d="M${x} 10 l-4 8" stroke="#2a163e" stroke-width="1.2"/>`).join("")}</g>
<path d="M118 70 A26 26 0 0 1 170 70 A10 10 0 0 0 150 70 A16 16 0 0 0 118 70Z" fill="none" stroke="#fff" stroke-width="1" opacity=".45"/></svg>`;

/* Inde : temple, banian, lune, manuscrit sur feuilles de palmier */
S.inde=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gi","#93d4bb","#c6e6b4","#f5dc95")}
${''}<circle cx="70" cy="44" r="15" fill="#fff4cf"/><circle cx="76" cy="40" r="13" fill="#2a7a5d" opacity=".0"/>
<path d="M0 130 L320 128 L320 180 L0 180Z" fill="#1f5a45"/>
<g fill="#123b2f"><path d="M178 130 v-30 h70 v30z"/><path d="M188 100 q25 -70 50 0z"/><path d="M206 52 h14 l-2 -8 h-10z"/><circle cx="213" cy="42" r="3"/>
<path d="M160 130 v-18 h18 v18z"/><path d="M162 112 q7 -22 14 0z"/><path d="M248 130 v-18 h18 v18z"/><path d="M250 112 q7 -22 14 0z"/></g>
<g fill="#0e2f25"><ellipse cx="60" cy="98" rx="52" ry="28"/><rect x="54" y="104" width="10" height="28"/>${[30,44,76,90].map(x=>`<path d="M${x} 112 v20" stroke="#0e2f25" stroke-width="1.5"/>`).join("")}</g>
<g transform="translate(100 146)"><rect x="0" y="0" width="120" height="16" rx="8" fill="#ecd08a" stroke="#8a6a24"/><circle cx="20" cy="8" r="1.6" fill="#8a6a24"/><circle cx="100" cy="8" r="1.6" fill="#8a6a24"/>
<text x="60" y="12.5" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#1f5a45" font-weight="bold">1 2 3 4 5 6 7 8 9 0</text></g></svg>`;

/* Pise : port, navires marchands, coupole, étals */
S.fibo=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gp","#f2a291","#f8c4ab","#ffe3c9")}
<circle cx="250" cy="70" r="20" fill="#ffe1c4" opacity=".9"/>
<path d="M0 124 L320 124 L320 180 L0 180Z" fill="#3c5d7d"/>
<g fill="#4a1a24"><path d="M20 124 v-34 h90 v34z"/><path d="M40 90 a25 25 0 0 1 50 0z"/><rect x="62" y="56" width="6" height="10"/>
${[26,42,58,74,90].map(x=>`<path d="M${x} 124 v-16 a6 6 0 0 1 12 0 v16z" fill="#7a2c38"/>`).join("")}</g>
<g transform="translate(170 120)"><path d="M0 0 h70 l-10 14 h-52z" fill="#3a1218"/><path d="M34 0 V-52" stroke="#3a1218" stroke-width="2.4"/><path d="M36 -50 L36 -6 L66 -10Z" fill="#fbe7d6"/><path d="M32 -46 L32 -8 L6 -10Z" fill="#f2d3bf"/><path d="M34 -52 l10 3 l-10 3z" fill="#ffcf5a"/></g>
<g transform="translate(250 130) scale(.6)"><path d="M0 0 h70 l-10 14 h-52z" fill="#3a1218"/><path d="M34 0 V-52" stroke="#3a1218" stroke-width="2.4"/><path d="M36 -50 L36 -6 L66 -10Z" fill="#fbe7d6"/></g>
<g><rect x="114" y="112" width="40" height="14" fill="#7a2c38"/><path d="M110 112 h48 l-6 -10 h-36z" fill="#ffcf5a"/><path d="M118 102 v10 M128 102 v10 M138 102 v10 M148 102 v10" stroke="#e0566a" stroke-width="3"/>
<circle cx="124" cy="120" r="3" fill="#ffd76a"/><circle cx="132" cy="121" r="3" fill="#ffd76a"/><circle cx="140" cy="120" r="3" fill="#ffd76a"/></g>
<path d="M0 140 Q80 136 160 142 T320 140" stroke="#ffc9a8" stroke-width="1" fill="none" opacity=".5"/></svg>`;

/* Sceau final : la frise du temps et ses six lueurs */
S.sceau=`<svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">${sky("gf","#4b4f9e","#7c7fcc","#c3bdea")}
${stars(40,5,.7)}<g fill="none" stroke="#f2c14e" opacity=".5"><circle cx="160" cy="92" r="60" stroke-width=".8"/><circle cx="160" cy="92" r="44" stroke-width=".5" stroke-dasharray="2 3"/><circle cx="160" cy="92" r="72" stroke-width=".4"/></g>
<path d="M30 92 H290" stroke="#f2c14e" stroke-width="1.6"/>${[50,92,138,182,226,270].map(x=>`<circle cx="${x}" cy="92" r="5" fill="#f2c14e"/><circle cx="${x}" cy="92" r="10" fill="#f2c14e" opacity=".25"/>`).join("")}
<text x="160" y="150" text-anchor="middle" font-family="Georgia,serif" font-size="22" fill="#f2c14e" opacity=".9">?</text></svg>`;
return S;})();
