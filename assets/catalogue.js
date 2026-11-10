/* =========================================================
   CATALOGUE DU SITE — le seul fichier à modifier pour ajouter du contenu.

   Pour ajouter une page :
   1. Dépose son dossier dans  pages/<nom-du-dossier>/index.html
   2. Ajoute une ligne dans le bon chapitre ci-dessous :
        { id: "nom-du-dossier", type: "jeu", titre: "…", resume: "…", ajout: "2026-10-12" }

   Types possibles :
     "lecon"   → Leçon
     "exos"    → Exercices corrigés en classe (séances, cahier d'exercices)
     "classe"  → Activité projetée en classe
     "jeu"     → Mini-jeu
     "plus"    → Exercices supplémentaires corrigés (pour s'entraîner encore)

   CHAPITRE PAS ENCORE FAIT EN CLASSE : ajoute  prive: true  dans le chapitre. Les élèves voient une carte
   « Réservé » avec un champ mot de passe, et rien d'autre (le contenu n'est ni listé ni cherchable).
   Le mot de passe se règle plus bas (CODE). Pour ouvrir un chapitre à tous, supprime « prive: true ».
   Ce n'est pas une sécurité forte : quelqu'un qui connaît l'adresse d'une page peut l'ouvrir.

   Un chapitre avec  bientot: true  s'affiche grisé « Bientôt en ligne ».

   Dans un chapitre avec séances, la leçon et les mini-jeux sont affichés en onglets tout en haut ;
   chaque séance ne montre que ses exercices corrigés (types "exos" et "classe") puis son bilan.

   Pour décrire les séances d'un chapitre (affiché au-dessus des ressources), ajoute
   dans le chapitre une liste  seances  :
        seances: [
          { titre: "…", duree: "50 min",
            contenu: ["ce qu'on fait, étape par étape", "…"],
            ressources: ["id-d-une-ressource-du-chapitre"],
            retenir: ["les 3 règles à apprendre (**gras** possible)"],
            exemple: "un exemple calculé, en une ligne",
            savoir: "ce que l'élève doit savoir faire (complète « Je sais… »)" }
        ]

   Leçon commune d'un niveau (ex. 6e, leçon faite par une collègue et hébergée ailleurs) :
   dans le niveau, ajoute  leconCommune: { titre, texte, lien, qr }  → un onglet « Leçon » (bouton + QR code)
   apparaît dans la classe, à côté de Chapitres / Ascension / Évaluations.
   Tests d'ascension (onglet « Ascension » d'une classe) :
   un chapitre a son test dès qu'il a un bloc dans assets/questions.js (ASC.inscrire("<id du chapitre>", …)).
   Le test d'un chapitre est cumulatif : il reprend aussi les questions des chapitres précédents du même niveau.
   Rien à ajouter ici. Les réglages (gain par test, plafond de la semaine, date du sommet, seuil de
   réussite) sont tout en haut de assets/ascension.js. Les mini-jeux ne font pas monter la montgolfière.
   Évaluations (onglet « Évaluations » d'une classe) :
   1. Dépose les PDF dans  evaluations/<niveau>/  (ex. evaluations/4e/4e-ch1-A.pdf, 4e-ch1-A-corrige.pdf).
   2. Dans le niveau (à côté de « chapitres »), ajoute une liste  evaluations  :
        evaluations: [
          { chapitre: "4e-ch1", etiquette: "Chapitres 1 et 2", titre: "Évaluation — …", resume: "…", ajout: "2026-10-14",
            versions: [
              { nom: "A", sujet: "evaluations/4e/4e-ch1-A.pdf", corrige: "evaluations/4e/4e-ch1-A-corrige.pdf" },
              { nom: "B", sujet: "evaluations/4e/4e-ch1-B.pdf", corrige: "evaluations/4e/4e-ch1-B-corrige.pdf" }
            ] }
        ]
      « chapitre », « etiquette » (texte au-dessus du titre, par défaut « Chapitre N »), « resume » et « ajout » sont facultatifs.
      Un fichier peut contenir A et B : mets alors une seule version, nom: "A et B". Avec nom: "", le mot « Version » n'est pas affiché.
      Un niveau sans liste affiche « Les évaluations arrivent bientôt ».
   ========================================================= */
