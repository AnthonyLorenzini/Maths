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
    // 6e ch.5 : Cercle et disque
    "6e-ch5-s1": svg( // le vocabulaire : un cercle, son diamètre, une corde et un arc
      '<circle class="f-b s-i" cx="36" cy="38" r="27" stroke-width="3.4"/>' +
      '<path class="s-s" d="M60.6 49.2A27 27 0 0 1 36 65" fill="none" stroke-width="6.5"/>' +
      '<line class="s-i" x1="19" y1="22" x2="53" y2="22" stroke-width="3"/>' +
      '<line class="s-c" x1="9" y1="38" x2="63" y2="38" stroke-width="4.2"/>' +
      '<circle class="f-i" cx="36" cy="38" r="3"/>'),
    "6e-ch5-s2": svg( // dedans, dessus, dehors : trois points autour d'un disque
      '<circle class="f-c s-i" cx="30" cy="38" r="24" stroke-width="3.4"/>' +
      '<circle class="f-b s-i" cx="22" cy="40" r="4.5" stroke-width="2.4"/>' +
      '<circle class="f-s s-i" cx="54" cy="38" r="5" stroke-width="2.6"/>' +
      '<circle class="f-b s-i" cx="63" cy="14" r="4.5" stroke-width="2.4"/>'),
    "6e-ch5-s3": svg( // le tour d'un cercle : un peu plus de 3 diamètres mis bout à bout
      '<circle class="f-b s-i" cx="15" cy="20" r="10" stroke-width="3"/>' +
      '<line class="s-c" x1="5" y1="20" x2="25" y2="20" stroke-width="3.4"/>' +
      '<rect class="f-c s-i" x="6" y="44" width="20" height="14" stroke-width="2.8"/>' +
      '<rect class="f-b s-i" x="26" y="44" width="20" height="14" stroke-width="2.8"/>' +
      '<rect class="f-c s-i" x="46" y="44" width="20" height="14" stroke-width="2.8"/>' +
      '<rect class="f-s s-i" x="66" y="44" width="3" height="14" stroke-width="2.2"/>'),
    "6e-ch5-s4": svg( // les formules du tour : π
      '<circle class="f-s s-i" cx="36" cy="36" r="29" stroke-width="3.4"/>' +
      lab(36, 38, 'π', 36)),
    "6e-ch5-s5": svg( // le tour d'une piste : deux lignes droites et deux demi-cercles
      '<rect class="f-c s-i" x="4" y="16" width="64" height="40" rx="20" stroke-width="3.4"/>' +
      '<rect class="f-b s-i" x="16" y="28" width="40" height="16" rx="8" stroke-width="3"/>' +
      '<line class="s-s" x1="36" y1="16" x2="36" y2="28" stroke-width="4"/>'),
    // 6e ch.4 : Fractions décimales et nombres décimaux
    "6e-ch4-s1": svg( // les dixièmes : 13/10 = une barre entière + 3 dixièmes
      '<rect class="f-c" x="6" y="12" width="60" height="18"/>' +
      '<rect class="f-s" x="6" y="42" width="18" height="18"/>' +
      '<rect class="f-b" x="24" y="42" width="42" height="18"/>' +
      '<g class="s-i" stroke-width="2"><line x1="12" y1="12" x2="12" y2="30"/><line x1="18" y1="12" x2="18" y2="30"/><line x1="24" y1="12" x2="24" y2="30"/><line x1="30" y1="12" x2="30" y2="30"/><line x1="36" y1="12" x2="36" y2="30"/><line x1="42" y1="12" x2="42" y2="30"/><line x1="48" y1="12" x2="48" y2="30"/><line x1="54" y1="12" x2="54" y2="30"/><line x1="60" y1="12" x2="60" y2="30"/>' +
      '<line x1="12" y1="42" x2="12" y2="60"/><line x1="18" y1="42" x2="18" y2="60"/><line x1="24" y1="42" x2="24" y2="60"/><line x1="30" y1="42" x2="30" y2="60"/><line x1="36" y1="42" x2="36" y2="60"/><line x1="42" y1="42" x2="42" y2="60"/><line x1="48" y1="42" x2="48" y2="60"/><line x1="54" y1="42" x2="54" y2="60"/><line x1="60" y1="42" x2="60" y2="60"/></g>' +
      '<rect class="s-i" x="6" y="12" width="60" height="18" rx="3" fill="none" stroke-width="3"/>' +
      '<rect class="s-i" x="6" y="42" width="60" height="18" rx="3" fill="none" stroke-width="3"/>'),
    "6e-ch4-s2": svg( // les centièmes et la virgule : un carré en 100 parts, une part colorée, 0,01
      '<rect class="f-b" x="18" y="5" width="36" height="36"/>' +
      '<rect class="f-s" x="18" y="5" width="3.6" height="3.6"/>' +
      '<g class="s-i" stroke-width="1.2"><line x1="25.2" y1="5" x2="25.2" y2="41"/><line x1="32.4" y1="5" x2="32.4" y2="41"/><line x1="39.6" y1="5" x2="39.6" y2="41"/><line x1="46.8" y1="5" x2="46.8" y2="41"/>' +
      '<line x1="18" y1="12.2" x2="54" y2="12.2"/><line x1="18" y1="19.4" x2="54" y2="19.4"/><line x1="18" y1="26.6" x2="54" y2="26.6"/><line x1="18" y1="33.8" x2="54" y2="33.8"/></g>' +
      '<rect class="s-i" x="18" y="5" width="36" height="36" rx="2" fill="none" stroke-width="3"/>' +
      '<rect class="f-s s-i" x="18" y="5" width="7.2" height="7.2" stroke-width="2"/>' +
      lab(36, 58, '0,01', 15)),
    "6e-ch4-s3": svg( // les fleurs : un nombre décimal au cœur d'une fleur à six pétales
      (function () { let f = ''; for (let i = 0; i < 6; i++) f += '<ellipse class="' + (i % 2 ? 'f-b' : 'f-c') + ' s-i" cx="36" cy="17" rx="8" ry="12" transform="rotate(' + (i * 60) + ' 36 36)" stroke-width="2.4"/>'; return f; })() +
      '<circle class="f-s s-i" cx="36" cy="36" r="12" stroke-width="2.8"/>' + lab(36, 36.5, '2,5', 11)),
    "6e-ch4-s4": svg( // les pourcentages : une jauge remplie à 75 %
      '<rect class="f-b" x="5" y="10" width="62" height="26" rx="9"/>' +
      '<rect class="f-c" x="5" y="10" width="47" height="26" rx="9"/>' +
      '<rect class="f-c" x="40" y="10" width="12" height="26"/>' +
      '<rect class="s-i" x="5" y="10" width="62" height="26" rx="9" fill="none" stroke-width="3.2"/>' +
      '<line class="s-i" x1="52" y1="10" x2="52" y2="36" stroke-width="3.2"/>' +
      lab(36, 56, '75 %', 16)),
    "6e-ch4-s5": svg( // une droite graduée en dixièmes : on place 2,4 entre 2 et 3
      '<path class="s-i" d="M3 46H69" fill="none" stroke-width="3"/>' +
      (function () { let t = ''; for (let i = 1; i < 10; i++) t += '<line class="s-i" x1="' + (12 + i * 4.8).toFixed(1) + '" y1="42" x2="' + (12 + i * 4.8).toFixed(1) + '" y2="50" stroke-width="2"/>'; return t; })() +
      '<g class="s-i" stroke-width="3.2"><line x1="12" y1="38" x2="12" y2="54"/><line x1="60" y1="38" x2="60" y2="54"/></g>' +
      '<path class="s-c" d="M31.2 29V39M26.5 34L31.2 40L36 34" fill="none" stroke-width="3.4"/>' +
      '<circle class="f-s s-i" cx="31.2" cy="46" r="3.6" stroke-width="2"/>' +
      lab(31.2, 18, '2,4', 15) + lab(12, 64, '2', 12) + lab(60, 64, '3', 12)),
    "6e-ch4-s6": svg( // calculer avec des décimaux : des pièces (prix, monnaie)
      '<circle class="f-c s-i" cx="42" cy="30" r="22" stroke-width="3.2"/>' +
      '<circle class="f-s s-i" cx="29" cy="43" r="22" stroke-width="3.2"/>' +
      '<circle class="s-i" cx="29" cy="43" r="15.5" fill="none" stroke-width="1.8"/>' +
      lab(29, 43.5, '€', 21)),
    // 6e ch.3 : Les fractions
    "6e-ch3-s1": svg( // partager en parts égales : une tablette en 4 parts, 3 colorées
      '<rect class="f-c" x="6" y="18" width="45" height="36"/>' +
      '<rect class="f-b" x="51" y="18" width="15" height="36"/>' +
      '<g class="s-i" stroke-width="2.6"><line x1="17.2" y1="18" x2="17.2" y2="54"/><line x1="28.5" y1="18" x2="28.5" y2="54"/><line x1="39.8" y1="18" x2="39.8" y2="54"/></g>' +
      '<rect class="s-i" x="6" y="18" width="60" height="36" rx="5" fill="none" stroke-width="3.4"/>'),
    "6e-ch3-s2": svg( // une demi-droite graduée : on place 3/4 entre 0 et 1
      '<path class="s-i" d="M4 46H68M62 40L68 46L62 52" fill="none" stroke-width="3"/>' +
      '<g class="s-i" stroke-width="3"><line x1="10" y1="39" x2="10" y2="53"/><line x1="58" y1="39" x2="58" y2="53"/></g>' +
      '<g class="s-i" stroke-width="2.2"><line x1="22" y1="42" x2="22" y2="50"/><line x1="34" y1="42" x2="34" y2="50"/><line x1="46" y1="42" x2="46" y2="50"/></g>' +
      '<path class="s-c" d="M46 30V40M41 35L46 41L51 35" fill="none" stroke-width="3.4"/>' +
      '<circle class="f-s s-i" cx="46" cy="21" r="8" stroke-width="2.8"/>' +
      lab(10, 63, '0', 12) + lab(58, 63, '1', 12)),
    "6e-ch3-s3": svg( // graduer un segment : une règle, et le segment partagé en 3 parts égales
      '<rect class="f-s s-i" x="4" y="8" width="64" height="22" rx="4" stroke-width="3"/>' +
      '<g class="s-i" stroke-width="2.4"><line x1="14" y1="8" x2="14" y2="20"/><line x1="24" y1="8" x2="24" y2="16"/><line x1="34" y1="8" x2="34" y2="20"/><line x1="44" y1="8" x2="44" y2="16"/><line x1="54" y1="8" x2="54" y2="20"/></g>' +
      '<line class="s-i" x1="8" y1="52" x2="64" y2="52" stroke-width="3"/>' +
      '<circle class="f-c s-i" cx="8" cy="52" r="4.5" stroke-width="2.4"/><circle class="f-b s-i" cx="26.7" cy="52" r="4.5" stroke-width="2.4"/>' +
      '<circle class="f-b s-i" cx="45.3" cy="52" r="4.5" stroke-width="2.4"/><circle class="f-c s-i" cx="64" cy="52" r="4.5" stroke-width="2.4"/>'),
    "6e-ch3-s4": svg( // le milieu d'un segment gradué : 1/2
      '<line class="s-i" x1="8" y1="48" x2="64" y2="48" stroke-width="3"/>' +
      '<circle class="f-c s-i" cx="8" cy="48" r="5" stroke-width="2.6"/><circle class="f-c s-i" cx="64" cy="48" r="5" stroke-width="2.6"/>' +
      '<circle class="f-s s-i" cx="36" cy="48" r="7.5" stroke-width="3"/>' +
      lab(36, 10, '1', 15) + '<line class="s-i" x1="27" y1="20" x2="45" y2="20" stroke-width="3"/>' + lab(36, 31, '2', 15)),
    // 6e ch.2 : Points, droites et distances
    "6e-ch2-s1": svg( // le vocabulaire : une droite, une demi-droite, un segment
      '<path class="s-i" d="M3 14H69M9 8L3 14L9 20M63 8L69 14L63 20" fill="none" stroke-width="3"/>' +
      '<path class="s-c" d="M14 36H69M62 30L69 36L62 42" fill="none" stroke-width="3.4"/>' +
      '<circle class="f-c s-i" cx="14" cy="36" r="5" stroke-width="2.6"/>' +
      '<line class="s-i" x1="12" y1="58" x2="60" y2="58" stroke-width="3"/>' +
      '<circle class="f-s s-i" cx="12" cy="58" r="5" stroke-width="2.6"/>' +
      '<circle class="f-s s-i" cx="60" cy="58" r="5" stroke-width="2.6"/>'),
    "6e-ch2-s2": svg( // reporter une longueur : un compas
      '<path class="s-i" d="M36 14L18 58M36 14L54 58" fill="none" stroke-width="3.4"/>' +
      '<path class="s-c" d="M10 62Q36 50 62 62" fill="none" stroke-width="2.6" stroke-dasharray="3 4.5"/>' +
      '<circle class="f-s s-i" cx="36" cy="12" r="7" stroke-width="3"/>' +
      '<circle class="f-c s-i" cx="18" cy="58" r="3.8" stroke-width="2.2"/>' +
      '<circle class="f-c s-i" cx="54" cy="58" r="3.8" stroke-width="2.2"/>'),
    "6e-ch2-s3": svg( // lire une figure codée : un segment [AB], M au milieu, deux traits égaux
      '<line class="s-i" x1="10" y1="34" x2="62" y2="34" stroke-width="3"/>' +
      '<line class="s-c" x1="23" y1="26" x2="23" y2="42" stroke-width="4"/>' +
      '<line class="s-c" x1="49" y1="26" x2="49" y2="42" stroke-width="4"/>' +
      '<circle class="f-s s-i" cx="10" cy="34" r="5" stroke-width="2.6"/>' +
      '<circle class="f-b s-i" cx="36" cy="34" r="5" stroke-width="2.6"/>' +
      '<circle class="f-s s-i" cx="62" cy="34" r="5" stroke-width="2.6"/>' +
      lab(10, 54, 'A', 13) + lab(36, 54, 'M', 13) + lab(62, 54, 'B', 13)),
    // 6e ch.1 : Numération entière et décimale
    "6e-ch1-s1": svg( // lire les grands nombres : trois classes de chiffres, séparées comme dans « 12 345 678 »
      '<rect class="f-c s-i" x="2" y="22" width="21" height="28" rx="5" stroke-width="2.6"/>' +
      '<text class="tx f-b" x="12.5" y="36.5" text-anchor="middle" dominant-baseline="central" font-size="11">12</text>' +
      '<rect class="f-b s-i" x="26" y="22" width="21" height="28" rx="5" stroke-width="2.6"/>' + lab(36.5, 36.5, '345', 8.5) +
      '<rect class="f-b s-i" x="50" y="22" width="21" height="28" rx="5" stroke-width="2.6"/>' + lab(60.5, 36.5, '678', 8.5) +
      '<path class="s-s" d="M5 60H67" fill="none" stroke-width="4"/>'),
    "6e-ch1-s2": svg( // le rang des chiffres : dans 3 752, on désigne le chiffre des centaines
      '<rect class="f-b s-i" x="5" y="10" width="15" height="26" rx="4" stroke-width="2.6"/>' + lab(12.5, 23.5, '3', 14) +
      '<rect class="f-s s-i" x="21" y="10" width="15" height="26" rx="4" stroke-width="2.8"/>' + lab(28.5, 23.5, '7', 14) +
      '<rect class="f-b s-i" x="37" y="10" width="15" height="26" rx="4" stroke-width="2.6"/>' + lab(44.5, 23.5, '5', 14) +
      '<rect class="f-b s-i" x="53" y="10" width="15" height="26" rx="4" stroke-width="2.6"/>' + lab(60.5, 23.5, '2', 14) +
      '<path class="s-c" d="M28.5 66V46M20 54L28.5 45L37 54" fill="none" stroke-width="5"/>'),
    "6e-ch1-s3": svg( // zéros inutiles : dans 03,50 les deux zéros barrés ne changent pas la valeur
      '<g opacity=".45"><rect class="f-b s-i" x="3" y="22" width="12" height="28" rx="4" stroke-width="2.4"/>' + lab(9, 36.5, '0', 14) + '</g>' +
      '<rect class="f-b s-i" x="19" y="22" width="12" height="28" rx="4" stroke-width="2.6"/>' + lab(25, 36.5, '3', 14) +
      '<circle class="f-i" cx="36.5" cy="46" r="2.8"/>' +
      '<rect class="f-b s-i" x="42" y="22" width="12" height="28" rx="4" stroke-width="2.6"/>' + lab(48, 36.5, '5', 14) +
      '<g opacity=".45"><rect class="f-b s-i" x="58" y="22" width="12" height="28" rx="4" stroke-width="2.4"/>' + lab(64, 36.5, '0', 14) + '</g>' +
      '<line class="s-c" x1="4" y1="50" x2="14" y2="22" stroke-width="4"/>' +
      '<line class="s-c" x1="59" y1="50" x2="69" y2="22" stroke-width="4"/>'),
    // 4e ch.3 : Divisibilité et nombres premiers
    "4e-ch3-s1": svg( // découverte des nombres premiers : une loupe sur 17
      '<circle class="f-b s-i" cx="31" cy="31" r="22" stroke-width="4"/>' +
      '<line class="s-c" x1="47" y1="47" x2="64" y2="64" stroke-width="9"/>' +
      lab(31, 32, '17', 19)),
    "4e-ch3-s2": svg( // décomposition : un arbre de facteurs (60 = 2 × 30, 30 = 2 × 15)
      '<g class="s-i" stroke-width="2.6"><line x1="30" y1="10" x2="14" y2="30"/><line x1="30" y1="10" x2="46" y2="30"/>' +
      '<line x1="46" y1="30" x2="34" y2="52"/><line x1="46" y1="30" x2="58" y2="52"/></g>' +
      '<circle class="f-b s-i" cx="30" cy="10" r="8.5" stroke-width="2.6"/>' + lab(30, 10.5, '60', 9.5) +
      '<circle class="f-c s-i" cx="14" cy="30" r="7.5" stroke-width="2.6"/><text class="tx f-b" x="14" y="30.5" text-anchor="middle" dominant-baseline="central" font-size="10.5">2</text>' +
      '<circle class="f-b s-i" cx="46" cy="30" r="8.5" stroke-width="2.6"/>' + lab(46, 30.5, '30', 9.5) +
      '<circle class="f-c s-i" cx="34" cy="53" r="7.5" stroke-width="2.6"/><text class="tx f-b" x="34" y="53.5" text-anchor="middle" dominant-baseline="central" font-size="10.5">2</text>' +
      '<circle class="f-b s-i" cx="58" cy="53" r="8.5" stroke-width="2.6"/>' + lab(58, 53.5, '15', 9.5)),
    "4e-ch3-s3": svg( // simplifier une fraction : 6/9 devient 2/3
      lab(13, 20, '6', 17) + '<line class="s-i" x1="3" y1="36" x2="23" y2="36" stroke-width="3"/>' + lab(13, 52, '9', 17) +
      '<path class="s-c" d="M27 36H35M32 30L38 36L32 42" fill="none" stroke-width="4"/>' +
      '<text class="tx f-c" x="57" y="20" text-anchor="middle" dominant-baseline="central" font-size="17">2</text>' +
      '<line class="s-c" x1="47" y1="36" x2="67" y2="36" stroke-width="3"/>' +
      '<text class="tx f-c" x="57" y="52" text-anchor="middle" dominant-baseline="central" font-size="17">3</text>'),
    "4e-ch3-s4": svg( // problèmes de répartition : un bouquet
      '<g class="s-i" stroke-width="2.6"><line x1="21" y1="26" x2="36" y2="46"/><line x1="36" y1="22" x2="36" y2="46"/><line x1="51" y1="26" x2="36" y2="46"/></g>' +
      '<circle class="f-s s-i" cx="20" cy="19" r="8" stroke-width="2.8"/>' +
      '<circle class="f-b s-i" cx="36" cy="13" r="8" stroke-width="2.8"/>' +
      '<circle class="f-s s-i" cx="52" cy="19" r="8" stroke-width="2.8"/>' +
      '<path class="f-c s-i" d="M18 36H54L36 66Z" stroke-width="3.2"/>'),
    "4e-ch3-s5": svg( // répartition en groupe (AP) : trois élèves
      '<circle class="f-c s-i" cx="15" cy="27" r="7.5" stroke-width="2.8"/><path class="f-c s-i" d="M4 56A11 11 0 0 1 26 56Z" stroke-width="2.8"/>' +
      '<circle class="f-s s-i" cx="57" cy="27" r="7.5" stroke-width="2.8"/><path class="f-s s-i" d="M46 56A11 11 0 0 1 68 56Z" stroke-width="2.8"/>' +
      '<circle class="f-b s-i" cx="36" cy="22" r="8.5" stroke-width="3"/><path class="f-b s-i" d="M23 56A13 13 0 0 1 49 56Z" stroke-width="3"/>'),
    // 4e ch.2 : Grandeurs quotients et produits
    "4e-ch2-s1": svg( // la vitesse : une voiture lancée
      '<line class="s-c" x1="3" y1="34" x2="13" y2="34" stroke-width="4"/>' +
      '<line class="s-c" x1="3" y1="43" x2="11" y2="43" stroke-width="4"/>' +
      '<line class="s-c" x1="3" y1="52" x2="13" y2="52" stroke-width="4"/>' +
      '<path class="f-b s-i" d="M24 38L32 24H49L57 38Z" stroke-width="3"/>' +
      '<rect class="f-c s-i" x="14" y="36" width="52" height="18" rx="7" stroke-width="3.2"/>' +
      '<circle class="f-i" cx="28" cy="55" r="8"/><circle class="f-b" cx="28" cy="55" r="3"/>' +
      '<circle class="f-i" cx="53" cy="55" r="8"/><circle class="f-b" cx="53" cy="55" r="3"/>'),
    "4e-ch2-s2": svg( // le débit et la densité : un robinet qui coule
      '<rect class="f-s s-i" x="14" y="6" width="16" height="7" rx="2.5" stroke-width="2.6"/>' +
      '<rect class="f-b s-i" x="6" y="13" width="40" height="14" rx="5" stroke-width="3"/>' +
      '<rect class="f-b s-i" x="31" y="27" width="15" height="11" rx="3" stroke-width="3"/>' +
      '<path class="f-c s-i" d="M38.5 42C33 50 32 55 38.5 55C45 55 44 50 38.5 42Z" stroke-width="2.6"/>' +
      '<path class="f-c s-i" d="M38.5 58C35 63 34.5 66 38.5 66C42.5 66 42 63 38.5 58Z" stroke-width="2.4"/>'),
    "4e-ch2-s3": svg( // aire, volume et énergie : l'éclair
      '<path class="f-s s-i" d="M42 5L17 40H34L27 67L56 29H39Z" stroke-width="3.4"/>'),
    "4e-ch2-s4": svg( // bilan du chapitre : la coupe
      '<path class="s-i" d="M22 16H11V22A11 11 0 0 0 23 33M50 16H61V22A11 11 0 0 1 49 33" fill="none" stroke-width="3"/>' +
      '<path class="f-s s-i" d="M22 9H50V28A14 14 0 0 1 22 28Z" stroke-width="3.2"/>' +
      '<rect class="f-b s-i" x="32" y="43" width="8" height="10" stroke-width="2.6"/>' +
      '<rect class="f-c s-i" x="22" y="53" width="28" height="9" rx="3" stroke-width="3"/>'),
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
    "4e-ch4-s5": svg(tri([12, 54, 60, 54], 's-s', lab(5, 36, '3', 13) + lab(36, 64, '?', 16) + lab(47, 28, '5', 13))), // côté de l'angle droit
    "4e-ch4-s6": svg( // problèmes : une échelle contre un mur
      '<rect class="f-b s-i" x="46" y="8" width="20" height="52" stroke-width="3"/>' +
      '<line class="s-i" x1="5" y1="60" x2="67" y2="60" stroke-width="3.2"/>' +
      '<line class="s-i" x1="19" y1="58" x2="46" y2="12" stroke-width="10"/>' +
      '<line class="s-s" x1="19" y1="58" x2="46" y2="12" stroke-width="5"/>' +
      '<path class="s-i" d="M26.5 45H33.5M31 37H38M35.5 29H42.5" fill="none" stroke-width="2.2"/>' +
      '<path class="s-i" d="M38 60V52H46" fill="none" stroke-width="2.2"/>')  // le pied de l'échelle et le mur : un angle droit
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
