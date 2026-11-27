/* Projection au tableau : replier un exercice terminé pour faire de la place.
   Un bouton ✓ discret dans l'en-tête de chaque exercice. Un clic range l'exercice
   en une petite étiquette en haut du bloc d'exercices, et les exercices restants
   se répartissent à nouveau sur les deux colonnes (dans l'ordre, colonnes équilibrées),
   pour que ceux qui étaient en bas de l'écran remontent. Le ↺ le rouvre.
   Quand plus rien n'est replié, la disposition d'origine revient.
   Rien n'est enregistré : en rechargeant la page, tout est déplié. */
(function () {
  var css =
    '.ex-tete .replier{flex:none;margin-left:auto;width:30px;height:30px;min-height:0;padding:0;border:2px solid var(--line,#c3d1ec);border-radius:50%;background:#fff;color:var(--muted,#56608a);font:700 .95rem/1 system-ui,sans-serif;cursor:pointer;opacity:.55;transition:opacity .15s,background .15s}' +
    '.ex-tete .replier:hover,.ex-tete .replier:focus-visible{opacity:1;border-color:var(--ok,#17703f);color:var(--ok,#17703f)}' +
    '.ex-tete .stars{margin-left:auto}' +
    '.ex-tete .stars + .replier{margin-left:8px}' +
    '.cols > .faits{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:8px}' +
    '.cols > .faits:empty{display:none}' +
    '.ex.replie{padding:4px 6px 4px 12px;background:var(--ok-bg,#dff5e6);border-color:var(--ok,#17703f);border-style:dashed}' +
    '.ex.replie > :not(.ex-tete){display:none !important}' +
    '.ex.replie .ex-tete{margin-bottom:0;align-items:center;gap:10px}' +
    '.ex.replie h3{font-size:.95rem;color:var(--ok,#17703f)}' +
    '.ex.replie .stars{display:none}' +
    '.ex.replie .replier{margin-left:0;width:26px;height:26px;opacity:1;background:var(--ok,#17703f);border-color:var(--ok,#17703f);color:#fff}' +
    '@media print{.ex-tete .replier,.cols > .faits{display:none}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  function maj(ex, btn) {
    var replie = ex.classList.contains('replie');
    btn.textContent = replie ? '↺' : '✓';
    btn.title = replie ? 'Rouvrir l’exercice' : 'Exercice fait : le replier';
    btn.setAttribute('aria-label', btn.title);
    btn.setAttribute('aria-pressed', replie ? 'true' : 'false');
  }

  document.querySelectorAll('.cols').forEach(function (bloc) {
    var colonnes = Array.prototype.filter.call(bloc.children, function (c) {
      return c.classList.contains('col');
    });
    var exos = [];
    colonnes.forEach(function (col, i) {
      col.querySelectorAll(':scope > article.ex').forEach(function (ex) {
        exos.push({ el: ex, col: i });
      });
    });
    if (!exos.length) return;

    var faits = document.createElement('div');
    faits.className = 'faits';
    bloc.insertBefore(faits, bloc.firstChild);

    function disposer() {
      var replies = exos.filter(function (e) { return e.el.classList.contains('replie'); });
      var ouverts = exos.filter(function (e) { return !e.el.classList.contains('replie'); });
      replies.forEach(function (e) { faits.appendChild(e.el); });

      if (!replies.length || colonnes.length !== 2) {
        // Disposition d'origine
        ouverts.forEach(function (e) { colonnes[e.col].appendChild(e.el); });
        return;
      }
      // Répartition dans l'ordre : on coupe la liste là où les deux colonnes sont le plus équilibrées
      var h = ouverts.map(function (e) { return e.el.offsetHeight; });
      var total = h.reduce(function (a, b) { return a + b; }, 0);
      var meilleur = ouverts.length, ecart = Infinity, gauche = 0;
      for (var k = 0; k <= ouverts.length; k++) {
        var m = Math.max(gauche, total - gauche);
        if (m < ecart) { ecart = m; meilleur = k; }
        if (k < ouverts.length) gauche += h[k];
      }
      ouverts.forEach(function (e, i) {
        colonnes[i < meilleur ? 0 : 1].appendChild(e.el);
      });
    }

    exos.forEach(function (e) {
      var tete = e.el.querySelector('.ex-tete');
      if (!tete || tete.querySelector('.replier')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'replier';
      tete.appendChild(btn);
      maj(e.el, btn);
      btn.addEventListener('click', function () {
        e.el.classList.toggle('replie');
        maj(e.el, btn);
        disposer();
      });
    });
  });
})();
