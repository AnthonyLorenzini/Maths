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

  var couleurs = { vert: "#0F9562", orange: "#E8700F", violet: "#6E4FE0" };
  var accent = couleurs[found.n.couleur] || "#1B2333";
  var accueil = "../../index.html";
  var suivante = found.c.ressources[found.i + 1];

  try {
    localStorage.setItem("mathsLorenzini.derniere", JSON.stringify({
      id: found.r.id, titre: found.r.titre, chap: found.c.titre, niveau: found.n.nom, quand: Date.now()
    }));
  } catch (e) {}

  var css =
    ".ml-barre{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483000;" +
    "display:flex;gap:6px;align-items:center;font:700 13px/1.2 'Atkinson Hyperlegible','Work Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;" +
    "background:#FFFFFF;color:#1B2333;border:2px solid #1B2333;border-radius:999px;padding:5px;" +
    "box-shadow:0 6px 20px rgba(34,48,63,.22);max-width:calc(100vw - 24px)}" +
    ".ml-barre a{color:inherit;text-decoration:none;display:flex;align-items:center;gap:6px;padding:7px 12px;border-radius:999px;white-space:nowrap}" +
    ".ml-barre a:hover,.ml-barre a:focus-visible{background:#EEF2FA;outline:none}" +
    ".ml-barre .ml-retour{font-weight:700}" +
    ".ml-barre .ml-court{display:none}" +
    "@media (max-width:480px){.ml-barre .ml-long{display:none}.ml-barre .ml-court{display:inline}}" +
    ".ml-barre .ml-chap{background:" + accent + ";color:#FFFFFF;min-width:0;overflow:hidden}" +
    ".ml-barre .ml-chap:hover,.ml-barre .ml-chap:focus-visible{background:" + accent + ";filter:brightness(1.12)}" +
    ".ml-barre .ml-chap span{overflow:hidden;text-overflow:ellipsis}" +
    ".ml-barre .ml-x{padding:7px 9px;color:#6B7A8A}" +
    ".ml-barre.ml-mini a:not(.ml-x){display:none}.ml-barre.ml-mini .ml-x{color:#1B2333}" +
    "@media print{.ml-barre{display:none}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var nomChap = (found.c.num ? "Ch. " + found.c.num + " · " : "") + found.c.titre;
  var bar = document.createElement("nav");
  bar.className = "ml-barre";
  bar.setAttribute("aria-label", "Navigation du site");
  bar.innerHTML =
    '<a class="ml-retour" href="' + accueil + "#" + found.c.id + '" title="Retour à la page précédente" aria-label="Retour à la page précédente">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M9.5 3 4.5 8l5 5M5 8h8" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>Retour</a>' +
    '<a href="' + accueil + '" title="Accueil du site" aria-label="Accueil du site">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 7.5 8 2.5l6 5V14H10V10H6v4H2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg></a>' +
    '<a class="ml-chap" href="' + accueil + "#" + found.c.id + '" title="Aller au chapitre"><span class="ml-long">' + found.n.nom + " · " + nomChap + '</span><span class="ml-court">' + (found.c.num ? "Ch. " + found.c.num : "Chapitre") + "</span></a>" +
    (suivante ? '<a href="../' + suivante.id + '/index.html" title="' + suivante.titre.replace(/"/g, "&quot;") + '">Suivant →</a>' : "") +
    '<a class="ml-x" href="#" role="button" aria-label="Réduire la barre" title="Réduire / afficher">×</a>';
  var cale = document.createElement("div");
  cale.style.height = "72px";
  cale.setAttribute("aria-hidden", "true");
  document.body.appendChild(cale);
  document.body.appendChild(bar);
  var retour = bar.querySelector(".ml-retour");
  retour.addEventListener("click", function (e) {
    var memeSite = document.referrer && document.referrer.indexOf(location.origin) === 0;
    if (history.length > 1 && memeSite) { e.preventDefault(); history.back(); }
  });
  var x = bar.querySelector(".ml-x");
  x.addEventListener("click", function (e) {
    e.preventDefault();
    var mini = bar.classList.toggle("ml-mini");
    x.textContent = mini ? "≡" : "×";
  });
})();
