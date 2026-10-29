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
          id: "6e-ch5", num: 5, titre: "Cercle et disque", prive: true,
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
                "Un **rayon** relie le centre à un point du cercle ; une **corde** relie deux points du cercle ; un **diamètre** est une corde qui passe par le centre.",
                "Le **diamètre** est le double du rayon. Deux points d'un cercle le partagent en **deux arcs**."
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
            }
          ],
          ressources: [
            { id: "6e-ch5-s1", type: "exos", titre: "Séance 1 — Le cercle et son vocabulaire", resume: "Des points à 4 cm de O, rayon, diamètre, corde, arc. Avec correction.", ajout: "2026-10-29" },
            { id: "cercle-et-ses-noms", type: "jeu", titre: "Le Cercle et ses noms", resume: "Rayon, diamètre, corde ou arc ? Course par équipes ou solo.", ajout: "2026-10-29" },
            { id: "6e-ch5-s2", type: "exos", titre: "Séance 2 — Le disque : dedans, dessus, dehors", resume: "La chèvre au piquet, deux antennes, la chèvre et le bâtiment. Fiche à imprimer et corrections.", ajout: "2026-10-29" },
            { id: "dedans-dessus-dehors", type: "jeu", titre: "Dedans, dessus, dehors", resume: "Compare OM au rayon : dans le disque, sur le cercle ou hors du disque ?", ajout: "2026-10-29" }
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
            { id: "heure-automatismes-5e", type: "jeu", titre: "Heure d'automatismes", resume: "Neuf stations, de nouvelles valeurs à chaque tirage.", ajout: "2026-10-07" }
          ]
        }
      ]
    },
    {
      id: "4e", nom: "4e", couleur: "violet",
      accroche: "Pourcentages, grandeurs, nombres premiers, Pythagore",
      evaluations: [
        { chapitre: "4e-ch1", etiquette: "Chapitre 1 · Petit test", titre: "Petit test — Les évolutions en pourcentage",
          resume: "Une hausse puis une baisse du même pourcentage : retrouve-t-on le nombre de départ ?", ajout: "2026-10-14",
          versions: [ { nom: "A et B", sujet: "evaluations/4e/4e-ch1-petit-test-evolutions-sujets-A-et-B.pdf", corrige: "evaluations/4e/4e-ch1-petit-test-evolutions-corrige-A-et-B.pdf" } ] },
        { etiquette: "Chapitres 1 et 2", titre: "Évaluation — Pourcentages et grandeurs",
          resume: "Pourcentages, vitesse, débit, volume, problème. 50 min, sur 20. Les versions A et B sont dans le même fichier.", ajout: "2026-10-14",
          versions: [ { nom: "A et B", sujet: "evaluations/4e/4e-ch1-2-sujets-A-et-B.pdf", corrige: "evaluations/4e/4e-ch1-2-corrige-A-et-B.pdf" } ] }
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
            }
          ],
          ressources: [
            { id: "4e-ch3-lecon", type: "lecon", titre: "Leçon — Divisibilité et nombres premiers", resume: "Teste si un nombre est premier, décompose, simplifie.", ajout: "2026-09-21" },
            { id: "4e-ch3-s1", type: "exos", titre: "Séance 1 — Découverte des nombres premiers", resume: "Le crible d'Ératosthène.", ajout: "2026-10-06" },
            { id: "4e-ch3-s2", type: "exos", titre: "Séance 2 — Décomposition en facteurs premiers", resume: "Écrire un nombre comme un produit de nombres premiers.", ajout: "2026-10-06" },
            { id: "4e-ch3-s3", type: "exos", titre: "Séance 3 — Simplifier une fraction", resume: "Rendre une fraction irréductible avec la décomposition.", ajout: "2026-10-06" },
            { id: "4e-ch3-s4", type: "exos", titre: "Séance 4 — Problèmes de répartition", resume: "Bouquets, pochettes et carrelage : le plus grand nombre de lots.", ajout: "2026-10-06" },
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
                "Puzzle des aires, sur écran ou sur papier : les 4 morceaux du carré construit sur le grand côté de l'angle droit et le petit carré recouvrent exactement le carré construit sur l'hypoténuse.",
                "Vérification par le calcul pour des triangles rectangles quelconques, puis cas d'un triangle qui n'est pas rectangle : l'égalité des aires n'est plus vraie."
              ],
              ressources: ["4e-ch4-s1"],
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
            }
          ],
          ressources: [
            { id: "4e-ch4-s1", type: "exos", titre: "Séance 1 — Découvrir le théorème de Pythagore", resume: "Un puzzle d'aires, une vérification par le calcul et le cas du triangle non rectangle.", ajout: "2026-10-20" },
            { id: "4e-ch4-s2", type: "exos", titre: "Séance 2 — Racine carrée", resume: "Animations sur l'aire et le côté, encadrement entre deux carrés, calculatrice projetée (touche √), exercices corrigés.", ajout: "2026-10-24" },
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
  var CODE = "compas26", ouvert = false;
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
