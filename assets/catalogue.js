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

   Un chapitre avec  bientot: true  s'affiche grisé « Bientôt en ligne ».

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
   ========================================================= */
window.SITE = {
  titre: "Les maths de M. Lorenzini",
  sousTitre: "Leçons, exercices corrigés et mini-jeux, au même endroit.",
  niveaux: [
    {
      id: "6e", nom: "6e", couleur: "vert",
      accroche: "Fractions, nombres décimaux, géométrie",
      chapitres: [
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
                "Escape game final : 5 épreuves, un chiffre de code à gagner à chaque épreuve (placer une fraction, graduer, trouver un milieu…)."
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
              titre: "Dixièmes et centièmes", duree: "50 min",
              contenu: [
                "On découvre l'histoire de la virgule : on partage l'unité en 10 parts égales, puis chaque part en 10 encore.",
                "On colorie des dixièmes, puis des centièmes, sur le carré 10×10, et on écrit ce qu'on a colorié."
              ],
              ressources: ["flash-decimaux", "carre-10x10"],
              retenir: [
                "Un **dixième** est une part sur 10 : 1/10 = 0,1. Un **centième** est une part sur 100 : 1/100 = 0,01.",
                "10 dixièmes font 1 unité ; 10 centièmes font 1 dixième.",
                "Une **fraction décimale** a pour dénominateur 10, 100, 1 000…"
              ],
              exemple: "7/10 = 0,7 et 23/100 = 0,23.",
              savoir: "écrire une fraction décimale avec une virgule, et inversement."
            },
            {
              titre: "Un même nombre, plusieurs écritures", duree: "50 min",
              contenu: [
                "Familles, Mémory et fleurs : on associe l'écriture à virgule, la fraction décimale, la somme de fractions et le nombre mixte.",
                "Dans le cahier d'exercices, on complète les fleurs, avec les millièmes, les zéros cachés et les pourcentages."
              ],
              ressources: ["familles-decimales", "memory-fractions-decimales", "fleurs-decimaux"],
              retenir: [
                "Un même nombre s'écrit de plusieurs façons : à virgule, en fraction, en somme de fractions, en nombre mixte.",
                "Dans un tableau de numération, une case vide s'écrit **0**.",
                "Ajouter des zéros à droite de la partie décimale ne change pas le nombre : 0,5 = 0,50."
              ],
              exemple: "6,25 = 625/100 = 6 + 25/100 = 6 + 2/10 + 5/100.",
              savoir: "passer d'une écriture d'un nombre décimal à une autre."
            },
            {
              titre: "Lire et placer un nombre décimal sur une droite graduée", duree: "50 min",
              contenu: [
                "On lit l'abscisse d'un point et on place un nombre sur une droite graduée en dixièmes.",
                "Avec la loupe, on découpe un dixième en 10 pour atteindre les centièmes."
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
              titre: "Les pourcentages", duree: "50 min",
              contenu: [
                "On lit un pourcentage sur une jauge, puis sur une grille de 100, et on le remplit soi-même.",
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
              titre: "Calculer avec des nombres décimaux", duree: "50 min",
              contenu: [
                "Le jeu de la caisse : on calcule le total d'un ticket de caisse, puis la monnaie à rendre.",
                "On pose chaque opération dans le cahier."
              ],
              ressources: ["caisse-enregistreuse"],
              retenir: [
                "Pour additionner ou soustraire des décimaux, on pose l'opération en mettant **la virgule sous la virgule**.",
                "On complète avec des zéros pour avoir le même nombre de chiffres après la virgule.",
                "La monnaie à rendre est une soustraction : somme donnée − total à payer."
              ],
              exemple: "12,5 + 3,75 : on écrit 12,50 + 3,75 = 16,25.",
              savoir: "poser une addition ou une soustraction de décimaux et rendre la monnaie."
            },
            {
              titre: "Durées, coffre décimal et bilan", duree: "50 min",
              contenu: [
                "Chrono Fou : on convertit des durées et on calcule des horaires de trains.",
                "Coffre décimal : chaque énigme résolue donne un chiffre du code, pour faire le point sur tout le chapitre."
              ],
              ressources: ["chrono-fou", "coffre-decimal"],
              retenir: [
                "Les durées ne se comptent pas par 10 : **1 h = 60 min** et **1 min = 60 s**.",
                "On convertit les durées avant de calculer un horaire ou une durée de trajet.",
                "Un nombre est **décimal** s'il peut s'écrire avec une fraction de dénominateur 10, 100, 1 000…"
              ],
              exemple: "2 h 15 min = 2 × 60 + 15 = 135 min.",
              savoir: "convertir une durée et calculer un horaire d'arrivée."
            }
          ],
          ressources: [
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
          resume: "Calculer une longueur dans un triangle rectangle.",
          bientot: true,
          ressources: []
        }
      ]
    }
  ]
};
