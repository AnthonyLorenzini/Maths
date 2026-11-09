/* =========================================================
   Exercices de la séance 1 — chapitre 4 « Le théorème de Pythagore » (4e).
   Partagés par deux pages :
     - pages/4e-ch4-s1-classe : la séance en classe  → astuces seulement (jamais de solution)
     - pages/4e-ch4-s1        : la page à la maison   → astuces + solutions
   Usage : PythExos.render(document.getElementById("exos-host"), { solutions: false });
   Les pages doivent déjà fournir le style des exercices (.exo, .rep, .mk, .panel…) ;
   ce fichier n'ajoute que le style des figures.
   ========================================================= */
(function () {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";

  /* ---------- outils ---------- */
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in attrs) { if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]); }
    if (parent) parent.appendChild(e);
    return e;
  }
  function pts(poly) { return poly.map(function (p) { return p[0].toFixed(4) + "," + p[1].toFixed(4); }).join(" "); }
  function centre(poly) {
    var x = 0, y = 0;
    poly.forEach(function (p) { x += p[0]; y += p[1]; });
    return [x / poly.length, y / poly.length];
  }
  function boite(polys, marge) {
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    polys.forEach(function (poly) { poly.forEach(function (p) {
      x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]);
    }); });
    return [x0 - marge, y0 - marge, x1 - x0 + 2 * marge, y1 - y0 + 2 * marge];
  }
  function etiquette(svg, x, y, txt, px, cls) {
    var t = el("text", { x: x, y: y, "text-anchor": "middle", "dominant-baseline": "central", "class": "lbl" + (cls ? " " + cls : ""), "data-px": px || 15 }, svg);
    t.textContent = txt;
    return t;
  }
  /* Étiquettes des figures : toujours 13 px minimum à l'écran, quelle que soit la taille de la figure. */
  function fixLabels(svg) {
    var vb = svg.viewBox && svg.viewBox.baseVal;
    if (!vb || !vb.width) return;
    var r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    var k = Math.min(r.width / vb.width, r.height / vb.height);
    var ts = svg.querySelectorAll("text.lbl");
    for (var i = 0; i < ts.length; i++) {
      var px = Math.max(13, parseFloat(ts[i].getAttribute("data-px") || "14"));
      ts[i].setAttribute("font-size", (px / k).toFixed(3));
      ts[i].setAttribute("stroke-width", (3 / k).toFixed(3));
    }
  }
  function surveiller(svg) {
    if (svg.__surveille) return;
    svg.__surveille = true;
    if (window.ResizeObserver) new ResizeObserver(function () { fixLabels(svg); }).observe(svg);
    else window.addEventListener("resize", function () { fixLabels(svg); });
    fixLabels(svg);
  }

  /* ---------- style des figures (le reste du style est dans les pages) ---------- */
  function injecterStyle() {
    if (document.getElementById("pyth-exos-css")) return;
    var st = document.createElement("style");
    st.id = "pyth-exos-css";
    st.textContent =
      ".fig-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin:8px 0}" +
      ".fig-card{background:#fff;border:1.5px solid #E5D3A8;border-radius:10px;padding:8px 12px 6px}" +
      ".fig-nom{font-family:'Baloo 2',sans-serif;font-weight:700;color:#B5680A;font-size:14px}" +
      ".fig-card svg{display:block;width:100%;height:auto;max-height:230px;margin:2px auto 6px}" +
      ".fig-card svg text.lbl,.schema svg text.lbl{font-family:'Work Sans',Arial,sans-serif;font-weight:700;fill:#22303F;paint-order:stroke;stroke:#fff;stroke-linejoin:round}" +
      ".fig-card svg text.lbl.inc{fill:#4B2FB5}" +
      ".fig-card .fig-rep{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;font-size:14px;margin:6px 0}" +
      ".legende{font-size:13px;color:#7A5210;margin:2px 0 6px}";
    document.head.appendChild(st);
  }

  /* ---------- figure « triangle rectangle + trois carrés » ----------
     O = sommet de l'angle droit ; B = (b ; 0) ; A = (0 ; a) ; axe y vers le bas.
     Carré A (rouge) sur OA, carré B (jaune) sur OB, carré C (vert) sur l'hypoténuse AB.
     Les figures sont à l'échelle : seules les étiquettes disent les aires ou les longueurs. */
  function scene(a, b) {
    return {
      O: [0, 0], A: [0, a], B: [b, 0],
      sqA: [[0, 0], [0, a], [-a, a], [-a, 0]],
      sqB: [[0, 0], [b, 0], [b, -b], [0, -b]],
      sqC: [[0, a], [b, 0], [b + a, b], [a, a + b]]
    };
  }
  var FILL = { A: "#F2A79B", B: "#F3C94B", C: "#CFEBD7" };
  function figure(svg, o) {
    var S = scene(o.a, o.b), t = (o.rot || 0) * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    function T(p) {
      var x = o.miroir ? -p[0] : p[0], y = p[1];
      return [x * c - y * s, x * s + y * c];
    }
    var sq = { A: S.sqA.map(T), B: S.sqB.map(T), C: S.sqC.map(T) };
    var tri = [S.O, S.A, S.B].map(T);
    svg.innerHTML = "";
    svg.setAttribute("viewBox", boite([sq.A, sq.B, sq.C], 0.35).join(" "));
    ["C", "B", "A"].forEach(function (k) {
      el("polygon", { points: pts(sq[k]), fill: FILL[k], stroke: k === "C" ? "#2E8B57" : "#22303F",
        "stroke-width": k === "C" ? 1.8 : 1.4, "vector-effect": "non-scaling-stroke", "stroke-linejoin": "round" }, svg);
    });
    el("polygon", { points: pts(tri), fill: "#FFF8E1", stroke: "#22303F", "stroke-width": 1.4, "vector-effect": "non-scaling-stroke", "stroke-linejoin": "round" }, svg);
    var r = Math.min(o.a, o.b) * 0.28;
    el("polyline", { points: pts([[r, 0], [r, r], [0, r]].map(T)), fill: "none", stroke: "#22303F", "stroke-width": 1.4, "vector-effect": "non-scaling-stroke" }, svg);
    ["A", "B", "C"].forEach(function (k) {
      var m = centre(sq[k]), txt = o.lab[k];
      if (o.inconnu === k) etiquette(svg, m[0], m[1], "?", 24, "inc");
      else if (txt) etiquette(svg, m[0], m[1], txt, 15);
    });
    surveiller(svg);
  }

  /* ---------- exercice 1 : trois triangles rectangles tournés ---------- */
  function dessinerEx1(svg) {
    var defs = [
      { w: 130, h: 100, deg: 0, tx: 45, ty: 160, n: ["C", "B", "A"] },        /* [P (sur l'axe), R (angle droit), Q (vers le haut)] */
      { w: 140, h: 95, deg: -28, tx: 250, ty: 150, n: ["F", "G", "E"] },
      { w: 130, h: 100, deg: 180, tx: 600, ty: 40, n: ["R", "S", "T"] }
    ];
    defs.forEach(function (d) {
      var t = d.deg * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
      function f(p) { return [d.tx + p[0] * c - p[1] * s, d.ty + p[0] * s + p[1] * c]; }
      var P = f([d.w, 0]), R = f([0, 0]), Q = f([0, -d.h]);
      el("polygon", { points: pts([P, R, Q]), fill: "#FFF8E1", stroke: "#22303F", "stroke-width": 2, "stroke-linejoin": "round" }, svg);
      var e1 = f([14, 0]), e2 = f([14, -14]), e3 = f([0, -14]);
      el("polyline", { points: pts([e1, e2, e3]), fill: "none", stroke: "#22303F", "stroke-width": 1.6 }, svg);
      var G = centre([P, R, Q]);
      [[P, d.n[0]], [R, d.n[1]], [Q, d.n[2]]].forEach(function (x) {
        var vx = x[0][0] - G[0], vy = x[0][1] - G[1], l = Math.hypot(vx, vy);
        etiquette(svg, x[0][0] + vx / l * 17, x[0][1] + vy / l * 17, x[1], 16);
      });
    });
    surveiller(svg);
  }

  /* ---------- définition des figures des exercices 2 et 3 ---------- */
  var FIGS = {
    /* Exercice 2 : on donne deux aires, il manque la troisième (pas de longueurs) */
    "2a": { a: 3, b: 4, rot: 0, lab: { A: "9", B: "16" }, inconnu: "C" },
    "2b": { a: 6, b: 8, rot: -22, lab: { A: "36", B: "64" }, inconnu: "C" },
    "2c": { a: 5, b: 12, rot: 14, miroir: true, lab: { A: "25", C: "169" }, inconnu: "B" },
    "2d": { a: 7, b: 24, rot: -12, lab: { A: "49", C: "625" }, inconnu: "B" },
    /* Exercice 3 : on donne des longueurs de côtés, il faut en déduire les aires */
    "3a": { a: 9, b: 12, rot: 0, lab: { A: "9 cm", B: "12 cm" }, inconnu: "C" },
    "3b": { a: 12, b: 16, rot: 20, miroir: true, lab: { A: "12 cm", C: "20 cm" }, inconnu: "B" },
    "3c": { a: 1.5, b: 2, rot: -15, lab: { A: "1,5 cm", B: "2 cm" }, inconnu: "C" }
  };

  /* ---------- HTML des exercices ---------- */
  function champ(att, val, aria) {
    return '<input type="text" inputmode="decimal" ' + att + '="' + val + '" autocomplete="off" aria-label="' + aria + '">';
  }
  function carte(cle, nom, lignes) {
    return '<div class="fig-card"><div class="fig-nom">' + nom + '</div>' +
      '<svg data-fig="' + cle + '" role="img" aria-label="Triangle rectangle avec un carré sur chaque côté, figure ' + nom + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>' +
      lignes + '</div>';
  }
  function ligneRep(texte, val, aria, unite) {
    return '<label class="fig-rep">' + texte + ' ' + champ("data-num", val, aria) + ' ' + (unite || "cm²") + '<span class="mk"></span></label>';
  }

  function construire(solutions) {
    var n = 0;
    function exo(num, etoiles, intro, corps, astuce, solution, opt) {
      var id = "pxe" + num;
      return '<div class="exo" data-exo' + (opt ? " data-opt" : "") + '>' +
        '<div class="exo-title">' + etoiles + ' Exercice ' + num + '</div>' + intro +
        '<div class="rep">' + corps +
        '<div class="ctrl-rep"><button type="button" class="abtn verif">Vérifier</button><button type="button" class="abtn raz">Effacer mes réponses</button></div>' +
        '<div class="bilan-exo" role="status" aria-live="polite"></div></div>' +
        '<div class="btn-row"><button type="button" class="toggle-btn astuce" data-panel="' + id + 'a" aria-expanded="false">💡 Astuce</button>' +
        (solutions ? '<button type="button" class="toggle-btn solution" data-panel="' + id + 's" aria-expanded="false">✅ Solution</button>' : "") + '</div>' +
        '<div class="panel astuce-panel" id="' + id + 'a"><span class="label">Astuce</span>' + astuce + '</div>' +
        (solutions ? '<div class="panel solution-panel" id="' + id + 's"><span class="label">Solution</span>' + solution + '</div>' : "") +
        '</div>';
    }
    var h = "";
    h += '<p class="aide-ex">Sur ordinateur : tape ta réponse (virgule ou point pour les décimaux), puis clique sur <b>Vérifier</b>. Le corrigé n\'apparaît pas : cherche d\'abord, ' +
      (solutions ? "utilise l'astuce si tu bloques, et la solution en dernier." : "et utilise l'astuce si tu bloques.") +
      ' <span class="progres" role="status" aria-live="polite">Exercices réussis : <b class="nb-ok">0</b> / <b class="nb-tot">3</b></span></p>';

    /* ---- Exercice 1 (inchangé) ---- */
    h += exo(1, "★",
      '<p>Pour chacun des triangles rectangles ci-dessous, repère l\'angle droit, puis donne <b>l\'hypoténuse</b> et les <b>deux côtés de l\'angle droit</b> (exemple de réponse : [AB] ; pour les deux côtés, écris par exemple « AB et AC »).</p>' +
      '<div class="schema"><svg id="svg-ex1" role="img" aria-label="Trois triangles rectangles ABC, EFG et RST, dans des positions différentes, avec l\'angle droit marqué" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 210" style="max-width:660px"></svg></div>',
      [["ABC", "AC", "BA,BC", "hypoténuse", "côtés de l'angle droit"], ["EFG", "EF", "GE,GF"], ["RST", "RT", "SR,ST"]].map(function (t) {
        return '<div class="ligne"><b>Triangle ' + t[0] + '</b>' +
          '<label>hypoténuse : <input type="text" data-seg="' + t[1] + '" placeholder="[…]" autocomplete="off" aria-label="Exercice 1, triangle ' + t[0] + ', hypoténuse"><span class="mk"></span></label>' +
          '<label>côtés de l\'angle droit : <input type="text" class="large" data-segset="' + t[2] + '" placeholder="… et …" autocomplete="off" aria-label="Exercice 1, triangle ' + t[0] + ', côtés de l\'angle droit"><span class="mk"></span></label></div>';
      }).join(""),
      "Repère d'abord le petit carré qui marque l'angle droit. L'hypoténuse est le côté qui <b>ne touche pas</b> cet angle : elle lui fait face.",
      "ABC est rectangle en B : l'hypoténuse est <b>[AC]</b>, les côtés de l'angle droit sont [BA] et [BC]. EFG est rectangle en G : l'hypoténuse est <b>[EF]</b>, les côtés de l'angle droit sont [GE] et [GF]. RST est rectangle en S : l'hypoténuse est <b>[RT]</b>, les côtés de l'angle droit sont [SR] et [ST].");

    /* ---- Exercice 2 : schémas avec une aire manquante ---- */
    h += exo(2, "★★",
      '<p>Dans chaque figure, le triangle est rectangle et on a construit un carré sur chacun de ses côtés. Les aires sont en cm². Trouve l\'aire du carré marqué <b>?</b>.</p>',
      '<div class="fig-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">' +
        carte("2a", "a)", ligneRep("aire du carré « ? » =", "25", "Exercice 2 a, aire du carré point d'interrogation")) +
        carte("2b", "b)", ligneRep("aire du carré « ? » =", "100", "Exercice 2 b, aire du carré point d'interrogation")) +
        carte("2c", "c)", ligneRep("aire du carré « ? » =", "144", "Exercice 2 c, aire du carré point d'interrogation")) +
        carte("2d", "d)", ligneRep("aire du carré « ? » =", "576", "Exercice 2 d, aire du carré point d'interrogation")) +
      '</div>',
      "Repère d'abord le carré construit sur l'<b>hypoténuse</b> : c'est celui qui est en face de l'angle droit (le vert). Il a la plus grande aire. Si c'est lui qui est marqué « ? », on <b>additionne</b> les deux autres aires ; sinon, c'est l'une des deux autres qui manque : on <b>retranche</b>.",
      "a) 9 + 16 = <b>25</b>. b) 36 + 64 = <b>100</b>. c) Le carré « ? » est l'un des petits carrés : 169 − 25 = <b>144</b>. d) 625 − 49 = <b>576</b>. (Dans a) et b), « ? » est le carré vert de l'hypoténuse ; dans c) et d), c'est un carré jaune.)");

    /* ---- Exercice 3 : on donne les côtés, il faut trouver les aires ---- */
    h += exo(3, "★★",
      '<p>Même chose, mais cette fois on ne donne plus les aires : on donne la longueur du côté de certains carrés. Calcule d\'abord l\'aire de ces carrés, puis l\'aire du carré « ? ».</p>',
      '<div class="fig-grid">' +
        carte("3a", "a)",
          ligneRep("carré de côté 9 cm :", "81", "Exercice 3 a, aire du carré de côté 9 cm") +
          ligneRep("carré de côté 12 cm :", "144", "Exercice 3 a, aire du carré de côté 12 cm") +
          ligneRep("carré « ? » :", "225", "Exercice 3 a, aire du carré point d'interrogation")) +
        carte("3b", "b)",
          ligneRep("carré de côté 20 cm :", "400", "Exercice 3 b, aire du carré de côté 20 cm") +
          ligneRep("carré de côté 12 cm :", "144", "Exercice 3 b, aire du carré de côté 12 cm") +
          ligneRep("carré « ? » :", "256", "Exercice 3 b, aire du carré point d'interrogation")) +
        carte("3c", "c)",
          ligneRep("carré de côté 1,5 cm :", "2.25", "Exercice 3 c, aire du carré de côté 1,5 cm") +
          ligneRep("carré de côté 2 cm :", "4", "Exercice 3 c, aire du carré de côté 2 cm") +
          ligneRep("carré « ? » :", "6.25", "Exercice 3 c, aire du carré point d'interrogation")) +
      '</div>',
      "L'aire d'un carré, c'est <b>côté × côté</b>. Calcule d'abord les aires des deux carrés dont tu connais le côté. Ensuite, comme dans l'exercice 2 : le carré vert est celui de l'hypoténuse. Faut-il additionner ou retrancher ?",
      "a) 9² = 81 et 12² = 144, donc l'aire du carré vert est 81 + 144 = <b>225 cm²</b>. b) 20² = 400 (carré vert) et 12² = 144, donc 400 − 144 = <b>256 cm²</b>. c) 1,5² = 2,25 et 2² = 4, donc 2,25 + 4 = <b>6,25 cm²</b>. On ne sait pas encore retrouver la longueur d'un côté à partir de son aire : on le fera dans la prochaine séance.");

    /* ---- Exercice 4 : pour aller plus loin, sans figure ---- */
    h += '<div class="advanced-title">Pour aller plus loin (facultatif)</div>';
    h += exo(4, "★★★",
      '<p>Plus de figure cette fois : fais un petit schéma au brouillon si tu en as besoin. Dans chaque cas, le triangle est rectangle et on construit un carré sur chacun de ses côtés.</p>',
      '<div class="ligne"><label>a) Les côtés de l\'angle droit mesurent 20 cm et 21 cm. Aire du carré construit sur l\'hypoténuse : ' + champ("data-num", "841", "Exercice 4 a, aire en cm²") + ' cm²<span class="mk"></span></label></div>' +
      '<div class="ligne"><label>b) Les côtés de l\'angle droit mesurent 0,6 m et 0,8 m. Aire du carré construit sur l\'hypoténuse : ' + champ("data-num", "1", "Exercice 4 b, aire en m²") + ' m²<span class="mk"></span></label></div>' +
      '<div class="ligne"><label>c) Les côtés de l\'angle droit mesurent 2,5 cm et 6 cm. Aire du carré construit sur l\'hypoténuse : ' + champ("data-num", "42.25", "Exercice 4 c, aire en cm²") + ' cm²<span class="mk"></span></label></div>' +
      '<div class="ligne"><label>d) L\'hypoténuse mesure 17 cm et l\'un des côtés de l\'angle droit mesure 15 cm. Aire du carré construit sur <b>l\'autre</b> côté de l\'angle droit : ' + champ("data-num", "64", "Exercice 4 d, aire en cm²") + ' cm²<span class="mk"></span></label></div>',
      "Dans a), b) et c), tu connais les deux côtés de l'angle droit : calcule l'aire de leurs deux carrés, puis additionne. Dans d), tu connais l'hypoténuse : c'est le carré le plus grand, donc il faut retrancher.",
      "a) 20² + 21² = 400 + 441 = <b>841 cm²</b>. b) 0,6² + 0,8² = 0,36 + 0,64 = <b>1 m²</b>. c) 2,5² + 6² = 6,25 + 36 = <b>42,25 cm²</b>. d) 17² − 15² = 289 − 225 = <b>64 cm²</b>.",
      true);
    return h;
  }

  /* ---------- vérification : ne montre jamais la solution, seulement juste / à revoir ---------- */
  function nombre(s) {
    s = String(s).trim().replace(",", ".");
    var m = s.match(/^-?\d+(?:\.\d+)?/);
    if (!m) return NaN;
    var reste = s.slice(m[0].length).trim();
    if (reste !== "" && !/^[a-zA-Z²]+$/.test(reste)) return NaN;
    return parseFloat(m[0]);
  }
  function seg(s) {
    var t = String(s).toUpperCase().replace(/[^A-Z]/g, "");
    return t.length === 2 ? t.split("").sort().join("") : null;
  }
  function segs(s) {
    var tok = String(s).toUpperCase().split(/[^A-Z]+/).filter(Boolean);
    if (tok.length === 3 && tok[1] === "ET") tok.splice(1, 1);
    if (tok.length === 1 && tok[0].length === 4) tok = [tok[0].slice(0, 2), tok[0].slice(2)];
    if (tok.length !== 2 || tok[0].length !== 2 || tok[1].length !== 2) return null;
    return tok.map(function (t) { return t.split("").sort().join(""); }).sort();
  }
  var CHAMPS = "[data-num],[data-seg],[data-segset],.vf";
  function etat(c, s) {                       /* s : "ok" | "ko" | "vide" | "" */
    var mk = c.classList.contains("vf") ? c.querySelector(".mk") : c.parentNode.querySelector(".mk");
    c.classList.remove("ok", "ko");
    if (s === "ok" || s === "ko") c.classList.add(s);
    mk.className = "mk" + (s ? " " + s : "");
    mk.textContent = s === "ok" ? "✅ juste" : s === "ko" ? "❌ à revoir" : s === "vide" ? "⚠ à remplir" : "";
  }
  function juste(c) {
    if (c.classList.contains("vf")) {
      var r = c.querySelector("input:checked");
      return r ? (r.value === c.getAttribute("data-bon") ? "ok" : "ko") : "vide";
    }
    var v = c.value;
    if (!v.trim()) return "vide";
    if (c.hasAttribute("data-num")) { var n = nombre(v); return isNaN(n) ? "ko" : (Math.abs(n - parseFloat(c.getAttribute("data-num"))) < 1e-9 ? "ok" : "ko"); }
    if (c.hasAttribute("data-seg")) return seg(v) === seg(c.getAttribute("data-seg")) ? "ok" : "ko";
    var a = segs(v), b = segs(c.getAttribute("data-segset"));
    return a && a[0] === b[0] && a[1] === b[1] ? "ok" : "ko";
  }
  function brancher(host) {
    function compte() {
      var exos = host.querySelectorAll(".exo[data-exo]:not([data-opt])"), n = 0;
      Array.prototype.forEach.call(exos, function (e) { if (e.classList.contains("reussi")) n++; });
      host.querySelector(".nb-ok").textContent = n;
      host.querySelector(".nb-tot").textContent = exos.length;
    }
    function verifier(exo) {
      var champs = exo.querySelectorAll(CHAMPS), ok = 0, vides = 0;
      Array.prototype.forEach.call(champs, function (c) {
        var s = juste(c); etat(c, s);
        if (s === "ok") ok++; else if (s === "vide") vides++;
      });
      var tot = champs.length, b = exo.querySelector(".bilan-exo"), bon = ok === tot, faux = tot - ok - vides;
      exo.classList.toggle("reussi", bon);
      b.className = "bilan-exo " + (bon ? "ok" : "ko");
      b.textContent = bon ? "🎉 Bravo, tout est juste !"
        : ok + " / " + tot + " réponses justes" + (vides ? " (" + vides + " à remplir)" : "") + ". " +
          (faux ? "Corrige celles marquées ❌ " : "Remplis les cases vides ") + "puis clique de nouveau sur Vérifier" + (faux ? " ; au besoin, ouvre l'astuce." : ".");
      compte();
    }
    function effacer(exo) {
      Array.prototype.forEach.call(exo.querySelectorAll("input[type=text]"), function (i) { i.value = ""; });
      Array.prototype.forEach.call(exo.querySelectorAll("input[type=radio]"), function (i) { i.checked = false; });
      Array.prototype.forEach.call(exo.querySelectorAll(CHAMPS), function (c) { etat(c, ""); });
      var b = exo.querySelector(".bilan-exo"); b.className = "bilan-exo"; b.textContent = "";
      exo.classList.remove("reussi"); compte();
    }
    host.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("button") : null;
      if (!t) return;
      var exo = t.closest(".exo");
      if (t.classList.contains("verif") && exo) verifier(exo);
      else if (t.classList.contains("raz") && exo) effacer(exo);
      else if (t.hasAttribute("data-panel")) {
        var p = document.getElementById(t.getAttribute("data-panel"));
        if (p) { var ouvert = p.classList.toggle("show"); t.setAttribute("aria-expanded", String(ouvert)); }
      }
    });
    host.addEventListener("input", function (e) {              /* modifier une réponse efface sa marque */
      var c = e.target.closest ? (e.target.closest(".vf") || e.target) : e.target, exo = e.target.closest(".exo");
      if (c.matches && c.matches(CHAMPS) && exo) { etat(c, ""); exo.classList.remove("reussi"); compte(); }
    });
    host.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.matches && e.target.matches("input[type=text]")) {
        e.preventDefault();
        var exo = e.target.closest(".exo"); if (exo) verifier(exo);
      }
    });
    compte();
  }

  /* ---------- point d'entrée ---------- */
  window.PythExos = {
    render: function (host, opts) {
      injecterStyle();
      host.innerHTML = construire(!!(opts && opts.solutions));
      dessinerEx1(host.querySelector("#svg-ex1"));
      Array.prototype.forEach.call(host.querySelectorAll("svg[data-fig]"), function (svg) {
        figure(svg, FIGS[svg.getAttribute("data-fig")]);
      });
      brancher(host);
    },
    FIGS: FIGS
  };
})();
