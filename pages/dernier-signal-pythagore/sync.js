/* Synchronisation : Firebase Realtime Database via son API REST (aucune bibliothèque).
   Si dbUrl est vide : mode local (localStorage), un seul appareil. */
window.SYNC=(function(){
  let base=(window.DS_CONFIG&&window.DS_CONFIG.dbUrl||"").replace(/\/$/,"");
  const OKDB=/^(http:\/\/(localhost|127\.0\.0\.1)(:\d+)?|https:\/\/[a-z0-9-]+(\.[a-z0-9-]+)*\.(firebaseio\.com|firebasedatabase\.app))$/;
  try{const q=(new URLSearchParams(location.search).get("db")||"").replace(/\/$/,"");
    if(q&&OKDB.test(q)){base=q;try{localStorage.setItem("ds4e-db",base)}catch(e){}}
    else if(!base){const st=(localStorage.getItem("ds4e-db")||"").replace(/\/$/,"");if(st&&OKDB.test(st))base=st}}catch(e){}
  const local=!base;let offset=0;
  /* --- magasin local (même interface par chemin) --- */
  const LS="ds4e-local";const load=()=>{try{return JSON.parse(localStorage.getItem(LS))||{}}catch(e){return{}}};
  const walk=(o,p,mk)=>{let c=o;for(const k of p){if(c[k]==null||typeof c[k]!=="object"){if(!mk)return undefined;c[k]={}}c=c[k]}return c};
  const parts=p=>p.split("/").filter(Boolean);
  async function lget(p){const o=load();const ps=parts(p);if(!ps.length)return o;const par=walk(o,ps.slice(0,-1),false);return par?par[ps[ps.length-1]]??null:null}
  async function lput(p,v){const o=load();const ps=parts(p);const par=walk(o,ps.slice(0,-1),true);par[ps[ps.length-1]]=v;localStorage.setItem(LS,JSON.stringify(o));return v}
  async function lpatch(p,v){const cur=(await lget(p))||{};return lput(p,Object.assign(cur,v))}
  async function http(m,p,b){const r=await fetch(`${base}/${p}.json`,{method:m,cache:"no-store",body:b===undefined?undefined:JSON.stringify(b)});if(!r.ok)throw new Error("HTTP "+r.status);return r.json()}
  const api={local,base,okdb:u=>OKDB.test(String(u||'').replace(/\/$/,'')),
    get:p=>local?lget(p):http("GET",p),
    put:(p,v)=>local?lput(p,v):http("PUT",p,v),
    patch:(p,v)=>local?lpatch(p,v):http("PATCH",p,v),
    del:p=>local?lput(p,null):http("DELETE",p),
    now:()=>Date.now()+offset,
    async calibrate(code){if(local)return;try{const t0=Date.now();await http("PUT",`sessions/${code}/ping`,{".sv":"timestamp"});const sv=await http("GET",`sessions/${code}/ping`);const t1=Date.now();offset=sv-(t0+t1)/2}catch(e){}}
  };
  return api;
})();
