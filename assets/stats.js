/* Statistiques de fréquentation — GoatCounter (https://alorenzini.goatcounter.com).
   Sans cookie, sans identifiant, sans donnée personnelle : aucun bandeau de consentement nécessaire.
   Chargé par index.html et, via barre.js, par toutes les pages de ressource (rien à ajouter dans une nouvelle page).

   Ce qui est compté :
   - les pages vues : une ligne par séance, leçon ou jeu (donc par chapitre) ;
   - "astuce/<page>/<exercice>" et "solution/<page>/<exercice>" : ouverture d'une astuce ou d'une solution ;
   - "jeu/<page>" : première action du joueur dans un mini-jeu (différent d'une simple ouverture) ;
   - "ascension/<niveau>/<chapitre>/reussi" ou "/rate" : réponses au test d'Ascension (envoyées par ascension.js).

   Ne pas compter ses propres passages (ordinateur de la classe, etc.) : méthode officielle de GoatCounter,
   ajouter #toggle-goatcounter à la fin de l'adresse d'une page du site, dans ce navigateur (un message confirme ;
   refaire la même chose pour recompter). */
(function () {
  if (window.__mlStats) return;
  window.__mlStats = true;

  var ENDPOINT = "https://alorenzini.goatcounter.com/count";

  /* ---------- événements : mis en file d'attente tant que GoatCounter n'est pas chargé ---------- */
  var file = [], pret = false;
  function envoyer(nom) {
    try { window.goatcounter.count({ path: nom, title: nom, event: true }); } catch (e) {}
  }
  window.mlStat = function (nom) {
    if (pret) envoyer(nom);
    else if (file.length < 50) file.push(nom);
  };

  window.goatcounter = window.goatcounter || {};
  window.goatcounter.endpoint = ENDPOINT;
  var s = document.createElement("script");
  s.async = true;
  s.setAttribute("data-goatcounter", ENDPOINT);
  s.src = "https://gc.zgo.at/count.js";
  s.onload = function () { pret = true; file.splice(0).forEach(envoyer); };
  s.onerror = function () { file.length = 0; window.mlStat = function () {}; }; // bloqué (bloqueur de pub, réseau) : on ne fait rien
  (document.head || document.documentElement).appendChild(s);

  /* ---------- ressource courante, retrouvée dans le catalogue ---------- */
  var parts = location.pathname.split("/").filter(Boolean);
  var res = null;
  var S = window.SITE;
  if (S && S.niveaux) {
    S.niveaux.forEach(function (n) {
      n.chapitres.forEach(function (c) {
        c.ressources.forEach(function (r) { if (parts.indexOf(r.id) !== -1) res = r; });
      });
    });
  }
  if (!res) { compteurEnseignant(); return; }

  /* ---------- compteur de visites, réservé à l'enseignant, sur la page d'accueil ----------
     Activé dans ce navigateur en ajoutant #prof à l'adresse de l'accueil (retiré avec #prof-off).
     Les élèves ne le voient jamais. Nécessite, dans les réglages GoatCounter, l'option
     « Allow adding visitor counts on your website ». Les chiffres sont mis à jour environ toutes les 4 h. */
  function compteurEnseignant() {
    var prof = false;
    try {
      if (location.hash === "#prof") localStorage.setItem("mlProf", "1");
      else if (location.hash === "#prof-off") localStorage.removeItem("mlProf");
      prof = localStorage.getItem("mlProf") === "1";
    } catch (e) {}
    if (!prof) return;
    function afficher() {
      if (document.getElementById("ml-visites")) return;
      var base = ENDPOINT.replace(/\/count$/, "") + "/counter/TOTAL.html?no_branding=true";
      var boite = document.createElement("div");
      boite.id = "ml-visites";
      boite.style.cssText = "position:fixed;right:12px;bottom:12px;z-index:2147483000;background:#fff;color:#1B2333;" +
        "border:2px solid #1B2333;border-radius:12px;padding:8px 10px;font:700 12px/1.3 sans-serif;box-shadow:0 6px 20px rgba(34,48,63,.22)";
      boite.innerHTML =
        '<div>Visites du site <span style="font-weight:400">(visible par toi seul)</span></div>' +
        '<div style="display:flex;gap:8px;margin-top:6px">' +
          '<div>Cette semaine<br><iframe title="Visites cette semaine" src="' + base + '&start=week" width="150" height="50" style="border:0"></iframe></div>' +
          '<div>Au total<br><iframe title="Visites au total" src="' + base + '" width="150" height="50" style="border:0"></iframe></div>' +
        '</div>' +
        '<div style="font-weight:400;margin-top:4px">Mis à jour toutes les 4 h environ · #prof-off pour masquer</div>';
      document.body.appendChild(boite);
    }
    if (document.body) afficher(); else document.addEventListener("DOMContentLoaded", afficher);
  }

  /* ---------- astuces et solutions ouvertes (boutons .toggle-btn des séances) ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest(".toggle-btn") : null;
    if (!b) return;
    var m = /toggle\('([^']+)'\)/.exec(b.getAttribute("onclick") || "");
    if (!m) return;
    var panneau = document.getElementById(m[1]);
    if (!panneau || !panneau.classList.contains("show")) return; // on ne compte que l'ouverture, pas la fermeture
    var genre = b.classList.contains("astuce") ? "astuce" : "solution";
    window.mlStat(genre + "/" + res.id + "/" + m[1].replace(/^(astuce|solution)-/, ""));
  });

  /* ---------- mini-jeux : première action du joueur ---------- */
  if (res.type === "jeu") {
    var lance = false;
    var premier = function (e) {
      if (lance) return;
      if (e.target && e.target.closest && e.target.closest(".ml-barre")) return; // la barre de navigation n'est pas le jeu
      lance = true;
      window.mlStat("jeu/" + res.id);
      document.removeEventListener("pointerdown", premier, true);
      document.removeEventListener("keydown", premier, true);
    };
    document.addEventListener("pointerdown", premier, true);
    document.addEventListener("keydown", premier, true);
  }
})();
