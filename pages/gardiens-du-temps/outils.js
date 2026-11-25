/* Outils communs : empreinte SHA-256, icônes, état d'équipe. */
window.GU=(function(){
function sha256Fallback(ascii){const r=(v,a)=>(v>>>a)|(v<<(32-a));let mp=Math.pow,mw=mp(2,32),res="",words=[],bl=ascii.length*8,h=[],k=[],pc=0,ic={};
for(let c=2;pc<64;c++){if(!ic[c]){for(let i=0;i<313;i+=c)ic[i]=c;h[pc]=(mp(c,.5)*mw)|0;k[pc++]=(mp(c,1/3)*mw)|0}}h=h.slice(0,8);
ascii+="\x80";while(ascii.length%64-56)ascii+="\x00";for(let i=0;i<ascii.length;i++){const j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8}
words[words.length]=((bl/mw)|0);words[words.length]=bl;
for(let j=0;j<words.length;){const w=words.slice(j,j+=16),oh=h;h=h.slice(0,8);
for(let i=0;i<64;i++){const w15=w[i-15],w2=w[i-2],a=h[0],e=h[4];
const t1=h[7]+(r(e,6)^r(e,11)^r(e,25))+((e&h[5])^((~e)&h[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(r(w15,7)^r(w15,18)^(w15>>>3))+w[i-7]+(r(w2,17)^r(w2,19)^(w2>>>10)))|0);
const t2=(r(a,2)^r(a,13)^r(a,22))+((a&h[1])^(a&h[2])^(h[1]&h[2]));h=[(t1+t2)|0].concat(h);h[4]=(h[4]+t1)|0}
for(let i=0;i<8;i++)h[i]=(h[i]+oh[i])|0}
for(let i=0;i<8;i++)for(let j=3;j+1;j--){const b=(h[i]>>(j*8))&255;res+=((b<16)?0:"")+b.toString(16)}return res}
async function sha(s){const u=unescape(encodeURIComponent(s));
  try{if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}}catch(e){}
  return sha256Fallback(u)}
const G=window.GDT;
const hash=(room,v,a)=>sha(`${G.salt}|${room}|${v}|${a}`);
const SUN='<svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#f2c14e"/><g stroke="#f2c14e" stroke-width="2" stroke-linecap="round"><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></g></svg>';
const MOON='<svg class="moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" fill="#c9d4ff"/></svg>';
const vIcon=v=>v==="A"?SUN:MOON, vName=v=>v==="A"?"Soleil":"Lune";
const teams=n=>G.teams.slice(0,n||G.teams.length);
const team=id=>G.teams.find(t=>t.id===id);
/* état d'une équipe : ch = salles validées sur la route des Chiffres (0 à 3), fo = idem Formes */
const st=(S,id)=>Object.assign({ch:0,fo:0,sceau:false,hints:{},lock:{},t:{}},((S&&S.ships)||{})[id]||{});
const key=r=>r==="chiffres"?"ch":"fo";
const roomState=(S,id,route,i)=>{const n=st(S,id)[key(route)];return i<n?"done":i===n?"cur":"locked"};
const fmt=s=>{s=Math.max(0,Math.round(s));return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")};
function norm(type,raw){let s=String(raw||"").replace(/\s/g,"").replace(".",",");
  if(type==="decimal"){if(s.includes(",")){s=s.replace(/0+$/,"").replace(/,$/,"")}s=s.replace(/^0+(?=\d)/,"")}
  if(type==="entier")s=s.replace(/^0+(?=\d)/,"");
  return s}
return{sha,hash,SUN,MOON,vIcon,vName,teams,team,st,key,roomState,fmt,norm};
})();
