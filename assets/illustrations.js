/* =========================================================
   VIGNETTES DES CHAPITRES — une petite illustration par chapitre, pour reconnaître
   le chapitre d'un coup d'œil avant de lire le titre.

   Pour en ajouter une : ajoute une entrée  "<id du chapitre>": svg(` … `)  ci-dessous.
   Un chapitre sans illustration garde simplement sa pastille numérotée.

   Style commun : traits épais (encre), 3 couleurs max (couleur du niveau, jaune soleil, blanc),
   fond = couleur claire du niveau. Les couleurs viennent des classes CSS .f-* / .s-* (voir index.html),
   donc l'illustration prend automatiquement la couleur du niveau (vert 6e, orange 5e, violet 4e).
   ========================================================= */
(function () {
  const svg = (corps) => '<svg viewBox="0 0 72 72" aria-hidden="true" focusable="false">' + corps + '</svg>';

  // ----- 6e ch.1 : numération — deux tuiles de chiffres autour d'une virgule
  const numeration = svg(
    '<rect class="f-b s-i" x="6" y="21" width="23" height="30" rx="6" stroke-width="3"/>' +
    '<text class="tx f-i" x="17.5" y="36" text-anchor="middle" dominant-baseline="central" font-size="22">3</text>' +
    '<circle class="f-i" cx="36" cy="46" r="3"/>' +
    '<path class="s-i" d="M36 48.5q0 4.5-3 6.5" fill="none" stroke-width="2.6"/>' +
    '<rect class="f-c s-i" x="43" y="21" width="23" height="30" rx="6" stroke-width="3"/>' +
    '<text class="tx f-b" x="54.5" y="36" text-anchor="middle" dominant-baseline="central" font-size="22">5</text>'
  );

  // ----- 6e ch.2 : points, droites, distances — une droite, A et B dessus, C et sa distance à la droite
  const droites = svg(
    '<line class="s-i" x1="5" y1="48" x2="67" y2="48" stroke-width="3"/>' +
    '<line class="s-i" x1="36" y1="22" x2="36" y2="48" stroke-width="2.5" stroke-dasharray="3 4.5"/>' +
    '<path class="s-i" d="M36 42h6v6" fill="none" stroke-width="2"/>' +
    '<circle class="f-c s-i" cx="17" cy="48" r="5" stroke-width="2.5"/>' +
    '<circle class="f-c s-i" cx="55" cy="48" r="5" stroke-width="2.5"/>' +
    '<circle class="f-s s-i" cx="36" cy="17" r="5.5" stroke-width="2.5"/>' +
    '<text class="tx f-i" x="17" y="66" text-anchor="middle" font-size="12">A</text>' +
    '<text class="tx f-i" x="55" y="66" text-anchor="middle" font-size="12">B</text>' +
    '<text class="tx f-i" x="47" y="20" text-anchor="middle" font-size="12">C</text>'
  );

  // ----- 6e ch.3 : fractions — un disque partagé en 3 parts égales, 2 colorées
  const fractions = svg(
    '<path class="f-c s-i" d="M36 36V11.5A24.5 24.5 0 0 1 57.2 48.2Z" stroke-width="3"/>' +
    '<path class="f-s s-i" d="M36 36L57.2 48.2A24.5 24.5 0 0 1 14.8 48.2Z" stroke-width="3"/>' +
    '<path class="f-b s-i" d="M36 36L14.8 48.2A24.5 24.5 0 0 1 36 11.5Z" stroke-width="3"/>'
  );

  // ----- 6e ch.4 : décimaux — la « fleur des décimaux » (10 pétales, 3 colorés)
  let petales = '';
  for (let i = 0; i < 10; i++) {
    petales += '<ellipse class="' + (i < 3 ? 'f-c' : 'f-b') + ' s-i" cx="36" cy="18.5" rx="5.3" ry="11" ' +
      'transform="rotate(' + (i * 36) + ' 36 36)" stroke-width="2.2"/>';
  }
  const decimaux = svg(petales + '<circle class="f-s s-i" cx="36" cy="36" r="7" stroke-width="2.5"/>');

  // ----- 6e ch.5 : cercle et disque — un disque, son centre et un rayon
  const cercle = svg(
    '<circle class="f-b s-c" cx="36" cy="37" r="26" stroke-width="4"/>' +
    '<circle class="f-s" cx="36" cy="37" r="20"/>' +
    '<line class="s-i" x1="36" y1="37" x2="56" y2="24" stroke-width="3"/>' +
    '<circle class="f-i" cx="36" cy="37" r="3.3"/>' +
    '<circle class="f-c s-i" cx="56" cy="24" r="3.6" stroke-width="2"/>' +
    '<text class="tx f-i" x="43" y="48" text-anchor="middle" font-size="14">r</text>'
  );

  // ----- 6e « Défis calcul » : les quatre opérations
  const op = (x, y, fond, couleurTexte, signe) =>
    '<rect class="' + fond + ' s-i" x="' + x + '" y="' + y + '" width="26" height="26" rx="7" stroke-width="2.6"/>' +
    '<text class="tx ' + couleurTexte + '" x="' + (x + 13) + '" y="' + (y + 13.5) + '" text-anchor="middle" dominant-baseline="central" font-size="22">' + signe + '</text>';
  const defis = svg(
    op(6, 6, 'f-c', 'f-b', '+') + op(40, 6, 'f-s', 'f-i', '−') +
    op(6, 40, 'f-s', 'f-i', '×') + op(40, 40, 'f-c', 'f-b', '÷')
  );

  // ----- 5e « Automatismes » : un chronomètre
  const auto = svg(
    '<rect class="f-c s-i" x="30.5" y="7" width="11" height="7" rx="2.5" stroke-width="2.4"/>' +
    '<line class="s-i" x1="36" y1="14" x2="36" y2="19" stroke-width="3"/>' +
    '<line class="s-c" x1="55" y1="21" x2="60" y2="16" stroke-width="5"/>' +
    '<circle class="f-b" cx="36" cy="42" r="22"/>' +
    '<path class="f-s" d="M36 42V20A22 22 0 0 1 58 42Z"/>' +
    '<circle class="s-i" cx="36" cy="42" r="22" fill="none" stroke-width="3.2"/>' +
    '<line class="s-i" x1="36" y1="42" x2="47.5" y2="30.5" stroke-width="3.2"/>' +
    '<circle class="f-i" cx="36" cy="42" r="3.4"/>'
  );

  // ----- 4e ch.1 : pourcentages — le signe %
  const pourcentages = svg(
    '<line class="s-c" x1="51" y1="9" x2="21" y2="63" stroke-width="6.5"/>' +
    '<circle class="f-s s-i" cx="21" cy="21" r="10" stroke-width="3.2"/>' +
    '<circle class="f-b s-i" cx="51" cy="51" r="10" stroke-width="3.2"/>'
  );

  // ----- 4e ch.2 : grandeurs quotients — un compteur de vitesse (km/h)
  let graduations = '';
  for (let a = 20; a <= 160; a += 28) {
    const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    graduations += '<line class="s-i" x1="' + (36 + 17.5 * c).toFixed(1) + '" y1="' + (45 - 17.5 * s).toFixed(1) +
      '" x2="' + (36 + 22 * c).toFixed(1) + '" y2="' + (45 - 22 * s).toFixed(1) + '" stroke-width="2.6"/>';
  }
  const grandeurs = svg(
    '<path class="f-b s-i" d="M8 45A28 28 0 0 1 64 45Z" stroke-width="3.2"/>' +
    graduations +
    '<line class="s-c" x1="36" y1="45" x2="51" y2="26" stroke-width="4.2"/>' +
    '<circle class="f-i" cx="36" cy="45" r="4.5"/>' +
    '<text class="tx f-i" x="36" y="63" text-anchor="middle" font-size="11">km/h</text>'
  );

  // ----- 4e ch.3 : divisibilité et nombres premiers — un bout de crible, les premiers colorés
  const premiers = [2, 3, 5, 7];
  let crible = '';
  for (let i = 0; i < 9; i++) {
    const n = i + 2, x = 6 + (i % 3) * 20, y = 8 + Math.floor(i / 3) * 20, p = premiers.includes(n);
    crible += '<g' + (p ? '' : ' opacity=".42"') + '>' +
      '<rect class="' + (p ? 'f-c' : 'f-b') + ' s-i" x="' + x + '" y="' + y + '" width="18" height="18" rx="5" stroke-width="2.2"/>' +
      '<text class="tx ' + (p ? 'f-b' : 'f-i') + '" x="' + (x + 9) + '" y="' + (y + 9.5) + '" text-anchor="middle" dominant-baseline="central" font-size="' + (n > 9 ? 9.5 : 12) + '">' + n + '</text></g>';
  }
  const divisibilite = svg(crible);

  // ----- 4e ch.4 : Pythagore — un triangle rectangle et ses trois carrés
  const pythagore = svg(
    '<g transform="translate(-7.5 -4.5) scale(1.15)">' +
    '<path class="f-b s-i" d="M28 43H48V63H28Z" stroke-width="2.6"/>' +
    '<path class="f-b s-i" d="M28 28V43H13V28Z" stroke-width="2.6"/>' +
    '<path class="f-c s-i" d="M48 43L28 28L43 8L63 23Z" stroke-width="2.6"/>' +
    '<path class="f-s s-i" d="M28 43H48L28 28Z" stroke-width="2.6"/>' +
    '</g>'
  );

  // ===== Séances : un dessin par séance (clé = id du chapitre + "-s" + numéro de séance) =====
  const lab = (x, y, t, taille) => '<text class="tx f-i" x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="central" font-size="' + (taille || 13) + '">' + t + '</text>';
  // triangle rectangle « 3-4-5 » avec un côté surligné (pour calculer l'hypoténuse ou un côté de l'angle droit)
  const tri = (surligne, couleur, etiqs) =>
    '<line class="' + couleur + '" x1="' + surligne[0] + '" y1="' + surligne[1] + '" x2="' + surligne[2] + '" y2="' + surligne[3] + '" stroke-width="9"/>' +
    '<path class="f-b s-i" d="M12 54V18L60 54Z" stroke-width="3"/>' +
    '<path class="s-i" d="M12 47H19V54" fill="none" stroke-width="2.2"/>' + etiqs;
  const SEANCES = {
    // 4e ch.1 : Les pourcentages
    "4e-ch1-s1": svg( // la proportionnalité : un tableau, chaque ligne = ligne du haut × 3
      '<rect class="f-b s-i" x="6" y="8" width="18" height="18" rx="3" stroke-width="2.6"/>' + lab(15, 17.5, '1', 12) +
      '<rect class="f-b s-i" x="27" y="8" width="18" height="18" rx="3" stroke-width="2.6"/>' + lab(36, 17.5, '2', 12) +
      '<rect class="f-b s-i" x="48" y="8" width="18" height="18" rx="3" stroke-width="2.6"/>' + lab(57, 17.5, '4', 12) +
      '<rect class="f-c s-i" x="6" y="29" width="18" height="18" rx="3" stroke-width="2.6"/><text class="tx f-b" x="15" y="38.5" text-anchor="middle" dominant-baseline="central" font-size="12">3</text>' +
      '<rect class="f-c s-i" x="27" y="29" width="18" height="18" rx="3" stroke-width="2.6"/><text class="tx f-b" x="36" y="38.5" text-anchor="middle" dominant-baseline="central" font-size="12">6</text>' +
      '<rect class="f-c s-i" x="48" y="29" width="18" height="18" rx="3" stroke-width="2.6"/><text class="tx f-b" x="57" y="38.5" text-anchor="middle" dominant-baseline="central" font-size="10.5">12</text>' +
      '<rect class="f-s s-i" x="22" y="52" width="28" height="14" rx="7" stroke-width="2.4"/>' + lab(36, 59.5, '×3', 11)),
    "4e-ch1-s2": svg( // calculer et appliquer un pourcentage : une étiquette de prix −30 %
      '<path class="f-c s-i" d="M4 13H41L68 36L41 59H4Z" stroke-width="3.2"/>' +
      '<circle class="f-b s-i" cx="13" cy="36" r="3.4" stroke-width="2"/>' +
      '<text class="tx f-b" x="35" y="36.5" text-anchor="middle" dominant-baseline="central" font-size="15">−30%</text>'),
    "4e-ch1-s3": svg( // les évolutions : une hausse et une baisse
      '<path class="s-i" d="M23 62V22M11 33L23 19L35 33" fill="none" stroke-width="11"/>' +
      '<path class="s-c" d="M23 62V22M11 33L23 19L35 33" fill="none" stroke-width="5"/>' +
      '<path class="s-i" d="M49 10V50M37 39L49 53L61 39" fill="none" stroke-width="11"/>' +
      '<path class="s-s" d="M49 10V50M37 39L49 53L61 39" fill="none" stroke-width="5"/>'),
    "4e-ch1-s4": svg( // le pourcentage réciproque : on remonte au prix de départ
      '<path class="s-i" d="M16.9 25A22 22 0 1 1 16.9 47" fill="none" stroke-width="11"/>' +
      '<path class="s-c" d="M16.9 25A22 22 0 1 1 16.9 47" fill="none" stroke-width="5"/>' +
      '<path class="f-c s-i" d="M12.4 39.3L22.9 43.5L10.9 50.5Z" stroke-width="2.4"/>' +
      lab(37, 37, '?', 24)),
    // 4e ch.4 : Pythagore
    "4e-ch4-s1": svg( // le puzzle des aires : 9 + 16 = 25
      '<rect class="f-s s-i" x="7" y="6" width="18" height="18" rx="1.5" stroke-width="2.8"/>' + lab(30.5, 15, '+', 15) +
      '<rect class="f-b s-i" x="36" y="3" width="24" height="24" rx="1.5" stroke-width="2.8"/>' + lab(15, 53, '=', 18) +
      '<rect class="f-c s-i" x="28" y="38" width="30" height="30" rx="2" stroke-width="2.8"/>'),
    "4e-ch4-s2": svg( // la racine carrée
      '<path class="s-c" d="M8 40L16 34L27 60L43 12H66" fill="none" stroke-width="6"/>' + lab(54, 36, '9', 22)),
    "4e-ch4-s3": svg( // écrire l'égalité : on nomme les sommets, l'hypoténuse est repérée
      '<path class="f-s s-i" d="M14 14V52H58Z" stroke-width="3"/>' +
      '<path class="s-i" d="M14 45H21V52" fill="none" stroke-width="2.2"/>' +
      '<line class="s-c" x1="14" y1="14" x2="58" y2="52" stroke-width="3"/>' +
      lab(8, 10, 'B', 13) + lab(7, 60, 'A', 13) + lab(64, 58, 'C', 13)),
    "4e-ch4-s4": svg(tri([12, 18, 60, 54], 's-c', lab(5, 36, '3', 13) + lab(36, 64, '4', 13) + lab(47, 28, '?', 16))), // hypoténuse
    "4e-ch4-s5": svg(tri([12, 54, 60, 54], 's-s', lab(5, 36, '3', 13) + lab(36, 64, '?', 16) + lab(47, 28, '5', 13)))  // côté de l'angle droit
  };

  window.ILLU = {
    "6e-ch1": numeration,
    "6e-ch2": droites,
    "6e-ch3": fractions,
    "6e-ch4": decimaux,
    "6e-ch5": cercle,
    "6e-defis": defis,
    "5e-auto": auto,
    "4e-ch1": pourcentages,
    "4e-ch2": grandeurs,
    "4e-ch3": divisibilite,
    "4e-ch4": pythagore
  };
  Object.assign(window.ILLU, SEANCES);
})();
