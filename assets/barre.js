/* Barre de navigation ajoutée en bas de chaque page de ressource :
   retour au chapitre, ressource suivante, accueil. Ne rien modifier ici
   pour ajouter du contenu : tout se règle dans catalogue.js. */
(function () {
  var S = window.SITE;
  if (!S) return;
  var parts = location.pathname.split("/").filter(Boolean);
  var found = null;
  S.niveaux.forEach(function (n) {
    n.chapitres.forEach(function (c) {
      c.ressources.forEach(function (r, i) {
        if (parts.indexOf(r.id) !== -1) found = { n: n, c: c, r: r, i: i };
      });
    });
  });
  if (!found) return;

  var couleurs = { vert: "#1E7A4C", orange: "#B5680A", violet: "#5B21B6" };
  var accent = couleurs[found.n.couleur] || "#22303F";
  var accueil = "../../index.html";
  var suivante = found.c.ressources[found.i + 1];

  try {
    localStorage.setItem("mathsLorenzini.derniere", JSON.stringify({
      id: found.r.id, titre: found.r.titre, chap: found.c.titre, niveau: found.n.nom, quand: Date.now()
    }));
  } catch (e) {}

  var css =
    ".ml-barre{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483000;" +
    "display:flex;gap:6px;align-items:center;font:600 13px/1.2 'Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
    "background:#FFFFFF;color:#22303F;border:2px solid #22303F;border-radius:999px;padding:5px;" +
    "box-shadow:0 6px 20px rgba(34,48,63,.22);max-width:calc(100vw - 24px)}" +
    ".ml-barre a{color:inherit;text-decoration:none;display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;white-space:nowrap}" +
    ".ml-barre a:hover,.ml-barre a:focus-visible{background:#F1ECE2;outline:none}" +
    ".ml-barre .ml-chap{background:" + accent + ";color:#FFFFFF;min-width:0;overflow:hidden}" +
    ".ml-barre .ml-chap:hover,.ml-barre .ml-chap:focus-visible{background:" + accent + ";filter:brightness(1.12)}" +
    ".ml-barre .ml-chap span{overflow:hidden;text-overflow:ellipsis}" +
    ".ml-barre .ml-x{padding:7px 9px;color:#6B7A8A}" +
    ".ml-barre.ml-mini a:not(.ml-x){display:none}.ml-barre.ml-mini .ml-x{color:#22303F}" +
    "@media print{.ml-barre{display:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var nomChap = (found.c.num ? "Ch. " + found.c.num + " · " : "") + found.c.titre;
  var bar = document.createElement("nav");
  bar.className = "ml-barre";
  bar.setAttribute("aria-label", "Navigation du site");
  bar.innerHTML =
    '<a href="' + accueil + '" title="Accueil du site" aria-label="Accueil du site">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 7.5 8 2.5l6 5V14H10V10H6v4H2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></a>' +
    '<a class="ml-chap" href="' + accueil + "#" + found.c.id + '" title="Revenir au chapitre"><span>← ' + found.n.nom + " · " + nomChap + "</span></a>" +
    (suivante ? '<a href="../' + suivante.id + '/index.html" title="' + suivante.titre.replace(/"/g, "&quot;") + '">Suivant →</a>' : "") +
    '<a class="ml-x" href="#" role="button" aria-label="Réduire la barre" title="Réduire / afficher">×</a>';
  var cale = document.createElement("div");
  cale.style.height = "72px";
  cale.setAttribute("aria-hidden", "true");
  document.body.appendChild(cale);
  document.body.appendChild(bar);
  var x = bar.querySelector(".ml-x");
  x.addEventListener("click", function (e) {
    e.preventDefault();
    var mini = bar.classList.toggle("ml-mini");
    x.textContent = mini ? "≡" : "×";
  });
})();
