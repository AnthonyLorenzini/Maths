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
    { id: "cercle", nom: "cercle", niveau: "6e",
      court: "Ensemble des points situés à la même distance du centre. C'est la ligne, pas l'intérieur.",
      long: ["Tous les points du cercle sont à la même distance du centre. Cette distance, c'est le rayon.",
             "Pour le tracer au compas : on pique la pointe en O et on règle l'écartement sur le rayon."],
      schema: "cercle" },
    { id: "centre", nom: "centre", niveau: "6e",
      court: "Le point à égale distance de tous les points du cercle.",
      long: ["Le centre n'est pas sur le cercle : il est à l'intérieur. On le nomme souvent O."],
      schema: "centre" },
    { id: "rayon", nom: "rayon", niveau: "6e",
      court: "Segment qui relie le centre à un point du cercle. Tous les rayons d'un cercle ont la même longueur.",
      long: ["Un cercle a une infinité de rayons, tous de même longueur.",
             "Le mot « rayon » désigne aussi cette longueur : un cercle de rayon 3 cm."],
      schema: "rayon" },
    { id: "diametre", nom: "diamètre", niveau: "6e",
      court: "Segment qui passe par le centre et relie deux points du cercle. Il mesure deux fois le rayon.",
      long: ["Le diamètre est la plus longue corde du cercle.",
             "Diamètre = 2 × rayon. Et rayon = diamètre ÷ 2."],
      schema: "diametre" },
    { id: "corde", nom: "corde", niveau: "6e",
      court: "Segment qui relie deux points du cercle.",
      long: ["Une corde ne passe pas forcément par le centre.",
             "Quand elle passe par le centre, c'est un diamètre."],
      schema: "corde" },
    { id: "arc", nom: "arc de cercle", niveau: "6e",
      court: "Portion de cercle comprise entre deux points du cercle.",
      long: ["Deux points d'un cercle délimitent toujours deux arcs."],
      schema: "arc" },
    { id: "demi-cercle", nom: "demi-cercle", niveau: "6e",
      court: "Arc égal à la moitié du cercle. Ses extrémités sont celles d'un diamètre.",
      long: ["Un diamètre coupe le cercle en deux demi-cercles de même longueur."],
      schema: "demi" },
    { id: "disque", nom: "disque", niveau: "6e",
      court: "Surface à l'intérieur du cercle, cercle compris.",
      long: ["Ne pas confondre : le cercle est une ligne, le disque est une surface."],
      schema: "disque" },
    { id: "perimetre", nom: "périmètre", niveau: "6e",
      court: "Longueur du tour d'une figure.",
      long: ["Pour un cercle, le périmètre est un peu plus de 3 fois son diamètre : P ≈ 3,14 × d."],
      schema: "cercle" },
    { id: "pi", nom: "π (pi)", niveau: "6e",
      court: "Nombre un peu plus grand que 3 : le tour d'un cercle divisé par son diamètre. On prend 3,14.",
      long: ["Quel que soit le cercle, périmètre ÷ diamètre donne toujours π.",
             "3,14 est une valeur approchée de π (le nombre a une infinité de décimales)."],
      schema: "cercle" }
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
      if (actif === el && !carte.hidden) fermer(); else ouvrir(el);
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
