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
