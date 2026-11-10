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
    /* ---------- 6e · Numération entière et décimale ---------- */
    { id: "chiffre", nom: "chiffre", chap: "6e · Numération", court: "Un des 10 symboles pour écrire les nombres : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.",
      long: ["Un nombre s'écrit avec un ou plusieurs chiffres. 4 725 est un nombre à 4 chiffres : 4, 7, 2 et 5.", "Ne pas confondre : un chiffre est une « lettre » des nombres, un nombre est un « mot »."] },
    { id: "rang", nom: "rang d'un chiffre", chap: "6e · Numération", court: "La place d'un chiffre dans l'écriture d'un nombre : unités, dizaines, centaines, dixièmes…",
      long: ["Dans 4 725,306, le chiffre 7 est au rang des centaines et le 3 au rang des dixièmes.", "Le même chiffre ne vaut pas pareil selon son rang : le 7 de 70 vaut 10 fois plus que le 7 de 7."] },
    { id: "partie-entiere", nom: "partie entière", chap: "6e · Numération", court: "La partie d'un nombre décimal qui est à gauche de la virgule.",
      long: ["Dans 12,57, la partie entière est 12."] },
    { id: "partie-decimale", nom: "partie décimale", chap: "6e · Numération", court: "La partie d'un nombre décimal qui est à droite de la virgule.",
      long: ["Dans 12,57, la partie décimale est 57 (cinquante-sept centièmes)."] },
    { id: "zero-inutile", nom: "zéro inutile", chap: "6e · Numération", court: "Un zéro qu'on peut enlever sans changer la valeur du nombre : 3,50 = 3,5 et 03,5 = 3,5.",
      long: ["Un zéro est inutile à la fin de la partie décimale ou au début de la partie entière.", "Attention : 3,05 n'est pas égal à 3,5. Ici le zéro est utile : il garde la place des dixièmes."] },
    { id: "million", nom: "million", chap: "6e · Numération", court: "Un million, c'est 1 000 000 : mille milliers.",
      long: ["1 000 000 s'écrit avec 6 zéros."] },
    { id: "milliard", nom: "milliard", chap: "6e · Numération", court: "Un milliard, c'est 1 000 000 000 : mille millions.",
      long: ["1 000 000 000 s'écrit avec 9 zéros."] },

    /* ---------- 6e · Points, droites et distances ---------- */
    { id: "droite", nom: "droite", chap: "6e · Points, droites, distances", court: "Ligne droite qui n'a ni début ni fin. On ne peut tracer qu'une partie de ce qui est une droite.",
      long: ["Par deux points différents, il passe une seule droite."] },
    { id: "demi-droite", nom: "demi-droite", chap: "6e · Points, droites, distances", court: "Partie d'une droite qui commence en un point (son origine) et continue sans fin d'un seul côté.",
      long: ["Un point d'une droite la coupe en deux demi-droites."] },
    { id: "segment", nom: "segment", chap: "6e · Points, droites, distances", court: "Partie d'une droite limitée par deux points, ses extrémités. On peut mesurer sa longueur.",
      long: ["Le segment [AB] a pour extrémités A et B. Sa longueur se note AB."] },
    { id: "alignes", nom: "points alignés", chap: "6e · Points, droites, distances", court: "Des points sont alignés s'ils sont sur une même droite.",
      long: ["Pour vérifier avec la règle : on trace une droite qui passe par deux des points, et on regarde si les autres sont dessus."] },
    { id: "distance", nom: "distance", chap: "6e · Points, droites, distances", court: "La distance entre deux points, c'est la longueur du segment qui les relie.",
      long: ["Elle se mesure avec une règle graduée. C'est le chemin le plus court entre les deux points."] },
    { id: "milieu", nom: "milieu d'un segment", chap: "6e · Points, droites, distances", court: "Le point du segment situé à égale distance de ses deux extrémités.",
      long: ["Si M est le milieu de [AB], alors AM = MB, et M est sur le segment [AB]."] },

    /* ---------- 6e · Cercle et disque ---------- */
    { id: "cercle", nom: "cercle", chap: "6e · Cercle et disque", court: "Ensemble des points situés à la même distance du centre. C'est la ligne, pas l'intérieur.",
      long: ["Tous les points du cercle sont à la même distance du centre. Cette distance, c'est le rayon.", "Pour le tracer au compas : on pique la pointe en O et on règle l'écartement sur le rayon."], schema: "cercle" },
    { id: "centre", nom: "centre", chap: "6e · Cercle et disque", court: "Le point à égale distance de tous les points du cercle.",
      long: ["Le centre n'est pas sur le cercle : il est à l'intérieur. On le nomme souvent O."], schema: "centre" },
    { id: "rayon", nom: "rayon", chap: "6e · Cercle et disque", court: "Segment qui relie le centre à un point du cercle. Tous les rayons d'un cercle ont la même longueur.",
      long: ["Un cercle a une infinité de rayons, tous de même longueur.", "Le mot « rayon » désigne aussi cette longueur : un cercle de rayon 3 cm."], schema: "rayon" },
    { id: "diametre", nom: "diamètre", chap: "6e · Cercle et disque", court: "Segment qui passe par le centre et relie deux points du cercle. Il mesure deux fois le rayon.",
      long: ["Le diamètre est la plus longue corde du cercle.", "Diamètre = 2 × rayon. Et rayon = diamètre ÷ 2."], schema: "diametre" },
    { id: "corde", nom: "corde", chap: "6e · Cercle et disque", court: "Segment qui relie deux points du cercle.",
      long: ["Une corde ne passe pas forcément par le centre.", "Quand elle passe par le centre, c'est un diamètre."], schema: "corde" },
    { id: "arc", nom: "arc de cercle", chap: "6e · Cercle et disque", court: "Portion de cercle comprise entre deux points du cercle.",
      long: ["Deux points d'un cercle délimitent toujours deux arcs."], schema: "arc" },
    { id: "demi-cercle", nom: "demi-cercle", chap: "6e · Cercle et disque", court: "Arc égal à la moitié du cercle. Ses extrémités sont celles d'un diamètre.",
      long: ["Un diamètre coupe le cercle en deux demi-cercles de même longueur."], schema: "demi" },
    { id: "disque", nom: "disque", chap: "6e · Cercle et disque", court: "Surface à l'intérieur du cercle, cercle compris.",
      long: ["Ne pas confondre : le cercle est une ligne, le disque est une surface."], schema: "disque" },
    { id: "perimetre", nom: "périmètre", chap: "6e · Cercle et disque", court: "Longueur du tour d'une figure.",
      long: ["Pour un cercle, le périmètre est un peu plus de 3 fois son diamètre : P ≈ 3,14 × d."], schema: "cercle" },
    { id: "pi", nom: "π (pi)", chap: "6e · Cercle et disque", court: "Nombre un peu plus grand que 3 : le tour d'un cercle divisé par son diamètre. On prend 3,14.",
      long: ["Quel que soit le cercle, périmètre ÷ diamètre donne toujours π.", "3,14 est une valeur approchée de π (le nombre a une infinité de décimales)."], schema: "cercle" },

    /* ---------- 6e · Décimaux ---------- */
    { id: "nombre-decimal", nom: "nombre décimal", chap: "6e · Fractions décimales et décimaux", court: "Nombre qui s'écrit avec une partie entière, une virgule et quelques chiffres après la virgule.",
      long: ["Ex : 3,5 ; 0,07 ; 12,125. On peut aussi l'écrire comme une fraction sur 10, 100, 1 000…"] },

    /* ---------- 4e · Pourcentages ---------- */
    { id: "proportionnalite", nom: "proportionnalité", chap: "4e · Pourcentages", court: "Deux grandeurs sont proportionnelles quand on passe des valeurs de l'une à celles de l'autre en multipliant toujours par le même nombre.",
      long: ["Ex : 3 baguettes coûtent 4,50 €, donc 6 baguettes coûtent 9 € : si on double l'une, on double l'autre.", "On range souvent les valeurs dans un tableau de proportionnalité."] },
    { id: "coefficient", nom: "coefficient de proportionnalité", chap: "4e · Pourcentages", court: "Le nombre par lequel on multiplie une grandeur pour obtenir l'autre, dans un tableau de proportionnalité.",
      long: ["Ex : si 4 kg coûtent 10 €, le coefficient est 10 ÷ 4 = 2,5 (€ par kg)."] },
    { id: "produit-en-croix", nom: "produit en croix", chap: "4e · Pourcentages", court: "Méthode pour trouver la quatrième valeur d'un tableau de proportionnalité : on multiplie les deux nombres en diagonale, puis on divise par le troisième.",
      long: ["Ex : 4 kg → 10 € et 6 kg → ? € . On calcule 6 × 10 ÷ 4 = 15 €."] },
    { id: "linearite", nom: "linéarité", chap: "4e · Pourcentages", court: "Si on multiplie ou on additionne des valeurs d'une grandeur, les valeurs de l'autre sont multipliées ou additionnées de la même façon.",
      long: ["Ex : le prix de 5 objets + le prix de 3 objets = le prix de 8 objets."] },
    { id: "pourcentage", nom: "pourcentage", chap: "4e · Pourcentages", court: "Une fraction de dénominateur 100. t % de A, c'est t ÷ 100 × A.",
      long: ["Ex : 25 % de 80 = 25 ÷ 100 × 80 = 20.", "« 25 % » veut dire « 25 pour 100 »."] },
    { id: "pourcentage-reciproque", nom: "pourcentage réciproque", chap: "4e · Pourcentages", court: "Le pourcentage à appliquer après une augmentation ou une baisse pour retrouver la valeur de départ.",
      long: ["Ce n'est pas le même pourcentage dans l'autre sens : après +50 %, il faut une baisse d'environ 33 % pour revenir au départ, pas de 50 %."] },

    /* ---------- 4e · Grandeurs quotients et produits ---------- */
    { id: "grandeur-composee", nom: "grandeur composée", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en combinant deux autres grandeurs, par un quotient ou par un produit.",
      long: ["Quotient : vitesse = distance ÷ durée.", "Produit : énergie = puissance × durée."] },
    { id: "grandeur-quotient", nom: "grandeur quotient", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en divisant deux grandeurs. Ex : la vitesse (distance ÷ durée) en km/h.",
      long: ["Son unité s'écrit avec une barre : km/h, L/min, g/cm³."] },
    { id: "grandeur-produit", nom: "grandeur produit", chap: "4e · Grandeurs quotients et produits", court: "Grandeur obtenue en multipliant deux grandeurs. Ex : l'énergie en kWh (puissance en kW × durée en h).",
      long: ["L'aire d'un rectangle est aussi un produit : longueur × largeur, en m²."] },
    { id: "vitesse", nom: "vitesse", chap: "4e · Grandeurs quotients et produits", court: "Distance parcourue par unité de temps : v = d ÷ t. Ex : 90 km en 1 h, c'est 90 km/h.",
      long: ["La vitesse moyenne, c'est la vitesse constante qui donnerait la même durée de trajet.", "À retenir aussi : d = v × t et t = d ÷ v."] },
    { id: "debit", nom: "débit", chap: "4e · Grandeurs quotients et produits", court: "Quantité de liquide qui s'écoule par unité de temps : volume ÷ durée. Ex : 30 L/min.",
      long: ["Un robinet qui débite 30 L/min remplit 60 L en 2 minutes."] },
    { id: "masse-volumique", nom: "masse volumique", chap: "4e · Grandeurs quotients et produits", court: "Masse d'une unité de volume d'une matière : masse ÷ volume. Ex : 1 g/cm³ pour l'eau.",
      long: ["Plus la masse volumique est grande, plus 1 cm³ de la matière est lourd."] },
    { id: "densite", nom: "densité", chap: "4e · Grandeurs quotients et produits", court: "Dans ce chapitre, c'est la masse d'une unité de volume : masse ÷ volume (comme la masse volumique). Plus elle est grande, plus la matière est « serrée ».",
      long: ["Une matière moins dense que l'eau flotte dessus ; une matière plus dense coule."] },
    { id: "allure", nom: "allure", chap: "4e · Grandeurs quotients et produits", court: "Durée mise pour parcourir 1 km (en min/km). Plus l'allure est petite, plus on va vite.",
      long: ["Ex : une allure de 5 min/km correspond à une vitesse de 12 km/h."] },
    { id: "kwh", nom: "kilowattheure (kWh)", chap: "4e · Grandeurs quotients et produits", court: "Unité d'énergie : celle consommée par un appareil de 1 kW qui fonctionne pendant 1 heure.",
      long: ["Ex : un appareil de 2 kW allumé 3 h consomme 6 kWh."] },

    /* ---------- 4e · Divisibilité et nombres premiers ---------- */
    { id: "multiple", nom: "multiple", chap: "4e · Divisibilité et nombres premiers", court: "Un multiple de 6 est un nombre de la table de 6 : 6, 12, 18… Ex : 18 = 6 × 3.",
      long: ["Un nombre a une infinité de multiples."] },
    { id: "diviseur", nom: "diviseur", chap: "4e · Divisibilité et nombres premiers", court: "a est un diviseur de b si la division de b par a tombe juste (reste 0). Ex : 4 est un diviseur de 12.",
      long: ["Les diviseurs de 12 : 1, 2, 3, 4, 6 et 12."] },
    { id: "divisible", nom: "divisible", chap: "4e · Divisibilité et nombres premiers", court: "12 est divisible par 4 si 12 ÷ 4 tombe juste. Cela veut dire que 4 est un diviseur de 12.",
      long: ["« 12 est divisible par 4 », « 4 est un diviseur de 12 » et « 12 est un multiple de 4 » disent la même chose."] },
    { id: "nombre-premier", nom: "nombre premier", chap: "4e · Divisibilité et nombres premiers", court: "Nombre entier qui a exactement deux diviseurs : 1 et lui-même. Ex : 2, 3, 5, 7, 11, 13.",
      long: ["1 n'est pas premier (il n'a qu'un seul diviseur). 2 est le seul nombre premier pair."] },
    { id: "crible", nom: "crible d'Ératosthène", chap: "4e · Divisibilité et nombres premiers", court: "Méthode pour trouver les nombres premiers : on barre les multiples de 2, de 3, de 5…, et ce qui reste est premier.",
      long: ["Elle porte le nom d'un savant grec qui vivait il y a plus de 2 000 ans."] },
    { id: "facteur-premier", nom: "facteur premier", chap: "4e · Divisibilité et nombres premiers", court: "Nombre premier qui apparaît dans la décomposition d'un nombre. Ex : 12 = 2 × 2 × 3, ses facteurs premiers sont 2 et 3.",
      long: ["Un facteur est un nombre que l'on multiplie."] },
    { id: "decomposition", nom: "décomposition en facteurs premiers", chap: "4e · Divisibilité et nombres premiers", court: "Écrire un nombre comme un produit de nombres premiers. Ex : 60 = 2² × 3 × 5.",
      long: ["Cette écriture est unique, à l'ordre des facteurs près."] },
    { id: "carre-parfait", nom: "carré parfait", chap: "4e · Divisibilité et nombres premiers", court: "Nombre entier qui est le carré d'un autre nombre entier. Ex : 36 = 6², 100 = 10², 225 = 15².",
      long: ["Dans sa décomposition en facteurs premiers, chaque nombre premier apparaît un nombre pair de fois."] },
    { id: "simplifier", nom: "simplifier une fraction", chap: "4e · Divisibilité et nombres premiers", court: "Diviser le numérateur et le dénominateur par un même nombre pour obtenir une fraction égale, plus simple.",
      long: ["Ex : 12/18 = 6/9 = 2/3 (on a divisé par 2, puis par 3)."] },
    { id: "irreductible", nom: "fraction irréductible", chap: "4e · Divisibilité et nombres premiers", court: "Fraction qu'on ne peut plus simplifier : numérateur et dénominateur n'ont aucun diviseur commun autre que 1. Ex : 15/28.",
      long: ["Pour l'obtenir, on simplifie tant qu'on peut."] },

    /* ---------- 4e · Théorème de Pythagore ---------- */
    { id: "angle-droit", nom: "angle droit", chap: "4e · Théorème de Pythagore", court: "Angle de 90°, comme le coin d'une feuille. On le code avec un petit carré sur la figure.",
      long: ["On le vérifie avec une équerre."] },
    { id: "triangle-rectangle", nom: "triangle rectangle", chap: "4e · Théorème de Pythagore", court: "Triangle qui a un angle droit.",
      long: ["Ex : ABC est rectangle en A signifie que l'angle en A est droit."] },
    { id: "hypotenuse", nom: "hypoténuse", chap: "4e · Théorème de Pythagore", court: "Dans un triangle rectangle, le côté opposé à l'angle droit. C'est toujours le plus long côté.",
      long: ["Si ABC est rectangle en A, l'hypoténuse est [BC]."] },
    { id: "pythagore", nom: "théorème de Pythagore", chap: "4e · Théorème de Pythagore", court: "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
      long: ["Si ABC est rectangle en A : BC² = AB² + AC².", "Il permet de calculer un côté quand on connaît les deux autres."] },
    { id: "racine-carree", nom: "racine carrée", chap: "4e · Théorème de Pythagore", court: "La racine carrée de a, notée √a, est le nombre positif dont le carré est a. Ex : √25 = 5 car 5² = 25.",
      long: ["Ex : √49 = 7 et √2 ≈ 1,41."] },
    { id: "valeur-exacte", nom: "valeur exacte", chap: "4e · Théorème de Pythagore", court: "Écriture d'un nombre sans arrondi. Ex : √2 est la valeur exacte ; 1,41 est une valeur approchée.",
      long: ["On donne la valeur exacte quand on garde √ dans le résultat."] },
    { id: "valeur-approchee", nom: "valeur approchée", chap: "4e · Théorème de Pythagore", court: "Nombre proche de la valeur exacte, obtenu en arrondissant. Ex : √2 ≈ 1,41.",
      long: ["Au centième, √2 ≈ 1,41 ; au millième, √2 ≈ 1,414."] },

    /* ---------- Vocabulaire commun à tous les niveaux ---------- */
    { id: "somme", nom: "somme", chap: "Tous niveaux · Calcul et nombres", court: "Résultat d'une addition. Ex : la somme de 3 et 5 est 8.",
      long: ["Pour calculer une somme, on additionne."] },
    { id: "difference", nom: "différence", chap: "Tous niveaux · Calcul et nombres", court: "Résultat d'une soustraction. Ex : la différence de 8 et 5 est 3.",
      long: ["Elle dit aussi de combien deux nombres diffèrent."] },
    { id: "produit", nom: "produit", chap: "Tous niveaux · Calcul et nombres", court: "Résultat d'une multiplication. Ex : le produit de 3 et 5 est 15.",
      long: ["Les nombres que l'on multiplie s'appellent des facteurs."] },
    { id: "quotient", nom: "quotient", chap: "Tous niveaux · Calcul et nombres", court: "Résultat d'une division. Ex : le quotient de 12 par 4 est 3.",
      long: ["On l'écrit aussi comme une fraction : 12 ÷ 4 = 12/4."] },
    { id: "addition", nom: "addition", chap: "Tous niveaux · Calcul et nombres", court: "Opération qui réunit deux quantités. Son résultat est la somme.",
      long: ["Ex : 3 + 5 = 8."] },
    { id: "soustraction", nom: "soustraction", chap: "Tous niveaux · Calcul et nombres", court: "Opération qui enlève une quantité à une autre, ou qui cherche l'écart entre deux nombres. Son résultat est la différence.",
      long: ["Ex : 8 − 5 = 3."] },
    { id: "multiplication", nom: "multiplication", chap: "Tous niveaux · Calcul et nombres", court: "Opération qui répète une addition : 3 × 5 = 5 + 5 + 5. Son résultat est le produit.",
      long: ["Multiplier par 10, c'est décaler les chiffres d'un rang vers la gauche."] },
    { id: "division", nom: "division", chap: "Tous niveaux · Calcul et nombres", court: "Opération qui partage une quantité en parts égales, ou qui cherche combien de fois un nombre est contenu dans un autre. Son résultat est le quotient.",
      long: ["Ex : 12 ÷ 4 = 3."] },
    { id: "double", nom: "double", chap: "Tous niveaux · Calcul et nombres", court: "Le double d'un nombre, c'est ce nombre multiplié par 2.",
      long: ["Ex : le double de 7 est 14. Le diamètre est le double du rayon."] },
    { id: "moitie", nom: "moitié", chap: "Tous niveaux · Calcul et nombres", court: "La moitié d'un nombre, c'est ce nombre divisé par 2.",
      long: ["Ex : la moitié de 18 est 9."] },
    { id: "tiers", nom: "tiers", chap: "Tous niveaux · Calcul et nombres", court: "Le tiers d'un nombre, c'est ce nombre divisé par 3.",
      long: ["Ex : le tiers de 18 est 6."] },
    { id: "quart", nom: "quart", chap: "Tous niveaux · Calcul et nombres", court: "Le quart d'un nombre, c'est ce nombre divisé par 4. C'est la moitié de la moitié.",
      long: ["Ex : le quart de 20 est 5."] },
    { id: "entier", nom: "nombre entier", chap: "Tous niveaux · Calcul et nombres", court: "Nombre sans virgule, comme 7, 120 ou 0.",
      long: ["En 4e, on connaît aussi les entiers négatifs : −3, −10…"] },
    { id: "pair", nom: "nombre pair", chap: "Tous niveaux · Calcul et nombres", court: "Nombre entier multiple de 2. Il se termine par 0, 2, 4, 6 ou 8.",
      long: ["Ex : 14 et 250 sont pairs."] },
    { id: "impair", nom: "nombre impair", chap: "Tous niveaux · Calcul et nombres", court: "Nombre entier qui n'est pas pair. Il se termine par 1, 3, 5, 7 ou 9.",
      long: ["Ex : 17 et 245 sont impairs."] },
    { id: "positif", nom: "positif", chap: "Tous niveaux · Calcul et nombres", court: "Un nombre positif est plus grand que 0 (ou égal à 0).",
      long: ["Ex : 5 ; 0,2 et 100 sont positifs. −3 est négatif."] },
    { id: "fraction", nom: "fraction", chap: "Tous niveaux · Calcul et nombres", court: "Écriture a/b : l'unité est partagée en b parts égales et on en prend a.",
      long: ["Ex : 3/4 veut dire 3 parts sur 4 parts égales.", "Une fraction est aussi un quotient : 3/4 = 3 ÷ 4 = 0,75."] },
    { id: "numerateur", nom: "numérateur", chap: "Tous niveaux · Calcul et nombres", court: "Le nombre du haut d'une fraction : combien de parts on prend.",
      long: ["Dans 3/4, le numérateur est 3."] },
    { id: "denominateur", nom: "dénominateur", chap: "Tous niveaux · Calcul et nombres", court: "Le nombre du bas d'une fraction : en combien de parts égales l'unité est partagée.",
      long: ["Dans 3/4, le dénominateur est 4. Il ne peut jamais être 0."] },
    { id: "unite", nom: "unité", chap: "Tous niveaux · Calcul et nombres", court: "Dans un nombre : le rang des « un », juste avant la virgule. Pour une mesure : ce qu'on a compté ou mesuré (cm, kg, €, h…).",
      long: ["Dans 47,5, le chiffre 7 est le chiffre des unités.", "Un résultat de mesure s'écrit toujours avec son unité."] },
    { id: "dizaine", nom: "dizaine", chap: "Tous niveaux · Calcul et nombres", court: "10 unités. Dans 47, le chiffre 4 est le chiffre des dizaines : 4 dizaines = 40.",
      long: ["Il y a 10 dizaines dans une centaine."] },
    { id: "centaine", nom: "centaine", chap: "Tous niveaux · Calcul et nombres", court: "100 unités. Dans 358, le chiffre 3 est le chiffre des centaines : 3 centaines = 300.",
      long: ["Il y a 10 centaines dans un millier."] },
    { id: "millier", nom: "millier", chap: "Tous niveaux · Calcul et nombres", court: "1 000 unités, soit 10 centaines. Dans 4 725, il y a 4 milliers.",
      long: ["Mille milliers font un million."] },
    { id: "dixieme", nom: "dixième", chap: "Tous niveaux · Calcul et nombres", court: "La dixième partie de 1 : 0,1 = 1/10.",
      long: ["Dans 3,52, le chiffre 5 est au rang des dixièmes."] },
    { id: "centieme", nom: "centième", chap: "Tous niveaux · Calcul et nombres", court: "La centième partie de 1 : 0,01 = 1/100.",
      long: ["Dans 3,52, le chiffre 2 est au rang des centièmes. Arrondir « au centième », c'est garder 2 chiffres après la virgule."] },
    { id: "millieme", nom: "millième", chap: "Tous niveaux · Calcul et nombres", court: "La millième partie de 1 : 0,001 = 1/1 000.",
      long: ["Dans 3,524, le chiffre 4 est au rang des millièmes."] },
    { id: "classe-nombre", nom: "classe d'un nombre", chap: "Tous niveaux · Calcul et nombres", court: "Groupe de trois chiffres dans un grand nombre : unités, milliers, millions, milliards.",
      long: ["Pour lire 3 040 007, on lit « 3 millions » puis « 40 mille » puis « 7 »."] },
    { id: "arrondi", nom: "arrondi", chap: "Tous niveaux · Calcul et nombres", court: "Remplacer un nombre par un nombre proche, plus simple. Ex : 3,14159 arrondi au centième donne 3,14.",
      long: ["Si le chiffre suivant est 0, 1, 2, 3 ou 4, on garde ; si c'est 5, 6, 7, 8 ou 9, on augmente de 1."] },
    { id: "encadrer", nom: "encadrer", chap: "Tous niveaux · Calcul et nombres", court: "Encadrer un nombre, c'est trouver deux nombres entre lesquels il se trouve. Ex : 6 < √41 < 7.",
      long: ["On peut encadrer à l'unité, au dixième, au centième…"] },
    { id: "carre", nom: "carré", chap: "Tous niveaux · Calcul et nombres", court: "Le carré d'un nombre a est a × a, noté a². Ex : 5² = 25. Un carré est aussi une figure à 4 côtés égaux et 4 angles droits.",
      long: ["L'aire d'un carré de côté c est c × c = c²."] },
    { id: "puissance", nom: "puissance", chap: "Tous niveaux · Calcul et nombres", court: "a³ = a × a × a. Le petit nombre en haut s'appelle l'exposant : il dit combien de fois on multiplie a par lui-même.",
      long: ["Ex : 2⁴ = 2 × 2 × 2 × 2 = 16."] },
    { id: "exposant", nom: "exposant", chap: "Tous niveaux · Calcul et nombres", court: "Le petit nombre écrit en haut à droite : il dit combien de fois on multiplie le nombre par lui-même.",
      long: ["Dans 3⁴, l'exposant est 4."] },
    { id: "consecutifs", nom: "consécutifs", chap: "Tous niveaux · Calcul et nombres", court: "Qui se suivent, sans trou. Ex : 7, 8 et 9 sont trois entiers consécutifs.",
      long: [] },
    { id: "inferieur", nom: "inférieur", chap: "Tous niveaux · Calcul et nombres", court: "A est inférieur à B si A est plus petit que B. On écrit A < B.",
      long: ["Ex : 3,5 < 4."] },
    { id: "superieur", nom: "supérieur", chap: "Tous niveaux · Calcul et nombres", court: "A est supérieur à B si A est plus grand que B. On écrit A > B.",
      long: ["Ex : 4 > 3,5."] },
    { id: "maximum", nom: "maximum", chap: "Tous niveaux · Calcul et nombres", court: "La plus grande valeur possible.",
      long: ["Le contraire est le minimum."] },
    { id: "moyenne", nom: "moyenne", chap: "Tous niveaux · Calcul et nombres", court: "On additionne toutes les valeurs, puis on divise par leur nombre. Ex : moyenne de 8, 10 et 12 : 30 ÷ 3 = 10.",
      long: [] },
    { id: "tableau-proportionnalite", nom: "tableau de proportionnalité", chap: "Tous niveaux · Calcul et nombres", court: "Tableau où la deuxième ligne s'obtient en multipliant la première par un même nombre (le coefficient).",
      long: ["Ex : 2 → 5 et 4 → 10 : on multiplie par 2,5."] },
    { id: "critere-div", nom: "critères de divisibilité", chap: "Tous niveaux · Calcul et nombres", court: "Règles pour savoir si un nombre est divisible par 2, 3, 5, 9 ou 10, sans faire la division.",
      long: ["Par 2 : il finit par 0, 2, 4, 6 ou 8. Par 5 : il finit par 0 ou 5. Par 10 : il finit par 0.", "Par 3 (ou 9) : la somme de ses chiffres est dans la table de 3 (ou 9)."] },
    { id: "diviseur-commun", nom: "diviseur commun", chap: "Tous niveaux · Calcul et nombres", court: "Nombre qui est diviseur de deux nombres à la fois. Ex : 6 est un diviseur commun de 12 et 18.",
      long: [] },
    { id: "augmentation", nom: "augmentation", chap: "Tous niveaux · Calcul et nombres", court: "Quand une quantité devient plus grande. Une augmentation de t % ajoute t % de la valeur de départ.",
      long: ["Ex : 80 € augmenté de 25 % → 80 + 20 = 100 €."] },
    { id: "diminution", nom: "diminution", chap: "Tous niveaux · Calcul et nombres", court: "Quand une quantité devient plus petite. Une baisse de t % enlève t % de la valeur de départ.",
      long: ["Ex : 80 € baissé de 25 % → 80 − 20 = 60 €."] },
    { id: "reduction", nom: "réduction", chap: "Tous niveaux · Calcul et nombres", court: "Baisse de prix. Ex : une réduction de 20 % sur 50 € fait économiser 10 €.",
      long: [] },
    { id: "taux", nom: "taux", chap: "Tous niveaux · Calcul et nombres", court: "Nombre qui exprime une évolution ou une part, souvent en pourcentage. Ex : un taux d'augmentation de 20 %.",
      long: [] },
    { id: "evolution", nom: "évolution", chap: "Tous niveaux · Calcul et nombres", court: "Changement d'une quantité entre un début et une fin, en hausse ou en baisse.",
      long: ["On la mesure en valeur (+5 €) ou en pourcentage (+20 %)."] },
    { id: "point", nom: "point", chap: "Tous niveaux · Géométrie", court: "Position précise dans le plan, marquée par une croix et nommée par une lettre majuscule : A, B, O…",
      long: [] },
    { id: "angle", nom: "angle", chap: "Tous niveaux · Géométrie", court: "Figure formée par deux demi-droites de même origine. On le mesure en degrés (°).",
      long: ["Un angle droit mesure 90°."] },
    { id: "triangle", nom: "triangle", chap: "Tous niveaux · Géométrie", court: "Polygone à 3 côtés et 3 sommets.",
      long: ["La somme des trois angles d'un triangle fait 180°."] },
    { id: "rectangle", nom: "rectangle", chap: "Tous niveaux · Géométrie", court: "Quadrilatère qui a 4 angles droits. Ses côtés opposés ont la même longueur.",
      long: ["Aire = longueur × largeur. Périmètre = 2 × (longueur + largeur)."] },
    { id: "polygone", nom: "polygone", chap: "Tous niveaux · Géométrie", court: "Figure fermée dont tous les côtés sont des segments.",
      long: ["Ex : triangle (3 côtés), carré (4), hexagone (6)."] },
    { id: "diagonale", nom: "diagonale", chap: "Tous niveaux · Géométrie", court: "Segment qui relie deux sommets non voisins d'un polygone.",
      long: [] },
    { id: "sommet", nom: "sommet", chap: "Tous niveaux · Géométrie", court: "Un « coin » d'une figure : le point où deux côtés se rencontrent.",
      long: ["Un triangle a 3 sommets."] },
    { id: "cote", nom: "côté", chap: "Tous niveaux · Géométrie", court: "Un des segments qui bordent un polygone. Dans un triangle rectangle : l'hypoténuse et les deux côtés de l'angle droit.",
      long: [] },
    { id: "figure", nom: "figure", chap: "Tous niveaux · Géométrie", court: "Dessin de points, droites, segments, cercles… obtenu avec les instruments de géométrie.",
      long: [] },
    { id: "aire", nom: "aire", chap: "Tous niveaux · Géométrie", court: "Mesure de la surface d'une figure, en cm², m²…",
      long: ["Rectangle : longueur × largeur. Carré : côté × côté. Disque : π × rayon × rayon."] },
    { id: "volume", nom: "volume", chap: "Tous niveaux · Géométrie", court: "Mesure de la place que prend un objet dans l'espace, en cm³, m³ ou en litres.",
      long: ["1 L = 1 dm³ = 1 000 cm³."] },
    { id: "longueur", nom: "longueur", chap: "Tous niveaux · Géométrie", court: "Mesure d'une distance ou d'un segment, en cm, m, km… C'est aussi la grande dimension d'un rectangle.",
      long: [] },
    { id: "largeur", nom: "largeur", chap: "Tous niveaux · Géométrie", court: "La petite dimension d'un rectangle.",
      long: [] },
    { id: "extremite", nom: "extrémité", chap: "Tous niveaux · Géométrie", court: "Les extrémités d'un segment sont ses deux bouts : les points de départ et d'arrivée.",
      long: ["Le segment [AB] a pour extrémités A et B."] },
    { id: "oppose", nom: "opposé", chap: "Tous niveaux · Géométrie", court: "Le côté opposé à un angle est celui qui est en face de lui, sans le toucher.",
      long: ["Dans un triangle rectangle, l'hypoténuse est opposée à l'angle droit."] },
    { id: "graduee", nom: "graduée", chap: "Tous niveaux · Géométrie", court: "Une droite graduée est partagée en parts égales par des traits régulièrement espacés, avec des nombres écrits.",
      long: ["Chaque graduation correspond à un nombre."] },
    { id: "coordonnees", nom: "coordonnées", chap: "Tous niveaux · Géométrie", court: "Nombres qui donnent la position d'un point dans un repère : on lit d'abord l'abscisse (horizontal), puis l'ordonnée (vertical).",
      long: ["Ex : A(3 ; 2)."] },
    { id: "echelle", nom: "échelle", chap: "Tous niveaux · Géométrie", court: "Rapport entre une longueur dessinée et la longueur réelle. Ex : à l'échelle 1/100, 1 cm sur le dessin représente 100 cm dans la réalité.",
      long: [] },
    { id: "compas", nom: "compas", chap: "Tous niveaux · Géométrie", court: "Instrument qui sert à tracer des cercles et à reporter des longueurs.",
      long: ["On pique la pointe sur le centre et on règle l'écartement sur le rayon."] },
    { id: "equerre", nom: "équerre", chap: "Tous niveaux · Géométrie", court: "Instrument en forme de triangle rectangle : il sert à tracer ou à vérifier un angle droit.",
      long: [] },
    { id: "appartient", nom: "appartenir", chap: "Tous niveaux · Géométrie", court: "Un point appartient à une droite (ou à un cercle) s'il est sur cette droite (ou sur ce cercle).",
      long: ["On dit « A appartient à (d) »."] },
    { id: "notation", nom: "notation", chap: "Tous niveaux · Géométrie", court: "Manière d'écrire en mathématiques : [AB] pour un segment, (d) pour une droite, AB pour une longueur.",
      long: [] },
    { id: "demi-disque", nom: "demi-disque", chap: "Tous niveaux · Géométrie", court: "Moitié d'un disque : il est limité par un demi-cercle et son diamètre.",
      long: [] },
    { id: "quart-de-cercle", nom: "quart de cercle", chap: "Tous niveaux · Géométrie", court: "Arc égal au quart du cercle. Il correspond à un angle droit au centre.",
      long: [] },
    { id: "quart-de-disque", nom: "quart de disque", chap: "Tous niveaux · Géométrie", court: "Quart d'un disque : il est limité par un quart de cercle et deux rayons.",
      long: [] },
    { id: "ensemble", nom: "ensemble", chap: "Tous niveaux · Géométrie", court: "Collection d'objets mathématiques. Ex : le cercle est l'ensemble des points situés à la même distance du centre.",
      long: [] },
    { id: "propriete", nom: "propriété", chap: "Tous niveaux · Raisonnement", court: "Phrase mathématique vraie qu'on peut utiliser pour calculer ou pour prouver.",
      long: [] },
    { id: "theoreme", nom: "théorème", chap: "Tous niveaux · Raisonnement", court: "Propriété mathématique qui a été démontrée (prouvée).",
      long: ["Ex : le théorème de Pythagore."] },
    { id: "demonstration", nom: "démonstration", chap: "Tous niveaux · Raisonnement", court: "Raisonnement qui prouve, étape par étape, qu'une affirmation est vraie.",
      long: [] },
    { id: "reciproque", nom: "réciproque", chap: "Tous niveaux · Raisonnement", court: "La réciproque de « si A alors B » est « si B alors A ». Elle n'est pas toujours vraie.",
      long: ["Ex : « si un nombre est multiple de 4, alors il est pair » est vrai ; sa réciproque est fausse (6 est pair, pas multiple de 4)."] },
    { id: "egalite", nom: "égalité", chap: "Tous niveaux · Raisonnement", court: "Écriture avec un signe = : les deux membres ont la même valeur.",
      long: ["Ex : BC² = AB² + AC²."] },
    { id: "formule", nom: "formule", chap: "Tous niveaux · Raisonnement", court: "Écriture avec des lettres qui donne le calcul à faire. Ex : P ≈ 3,14 × d.",
      long: [] },
    { id: "affirmation", nom: "affirmation", chap: "Tous niveaux · Raisonnement", court: "Phrase qui dit que quelque chose est vrai. On doit la justifier, ou la réfuter avec un contre-exemple.",
      long: [] },
    { id: "contre-exemple", nom: "contre-exemple", chap: "Tous niveaux · Raisonnement", court: "Un exemple qui montre qu'une affirmation est fausse. Un seul contre-exemple suffit.",
      long: ["Ex : « tout nombre premier est impair » est faux : 2 est premier et pair."] },
    { id: "definition", nom: "définition", chap: "Tous niveaux · Raisonnement", court: "Phrase qui dit précisément ce que veut dire un mot de mathématiques.",
      long: [] },
    { id: "grandeur", nom: "grandeur", chap: "Tous niveaux · Mesures et grandeurs", court: "Ce qu'on peut mesurer : une longueur, une durée, une masse, un prix, une vitesse…",
      long: ["Une grandeur s'écrit avec une unité."] },
    { id: "duree", nom: "durée", chap: "Tous niveaux · Mesures et grandeurs", court: "Temps écoulé entre un début et une fin.",
      long: ["Elle se mesure en heures, minutes, secondes."] },
    { id: "masse", nom: "masse", chap: "Tous niveaux · Mesures et grandeurs", court: "Mesure de la quantité de matière d'un objet, en g ou en kg. Dans la vie courante, on dit « poids ».",
      long: [] },
    { id: "energie", nom: "énergie", chap: "Tous niveaux · Mesures et grandeurs", court: "Ce qu'un appareil consomme pendant une durée : énergie = puissance × durée, en kWh.",
      long: [] },
    { id: "puissance-elec", nom: "puissance électrique", chap: "Tous niveaux · Mesures et grandeurs", court: "Ce que consomme un appareil à chaque instant, en watts (W) ou en kilowatts (kW). 1 kW = 1 000 W.",
      long: ["Plus la puissance est grande, plus l'appareil consomme vite."] },
    { id: "conversion", nom: "conversion", chap: "Tous niveaux · Mesures et grandeurs", court: "Écrire une mesure dans une autre unité. Ex : 2 h = 120 min ; 1,5 L = 1 500 mL.",
      long: [] }
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
    ".gl{cursor:pointer;border-radius:3px}" +
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
    el.addEventListener("click", function () {
      if (!survol && actif === el && !carte.hidden) fermer(); else ouvrir(el);
    });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); ouvrir(el); }
    });
    if (survol) {
      el.addEventListener("mouseenter", function () { clearTimeout(minuteur); ouvrir(el); });
      el.addEventListener("mouseleave", function () { minuteur = setTimeout(fermer, 300); });
    }
  });


  carte.addEventListener("mouseenter", function () { clearTimeout(minuteur); });
  carte.addEventListener("mouseleave", function () { if (survol) minuteur = setTimeout(fermer, 300); });
  document.addEventListener("click", function (e) {
    if (e.target && e.target.closest && e.target.closest(".gl, .gl-carte")) return;
    fermer();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fermer(); });
})();