window.SITE = {
  titre: "Les maths de M. Lorenzini",
  sousTitre: "Leçons, exercices corrigés et mini-jeux, au même endroit.",
  niveaux: [
    {
      id: "6e", nom: "6e", couleur: "vert",
      accroche: "Fractions, nombres décimaux, géométrie",
      leconCommune: {
        titre: "Le cahier de leçons de 6e",
        texte: "La leçon est commune à toutes les classes de 6e. Pour mettre ton cahier à jour, ouvre le lien ou scanne le QR code. Il est inutile de se connecter !",
        lien: "https://www.pearltrees.com/private/id107692875?access=47ecdee83de.66b434b.dac4513f64c7f6901573f8ed973fad40",
        qr: "assets/qr-lecon-6e.png"
      },
      evaluations: [
        { etiquette: "Chapitres 1 et 2", titre: "Évaluation — Numération & Géométrie",
          resume: "Rang des chiffres, nombres décimaux, vocabulaire et notations, distances. 50 min, sur 20.", ajout: "2026-10-14",
          versions: [ { nom: "", sujet: "evaluations/6e/6e-ch1-2-sujet.pdf", corrige: "evaluations/6e/6e-ch1-2-corrige.pdf" } ] }
        ,{ chapitre: "6e-ch4", etiquette: "Chapitre 4 · Petit test", titre: "Petit test — Les fleurs des décimaux",
          resume: "Compléter les pétales : écriture décimale, en mots, fraction décimale, nombre mixte, somme de fractions.", ajout: "2026-10-14",
          versions: [ { nom: "A et B", sujet: "evaluations/6e/6e-fleurs-decimaux-sujets-A-et-B.pdf", corrige: "evaluations/6e/6e-fleurs-decimaux-corrige-A-et-B.pdf" } ] }
        ,{ chapitre: "6e-ch5", etiquette: "Chapitre 5 · Petit test", titre: "Petit test — Le tour d'un cercle",
          resume: "Deux périmètres de cercle, l'un avec le rayon, l'autre avec le diamètre. Touche π, arrondi au centième. 8 min, sur 4.", ajout: "2026-11-10",
          versions: [ { nom: "A et B", sujet: "evaluations/6e/6e-ch5-petit-test-cercle-sujets-A-et-B.pdf", corrige: "evaluations/6e/6e-ch5-petit-test-cercle-corrige-A-et-B.pdf" } ] }
      ],
      chapitres: [
        {
          id: "6e-ch1", num: 1, titre: "Numération entière et décimale",
          resume: "Lire les grands nombres, rang des chiffres, « chiffre des » et « nombre de », zéros inutiles.",
          seances: [
            {
              titre: "Lire et écrire les grands nombres", duree: "50 min",
              contenu: [
                "Automatisme, puis on apprend à couper un grand nombre en classes de trois chiffres (unités, milliers, millions, milliards) pour le lire et l'écrire en chiffres et en lettres.",
                "On compare et on range des nombres entiers."
              ],
              ressources: ["6e-ch1-s1"],
              retenir: [
                "On lit un grand nombre par **groupes de trois chiffres**, en partant de la droite : milliards, millions, milliers, unités.",
                "Un groupe qui n'est pas dit s'écrit **000**, et un groupe incomplet se complète par des zéros à gauche.",
                "Pour comparer, on compte d'abord les chiffres : le nombre qui en a le plus est le plus grand."
              ],
              exemple: "47 305 210 se lit « quarante-sept millions trois cent cinq mille deux cent dix ».",
              savoir: "lire et écrire un grand nombre entier, et comparer deux nombres entiers."
            },
            {
              titre: "Le rang des chiffres : « chiffre des » et « nombre de »", duree: "50 min",
              contenu: [
                "On place des nombres dans le tableau de numération (partie entière et partie décimale) et on nomme les rangs : unités, dizaines, centaines… dixièmes, centièmes, millièmes.",
                "On apprend à ne pas confondre « le chiffre des centaines » et « le nombre de centaines », puis on donne la valeur d'un chiffre."
              ],
              ressources: ["6e-ch1-s2", "6e-ch1-entrainement"],
              retenir: [
                "Le **chiffre des centaines** est un seul chiffre, celui qui est écrit au rang des centaines.",
                "Le **nombre de centaines** compte toutes les centaines du nombre : on garde tous les chiffres jusqu'à ce rang.",
                "La **valeur** d'un chiffre dépend de son rang : dans 3 408,46, le premier 4 vaut 400 et le second vaut 0,4."
              ],
              exemple: "Dans 4 725,306 : chiffre des centaines = 7 ; nombre de centaines = 47 ; nombre de centièmes = 472 530.",
              savoir: "donner le chiffre des… et le nombre de… d'un nombre décimal, et la valeur d'un chiffre."
            },
            {
              titre: "Les nombres décimaux : zéros inutiles et décompositions", duree: "50 min",
              contenu: [
                "On repère les zéros inutiles (à gauche de la partie entière, à droite de la partie décimale) et on les supprime sans changer la valeur du nombre.",
                "On décompose un nombre décimal selon la valeur de ses chiffres, et on retrouve l'écriture décimale à partir d'une décomposition."
              ],
              ressources: ["6e-ch1-s3"],
              retenir: [
                "Un zéro est **inutile** si on peut le supprimer sans changer le rang des autres chiffres.",
                "Un zéro placé **entre deux chiffres** est toujours utile : 3,05 ≠ 3,5.",
                "On peut décomposer : 36,25 = 3 × 10 + 6 × 1 + 2 × 0,1 + 5 × 0,01."
              ],
              exemple: "00 209,700 = 209,7 ; mais 209,07 ≠ 209,7.",
              savoir: "supprimer les zéros inutiles et décomposer un nombre décimal."
            }
          ],
          ressources: [
            { id: "6e-ch1-lecon", type: "lecon", titre: "Leçon — Numération entière et décimale", resume: "Un tableau de numération, la lecture des nombres et « chiffre des / nombre de » à tester avec tes propres nombres.", ajout: "2026-10-14" },
            { id: "6e-ch1-s1", type: "exos", titre: "Séance 1 — Lire et écrire les grands nombres", resume: "Classes, lettres et chiffres, rangement de nombres.", ajout: "2026-10-14" },
            { id: "6e-ch1-s2", type: "exos", titre: "Séance 2 — Le rang des chiffres", resume: "« Chiffre des » ou « nombre de » ? Valeur d'un chiffre.", ajout: "2026-10-14" },
            { id: "6e-ch1-s3", type: "exos", titre: "Séance 3 — Zéros inutiles et décompositions", resume: "Supprimer les zéros inutiles, décomposer un décimal.", ajout: "2026-10-14" },
            { id: "6e-ch1-entrainement", type: "jeu", titre: "Entraînement — Numération", resume: "Des séries de 8 questions, avec de nouveaux nombres à chaque fois.", ajout: "2026-10-14" }
          ]
        },
        {
          id: "6e-ch2", num: 2, titre: "Points, droites et distances",
          resume: "Vocabulaire, notations, distance entre deux points et milieu d'un segment.",
          seances: [
            {
              titre: "Le vocabulaire de la géométrie", duree: "≈ 45 min",
              contenu: [
                "On cherche dans la salle des objets qui ressemblent à un point, une droite ou un segment.",
                "On découvre le vocabulaire et les notations avec des cartes à retourner.",
                "On joue au Mémory pour associer chaque notation à sa définition."
              ],
              ressources: ["points-droites-distances", "6e-ch2-cahier-exercices"],
              retenir: [
                "Un **point** se note A ; une **droite** (AB) ; un **segment** [AB] ; une **demi-droite** [AB).",
                "A ∈ (d) se lit « A appartient à (d) » ; C ∉ (d) se lit « C n'appartient pas à (d) ». Des points d'une même droite sont **alignés**.",
                "**[AB]** est le segment (un objet) ; **AB** est sa longueur (un nombre, sans crochets)."
              ],
              exemple: "[EF] est un segment. S'il mesure 3 cm, on écrit EF = 3 cm.",
              savoir: "nommer et noter un point, une droite, un segment et une demi-droite, et dire si un point appartient à une droite."
            },
            {
              titre: "Reporter des longueurs et trouver la distance", duree: "≈ 42 min",
              contenu: [
                "On reporte une longueur au compas pour construire deux segments de même longueur, puis on les code avec le même nombre de petits traits.",
                "Vrai ou faux éclair : chaque équipe vote sans parler.",
                "Au tableau : trois trajets différents entre A et B. Lequel est le plus court ?"
              ],
              ressources: ["points-droites-distances", "6e-ch2-cahier-exercices"],
              retenir: [
                "La **distance AB** est la longueur du plus court chemin de A à B : c'est la longueur du segment [AB].",
                "Si C ∉ [AB], alors **AC + CB > AB**. Si D ∈ [AB], alors **AD + DB = AB**.",
                "Deux segments codés avec les mêmes petits traits ont la même longueur : on les reporte au compas."
              ],
              exemple: "AD = 2,5 cm et DB = 3,5 cm : AD + DB = 6 cm = AB, donc D ∈ [AB].",
              savoir: "reporter une longueur au compas et utiliser AD + DB = AB pour savoir si un point est sur un segment."
            },
            {
              titre: "Réinvestir et faire le point", duree: "≈ 46 min",
              contenu: [
                "Chasse au trésor par équipes : 8 questions sur le vocabulaire, les notations et les distances.",
                "Entraînement dans le manuel, page 91.",
                "Ticket de sortie : on répond seul, sans aide, puis on vérifie."
              ],
              ressources: ["points-droites-distances", "6e-ch2-cahier-exercices"],
              retenir: [
                "Codage : **mêmes petits traits = mêmes longueurs** ; petit carré = angle droit.",
                "Le **milieu** M de [AB] est le point de [AB] à égale distance de A et de B.",
                "AB est la longueur du plus court chemin entre A et B."
              ],
              exemple: "(AB) est une droite ; [AB] est un segment ; AB = 4,5 cm est une longueur.",
              savoir: "lire une figure codée et écrire correctement chaque notation."
            }
          ],
          ressources: [
            { id: "points-droites-distances", type: "classe", titre: "Points, droites & distances", resume: "Le support projeté pendant les séances, avec les jeux faits en classe.", ajout: "2026-09-11" },
            { id: "6e-ch2-cahier-exercices", type: "exos", titre: "Cahier d'exercices — Chapitre 2", resume: "Tous les exercices du chapitre, avec leur correction.", ajout: "2026-09-11" },
            { id: "cahier-geometrie", type: "jeu", titre: "Mon cahier de géométrie", resume: "Six mini-jeux pour réviser à la maison, à ton rythme.", ajout: "2026-09-11" }
          ]
        },
        {
          id: "6e-ch3", num: 3, titre: "Les fractions",
          resume: "Partager en parts égales, placer une fraction sur une demi-droite graduée.",
          seances: [
            {
              titre: "Partager en parts égales", duree: "50 min",
              contenu: [
                "On partage une forme (rectangle, grille, disque) en parts égales et on colorie la fraction demandée.",
                "Défi de la tablette : colorier une grille avec 4 couleurs pour obtenir 4 parts égales. Il existe plusieurs façons de le faire."
              ],
              ressources: ["atelier-partages"],
              retenir: [
                "Dans la fraction **a/b**, le **dénominateur b** est le nombre de parts égales de l'unité, le **numérateur a** est le nombre de parts prises.",
                "Des parts égales ont la même taille, pas forcément la même forme.",
                "Si on prend plus d'une unité, la fraction est supérieure à 1."
              ],
              exemple: "3/5 : on partage l'unité en 5 parts égales et on en colorie 3.",
              savoir: "colorier une fraction donnée et dire ce que représentent le numérateur et le dénominateur."
            },
            {
              titre: "Placer une fraction sur une demi-droite graduée", duree: "50 min",
              contenu: [
                "On lit et on place des fractions sur une demi-droite graduée, seul puis en équipes.",
                "Piège à repérer : l'origine n'est pas toujours 0."
              ],
              ressources: ["course-fractions"],
              retenir: [
                "L'**unité** est le segment de 0 à 1 : on le partage en autant de parts que le dénominateur.",
                "Pour placer a/b, on compte **a graduations** depuis l'origine ; chaque graduation vaut 1/b. Le nombre qui repère un point est son **abscisse**.",
                "Si la droite ne commence pas à 0, on compte à partir de l'origine réelle."
              ],
              exemple: "Unité partagée en 5 : le point 3/5 est à la 3e graduation après 0.",
              savoir: "placer une fraction sur une demi-droite graduée et lire l'abscisse d'un point."
            },
            {
              titre: "Graduer un segment", duree: "50 min",
              contenu: [
                "On tire une consigne (par exemple « un segment de 8 cm en 4 parts égales »), on la construit à la règle, puis on vérifie avec le chronomètre.",
                "On s'entraîne ensuite avec le simulateur interactif."
              ],
              ressources: ["chantier-graduations"],
              retenir: [
                "Pour partager un segment en **N parts égales**, on calcule l'écart entre deux graduations : **longueur ÷ N**.",
                "On reporte ensuite cet écart de proche en proche, à partir d'une extrémité."
              ],
              exemple: "Segment de 8 cm en 4 parts égales : 8 ÷ 4 = 2 cm entre deux graduations.",
              savoir: "graduer un segment en N parts égales avec la règle."
            },
            {
              titre: "Le milieu d'un segment et synthèse", duree: "50 min",
              contenu: [
                "On cherche le milieu d'un segment sur une droite graduée.",
                "Escape game final : 5 épreuves, un chiffre de code à gagner à chaque épreuve (placer une fraction, graduer, trouver un milieu…).",
                "Exercices du TD, **page 52**."
              ],
              ressources: ["course-fractions", "enigme-segment"],
              retenir: [
                "Le **milieu** de [AB] est le point à égale distance de A et de B : il partage le segment en deux parts égales.",
                "Sur une droite graduée, on compte les graduations entre A et B, puis on **divise par 2**.",
                "Fraction, graduation et milieu servent tous à partager en parts égales."
              ],
              exemple: "Il y a 12 graduations entre A et B : le milieu est à 6 graduations de A.",
              savoir: "trouver le milieu d'un segment gradué."
            }
          ],
          ressources: [
            { id: "atelier-partages", type: "jeu", titre: "L'Atelier des Partages", resume: "Partage une forme, colorie, et regarde la fraction s'écrire.", ajout: "2026-09-22" },
            { id: "course-fractions", type: "jeu", titre: "La Course aux Fractions", resume: "Place le point au bon endroit sur la demi-droite graduée.", ajout: "2026-09-22" },
            { id: "chantier-graduations", type: "jeu", titre: "Le Chantier des Graduations", resume: "Des défis de construction à la règle, chronométrés.", ajout: "2026-09-22" },
            { id: "enigme-segment", type: "jeu", titre: "L'Énigme du Segment", resume: "Cinq épreuves pour trouver le code du coffre.", ajout: "2026-09-22" }
          ]
        },
        {
          id: "6e-ch4", num: 4, titre: "Fractions décimales et nombres décimaux",
          resume: "Dixièmes, centièmes, millièmes : un même nombre, plusieurs écritures.",
          seances: [
            {
              titre: "L'histoire de la virgule (1/2) : les dixièmes", duree: "50 min",
              contenu: [
                "On lit l'histoire du berger et de la ficelle : pour mesurer plus précisément, il partage son bâton en 10 parties égales.",
                "On écrit des quantités en dixièmes avec des fractions, puis on passe de 13/10 à 1 + 3/10 et inversement."
              ],
              ressources: ["histoire-virgule", "carre-10x10"],
              retenir: [
                "Pour être plus précis, on partage l'unité en 10 parties égales : chaque part est un **dixième** et l'unité fait **10 dixièmes**.",
                "Un nombre de dixièmes s'écrit avec une fraction de dénominateur 10 : 24 dixièmes = **24/10**.",
                "Dès qu'il y a 10 dixièmes, on a une unité entière : 13/10 = 1 + 3/10."
              ],
              exemple: "35/10 = 3 + 5/10, et 7 + 9/10 = 79/10.",
              savoir: "écrire une quantité en dixièmes sous forme de fraction, et passer de 13/10 à 1 + 3/10 (et inversement)."
            },
            {
              titre: "L'histoire de la virgule (2/2) : les centièmes et la virgule", duree: "50 min",
              contenu: [
                "Même idée : on partage chaque dixième en 10 parties égales. On obtient les centièmes.",
                "On écrit des nombres en dixièmes et centièmes, puis on découvre la virgule."
              ],
              ressources: ["histoire-virgule", "carre-10x10"],
              retenir: [
                "On partage chaque dixième en 10 : un **centième** est une part sur 100 (1/100). L'unité fait **100 centièmes**.",
                "10 centièmes font 1 dixième : 20/100 = 2/10.",
                "La **virgule** permet d'écrire le nombre « d'un seul morceau » : 2 unités, 5 dixièmes, 7 centièmes s'écrivent **2,57**. Et 3/10 = 0,3."
              ],
              exemple: "257/100 = 2 + 5/10 + 7/100 = 2,57.",
              savoir: "écrire avec une virgule un nombre donné en dixièmes et en centièmes."
            },
            {
              titre: "Les différentes écritures d'un nombre décimal (les fleurs)", duree: "50 min",
              contenu: [
                "Chaque fleur a 5 pétales, et chaque pétale montre une écriture du même nombre. On en connaît une, on complète les autres.",
                "Exercices : dixièmes et centièmes, millièmes et zéros cachés, pourcentages, fleur intruse et fleur mystère."
              ],
              ressources: ["fleurs-decimaux"],
              retenir: [
                "Un même nombre décimal s'écrit de plusieurs façons : **écriture décimale** (6,25), **fraction décimale** (625/100), **somme de fractions** (6 + 2/10 + 5/100), **nombre mixte** et **en mots**.",
                "Dans un tableau de numération, une case vide s'écrit **0**.",
                "Ajouter des zéros à droite de la partie décimale ne change pas le nombre : 0,5 = 0,50."
              ],
              exemple: "6,25 = 625/100 = 6 + 2/10 + 5/100.",
              savoir: "passer d'une écriture d'un nombre décimal à une autre."
            },
            {
              titre: "Les pourcentages", duree: "50 min",
              contenu: [
                "Exercices du TD, page 52.",
                "On lit un pourcentage sur une jauge, puis sur une grille de 100.",
                "On passe d'un pourcentage à une fraction et à un nombre décimal."
              ],
              ressources: ["jauge-pourcentages"],
              retenir: [
                "**p %** veut dire **p sur 100**.",
                "20 % = 20/100 = 0,2 : on passe d'un pourcentage à une fraction, puis à un nombre décimal.",
                "**100 %** correspond à l'unité entière ; au-delà de 100 %, on dépasse l'unité."
              ],
              exemple: "20 % = 20/100 = 0,2.",
              savoir: "écrire un pourcentage sous forme de fraction et de nombre décimal."
            },
            {
              titre: "Lire et placer un nombre décimal sur une droite graduée", duree: "50 min",
              contenu: [
                "On lit l'abscisse d'un point et on place un nombre sur une droite graduée en dixièmes.",
                "Avec la loupe, on découpe un dixième en 10 pour atteindre les centièmes (mini-jeu La Loupe à Décimaux)."
              ],
              ressources: ["loupe-decimaux"],
              retenir: [
                "Sur une droite graduée en dixièmes, chaque graduation vaut **0,1** ; dans la loupe, chaque graduation vaut **0,01**.",
                "Pour placer un décimal, on repère d'abord le bon dixième, puis on agrandit avec la loupe.",
                "Si la droite ne commence pas à 0, on compte à partir de l'origine réelle."
              ],
              exemple: "Dans la loupe entre 1,3 et 1,4, le point à la 7e graduation est 1,37.",
              savoir: "lire et placer un nombre décimal sur une droite graduée."
            },
            {
              titre: "Calculer avec des décimaux : prix et durées", duree: "50 min",
              contenu: [
                "Le jeu de la caisse : on calcule le total d'un ticket de caisse, puis la monnaie à rendre (mini-jeu La Caisse Enregistreuse).",
                "Chrono Fou : on convertit des durées et on calcule des horaires de trains (mini-jeu Le Chrono Fou)."
              ],
              ressources: ["caisse-enregistreuse", "chrono-fou"],
              retenir: [
                "Pour additionner ou soustraire des décimaux, on pose l'opération en mettant **la virgule sous la virgule**, et on complète avec des zéros.",
                "La monnaie à rendre est une soustraction : somme donnée − total à payer.",
                "Les durées ne se comptent pas par 10 : **1 h = 60 min** et **1 min = 60 s**. On convertit avant de calculer."
              ],
              exemple: "12,5 + 3,75 : on écrit 12,50 + 3,75 = 16,25. Et 2 h 15 min = 2 × 60 + 15 = 135 min.",
              savoir: "poser une opération avec des décimaux, rendre la monnaie et convertir une durée."
            }
          ],
          ressources: [
            { id: "histoire-virgule", type: "classe", titre: "L'histoire de la virgule", resume: "L'activité de découverte : du bâton partagé en 10 jusqu'à la virgule. À lire ou à télécharger en PDF.", ajout: "2026-10-12" },
            { id: "carre-10x10", type: "jeu", titre: "Le Carré 10×10", resume: "Colorie des dixièmes, puis des centièmes.", ajout: "2026-10-10" },
            { id: "fleurs-decimaux", type: "exos", titre: "Les Fleurs des Décimaux", resume: "Chaque pétale montre une écriture du même nombre. Avec correction.", ajout: "2026-10-10" },
            { id: "familles-decimales", type: "jeu", titre: "Le Jeu des Familles décimales", resume: "Quatre écritures pour un même nombre : complète chaque famille.", ajout: "2026-10-10" },
            { id: "memory-fractions-decimales", type: "jeu", titre: "Le Mémory des Fractions décimales", resume: "Retrouve les trois cartes qui montrent le même nombre.", ajout: "2026-10-10" },
            { id: "flash-decimaux", type: "jeu", titre: "Le Flash des Décimaux", resume: "Les automatismes de la leçon, en questions flash.", ajout: "2026-10-10" },
            { id: "loupe-decimaux", type: "jeu", titre: "La Loupe à Décimaux", resume: "Lis ou place un nombre décimal sur une droite graduée.", ajout: "2026-10-06" },
            { id: "coffre-decimal", type: "jeu", titre: "L'Énigme du Coffre décimal", resume: "Chaque cadenas résolu donne un chiffre du code.", ajout: "2026-10-06" },
            { id: "jauge-pourcentages", type: "jeu", titre: "La Jauge à Pourcentages", resume: "20 % = 20/100 = 0,2 : lis et remplis la jauge.", ajout: "2026-10-06" }
          ]
        },
        {
          id: "6e-ch5", num: 5, titre: "Cercle et disque",
          resume: "Vocabulaire du cercle, cercle et disque comme ensembles de points, périmètre d'un cercle et problèmes de longueurs.",
          seances: [
            {
              titre: "Le cercle et son vocabulaire", duree: "50 min",
              contenu: [
                "Activité : on place des points à 4 cm d'un point O et on découvre qu'ils dessinent un cercle.",
                "Atelier : on clique sur des points du cercle pour trouver un rayon, une corde, un diamètre et un arc, avec leur longueur.",
                "Exercices au cahier avec correction, puis mini-jeu par équipes."
              ],
              ressources: ["6e-ch5-s1", "cercle-et-ses-noms"],
              retenir: [
                "Le **cercle** de centre O et de rayon r est l'ensemble des points situés à la distance r de O.",
                "Un **rayon**, une **corde** et un **diamètre** sont des **segments** : un **rayon** relie le centre à un point du cercle ; une **corde** relie deux points du cercle ; un **diamètre** est une corde qui passe par le centre.",
                "Le **diamètre** est le double du rayon. Un **arc de cercle** est une **portion de cercle** : deux points d'un cercle en délimitent **deux**."
              ],
              exemple: "Un cercle de rayon 4,5 cm a un diamètre de 2 × 4,5 = 9 cm.",
              savoir: "nommer rayon, diamètre, corde et arc, et passer du rayon au diamètre."
            },
            {
              titre: "Le disque : dedans, dessus, dehors", duree: "50 min",
              contenu: [
                "Activité : une chèvre est attachée à un piquet par une corde de 4 cm. On prévoit les objets qu'elle peut atteindre, puis on trace le cercle : ils sont dans un disque.",
                "Fiche à imprimer (1 page, taille réelle) : exercice 1, deux antennes de portées différentes ; exercice 2, la chèvre attachée au coin d'un bâtiment (corde de 6 cm) : on cherche la zone où elle peut aller.",
                "Mini-jeu par équipes en bonus."
              ],
              ressources: ["6e-ch5-s2", "dedans-dessus-dehors"],
              retenir: [
                "Le **disque** de centre O et de rayon r est l'ensemble des points M tels que **OM ≤ r**. Le cercle est son bord : **OM = r**.",
                "Pour situer un point, on **compare sa distance à O avec le rayon** : plus petite (dans le disque), égale (sur le cercle) ou plus grande (hors du disque).",
                "On compare dans la **même unité**."
              ],
              exemple: "Rayon 3 cm : un point à 2,95 cm de O est dans le disque, un point à 3,05 cm est hors du disque.",
              savoir: "dire si un point est dans le disque, sur le cercle ou hors du disque."
            },
            {
              titre: "Le tour d'un cercle", duree: "50 min",
              contenu: [
                "Je prévois (8 min) : une roue fait un tour sur le sol. La prévision se fait à l'oral (combien de diamètres dans le tour ?), puis on déroule : 3 diamètres et un petit reste, pour trois tailles de roue.",
                "Je mesure (18 min, cahier) : chaque équipe trace un cercle (rayon 3, 4 ou 5 cm) et mesure son tour avec des pas de compas de 1 cm. Aucune fiche : les élèves tracent eux-mêmes leur cercle.",
                "Je retiens (12 min, au tableau) : on saisit les mesures de la classe, la calculatrice affiche P ÷ d à chaque ligne : presque le même nombre. Puis on divise les pas par 2 (6, 12, 24… 1 536 pas) dans un cercle de diamètre 10 cm : on calcule à chaque fois périmètre du polygone ÷ diamètre, et les chiffres 3 ; 3,1 ; 3,141 ; 3,1415… apparaissent un à un. Le polygone est plus court que le cercle (corde < arc) ; que ces nombres se rapprochent de π est admis en 6e. On nomme alors π.",
                "Je calcule (8 min, cahier) : un exemple puis trois calculs avec 3,14 × d. Je repère l'erreur (4 min, cahier) : rayon ou diamètre ? Mini-jeu par équipes en bonus."
              ],
              ressources: ["6e-ch5-s3", "tour-du-cercle"],
              retenir: [
                "Le tour d'un cercle s'appelle son **périmètre**.",
                "Le périmètre d'un cercle est **un peu plus de 3 fois son diamètre**. Le quotient **périmètre ÷ diamètre** est le même pour tous les cercles : c'est le nombre **π** (lu « pi »), et **π ≈ 3,14**.",
                "Pour calculer un tour : **périmètre ≈ 3,14 × diamètre**. On multiplie le diamètre, pas le rayon."
              ],
              exemple: "Une canette de diamètre 6,6 cm a un tour d'environ 3,14 × 6,6 ≈ 20,7 cm.",
              savoir: "dire que le périmètre d'un cercle est un peu plus de 3 fois son diamètre, connaître π ≈ 3,14 et calculer un tour à partir du diamètre."
            },
            {
              titre: "Les formules du tour", duree: "50 min",
              contenu: [
                "Je relie (7 min, projeté) : la machine à tours. Du rayon au diamètre (× 2), puis du diamètre au tour (× π). Si on connaît le diamètre, il n'y a qu'une étape.",
                "Je construis (10 min, projeté puis cahier) : le chemin de la machine s'écrit avec des lettres, P = π × d puis P = 2 × π × r. Deux choix rapides pour s'entraîner à prendre la bonne ligne.",
                "Je compare (10 min, projeté) : la touche π ou 3,14 ? Pour un CD, une roue de vélo, un trampoline et un rond-point, l'écart grandit avec la taille du cercle. Valeur exacte, valeur approchée, arrondi au centième.",
                "Je calcule (15 min, cahier) : un exemple, trois calculs avec la touche π (rayon ou diamètre donné, une longueur en mètres) et un défi sans calculatrice. Je repère l'erreur (5 min, cahier) : quatre élèves, une erreur chacun (rayon non doublé, 3,14, unité oubliée) ou rien à corriger."
              ],
              ressources: ["6e-ch5-s4"],
              retenir: [
                "Pour un cercle de diamètre **d** et de rayon **r** : **P = π × d** et **P = 2 × π × r** (car d = 2 × r).",
                "**π × d** est la valeur **exacte** du tour. **3,14** n'est qu'une valeur approchée de π : on utilise la **touche π** de la calculatrice.",
                "On arrondit **à la fin** du calcul, ici **au centième**, et on écrit l'**unité**."
              ],
              exemple: "Un jeton de rayon 1,5 cm : P = 2 × π × 1,5 ≈ 9,42 cm.",
              savoir: "calculer le périmètre d'un cercle à partir de son rayon ou de son diamètre avec la touche π, et arrondir au centième."
            },
            {
              titre: "Le tour d'une piste", duree: "50 min",
              contenu: [
                "Test flash (12 min avec la correction, cahier) : deux périmètres de cercle, l'un avec le rayon, l'autre avec le diamètre. Versions A et B projetées côte à côte, avec chronomètre ; la correction affiche aussi l'erreur la plus fréquente.",
                "Je décompose (12 min, projeté) : on trouve un à un les morceaux du tour d'une figure (demi-disque, quart de disque, porte arrondie), arcs et segments, puis on les additionne. Un trait à l'intérieur ne compte pas. Les quatre étapes de la méthode sont recopiées.",
                "Je m'entraîne (26 min, cahier) : six figures, de la plus facile à la plus difficile : miroir en demi-disque, part de tarte, vitrail, plaque au coin arrondi, piste d'athlétisme de 400 m, puis le défi des couloirs. Chaque exercice a son objectif et ses étapes ; un champ « Vérifier » explique les erreurs classiques."
              ],
              ressources: ["6e-ch5-s6"],
              retenir: [
                "Pour calculer le **tour d'une figure**, on repère les **morceaux de son contour** (segments et arcs de cercle) et on **additionne** leurs longueurs.",
                "Un **demi-cercle** vaut la **moitié** du tour du cercle entier, un **quart de cercle** en vaut le **quart** : on calcule le tour du cercle, puis on **divise par 2 ou par 4**.",
                "Un trait situé **à l'intérieur** de la figure ne fait **pas** partie du tour. On arrondit **à la fin**, au centième, et on écrit l'**unité**."
              ],
              exemple: "Un demi-disque de diamètre 10 cm : P = π × 10 ÷ 2 + 10 ≈ 25,71 cm.",
              savoir: "calculer le périmètre d'une figure composée de segments et de portions de cercle (demi-cercle, quart de cercle)."
            }
          ],
          ressources: [
            { id: "6e-ch5-s1", type: "exos", titre: "Séance 1 — Le cercle et son vocabulaire", resume: "Des points à 4 cm de O, rayon, diamètre, corde, arc. Avec correction.", ajout: "2026-10-29" },
            { id: "cercle-et-ses-noms", type: "jeu", titre: "Le Cercle et ses noms", resume: "Rayon, diamètre, corde ou arc ? Course par équipes ou solo.", ajout: "2026-10-29" },
            { id: "6e-ch5-s2", type: "exos", titre: "Séance 2 — Le disque : dedans, dessus, dehors", resume: "La chèvre au piquet, deux antennes, la chèvre et le bâtiment. Fiche à imprimer et corrections.", ajout: "2026-10-29" },
            { id: "dedans-dessus-dehors", type: "jeu", titre: "Dedans, dessus, dehors", resume: "Compare OM au rayon : dans le disque, sur le cercle ou hors du disque ?", ajout: "2026-10-29" },
            { id: "6e-ch5-s3", type: "exos", titre: "Séance 3 — Le tour d'un cercle", resume: "Je prévois avec une roue, je mesure un cercle au compas dans le cahier, je découvre π ≈ 3,14, je calcule un tour. Avec corrections.", ajout: "2026-10-29" },
            { id: "tour-du-cercle", type: "jeu", titre: "Le Tour du cercle", resume: "Une ficelle peut-elle faire le tour ? Quel est le périmètre ? Estime avec π ≈ 3,14.", ajout: "2026-10-29" },
            { id: "6e-ch5-s4", type: "exos", titre: "Séance 4 — Les formules du tour", resume: "La machine à tours, P = π × d et P = 2 × π × r, la touche π ou 3,14, des calculs au centième et la chasse à l'erreur. Avec corrections.", ajout: "2026-11-01" },
            { id: "6e-ch5-s6", type: "exos", titre: "Séance 6 — Le tour d'une piste", resume: "Test flash A/B chronométré, décomposer le tour d'une figure, six exercices jusqu'à la piste de 400 m. Avec corrections.", ajout: "2026-11-09" }
          ]
        },
        {
          id: "6e-defis", num: null, titre: "Défis calcul",
          resume: "Calculer avec les prix et les durées, en solo ou en équipes.",
          ressources: [
            { id: "caisse-enregistreuse", type: "jeu", titre: "La Caisse Enregistreuse", resume: "Calcule le total du ticket et la monnaie à rendre.", ajout: "2026-10-06" },
            { id: "chrono-fou", type: "jeu", titre: "Le Chrono Fou", resume: "Convertis des durées et calcule des horaires de trains.", ajout: "2026-10-06" }
          ]
        }
      ]
    },
    {
      id: "5e", nom: "5e", couleur: "orange",
      accroche: "Automatismes et calcul mental",
      chapitres: [
        {
          id: "5e-auto", num: null, titre: "Automatismes",
          resume: "Pour se remettre en jambes et garder les réflexes de calcul.",
          ressources: [
            { id: "sprint-automatismes-5e", type: "jeu", titre: "Sprint des automatismes", resume: "Cinq épreuves chronométrées sur les automatismes de 6e.", ajout: "2026-09-16" },
            { id: "heure-automatismes-5e", type: "jeu", titre: "Heure d'automatismes", resume: "Neuf stations, de nouvelles valeurs à chaque tirage.", ajout: "2026-10-07" },
            { id: "heure-automatismes-5e-2", type: "jeu", titre: "Heure d'automatismes 2", resume: "Six stations pour 50 min, sans calculatrice : rafale, intrus, proportionnalité, pyramide, droite graduée, ticket de sortie.", ajout: "2026-11-04" }
          ]
        }
      ]
    },
    {
      id: "4e", nom: "4e", couleur: "violet",
      accroche: "Pourcentages, grandeurs, nombres premiers, géométrie",
      evaluations: [
        { chapitre: "4e-ch1", etiquette: "Chapitre 1 · Petit test", titre: "Petit test — Les évolutions en pourcentage",
          resume: "Une hausse puis une baisse du même pourcentage : retrouve-t-on le nombre de départ ?", ajout: "2026-10-14",
          versions: [ { nom: "A et B", sujet: "evaluations/4e/4e-ch1-petit-test-evolutions-sujets-A-et-B.pdf", corrige: "evaluations/4e/4e-ch1-petit-test-evolutions-corrige-A-et-B.pdf" } ] },
        { etiquette: "Chapitres 1 et 2", titre: "Évaluation — Pourcentages et grandeurs",
          resume: "Pourcentages, vitesse, débit, volume, problème. 50 min, sur 20. Les versions A et B sont dans le même fichier.", ajout: "2026-10-14",
          versions: [ { nom: "A et B", sujet: "evaluations/4e/4e-ch1-2-sujets-A-et-B.pdf", corrige: "evaluations/4e/4e-ch1-2-corrige-A-et-B.pdf" } ] },
        { chapitre: "4e-ch3", etiquette: "Chapitre 3 · Petit test", titre: "Petit test — Décomposition et problèmes de répartition",
          resume: "Nombres premiers, décomposition en facteurs premiers, fraction irréductible et plus grand nombre de lots. 15 min, sur 20. Les versions A et B sont dans le même fichier.", ajout: "2026-11-03",
          versions: [ { nom: "A et B", sujet: "evaluations/4e/4e-ch3-petit-test-repartition-sujets-A-et-B.pdf", corrige: "evaluations/4e/4e-ch3-petit-test-repartition-corrige-A-et-B.pdf" } ] }
      ],
      chapitres: [
        {
          id: "4e-ch1", num: 1, titre: "Les pourcentages",
          resume: "Proportionnalité, appliquer un pourcentage, évolutions et pourcentage réciproque.",
          seances: [
            {
              titre: "La proportionnalité", duree: "50 min",
              contenu: [
                "Automatisme de début de séance (5 min), puis on teste si des tableaux de valeurs traduisent une situation de proportionnalité, avec les quotients et un graphique.",
                "On calcule une quatrième proportionnelle avec trois méthodes : le coefficient, le produit en croix et la linéarité."
              ],
              ressources: ["4e-ch1-s1"],
              retenir: [
                "Deux grandeurs sont **proportionnelles** si on passe de l'une à l'autre en multipliant toujours par le même nombre : le **coefficient**.",
                "Dans un tableau de proportionnalité, **tous les quotients sont égaux**.",
                "Valeur manquante : le coefficient, le **produit en croix** (a/b = c/x donc x = b × c ÷ a) ou la **linéarité**."
              ],
              exemple: "Gâteaux : 1, 2, 4 ; œufs : 3, 6, 12. Les quotients valent tous 3 : c'est proportionnel, de coefficient 3.",
              savoir: "justifier qu'un tableau est de proportionnalité et calculer une valeur manquante."
            },
            {
              titre: "Calculer et appliquer un pourcentage", duree: "50 min",
              contenu: [
                "Automatisme, puis des exercices pour calculer un pourcentage d'une quantité, trouver quel pourcentage représente une partie, et appliquer une réduction ou la TVA."
              ],
              ressources: ["4e-ch1-s2"],
              retenir: [
                "**t %** veut dire **t/100**. t % de N = **(t ÷ 100) × N**.",
                "Pourcentage que représente une partie : **(partie ÷ total) × 100**.",
                "Réduction : on retire le pourcentage du prix. TVA : on l'ajoute (TTC = HT + 20 % de HT)."
              ],
              exemple: "Skin à 2 000 V-bucks à − 30 % : réduction = 2 000 × 0,30 = 600 ; nouveau prix = 1 400.",
              savoir: "calculer un pourcentage d'une quantité et le pourcentage que représente une partie."
            },
            {
              titre: "Les évolutions en pourcentage", duree: "50 min",
              contenu: [
                "Automatisme, puis des hausses et des baisses calculées en un seul calcul.",
                "On enchaîne deux évolutions successives et on compare avec la somme des pourcentages."
              ],
              ressources: ["4e-ch1-s3"],
              retenir: [
                "Une **hausse de t %** : on multiplie par **1 + t/100**. Une **baisse de t %** : on multiplie par **1 − t/100**.",
                "Deux évolutions successives : on enchaîne les calculs, chaque pourcentage s'applique au résultat précédent.",
                "**Les pourcentages successifs ne s'additionnent pas** : + 15 % puis + 10 %, ce n'est pas + 25 %."
              ],
              exemple: "40 000 abonnés, − 15 % : 40 000 × 0,85 = 34 000.",
              savoir: "calculer une hausse ou une baisse en un seul calcul."
            },
            {
              titre: "Le pourcentage réciproque", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes où l'on connaît le résultat et on cherche le prix ou le total de départ : soldes, serveur, recettes d'un film, commission."
              ],
              ressources: ["4e-ch1-s4"],
              retenir: [
                "Retrouver un total à partir d'une partie qui représente t % : **total = partie ÷ (t ÷ 100)**.",
                "Après une baisse de 30 %, on paie **70 %** du prix initial : prix initial = prix payé ÷ 0,70.",
                "Après plusieurs évolutions, on multiplie les coefficients, puis on divise par le coefficient total."
              ],
              exemple: "Casque à 68 € après − 15 % : 68 ÷ 0,85 = 80 €.",
              savoir: "retrouver le prix ou le total de départ."
            }
          ],
          ressources: [
            { id: "4e-ch1-lecon", type: "lecon", titre: "Leçon — Les pourcentages", resume: "La fiche leçon, avec des calculatrices pour tester tes propres nombres.", ajout: "2026-09-21" },
            { id: "4e-ch1-s1", type: "exos", titre: "Séance 1 — La proportionnalité", resume: "Reconnaître une situation de proportionnalité, 4e proportionnelle.", ajout: "2026-09-21" },
            { id: "4e-ch1-s2", type: "exos", titre: "Séance 2 — Calculer et appliquer un pourcentage", resume: "Soldes, TVA, part d'un total.", ajout: "2026-09-21" },
            { id: "4e-ch1-s3", type: "exos", titre: "Séance 3 — Les évolutions en pourcentage", resume: "Hausses et baisses en un seul calcul.", ajout: "2026-09-21" },
            { id: "4e-ch1-s4", type: "exos", titre: "Séance 4 — Le pourcentage réciproque", resume: "Retrouver le prix ou le total de départ.", ajout: "2026-09-21" }
          ]
        },
        {
          id: "4e-ch2", num: 2, titre: "Grandeurs quotients et produits",
          resume: "Vitesse, débit, densité, aire, volume et énergie.",
          seances: [
            {
              titre: "La vitesse", duree: "50 min",
              contenu: [
                "Automatisme (conversions de durées, calcul mental), puis on définit une grandeur quotient.",
                "On calcule une vitesse moyenne, une distance ou une durée, et on convertit des vitesses (km/h et m/s)."
              ],
              ressources: ["4e-ch2-s1"],
              retenir: [
                "Une **grandeur quotient** s'obtient en divisant deux grandeurs : son unité les combine (km/h, m/s…).",
                "**v = d ÷ t**, donc **d = v × t** et **t = d ÷ v**.",
                "On convertit les durées avant de calculer (2 h 15 min = 2,25 h). De km/h à m/s : **÷ 3,6**."
              ],
              exemple: "90 km en 3 h : v = 90 ÷ 3 = 30 km/h. Et 72 km/h = 72 ÷ 3,6 = 20 m/s.",
              savoir: "calculer une vitesse, une distance ou une durée, et convertir des km/h en m/s."
            },
            {
              titre: "Le débit et la densité", duree: "50 min",
              contenu: [
                "Automatisme, puis des exercices avec des robinets, des pompes, des blocs de métal et des glaçons.",
                "On calcule des débits et des masses volumiques, et on convertit leurs unités."
              ],
              ressources: ["4e-ch2-s2"],
              retenir: [
                "**Débit = volume ÷ temps** (L/min, m³/h…). **Densité = masse ÷ volume** (g/cm³…).",
                "C'est le même type de calcul qu'une vitesse. De L/min à L/h, on multiplie par 60.",
                "Un objet moins dense que l'eau (moins de 1 g/cm³) flotte."
              ],
              exemple: "120 L en 4 min : débit = 120 ÷ 4 = 30 L/min.",
              savoir: "calculer et utiliser un débit ou une densité."
            },
            {
              titre: "Aire, volume et énergie", duree: "50 min",
              contenu: [
                "Automatisme, puis on rappelle que l'aire et le volume sont des grandeurs produits.",
                "On calcule des énergies électriques en kWh et leur coût."
              ],
              ressources: ["4e-ch2-s3"],
              retenir: [
                "Une **grandeur produit** s'obtient en multipliant : aire = longueur × largeur ; volume = longueur × largeur × hauteur.",
                "**Énergie E = P × t** : avec P en kW et t en h, E est en **kWh**.",
                "1 000 W = 1 kW. Coût = énergie × prix du kWh."
              ],
              exemple: "Radiateur de 2 kW pendant 3 h : E = 2 × 3 = 6 kWh.",
              savoir: "calculer une aire, un volume et une énergie en kWh."
            },
            {
              titre: "Bilan du chapitre", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes complets, comme au brevet : trajet en voiture, peinture d'une chambre, défi entre deux amis.",
                "On cherche l'erreur d'un élève sur une durée convertie à tort."
              ],
              ressources: ["4e-ch2-s4"],
              retenir: [
                "Dans un problème : on repère la grandeur cherchée, on choisit la formule, on **convertit avant de calculer**, puis on enchaîne.",
                "Les minutes ne sont pas des centièmes d'heure : **1 h 45 min = 1,75 h**.",
                "Pour acheter des pots de peinture, on arrondit toujours à l'entier supérieur."
              ],
              exemple: "Radiateur de 2 kW pendant 1 h 45 min : E = 2 × 1,75 = 3,5 kWh (et non 2 × 1,45).",
              savoir: "résoudre un problème complet en enchaînant plusieurs grandeurs."
            }
          ],
          ressources: [
            { id: "4e-ch2-lecon", type: "lecon", titre: "Leçon — Grandeurs quotients et produits", resume: "Les formules, avec un convertisseur km/h ↔ m/s.", ajout: "2026-09-21" },
            { id: "4e-ch2-s1", type: "exos", titre: "Séance 1 — La vitesse", resume: "v = d ÷ t, et les conversions.", ajout: "2026-09-21" },
            { id: "4e-ch2-s2", type: "exos", titre: "Séance 2 — Le débit et la densité", resume: "Baignoires, pompes et glaçons.", ajout: "2026-09-22" },
            { id: "4e-ch2-s3", type: "exos", titre: "Séance 3 — Aire, volume et énergie", resume: "Calculer une énergie en kWh et son coût.", ajout: "2026-09-23" },
            { id: "4e-ch2-s4", type: "exos", titre: "Séance 4 — Bilan du chapitre", resume: "Des problèmes complets, comme au brevet.", ajout: "2026-09-24" },
            { id: "4e-ch2-minijeux", type: "jeu", titre: "Mini-jeux — Grandeurs", resume: "Entraînement libre, à volonté, avec des valeurs au hasard.", ajout: "2026-10-06" }
          ]
        },
        {
          id: "4e-ch3", num: 3, titre: "Divisibilité et nombres premiers",
          resume: "Nombres premiers, décomposition, fractions irréductibles et répartitions.",
          seances: [
            {
              titre: "Découverte des nombres premiers", duree: "50 min",
              contenu: [
                "Automatisme sur les critères de divisibilité, puis le crible d'Ératosthène sur une grille de 1 à 100.",
                "On cherche les diviseurs de plusieurs nombres, on teste des nombres et on cherche des intrus."
              ],
              ressources: ["4e-ch3-s1"],
              retenir: [
                "Un **nombre premier** a exactement **deux diviseurs** : 1 et lui-même (2, 3, 5, 7, 11, 13…).",
                "**1 n'est pas premier** ; **2 est le seul nombre premier pair**.",
                "Pour tester un nombre inférieur à 100 : est-il divisible par 2, 3, 5 ou 7 ? Si non, il est premier."
              ],
              exemple: "17 a deux diviseurs (1 et 17) : il est premier. 12 en a six : il ne l'est pas.",
              savoir: "dire si un nombre inférieur à 100 est premier et le justifier."
            },
            {
              titre: "Décomposition en facteurs premiers", duree: "50 min",
              contenu: [
                "Automatisme, puis on décompose des nombres en produit de facteurs premiers.",
                "On fait aussi l'inverse : à partir d'une décomposition, on retrouve le nombre."
              ],
              ressources: ["4e-ch3-s2"],
              retenir: [
                "Tout nombre entier supérieur à 1 est un **produit de nombres premiers**.",
                "Méthode : on divise par le plus petit nombre premier possible, jusqu'à obtenir 1.",
                "On écrit le résultat avec des puissances : 60 = 2 × 2 × 3 × 5 = **2² × 3 × 5**."
              ],
              exemple: "60 ÷ 2 = 30 ; 30 ÷ 2 = 15 ; 15 ÷ 3 = 5 ; 5 ÷ 5 = 1, donc 60 = 2² × 3 × 5.",
              savoir: "décomposer un nombre en produit de facteurs premiers."
            },
            {
              titre: "Simplifier une fraction", duree: "50 min",
              contenu: [
                "Automatisme, puis on simplifie des fractions avec la décomposition, y compris des fractions supérieures à 1."
              ],
              ressources: ["4e-ch3-s3"],
              retenir: [
                "On décompose le numérateur et le dénominateur, puis on simplifie par les **facteurs premiers communs**.",
                "Une fraction est **irréductible** quand il ne reste aucun facteur commun (35/48 l'est déjà).",
                "La méthode est la même pour une fraction supérieure à 1 : 126/84 = 3/2."
              ],
              exemple: "60/84 = (2² × 3 × 5)/(2² × 3 × 7) = 5/7.",
              savoir: "rendre une fraction irréductible avec la décomposition."
            },
            {
              titre: "Problèmes de répartition et bilan", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes de répartition en lots identiques : bouquets, pochettes de badges et de stickers, carrelage."
              ],
              ressources: ["4e-ch3-s4"],
              retenir: [
                "Pour répartir en lots identiques sans reste, on cherche le **plus grand nombre qui divise les deux quantités**.",
                "Méthode : on décompose les deux nombres, puis on multiplie leurs facteurs premiers communs.",
                "Chaque lot contient ensuite quantité ÷ nombre de lots."
              ],
              exemple: "12 roses = 2² × 3 et 18 tulipes = 2 × 3² : 2 × 3 = 6 bouquets, chacun avec 2 roses et 3 tulipes.",
              savoir: "résoudre un problème de répartition en lots identiques."
            },
            {
              titre: "Problèmes de répartition en groupe (AP)", duree: "50 min",
              contenu: [
                "Automatisme, puis quatre problèmes en groupe de 3 ou 4 sur une seule fiche : deux quantités, trois quantités, un partage à vérifier et un problème à l'envers.",
                "Les 15 dernières minutes sont réservées à un petit test (sujet et corrigé dans l'onglet Évaluations)."
              ],
              ressources: ["4e-ch3-s5"],
              retenir: [
                "Le plus grand nombre de lots est le **produit des facteurs premiers communs** aux quantités, avec leur plus petit exposant.",
                "Avec **trois quantités**, on ne garde que les facteurs présents dans les trois décompositions.",
                "Un partage **possible** n'est pas forcément **maximal** : pour le prouver, on compare avec le maximum trouvé par la décomposition."
              ],
              exemple: "126 rubis = 2 × 3² × 7 et 84 saphirs = 2² × 3 × 7 : 2 × 3 × 7 = 42 sacs au maximum, chacun avec 3 rubis et 2 saphirs.",
              savoir: "résoudre un problème de répartition, vérifier un partage et prouver qu'il est maximal."
            }
          ],
          ressources: [
            { id: "4e-ch3-lecon", type: "lecon", titre: "Leçon — Divisibilité et nombres premiers", resume: "Teste si un nombre est premier, décompose, simplifie.", ajout: "2026-09-21" },
            { id: "4e-ch3-s1", type: "exos", titre: "Séance 1 — Découverte des nombres premiers", resume: "Le crible d'Ératosthène.", ajout: "2026-10-06" },
            { id: "4e-ch3-s2", type: "exos", titre: "Séance 2 — Décomposition en facteurs premiers", resume: "Écrire un nombre comme un produit de nombres premiers.", ajout: "2026-10-06" },
            { id: "4e-ch3-s3", type: "exos", titre: "Séance 3 — Simplifier une fraction", resume: "Rendre une fraction irréductible avec la décomposition.", ajout: "2026-10-06" },
            { id: "4e-ch3-s4", type: "exos", titre: "Séance 4 — Problèmes de répartition", resume: "Bouquets, pochettes et carrelage : le plus grand nombre de lots.", ajout: "2026-10-06" },
            { id: "4e-ch3-s5", type: "exos", titre: "Séance 5 (AP) — Problèmes de répartition en groupe", resume: "Le butin, les trois piles, qui dit vrai et le marchand : la fiche du groupe, avec astuces et solutions.", ajout: "2026-11-03" },
            { id: "4e-ch3-minijeux", type: "jeu", titre: "Mini-jeux — Nombres premiers", resume: "Crible, décompositions et défis, à volonté.", ajout: "2026-10-06" }
          ]
        },
        {
          id: "4e-ch4", num: 4, titre: "Le théorème de Pythagore",
          resume: "Découvrir le théorème, puis calculer une longueur dans un triangle rectangle.",
          seances: [
            {
              titre: "Découvrir le théorème de Pythagore", duree: "50 min",
              contenu: [
                "Pas d'automatisme : toute la séance est consacrée à la découverte.",
                "Séance sur écran, sans solution (seulement des astuces) : chaque activité doit être validée pour débloquer la suivante.",
                "Activité 1 : le puzzle des aires, à réussir pour trois triangles rectangles différents. Activité 2 : tester des triangles de tailles différentes (curseurs a et b), puis écrire l'égalité des aires avec des blocs à placer. Activité 3 : un triangle qui n'est pas rectangle, pour quel angle l'égalité est-elle vraie ?",
                "Exercices : aire manquante d'un carré sur une figure, puis calcul des aires à partir des côtés ; un dernier exercice sans figure pour aller plus loin."
              ],
              ressources: ["4e-ch4-s1-classe", "4e-ch4-s1"],
              retenir: [
                "Dans un triangle rectangle, l'**hypoténuse** est le côté opposé à l'angle droit : c'est le plus long côté.",
                "**Théorème de Pythagore** : dans un triangle rectangle, l'aire du carré construit sur l'hypoténuse est égale à la somme des aires des carrés construits sur les deux autres côtés.",
                "Si le triangle ABC est **rectangle en A**, alors **BC² = AB² + AC²**. Le théorème ne s'applique qu'aux triangles rectangles."
              ],
              exemple: "Côtés de l'angle droit : 3 cm et 4 cm. 3² + 4² = 9 + 16 = 25 : le carré de l'hypoténuse a une aire de 25 cm².",
              savoir: "reconnaître l'hypoténuse et calculer l'aire du carré construit sur l'hypoténuse."
            },
            {
              titre: "Racine carrée", duree: "50 min",
              contenu: [
                "Automatisme sur les carrés de 1 à 15, avec une question flash sur l'hypoténuse.",
                "Animations projetées : de l'aire au côté, on découvre la racine carrée, d'abord pour les carrés parfaits.",
                "On reprend les carrés penchés de la séance 1 : certaines aires donnent un côté entier (25, 169), d'autres non (13, 65). Deux carrés connus encadrent le côté. Une calculatrice projetée montre la touche √ et la touche FORMAT : on trouve le côté de carrés d'aire donnée.",
                "Chaque activité est suivie de ses exercices (projetés au tableau, faits sur le cahier) : racines de carrés parfaits sans calculatrice, encadrement, puis exercices avec la calculatrice ; le mini-jeu est là pour s'entraîner à part."
              ],
              ressources: ["4e-ch4-s2"],
              retenir: [
                "La **racine carrée** d'un nombre positif est le nombre positif dont le carré est ce nombre : √49 = 7 car 7² = 49.",
                "Un carré d'aire A a un côté de longueur **√A**. Attention : √36 = 6, et non 18.",
                "Si le nombre n'est pas un carré parfait, on **encadre** la racine entre deux entiers consécutifs (√13 est entre 3 et 4), puis on donne une valeur approchée avec la calculatrice (√13 ≈ 3,61)."
              ],
              exemple: "Un carré d'aire 169 cm² a un côté de √169 = 13 cm. Un carré d'aire 13 cm² a un côté d'environ 3,61 cm, car 3² = 9 < 13 < 16 = 4².",
              savoir: "calculer la racine carrée d'un carré parfait, encadrer une racine carrée et en donner une valeur approchée avec la calculatrice."
            },
            {
              titre: "Écrire l'égalité de Pythagore", duree: "50 min",
              contenu: [
                "Automatisme sur les carrés et les racines, avec une question flash sur l'hypoténuse.",
                "Animations projetées : sur quatre triangles rectangles tournés dans tous les sens, on repère l'angle droit, l'hypoténuse et les carrés construits sur les côtés, puis on écrit l'égalité de Pythagore avec les lettres du triangle.",
                "Exercices projetés au tableau et faits sur le cahier : angle droit et hypoténuse, égalité sur des triangles tournés, puis aires des carrés et longueurs des côtés (retour à la racine carrée), et un premier calcul d'hypoténuse présenté comme un prolongement."
              ],
              ressources: ["4e-ch4-s3"],
              retenir: [
                "Pour écrire l'égalité de Pythagore : on repère l'**angle droit**, on trouve l'**hypoténuse** (le côté en face), puis on écrit hypoténuse² = un côté² + l'autre côté².",
                "Si le triangle ABC est **rectangle en A**, alors **BC² = AB² + AC²**.",
                "L'hypoténuse est toujours **seule d'un côté du signe =**, et chaque longueur est **au carré** : BC² se lit « BC au carré »."
              ],
              exemple: "Le triangle ABC est rectangle en A : l'hypoténuse est [BC], donc BC² = AB² + AC².",
              savoir: "repérer l'hypoténuse d'un triangle rectangle, même tourné, écrire l'égalité de Pythagore et passer de l'aire d'un carré à la longueur de son côté."
            },
            {
              titre: "Rédiger le calcul de l'hypoténuse", duree: "50 min",
              contenu: [
                "Automatisme : sommes de carrés, racines carrées, et le piège de 6² + 8² qui n'est pas 14².",
                "Animation projetée : la rédaction se construit en cinq étapes (triangle et angle droit, théorème, remplacement par les nombres, calcul, conclusion), d'abord sur un triangle dont l'hypoténuse est entière, puis sur un triangle qui donne une valeur approchée.",
                "Cinq exercices projetés, faits sur le cahier, où le guide diminue peu à peu : rédaction à compléter, début des phrases, étapes seules, énoncé seul avec un conseil, puis un problème sans aucune aide."
              ],
              ressources: ["4e-ch4-s4"],
              retenir: [
                "Pour calculer l'**hypoténuse** : « On a **ABC** un triangle rectangle en **A**. D'après le théorème de Pythagore, on a : **AB² + AC² = BC²** », puis on remplace par les longueurs, on calcule, et on conclut par **BC = √… cm**.",
                "Si le résultat n'est pas un nombre entier, on écrit la **valeur exacte** avec √, puis une **valeur approchée** : BC = √41 ≈ 6,4 cm.",
                "On met **chaque longueur au carré avant d'additionner** (6² + 8² = 100, et non (6 + 8)² = 196). On vérifie que l'hypoténuse est le **plus long côté** et on écrit l'**unité**."
              ],
              exemple: "AB = 6 cm et AC = 8 cm : AB² + AC² = BC², puis 6² + 8² = BC², 36 + 64 = BC², 100 = BC², donc BC = √100 = 10 cm.",
              savoir: "rédiger complètement le calcul de l'hypoténuse d'un triangle rectangle avec le théorème de Pythagore."
            },
            {
              titre: "Calculer un côté de l'angle droit", duree: "50 min",
              contenu: [
                "Les 15 premières minutes sont réservées à un petit test sur le calcul de l'hypoténuse (sujet et corrigé dans l'onglet Évaluations).",
                "Automatisme : différence de carrés, complément à 169, l'hypoténuse est le plus long côté, encadrement de √50 et un retour sur les pourcentages.",
                "Animation projetée : « le carré qui manque ». On connaît l'hypoténuse et un côté de l'angle droit ; la rédaction se construit en six étapes, avec une étape nouvelle (le grand carré moins le petit), d'abord sur un triangle dont le côté est entier, puis sur un triangle qui donne une valeur approchée.",
                "Quatre exercices projetés, faits sur le cahier : choisir entre additionner et soustraire, calculer le côté qui manque (guide qui diminue), corriger la rédaction de Karim, puis un problème sans aucune aide."
              ],
              ressources: ["4e-ch4-s5"],
              retenir: [
                "Pour calculer **un côté de l'angle droit** : **AB² + AC² = BC²**, puis on remplace (6² + AC² = 10²), on isole **AC² = 10² − 6²**, on calcule (AC² = 64) et on conclut **AC = √64 = 8 cm**.",
                "Hypoténuse cherchée : on **additionne** les carrés. Côté de l'angle droit cherché : on **soustrait**, le carré de l'hypoténuse moins l'autre carré.",
                "On vérifie : un côté de l'angle droit est **toujours plus court** que l'hypoténuse. Sinon, on a additionné par erreur."
              ],
              exemple: "BC = 10 cm et AB = 6 cm : AB² + AC² = BC², puis 6² + AC² = 10², AC² = 10² − 6², AC² = 100 − 36 = 64, donc AC = √64 = 8 cm.",
              savoir: "calculer la longueur d'un côté de l'angle droit d'un triangle rectangle avec le théorème de Pythagore, en choisissant entre additionner et soustraire."
            }
          ],
          ressources: [
            { id: "4e-ch4-lecon", type: "lecon", titre: "Leçon — Le théorème de Pythagore", resume: "Trouve l'hypoténuse, vois le théorème en aires, puis calcule un côté pas à pas avec tes propres nombres.", ajout: "2026-11-10" },
            { id: "4e-ch4-s1-classe", type: "classe", titre: "Séance 1 en classe — activités et exercices", resume: "Trois activités à valider l'une après l'autre, puis les exercices, avec des astuces mais sans solution.", ajout: "2026-11-08" },
            { id: "4e-ch4-s1", type: "exos", titre: "Séance 1 à réviser chez soi — activités et exercices corrigés", resume: "Les activités en libre accès et les exercices avec astuces et solutions.", ajout: "2026-10-20" },
            { id: "4e-ch4-s2", type: "exos", titre: "Séance 2 — Racine carrée", resume: "Animations sur l'aire et le côté, encadrement entre deux carrés, calculatrice projetée (touche √), exercices corrigés.", ajout: "2026-10-24" },
            { id: "4e-ch4-s3", type: "exos", titre: "Séance 3 — Écrire l'égalité de Pythagore", resume: "Quatre triangles tournés à lire pas à pas, puis des exercices corrigés : égalité de Pythagore, aires des carrés et longueurs des côtés, premier calcul d'hypoténuse.", ajout: "2026-11-03" },
            { id: "4e-ch4-s4", type: "exos", titre: "Séance 4 — Rédiger le calcul de l'hypoténuse", resume: "Une rédaction construite en cinq étapes, puis cinq exercices corrigés où le guide diminue peu à peu, jusqu'à l'autonomie.", ajout: "2026-11-07" },
            { id: "4e-ch4-s5", type: "exos", titre: "Séance 5 — Calculer un côté de l'angle droit", resume: "Le carré qui manque, construit pas à pas sur deux triangles, puis quatre exercices corrigés : additionner ou soustraire, la rédaction de Karim à corriger, un problème de drone.", ajout: "2026-11-08" },
            { id: "4e-ch4-minijeux", type: "jeu", titre: "Mini-jeux — Trouve l'hypoténuse", resume: "Figures tournées, phrases « rectangle en… » et défi de 60 secondes pour que l'identification devienne un réflexe.", ajout: "2026-10-20" },
            { id: "4e-ch4-minijeux-racine", type: "jeu", titre: "Mini-jeux — Racine carrée", resume: "Carrés de 1 à 15, racines de carrés parfaits, encadrements et défi de 60 secondes.", ajout: "2026-10-24" }
          ]
        }
      ]
    }
  ]
};

/* ---- Chapitres réservés (prive: true) : masqués tant que le mot de passe n'a pas été saisi ---- */
(function () {
  var CODE = "159951", ouvert = false;
  try { ouvert = localStorage.getItem("prof") === "1"; } catch (e) {}
  window.SITE_PROF = ouvert;
  window.SITE_ouvrir = function (mdp) {
    if (String(mdp || "").trim().toLowerCase() !== CODE) return false;
    try { localStorage.setItem("prof", "1"); } catch (e) {}
    return true;
  };
  window.SITE_verrouiller = function () { try { localStorage.removeItem("prof"); } catch (e) {} };
  window.SITE.niveaux.forEach(function (n) {
    n.verrous = [];
    if (ouvert) { n.chapitres.forEach(function (c) { if (c.prive) c.titre += " (réservé)"; }); return; }
    var garde = [], prec = null;
    n.chapitres.forEach(function (c) {
      if (c.prive) n.verrous.push({ id: c.id, num: c.num, titre: c.titre, apres: prec });
      else { garde.push(c); prec = c.id; }
    });
    n.chapitres = garde;
  });
})();
