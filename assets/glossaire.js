/* =========================================================
   GLOSSAIRE — mots-clés des séances.

   Dans une page de séance, un mot-clé s'écrit :
        <span class="gl" data-t="rayon">rayon</span>
   (le texte affiché est libre : « rayons », « Rayon »…). Au survol (ordinateur) ou au toucher
   (téléphone, tablette), une petite carte affiche la définition courte, avec un lien « En savoir plus »
   vers la page du glossaire (pages/glossaire/).

   Pour ajouter un mot : ajoute une entrée dans TERMES ci-dessous (court = la carte, long = la page glossaire),
   puis balise-le dans les séances. La page glossaire se remplit toute seule.
   Pour qu'une page de séance l'utilise : <script src="../../assets/glossaire.js"></script> en bas de page.
   ========================================================= */
(function () {
  var TERMES = [
    /* ---------- 6e · Numération entière et décimale ---------- */
    { id: "chiffre", nom: "chiffre", chap: "6e · Numération", court: "Un des 10 symboles pour écrire les nombres : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.",
      long: ["Un nombre s'écrit avec un ou plusieurs chiffres. 4 725 est un nombre à 4 chiffres : 4, 7, 2 et 5.", "Ne pas confondre : un chiffre est une « lettre » des nombres, un nombre est un « mot »."] },
    { id: "rang", nom: "rang d'un chiffre", chap: "6e · Numération", court: "La place d'un chiffre dans l'écriture d'un nombre : unités, dizaines, centaines, dixièmes…",
      long: ["Dans 4 725,306, le chiffre 7 est au rang des centaines et le 3 au rang des dixièmes.", "Le même chiffre ne vaut pas pareil selon son rang : le 7 de 70 vaut 10 fois plus que le 7 de 7."] },
    { id: "partie-entiere", nom: "partie entière", chap: "6e · Numération", court: "La partie d'un nombre décimal qui est à gauche de la virgule.",
      long: ["Dans 12,57, la partie entière est 12."] },
    { id: "partie-decimale", nom: "partie décimale", chap: "6e · Numération", court: "La partie d'un nombre décimal qui est à droite de la virgule.",
      long: ["Dans 12,57, la partie décimale est 57 (cinquante-sept centièmes)."] },
    { id: "zero-inutile", nom: "zéro inutile", chap: "6e · Numération", court: "Un zéro qu'on peut enlever sans changer la valeur du nombre : 3,50 = 3,5 et 03,5 = 3,5.",
      long: ["Un zéro est inutile à la fin de la partie décimale ou au début de la partie entière.", "Attention : 3,05 n'est pas égal à 3,5. Ici le zéro est utile : il garde la place des dixièmes."] },
    { id: "million", nom: "million", chap: "6e · Numération", court: "Un million, c'est 1 000 000 : mille milliers.",
      long: ["1 000 000 s'écrit avec 6 zéros."] },
    { id: "milliard", nom: "milliard", chap: "6e · Numération", court: "Un milliard, c'est 1 000 000 000 : mille millions.",
      long: ["1 000 000 000 s'écrit avec 9 zéros."] },

    /* ---------- 6e · Points, droites et distances ---------- */
    { id: "droite", nom: "droite", chap: "6e · Points, droites, distances", court: "Ligne droite qui n'a ni début ni fin. On ne peut tracer qu'une partie de ce qui est une droite.",
      long: ["Par deux points différents, il passe une seule droite."] },
    { id: "demi-droite", nom: "demi-droite", chap: "6e · Points, droites, distances", court: "Partie d'une droite qui commence en un point (son origine) et continue sans fin d'un seul côté.",
      long: ["Un point d'une droite la coupe en deux demi-droites."] },
    { id: "segment", nom: "segment", chap: "6e · Points, droites, distances", court: "Partie d'une droite limitée par deux points, ses extrémités. On peut mesurer sa longueur.",
      long: ["Le segment [AB] a pour extrémités A et B. Sa longueur se note AB."] },
    { id: "alignes", nom: "points alignés", chap: "6e · Points, droites, distances", court: "Des points sont alignés s'ils sont sur une même droite.",
      long: ["Pour vérifier avec la règle : on trace une droite qui passe par deux des points, et on regarde si les autres sont dessus."] },
    { id: "distance", nom: "distance", chap: "6e · Points, droites, distances", court: "La distance entre deux points, c'est la longueur du segment qui les relie.",
      long: ["Elle se mesure avec une règle graduée. C'est le chemin le plus court entre les deux points."] },
    { id: "milieu", nom: "milieu d'un segment", chap: "6e · Points, droites, distances", court: "Le point du segment situé à égale distance de ses deux extrémités.",
      long: ["Si M est le milieu de [AB], alors AM = MB, et M est sur le segment [AB]."] },

    /* ---------- 6e · Cercle et disque ---------- */
    { id: "cercle", nom: "cercle", chap: "6e · Cercle et disque", court: "Ensemble des points situés à la même distance du centre. C'est la ligne, pas l'intérieur.",
      long: ["Tous les points du cercle sont à la même distance du centre. Cette distance, c'est le rayon.", "Pour le tracer au compas : on pique la pointe en O et on règle l'écartement sur le rayon."], schema: "cercle" },
    { id: "centre", nom: "centre", chap: "6e · Cercle et disque", court: "Le point à égale distance de tous les points du cercle.",
      long: ["Le centre n'est pas sur le cercle : il est à l'intérieur. On le nomme souvent O."], schema: "centre" },
    { id: "rayon", nom: "rayon", chap: "6e · Cercle et disque", court: "Segment qui relie le centre à un point du cercle. Tous les rayons d'un cercle ont la même longueur.",
      long: ["Un cercle a une infinité de rayons, tous de même longueur.", "Le mot « rayon » désigne aussi cette longueur : un cercle de rayon 3 cm."], schema: "rayon" },
    { id: "diametre", nom: "diamètre", chap: "6e · Cercle et disque", court: "Segment qui passe par le centre et relie deux points du cercle. Il mesure deux fois le rayon.",
      long: ["Le diamètre est la plus longue corde du cercle.", "Diamètre = 2 × rayon. Et rayon = diamètre ÷ 2."], schema: "diametre" },
    { id: "corde", nom: "corde", chap: "6e · Cercle et disque", court: "Segment qui relie deux points du cercle.",
      long: ["Une corde ne passe pas forcément par le centre.", "Quand elle passe par le centre, c'est un diamètre."], schema: "corde" },
    { id: "arc", nom: "arc de cercle", chap: "6e · Cercle et disque", court: "Portion de cercle comprise entre deux points du cercle.",
      long: ["Deux points d'un cercle délimitent toujours deux arcs."], schema: "arc" },
    { id: "demi-cercle", nom: "demi-cercle", chap: "6e · Cercle et disque", court: "Arc égal à la moitié du cercle. Ses extrémités sont celles d'un diamètre.",
      long: ["Un diamètre coupe le cercle en deux demi-cercles de même longueur."], schema: "demi" },
    { id: "disque", nom: "disque", chap: "6e · Cercle et disque", court: "Surface à l'intérieur du cercle, cercle compris.",
      long: ["Ne pas confondre : le cercle est une ligne, le disque est une surface."], schema: "disque" },
    { id: "perimetre", nom: "périmètre", chap: "6e · Cercle et disque", court: "Longueur du tour d'une figure.",
      long: ["Pour un cercle, le périmètre est un peu plus de 3 fois son diamètre : P ≈ 3,14 × d."], schema: "cercle" },
    { id: "pi", nom: "π (pi)", chap: "6e · Cercle et disque", court: "Nombre un peu plus grand que 3 : le tour d'un cercle divisé par son diamètre. On prend 3,14.",
      long: ["Quel que soit le cercle, périmètre ÷ diamètre donne toujours π.", "3,14 est une valeur approchée de π (le nombre a une infinité de décimales)."], schema: "cercle" },

    /* ---------- 6e · Décimaux ---------- */
    { id: "nombre-decimal", nom: "nombre décimal", chap: "6e · Fractions décimales et décimaux", court: "Nombre qui s'écrit avec une partie entière, une virgule et quelques chiffres après la virgule.",
      long: ["Ex : 3,5 ; 0,07 ; 12,125. On peut aussi l'écrire comme une fraction sur 10, 100, 1 000…"] },

    /* ---------- 4e · Pourcentages ---------- */
    { id: "proportionnalite", nom: "proportionnalité", chap: "4e · Pourcentages", court: "Deux grandeurs sont proportionnelles quand on passe des valeurs de l'une à celles de l'autre en multipliant toujours par le même nombre.",
      long: ["Ex : 3 baguettes coûtent 4,50 €, donc 6 baguettes coûtent 9 € : si on double l'une, on double l'autre.", "On range souvent les valeurs dans un tableau de proportionnalité."] },
    { id: "coefficient", nom: "coefficient de proportionnalité", chap: "4e · Pourcentages", court: "Le nombre par lequel on multiplie une grandeur pour obtenir l'autre, dans un tableau de proportionnalité.",
      long: ["Ex : si 4 kg coûtent 10 €, le coefficient est 10 ÷ 4 = 2,5 (€ par kg)."] },
    { id: "produit-en-croix", nom: "produit en croix", chap: "4e · Pourcentages", court: "Méthode pour trouver la quatrième valeur d'un tableau de proportionnalité : on multiplie les deux nombres en diagonale, puis on divise par le troisième.",
      long: ["Ex : 4 kg → 10 € et 6 kg → ? € . On calcule 6 × 10 ÷ 4 = 15 €."] },
    { id: "linearite", nom: "linéarité", chap: "4e · Pourcentages", court: "Si on multiplie ou on additionne des valeurs d'une grandeur, les valeurs de l'autre sont multipliées ou additionnées de la même façon.",
      long: ["Ex : le prix de 5 objets + le prix de 3 objets = le prix de 8 objets."] },
    { id: "pourcentage", nom: "pourcentage", chap: "4e · Pourcentages", court: "Une fraction de dénominateur 100. t % de A, c'est t ÷ 100 × A.",
      long: ["Ex : 25 % de 80 = 25 ÷ 100 × 80 = 20.", "« 25 % » veut dire « 25 pour 100 »."] },
    { id: "pourcentage-reciproque", nom: "pourcentage réciproque", chap: "4e · Pourcentages", court: "Le pourcentage à appliquer après une augmentation ou une baisse pour retrouver la valeur de départ.",
      long: ["Ce n'est pas le même pourcentage dans l'autre sens : après +50 %, il faut une baisse d'environ 33 % pour revenir au départ, pas de 50 %."] },

    /* ---------- 4e · Grandeurs quotients et produits ---------- */
    { id: "grandeur-composee", nom: "grandeur composée", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en combinant deux autres grandeurs, par un quotient ou par un produit.",
      long: ["Quotient : vitesse = distance ÷ durée.", "Produit : énergie = puissance × durée."] },
    { id: "grandeur-quotient", nom: "grandeur quotient", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en divisant deux grandeurs. Ex : la vitesse (distance ÷ durée) en km/h.",
      long: ["Son unité s'écrit avec une barre : km/h, L/min, g/cm³."] },
    { id: "grandeur-produit", nom: "grandeur produit", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en multipliant deux grandeurs. Ex : l'énergie en kWh (puissance en kW × durée en h).",
      long: ["L'aire d'un rectangle est aussi un produit : longueur × largeur, en m²."] },
    { id: "vitesse", nom: "vitesse", chap: "4e · Grandeurs quotients et produits", court: "Distance parcourue par unité de temps : v = d ÷ t. Ex : 90 km en 1 h, c'est 90 km/h.",
      long: ["La vitesse moyenne, c'est la vitesse constante qui donnerait la même durée de trajet.", "À retenir aussi : d = v × t et t = d ÷ v."] },
    { id: "debit", nom: "débit", chap: "4e · Grandeurs quotients et produits", court: "Quantité de liquide qui s'écoule par unité de temps : volume ÷ durée. Ex : 30 L/min.",
      long: ["Un robinet qui débite 30 L/min remplit 60 L en 2 minutes."] },
    { id: "masse-volumique", nom: "masse volumique", chap: "4e · Grandeurs quotients et produits", court: "Masse d'une unité de volume d'une matière : masse ÷ volume. Ex : 1 g/cm³ pour l'eau.",
      long: ["Plus la masse volumique est grande, plus 1 cm³ de la matière est lourd."] },
    { id: "densite", nom: "densité", chap: "4e · Grandeurs quotients et produits", court: "Dans ce chapitre, c'est la masse d'une unité de volume : masse ÷ volume (comme la masse volumique). Plus elle est grande, plus la matière est « serrée ».",
      long: ["Une matière moins dense que l'eau flotte dessus ; une matière plus dense coule."] },
    { id: "allure", nom: "allure", chap: "4e · Grandeurs quotients et produits", court: "Durée mise pour parcourir 1 km (en min/km). Plus l'allure est petite, plus on va vite.",
      long: ["Ex : une allure de 5 min/km correspond à une vitesse de 12 km/h."] },
    { id: "kwh", nom: "kilowattheure (kWh)", chap: "4e · Grandeurs quotients et produits", court: "Unité d'énergie : celle consommée par un appareil de 1 kW qui fonctionne pendant 1 heure.",
      long: ["Ex : un appareil de 2 kW allumé 3 h consomme 6 kWh."] },

    /* ---------- 4e · Divisibilité et nombres premiers ---------- */
    { id: "multiple", nom: "multiple", chap: "4e · Divisibilité et nombres premiers", court: "Un multiple de 6 est un nombre de la table de 6 : 6, 12, 18… Ex : 18 = 6 × 3.",
      long: ["Un nombre a une infinité de multiples."] },
    { id: "diviseur", nom: "diviseur", chap: "4e · Divisibilité et nombres premiers", court: "a est un diviseur de b si la division de b par a tombe juste (reste 0). Ex : 4 est un diviseur de 12.",
      long: ["Les diviseurs de 12 : 1, 2, 3, 4, 6 et 12."] },
    { id: "divisible", nom: "divisible", chap: "4e · Divisibilité et nombres premiers", court: "12 est divisible par 4 si 12 ÷ 4 tombe juste. Cela veut dire que 4 est un diviseur de 12.",
      long: ["« 12 est divisible par 4 », « 4 est un diviseur de 12 » et « 12 est un multiple de 4 » disent la même chose."] },
    { id: "nombre-premier", nom: "nombre premier", chap: "4e · Divisibilité et nombres premiers", court: "Nombre entier qui a exactement deux diviseurs : 1 et lui-même. Ex : 2, 3, 5, 7, 11, 13.",
      long: ["1 n'est pas premier (il n'a qu'un seul diviseur). 2 est le seul nombre premier pair."] },
    { id: "crible", nom: "crible d'Ératosthène", chap: "4e · Divisibilité et nombres premiers", court: "Méthode pour trouver les nombres premiers : on barre les multiples de 2, de 3, de 5…, et ce qui reste est premier.",
      long: ["Elle porte le nom d'un savant grec qui vivait il y a plus de 2 000 ans."] },
    { id: "facteur-premier", nom: "facteur premier", chap: "4e · Divisibilité et nombres premiers", court: "Nombre premier qui apparaît dans la décomposition d'un nombre. Ex : 12 = 2 × 2 × 3, ses facteurs premiers sont 2 et 3.",
      long: ["Un facteur est un nombre que l'on multiplie."] },
    { id: "decomposition", nom: "décomposition en facteurs premiers", chap: "4e · Divisibilité et nombres premiers", court: "Écrire un nombre comme un produit de nombres premiers. Ex : 60 = 2² × 3 × 5.",
      long: ["Cette écriture est unique, à l'ordre des facteurs près."] },
    { id: "carre-parfait", nom: "carré parfait", chap: "4e · Divisibilité et nombres premiers", court: "Nombre entier qui est le carré d'un autre nombre entier. Ex : 36 = 6², 100 = 10², 225 = 15².",
      long: ["Dans sa décomposition en facteurs premiers, chaque nombre premier apparaît un nombre pair de fois."] },
    { id: "simplifier", nom: "simplifier une fraction", chap: "4e · Divisibilité et nombres premiers", court: "Diviser le numérateur et le dénominateur par un même nombre pour obtenir une fraction égale, plus simple.",
      long: ["Ex : 12/18 = 6/9 = 2/3 (on a divisé par 2, puis par 3)."] },
    { id: "irreductible", nom: "fraction irréductible", chap: "4e · Divisibilité et nombres premiers", court: "Fraction qu'on ne peut plus simplifier : numérateur et dénominateur n'ont aucun diviseur commun autre que 1. Ex : 15/28.",
      long: ["Pour l'obtenir, on simplifie tant qu'on peut."] },

    /* ---------- 4e · Théorème de Pythagore ---------- */
    { id: "angle-droit", nom: "angle droit", chap: "4e · Théorème de Pythagore", court: "Angle de 90°, comme le coin d'une feuille. On le code avec un petit carré sur la figure.",
      long: ["On le vérifie avec une équerre."] },
    { id: "triangle-rectangle", nom: "triangle rectangle", chap: "4e · Théorème de Pythagore", court: "Triangle qui a un angle droit.",
      long: ["Ex : ABC est rectangle en A signifie que l'angle en A est droit."] },
    { id: "hypotenuse", nom: "hypoténuse", chap: "4e · Théorème de Pythagore", court: "Dans un triangle rectangle, le côté opposé à l'angle droit. C'est toujours le plus long côté.",
      long: ["Si ABC est rectangle en A, l'hypoténuse est [BC]."] },
    { id: "pythagore", nom: "théorème de Pythagore", chap: "4e · Théorème de Pythagore", court: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
      long: ["Si ABC est rectangle en A : BC² = AB² + AC².", "Il permet de calculer un côté quand on connaît les deux autres."] },
    { id: "racine-carree", nom: "racine carrée", chap: "4e · Théorème de Pythagore", court: "La racine carrée de a, notée √a, est le nombre positif dont le carré est a. Ex : √25 = 5 car 5² = 25.",
      long: ["Ex : √49 = 7 et √2 ≈ 1,41."] },
    { id: "valeur-exacte", nom: "valeur exacte", chap: "4e · Théorème de Pythagore", court: "Écriture d'un nombre sans arrondi. Ex : √2 est la valeur exacte ; 1,41 est une valeur approchée.",
      long: ["On donne la valeur exacte quand on garde √ dans le résultat."] },
    { id: "valeur-approchee", nom: "valeur approchée", chap: "4e · Théorème de Pythagore", court: "Nombre proche de la valeur exacte, obtenu en arrondissant. Ex : √2 ≈ 1,41.",
      long: ["Au centième, √2 ≈ 1,41 ; au millième, √2 ≈ 1,414."] }
  ];
  window.GLOSSAIRE = { termes: TERMES };

  function trouver(id) {
    for (var i = 0; i < TERMES.length; i++) if (TERMES[i].id === id) return TERMES[i];
    return null;
  }

  /* adresse de la page glossaire, déduite de l'adresse de ce script */
  var base = "";
  try {
    var cs = document.currentScript;
    if (cs && cs.src) base = cs.src.replace(/assets\/glossaire\.js(\?.*)?$/, "pages/glossaire/index.html");
  } catch (e) {}

  var gls = document.querySelectorAll(".gl[data-t]");
  if (!gls.length) return;

  var css =
    ".gl{font-weight:600;color:var(--amber-ink,#9c1c2a);cursor:pointer;border-radius:3px}" +
    ".gl.gl-on{background:var(--fill-2,#fff4b8)}" +
    ".gl-carte{position:absolute;z-index:2147482000;width:min(290px,calc(100vw - 24px));box-sizing:border-box;" +
    "background:#fff;color:var(--ink,#1b2a5e);border:2px solid var(--ink,#1b2a5e);border-radius:8px;" +
    "padding:10px 12px;font:400 15px/1.45 var(--f-text,system-ui,-apple-system,'Segoe UI',sans-serif);text-align:left}" +
    ".gl-carte b{display:block;font-weight:600;margin-bottom:2px}" +
    ".gl-carte a{display:inline-block;margin-top:8px;font:600 14px var(--f-text,system-ui,sans-serif);" +
    "color:#fff;background:var(--ink,#1b2a5e);border-radius:6px;padding:7px 12px;text-decoration:none;min-height:34px;box-sizing:border-box}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var carte = document.createElement("div");
  carte.className = "gl-carte";
  carte.setAttribute("role", "dialog");
  carte.hidden = true;
  document.body.appendChild(carte);
  var actif = null;
  var minuteur = null;
  var survol = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  function fermer() {
    carte.hidden = true;
    if (actif) actif.classList.remove("gl-on");
    actif = null;
  }

  function ouvrir(el) {
    var t = trouver(el.getAttribute("data-t"));
    if (!t) return;
    if (actif) actif.classList.remove("gl-on");
    actif = el;
    el.classList.add("gl-on");
    carte.innerHTML = "";
    var b = document.createElement("b");
    b.textContent = t.nom;
    var p = document.createElement("span");
    p.textContent = t.court;
    carte.appendChild(b);
    carte.appendChild(p);
    if (base) {
      carte.appendChild(document.createElement("br"));
      var a = document.createElement("a");
      a.href = base + "#" + t.id;
      a.textContent = "En savoir plus";
      carte.appendChild(a);
    }
    carte.hidden = false;
    var r = el.getBoundingClientRect();
    var sx = window.pageXOffset, sy = window.pageYOffset;
    var w = carte.offsetWidth, h = carte.offsetHeight;
    var gauche = r.left + sx;
    var maxG = sx + document.documentElement.clientWidth - w - 12;
    if (gauche > maxG) gauche = maxG;
    if (gauche < sx + 12) gauche = sx + 12;
    var haut = r.bottom + sy + 6;
    if (r.bottom + h + 12 > window.innerHeight && r.top - h - 6 > 0) haut = r.top + sy - h - 6;
    carte.style.left = gauche + "px";
    carte.style.top = haut + "px";
  }

  Array.prototype.forEach.call(gls, function (el) {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.addEventListener("click", function (e) {
      e.stopPropagation();
      if (!survol && actif === el && !carte.hidden) fermer(); else ouvrir(el);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrir(el); }
    });
    if (survol) {
      el.addEventListener("mouseenter", function () { clearTimeout(minuteur); ouvrir(el); });
      el.addEventListener("mouseleave", function () { minuteur = setTimeout(fermer, 300); });
    }
  });

  carte.addEventListener("click", function (e) { e.stopPropagation(); });
  carte.addEventListener("mouseenter", function () { clearTimeout(minuteur); });
  carte.addEventListener("mouseleave", function () { if (survol) minuteur = setTimeout(fermer, 300); });
  document.addEventListener("click", fermer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fermer(); });
})();
