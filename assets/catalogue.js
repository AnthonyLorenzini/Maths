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
            retenir: ["l'essentiel à retenir, une phrase par ligne (**gras** possible)"] }
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
              ressources: ["points-droites-distances", "6e-ch2-cahier-exercices", "cahier-geometrie"],
              retenir: [
                "Un **point** se note avec une lettre majuscule : A. Une **droite** se note (AB), un **segment** se note [AB], une **demi-droite** se note [AB).",
                "A ∈ (d) se lit « A appartient à (d) » ; C ∉ (d) se lit « C n'appartient pas à (d) ». Des points d'une même droite sont **alignés**.",
                "**[AB]** est le segment (un objet) ; **AB** est sa longueur (un nombre, sans crochets)."
              ]
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
                "La **distance** entre deux points A et B est la longueur du plus court chemin de A à B : c'est la longueur du segment [AB], notée AB.",
                "Si C n'est pas sur [AB], alors **AC + CB > AB**.",
                "Si D est sur [AB], alors **AD + DB = AB**.",
                "Deux segments codés avec les mêmes petits traits ont la même longueur."
              ]
            },
            {
              titre: "Réinvestir et faire le point", duree: "≈ 46 min",
              contenu: [
                "Chasse au trésor par équipes : 8 questions sur le vocabulaire, les notations et les distances.",
                "Entraînement dans le manuel, page 91.",
                "Ticket de sortie : on répond seul, sans aide, puis on vérifie."
              ],
              ressources: ["points-droites-distances", "6e-ch2-cahier-exercices", "cahier-geometrie"],
              retenir: [
                "Les notations ne se confondent pas : point A, droite (AB), segment [AB], longueur AB.",
                "AB est la longueur du plus court chemin entre A et B.",
                "Codage : mêmes petits traits = mêmes longueurs ; petit carré = angle droit."
              ]
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
                "Dans la fraction **a/b**, le **dénominateur b** dit en combien de parts égales on partage l'unité, et le **numérateur a** dit combien de parts on prend.",
                "Des parts égales n'ont pas forcément la même forme : elles ont la même taille.",
                "Une fraction peut être plus grande que 1 quand on prend plus d'une unité."
              ]
            },
            {
              titre: "Placer une fraction sur une demi-droite graduée", duree: "50 min",
              contenu: [
                "On lit et on place des fractions sur une demi-droite graduée, seul puis en équipes.",
                "Piège à repérer : l'origine n'est pas toujours 0."
              ],
              ressources: ["course-fractions"],
              retenir: [
                "L'**unité** est le segment qui va de 0 à 1 : on le partage en autant de parts que le dénominateur.",
                "Pour placer a/b : on compte **a graduations** depuis l'origine, avec des graduations qui valent chacune 1/b.",
                "Le nombre qui repère un point sur la droite s'appelle son **abscisse**."
              ]
            },
            {
              titre: "Graduer un segment", duree: "50 min",
              contenu: [
                "On tire une consigne (par exemple « un segment de 8 cm en 4 parts égales »), on la construit à la règle, puis on vérifie avec le chronomètre.",
                "On s'entraîne ensuite avec le simulateur interactif."
              ],
              ressources: ["chantier-graduations"],
              retenir: [
                "Pour partager un segment en **N parts égales**, on calcule l'écart entre deux graduations : **longueur ÷ N** (8 cm ÷ 4 = 2 cm).",
                "On reporte ensuite cet écart de proche en proche, à partir d'une extrémité."
              ]
            },
            {
              titre: "Le milieu d'un segment et synthèse", duree: "50 min",
              contenu: [
                "On cherche le milieu d'un segment sur une droite graduée.",
                "Escape game final : 5 épreuves, un chiffre de code à gagner à chaque épreuve (placer une fraction, graduer, trouver un milieu…)."
              ],
              ressources: ["course-fractions", "enigme-segment"],
              retenir: [
                "Le **milieu** de [AB] est le point du segment situé à égale distance de A et de B : il partage le segment en deux parts égales.",
                "Sur une droite graduée, pour trouver le milieu : on compte les graduations entre A et B, puis on divise par 2.",
                "Fraction, graduation et milieu servent tous les trois à partager en parts égales."
              ]
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
                "Une **fraction décimale** est une fraction dont le dénominateur est 10, 100, 1 000…"
              ]
            },
            {
              titre: "Un même nombre, plusieurs écritures", duree: "50 min",
              contenu: [
                "Familles, Mémory et fleurs : on associe l'écriture à virgule, la fraction décimale, la somme de fractions et le nombre mixte.",
                "Dans le cahier d'exercices, on complète les fleurs, avec les millièmes, les zéros cachés et les pourcentages."
              ],
              ressources: ["familles-decimales", "memory-fractions-decimales", "fleurs-decimaux"],
              retenir: [
                "Un même nombre s'écrit de plusieurs façons : 6,25 = 625/100 = 6 + 25/100 = 6 + 2/10 + 5/100.",
                "Dans un tableau de numération, une case vide s'écrit **0**.",
                "Ajouter des zéros à droite de la partie décimale ne change pas le nombre : 0,5 = 0,50."
              ]
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
                "Pour placer un décimal, on repère d'abord le bon dixième, puis on agrandit.",
                "Si la droite ne commence pas à 0, on compte à partir de l'origine réelle."
              ]
            },
            {
              titre: "Les pourcentages", duree: "50 min",
              contenu: [
                "On lit un pourcentage sur une jauge, puis sur une grille de 100, et on le remplit soi-même.",
                "On passe d'un pourcentage à une fraction et à un nombre décimal."
              ],
              ressources: ["jauge-pourcentages"],
              retenir: [
                "**p %** veut dire **p sur 100** : 20 % = 20/100 = 0,2.",
                "100 % correspond à l'unité entière, soit 1 ; au-delà de 100 %, on dépasse l'unité.",
                "On peut passer d'un pourcentage à une fraction, puis à un nombre à virgule."
              ]
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
                "On complète avec des zéros pour que les deux nombres aient le même nombre de chiffres après la virgule.",
                "La monnaie à rendre est une soustraction : somme donnée − total à payer."
              ]
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
                "Un nombre est décimal s'il peut s'écrire avec une fraction de dénominateur 10, 100, 1 000…",
                "Pour comparer ou ranger des décimaux, on regarde d'abord la partie entière, puis les dixièmes, les centièmes…"
              ]
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
              ressources: ["4e-ch1-lecon", "4e-ch1-s1"],
              retenir: [
                "Deux grandeurs sont **proportionnelles** si on passe de l'une à l'autre en multipliant toujours par le même nombre : le **coefficient de proportionnalité**.",
                "Dans un tableau de proportionnalité, **tous les quotients sont égaux**. Sur un graphique, les points sont alignés sur une droite qui passe par l'origine.",
                "Pour trouver une valeur manquante : le coefficient, le **produit en croix** (a/b = c/x donc x = b × c ÷ a) ou la **linéarité**."
              ]
            },
            {
              titre: "Calculer et appliquer un pourcentage", duree: "50 min",
              contenu: [
                "Automatisme, puis des exercices pour calculer un pourcentage d'une quantité, trouver quel pourcentage représente une partie, et appliquer une réduction ou la TVA."
              ],
              ressources: ["4e-ch1-s2"],
              retenir: [
                "**t %** veut dire **t/100**. Pour calculer t % de N : **(t ÷ 100) × N** (20 % de 150 = 0,20 × 150 = 30).",
                "Pour trouver le pourcentage que représente une partie : **(partie ÷ total) × 100** (7 filles sur 20 élèves : 7 ÷ 20 × 100 = 35 %).",
                "Pour une réduction ou une taxe, on calcule le pourcentage, puis on le retire ou on l'ajoute au prix de départ (TVA 20 % : prix TTC = prix HT + 20 % du prix HT)."
              ]
            },
            {
              titre: "Les évolutions en pourcentage", duree: "50 min",
              contenu: [
                "Automatisme, puis des hausses et des baisses calculées en un seul calcul.",
                "On enchaîne deux évolutions successives et on compare avec la somme des pourcentages."
              ],
              ressources: ["4e-ch1-s3"],
              retenir: [
                "Une **hausse de t %** revient à multiplier par **1 + t/100** (+ 8 % : × 1,08). Une **baisse de t %** revient à multiplier par **1 − t/100** (− 15 % : × 0,85).",
                "Pour deux évolutions successives, on enchaîne les calculs : chaque pourcentage s'applique au résultat précédent.",
                "**Les pourcentages successifs ne s'additionnent pas** : + 15 % puis + 10 % font environ + 26,5 %, pas + 25 %."
              ]
            },
            {
              titre: "Le pourcentage réciproque", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes où l'on connaît le résultat et on cherche le prix ou le total de départ : soldes, serveur, recettes d'un film, commission."
              ],
              ressources: ["4e-ch1-s4"],
              retenir: [
                "Pour retrouver un total quand on connaît une partie qui représente t % : **total = partie ÷ (t ÷ 100)**.",
                "Après une baisse de 30 %, on paie **70 %** du prix initial : prix initial = prix payé ÷ 0,70.",
                "Après plusieurs évolutions, on multiplie d'abord les coefficients (× 0,80 puis × 0,90 : × 0,72), puis on divise le résultat final par ce coefficient total."
              ]
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
              ressources: ["4e-ch2-lecon", "4e-ch2-s1"],
              retenir: [
                "Une **grandeur quotient** s'obtient en divisant deux grandeurs. Son unité combine celles des deux grandeurs (km/h, m/s…).",
                "**v = d ÷ t**, donc **d = v × t** et **t = d ÷ v**.",
                "On convertit les durées avant de calculer : 2 h 15 min = 2,25 h. Pour passer de km/h à m/s, on divise par 3,6."
              ]
            },
            {
              titre: "Le débit et la densité", duree: "50 min",
              contenu: [
                "Automatisme, puis des exercices avec des robinets, des pompes, des blocs de métal et des glaçons.",
                "On calcule des débits et des masses volumiques, et on convertit leurs unités."
              ],
              ressources: ["4e-ch2-s2"],
              retenir: [
                "**Débit = volume ÷ temps** (en L/min, L/h, m³/h…).",
                "**Densité (masse volumique) = masse ÷ volume** (en g/cm³…).",
                "C'est le même type de calcul qu'une vitesse. Pour passer de L/min à L/h, on multiplie par 60.",
                "Un objet moins dense que l'eau (moins de 1 g/cm³) flotte."
              ]
            },
            {
              titre: "Aire, volume et énergie", duree: "50 min",
              contenu: [
                "Automatisme, puis on rappelle que l'aire et le volume sont des grandeurs produits.",
                "On calcule des énergies électriques en kWh et leur coût."
              ],
              ressources: ["4e-ch2-s3"],
              retenir: [
                "Une **grandeur produit** s'obtient en multipliant deux grandeurs : aire = longueur × largeur ; volume = longueur × largeur × hauteur.",
                "**Énergie E = P × t** : avec P en kW et t en h, E est en **kWh**.",
                "1 000 W = 1 kW. Pour passer de Wh à kWh, on divise par 1 000. Le coût = énergie × prix du kWh."
              ]
            },
            {
              titre: "Bilan du chapitre", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes complets, comme au brevet : trajet en voiture, peinture d'une chambre, défi entre deux amis.",
                "On cherche l'erreur d'un élève sur une durée convertie à tort."
              ],
              ressources: ["4e-ch2-s4", "4e-ch2-minijeux"],
              retenir: [
                "Dans un problème, on identifie la grandeur cherchée, on choisit la formule, on **convertit les unités avant de calculer**, puis on enchaîne les étapes.",
                "Les minutes ne sont pas des centièmes d'heure : **1 h 45 min = 1,75 h**, pas 1,45 h.",
                "Pour acheter des pots de peinture, on arrondit toujours au nombre entier supérieur."
              ]
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
              ressources: ["4e-ch3-lecon", "4e-ch3-s1"],
              retenir: [
                "Un **nombre premier** a exactement **deux diviseurs** : 1 et lui-même (2, 3, 5, 7, 11, 13…).",
                "**1 n'est pas premier** (un seul diviseur) ; **2 est le seul nombre premier pair**.",
                "Pour tester un nombre inférieur à 100, on cherche s'il est divisible par 2, 3, 5 ou 7. S'il ne l'est par aucun, il est premier."
              ]
            },
            {
              titre: "Décomposition en facteurs premiers", duree: "50 min",
              contenu: [
                "Automatisme, puis on décompose des nombres en produit de facteurs premiers.",
                "On fait aussi l'inverse : à partir d'une décomposition, on retrouve le nombre."
              ],
              ressources: ["4e-ch3-s2", "4e-ch3-minijeux"],
              retenir: [
                "Tout nombre entier supérieur à 1 s'écrit comme un **produit de nombres premiers**.",
                "Méthode : on divise successivement par le plus petit nombre premier possible, jusqu'à obtenir 1.",
                "Exemple : 60 = 2 × 2 × 3 × 5 = **2² × 3 × 5**."
              ]
            },
            {
              titre: "Simplifier une fraction", duree: "50 min",
              contenu: [
                "Automatisme, puis on simplifie des fractions avec la décomposition, y compris des fractions supérieures à 1."
              ],
              ressources: ["4e-ch3-s3"],
              retenir: [
                "Pour simplifier : on décompose le numérateur et le dénominateur, puis on simplifie par les facteurs premiers communs. 60/84 = (2² × 3 × 5)/(2² × 3 × 7) = **5/7**.",
                "Une fraction est **irréductible** quand il ne reste aucun facteur premier commun (35/48 est déjà irréductible).",
                "La méthode est la même pour une fraction supérieure à 1 : 126/84 = 3/2."
              ]
            },
            {
              titre: "Problèmes de répartition et bilan", duree: "50 min",
              contenu: [
                "Automatisme, puis des problèmes de répartition en lots identiques : bouquets, pochettes de badges et de stickers, carrelage."
              ],
              ressources: ["4e-ch3-s4", "4e-ch3-minijeux"],
              retenir: [
                "Pour répartir en lots identiques sans reste, on cherche le **plus grand nombre qui divise les deux quantités**.",
                "Méthode : on décompose les deux nombres, puis on multiplie leurs facteurs premiers communs. 48 badges et 36 stickers : 2² × 3 = 12 pochettes.",
                "Chaque lot contient ensuite quantité ÷ nombre de lots (4 badges et 3 stickers)."
              ]
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
