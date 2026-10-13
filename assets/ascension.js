/* =========================================================
   ASCENSION — la logique commune (aucun affichage ici).

   Principe : dans l'onglet « Ascension » d'une classe, l'élève choisit un chapitre
   et passe un test. Test réussi → la montgolfière monte. Test raté → elle stagne
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
    GAIN: 200,             // mètres gagnés au maximum par test réussi ; on s'arrête toujours au prochain repère
    NB_Q: 8,               // questions par test
    SEUIL: 6,              // bonnes réponses pour réussir le test
    A0: 5                  // réglage de l'échelle (voir niveauRel)
  };

  /* Repères, à leur vraie hauteur. */
  var REPERES = [
    { h: 8,    nom: "Lampadaire",   le: "le lampadaire",   du: "du lampadaire",   ico: "lampadaire" },
    { h: 30,   nom: "Grand arbre",  le: "le grand arbre",  du: "du grand arbre",  ico: "arbre" },
    { h: 60,   nom: "Immeuble",     le: "l\u2019immeuble",     du: "de l\u2019immeuble",     ico: "immeuble" },
    { h: 330,  nom: "Tour Eiffel",  le: "la tour Eiffel",  du: "de la tour Eiffel", ico: "eiffel" },
    { h: 828,  nom: "Burj Khalifa", le: "le Burj Khalifa", du: "du Burj Khalifa", ico: "burj" },
    { h: 1465, nom: "Puy de Dôme",  le: "le puy de Dôme",  du: "du puy de Dôme",  ico: "puy" },
    { h: CONFIG.MAX, nom: "Mont Blanc", le: "le Mont Blanc", du: "du Mont Blanc", ico: "montblanc" }
  ];

  /* ---------- Dates ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function cle(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  // numéro du jour calendaire local (insensible aux changements d'heure)
  function jourNum(d) { return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5); }
  function semaine(d) { return Math.floor((jourNum(d || new Date()) - jourNum(parse(CONFIG.DEPART))) / 7); }
  function nbSemaines() { return (jourNum(parse(CONFIG.SOMMET)) - jourNum(parse(CONFIG.DEPART))) / 7; }

  /* Plafond d'altitude : une marche par semaine, jusqu'au sommet. */
  function plafond(d) {
    var k = Math.max(0, semaine(d)), W = nbSemaines();
    if (k >= W) return CONFIG.MAX;
    return Math.min(CONFIG.MAX, Math.round(CONFIG.MAX * (k + 1) / (W + 1) / 10) * 10);
  }
  function prochainLundi(d) {
    var k = semaine(d), t = parse(CONFIG.DEPART);
    if (k < 0) return t;
    t.setDate(t.getDate() + (k + 1) * 7);
    return t;
  }
  function plafondApres(d) { return plafond(prochainLundi(d)); }

  /* ---------- Échelle ----------
     Les repères vont de 8 m à 4 806 m : sur une échelle normale, le lampadaire serait
     invisible. On affiche donc l'altitude sur une échelle logarithmique : monter de 10 à 100 m
     prend autant de place que de 100 à 1 000 m. Renvoie un nombre entre 0 (sol) et 1 (sommet). */
  function niveauRel(a) {
    a = Math.max(0, Math.min(CONFIG.MAX, a));
    return Math.log(1 + a / CONFIG.A0) / Math.log(1 + CONFIG.MAX / CONFIG.A0);
  }
  function franchis(avant, apres) { return REPERES.filter(function (r) { return avant < r.h && apres >= r.h; }); }
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
    n.alt = Math.max(0, Math.min(CONFIG.MAX, +n.alt || 0));
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
    var a = ne(id).alt, pl = plafond(d);
    return {
      alt: a, plafond: pl, marge: Math.max(0, pl - a),
      dernier: dernier(a), suivant: suivant(a),
      lundi: prochainLundi(d), plafondApres: plafondApres(d),
      auSommet: a >= CONFIG.MAX
    };
  }

  /* Enregistre le résultat d'un test. Renvoie ce qui s'est passé pour que l'écran l'explique :
       raison = "echec"            test raté : on stagne
                "jour"             réussi, mais ce chapitre a déjà fait monter aujourd'hui
                "plafond"          réussi, mais déjà au plafond de la semaine
                "au-sommet"        réussi, déjà tout en haut
                "ok"               réussi, +GAIN m au plus (jamais au-delà du prochain repère)
                "plafond-atteint"  réussi, on monte jusqu'au plafond (gain réduit ou non)
                "sommet"           réussi, on atteint le sommet */
  function enregistrer(niv, chap, reussi, date) {
    var n = ne(niv), d = date || new Date(), jour = cle(d);
    var avant = n.alt, pl = plafond(d);
    n.essais[chap] = (n.essais[chap] || 0) + 1;
    etat.actif = niv;
    var res = { reussi: !!reussi, avant: avant, apres: avant, gain: 0, plafond: pl, raison: "echec", franchis: [] };
    if (reussi) {
      n.reussis[chap] = (n.reussis[chap] || 0) + 1;
      if (n.jours[chap] === jour) res.raison = "jour";
      else if (avant >= CONFIG.MAX) res.raison = "au-sommet";
      else if (avant >= pl) res.raison = "plafond";
      else {
        // montée progressive : un test ne fait jamais dépasser le prochain repère (on le "gagne" un par un)
        var nx = suivant(avant), g = Math.min(CONFIG.GAIN, pl - avant, CONFIG.MAX - avant, nx ? nx.h - avant : CONFIG.MAX);
        n.alt = avant + g;
        n.jours[chap] = jour;
        res.apres = n.alt; res.gain = g;
        res.franchis = franchis(avant, n.alt);
        res.raison = n.alt >= CONFIG.MAX ? "sommet" : (n.alt >= pl ? "plafond-atteint" : "ok");
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
     seance = numéro de la séance du chapitre que la question révise (pour dire à l'élève quoi relire). */
  function inscrire(chapId, def) { CHAPITRES[chapId] = def; }
  function aTest(chapId) { return !!CHAPITRES[chapId]; }
  function testables(niveau) { return niveau.chapitres.filter(function (c) { return !c.bientot && aTest(c.id); }); }

  /* Tire un test : autant de questions que NB_Q, réparties sur les séances du chapitre,
     sans énoncé en double, dans un ordre mélangé. */
  function tirer(chapId, R) {
    var def = CHAPITRES[chapId];
    if (!def) return [];
    R = R || Math.random;
    var parSeance = {};
    def.types.forEach(function (t) { (parSeance[t.seance] = parSeance[t.seance] || []).push(t); });
    var cles = Object.keys(parSeance).sort(function (a, b) { return a - b; });
    var base = Math.floor(CONFIG.NB_Q / cles.length), reste = CONFIG.NB_Q % cles.length;
    var avecReste = melanger(R, cles).slice(0, reste), sortie = [], vus = {};
    cles.forEach(function (s) {
      var k = base + (avecReste.indexOf(s) >= 0 ? 1 : 0), pool = melanger(R, parSeance[s]);
      for (var i = 0; i < k; i++) {
        var t = pool[i % pool.length], q = null;
        for (var essai = 0; essai < 40; essai++) { q = t.gen(R); if (!vus[q.q]) break; }
        vus[q.q] = true;
        q.seance = +s; q.type = t.id;
        sortie.push(q);
      }
    });
    return melanger(R, sortie);
  }

  var API = {
    CONFIG: CONFIG, REPERES: REPERES,
    cle: cle, semaine: semaine, nbSemaines: nbSemaines, plafond: plafond, prochainLundi: prochainLundi, plafondApres: plafondApres,
    niveauRel: niveauRel, franchis: franchis, suivant: suivant, dernier: dernier,
    charger: charger, sauver: sauver, pseudo: pseudo, setPseudo: setPseudo, actif: actif, memoriserActif: memoriserActif,
    alt: alt, stats: stats, dejaAujourdhui: dejaAujourdhui, reinitialiser: reinitialiser, resume: resume, enregistrer: enregistrer,
    rng: rng, entier: entier, parmi: parmi, melanger: melanger, nb: nb, euro: euro, pct: pct, qcm: qcm,
    inscrire: inscrire, aTest: aTest, testables: testables, tirer: tirer
  };
  charger();
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  else window.ASC = API;
})();
