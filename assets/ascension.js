/* =========================================================
   ASCENSION — la logique commune (aucun affichage ici).

   Principe : dans l'onglet « Ascension » d'une classe, l'élève choisit un chapitre
   et passe un test cumulatif (les questions du chapitre et de tous les précédents). Test réussi → la montgolfière monte. Test raté → elle stagne
   (elle ne redescend jamais).

   Le plafond de la semaine monte chaque lundi et ne retombe jamais : une semaine
   sans travailler ne fait rien perdre, l'élève peut rattraper plus tard. Le plafond
   atteint le sommet (Mont Blanc) la semaine du 31 mai 2027.

   Tout ce qui se règle est dans CONFIG juste en dessous.
   Les questions de chaque chapitre sont dans assets/questions.js.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    MAX: 4806,             // altitude du sommet : le Mont Blanc
    DEPART: "2026-10-12",  // lundi de la 1re semaine
    SOMMET: "2027-05-31",  // lundi où le plafond atteint le sommet (début juin)
    T: 3,                  // tests réussis nécessaires pour franchir un palier (1 test = 1/3 du chemin)
    NB_Q: 8,               // questions par test
    SEUIL: 6               // bonnes réponses pour réussir le test
  };

  /* Les 11 paliers, à leur vraie hauteur. "m" = numéro du dessin dans index.html. */
  var REPERES = [
    { h: 8,    nom: "Lampadaire",            le: "le lampadaire",            du: "du lampadaire" },
    { h: 30,   nom: "Grand arbre",           le: "le grand arbre",           du: "du grand arbre" },
    { h: 60,   nom: "Immeuble",              le: "l’immeuble",           du: "de l’immeuble" },
    { h: 93,   nom: "Statue de la Liberté", le: "la statue de la Liberté", du: "de la statue de la Liberté" },
    { h: 330,  nom: "Tour Eiffel",           le: "la tour Eiffel",           du: "de la tour Eiffel" },
    { h: 443,  nom: "Empire State Building", le: "l’Empire State Building", du: "de l’Empire State Building" },
    { h: 828,  nom: "Burj Khalifa",          le: "le Burj Khalifa",          du: "du Burj Khalifa" },
    { h: 1465, nom: "Puy de Dôme",       le: "le puy de Dôme",       du: "du puy de Dôme" },
    { h: 1912, nom: "Mont Ventoux",          le: "le mont Ventoux",          du: "du mont Ventoux" },
    { h: 3842, nom: "Aiguille du Midi",      le: "l’aiguille du Midi",   du: "de l’aiguille du Midi" },
    { h: 4806, nom: "Mont Blanc",            le: "le Mont Blanc",            du: "du Mont Blanc" }
  ];
  var NP = REPERES.length, NET = NP * CONFIG.T;   // 11 paliers, 33 étapes

  /* Étape e (0..33) -> altitude en mètres : on monte d'un tiers du palier à chaque test réussi. */
  function altDe(e) {
    e = Math.max(0, Math.min(NET, Math.round(e)));
    var u = e / CONFIG.T, i = Math.min(NP - 1, Math.floor(u + 1e-9)), f = u - i;
    var bas = i === 0 ? 0 : REPERES[i - 1].h;
    return Math.round(bas + (REPERES[i].h - bas) * f);
  }
  function etDe(a) { // plus grande étape dont l'altitude ne dépasse pas a
    var e = 0;
    for (var k = 0; k <= NET; k++) if (altDe(k) <= a) e = k;
    return e;
  }

  /* ---------- Dates ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function cle(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  // numéro du jour calendaire local (insensible aux changements d'heure)
  function jourNum(d) { return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  function semaine(d) { return Math.floor((jourNum(d || new Date()) - jourNum(parse(CONFIG.DEPART))) / 7); }
  function nbSemaines() { return (jourNum(parse(CONFIG.SOMMET)) - jourNum(parse(CONFIG.DEPART))) / 7; }

  /* Plafond : une étape de plus par semaine, jusqu'au sommet début juin. */
  function plafondEt(d) {
    var k = Math.max(0, semaine(d)), W = nbSemaines();
    if (k >= W) return NET;
    return Math.min(NET, Math.round(NET * (k + 1) / (W + 1)));
  }
  function plafond(d) { return altDe(plafondEt(d)); }
  function prochainLundi(d) {
    var k = semaine(d), t = parse(CONFIG.DEPART);
    if (k < 0) return t;
    t.setDate(t.getDate() + (k + 1) * 7);
    return t;
  }
  function plafondApres(d) { return plafond(prochainLundi(d)); }

  function suivant(a) { for (var i = 0; i < REPERES.length; i++) if (REPERES[i].h > a) return REPERES[i]; return null; }
  function dernier(a) { var x = null; REPERES.forEach(function (r) { if (a >= r.h) x = r; }); return x; }

  /* ---------- Sauvegarde : uniquement dans le navigateur de l'élève ---------- */
  var CLE = "expe-ascension", ANCIENNE = "expe-montgolfiere";
  var RE_PSEUDO = /^[A-Za-zÀ-ÿ0-9_-]{3,16}$/;
  var etat = { v: 2, pseudo: "", actif: "", niv: {} };

  function charger() {
    var brut = null;
    try { brut = JSON.parse(localStorage.getItem(CLE) || "null"); } catch (e) {}
    if (brut && brut.v === 2 && typeof brut === "object") {
      etat = {
        v: 2,
        pseudo: RE_PSEUDO.test(brut.pseudo || "") ? brut.pseudo : "",
        actif: typeof brut.actif === "string" ? brut.actif : "",
        niv: (brut.niv && typeof brut.niv === "object") ? brut.niv : {}
      };
      return;
    }
    // Première visite avec ce système : on garde seulement le pseudo de l'ancienne montgolfière.
    var pseudo = "";
    try {
      var o = JSON.parse(localStorage.getItem(ANCIENNE) || "null");
      if (o && RE_PSEUDO.test(o.pseudo || "")) pseudo = o.pseudo;
    } catch (e) {}
    etat = { v: 2, pseudo: pseudo, actif: "", niv: {} };
  }
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) {} }

  function ne(id) {
    var n = etat.niv[id];
    if (!n || typeof n !== "object") n = etat.niv[id] = {};
    if (typeof n.et !== "number") n.et = etDe(+n.alt || 0);   // anciennes sauvegardes : on déduit l'étape de l'altitude
    n.et = Math.max(0, Math.min(NET, Math.round(n.et)));
    n.alt = altDe(n.et);
    if (!n.jours || typeof n.jours !== "object") n.jours = {};
    if (!n.essais || typeof n.essais !== "object") n.essais = {};
    if (!n.reussis || typeof n.reussis !== "object") n.reussis = {};
    return n;
  }

  function pseudo() { return etat.pseudo; }
  function setPseudo(p) {
    p = String(p == null ? "" : p).trim();
    if (!RE_PSEUDO.test(p)) return false;
    etat.pseudo = p; sauver(); return true;
  }
  function actif() { return etat.actif; }
  function memoriserActif(id) { etat.actif = id; sauver(); }
  function alt(id) { return ne(id).alt; }
  function stats(id, chap) { var n = ne(id); return { essais: n.essais[chap] || 0, reussis: n.reussis[chap] || 0 }; }
  function dejaAujourdhui(id, chap, d) { return ne(id).jours[chap] === cle(d); }
  function reinitialiser() { etat = { v: 2, pseudo: "", actif: "", niv: {} }; sauver(); }

  function resume(id, d) {
    d = d || new Date();
    var n = ne(id), a = n.alt, pe = plafondEt(d), pl = altDe(pe);
    return {
      alt: a, et: n.et, plafond: pl, plafondEt: pe, marge: Math.max(0, pl - a),
      dernier: dernier(a), suivant: suivant(a),
      dansPalier: n.et % CONFIG.T,            // tests déjà réussis dans le palier en cours (0, 1 ou 2)
      lundi: prochainLundi(d), plafondApres: plafondApres(d),
      auSommet: n.et >= NET
    };
  }

  /* Enregistre le résultat d'un test. Chaque test réussi fait monter d'UNE étape (un tiers de palier).
       raison = "echec"            test raté : on stagne
                "jour"             réussi, mais ce chapitre a déjà fait monter aujourd'hui
                "plafond"          réussi, mais déjà au plafond de la semaine
                "au-sommet"        réussi, déjà tout en haut
                "ok"               réussi, on monte d'une étape
                "plafond-atteint"  réussi, et on touche le plafond de la semaine
                "sommet"           réussi, on atteint le sommet
     res.palier = palier atteint (objet de REPERES) si on vient de le franchir, sinon null. */
  function enregistrer(niv, chap, reussi, date) {
    var n = ne(niv), d = date || new Date(), jour = cle(d);
    var avant = n.alt, etAvant = n.et, pe = plafondEt(d);
    n.essais[chap] = (n.essais[chap] || 0) + 1;
    etat.actif = niv;
    var res = { reussi: !!reussi, avant: avant, apres: avant, gain: 0, plafond: altDe(pe),
                etAvant: etAvant, etApres: etAvant, raison: "echec", franchis: [], palier: null };
    if (reussi) {
      n.reussis[chap] = (n.reussis[chap] || 0) + 1;
      if (n.jours[chap] === jour) res.raison = "jour";
      else if (etAvant >= NET) res.raison = "au-sommet";
      else if (etAvant >= pe) res.raison = "plafond";
      else {
        n.et = etAvant + 1; n.alt = altDe(n.et);
        n.jours[chap] = jour;
        res.etApres = n.et; res.apres = n.alt; res.gain = n.alt - avant;
        if (n.et % CONFIG.T === 0) { res.palier = REPERES[n.et / CONFIG.T - 1]; res.franchis = [res.palier]; }
        res.raison = n.et >= NET ? "sommet" : (n.et >= pe ? "plafond-atteint" : "ok");
      }
    }
    sauver();
    return res;
  }

  /* ---------- Outils pour écrire des questions ---------- */
  function rng(seed) { // générateur reproductible (mulberry32), utile pour les vérifications
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function entier(R, a, b) { return a + Math.floor(R() * (b - a + 1)); }
  function parmi(R, t) { return t[Math.floor(R() * t.length)]; }
  function melanger(R, t) {
    var a = t.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(R() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; }
    return a;
  }

  // Écriture française : virgule décimale, espace fine entre les milliers.
  function nb(x) {
    var v = Math.round(x * 10000) / 10000, neg = v < 0;
    v = Math.abs(v);
    var p = String(v).split(".");
    return (neg ? "−" : "") + p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (p[1] ? "," + p[1] : "");
  }
  function euro(x) {
    var v = Math.round(x * 100) / 100, s = nb(v);
    if (v !== Math.floor(v)) s = s.replace(/,(\d)$/, ",$10"); // 76,8 → 76,80
    return s + " €";
  }
  function pct(x) { return nb(x) + " %"; }

  /* Fabrique une question à choix multiples.
       q       énoncé (HTML construit par le générateur, jamais saisi par l'élève)
       bonne   la bonne réponse (nombre ou texte)
       erreurs réponses fausses plausibles (erreurs classiques), dans l'ordre d'importance
       fmt     transforme une valeur en texte (euro, pct, nb…)
       pas     écart utilisé pour compléter avec des voisins de la bonne réponse
       n       nombre de choix (4 par défaut)
       expl    explication affichée après la réponse
     Les choix sont tous différents et mélangés. */
  function qcm(R, o) {
    var f = o.fmt || String, n = o.n || 4, bonne = f(o.bonne), vus = {}, fausses = [];
    vus[bonne] = true;
    function ajouter(liste, dedans) {
      liste.forEach(function (e) {
        if (e === null || e === undefined || (typeof e === "number" && (!isFinite(e) || (o.min != null ? e < o.min : e <= 0)))) return;
        var t = f(e);
        if (!vus[t]) { vus[t] = true; dedans.push(t); }
      });
    }
    ajouter(o.erreurs || [], fausses);
    fausses = melanger(R, fausses).slice(0, n - 1);
    if (fausses.length < n - 1 && typeof o.bonne === "number") {
      var x = o.bonne, p = o.pas || 1, compl = [];
      [1, -1, 2, -2, 3, -3, 4, -4].forEach(function (k) { compl.push(x + k * p); });
      var plus = [];
      ajouter(compl, plus);
      plus.forEach(function (t) { if (fausses.length < n - 1) fausses.push(t); });
    }
    if (fausses.length < n - 1) throw new Error("Pas assez de réponses fausses pour : " + o.q);
    var choix = melanger(R, [bonne].concat(fausses));
    return { q: o.q, choix: choix, bonne: choix.indexOf(bonne), expl: o.expl || "" };
  }

  /* ---------- Les tests : un générateur de questions par chapitre ---------- */
  var CHAPITRES = {};
  /* inscrire("4e-ch1", { types: [ { id, seance, gen(R) → question }, … ] })
     seance = numéro de la séance du chapitre que la question révise (pour dire à l'élève quoi relire).
     Le test d'un chapitre est cumulatif : il reprend aussi les questions des chapitres précédents du même niveau. */
  function inscrire(chapId, def) { CHAPITRES[chapId] = def; }
  function aTest(chapId) { return !!CHAPITRES[chapId]; }
  function testables(niveau) { return niveau.chapitres.filter(function (c) { return !c.bientot && aTest(c.id); }); }

  /* Chapitres couverts par le test d'un chapitre : lui-même et tous les chapitres précédents du
     même niveau qui ont des questions (test cumulatif). "4e-ch3" -> ["4e-ch1", "4e-ch2", "4e-ch3"].
     Le chapitre du test est toujours le dernier de la liste. */
  function couverts(chapId) {
    var m = /^(.+)-ch(\d+)$/.exec(chapId);
    if (!m || !CHAPITRES[chapId]) return CHAPITRES[chapId] ? [chapId] : [];
    var niv = m[1], num = +m[2], liste = [];
    Object.keys(CHAPITRES).forEach(function (id) {
      var mm = /^(.+)-ch(\d+)$/.exec(id);
      if (mm && mm[1] === niv && +mm[2] < num) liste.push({ id: id, num: +mm[2] });
    });
    liste.sort(function (x, y) { return x.num - y.num; });
    return liste.map(function (x) { return x.id; }).concat([chapId]);
  }

  /* Nombre de questions par chapitre : on partage NB_Q à parts égales, le reste va d'abord au chapitre
     du test, puis aux chapitres les plus récents. S'il y a plus de chapitres que de questions, le
     chapitre du test est toujours là et les autres sont tirés au sort. */
  function repartir(ids, R) {
    var n = ids.length, Q = CONFIG.NB_Q, quota = {};
    ids.forEach(function (id) { quota[id] = 0; });
    if (n <= Q) {
      var base = Math.floor(Q / n), reste = Q % n;
      ids.forEach(function (id) { quota[id] = base; });
      for (var i = 0; i < reste; i++) quota[ids[n - 1 - i]]++;
    } else {
      var autres = melanger(R, ids.slice(0, n - 1)).slice(0, Q - 1);
      quota[ids[n - 1]] = 1;
      autres.forEach(function (id) { quota[id] = 1; });
    }
    return quota;
  }

  /* k questions d'un chapitre, réparties sur ses séances, sans énoncé déjà vu (vus). */
  function tirerChapitre(chapId, k, R, vus) {
    var def = CHAPITRES[chapId], parSeance = {}, sortie = [];
    def.types.forEach(function (t) { (parSeance[t.seance] = parSeance[t.seance] || []).push(t); });
    var cles = Object.keys(parSeance).sort(function (a, b) { return a - b; });
    var base = Math.floor(k / cles.length), reste = k % cles.length;
    var avecReste = melanger(R, cles).slice(0, reste);
    cles.forEach(function (s) {
      var kk = base + (avecReste.indexOf(s) >= 0 ? 1 : 0), pool = melanger(R, parSeance[s]);
      for (var i = 0; i < kk; i++) {
        var t = pool[i % pool.length], q = null;
        for (var essai = 0; essai < 40; essai++) { q = t.gen(R); if (!vus[q.q]) break; }
        vus[q.q] = true;
        q.chap = chapId; q.seance = +s; q.type = t.id;
        sortie.push(q);
      }
    });
    return sortie;
  }

  /* Tire un test cumulatif : NB_Q questions prises dans le chapitre et dans tous les précédents,
     sans énoncé en double, dans un ordre mélangé. Chaque question sait de quel chapitre (q.chap)
     et de quelle séance (q.seance) elle vient, pour dire à l'élève quoi relire. */
  function tirer(chapId, R) {
    if (!CHAPITRES[chapId]) return [];
    R = R || Math.random;
    var ids = couverts(chapId), quota = repartir(ids, R), vus = {}, sortie = [];
    ids.forEach(function (id) {
      if (quota[id] > 0) sortie = sortie.concat(tirerChapitre(id, quota[id], R, vus));
    });
    return melanger(R, sortie);
  }

  var API = {
    CONFIG: CONFIG, REPERES: REPERES,
    cle: cle, semaine: semaine, nbSemaines: nbSemaines, plafond: plafond, prochainLundi: prochainLundi, plafondApres: plafondApres,
    altDe: altDe, etDe: etDe, plafondEt: plafondEt, NP: NP, NET: NET, suivant: suivant, dernier: dernier,
    charger: charger, sauver: sauver, pseudo: pseudo, setPseudo: setPseudo, actif: actif, memoriserActif: memoriserActif,
    alt: alt, stats: stats, dejaAujourdhui: dejaAujourdhui, reinitialiser: reinitialiser, resume: resume, enregistrer: enregistrer,
    rng: rng, entier: entier, parmi: parmi, melanger: melanger, nb: nb, euro: euro, pct: pct, qcm: qcm,
    inscrire: inscrire, aTest: aTest, testables: testables, couverts: couverts, tirer: tirer
  };
  charger();
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  else window.ASC = API;
})();
