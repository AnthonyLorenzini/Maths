/* =========================================================
   QUESTIONS DES TESTS D'ASCENSION — un bloc par chapitre.

   Pour donner un test à un nouveau chapitre :
     ASC.inscrire("<id du chapitre dans catalogue.js>", { types: [ … ] });
   Chaque type de question est  { id, seance, gen(R) }  :
     seance  numéro de la séance révisée (le test en tire autant que possible de chaque séance,
             et dit à l'élève quelle séance relire s'il se trompe)
     gen(R)  fabrique une question avec de nouveaux nombres à chaque appel (R = le hasard)
   Les outils (qcm, nb, euro, pct, entier, parmi…) viennent de ASC (assets/ascension.js).
   Les chapitres sans bloc ici n'ont simplement pas encore de test.

   Les tests sont CUMULATIFS : le test du chapitre N mélange des questions des chapitres 1 à N du même
   niveau (ceux qui ont un bloc), pour rappeler à l'élève tout ce qu'il a vu depuis la rentrée.
   Rien à régler : un nouveau chapitre inscrit enrichit automatiquement les tests des chapitres suivants.
   Les identifiants doivent suivre la forme "<niveau>-ch<numéro>" (ex. "4e-ch4").
   ========================================================= */
(function (A) {
  "use strict";
  var nb = A.nb, euro = A.euro, pct = A.pct, entier = A.entier, parmi = A.parmi, qcm = A.qcm;

  function table(l1, v1, l2, v2) {
    function ligne(l, v) {
      return '<tr><th scope="row">' + l + "</th>" + v.map(function (x) { return "<td>" + nb(x) + "</td>"; }).join("") + "</tr>";
    }
    return '<table class="tab">' + ligne(l1, v1) + ligne(l2, v2) + "</table>";
  }
  function pasDe(x) { return x >= 40 ? 10 : x >= 10 ? 5 : 1; }

  /* =====================  4e · Chapitre 1 — Les pourcentages  ===================== */

  /* Séance 1 — La proportionnalité */

  function propValeur(R) {
    var n1 = entier(R, 2, 8), n2;
    do { n2 = entier(R, 2, 15); } while (n2 === n1);
    if (R() < 0.5) {
      var o = parmi(R, [["cahiers", [2, 3, 4, 5]], ["stylos", [1, 2, 3]], ["tickets de bus", [2, 3]], ["places de cinéma", [6, 7, 8, 9]], ["pizzas", [7, 8, 9, 10]]]);
      var u = parmi(R, o[1]), p1 = n1 * u, p2 = n2 * u;
      return qcm(R, {
        q: n1 + " " + o[0] + " coûtent " + euro(p1) + ". Combien coûtent " + n2 + " " + o[0] + " ?",
        bonne: p2, fmt: euro, pas: u,
        erreurs: [p1 + (n2 - n1), p2 + u, p2 - u, p1 * n2],
        expl: "Pour 1 article : " + euro(p1) + " ÷ " + n1 + " = " + euro(u) + ". Donc " + n2 + " × " + euro(u) + " = " + euro(p2) + ". Le prix est proportionnel au nombre d'articles : on n'ajoute pas la différence."
      });
    }
    var it = parmi(R, [["œufs", [2, 3]], ["tomates", [2, 3]], ["carottes", [2, 3]], ["pommes", [2, 3]]]);
    var v = parmi(R, it[1]), q1 = n1 * v, q2 = n2 * v;
    return qcm(R, {
      q: "Une recette pour " + n1 + " personnes demande " + q1 + " " + it[0] + ". Combien en faut-il pour " + n2 + " personnes ?",
      bonne: q2, fmt: nb, pas: v,
      erreurs: [q1 + (n2 - n1), q2 + v, q2 - v, q1 * n2],
      expl: "Pour 1 personne : " + q1 + " ÷ " + n1 + " = " + v + ". Donc pour " + n2 + " personnes : " + n2 + " × " + v + " = " + q2 + "."
    });
  }

  function propTableau(R) {
    var pair = parmi(R, [["Gâteaux", "Œufs"], ["Cahiers", "Prix (€)"], ["Durée (h)", "Distance (km)"], ["Litres d'essence", "Prix (€)"]]);
    var xs = [], k = entier(R, 2, 6);
    while (xs.length < 3) { var x = entier(R, 1, 12); if (xs.indexOf(x) < 0) xs.push(x); }
    xs.sort(function (a, b) { return a - b; });
    var ys = xs.map(function (x) { return x * k; }), prop = R() < 0.5, c = 0, additif = false, iPert = 0;
    if (!prop) {
      if (R() < 0.5) { c = entier(R, 2, 6); additif = true; ys = xs.map(function (x) { return x + c; }); }
      else { iPert = entier(R, 0, 2); ys[iPert] += (R() < 0.5 ? 1 : -1); }
    }
    var quotients = xs.map(function (x, i) { return ys[i] / x; });
    var NON = "Non, les quotients ne sont pas tous égaux";
    var enonce = table(pair[0], xs, pair[1], ys) + "<p>Ce tableau est-il un tableau de proportionnalité ?</p>";
    if (prop) {
      var diff = ys[0] - xs[0];
      return qcm(R, {
        q: enonce, n: 3, bonne: "Oui, le coefficient est " + nb(k),
        erreurs: [NON, "Oui, le coefficient est " + nb(diff === k ? k + 1 : diff)],
        expl: quotients.map(function (qq, i) { return nb(ys[i]) + " ÷ " + nb(xs[i]); }).join(" ; ") + " : tous les quotients valent " + nb(k) + ". C'est un tableau de proportionnalité, de coefficient " + nb(k) + "."
      });
    }
    var erreurs = additif
      ? ["Oui : on ajoute " + nb(c) + " à chaque nombre", "Oui, le coefficient est " + nb(c), "Oui, le coefficient est " + nb(c + 1)]
      : ["Oui, le coefficient est " + nb(k), "Oui, le coefficient est " + nb(k + 1), "Oui, le coefficient est " + nb(k - 1)];
    var j = 1;                                     // deux colonnes dont les quotients diffèrent
    while (j < 2 && Math.abs(quotients[j] - quotients[0]) < 1e-9) j++;
    function quot(i) {                             // « 18 ÷ 6 = 3 » ou « 37 ÷ 12 ≈ 3,08 »
      var v = ys[i] / xs[i], r = Math.round(v * 100) / 100;
      return nb(ys[i]) + " ÷ " + nb(xs[i]) + (Math.abs(v - r) < 1e-9 ? " = " : " ≈ ") + nb(r);
    }
    return qcm(R, {
      q: enonce, n: 3, bonne: NON, erreurs: erreurs,
      expl: quot(0) + " mais " + quot(j) + " : les quotients sont différents. " + (additif ? "Ajouter le même nombre à chaque fois ne suffit pas pour la proportionnalité." : "Une seule valeur « décalée » suffit à casser la proportionnalité.")
    });
  }

  function propCroix(R) {
    var k = parmi(R, [1.5, 2, 2.5, 3, 4, 5]), a = entier(R, 1, 6) * 2, b = a * k, c = entier(R, 1, 10) * 2;
    if (c === a) c += 2;
    var x = c * k;
    return qcm(R, {
      q: "Dans un tableau de proportionnalité, " + nb(a) + " correspond à " + nb(b) + ". À quel nombre correspond " + nb(c) + " ?",
      bonne: x, fmt: nb, pas: Math.max(1, Math.round(k)),
      erreurs: [c + (b - a), x + k, x - k, c * (b - a)],
      expl: "Le coefficient est " + nb(b) + " ÷ " + nb(a) + " = " + nb(k) + ". Donc " + nb(c) + " × " + nb(k) + " = " + nb(x) + "."
    });
  }

  /* Séance 2 — Calculer et appliquer un pourcentage */

  function pctDe(R) {
    var t = parmi(R, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), N = entier(R, 2, 20) * 20, r = t * N / 100;
    var q = R() < 0.5
      ? "Calcule " + pct(t) + " de " + nb(N) + "."
      : "Sur " + nb(N) + " billets vendus, " + pct(t) + " sont des tarifs réduits. Combien de tarifs réduits y a-t-il ?";
    return qcm(R, {
      q: q, bonne: r, fmt: nb, pas: pasDe(r),
      erreurs: [N - r, N + r, r * 10, r / 10],
      expl: pct(t) + " de " + nb(N) + " = " + nb(N) + " × " + nb(t) + " ÷ 100 = " + nb(r) + "."
    });
  }

  function pctPart(R) {
    var T, p, part;
    do { T = parmi(R, [20, 40, 50, 80, 120, 200]); p = parmi(R, [5, 10, 20, 25, 30, 40, 50, 60, 75, 80]); } while ((T * p) % 100 !== 0);
    part = T * p / 100;
    var s = parmi(R, [
      "Un panier contient " + T + " fruits dont " + part + " pommes. Quel pourcentage des fruits sont des pommes ?",
      "Sur " + T + " tirs, un joueur en réussit " + part + ". Quel est son pourcentage de réussite ?",
      "Dans une classe de " + T + " élèves, " + part + " sont des filles. Quel est le pourcentage de filles ?"
    ]);
    return qcm(R, {
      q: s, bonne: p, fmt: pct, pas: 5, min: 1,
      erreurs: [100 - p, part, p + 10, p - 10],
      expl: "(" + part + " ÷ " + T + ") × 100 = " + nb(part / T) + " × 100 = " + pct(p) + "."
    });
  }

  function pctReduc(R) {
    if (R() < 0.5) {
      var P = entier(R, 2, 15) * 20, t = parmi(R, [10, 15, 20, 25, 30, 40, 50]), red = P * t / 100, fin = P - red;
      var art = parmi(R, [["Un jeu vidéo", "il"], ["Une paire de baskets", "elle"], ["Un sac à dos", "il"], ["Un casque audio", "il"]]);
      return qcm(R, {
        q: art[0] + " coûte " + euro(P) + ". Pendant les soldes, " + art[1] + " est à − " + pct(t) + ". Quel est son nouveau prix ?",
        bonne: fin, fmt: euro, pas: 5,
        erreurs: [red, P + red, P - t],
        expl: "La réduction est " + pct(t) + " de " + euro(P) + " = " + euro(red) + ". Nouveau prix : " + euro(P) + " − " + euro(red) + " = " + euro(fin) + "."
      });
    }
    var HT = entier(R, 2, 20) * 10, taxe = HT * 20 / 100, ttc = HT + taxe;
    return qcm(R, {
      q: "Un article coûte " + euro(HT) + " hors taxes (HT). La TVA est de " + pct(20) + ". Quel est son prix TTC ?",
      bonne: ttc, fmt: euro, pas: 5,
      erreurs: [taxe, HT - taxe, HT + 20, HT * 20],
      expl: "La TVA est " + pct(20) + " de " + euro(HT) + " = " + euro(taxe) + ". Prix TTC : " + euro(HT) + " + " + euro(taxe) + " = " + euro(ttc) + "."
    });
  }

  /* Séance 3 — Les évolutions en pourcentage */

  function evoCoef(R) {
    var t = parmi(R, [5, 10, 15, 20, 25, 30, 40, 50, 60, 75]), hausse = R() < 0.5;
    var c = hausse ? 1 + t / 100 : 1 - t / 100;
    return qcm(R, {
      q: "Une " + (hausse ? "hausse" : "baisse") + " de " + pct(t) + " revient à multiplier par :",
      bonne: c, fmt: nb, pas: 0.1, min: 0.01,
      erreurs: [t / 100, hausse ? 1 - t / 100 : 1 + t / 100, t, hausse ? 1 + t / 10 : 1 - t / 10],
      expl: (hausse ? "Hausse" : "Baisse") + " de " + pct(t) + " : on multiplie par 1 " + (hausse ? "+" : "−") + " " + nb(t / 100) + " = " + nb(c) + "."
    });
  }

  function evoCalcul(R) {
    var hausse = R() < 0.5, P = entier(R, 2, 12) * 20;
    var t = parmi(R, hausse ? [5, 10, 15, 20, 25, 30] : [10, 15, 20, 25, 30, 40]);
    var c = hausse ? (100 + t) / 100 : (100 - t) / 100, res = P * (hausse ? 100 + t : 100 - t) / 100, v = P * t / 100;
    var sujet = hausse
      ? parmi(R, ["Le prix d'un abonnement", "Le prix d'une place de concert", "Le loyer d'un studio"])
      : parmi(R, ["Le prix d'un jeu", "Le prix d'un manteau", "Le prix d'un forfait"]);
    return qcm(R, {
      q: sujet + " est de " + euro(P) + ". Il " + (hausse ? "augmente" : "baisse") + " de " + pct(t) + ". Quel est son nouveau prix ?",
      bonne: res, fmt: euro, pas: 5,
      erreurs: [v, hausse ? P + t : P - t, hausse ? P - v : P + v],
      expl: (hausse ? "Hausse" : "Baisse") + " de " + pct(t) + " : on multiplie par " + nb(c) + ". " + euro(P) + " × " + nb(c) + " = " + euro(res) + "."
    });
  }

  function phrase(v) {
    if (v === 0) return "n'a pas changé";
    return (v > 0 ? "a augmenté de " : "a baissé de ") + pct(Math.abs(v));
  }
  function evoSucc(R) {
    var s1 = R() < 0.5 ? 1 : -1, s2 = R() < 0.5 ? 1 : -1, t1 = parmi(R, [10, 20, 30, 50]), t2 = parmi(R, [10, 20, 30, 50]);
    var Aa = 100 + s1 * t1, Bb = 100 + s2 * t2, v = (Aa * Bb - 10000) / 100, naive = s1 * t1 + s2 * t2;
    var mots = function (s, t) { return (s > 0 ? "augmente" : "baisse") + " de " + pct(t); };
    var erreurs = [phrase(naive), phrase(-v), phrase(s1 * t1), phrase(s2 * t2), phrase(2 * v)];
    if (v !== 0) erreurs.push(phrase(0));
    return qcm(R, {
      q: "Un prix " + mots(s1, t1) + ", puis " + mots(s2, t2) + ". Au final, par rapport au prix de départ, le prix :",
      bonne: phrase(v), erreurs: erreurs,
      expl: "On enchaîne : × " + nb(Aa / 100) + " puis × " + nb(Bb / 100) + ", soit × " + nb(Aa * Bb / 10000) + " au total : le prix " + phrase(v) + ". Les pourcentages successifs ne s'additionnent pas."
    });
  }

  /* Séance 4 — Le pourcentage réciproque */

  function recPrix(R) {
    var baisse = R() < 0.5, P0 = entier(R, 2, 20) * 20;
    var t = parmi(R, baisse ? [10, 20, 25, 30, 40, 50] : [10, 20, 25, 50]);
    var fin = P0 * (baisse ? 100 - t : 100 + t) / 100;
    var art = baisse
      ? parmi(R, ["un casque audio", "une paire de baskets", "un manteau", "un smartphone"])
      : parmi(R, ["un abonnement", "un forfait mensuel", "une place de concert", "un billet de train"]);
    var c = (baisse ? 100 - t : 100 + t) / 100;
    return qcm(R, {
      q: "Après " + (baisse ? "une réduction" : "une hausse") + " de " + pct(t) + ", " + art + " coûte " + euro(fin) + ". Quel était son prix avant " + (baisse ? "la réduction" : "la hausse") + " ?",
      bonne: P0, fmt: euro, pas: 10,
      erreurs: [fin * (baisse ? 100 + t : 100 - t) / 100, baisse ? fin + t : fin - t, 2 * P0 - fin],
      expl: "Après " + (baisse ? "une baisse" : "une hausse") + " de " + pct(t) + ", on a multiplié par " + nb(c) + ". Pour revenir au départ, on divise : " + euro(fin) + " ÷ " + nb(c) + " = " + euro(P0) + ". (Ajouter ou retirer " + pct(t) + " au prix final est faux.)"
    });
  }

  function recTotal(R) {
    var t = parmi(R, [10, 20, 25, 30, 40, 50, 60, 75, 80]), T = entier(R, 3, 30) * 20, part = T * t / 100;
    var s = parmi(R, [
      "Dans un collège, " + part + " élèves sont en 4e, soit " + pct(t) + " des élèves. Combien d'élèves y a-t-il dans le collège ?",
      "Une boutique a vendu " + part + " maillots, soit " + pct(t) + " de son stock. Quel était le stock de départ ?",
      "Lors d'un sondage, " + part + " personnes ont répondu « oui », soit " + pct(t) + " des personnes interrogées. Combien de personnes ont été interrogées ?"
    ]);
    return qcm(R, {
      q: s, bonne: T, fmt: nb, pas: 10,
      erreurs: [T - part, T + part, part * 10, part * 2],
      expl: nb(part) + " représente " + pct(t) + ", donc le total (100 %) vaut " + nb(part) + " ÷ " + nb(t / 100) + " = " + nb(T) + "."
    });
  }

  A.inscrire("4e-ch1", {
    types: [
      { id: "prop-valeur",  seance: 1, gen: propValeur },
      { id: "prop-tableau", seance: 1, gen: propTableau },
      { id: "prop-croix",   seance: 1, gen: propCroix },
      { id: "pct-de",       seance: 2, gen: pctDe },
      { id: "pct-part",     seance: 2, gen: pctPart },
      { id: "pct-reduc",    seance: 2, gen: pctReduc },
      { id: "evo-coef",     seance: 3, gen: evoCoef },
      { id: "evo-calcul",   seance: 3, gen: evoCalcul },
      { id: "evo-succ",     seance: 3, gen: evoSucc },
      { id: "rec-prix",     seance: 4, gen: recPrix },
      { id: "rec-total",    seance: 4, gen: recTotal }
    ]
  });

  /* =====================  Outils communs aux chapitres 2 et 3  ===================== */

  function pgcd(a, b) { return b === 0 ? a : pgcd(b, a % b); }
  function estPremier(n) {
    if (n < 2) return false;
    for (var d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  }
  function hm(t) {                                   // 2,5 → « 2 h 30 min »
    var h = Math.floor(t + 1e-9), m = Math.round((t - h) * 60);
    return h + " h" + (m ? " " + m + " min" : "");
  }
  var SUP = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵" };
  function facteurs(lst) {                           // [[2,2],[3,1]] → « 2² × 3 »
    return lst.map(function (f) { return f[0] + SUP[f[1]]; }).join(" × ");
  }
  function produit(lst) { return lst.reduce(function (a, f) { return a * Math.pow(f[0], f[1]); }, 1); }
  function kmh(x) { return nb(x) + " km/h"; }
  function ms(x) { return nb(x) + " m/s"; }
  function lmin(x) { return nb(x) + " L/min"; }
  function lh(x) { return nb(x) + " L/h"; }
  function gcm3(x) { return nb(x) + " g/cm³"; }
  function gram(x) { return nb(x) + " g"; }
  function kwh(x) { return nb(x) + " kWh"; }
  function m3(x) { return nb(x) + " m³"; }
  function minutes(x) { return nb(x) + " min"; }

  /* =====================  4e · Chapitre 2 — Grandeurs quotients et produits  ===================== */

  /* Séance 1 — La vitesse */

  function vitCalcul(R) {
    var v, t, d;
    do { v = parmi(R, [40, 45, 60, 72, 80, 90, 100, 110, 120]); t = parmi(R, [1.5, 2, 2.5, 3, 4, 5]); d = v * t; } while (d !== Math.floor(d));
    var sujet = parmi(R, ["Un TGV", "Une voiture", "Un car de touristes", "Un camion"]);
    return qcm(R, {
      q: sujet + " parcourt " + nb(d) + " km en " + hm(t) + ", à vitesse constante. Quelle est sa vitesse moyenne ?",
      bonne: v, fmt: kmh, pas: 10,
      erreurs: [d * t, d - t, d + t, v + 10],
      expl: (t === Math.floor(t) ? "" : hm(t) + " = " + nb(t) + " h. ") + "v = d ÷ t = " + nb(d) + " ÷ " + nb(t) + " = " + kmh(v) + "."
    });
  }

  function vitDistTemps(R) {
    var v, t, d;
    if (R() < 0.5) {                                 // distance parcourue
      do { v = parmi(R, [50, 60, 75, 80, 90, 100, 120]); t = parmi(R, [1.5, 2, 2.5, 3, 4, 5]); d = v * t; } while (d !== Math.floor(d));
      var h = Math.floor(t), m = Math.round((t - h) * 60);
      var sj = parmi(R, ["Un car", "Un train", "Une voiture"]);
      return qcm(R, {
        q: sj + " roule à " + kmh(v) + ", à vitesse constante, pendant " + hm(t) + ". Quelle distance parcourt-il ?",
        bonne: d, fmt: function (x) { return nb(x) + " km"; }, pas: 10,
        erreurs: [v * (h + m / 100), v + t, v / t, d + v],
        expl: "d = v × t = " + nb(v) + " × " + nb(t) + " = " + nb(d) + " km." + (m ? " Attention : " + hm(t) + " = " + nb(t) + " h, et pas " + h + "," + m + " h." : "")
      });
    }
    do { v = parmi(R, [40, 60, 80, 100, 120]); t = parmi(R, [1.5, 2.5, 3.5, 4.5]); d = v * t; } while (d !== Math.floor(d));
    var hh = Math.floor(t);
    return qcm(R, {
      q: "Un train roule à " + kmh(v) + ", à vitesse constante. Combien de temps met-il pour parcourir " + nb(d) + " km ?",
      bonne: hm(t),
      erreurs: [hh + " h 50 min", hh + " h 5 min", (hh + 1) + " h 30 min", hh + " h"],
      expl: "t = d ÷ v = " + nb(d) + " ÷ " + nb(v) + " = " + nb(t) + " h. Et 0,5 h = 30 min, donc t = " + hm(t) + "."
    });
  }

  function vitConversion(R) {
    if (R() < 0.5) {
      var v = parmi(R, [18, 36, 54, 72, 90, 108, 126, 144]), w = v / 3.6;
      return qcm(R, {
        q: "Convertis " + kmh(v) + " en mètres par seconde.",
        bonne: w, fmt: ms, pas: 5,
        erreurs: [v * 3.6, v / 6, v / 10, v / 36],
        expl: "Pour passer des km/h aux m/s, on divise par 3,6 : " + nb(v) + " ÷ 3,6 = " + ms(w) + "."
      });
    }
    var w2 = parmi(R, [5, 10, 15, 20, 25, 30]), v2 = w2 * 3.6;
    return qcm(R, {
      q: "Un véhicule se déplace à " + ms(w2) + ". Convertis cette vitesse en kilomètres par heure.",
      bonne: v2, fmt: kmh, pas: 9,
      erreurs: [w2 / 3.6, w2 * 6, w2 * 36, w2 * 10],
      expl: "Pour passer des m/s aux km/h, on multiplie par 3,6 : " + nb(w2) + " × 3,6 = " + kmh(v2) + "."
    });
  }

  /* Séance 2 — Le débit et la densité */

  function debit(R) {
    var d = parmi(R, [8, 12, 15, 20, 25, 30, 40]), t = parmi(R, [3, 4, 5, 6, 8, 10, 12, 15]), V = d * t, k = R();
    if (k < 0.4) {
      return qcm(R, {
        q: "Un robinet remplit une baignoire de " + nb(V) + " L en " + t + " minutes. Quel est son débit ?",
        bonne: d, fmt: lmin, pas: 2,
        erreurs: [V * t, V - t, V + t, d * 60],
        expl: "Débit = volume ÷ temps = " + nb(V) + " ÷ " + t + " = " + lmin(d) + "."
      });
    }
    if (k < 0.8) {
      return qcm(R, {
        q: "Une pompe de débit " + lmin(d) + " vide un bassin de " + nb(V) + " L. Combien de minutes faut-il ?",
        bonne: t, fmt: minutes, pas: 2,
        erreurs: [V * d, V - d, V + d, t * 60],
        expl: "Temps = volume ÷ débit = " + nb(V) + " ÷ " + nb(d) + " = " + t + " min."
      });
    }
    return qcm(R, {
      q: "Une pompe a un débit de " + lmin(d) + ". Quel est son débit en litres par heure ?",
      bonne: d * 60, fmt: lh, pas: 60,
      erreurs: [d / 60, d * 100, d + 60, d * 24],
      expl: "1 heure = 60 minutes, donc en une heure la pompe débite 60 fois plus : " + nb(d) + " × 60 = " + lh(d * 60) + "."
    });
  }

  function densite(R) {
    var rho, V, m;
    do {
      rho = parmi(R, [0.8, 0.9, 2.7, 7.8, 8.9, 11.3]); V = parmi(R, [10, 20, 25, 40, 50]); m = Math.round(rho * V * 10) / 10;
    } while (m !== Math.floor(m));
    var mat = { 0.8: ["de l'huile", "d'huile"], 0.9: ["de la glace", "de glace"], 2.7: ["de l'aluminium", "d'aluminium"], 7.8: ["de l'acier", "d'acier"], 8.9: ["du cuivre", "de cuivre"], 11.3: ["du plomb", "de plomb"] }[rho];
    if (R() < 0.5) {
      return qcm(R, {
        q: "Un bloc de " + gram(m) + " a un volume de " + nb(V) + " cm³. Quelle est sa masse volumique ?",
        bonne: rho, fmt: gcm3, pas: 0.1,
        erreurs: [m * V, m - V, rho * 10, rho / 10],
        expl: "Masse volumique = masse ÷ volume = " + nb(m) + " ÷ " + nb(V) + " = " + gcm3(rho) + "."
      });
    }
    return qcm(R, {
      q: "La masse volumique " + mat[0] + " est " + gcm3(rho) + ". Quelle est la masse de " + nb(V) + " cm³ " + mat[1] + " ?",
      bonne: m, fmt: gram, pas: 5,
      erreurs: [rho + V, V - rho, m * 10, m / 10],
      expl: "Masse = masse volumique × volume = " + nb(rho) + " × " + nb(V) + " = " + gram(m) + "."
    });
  }

  function flotte(R) {
    var rho, V, m;
    do {
      rho = parmi(R, [0.5, 0.6, 0.8, 0.9, 1.2, 1.5, 2.5, 2.7, 7.8]); V = parmi(R, [10, 20, 40, 50]); m = Math.round(rho * V * 10) / 10;
    } while (m !== Math.floor(m));
    var leger = rho < 1;
    var obj = parmi(R, ["Un objet", "Une bille", "Un petit bloc"]);
    return qcm(R, {
      q: obj + " a une masse de " + gram(m) + " et un volume de " + nb(V) + " cm³. L'eau a une masse volumique de 1 g/cm³. Que fait-il dans l'eau ?",
      n: 3, bonne: leger ? "Il flotte" : "Il coule",
      erreurs: [leger ? "Il coule" : "Il flotte", "On ne peut pas savoir"],
      expl: "Sa masse volumique est " + nb(m) + " ÷ " + nb(V) + " = " + gcm3(rho) + ". " + (leger ? "Elle est plus petite que celle de l'eau (1 g/cm³) : il flotte." : "Elle est plus grande que celle de l'eau (1 g/cm³) : il coule.")
    });
  }

  /* Séance 3 — Aire, volume et énergie */

  function volumePave(R) {
    var L = parmi(R, [6, 8, 10, 12, 15]), l = parmi(R, [3, 4, 5, 6]), h = parmi(R, [1, 1.5, 2, 2.5]), V = L * l * h;
    var bac = parmi(R, ["Une piscine", "Un bassin", "Une citerne"]);
    return qcm(R, {
      q: bac + " en forme de pavé droit mesure " + nb(L) + " m de long, " + nb(l) + " m de large et " + nb(h) + " m de profondeur. Quel est son volume ?",
      bonne: V, fmt: m3, pas: 5,
      erreurs: [L * l, L + l + h, L * l * h * 2, L * h * 2 + l * h * 2],
      expl: "Volume = longueur × largeur × hauteur = " + nb(L) + " × " + nb(l) + " × " + nb(h) + " = " + m3(V) + "."
    });
  }

  function energie(R) {
    var P = parmi(R, [500, 800, 1000, 1200, 1500, 2000, 2400]), t = parmi(R, [2, 3, 4, 5, 6, 8, 10]), E = P * t / 1000;
    var app = parmi(R, [["Un radiateur", "il"], ["Un four", "il"], ["Un sèche-cheveux", "il"], ["Une plaque de cuisson", "elle"]]);
    return qcm(R, {
      q: app[0] + " de " + nb(P) + " W fonctionne pendant " + t + " h. Quelle énergie consomme-t-" + app[1] + " ?",
      bonne: E, fmt: kwh, pas: 1,
      erreurs: [P * t, P * t / 100, P * t / 10, P + t],
      expl: nb(P) + " W = " + nb(P / 1000) + " kW. Énergie = puissance × temps = " + nb(P / 1000) + " × " + t + " = " + kwh(E) + "."
    });
  }

  function coutEnergie(R) {
    var P, t, prix, E, c;
    do {                                             // résultat exact au centime près : pas d'arrondi
      P = parmi(R, [1000, 1500, 2000, 2500, 3000]); t = parmi(R, [2, 3, 4]); prix = parmi(R, [0.2, 0.25, 0.3]);
      E = P * t / 1000; c = Math.round(E * prix * 100) / 100;
    } while (Math.abs(E * prix * 100 - Math.round(E * prix * 100)) > 1e-9);
    return qcm(R, {
      q: "Un chauffage de " + nb(P) + " W fonctionne pendant " + t + " h. Le kWh coûte " + euro(prix) + ". Combien coûte ce fonctionnement ?",
      bonne: c, fmt: euro, pas: 0.5,
      erreurs: [E * prix * 10, E + prix, P * prix, E / prix],
      expl: "Énergie : " + nb(P / 1000) + " × " + t + " = " + kwh(E) + ". Coût : " + nb(E) + " × " + nb(prix) + " = " + euro(c) + "."
    });
  }

  /* Séance 4 — Bilan du chapitre */

  function bilanMoyenne(R) {
    var v1, v2, t1, t2, d, T, vm;
    do {
      v1 = parmi(R, [10, 15, 20, 25, 30, 40]); v2 = parmi(R, [10, 15, 20, 25, 30, 40]); t1 = entier(R, 1, 3); t2 = entier(R, 1, 3);
      d = v1 * t1 + v2 * t2; T = t1 + t2; vm = d / T;
    } while (v1 === v2 || t1 === t2 || vm !== Math.floor(vm));
    return qcm(R, {
      q: "Un cycliste roule " + t1 + " h à " + kmh(v1) + ", puis " + t2 + " h à " + kmh(v2) + ". Quelle est sa vitesse moyenne sur l'ensemble du trajet ?",
      bonne: vm, fmt: kmh, pas: 5,
      erreurs: [(v1 + v2) / 2, d, v1 + v2, d - T],
      expl: "Distance totale : " + nb(v1) + " × " + t1 + " + " + nb(v2) + " × " + t2 + " = " + nb(d) + " km. Durée totale : " + T + " h. Vitesse moyenne : " + nb(d) + " ÷ " + T + " = " + kmh(vm) + ". La moyenne de " + nb(v1) + " et " + nb(v2) + " serait fausse, car les durées ne sont pas égales."
    });
  }

  function bilanFuite(R) {
    var d1 = parmi(R, [12, 15, 20, 24, 30]), f = parmi(R, [2, 3, 5, 6]), t = parmi(R, [8, 10, 12, 15, 20]), net = d1 - f, V = net * t;
    return qcm(R, {
      q: "Un robinet débite " + lmin(d1) + " dans un bac, mais le bac fuit à raison de " + lmin(f) + ". Combien de minutes faut-il pour remplir " + nb(V) + " L ?",
      bonne: t, fmt: minutes, pas: 2,
      erreurs: [V / d1, V / (d1 + f), V / f, V * net],
      expl: "Chaque minute, le bac gagne " + nb(d1) + " − " + nb(f) + " = " + lmin(net) + ". Temps : " + nb(V) + " ÷ " + nb(net) + " = " + t + " min."
    });
  }

  A.inscrire("4e-ch2", {
    types: [
      { id: "vit-calcul",     seance: 1, gen: vitCalcul },
      { id: "vit-dist-temps", seance: 1, gen: vitDistTemps },
      { id: "vit-conversion", seance: 1, gen: vitConversion },
      { id: "debit",          seance: 2, gen: debit },
      { id: "densite",        seance: 2, gen: densite },
      { id: "flotte",         seance: 2, gen: flotte },
      { id: "volume-pave",    seance: 3, gen: volumePave },
      { id: "energie",        seance: 3, gen: energie },
      { id: "cout-energie",   seance: 3, gen: coutEnergie },
      { id: "bilan-moyenne",  seance: 4, gen: bilanMoyenne },
      { id: "bilan-fuite",    seance: 4, gen: bilanFuite }
    ]
  });

  /* =====================  4e · Chapitre 3 — Divisibilité et nombres premiers  ===================== */

  /* Séance 1 — Découverte des nombres premiers */

  function premierLequel(R) {
    var premiers = [23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    var pieges = A.melanger(R, [49, 51, 57, 63, 69, 77, 87, 91, 93]).slice(0, 3);
    var bonne = parmi(R, premiers);
    function dec(x) { var d = 2; while (x % d) d++; return x + " = " + d + " × " + (x / d); }
    return qcm(R, {
      q: "Parmi ces nombres, lequel est un nombre premier ?",
      bonne: bonne, fmt: nb, erreurs: pieges,
      expl: nb(bonne) + " n'est divisible que par 1 et par lui-même : il est premier. Les autres ne le sont pas : " + pieges.map(dec).join(" ; ") + "."
    });
  }

  function comptePremiers(R) {
    var debut = parmi(R, [0, 10, 20, 30, 40, 50, 60, 70]), fin = debut + 20, n = 0, liste = [];
    for (var k = debut; k <= fin; k++) if (estPremier(k)) { n++; liste.push(k); }
    return qcm(R, {
      q: "Combien y a-t-il de nombres premiers compris entre " + debut + " et " + fin + " (inclus) ?",
      bonne: n, fmt: nb, pas: 1, min: 0,
      erreurs: [n + 1, n - 1, n + 2, n + 3],
      expl: "Les nombres premiers entre " + debut + " et " + fin + " sont : " + liste.join(", ") + ". Il y en a " + n + "."
    });
  }

  function critereDiv(R) {
    var k = parmi(R, [3, 9]);
    var bonne, pieges = [], x;
    do { x = entier(R, 100, 990); } while (x % k !== 0 || x % 10 === 0);
    bonne = x;
    var vus = {};
    vus[x] = true;
    while (pieges.length < 4) {
      var y = entier(R, 100, 990), s = String(y).split("").reduce(function (a, c) { return a + (+c); }, 0);
      if (vus[y] || y % k === 0 || y % 10 === 0) continue;
      if (k === 9 && s % 3 !== 0 && R() < 0.6) continue;     // pour 9, on garde souvent des multiples de 3 (piège classique)
      vus[y] = true; pieges.push(y);
    }
    var sc = String(bonne).split("").reduce(function (a, c) { return a + (+c); }, 0);
    return qcm(R, {
      q: "Lequel de ces nombres est divisible par " + k + " ?",
      bonne: bonne, fmt: String, erreurs: pieges,
      expl: "On additionne les chiffres : " + String(bonne).split("").join(" + ") + " = " + sc + ", et " + sc + " est dans la table de " + k + ". Un nombre est divisible par " + k + " quand la somme de ses chiffres l'est."
    });
  }

  /* Séance 2 — Décomposition en facteurs premiers */

  function tirerDecomp(R) {
    var P = [2, 3, 5, 7, 11], lst, N;
    do {
      var nbf = entier(R, 2, 3), ps = A.melanger(R, P).slice(0, nbf).sort(function (a, b) { return a - b; });
      lst = ps.map(function (p) { return [p, entier(R, 1, p === 2 ? 3 : 2)]; });
      N = produit(lst);
    } while (N < 30 || N > 700 || lst.every(function (f) { return f[1] === 1; }) && R() < 0.5);
    return { lst: lst, N: N };
  }

  function decomposition(R) {
    var d = tirerDecomp(R), lst = d.lst, N = d.N, bonne = facteurs(lst), erreurs = [];
    // piège 1 : un facteur qui n'est pas premier (le produit est bon, mais ce n'est pas une décomposition en premiers)
    var iC = lst.findIndex(function (f) { return f[1] >= 2; }), morceaux;
    if (iC >= 0) {
      morceaux = lst.map(function (f, i) { return i === iC ? String(Math.pow(f[0], f[1])) : f[0] + SUP[f[1]]; });
    } else {
      morceaux = [String(lst[0][0] * lst[1][0])].concat(lst.slice(2).map(function (f) { return f[0] + SUP[f[1]]; }));
    }
    erreurs.push(morceaux.join(" × "));
    // piège 2 : un exposant trop fort ; piège 3 : un exposant oublié ; piège 4 : un facteur remplacé
    var j = entier(R, 0, lst.length - 1);
    erreurs.push(facteurs(lst.map(function (f, i) { return i === j ? [f[0], Math.min(5, f[1] + 1)] : f; })));
    erreurs.push(facteurs(lst.map(function (f, i) { return i === j ? [f[0], Math.max(1, f[1] - 1)] : f; })));
    var suiv = { 2: 3, 3: 5, 5: 7, 7: 11, 11: 13 };
    erreurs.push(facteurs(lst.map(function (f, i) { return i === lst.length - 1 ? [suiv[f[0]] || f[0], f[1]] : f; })));
    return qcm(R, {
      q: "Quelle est la décomposition de " + nb(N) + " en produit de facteurs premiers ?",
      bonne: bonne, erreurs: erreurs.filter(function (x) { return x !== bonne; }),
      expl: nb(N) + " = " + bonne + ". Chaque facteur est un nombre premier, et le produit redonne bien " + nb(N) + ". Dans une décomposition, il ne doit rester aucun facteur comme 4, 6, 9, 10…"
    });
  }

  function decompInverse(R) {
    var d = tirerDecomp(R), lst = d.lst, N = d.N;
    var somme = lst.reduce(function (a, f) { return a + Math.pow(f[0], f[1]); }, 0);
    var prodPE = lst.reduce(function (a, f) { return a * f[0] * f[1]; }, 1);
    return qcm(R, {
      q: "Quel nombre est égal à " + facteurs(lst) + " ?",
      bonne: N, fmt: nb, pas: 10,
      erreurs: [somme, prodPE, N + lst[0][0], N - lst[lst.length - 1][0]],
      expl: facteurs(lst) + " = " + lst.map(function (f) { return nb(Math.pow(f[0], f[1])); }).join(" × ") + " = " + nb(N) + "."
    });
  }

  function diviseursPremiers(R) {
    var d = tirerDecomp(R), lst = d.lst, N = d.N, ps = lst.map(function (f) { return f[0]; });
    function liste(a) { return a.length === 1 ? String(a[0]) : a.slice(0, -1).join(", ") + " et " + a[a.length - 1]; }
    var bonne = liste(ps), erreurs = [];
    var comp = lst.filter(function (f) { return f[1] >= 2; })[0];
    erreurs.push(liste([1].concat(ps)));
    if (comp) erreurs.push(liste(ps.concat([Math.pow(comp[0], 2)]).sort(function (a, b) { return a - b; })));
    erreurs.push(liste(ps.slice(0, -1).length ? ps.slice(1) : [ps[0] + 1]));
    erreurs.push(liste(ps.concat([N]).sort(function (a, b) { return a - b; })));
    return qcm(R, {
      q: "Quels sont les diviseurs premiers de " + nb(N) + " ?",
      bonne: bonne, erreurs: erreurs.filter(function (x) { return x !== bonne; }),
      expl: nb(N) + " = " + facteurs(lst) + ". Ses diviseurs premiers sont les nombres premiers qui apparaissent dans la décomposition : " + bonne + ". Ni 1, ni " + nb(N) + " lui-même ne comptent comme diviseurs premiers (1 n'est pas premier, et " + nb(N) + " ne l'est pas)."
    });
  }

  /* Séance 3 — Simplifier une fraction */

  function fracIrreductible(R) {
    var p, q, dd;
    do {
      p = entier(R, 2, 11); q = entier(R, 3, 13); dd = parmi(R, [2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
    } while (p >= q || pgcd(p, q) !== 1 || q * dd > 150);
    var a = p * dd, b = q * dd, erreurs = [];
    var pf = [2, 3, 5, 7].filter(function (x) { return dd % x === 0 && dd / x > 1; })[0];
    if (pf) erreurs.push((a / pf) + "/" + (b / pf));
    erreurs.push(q + "/" + p, (p + 1) + "/" + q, p + "/" + (q + 1), (a - dd) + "/" + (b - dd));
    var bonne = p + "/" + q;
    return qcm(R, {
      q: "Quelle est la fraction irréductible égale à " + a + "/" + b + " ?",
      bonne: bonne, erreurs: erreurs.filter(function (x) { return x !== bonne; }),
      expl: "On divise le numérateur et le dénominateur par leur plus grand diviseur commun, " + dd + " : " + a + " ÷ " + dd + " = " + p + " et " + b + " ÷ " + dd + " = " + q + ". Une fraction irréductible ne se simplifie plus : " + bonne + "."
    });
  }

  function fracSimplifiable(R) {
    var a, b, g, h = [2, 3, 5, 7, 11];
    var reductible = R() < 0.6;
    if (reductible) {
      do { g = parmi(R, [2, 3, 5, 7]); a = g * entier(R, 2, 12); b = g * entier(R, 2, 14); } while (a === b || a > b || b > 99);
    } else {
      do { a = entier(R, 5, 40); b = entier(R, 6, 60); } while (a >= b || pgcd(a, b) !== 1);
    }
    var gg = pgcd(a, b), bonne, erreurs = [];
    if (gg > 1) {
      var pg = [2, 3, 5, 7, 11, 13].filter(function (x) { return gg % x === 0; })[0];
      bonne = "Non, on peut simplifier par " + pg;
      erreurs.push("Oui, elle est irréductible");
      h.filter(function (x) { return gg % x !== 0; }).slice(0, 2).forEach(function (x) { erreurs.push("Non, on peut simplifier par " + x); });
      return qcm(R, {
        q: "La fraction " + a + "/" + b + " est-elle irréductible ?",
        bonne: bonne, erreurs: erreurs,
        expl: a + " et " + b + " sont tous les deux divisibles par " + pg + " : " + a + " = " + pg + " × " + (a / pg) + " et " + b + " = " + pg + " × " + (b / pg) + ". La fraction n'est donc pas irréductible."
      });
    }
    bonne = "Oui, elle est irréductible";
    h.filter(function (x) { return !(a % x === 0 && b % x === 0); }).slice(0, 3).forEach(function (x) { erreurs.push("Non, on peut simplifier par " + x); });
    return qcm(R, {
      q: "La fraction " + a + "/" + b + " est-elle irréductible ?",
      bonne: bonne, erreurs: erreurs,
      expl: "Il n'existe aucun nombre (autre que 1) qui divise à la fois " + a + " et " + b + " : leur seul diviseur commun est 1. La fraction est irréductible."
    });
  }

  /* Séance 4 — Problèmes de répartition */

  function pgcdLots(R) {
    var g, a, b;
    do {
      g = parmi(R, [4, 5, 6, 7, 8, 9, 12, 15]); a = entier(R, 2, 9); b = entier(R, 2, 9);
    } while (a >= b || pgcd(a, b) !== 1 || g * b > 150);
    var A1 = g * a, B1 = g * b, fl = parmi(R, [["roses", "tulipes"], ["stylos", "crayons"], ["billes rouges", "billes bleues"], ["bonbons", "chocolats"]]);
    if (R() < 0.5) {
      return qcm(R, {
        q: "Une commerçante a " + A1 + " " + fl[0] + " et " + B1 + " " + fl[1] + ". Elle veut faire le plus grand nombre possible de lots identiques, sans rien laisser. Combien de lots peut-elle faire ?",
        bonne: g, fmt: nb, pas: 1,
        erreurs: [a, b, B1 - A1, g + 1],
        expl: "Le nombre de lots est le plus grand diviseur commun de " + A1 + " et " + B1 + ", c'est-à-dire " + g + ". (Avec la décomposition en facteurs premiers de " + A1 + " et de " + B1 + ", on garde les facteurs communs.)"
      });
    }
    return qcm(R, {
      q: "Une commerçante a " + A1 + " " + fl[0] + " et " + B1 + " " + fl[1] + ". Elle fait le plus grand nombre possible de lots identiques, sans rien laisser. Combien de " + fl[0] + " y a-t-il dans chaque lot ?",
      bonne: a, fmt: nb, pas: 1,
      erreurs: [g, b, A1 - B1 > 0 ? A1 - B1 : B1 - A1, a + 1],
      expl: "On fait " + g + " lots (le plus grand diviseur commun de " + A1 + " et " + B1 + "). Chaque lot contient donc " + A1 + " ÷ " + g + " = " + a + " " + fl[0] + " et " + B1 + " ÷ " + g + " = " + b + " " + fl[1] + "."
    });
  }

  function carrelage(R) {
    var g, a, b;
    do {
      g = parmi(R, [10, 15, 20, 25, 30, 40, 50]); a = entier(R, 2, 9); b = entier(R, 2, 9);
    } while (a >= b || pgcd(a, b) !== 1 || g * b > 500);
    var L = g * b, l = g * a, nbC = a * b;
    return qcm(R, {
      q: "Une pièce rectangulaire mesure " + L + " cm sur " + l + " cm. On la recouvre, sans découpe, avec des carreaux carrés tous identiques, les plus grands possible. Quel est le côté d'un carreau ?",
      bonne: g, fmt: function (x) { return nb(x) + " cm"; }, pas: 5,
      erreurs: [g * 2, L - l, a * 10, g + 5],
      expl: "Le côté est le plus grand diviseur commun de " + L + " et " + l + ", c'est-à-dire " + g + " cm. On pose alors " + b + " carreaux dans la longueur et " + a + " dans la largeur, soit " + nbC + " carreaux."
    });
  }

  A.inscrire("4e-ch3", {
    types: [
      { id: "premier-lequel",     seance: 1, gen: premierLequel },
      { id: "compte-premiers",    seance: 1, gen: comptePremiers },
      { id: "critere-div",        seance: 1, gen: critereDiv },
      { id: "decomposition",      seance: 2, gen: decomposition },
      { id: "decomp-inverse",     seance: 2, gen: decompInverse },
      { id: "diviseurs-premiers", seance: 2, gen: diviseursPremiers },
      { id: "frac-irreductible",  seance: 3, gen: fracIrreductible },
      { id: "frac-simplifiable",  seance: 3, gen: fracSimplifiable },
      { id: "pgcd-lots",          seance: 4, gen: pgcdLots },
      { id: "carrelage",          seance: 4, gen: carrelage }
    ]
  });


  /* =====================  6e · Chapitre 1 — Numération entière et décimale  =====================

     Les séances correspondent à celles du site (catalogue.js) :
       1 = lire et écrire les grands nombres entiers
       2 = rangs des chiffres : « chiffre des… », « nombre de… », valeur d'un chiffre
       3 = écriture décimale : zéros inutiles, décomposition                                    */

  var U16 = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize"];
  var DIZ = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };

  function moinsCent(n, final) {                    // 0 < n < 100 ; final : « quatre-vingts » prend son s
    if (n < 17) return U16[n];
    if (n < 20) return "dix-" + U16[n - 10];
    if (n < 70) {
      var d = Math.floor(n / 10), u = n % 10;
      return DIZ[d] + (u === 0 ? "" : u === 1 ? " et un" : "-" + U16[u]);
    }
    if (n < 80) return n === 71 ? "soixante et onze" : "soixante-" + moinsCent(n - 60, false);
    if (n === 80) return "quatre-vingt" + (final ? "s" : "");
    return "quatre-vingt-" + moinsCent(n - 80, false);
  }
  function moinsMille(n, final) {                   // 0 < n < 1000
    var c = Math.floor(n / 100), r = n % 100, mots = [];
    if (c === 1) mots.push("cent");
    else if (c > 1) mots.push(U16[c] + " cent" + (r === 0 && final ? "s" : ""));
    if (r > 0) mots.push(moinsCent(r, final));
    return mots.join(" ");
  }
  function enLettres(n) {                           // 0 < n < 10^12
    var mots = [], mds = Math.floor(n / 1e9), mi = Math.floor(n / 1e6) % 1000, mille = Math.floor(n / 1000) % 1000, r = n % 1000;
    if (mds) mots.push(moinsMille(mds, true) + " milliard" + (mds > 1 ? "s" : ""));
    if (mi) mots.push(moinsMille(mi, true) + " million" + (mi > 1 ? "s" : ""));
    if (mille) mots.push((mille === 1 ? "" : moinsMille(mille, false) + " ") + "mille");
    if (r) mots.push(moinsMille(r, true));
    return mots.join(" ");
  }

  /* Séance 1 — Lire et écrire les grands nombres entiers */

  function grandNombre(R) {
    var g2 = entier(R, 1, 999), g1 = parmi(R, [0, 5, 12, 40, 305, 780, 906]), g0 = parmi(R, [0, 8, 70, 214, 360, 519, 802, 999]);
    if (R() < 0.3) g2 = parmi(R, [2, 7, 45, 300, 800]);
    var N = g2 * 1e6 + g1 * 1e3 + g0;
    return { g2: g2, g1: g1, g0: g0, N: N, fausses: [
      Number(String(g2) + String(g1) + String(g0)),                  // on oublie de compléter les groupes par des zéros
      g2 * 1e6 + g0 * 1e3 + g1,                                       // on échange les milliers et les unités
      N * 10,
      g2 * 1e3 + g1                                                   // on oublie un groupe
    ] };
  }

  function lireEcrire(R) {
    var d = grandNombre(R), N = d.N;
    if (R() < 0.5) {
      return qcm(R, {
        q: "Quel est le nombre « " + enLettres(N) + " » ?",
        bonne: N, fmt: nb, pas: 1000, erreurs: d.fausses,
        expl: enLettres(N) + " s'écrit " + nb(N) + ". On lit le nombre par groupes de trois chiffres : millions, milliers, puis unités. Quand un groupe n'a pas trois chiffres, on le complète par des zéros à gauche (huit unités après un groupe de milliers s'écrivent 008) et un groupe absent s'écrit 000."
      });
    }
    return qcm(R, {
      q: "Comment lit-on le nombre " + nb(N) + " ?",
      bonne: enLettres(N), erreurs: d.fausses.map(enLettres).filter(function (x) { return x; }),
      expl: nb(N) + " se lit « " + enLettres(N) + " ». On lit chaque groupe de trois chiffres, suivi du nom de sa classe (millions, mille)."
    });
  }

  /* Séances 2 et 3 : un nombre décimal dont tous les chiffres sont différents */

  function nomRangE(e) {                            // e = exposant de 10 : 0 unités, 1 dizaines, 2 centaines, 3 unités de mille…
    var t = { "-3": "millièmes", "-2": "centièmes", "-1": "dixièmes", 0: "unités", 1: "dizaines", 2: "centaines", 3: "milliers", 4: "dizaines de mille", 5: "centaines de mille", 6: "millions" };
    return t[e];
  }
  function nombreDistinct(R) {                      // chiffres tous différents, ni zéro en tête ni zéro à la fin
    var lg = entier(R, 5, 8), dp = entier(R, 1, 3), chiffres;
    if (lg - dp < 2) dp = lg - 2;
    do { chiffres = A.melanger(R, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, lg); } while (chiffres[0] === 0 || chiffres[lg - 1] === 0);
    var ent = lg - dp;
    return { ch: chiffres, ent: ent, dp: dp, texte: nb(Number(chiffres.slice(0, ent).join("") + "." + chiffres.slice(ent).join(""))) };
  }
  function chiffreA(n, e) { return n.ch[n.ent - 1 - e]; }
  function prefixeA(n, e) { return Number(n.ch.slice(0, n.ent - e).join("")); }

  function chiffreDes(R) {
    var n = nombreDistinct(R), e = entier(R, -n.dp, n.ent - 1);
    var bonne = chiffreA(n, e), erreurs = [];
    [e + 1, e - 1, -e, e + 2, e - 2].forEach(function (x) { if (x >= -n.dp && x <= n.ent - 1 && x !== e) erreurs.push(chiffreA(n, x)); });
    n.ch.forEach(function (c) { erreurs.push(c); });
    return qcm(R, {
      q: "Dans le nombre " + n.texte + ", quel est le chiffre des " + nomRangE(e) + " ?",
      bonne: bonne, fmt: String, min: 0, erreurs: erreurs,
      expl: "Dans " + n.texte + ", le chiffre des " + nomRangE(e) + " est " + bonne + ". Le « chiffre des… » est un seul chiffre : celui qui occupe ce rang dans le tableau de numération."
    });
  }

  function nombreDe(R) {
    var n = nombreDistinct(R), e = entier(R, -n.dp, n.ent - 2);
    var bonne = prefixeA(n, e), erreurs = [chiffreA(n, e)];
    if (e + 1 <= n.ent - 1) erreurs.push(prefixeA(n, e + 1));
    if (e - 1 >= -n.dp) erreurs.push(prefixeA(n, e - 1)); else erreurs.push(prefixeA(n, e) * 10 + n.ch[0]);
    erreurs.push(Number(n.ch.join("")));
    return qcm(R, {
      q: "Dans le nombre " + n.texte + ", quel est le nombre de " + nomRangE(e) + " ?",
      bonne: bonne, fmt: nb, min: 0, pas: 1, erreurs: erreurs,
      expl: "Le « nombre de " + nomRangE(e) + " » compte tout ce qu'il y a dans " + n.texte + " jusqu'au rang des " + nomRangE(e) + " (inclus) : " + nb(bonne) + ". Il ne faut pas le confondre avec le « chiffre des " + nomRangE(e) + " », qui est seulement " + chiffreA(n, e) + "."
    });
  }

  function valeurChiffre(R) {
    var n = nombreDistinct(R), e = entier(R, -n.dp, n.ent - 1), c = chiffreA(n, e);
    if (c === 0) return valeurChiffre(R);
    var v = c * Math.pow(10, e);
    return qcm(R, {
      q: "Dans le nombre " + n.texte + ", quelle est la valeur du chiffre " + c + " ?",
      bonne: v, fmt: nb, min: 0, pas: Math.pow(10, e),
      erreurs: [c, c * Math.pow(10, e + 1), c * Math.pow(10, e - 1), c * Math.pow(10, -e)],
      expl: "Le chiffre " + c + " est au rang des " + nomRangE(e) + " dans " + n.texte + ". Sa valeur est donc " + c + " × " + nb(Math.pow(10, e)) + " = " + nb(v) + "."
    });
  }

  /* Séance 3 — Écriture décimale : zéros inutiles, décomposition */

  function groupe(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, " "); }   // 1264817 → 1 264 817 (espace fine)

  function zerosInutiles(R) {
    var lg = entier(R, 4, 7), dp = entier(R, 1, 2), ch, ent = lg - dp;
    do {
      ch = []; for (var i = 0; i < lg; i++) ch.push(entier(R, i === 0 ? 1 : 0, 9));
    } while (ch[lg - 1] === 0 || ch[1] !== 0 || ch.slice(0, ent).filter(function (c) { return c === 0; }).length > 2);
    var entStr = ch.slice(0, ent).join(""), decStr = ch.slice(ent).join("");
    var base = Number(entStr + "." + decStr);
    var zD = "0".repeat(entier(R, 1, 2)), zF = "0".repeat(entier(R, 1, 2));
    var ecrit = groupe(zD + entStr) + "," + decStr + zF;
    var sansInterne = Number(entStr[0] + entStr.slice(2) + "." + decStr);
    return qcm(R, {
      q: "Quelle écriture est égale à " + ecrit + " (sans zéro inutile) ?",
      bonne: base, fmt: nb, pas: 1,
      erreurs: [base * 10, base / 10, sansInterne, base * 100],
      expl: "Les zéros inutiles sont ceux qu'on peut supprimer sans changer le rang des autres chiffres : ceux placés tout à gauche de la partie entière et tout à droite de la partie décimale. Ici : " + ecrit + " = " + nb(base) + ". Le zéro placé entre deux chiffres, lui, est indispensable."
    });
  }

  function decompositionDecimale(R) {
    var exps = A.melanger(R, [4, 3, 2, 1, 0, -1, -2, -3]).slice(0, entier(R, 3, 4)).sort(function (a, b) { return b - a; });
    var cs = exps.map(function () { return entier(R, 1, 9); });
    var total = 0;
    exps.forEach(function (e, i) { total += cs[i] * Math.pow(10, e + 3); });
    var N = total / 1000;
    var expr = exps.map(function (e, i) { return cs[i] + " × " + nb(Math.pow(10, e)); }).join(" + ");
    var concat = Number(cs.join(""));
    var vois = exps.map(function (e, i) { return i === exps.length - 1 ? cs[i] * Math.pow(10, e - 1) : cs[i] * Math.pow(10, e); }).reduce(function (a, b) { return a + b; }, 0);
    return qcm(R, {
      q: "Quel nombre est égal à " + expr + " ?",
      bonne: N, fmt: nb, pas: 1,
      erreurs: [concat, N * 10, N / 10, Math.round(vois * 1000) / 1000],
      expl: expr.split(" + ").map(function (t) { var p = t.split(" × "); return p[0] + " × " + p[1] + " = " + nb(p[0] * Number(p[1].replace(/\s/g, "").replace(",", "."))); }).join(" ; ") + ". En les additionnant : " + nb(N) + "."
    });
  }

  A.inscrire("6e-ch1", {
    types: [
      { id: "lire-ecrire",    seance: 1, gen: lireEcrire },
      { id: "chiffre-des",    seance: 2, gen: chiffreDes },
      { id: "nombre-de",      seance: 2, gen: nombreDe },
      { id: "valeur-chiffre", seance: 2, gen: valeurChiffre },
      { id: "zeros-inutiles", seance: 3, gen: zerosInutiles },
      { id: "decomposition-6e", seance: 3, gen: decompositionDecimale }
    ]
  });


  /* =====================  Outils communs aux chapitres 2 à 4 de la 6e  ===================== */

  function cm(x) { return nb(x) + " cm"; }
  function frac(a, b) { return a + "/" + b; }
  function paire(R) { return parmi(R, ["AB", "CD", "EF", "KL", "MN", "RS"]); }
  function heure(total) {                            // 995 → « 16 h 35 »
    var h = Math.floor(total / 60), m = total % 60;
    return h + " h " + (m < 10 ? "0" : "") + m;
  }

  /* =====================  6e · Chapitre 2 — Points, droites et distances  ===================== */

  /* Séance 1 — Le vocabulaire de la géométrie */

  function notationObjet(R) {
    var p = paire(R), X = p[0], Y = p[1];
    var objets = [
      { txt: "la droite qui passe par les points " + X + " et " + Y, bonne: "(" + X + Y + ")" },
      { txt: "le segment d'extrémités " + X + " et " + Y, bonne: "[" + X + Y + "]" },
      { txt: "la demi-droite d'origine " + X + " qui passe par " + Y, bonne: "[" + X + Y + ")" },
      { txt: "la longueur du segment d'extrémités " + X + " et " + Y, bonne: X + Y }
    ];
    var o = parmi(R, objets), tous = ["(" + X + Y + ")", "[" + X + Y + "]", "[" + X + Y + ")", X + Y];
    return qcm(R, {
      q: "Comment note-t-on " + o.txt + " ?",
      bonne: o.bonne, erreurs: tous.filter(function (x) { return x !== o.bonne; }),
      expl: "La droite se note avec des parenthèses : (" + X + Y + "). Le segment se note avec des crochets : [" + X + Y + "]. La demi-droite a un crochet côté origine et une parenthèse de l'autre côté : [" + X + Y + "). La longueur se note sans rien : " + X + Y + "."
    });
  }

  function appartient(R) {
    var P = parmi(R, ["A", "B", "C", "M", "N", "P", "R"]), d = parmi(R, ["(d)", "(d')", "(D)"]), k = entier(R, 0, 3);
    if (k === 0) {
      return qcm(R, { q: "Le point " + P + " appartient à la droite " + d + ". Comment l'écrit-on ?", n: 3,
        bonne: P + " ∈ " + d, erreurs: [P + " ∉ " + d, P + " = " + d],
        expl: "Le symbole ∈ signifie « appartient à ». On écrit " + P + " ∈ " + d + "." });
    }
    if (k === 1) {
      return qcm(R, { q: "Le point " + P + " n'est pas sur la droite " + d + ". Comment l'écrit-on ?", n: 3,
        bonne: P + " ∉ " + d, erreurs: [P + " ∈ " + d, P + " = " + d],
        expl: "Le symbole ∉ signifie « n'appartient pas à ». On écrit " + P + " ∉ " + d + "." });
    }
    if (k === 2) {
      return qcm(R, { q: "Comment lit-on « " + P + " ∈ " + d + " » ?", n: 3,
        bonne: P + " appartient à " + d, erreurs: [P + " n'appartient pas à " + d, P + " est égal à " + d],
        expl: "∈ se lit « appartient à » : le point " + P + " est sur la droite " + d + "." });
    }
    return qcm(R, { q: "Comment lit-on « " + P + " ∉ " + d + " » ?", n: 3,
      bonne: P + " n'appartient pas à " + d, erreurs: [P + " appartient à " + d, P + " est égal à " + d],
      expl: "∉ se lit « n'appartient pas à » : le point " + P + " n'est pas sur la droite " + d + "." });
  }

  function ecritureLongueur(R) {
    var p = paire(R), X = p[0], Y = p[1], L = parmi(R, [3, 4, 5, 6.5, 7, 8.2, 9, 4.5]);
    return qcm(R, {
      q: "Le segment [" + X + Y + "] mesure " + cm(L) + ". Quelle écriture est correcte ?",
      bonne: X + Y + " = " + cm(L),
      erreurs: ["[" + X + Y + "] = " + cm(L), "(" + X + Y + ") = " + cm(L), "[" + X + Y + ") = " + cm(L)],
      expl: "[" + X + Y + "] est le segment (un objet), et " + X + Y + " est sa longueur (un nombre). C'est une longueur qui mesure " + cm(L) + " : " + X + Y + " = " + cm(L) + "."
    });
  }

  /* Séance 2 — Reporter des longueurs et trouver la distance */

  function pointSurSegment(R) {
    var t = parmi(R, [["A", "D", "B"], ["E", "M", "F"], ["R", "T", "S"]]), X = t[0], Y = t[1], Z = t[2];
    var a = parmi(R, [1.5, 2, 2.5, 3, 3.5, 4]), b = parmi(R, [2, 2.5, 3, 4, 4.5, 5]), sur = R() < 0.5, c = parmi(R, [0.5, 1, 1.5]);
    var z = sur ? a + b : a + b - c;
    return qcm(R, {
      q: X + Y + " = " + cm(a) + ", " + Y + Z + " = " + cm(b) + " et " + X + Z + " = " + cm(z) + ". Le point " + Y + " est-il sur le segment [" + X + Z + "] ?",
      n: 3, bonne: sur ? "Oui, " + Y + " est sur [" + X + Z + "]" : "Non, " + Y + " n'est pas sur [" + X + Z + "]",
      erreurs: [sur ? "Non, " + Y + " n'est pas sur [" + X + Z + "]" : "Oui, " + Y + " est sur [" + X + Z + "]", "On ne peut pas savoir"],
      expl: X + Y + " + " + Y + Z + " = " + nb(a) + " + " + nb(b) + " = " + nb(a + b) + " cm. " + (sur
        ? "C'est égal à " + X + Z + " = " + cm(z) + " : " + Y + " est sur le segment [" + X + Z + "]."
        : "C'est différent de " + X + Z + " = " + cm(z) + " (plus grand) : " + Y + " n'est pas sur le segment [" + X + Z + "].")
    });
  }

  function complementSegment(R) {
    var a = parmi(R, [1.5, 2.5, 3.2, 4.5, 5.5, 2.8]), b = parmi(R, [1.5, 2.5, 3.5, 4.2, 5, 6.5]), z = a + b;
    var t = parmi(R, [["A", "D", "B"], ["E", "M", "F"], ["R", "T", "S"]]), X = t[0], Y = t[1], Z = t[2];
    return qcm(R, {
      q: "Le point " + Y + " est sur le segment [" + X + Z + "]. On a " + X + Y + " = " + cm(a) + " et " + X + Z + " = " + cm(z) + ". Combien mesure " + Y + Z + " ?",
      bonne: b, fmt: cm, pas: 1, erreurs: [z + a, a, z, b + 1],
      expl: "Comme " + Y + " est sur [" + X + Z + "], " + X + Y + " + " + Y + Z + " = " + X + Z + ". Donc " + Y + Z + " = " + nb(z) + " − " + nb(a) + " = " + cm(b) + "."
    });
  }

  function distanceInegalite(R) {
    var p = parmi(R, [["A", "B", "C"], ["E", "F", "G"], ["K", "L", "M"]]), X = p[0], Y = p[1], Z = p[2];
    if (R() < 0.5) {
      return qcm(R, {
        q: "Le point " + Z + " n'est pas sur le segment [" + X + Y + "]. Quelle relation est vraie ?", n: 3,
        bonne: X + Z + " + " + Z + Y + " > " + X + Y, erreurs: [X + Z + " + " + Z + Y + " = " + X + Y, X + Z + " + " + Z + Y + " < " + X + Y],
        expl: "Aller de " + X + " à " + Y + " en passant par " + Z + " (hors du segment) est plus long que d'aller tout droit : " + X + Z + " + " + Z + Y + " > " + X + Y + "."
      });
    }
    return qcm(R, {
      q: "La distance entre deux points " + X + " et " + Y + " est…",
      bonne: "la longueur du plus court chemin de " + X + " à " + Y,
      erreurs: ["la longueur d'un chemin quelconque de " + X + " à " + Y, "la longueur du plus long chemin de " + X + " à " + Y, "la longueur de la droite (" + X + Y + ")"],
      expl: "La distance " + X + Y + " est la longueur du plus court chemin de " + X + " à " + Y + " : c'est la longueur du segment [" + X + Y + "]."
    });
  }

  /* Séance 3 — Réinvestir et faire le point */

  function milieu(R) {
    var p = paire(R), X = p[0], Y = p[1], h = parmi(R, [2, 2.5, 3, 3.5, 4, 4.5, 5, 6]), L = 2 * h;
    if (R() < 0.5) {
      return qcm(R, {
        q: "M est le milieu du segment [" + X + Y + "]. " + X + "M = " + cm(h) + ". Combien mesure " + X + Y + " ?",
        bonne: L, fmt: cm, pas: 1, erreurs: [h / 2, h, h + 2, 3 * h],
        expl: "M est le milieu : " + X + "M = M" + Y + " = " + cm(h) + ". Donc " + X + Y + " = 2 × " + nb(h) + " = " + cm(L) + "."
      });
    }
    return qcm(R, {
      q: "M est le milieu du segment [" + X + Y + "]. " + X + Y + " = " + cm(L) + ". Combien mesure " + X + "M ?",
      bonne: h, fmt: cm, pas: 1, erreurs: [L * 2, L, L - 2, L / 4],
      expl: "Le milieu partage le segment en deux longueurs égales : " + X + "M = " + nb(L) + " ÷ 2 = " + cm(h) + "."
    });
  }

  function codage(R) {
    if (R() < 0.5) {
      return qcm(R, {
        q: "Sur une figure, deux segments portent le même petit trait de codage. Qu'est-ce que cela signifie ?",
        bonne: "Ils ont la même longueur", erreurs: ["Ils sont perpendiculaires", "Ils sont parallèles", "Ils sont alignés"],
        expl: "Deux segments codés avec les mêmes petits traits ont la même longueur : on peut les reporter au compas."
      });
    }
    return qcm(R, {
      q: "Sur une figure, un petit carré est dessiné au sommet d'un angle. Qu'est-ce que cela signifie ?",
      bonne: "C'est un angle droit", erreurs: ["C'est un angle de 45°", "Les deux côtés ont la même longueur", "Les deux côtés sont alignés"],
      expl: "Le petit carré est le codage de l'angle droit."
    });
  }

  function notationCorrecte(R) {
    var p = paire(R), X = p[0], Y = p[1];
    var vrai = ["[" + X + Y + "] est un segment", "(" + X + Y + ") est une droite", X + Y + " est une longueur", "[" + X + Y + ") est une demi-droite"];
    var faux = [X + Y + " est un segment", "[" + X + Y + "] est une longueur", "(" + X + Y + ") est un segment", "[" + X + Y + ") est une droite", X + Y + " est une droite", "(" + X + Y + ") est une longueur"];
    var bonne = parmi(R, vrai);
    return qcm(R, {
      q: "Quelle phrase est correcte ?",
      bonne: bonne, erreurs: A.melanger(R, faux).slice(0, 3),
      expl: "On écrit : [" + X + Y + "] est un segment ; (" + X + Y + ") est une droite ; [" + X + Y + ") est une demi-droite ; " + X + Y + " est une longueur (un nombre)."
    });
  }

  A.inscrire("6e-ch2", {
    types: [
      { id: "notation-objet",     seance: 1, gen: notationObjet },
      { id: "appartient",         seance: 1, gen: appartient },
      { id: "ecriture-longueur",  seance: 1, gen: ecritureLongueur },
      { id: "point-sur-segment",  seance: 2, gen: pointSurSegment },
      { id: "complement-segment", seance: 2, gen: complementSegment },
      { id: "distance-inegalite", seance: 2, gen: distanceInegalite },
      { id: "milieu",             seance: 3, gen: milieu },
      { id: "codage",             seance: 3, gen: codage },
      { id: "notation-correcte",  seance: 3, gen: notationCorrecte }
    ]
  });

  /* =====================  6e · Chapitre 3 — Les fractions  ===================== */

  /* Séance 1 — Partager en parts égales */

  function fractionPart(R) {
    var b = entier(R, 4, 12), a = entier(R, 2, b - 1);
    var forme = parmi(R, ["Une tablette de chocolat", "Une pizza", "Un rectangle", "Un gâteau"]);
    if (R() < 0.5) {
      return qcm(R, {
        q: forme + " est partagé" + (forme === "Une tablette de chocolat" || forme === "Une pizza" || forme === "Un gâteau" ? "e" : "") + " en " + b + " parts égales. On en prend " + a + ". Quelle fraction a-t-on prise ?",
        bonne: frac(a, b), erreurs: [frac(b, a), frac(b - a, b), frac(a, a + b), frac(a + 1, b)],
        expl: "Le dénominateur est le nombre de parts égales (" + b + "), le numérateur est le nombre de parts prises (" + a + ") : " + frac(a, b) + "."
      });
    }
    return qcm(R, {
      q: "Un rectangle est partagé en " + b + " parts égales. " + a + " parts sont coloriées. Quelle fraction du rectangle n'est PAS coloriée ?",
      bonne: frac(b - a, b), erreurs: [frac(a, b), frac(b, b - a), frac(b - a, a), frac(b - a, b + 1)],
      expl: "Il y a " + b + " parts en tout, dont " + a + " coloriées. Il en reste " + b + " − " + a + " = " + (b - a) + " non coloriées : " + frac(b - a, b) + "."
    });
  }

  function sensFraction(R) {
    var b = entier(R, 3, 9), a = entier(R, 1, b - 1);
    if (R() < 0.5) {
      return qcm(R, {
        q: "Dans la fraction " + frac(a, b) + ", que représente le nombre " + b + " ?",
        bonne: "Le nombre de parts égales de l'unité", erreurs: ["Le nombre de parts prises", "La taille d'une part", "La longueur de l'unité"],
        expl: "Le dénominateur " + b + " dit en combien de parts égales on partage l'unité."
      });
    }
    return qcm(R, {
      q: "Dans la fraction " + frac(a, b) + ", que représente le nombre " + a + " ?",
      bonne: "Le nombre de parts prises", erreurs: ["Le nombre de parts égales de l'unité", "La taille d'une part", "Le nombre d'unités"],
      expl: "Le numérateur " + a + " dit combien de parts on prend."
    });
  }

  function plusGrandQue1(R) {
    var b = entier(R, 3, 9), grande = frac(b + entier(R, 1, b), b), petites = [];
    while (petites.length < 3) {
      var bb = entier(R, 3, 10), f = frac(entier(R, 1, bb - 1), bb);
      if (petites.indexOf(f) < 0) petites.push(f);
    }
    return qcm(R, {
      q: "Laquelle de ces fractions est plus grande que 1 ?",
      bonne: grande, erreurs: petites,
      expl: "Une fraction est plus grande que 1 quand le numérateur est plus grand que le dénominateur : on prend plus d'une unité. Ici : " + grande + "."
    });
  }

  /* Séance 2 — Placer une fraction sur une demi-droite graduée */

  function graduationsPourPlacer(R) {
    var b = entier(R, 3, 10), a = entier(R, 2, b + 3);
    return qcm(R, {
      q: "L'unité est partagée en " + b + " parts égales (de 0 à 1). Combien de graduations faut-il compter depuis 0 pour placer " + frac(a, b) + " ?",
      bonne: a, fmt: nb, pas: 1, erreurs: [b, a + 1, a - 1, a + b],
      expl: "Chaque graduation vaut 1/" + b + ". Pour placer " + frac(a, b) + ", on compte " + a + " graduations depuis l'origine 0."
    });
  }

  function abscisse(R) {
    var b = entier(R, 3, 8), a = entier(R, 1, b - 1);
    if (R() < 0.5) {
      return qcm(R, {
        q: "Sur une demi-droite graduée d'origine 0, l'unité est partagée en " + b + " parts égales. Le point A est à " + a + " graduations de l'origine. Quelle est son abscisse ?",
        bonne: frac(a, b), erreurs: [frac(b, a), frac(a, a + b), frac(a + 1, b)],
        expl: "Chaque graduation vaut 1/" + b + ", et A est à " + a + " graduations : son abscisse est " + frac(a, b) + "."
      });
    }
    return qcm(R, {
      q: "Sur une demi-droite graduée, l'unité est partagée en " + b + " parts égales, et le premier trait est le nombre 1 (et non 0). Le point P est à " + a + " graduations de ce premier trait. Quelle est l'abscisse de P ?",
      bonne: frac(b + a, b), erreurs: [frac(a, b), frac(a + 1, b), frac(b + a, a)],
      expl: "On compte à partir de l'origine réelle, qui est 1 = " + frac(b, b) + ". P est " + a + " graduations plus loin : " + frac(b, b) + " + " + frac(a, b) + " = " + frac(b + a, b) + "."
    });
  }

  /* Séance 3 — Graduer un segment */

  function ecartGraduations(R) {
    var N = parmi(R, [2, 4, 5, 8, 10]), g = parmi(R, [0.5, 1, 1.5, 2, 2.5]), L = N * g;
    return qcm(R, {
      q: "On partage un segment de " + cm(L) + " en " + N + " parts égales. Quel est l'écart entre deux graduations voisines ?",
      bonne: g, fmt: cm, pas: 0.5, erreurs: [L * N, L - N, L + N, g * 2],
      expl: "On divise la longueur par le nombre de parts : " + nb(L) + " ÷ " + N + " = " + cm(g) + "."
    });
  }

  function nombreDeParts(R) {
    var N = parmi(R, [4, 5, 6, 8, 10]), g = parmi(R, [1, 1.5, 2, 2.5]), L = N * g;
    return qcm(R, {
      q: "Un segment de " + cm(L) + " est gradué tous les " + cm(g) + ". En combien de parts égales est-il partagé ?",
      bonne: N, fmt: nb, pas: 1, erreurs: [L * g, L - g, L + g, N + 1],
      expl: "Le nombre de parts est la longueur divisée par l'écart : " + nb(L) + " ÷ " + nb(g) + " = " + N + "."
    });
  }

  /* Séance 4 — Le milieu d'un segment et synthèse */

  function milieuGraduations(R) {
    var n = parmi(R, [8, 10, 12, 14, 16, 18, 20]);
    return qcm(R, {
      q: "Entre les points A et B d'une droite graduée, il y a " + n + " graduations. À combien de graduations de A se trouve le milieu de [AB] ?",
      bonne: n / 2, fmt: nb, pas: 1, erreurs: [n, n * 2, n / 2 - 1, n / 2 + 1],
      expl: "Le milieu partage le segment en deux parts égales : " + n + " ÷ 2 = " + (n / 2) + " graduations."
    });
  }

  function milieuAbscisse(R) {
    var a = entier(R, 0, 6), d = 2 * entier(R, 1, 4), b = a + d;
    return qcm(R, {
      q: "Sur une droite graduée, A a pour abscisse " + a + " et B a pour abscisse " + b + ". Quelle est l'abscisse du milieu de [AB] ?",
      bonne: a + d / 2, fmt: nb, pas: 1, min: 0, erreurs: [d / 2, a + b, b - a, b / 2],
      expl: "Il y a " + d + " unités entre A et B, donc le milieu est à " + (d / 2) + " de A : " + a + " + " + (d / 2) + " = " + (a + d / 2) + "."
    });
  }

  function fractionMilieu(R) {
    var p = paire(R), X = p[0], Y = p[1];
    return qcm(R, {
      q: "M est le milieu du segment [" + X + Y + "]. Quelle fraction du segment [" + X + Y + "] représente le segment [" + X + "M] ?",
      bonne: "1/2", erreurs: ["2/1", "1/4", "2/3"],
      expl: "Le milieu partage le segment en 2 parts égales : [" + X + "M] est 1 part sur 2, soit 1/2 de [" + X + Y + "]."
    });
  }

  A.inscrire("6e-ch3", {
    types: [
      { id: "fraction-part",      seance: 1, gen: fractionPart },
      { id: "sens-fraction",      seance: 1, gen: sensFraction },
      { id: "plus-grand-que-1",   seance: 1, gen: plusGrandQue1 },
      { id: "graduations-placer", seance: 2, gen: graduationsPourPlacer },
      { id: "abscisse",           seance: 2, gen: abscisse },
      { id: "ecart-graduations",  seance: 3, gen: ecartGraduations },
      { id: "nombre-de-parts",    seance: 3, gen: nombreDeParts },
      { id: "milieu-graduations", seance: 4, gen: milieuGraduations },
      { id: "milieu-abscisse",    seance: 4, gen: milieuAbscisse },
      { id: "fraction-milieu",    seance: 4, gen: fractionMilieu }
    ]
  });

  /* =====================  6e · Chapitre 4 — Fractions décimales et nombres décimaux  ===================== */

  /* Séance 1 — Les dixièmes */

  function dixiemes(R) {
    var n = entier(R, 11, 59), q = Math.floor(n / 10), r = n % 10;
    if (r === 0) r = entier(R, 1, 9), n = q * 10 + r;
    var k = entier(R, 0, 2);
    if (k === 0) {
      return qcm(R, {
        q: "Comment écrit-on " + n + " dixièmes avec une fraction ?",
        bonne: frac(n, 10), erreurs: [frac(10, n), frac(n, 100), frac(n, n + 10)],
        expl: "Un dixième est 1/10. " + n + " dixièmes s'écrivent " + frac(n, 10) + "."
      });
    }
    if (k === 1) {
      return qcm(R, {
        q: frac(n, 10) + " est égal à…",
        bonne: q + " + " + frac(r, 10), erreurs: [r + " + " + frac(q, 10), q + " + " + frac(r, 100), (q + r) + " + " + frac(1, 10), q + " + " + frac(r + 1, 10)],
        expl: "10 dixièmes font 1 unité. " + frac(n, 10) + " = " + q + " unité" + (q > 1 ? "s" : "") + " et " + r + " dixième" + (r > 1 ? "s" : "") + " = " + q + " + " + frac(r, 10) + "."
      });
    }
    return qcm(R, {
      q: q + " + " + frac(r, 10) + " est égal à…",
      bonne: frac(n, 10), erreurs: [frac(q + r, 10), frac(n, 100), frac(r * 10 + q, 10), frac(n + 10, 10)],
      expl: q + " unité" + (q > 1 ? "s" : "") + " = " + (q * 10) + " dixièmes, et on ajoute " + r + " dixième" + (r > 1 ? "s" : "") + " : " + (q * 10) + " + " + r + " = " + n + " dixièmes, soit " + frac(n, 10) + "."
    });
  }

  /* Séance 2 — Les centièmes et la virgule */

  function uniteDixiemeCentieme(R) {
    var u = entier(R, 1, 9), d = entier(R, 1, 9), c = entier(R, 1, 9), x = u + d / 10 + c / 100;
    return qcm(R, {
      q: "Quel nombre décimal correspond à " + u + " unité" + (u > 1 ? "s" : "") + ", " + d + " dixième" + (d > 1 ? "s" : "") + " et " + c + " centième" + (c > 1 ? "s" : "") + " ?",
      bonne: x, fmt: nb, pas: 0.01,
      erreurs: [u + c / 10 + d / 100, u * 10 + d + c / 10, u + d / 100 + c / 1000, Number(String(u) + String(d) + String(c))],
      expl: u + " + " + d + "/10 + " + c + "/100 = " + nb(x) + " : les unités avant la virgule, les dixièmes puis les centièmes après."
    });
  }

  function centiemesVersDecimal(R) {
    var u = entier(R, 1, 9), d = entier(R, 0, 9), c = entier(R, 1, 9), n = u * 100 + d * 10 + c, x = n / 100;
    return qcm(R, {
      q: frac(n, 100) + " s'écrit avec une virgule…",
      bonne: x, fmt: nb, pas: 0.01, erreurs: [n / 10, n / 1000, u + d / 100 + c / 1000, n],
      expl: frac(n, 100) + " = " + u + " + " + d + "/10 + " + c + "/100 = " + nb(x) + "."
    });
  }

  function dixiemesVersDecimal(R) {
    var n = entier(R, 1, 9), pos = R() < 0.5;
    if (pos) {
      return qcm(R, {
        q: frac(n, 10) + " s'écrit avec une virgule…",
        bonne: n / 10, fmt: nb, pas: 0.1, erreurs: [n / 100, n + 0.1, n * 10, 1 + n / 10],
        expl: frac(n, 10) + " = " + n + " dixième" + (n > 1 ? "s" : "") + " = " + nb(n / 10) + ". Le chiffre des dixièmes est le premier chiffre après la virgule."
      });
    }
    var m = n * 10;
    return qcm(R, {
      q: frac(m, 100) + " est égal à combien de dixièmes ?",
      bonne: n, fmt: nb, pas: 1, erreurs: [m, n * 100, n + 1, m / 100],
      expl: "10 centièmes font 1 dixième. " + frac(m, 100) + " = " + frac(n, 10) + " : " + n + " dixième" + (n > 1 ? "s" : "") + "."
    });
  }

  /* Séance 3 — Les différentes écritures d'un nombre décimal */

  function decimalVersFraction(R) {
    var u = entier(R, 1, 9), d = entier(R, 0, 9), c = entier(R, 1, 9), n = u * 100 + d * 10 + c, x = n / 100;
    return qcm(R, {
      q: "Quelle fraction décimale est égale à " + nb(x) + " ?",
      bonne: frac(n, 100), erreurs: [frac(n, 10), frac(n, 1000), frac(u, d * 10 + c), frac(100, n)],
      expl: nb(x) + " a deux chiffres après la virgule : c'est un nombre de centièmes. " + nb(x) + " = " + frac(n, 100) + "."
    });
  }

  function decimalVersSomme(R) {
    var u = entier(R, 1, 9), d = entier(R, 1, 9), c;
    do { c = entier(R, 1, 9); } while (c === d);      // si d = c, « d/100 + c/10 » vaudrait la même chose
    var x = u + d / 10 + c / 100;
    return qcm(R, {
      q: nb(x) + " est égal à…",
      bonne: u + " + " + frac(d, 10) + " + " + frac(c, 100),
      erreurs: [u + " + " + frac(d, 100) + " + " + frac(c, 10), u + " + " + frac(d * 10 + c, 10), u + " + " + frac(d, 10) + " + " + frac(c, 1000)],
      expl: "Le chiffre " + d + " est au rang des dixièmes, le chiffre " + c + " au rang des centièmes : " + nb(x) + " = " + u + " + " + frac(d, 10) + " + " + frac(c, 100) + "."
    });
  }

  function zerosEquivalents(R) {
    var u = entier(R, 0, 9), d = entier(R, 1, 9);
    var x = nb(u + d / 10);
    return qcm(R, {
      q: "Quelle écriture représente le même nombre que " + x + " ?",
      bonne: x + "0", erreurs: [u + ",0" + d, (u * 10 + d) + ",0", u + "," + d + d],
      expl: "On peut ajouter des zéros à droite de la partie décimale sans changer le nombre : " + x + " = " + x + "0."
    });
  }

  /* Séance 4 — Les pourcentages */

  function pctFraction(R) {
    var p = parmi(R, [5, 10, 20, 25, 40, 50, 60, 75]);
    return qcm(R, {
      q: "Quelle fraction est égale à " + p + " % ?",
      bonne: frac(p, 100), erreurs: [frac(100, p), frac(p, 10), frac(p, 1000)],
      expl: p + " % veut dire « " + p + " sur 100 » : " + p + " % = " + frac(p, 100) + "."
    });
  }

  function pctDecimal(R) {
    var p = parmi(R, [5, 8, 20, 25, 40, 75]), x = p / 100;
    return qcm(R, {
      q: "Quel nombre décimal est égal à " + p + " % ?",
      bonne: x, fmt: nb, pas: 0.01, erreurs: [p / 10, p / 1000, p, p / 100 + 1],
      expl: p + " % = " + frac(p, 100) + " = " + nb(x) + "."
    });
  }

  function pctComparaison(R) {
    var p = parmi(R, [20, 50, 75, 100, 150, 200, 250, 30]);
    var bonne = p < 100 ? "Plus petit que l'unité" : p === 100 ? "Égal à l'unité" : "Plus grand que l'unité";
    return qcm(R, {
      q: "Un nombre vaut " + p + " % de l'unité. Par rapport à l'unité entière, il est…",
      n: 3, bonne: bonne, erreurs: ["Plus petit que l'unité", "Égal à l'unité", "Plus grand que l'unité"].filter(function (x) { return x !== bonne; }),
      expl: "100 % correspond à l'unité entière. " + p + " % est " + (p < 100 ? "inférieur à 100 % : on n'a pas toute l'unité." : p === 100 ? "égal à 100 % : c'est exactement l'unité." : "supérieur à 100 % : on dépasse l'unité.")
    });
  }

  /* Séance 5 — Lire et placer un nombre décimal sur une droite graduée */

  function loupe(R) {
    var a = entier(R, 1, 8), b = entier(R, 0, 8), k = entier(R, 1, 9), x = a + b / 10 + k / 100;
    return qcm(R, {
      q: "Dans la loupe entre " + nb(a + b / 10) + " et " + nb(a + (b + 1) / 10) + ", un point est à la " + k + (k === 1 ? "re" : "e") + " graduation après " + nb(a + b / 10) + ". Chaque graduation vaut 0,01. Quel nombre repère ce point ?",
      bonne: x, fmt: nb, pas: 0.01,
      erreurs: [a + k / 10 + b / 100, a + b / 10 + k / 1000, a + (b + 1) / 10 + k / 100, a + k / 100],
      expl: "On part de " + nb(a + b / 10) + " et on ajoute " + k + " centième" + (k > 1 ? "s" : "") + " : " + nb(a + b / 10) + " + " + nb(k / 100) + " = " + nb(x) + "."
    });
  }

  function graduationDixiemes(R) {
    var a = entier(R, 1, 8), b = entier(R, 0, 8), k = entier(R, 2, 5), depart = a + b / 10, x = depart + k / 10;
    return qcm(R, {
      q: "Sur une droite graduée de dixième en dixième, un point est repéré par " + nb(depart) + ". Quel nombre repère le point situé " + k + " graduations plus loin ?",
      bonne: x, fmt: nb, pas: 0.1, erreurs: [depart + k / 100, depart + k, a + b / 10 * 0 + k / 10, depart - k / 10],
      expl: "Chaque graduation vaut 0,1. " + k + " graduations de plus : " + nb(depart) + " + " + k + " × 0,1 = " + nb(x) + "."
    });
  }

  /* Séance 6 — Calculer avec des décimaux : prix et durées */

  function additionDecimaux(R) {
    var xi = entier(R, 5, 30), xd = entier(R, 1, 9), yi = entier(R, 1, 9), yd = entier(R, 11, 99);
    if (yd % 10 === 0) yd += 3;
    var x = xi + xd / 10, y = yi + yd / 100, s = Math.round((x + y) * 100) / 100;
    return qcm(R, {
      q: "Calcule " + nb(x) + " + " + nb(y) + ".",
      bonne: s, fmt: nb, pas: 0.01,
      erreurs: [xi + yi + (xd + yd) / 100, Math.round((x + y + 1) * 100) / 100, Math.round((x + y - 0.9) * 100) / 100, Math.round((x + y) * 10) / 100],
      expl: "On pose l'addition en mettant la virgule sous la virgule et on complète avec un zéro : " + nb(x) + "0 + " + nb(y) + " = " + nb(s) + "."
    });
  }

  function monnaie(R) {
    var b = parmi(R, [10, 20, 50]), pc;
    do { pc = entier(R, 150, b * 100 - 150); } while (pc % 10 === 0);   // prix en centimes, dernier chiffre non nul
    var p = pc / 100, r = (b * 100 - pc) / 100;
    return qcm(R, {
      q: "Tu paies un achat de " + euro(p) + " avec un billet de " + euro(b) + ". Quelle monnaie doit-on te rendre ?",
      bonne: r, fmt: euro, pas: 0.5,
      erreurs: [r + 1, r + 0.1, b + p, r - 1],
      expl: "Monnaie = somme donnée − total à payer = " + euro(b) + " − " + euro(p) + " = " + euro(r) + "."
    });
  }

  function dureeConversion(R) {
    var h = entier(R, 1, 5), m = parmi(R, [5, 10, 15, 20, 30, 40, 45, 50]), N = 60 * h + m;
    if (R() < 0.5) {
      return qcm(R, {
        q: "Convertis " + h + " h " + m + " min en minutes.",
        bonne: N, fmt: minutes, pas: 5, erreurs: [100 * h + m, h * m, h + m, N + 60],
        expl: "1 h = 60 min, donc " + h + " h = " + (60 * h) + " min. Puis " + (60 * h) + " + " + m + " = " + minutes(N) + "."
      });
    }
    var faux1 = N >= 100 ? Math.floor(N / 100) + " h " + (N % 100) + " min" : h + " h " + (m + 30) + " min";
    return qcm(R, {
      q: "Convertis " + minutes(N) + " en heures et minutes.",
      bonne: h + " h " + m + " min",
      erreurs: [faux1, (h + 1) + " h " + m + " min", h + " h " + (m + 10) + " min", (h - 1) + " h " + m + " min"],
      expl: nb(N) + " ÷ 60 : " + h + " fois 60 minutes (" + (60 * h) + " min) et il reste " + m + " min. Donc " + minutes(N) + " = " + h + " h " + m + " min."
    });
  }

  function horaireArrivee(R) {
    var H, M, h, m;
    do { H = entier(R, 7, 18); M = parmi(R, [15, 25, 35, 40, 45, 50]); h = entier(R, 1, 3); m = parmi(R, [20, 25, 30, 40, 45, 50]); } while (M + m < 60);
    var total = H * 60 + M + h * 60 + m;
    return qcm(R, {
      q: "Un train part à " + H + " h " + M + " et roule pendant " + h + " h " + m + " min. À quelle heure arrive-t-il ?",
      bonne: heure(total),
      erreurs: [(H + h) + " h " + (M + m), heure(total + 10), heure(total - 10), heure(total + 60)],
      expl: "On additionne les heures puis les minutes : " + (H + h) + " h et " + (M + m) + " min. Comme 60 min = 1 h, " + (M + m) + " min = 1 h " + (M + m - 60) + " min. Arrivée : " + heure(total) + "."
    });
  }

  A.inscrire("6e-ch4", {
    types: [
      { id: "dixiemes",            seance: 1, gen: dixiemes },
      { id: "unite-dixieme-cent",  seance: 2, gen: uniteDixiemeCentieme },
      { id: "centiemes-decimal",   seance: 2, gen: centiemesVersDecimal },
      { id: "dixiemes-decimal",    seance: 2, gen: dixiemesVersDecimal },
      { id: "decimal-fraction",    seance: 3, gen: decimalVersFraction },
      { id: "decimal-somme",       seance: 3, gen: decimalVersSomme },
      { id: "zeros-equivalents",   seance: 3, gen: zerosEquivalents },
      { id: "pct-fraction",        seance: 4, gen: pctFraction },
      { id: "pct-decimal",         seance: 4, gen: pctDecimal },
      { id: "pct-comparaison",     seance: 4, gen: pctComparaison },
      { id: "loupe",               seance: 5, gen: loupe },
      { id: "graduation-dixiemes", seance: 5, gen: graduationDixiemes },
      { id: "addition-decimaux",   seance: 6, gen: additionDecimaux },
      { id: "monnaie",             seance: 6, gen: monnaie },
      { id: "duree-conversion",    seance: 6, gen: dureeConversion },
      { id: "horaire-arrivee",     seance: 6, gen: horaireArrivee }
    ]
  });

})(typeof window !== "undefined" ? window.ASC : global.ASC);
