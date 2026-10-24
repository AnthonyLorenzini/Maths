/* Énigmes du jour : des énigmes de LOGIQUE (pas de calcul), chacune avec son schéma.
   Chaque énigme : { id, genre, niv (1 facile à 3 costaud), titre, q, indice, fig(solution), rep, expl }.
   - fig(false) dessine l'énoncé ; fig(true) dessine la solution (avec animation à l'apparition).
   - q, rep, expl : texte simple, \n = retour à la ligne, **gras** accepté pour rep et expl.
   - L'énigme du jour est choisie d'après la date : ENIGMES[numéro du jour % nombre d'énigmes].
   Pour en ajouter une : copier une entrée, la mettre dans la liste (ordre = ordre des jours). */
(function () {
  var C = {
    encre: '#1B2333', gris: '#596379', trait: '#C9D1E3', fond: '#F6F8FD', blanc: '#FFFFFF',
    vert: '#0F9562', vertc: '#DDF6EA', orange: '#E8700F', orangec: '#FFEBD9',
    violet: '#6E4FE0', violetc: '#ECE6FF', soleil: '#FFC93C', soleilc: '#FFF4D1',
    ciel: '#A9DCFF', cielc: '#E3F3FF', rouge: '#D9433B', rougec: '#FFE3E0',
    bleu: '#2F7BFF', bois: '#E9B44C'
  };
  var svg = function (h, inner, label) {
    return '<svg viewBox="0 0 320 ' + h + '" role="img" aria-label="' + label + '">' + inner + '</svg>';
  };
  var t = function (x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.a || 'middle') + '" font-size="' + (o.s || 13) +
      '" font-weight="' + (o.w || 700) + '" fill="' + (o.f || C.encre) + '"' + (o.st ? ' style="' + o.st + '"' : '') + '>' + s + '</text>';
  };
  var em = function (x, y, e, s) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="' + (s || 32) + '">' + e + '</text>';
  };
  var rect = function (x, y, w, h, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r == null ? 6 : o.r) +
      '" fill="' + (o.f || 'none') + '" stroke="' + (o.s || 'none') + '" stroke-width="' + (o.w || 0) + '"' +
      (o.d ? ' stroke-dasharray="' + o.d + '"' : '') + (o.st ? ' style="' + o.st + '"' : '') + '/>';
  };
  var line = function (x1, y1, x2, y2, c, w, extra) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"' + (extra || '') + '/>';
  };
  /* animation d'apparition (classe .ap définie dans index.html) : i = rang dans la séquence */
  var pop = function (i, extra) {
    return 'class="ap" style="animation-delay:' + (0.15 + i * 0.18).toFixed(2) + 's;' + (extra || '') + '"';
  };
  var g = function (i, inner, extra) { return '<g ' + pop(i, extra) + '>' + inner + '</g>'; };
  var cercle = function (x, y, r, f, s, w) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + f + '" stroke="' + (s || 'none') + '" stroke-width="' + (w || 0) + '"/>';
  };
  var tri = function (cx, cy, r, f) {
    return '<polygon points="' + cx + ',' + (cy - r) + ' ' + (cx + r * 0.95).toFixed(1) + ',' + (cy + r * 0.7).toFixed(1) + ' ' + (cx - r * 0.95).toFixed(1) + ',' + (cy + r * 0.7).toFixed(1) + '" fill="' + f + '"/>';
  };
  var etoile = function (cx, cy, R, r, f) {
    var p = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + i * Math.PI / 5, k = i % 2 ? r : R;
      p.push((cx + k * Math.cos(a)).toFixed(1) + ',' + (cy + k * Math.sin(a)).toFixed(1));
    }
    return '<polygon points="' + p.join(' ') + '" fill="' + f + '" stroke="#B88400" stroke-width="1"/>';
  };
  var coche = function (x, y, s) {
    return '<path d="M' + (x - 7 * s) + ',' + y + ' l' + (5 * s) + ',' + (6 * s) + ' l' + (10 * s) + ',' + (-13 * s) + '" fill="none" stroke="' + C.vert + '" stroke-width="' + (3.4 * s) + '" stroke-linecap="round" stroke-linejoin="round"/>';
  };
  var croix = function (x, y, s) {
    return '<path d="M' + (x - 6 * s) + ',' + (y - 6 * s) + ' l' + (12 * s) + ',' + (12 * s) + ' m' + (-12 * s) + ',0 l' + (12 * s) + ',' + (-12 * s) + '" fill="none" stroke="' + C.rouge + '" stroke-width="' + (3.2 * s) + '" stroke-linecap="round"/>';
  };

  /* ---------- 0 · Loup, chèvre et chou ---------- */
  var riviere = {
    id: 'riviere', genre: 'Traversée', niv: 1, titre: 'Loup, chèvre et chou',
    q: 'Un paysan doit traverser une rivière avec un loup, une chèvre et un chou. Sa barque ne peut porter que lui et un seul des trois.\nSi le paysan s’éloigne, le loup mange la chèvre, et la chèvre mange le chou.\nComment fait-il passer les trois de l’autre côté ?',
    indice: 'Le loup ne s’intéresse pas au chou : il y a un animal qu’on ne peut jamais laisser seul avec les deux autres. Et le paysan a le droit de ramener quelqu’un en arrière.',
    fig: function (s) {
      var gauche = [[28, 96, '🐺'], [62, 96, '🐐'], [45, 138, '🥬']], droite = [[258, 96, '🐺'], [292, 96, '🐐'], [275, 138, '🥬']];
      var its = (s ? droite : gauche).map(function (p, i) { return s ? g(i, em(p[0], p[1], p[2], 30)) : em(p[0], p[1], p[2], 30); }).join('');
      var vagues = '<path d="M92 92 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".9"/>' +
        '<path d="M92 150 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#fff" stroke-width="2.4" opacity=".9"/>';
      var bateau = s ? g(3, em(204, 122, '🚣', 34)) : em(118, 122, '🚣', 34);
      return svg(170,
        rect(0, 50, 86, 120, { f: C.vertc, r: 0 }) + rect(234, 50, 86, 120, { f: C.vertc, r: 0 }) +
        rect(86, 50, 148, 120, { f: C.cielc, r: 0 }) + vagues +
        t(43, 38, 'Départ', { f: C.gris, s: 12 }) + t(277, 38, 'Arrivée', { f: C.gris, s: 12 }) +
        (s ? t(160, 38, '7 traversées', { f: C.violet, s: 13 }) : '') + its + bateau,
        'Une rivière, une barque, un loup, une chèvre et un chou sur la rive de départ');
    },
    rep: '**La chèvre d’abord**, puis le loup, puis le chou, en ramenant la chèvre au milieu du voyage.',
    expl: '1. Il emmène la chèvre.\n2. Il revient seul.\n3. Il emmène le loup.\n4. Il **ramène la chèvre**.\n5. Il emmène le chou.\n6. Il revient seul.\n7. Il emmène la chèvre.\nLe loup et le chou peuvent rester ensemble : c’est la chèvre qu’on ne laisse jamais seule avec l’un d’eux.'
  };

  /* ---------- 1 · Les six verres ---------- */
  var verres = {
    id: 'verres', genre: 'Astuce', niv: 1, titre: 'Les six verres',
    q: 'Six verres sont alignés : les trois premiers sont pleins, les trois derniers sont vides.\nEn ne touchant qu’à UN SEUL verre, comment obtenir une alternance : plein, vide, plein, vide, plein, vide ?',
    indice: 'Tu n’as pas le droit de déplacer plusieurs verres… mais tu peux vider un verre dans un autre.',
    fig: function (s) {
      var etat = s ? [1, 0, 1, 0, 1, 0] : [1, 1, 1, 0, 0, 0], out = '';
      for (var i = 0; i < 6; i++) {
        var x = 34 + i * 50, y = 52, anim = s && (i === 1 || i === 4);
        if (etat[i]) out += '<polygon points="' + (x - 14.1) + ',' + (y + 12) + ' ' + (x + 14.1) + ',' + (y + 12) + ' ' + (x + 11) + ',' + (y + 52) + ' ' + (x - 11) + ',' + (y + 52) + '" fill="' + C.ciel + '"' + (anim ? ' class="ap" style="animation-delay:.6s"' : '') + '/>';
        out += '<path d="M' + (x - 15) + ',' + y + ' L' + (x + 15) + ',' + y + ' L' + (x + 11) + ',' + (y + 52) + ' L' + (x - 11) + ',' + (y + 52) + ' Z" fill="none" stroke="' + C.encre + '" stroke-width="2.4" stroke-linejoin="round"/>';
        out += t(x, y + 76, i + 1, { f: C.gris });
      }
      if (s) out += g(0, '<path d="M84 42 Q159 -4 234 42" fill="none" stroke="' + C.violet + '" stroke-width="3.4" stroke-linecap="round"/><polygon points="226,33 242,34 235,48" fill="' + C.violet + '"/>');
      return svg(140, out, 'Six verres alignés : trois pleins puis trois vides');
    },
    rep: '**On verse le contenu du 2ᵉ verre dans le 5ᵉ.**',
    expl: 'Après avoir vidé le 2ᵉ verre dans le 5ᵉ, on a : plein, vide, plein, vide, plein, vide.\nL’astuce : on n’a pas déplacé de verre, on a déplacé le contenu.'
  };

  /* ---------- 2 · Menteurs et sincères ---------- */
  var menteurs = {
    id: 'menteurs', genre: 'Menteurs', niv: 2, titre: 'Sur l’île des menteurs',
    q: 'Sur cette île, chaque habitant dit TOUJOURS la vérité ou ment TOUJOURS.\nTu rencontres Ali, Bao et Cléo :\n• Ali dit : « Bao ment. »\n• Bao dit : « Cléo ment. »\n• Cléo dit : « Ali et Bao mentent tous les deux. »\nQui dit la vérité ?',
    indice: 'Commence par supposer que Cléo dit la vérité, et regarde si on arrive à une contradiction.',
    fig: function (s) {
      var pers = [{ x: 55, n: 'Ali', e: '👦', l: ['« Bao ment. »'], v: false }, { x: 160, n: 'Bao', e: '🧑', l: ['« Cléo ment. »'], v: true }, { x: 265, n: 'Cléo', e: '👧', l: ['« Ali et Bao', 'mentent tous', 'les deux. »'], v: false }], out = '';
      pers.forEach(function (p, i) {
        var h = 66, y0 = 8, base = p.l.length === 1 ? 45 : 29;
        out += rect(p.x - 50, y0, 100, h, { f: C.blanc, s: C.trait, w: 2, r: 12 }) + '<polygon points="' + (p.x - 8) + ',' + (y0 + h - 1) + ' ' + (p.x + 8) + ',' + (y0 + h - 1) + ' ' + p.x + ',' + (y0 + h + 12) + '" fill="' + C.blanc + '" stroke="' + C.trait + '" stroke-width="2"/>' +
          rect(p.x - 7, y0 + h - 3, 14, 5, { f: C.blanc, r: 0 });
        p.l.forEach(function (l, k) { out += t(p.x, base + k * 15, l, { s: 12.5, w: 700 }); });
        out += em(p.x, 132, p.e, 44) + t(p.x, 174, p.n, { s: 14 });
        if (s) out += g(i, cercle(p.x, 118, 31, 'none', p.v ? C.vert : C.rouge, 4) + t(p.x, 192, p.v ? 'dit vrai ✓' : 'ment ✗', { f: p.v ? C.vert : C.rouge, s: 13.5 }));
      });
      return svg(198, out, 'Trois habitants de l’île avec ce que chacun affirme');
    },
    rep: '**Seul Bao dit la vérité.** Ali et Cléo mentent.',
    expl: 'Si Cléo disait vrai, Ali et Bao mentiraient. Mais Ali dirait alors « Bao ment », ce qui serait… vrai : contradiction. Donc **Cléo ment**.\nCléo ment, donc Ali et Bao ne mentent pas tous les deux : au moins un des deux dit vrai.\nBao affirme que Cléo ment, et c’est exact : **Bao dit la vérité**. Ali affirme que Bao ment, c’est faux : Ali ment.'
  };

  /* ---------- 3 · Les trois boîtes mal étiquetées ---------- */
  var boites = {
    id: 'boites', genre: 'Déduction', niv: 2, titre: 'Les trois boîtes',
    q: 'Trois boîtes contiennent : l’une uniquement des pommes, l’autre uniquement des oranges, la dernière un mélange de pommes et d’oranges.\nLes trois étiquettes sont FAUSSES : aucune ne correspond au contenu de sa boîte.\nTu peux piocher UN fruit, sans regarder, dans UNE seule boîte. Laquelle choisis-tu pour deviner le contenu des trois ?',
    indice: 'Quelle boîte est la plus informative : celle dont l’étiquette dit « mélange » (donc qui n’en contient pas), ou une autre ?',
    fig: function (s) {
      var xs = [14, 112, 210], noms = ['Pommes', 'Oranges', 'Mélange'], ico = ['🍎', '🍊', '🍎🍊'], out = '';
      xs.forEach(function (x, i) {
        out += '<polygon points="' + x + ',50 ' + (x + 96) + ',50 ' + (x + 88) + ',38 ' + (x + 8) + ',38" fill="#D9B27C" stroke="' + C.encre + '" stroke-width="2"/>' +
          rect(x, 50, 96, 58, { f: '#EBC891', s: C.encre, w: 2, r: 3 }) +
          rect(x + 10, 62, 76, 34, { f: C.blanc, s: C.trait, w: 1.5, r: 4 }) + t(x + 48, 84, noms[i], { s: 14 }) +
          em(x + 48, 30, ico[i], 24);
      });
      if (s) {
        out += t(160, 130, 'Si on pioche une pomme dans la boîte « Mélange » :', { s: 12.5, f: C.violet });
        var vrai = ['🍊', '🍎🍊', '🍎'];
        xs.forEach(function (x, i) { out += g(i, em(x + 48, 168, vrai[i], 28) + t(x + 48, 186, ['oranges', 'mélange', 'pommes'][i], { s: 12.5, f: C.gris })); });
        out += rect(206, 45, 104, 66, { f: 'none', s: C.violet, w: 3.5, r: 8, st: 'animation:fond .6s ease-out backwards' });
      } else {
        out += t(160, 140, 'Aucune étiquette n’est la bonne.', { f: C.gris, s: 13 });
      }
      return svg(196, out, 'Trois boîtes étiquetées Pommes, Oranges et Mélange');
    },
    rep: '**Dans la boîte étiquetée « Mélange ».**',
    expl: 'Son étiquette est fausse : elle ne contient donc PAS le mélange, mais une seule sorte de fruit. Disons qu’on en sort une pomme : c’est la boîte des pommes.\nLa boîte étiquetée « Oranges » ne contient pas d’oranges (étiquette fausse) ni des pommes (déjà trouvées) : c’est le mélange.\nIl reste les oranges dans la boîte étiquetée « Pommes ». (Si on sort une orange, c’est symétrique.)'
  };

  /* ---------- 4 · Qui a mangé le gâteau ? ---------- */
  var gateau = {
    id: 'gateau', genre: 'Enquête', niv: 2, titre: 'Qui a mangé le gâteau ?',
    q: 'Le gâteau a disparu ! Un seul des quatre suspects l’a mangé. Voici leurs déclarations :\n• Ada : « Ce n’est pas Ben. »\n• Ben : « C’est Cléo. »\n• Cléo : « C’est Ada ou Dan. »\n• Dan : « Ce n’est pas moi. »\nUne seule de ces quatre phrases est vraie. Qui est le coupable ?',
    indice: 'Teste chaque suspect comme coupable, et compte combien de phrases seraient vraies. Il doit y en avoir exactement une.',
    fig: function (s) {
      var d = [{ n: 'Ada', c: C.violet, l: ['« Ce n’est', 'pas Ben. »'], v: false }, { n: 'Ben', c: C.orange, l: ['« C’est', 'Cléo. »'], v: false }, { n: 'Cléo', c: C.vert, l: ['« C’est Ada', 'ou Dan. »'], v: false }, { n: 'Dan', c: '#D19A00', l: ['« Ce n’est', 'pas moi. »'], v: true }], out = '';
      d.forEach(function (p, i) {
        var x = 8 + (i % 2) * 154, y = 6 + Math.floor(i / 2) * 94, coup = s && p.n === 'Ben';
        out += rect(x, y, 150, 86, { f: coup ? C.rougec : C.blanc, s: coup ? C.rouge : C.trait, w: 2, r: 12 }) +
          cercle(x + 28, y + 32, 19, p.c) + t(x + 28, y + 39, p.n[0], { f: C.blanc, s: 20 }) + t(x + 28, y + 72, p.n, { s: 13 }) +
          t(x + 56, y + 32, p.l[0], { a: 'start', s: 12.5 }) + t(x + 56, y + 48, p.l[1], { a: 'start', s: 12.5 });
        if (s) out += g(i, (p.v ? coche(x + 134, y + 16, 1.1) : croix(x + 134, y + 16, 1)) + (coup ? em(x + 134, y + 76, '🍰', 20) + t(x + 56, y + 72, 'coupable', { a: 'start', s: 12.5, f: C.rouge }) : ''));
      });
      return svg(196, out, 'Quatre suspects et ce que chacun déclare');
    },
    rep: '**C’est Ben.**',
    expl: 'Si c’est **Ben** : Ada dit « Ce n’est pas Ben » (faux), Ben dit « C’est Cléo » (faux), Cléo dit « C’est Ada ou Dan » (faux), Dan dit « Ce n’est pas moi » (vrai). Une seule phrase vraie ✓.\nSi c’était Ada, Cléo ou Dan, il y aurait deux ou trois phrases vraies : impossible.'
  };

  /* ---------- 5 · Les quatre cartes ---------- */
  var cartes = {
    id: 'cartes', genre: 'Piège logique', niv: 3, titre: 'Les quatre cartes',
    q: 'Quatre cartes sont posées sur la table. Chacune a une LETTRE sur une face et un CHIFFRE sur l’autre. Tu vois : E, K, 4 et 7.\nRègle à vérifier : « Si une carte porte une voyelle d’un côté, alors elle porte un nombre pair de l’autre. »\nQuelles cartes faut-il retourner, et seulement celles-là, pour être sûr que la règle est respectée ?',
    indice: 'Pour trouver une carte qui casse la règle, demande-toi : quelles cartes pourraient cacher « une voyelle avec un nombre impair » ?',
    fig: function (s) {
      var xs = [20, 95, 170, 245], v = ['E', 'K', '4', '7'], sel = [1, 0, 0, 1], out = t(160, 24, 'Règle : voyelle ⇒ nombre pair de l’autre côté', { s: 12, f: C.gris });
      xs.forEach(function (x, i) {
        var on = s && sel[i], off = s && !sel[i];
        out += '<g' + (off ? ' opacity=".35"' : '') + '>' + rect(x, 42, 60, 88, { f: on ? C.soleilc : C.blanc, s: on ? C.orange : C.encre, w: on ? 4 : 2.5, r: 9 }) + t(x + 30, 100, v[i], { s: 38, f: C.encre }) + '</g>';
        if (on) out += g(i, t(x + 30, 156, '↻ retourner', { s: 12.5, f: C.orange }));
        if (off) out += t(x + 30, 156, 'inutile', { s: 12, f: C.gris, w: 400 });
      });
      return svg(170, out, 'Quatre cartes visibles : E, K, 4 et 7');
    },
    rep: '**Il faut retourner E et 7.**',
    expl: '• **E** : c’est une voyelle, on doit vérifier que son autre face est un nombre pair.\n• **7** : si on trouvait une voyelle derrière, la règle serait violée.\n• K : ce n’est pas une voyelle, la règle ne dit rien sur lui.\n• 4 : même avec une consonne derrière, il ne contredit pas la règle (elle ne dit pas que seules les voyelles vont avec des pairs).'
  };

  /* ---------- 6 · Les trois interrupteurs ---------- */
  var interrupteurs = {
    id: 'interrupteurs', genre: 'Déduction', niv: 2, titre: 'Les trois interrupteurs',
    q: 'Dans un couloir, trois interrupteurs, tous éteints. L’un d’eux commande une ampoule à filament, dans une pièce fermée : depuis le couloir, on ne voit rien de la pièce.\nTu peux manipuler les interrupteurs autant que tu veux, mais tu n’as le droit d’entrer dans la pièce qu’UNE SEULE fois. Comment savoir quel interrupteur commande l’ampoule ?',
    indice: 'Une ampoule allumée éclaire… mais elle fait aussi autre chose que tu peux sentir avec la main.',
    fig: function (s) {
      var bulb = function (x, y, f, rays, heat) {
        var o = '';
        if (rays) for (var a = 0; a < 8; a++) { var r = a * Math.PI / 4; o += line((x + 30 * Math.cos(r)).toFixed(1), (y + 30 * Math.sin(r)).toFixed(1), (x + 40 * Math.cos(r)).toFixed(1), (y + 40 * Math.sin(r)).toFixed(1), C.soleil, 3); }
        if (heat) o += '<path d="M' + (x - 10) + ' ' + (y - 28) + ' q-5 -6 0 -12 t0 -12 M' + (x + 10) + ' ' + (y - 28) + ' q-5 -6 0 -12 t0 -12" fill="none" stroke="' + C.orange + '" stroke-width="2.6" stroke-linecap="round"/>';
        return o + cercle(x, y, 22, f, C.encre, 2.4) + rect(x - 10, y + 18, 20, 14, { f: '#C9D0E0', s: C.encre, w: 2, r: 3 });
      };
      if (s) {
        var cas = [{ x: 56, f: C.soleil, r: 1, h: 0, a: 'Allumée', n: 'n° 2' }, { x: 160, f: '#F3D2B8', r: 0, h: 1, a: 'Éteinte, chaude', n: 'n° 1' }, { x: 264, f: '#DCE7F5', r: 0, h: 0, a: 'Éteinte, froide', n: 'n° 3' }], out = '';
        cas.forEach(function (c, i) { out += g(i, bulb(c.x, 78, c.f, c.r, c.h) + t(c.x, 140, c.a, { s: 12.5, f: C.gris }) + t(c.x, 164, '→ ' + c.n, { s: 17, f: C.violet })); });
        return svg(180, out, 'Les trois cas possibles : ampoule allumée, éteinte et chaude, éteinte et froide');
      }
      var out2 = rect(8, 20, 162, 110, { f: C.fond, s: C.trait, w: 2, r: 12 });
      [45, 89, 133].forEach(function (x, i) {
        out2 += rect(x - 15, 40, 30, 56, { f: C.blanc, s: C.encre, w: 2.2, r: 6 }) + rect(x - 10, 70, 20, 20, { f: C.trait, s: C.gris, w: 1.5, r: 4 }) + t(x, 118, i + 1, { s: 15 });
      });
      out2 += t(89, 150, 'Le couloir', { f: C.gris, s: 12.5 }) +
        rect(196, 20, 116, 118, { f: 'none', s: C.gris, w: 2.4, r: 10, d: '7 6' }) + bulb(254, 70, '#E6EAF3', 0, 0) + t(254, 76, '?', { s: 22, f: C.gris }) +
        t(254, 158, 'Pièce fermée', { f: C.gris, s: 12.5 }) + t(254, 174, '(une seule visite)', { f: C.gris, s: 11.5, w: 400 });
      return svg(184, out2, 'Trois interrupteurs dans un couloir, une ampoule dans une pièce fermée');
    },
    rep: '**Allume l’interrupteur 1 pendant quelques minutes, puis éteins-le. Allume le 2 et entre dans la pièce.**',
    expl: '• Ampoule **allumée** → c’est l’interrupteur **2**.\n• Ampoule éteinte mais **chaude** → c’est le **1** (allumé un moment avant).\n• Ampoule éteinte et **froide** → c’est le **3** (jamais touché).\nL’astuce : la chaleur est une information qu’on peut sentir même quand la lumière est éteinte.'
  };

  /* ---------- 7 · Les animaux d’Anna, Bob et Chloé ---------- */
  var animaux = {
    id: 'animaux', genre: 'Grille logique', niv: 1, titre: 'Un animal chacun',
    q: 'Anna, Bob et Chloé ont chacun un animal différent : un chat, un chien ou un poisson.\n• Le chat n’appartient ni à Anna, ni à Bob.\n• Bob n’a pas de poisson.\n• Anna n’a pas de chien.\nQui a quel animal ?',
    indice: 'Commence par l’indice qui te dit le plus : à qui peut appartenir le chat ?',
    fig: function (s) {
      var noms = ['Anna', 'Bob', 'Chloé'], an = ['🐱', '🐶', '🐟'], sol = [2, 1, 0], out = '';
      an.forEach(function (a, j) { out += em(150 + j * 56, 52, a, 30); });
      noms.forEach(function (n, i) {
        out += t(14, 100 + i * 46, n, { a: 'start', s: 15 });
        an.forEach(function (a, j) {
          var x = 122 + j * 56, y = 72 + i * 46, ok = sol[i] === j;
          out += rect(x, y, 56, 46, { f: s && ok ? C.vertc : C.blanc, s: C.trait, w: 2, r: 0 });
          if (s) out += g(i * 3 + j, ok ? coche(x + 28, y + 24, 1.2) : croix(x + 28, y + 24, 0.8), ok ? '' : 'opacity:.65');
        });
      });
      return svg(214, out, 'Tableau à remplir : trois personnes et trois animaux');
    },
    rep: '**Anna a le poisson, Bob a le chien, Chloé a le chat.**',
    expl: 'Le chat n’est ni à Anna ni à Bob : il est à **Chloé**.\nBob n’a pas le poisson et le chat est pris : il a le **chien**.\nIl reste le **poisson** pour Anna (et elle n’a bien pas de chien).'
  };

  /* ---------- 8 · Le code du cadenas ---------- */
  var cadenas = {
    id: 'cadenas', genre: 'Code secret', niv: 2, titre: 'Le code du cadenas',
    q: 'Un cadenas s’ouvre avec un code à 3 chiffres. Voici cinq essais avec leur indice :\nTrouve le code.',
    indice: 'Commence par l’essai 7 3 8 : tous ses chiffres sont à éliminer. Que peux-tu en déduire sur les autres essais ?',
    fig: function (s) {
      var essais = [[[6, 8, 2], '1 chiffre juste, bien placé'], [[6, 1, 4], '1 chiffre juste, mal placé'], [[2, 0, 6], '2 chiffres justes, mal placés'], [[7, 3, 8], 'aucun chiffre juste'], [[7, 8, 0], '1 chiffre juste, mal placé']], out = '';
      essais.forEach(function (e, i) {
        var y = 8 + i * 34;
        e[0].forEach(function (c, j) { out += rect(16 + j * 30, y, 26, 28, { f: C.violetc, s: C.violet, w: 1.8, r: 6 }) + t(29 + j * 30, y + 20, c, { s: 16, f: C.violet }); });
        out += t(112, y + 19, e[1], { a: 'start', s: 12.5 });
      });
      var code = s ? ['0', '4', '2'] : ['?', '?', '?'];
      out += em(96, 222, s ? '🔓' : '🔒', 30);
      code.forEach(function (c, j) {
        var x = 124 + j * 46;
        out += (s ? g(j, rect(x, 196, 40, 40, { f: C.vertc, s: C.vert, w: 3, r: 8 }) + t(x + 20, 226, c, { s: 26, f: C.vert })) : rect(x, 196, 40, 40, { f: C.blanc, s: C.encre, w: 2.4, r: 8 }) + t(x + 20, 226, c, { s: 26, f: C.gris }));
      });
      return svg(246, out, 'Cinq essais de code avec leur indice, et le cadenas à ouvrir');
    },
    rep: '**Le code est 0 4 2.**',
    expl: '1. **7 3 8** : aucun chiffre juste → on barre 7, 3 et 8.\n2. **7 8 0** : un seul chiffre juste, et ce n’est ni le 7 ni le 8 : c’est le **0**, mal placé (donc pas en 3ᵉ position).\n3. Le **6** n’est pas dans le code : en 1ʳᵉ position il serait bien placé dans 6 1 4 (qui annonce « mal placé »), et ailleurs il serait mal placé dans 6 8 2 (qui annonce un chiffre bien placé).\n4. **2 0 6** : deux chiffres justes → le 0 et le **2**. Dans 6 8 2, le chiffre bien placé est donc le 2 : il est en 3ᵉ position.\n5. Le 0 n’est ni en 2ᵉ position (essai 2 0 6) ni en 3ᵉ : il est en 1ʳᵉ.\n6. **6 1 4** : le chiffre juste est le 1 ou le 4. Le 1 serait bien placé (2ᵉ position), or l’essai dit « mal placé » : c’est le **4**.\nCode : **0 4 2**.'
  };

  /* ---------- 9 · Traverser le pont ---------- */
  var pont = {
    id: 'pont', genre: 'Optimisation', niv: 3, titre: 'Le pont dans la nuit',
    q: 'Quatre amis doivent traverser un pont, de nuit. Ils n’ont qu’une seule lampe torche, et le pont ne supporte que DEUX personnes à la fois. Quand ils sont deux, ils marchent à la vitesse du plus lent.\nIls mettent respectivement 1, 2, 5 et 10 minutes pour traverser.\nEn combien de minutes au minimum peuvent-ils tous passer ?',
    indice: 'Quelqu’un doit ramener la lampe à chaque fois. Qui vaut mieux choisir ? Et que faire des deux plus lents ?',
    fig: function (s) {
      var out = '';
      if (!s) {
        [[44, '1', C.violet], [128, '2', C.orange], [212, '5', C.vert]].concat([[296, '10', '#D19A00']]).forEach(function (p, i) {
          out += cercle(p[0] - 0, 38, 20, p[2]) + t(p[0], 45, p[1], { f: C.blanc, s: 19 }) + t(p[0], 76, p[1] + ' min', { s: 12.5 });
        });
        out += rect(0, 124, 82, 66, { f: C.vertc, r: 0 }) + rect(238, 124, 82, 66, { f: C.vertc, r: 0 }) +
          rect(82, 150, 156, 40, { f: C.cielc, r: 0 }) + rect(72, 120, 176, 9, { f: '#B98B54', s: C.encre, w: 1.5, r: 2 }) +
          em(30, 118, '🔦', 26) + em(290, 108, '🌙', 22) + t(160, 112, 'pont : 2 personnes maximum', { s: 11.5, f: C.gris, w: 400 }) +
          t(160, 175, 'Il fait nuit.', { s: 12, f: C.gris, w: 400 });
        return svg(196, out, 'Quatre personnes qui mettent 1, 2, 5 et 10 minutes, un pont et une lampe');
      }
      var pas = [['1 et 2 traversent', '2 min'], ['le 1 revient avec la lampe', '1 min'], ['5 et 10 traversent', '10 min'], ['le 2 revient avec la lampe', '2 min'], ['1 et 2 traversent', '2 min']];
      pas.forEach(function (p, i) {
        var y = 6 + i * 31;
        out += g(i, rect(10, y, 300, 27, { f: i === 2 ? C.orangec : C.blanc, s: C.trait, w: 1.6, r: 8 }) + cercle(28, y + 13.5, 10, C.violet) + t(28, y + 18.5, i + 1, { f: C.blanc, s: 13 }) + t(46, y + 18.5, p[0], { a: 'start', s: 13 }) + t(298, y + 18.5, p[1], { a: 'end', s: 13, f: C.violet }));
      });
      out += g(5, t(160, 186, '2 + 1 + 10 + 2 + 2 = 17 minutes', { s: 15, f: C.vert }));
      return svg(196, out, 'Les cinq traversées de la meilleure solution');
    },
    rep: '**17 minutes.**',
    expl: '1. Le 1 et le 2 traversent (2 min).\n2. Le 1 ramène la lampe (1 min).\n3. Le 5 et le 10 traversent **ensemble** (10 min) : les deux plus lents voyagent en même temps.\n4. Le 2 ramène la lampe (2 min).\n5. Le 1 et le 2 traversent (2 min).\nTotal : 17 minutes. (Faire revenir le 1 à chaque fois donnerait 19 minutes.)'
  };

  /* ---------- 10 · La grille des formes ---------- */
  var matrice = {
    id: 'matrice', genre: 'Suite logique', niv: 1, titre: 'La grille des formes',
    q: 'Observe bien cette grille : elle suit une règle. Quelle figure faut-il dessiner dans la case vide (forme ET couleur) ?',
    indice: 'Regarde ce qui se répète dans chaque ligne et dans chaque colonne.',
    fig: function (s) {
      var F = ['rond', 'carré', 'triangle'], K = [C.violet, C.orange, C.vert], out = '';
      var forme = function (f, c, cx, cy) {
        return f === 'rond' ? cercle(cx, cy, 17, c) : f === 'carré' ? rect(cx - 15, cy - 15, 30, 30, { f: c, r: 3 }) : tri(cx, cy + 1, 19, c);
      };
      for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) {
        var x = 82 + c * 56, y = 12 + r * 56, cx = x + 26, cy = y + 26;
        if (r === 2 && c === 2) {
          out += s ? g(0, rect(x, y, 52, 52, { f: C.soleilc, s: C.orange, w: 2.5, r: 10 }) + forme('carré', K[0], cx, cy))
            : rect(x, y, 52, 52, { f: C.soleilc, s: C.orange, w: 2.5, r: 10, d: '5 4' }) + t(cx, cy + 9, '?', { s: 28, f: C.orange });
        } else {
          out += rect(x, y, 52, 52, { f: C.blanc, s: C.trait, w: 2, r: 10 }) + forme(F[(r + c) % 3], K[(r + 2 * c) % 3], cx, cy);
        }
      }
      return svg(184, out, 'Une grille de trois lignes et trois colonnes de formes colorées, la dernière case est vide');
    },
    rep: '**Un carré violet.**',
    expl: 'Dans chaque ligne et dans chaque colonne, on trouve **une fois** chaque forme (rond, carré, triangle) et **une fois** chaque couleur (violet, orange, vert).\nDans la dernière ligne, il y a déjà un triangle vert et un rond orange : il manque le **carré** et le **violet**.'
  };

  /* ---------- 11 · Les deux gardiens ---------- */
  var gardiens = {
    id: 'gardiens', genre: 'Menteurs', niv: 3, titre: 'Les deux gardiens',
    q: 'Devant toi, deux portes : l’une mène à la liberté, l’autre à un piège. Deux gardiens les surveillent : l’un dit toujours la vérité, l’autre ment toujours, mais tu ne sais pas lequel est lequel.\nTu peux poser UNE seule question, à UN seul des gardiens. Quelle question te permet de choisir la bonne porte ?',
    indice: 'Fais parler un gardien… de ce que dirait l’autre. Le menteur et le sincère se « compensent ».',
    fig: function (s) {
      var door = function (x, n, ico) {
        return '<path d="M' + x + ' 140 V 84 A 33 24 0 0 1 ' + (x + 66) + ' 84 V 140 Z" fill="#EBD9BC" stroke="' + C.encre + '" stroke-width="2.4"/>' +
          cercle(x + 54, 112, 3.5, C.encre) + t(x + 33, 114, ico || '?', { s: 30, f: C.gris }) + t(x + 33, 158, 'Porte ' + n, { s: 13 });
      };
      var out = (s ? g(0, rect(12, 6, 296, 40, { f: C.violetc, s: C.violet, w: 2.4, r: 14 }) + t(160, 31, '« Que me répondrait l’autre gardien ? »', { s: 13.5, f: C.violet })) : '') +
        door(20, 1, s ? '' : '?') + door(234, 2, s ? '' : '?') + em(122, 136, '💂', 40) + em(198, 136, '💂', 40) +
        t(122, 156, 'Gardien', { s: 11.5, f: C.gris, w: 400 }) + t(198, 156, 'Gardien', { s: 11.5, f: C.gris, w: 400 });
      if (s) out += g(1, croix(53, 112, 1.4) + t(53, 78, 'piège', { f: C.rouge, s: 12.5 })) +
        g(2, coche(267, 112, 1.5) + t(267, 78, 'liberté', { f: C.vert, s: 12.5 })) +
        t(160, 180, 'Exemple : ici, la liberté est derrière la porte 2.', { s: 12, f: C.gris, w: 400 });
      else out += t(160, 180, 'L’un des deux gardiens ment toujours.', { s: 12, f: C.gris, w: 400 });
      return svg(190, out, 'Deux portes et deux gardiens');
    },
    rep: '**« Si je demandais à l’autre gardien quelle porte mène à la liberté, que me répondrait-il ? »** Puis tu prends l’autre porte.',
    expl: 'Quel que soit le gardien interrogé, il te désigne la **porte-piège** :\n• Le sincère rapporte fidèlement… le mensonge de l’autre : il désigne le piège.\n• Le menteur ment sur la réponse du sincère : il désigne aussi le piège.\nIl suffit donc de prendre **l’autre porte** que celle qu’il désigne.'
  };

  /* ---------- 12 · La course des quatre amis ---------- */
  var course = {
    id: 'course', genre: 'Classement', niv: 1, titre: 'La course',
    q: 'Lou, Max, Nina et Oscar font une course. Il n’y a pas d’ex æquo.\n• Nina arrive avant Lou.\n• Max n’est ni premier, ni dernier.\n• Oscar arrive juste après Nina.\nDans quel ordre sont-ils arrivés ?',
    indice: 'Commence par placer le duo « Nina puis Oscar » : ils se suivent. Où peut se glisser Max ?',
    fig: function (s) {
      var ch = [{ n: 'Lou', c: C.violet, f: C.blanc }, { n: 'Max', c: C.orange, f: C.blanc }, { n: 'Nina', c: C.vert, f: C.blanc }, { n: 'Oscar', c: C.soleil, f: C.encre }], out = '';
      var ordre = ['Nina', 'Oscar', 'Max', 'Lou'];
      if (!s) ch.forEach(function (p, i) { var x = 44 + i * 78; out += cercle(x, 36, 20, p.c) + t(x, 43, p.n[0], { f: p.f, s: 20 }) + t(x, 76, p.n, { s: 13 }); });
      for (var i = 0; i < 4; i++) {
        var x = 10 + i * 78, nom = ordre[i], p = ch.filter(function (q) { return q.n === nom; })[0];
        out += rect(x, 96, 70, 56, { f: C.fond, s: C.trait, w: 2, r: 10 }) + t(x + 35, 114, ['1er', '2ᵉ', '3ᵉ', '4ᵉ'][i], { s: 12.5, f: C.gris });
        if (s) out += g(i, cercle(x + 20, 134, 13, p.c) + t(x + 20, 140, nom[0], { f: p.f, s: 14 }) + t(x + 48, 139, nom, { s: 11.5 }));
      }
      return svg(164, out, 'Quatre coureurs et quatre places sur le podium');
    },
    rep: '**1. Nina, 2. Oscar, 3. Max, 4. Lou.**',
    expl: 'Max n’est ni premier ni dernier : il est 2ᵉ ou 3ᵉ.\n• S’il était 2ᵉ, Nina et Oscar (qui se suivent) devraient être 3ᵉ et 4ᵉ, et Lou serait premier. Mais Nina doit arriver avant Lou : impossible.\n• Donc Max est 3ᵉ. Nina et Oscar sont alors 1ʳᵉ et 2ᵉ, et Lou est dernier.\nOrdre : **Nina, Oscar, Max, Lou**.'
  };

  /* ---------- 13 · Le sudoku des formes ---------- */
  var sudoku = {
    id: 'sudoku', genre: 'Sudoku', niv: 2, titre: 'Le sudoku des formes',
    q: 'Complète cette grille avec ● ▲ ■ ★ : chaque forme doit apparaître UNE fois dans chaque ligne, chaque colonne et chaque bloc de 4 cases (2×2).\nQuelle forme faut-il mettre dans la case marquée ?',
    indice: 'Regarde la colonne de droite : quelles formes sont déjà présentes ? Puis regarde la case tout en haut de cette colonne.',
    fig: function (s) {
      var sol = [1, 2, 3, 4, 3, 4, 1, 2, 2, 1, 4, 3, 4, 3, 2, 1], givens = { 1: 2, 2: 3, 4: 3, 11: 3, 12: 4, 15: 1 }, x0 = 80, y0 = 14, T = 40, out = '';
      var forme = function (v, cx, cy) { return v === 1 ? cercle(cx, cy, 13, C.violet) : v === 2 ? tri(cx, cy + 1, 15, C.orange) : v === 3 ? rect(cx - 12, cy - 12, 24, 24, { f: C.vert, r: 3 }) : etoile(cx, cy + 1, 15, 6.5, C.soleil); };
      for (var i = 0; i < 16; i++) {
        var r = Math.floor(i / 4), c = i % 4, x = x0 + c * T, y = y0 + r * T, cx = x + T / 2, cy = y + T / 2, marq = i === 7;
        out += rect(x, y, T, T, { f: marq ? C.soleilc : C.blanc, s: C.trait, w: 1.4, r: 0 });
      }
      for (var k in givens) { var kk = +k; out += forme(givens[k], x0 + (kk % 4) * T + T / 2, y0 + Math.floor(kk / 4) * T + T / 2); }
      if (s) {
        var n = 0;
        for (var j = 0; j < 16; j++) if (givens[j] === undefined) { out += g(n++ * 0.4, forme(sol[j], x0 + (j % 4) * T + T / 2, y0 + Math.floor(j / 4) * T + T / 2), j === 7 ? '' : 'opacity:.55'); }
        out += rect(x0 + 3 * T, y0 + T, T, T, { f: 'none', s: C.orange, w: 3.5, r: 4 });
      } else {
        out += t(x0 + 3 * T + T / 2, y0 + T + T / 2 + 8, '?', { s: 24, f: C.orange });
      }
      out += rect(x0, y0, T * 4, T * 4, { f: 'none', s: C.encre, w: 3, r: 4 }) + line(x0 + 2 * T, y0, x0 + 2 * T, y0 + 4 * T, C.encre, 2.6) + line(x0, y0 + 2 * T, x0 + 4 * T, y0 + 2 * T, C.encre, 2.6) +
        t(160, 196, '● ▲ ■ ★ : une fois par ligne, colonne et bloc', { s: 12, f: C.gris, w: 400 });
      return svg(206, out, 'Une grille de sudoku de 4 par 4 avec quatre formes, une case marquée d’un point d’interrogation');
    },
    rep: '**Un triangle ▲.**',
    expl: 'Dans la colonne de droite, il y a déjà ■ et ●. La case « ? » est donc ▲ ou ★.\nLa case tout en haut de cette colonne ne peut pas être ▲ (il y en a déjà un sur sa ligne) : c’est ★. Le bloc en haut à droite contient alors déjà ★, il ne reste que **▲** pour la case « ? ».'
  };

  /* ---------- 14 · Les chapeaux ---------- */
  var chapeaux = {
    id: 'chapeaux', genre: 'Déduction', niv: 3, titre: 'Les trois bonnets',
    q: 'Cinq bonnets sont dans un sac : 3 bleus et 2 rouges. Trois enfants en piochent un chacun et le posent sur leur tête, sans le voir. Ils sont alignés, tous tournés vers la droite : A voit B et C, B voit C, C ne voit personne.\nOn demande à A : « Connais-tu la couleur de ton bonnet ? » — « Non. »\nPuis à B : « Et toi ? » — « Non plus. »\nC peut alors dire la couleur de son bonnet. Laquelle ?',
    indice: 'Que verrait A s’il voyait deux bonnets rouges devant lui ? Utilise ensuite ce que B sait sur la réponse de A.',
    fig: function (s) {
      var xs = [55, 160, 265], nom = ['A', 'B', 'C'], bul = [['« Je ne', 'sais pas. »'], ['« Je ne', 'sais pas. »'], s ? ['« Je sais ! »'] : ['« ? »']], voit = ['voit B et C', 'voit C', 'ne voit personne'], out = '';
      xs.forEach(function (x, i) {
        out += rect(x - 46, 6, 92, 40, { f: C.blanc, s: C.trait, w: 2, r: 12 }) + '<polygon points="' + (x - 7) + ',45 ' + (x + 7) + ',45 ' + x + ',56" fill="' + C.blanc + '" stroke="' + C.trait + '" stroke-width="2"/>' + rect(x - 8, 43, 16, 4, { f: C.blanc, r: 0 }) +
          bul[i].map(function (l, k) { return t(x, (bul[i].length === 1 ? 31 : 24) + k * 15, l, { s: 12.5 }); }).join('');
        var c = i === 2 && s ? C.bleu : '#C9D0E0';
        out += '<polygon points="' + (x - 19) + ',108 ' + (x + 19) + ',108 ' + x + ',70" fill="' + c + '" stroke="' + C.encre + '" stroke-width="2"' + (i === 2 && s ? ' class="ap" style="animation-delay:.2s"' : '') + '/>';
        if (!(i === 2 && s)) out += t(x, 102, '?', { s: 18, f: C.blanc });
        out += cercle(x, 128, 20, '#FFD9B3', C.encre, 2) + cercle(x + 8, 125, 2.6, C.encre) + '<path d="M' + (x - 24) + ',172 q24,-30 48,0 z" fill="' + C.violetc + '" stroke="' + C.encre + '" stroke-width="2"/>' +
          t(x, 194, nom[i], { s: 15 }) + t(x, 211, voit[i], { s: 11.5, f: C.gris, w: 400 });
      });
      out += t(160, 230, 'Tous regardent vers la droite →', { s: 11.5, f: C.gris, w: 400 });
      return svg(238, out, 'Trois enfants alignés, chacun avec un bonnet dont il ne connaît pas la couleur');
    },
    rep: '**C porte un bonnet bleu.**',
    expl: '• Si A avait vu deux bonnets rouges (sur B et C), il aurait su que le sien est bleu (il n’y a que 2 rouges). Il a dit « Je ne sais pas » : B et C **ne sont pas tous les deux rouges**.\n• B entend ça. Si C était rouge, B saurait que lui-même est bleu. Or B dit « Je ne sais pas » : **C n’est pas rouge**.\nC porte donc un bonnet **bleu**.'
  };

  /* ---------- 15 · Les neuf pièces ---------- */
  var pieces = {
    id: 'pieces', genre: 'Pesées', niv: 3, titre: 'Les neuf pièces',
    q: 'Parmi 9 pièces d’apparence identique, une est un peu plus légère que les autres. Tu disposes d’une balance à deux plateaux (sans poids).\nComment trouver la pièce légère en seulement DEUX pesées ?',
    indice: 'Si tu peux séparer les pièces en trois tas égaux, une pesée suffit à savoir dans quel tas se cache la pièce légère.',
    fig: function (s) {
      var dy = (104 * Math.sin(7 * Math.PI / 180)).toFixed(1), out = '';
      /* un plateau : deux fils, la coupelle, et 3 pièces si on en donne la couleur */
      var pan = function (x, f, sc, dec) {
        var inner = line(x, 56, x - 36, 100, C.gris, 2) + line(x, 56, x + 36, 100, C.gris, 2) + rect(x - 40, 100, 80, 7, { f: C.encre, r: 3.5 });
        if (f) for (var k = 0; k < 3; k++) inner += cercle(x - 22 + k * 22, 90, 9, f, sc, 2);
        return dec ? '<g style="transform:translateY(' + dec + 'px);animation:pan-h .9s .3s ease-out backwards">' + inner + '</g>' : inner;
      };
      out += rect(112, 150, 96, 9, { f: C.encre, r: 4 }) + line(160, 56, 160, 152, C.encre, 5);
      if (s) {
        out += '<g style="transform:rotate(7deg);transform-origin:160px 56px;animation:incline .9s .3s ease-out backwards">' + line(56, 56, 264, 56, C.encre, 6) + '</g>' + cercle(160, 56, 7, C.soleil, C.encre, 2.4);
        out += pan(56, C.violetc, C.violet, '-' + dy) + pan(264, C.orangec, C.orange, dy);
        for (var k = 0; k < 3; k++) out += g(2 + k, cercle(130 + k * 30, 182, 10, C.vertc, C.vert, 2));
        out += t(160, 22, 'Le plateau qui monte cache la pièce légère', { s: 13, f: C.violet }) + t(160, 212, '3 pièces mises de côté', { s: 12, f: C.gris, w: 400 });
      } else {
        out += line(56, 56, 264, 56, C.encre, 6) + cercle(160, 56, 7, C.soleil, C.encre, 2.4) + pan(56) + pan(264);
        for (var j = 0; j < 9; j++) out += cercle(40 + j * 30, 182, 10, C.soleil, '#C89400', 2);
        out += t(160, 22, 'Une balance, neuf pièces', { s: 13, f: C.gris }) + t(160, 212, 'Une seule est plus légère.', { s: 12, f: C.gris, w: 400 });
      }
      return svg(222, out, 'Une balance à deux plateaux et neuf pièces');
    },
    rep: '**On fait trois tas de 3 pièces et on les pèse deux fois : d’abord tas contre tas, puis pièce contre pièce.**',
    expl: '**Pesée 1** : 3 pièces contre 3 (3 restent de côté).\n• Un plateau est plus léger → la pièce légère est dedans.\n• Équilibre → elle est parmi les 3 restantes.\n**Pesée 2** : parmi les 3 pièces suspectes, 1 contre 1.\n• Un plateau est plus léger → c’est elle.\n• Équilibre → c’est la troisième, restée de côté.'
  };

  /* ---------- 16 · Quatre triangles avec six allumettes ---------- */
  var allumettes = {
    id: 'allumettes', genre: 'Géométrie', niv: 2, titre: 'Six allumettes',
    q: 'Avec 6 allumettes identiques, comment former 4 triangles équilatéraux dont chaque côté est une allumette entière (pas de casse, pas de chevauchement) ?',
    indice: 'Sur une table plate, ça semble impossible. Et si on sortait de la table ?',
    fig: function (s) {
      var out = '';
      var stick = function (x1, y1, x2, y2, hid) {
        var dx = x2 - x1, dy = y2 - y1, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
        return line(x1, y1, x2, y2, hid ? '#EBD3A0' : C.bois, hid ? 5 : 7, hid ? ' stroke-dasharray="3 6"' : '') + (hid ? '' : cercle((x1 + ux * 6).toFixed(1), (y1 + uy * 6).toFixed(1), 5, C.rouge));
      };
      if (!s) {
        for (var i = 0; i < 6; i++) out += stick(34, 36 + i * 22, 140, 36 + i * 22);
        out += t(236, 92, '4 triangles', { s: 20, f: C.violet }) + t(236, 116, 'avec ces 6 allumettes ?', { s: 13, f: C.gris });
        return svg(176, out, 'Six allumettes alignées');
      }
      var A = [60, 150], B = [200, 150], Cc = [270, 112], D = [158, 30];
      out += g(0, stick(A[0], A[1], Cc[0], Cc[1], true)) + g(1, stick(A[0], A[1], B[0], B[1]) + stick(B[0], B[1], Cc[0], Cc[1])) + g(2, stick(D[0], D[1], A[0], A[1]) + stick(D[0], D[1], B[0], B[1]) + stick(D[0], D[1], Cc[0], Cc[1]));
      out += g(3, t(160, 172, 'Une pyramide à base triangulaire (en 3D)', { s: 13, f: C.violet }));
      return svg(180, out, 'Une pyramide formée de six allumettes');
    },
    rep: '**On construit une pyramide** : un triangle de 3 allumettes à plat, puis 3 allumettes qui se rejoignent au-dessus.',
    expl: 'Avec 3 allumettes on forme un premier triangle sur la table. On dresse ensuite les 3 autres allumettes depuis chacun de ses coins, jusqu’à ce qu’elles se touchent au sommet.\nOn obtient **4 triangles équilatéraux** : la base et les trois faces. La clé : penser en 3D au lieu de rester sur la table.'
  };

  /* ---------- 17 · L’échiquier mutilé ---------- */
  var echiquier = {
    id: 'echiquier', genre: 'Parité', niv: 3, titre: 'L’échiquier mutilé',
    q: 'On retire deux coins opposés d’un échiquier de 8 × 8 cases : il reste 62 cases. On dispose de 31 dominos, chacun recouvrant exactement 2 cases voisines.\nPeut-on recouvrir l’échiquier mutilé avec les 31 dominos, sans chevauchement ni dépassement ?',
    indice: 'Un domino couvre toujours deux cases voisines. Regarde la couleur de ces deux cases.',
    fig: function (s) {
      var x0 = 10, y0 = 14, T = 19, out = '';
      for (var r = 0; r < 8; r++) for (var c = 0; c < 8; c++) {
        var enlev = (r === 0 && c === 0) || (r === 7 && c === 7), sombre = (r + c) % 2 === 0;
        out += rect(x0 + c * T, y0 + r * T, T, T, { f: enlev ? C.blanc : sombre ? '#8FA6D8' : '#EEF2FB', r: 0 });
        if (enlev) out += rect(x0 + c * T + 2, y0 + r * T + 2, T - 4, T - 4, { f: C.blanc, s: C.rouge, w: 1.6, r: 2, d: '3 3' }) + croix(x0 + c * T + T / 2, y0 + r * T + T / 2, 0.65);
      }
      out += rect(x0, y0, 8 * T, 8 * T, { f: 'none', s: C.encre, w: 2.4, r: 0 });
      out += '<g opacity=".9">' + rect(x0 + 3 * T + 2, y0 + 3 * T + 3, 2 * T - 4, T - 6, { f: C.orange, s: C.encre, w: 1.6, r: 4 }) + '</g>';
      if (!s) {
        out += t(250, 56, '62 cases', { s: 17 }) + t(250, 80, '31 dominos ?', { s: 17, f: C.violet }) + t(250, 112, 'Un domino =', { s: 12.5, f: C.gris, w: 400 }) + t(250, 128, '2 cases voisines', { s: 12.5, f: C.gris, w: 400 });
        out += rect(210, 138, 38, 18, { f: C.orange, s: C.encre, w: 1.6, r: 4 }) + line(229, 138, 229, 156, C.encre, 1.6);
      } else {
        out += g(0, rect(172, 36, 20, 16, { f: '#EEF2FB', s: C.encre, w: 1.4, r: 2 }) + t(200, 49, '32 cases claires', { a: 'start', s: 13 })) +
          g(1, rect(172, 62, 20, 16, { f: '#8FA6D8', s: C.encre, w: 1.4, r: 2 }) + t(200, 75, '30 cases sombres', { a: 'start', s: 13 })) +
          g(2, t(250, 104, 'Un domino couvre', { s: 12.5, f: C.gris, w: 400 }) + t(250, 120, '1 claire + 1 sombre', { s: 12.5, f: C.gris, w: 400 })) +
          g(3, t(250, 150, 'Impossible !', { s: 19, f: C.rouge }));
      }
      return svg(184, out, 'Un échiquier dont deux coins opposés ont été retirés');
    },
    rep: '**Non, c’est impossible.**',
    expl: 'Les deux coins opposés ont **la même couleur** : en les retirant, il reste 32 cases d’une couleur et 30 de l’autre.\nOr un domino couvre toujours **une case claire et une case sombre**. 31 dominos couvriraient donc 31 claires et 31 sombres : c’est impossible avec 32 et 30.'
  };

  /* ---------- l'ordre de la liste = l'ordre des jours (difficulté et types alternés) ---------- */
  window.ENIGMES = [riviere, verres, menteurs, animaux, cartes, boites, matrice, pont, gateau, course, gardiens, interrupteurs, sudoku, chapeaux, allumettes, cadenas, pieces, echiquier];
})();
