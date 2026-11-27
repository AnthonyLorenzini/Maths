/* Projection au tableau : replier un exercice terminé pour faire remonter les suivants.
   Un bouton ✓ discret dans l'en-tête de chaque exercice ; un clic replie l'exercice
   en une fine bande (numéro et titre gardés), un second clic le rouvre.
   Rien n'est enregistré : en rechargeant la page, tout est déplié. */
(function () {
  var css =
    '.ex-tete .replier{flex:none;margin-left:auto;width:30px;height:30px;min-height:0;padding:0;border:2px solid var(--line,#c3d1ec);border-radius:50%;background:#fff;color:var(--muted,#56608a);font:700 .95rem/1 system-ui,sans-serif;cursor:pointer;opacity:.55;transition:opacity .15s,background .15s}' +
    '.ex-tete .replier:hover,.ex-tete .replier:focus-visible{opacity:1;border-color:var(--ok,#17703f);color:var(--ok,#17703f)}' +
    '.ex-tete .stars{margin-left:auto}' +
    '.ex-tete .stars + .replier{margin-left:8px}' +
    '.ex.replie{padding-top:5px;padding-bottom:5px;background:var(--ok-bg,#dff5e6);border-color:var(--ok,#17703f);border-style:dashed}' +
    '.ex.replie > :not(.ex-tete){display:none !important}' +
    '.ex.replie .ex-tete{margin-bottom:0;align-items:center}' +
    '.ex.replie h3{font-size:1rem;color:var(--ok,#17703f)}' +
    '.ex.replie .stars{display:none}' +
    '.ex.replie .replier{opacity:1;background:var(--ok,#17703f);border-color:var(--ok,#17703f);color:#fff}' +
    '@media print{.ex-tete .replier{display:none}.ex.replie > :not(.ex-tete){display:revert !important}}';
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

  document.querySelectorAll('.cols article.ex').forEach(function (ex) {
    var tete = ex.querySelector('.ex-tete');
    if (!tete || tete.querySelector('.replier')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'replier';
    tete.appendChild(btn);
    maj(ex, btn);
    btn.addEventListener('click', function () {
      ex.classList.toggle('replie');
      maj(ex, btn);
    });
  });
})();
