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
})(typeof window !== "undefined" ? window.ASC : global.ASC);
