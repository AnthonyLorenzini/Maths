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
          ressources: [
            { id: "points-droites-distances", type: "classe", titre: "Points, droites & distances", resume: "Le support projeté pendant les séances, avec les jeux faits en classe.", ajout: "2026-09-11" },
            { id: "6e-ch2-cahier-exercices", type: "exos", titre: "Cahier d'exercices — Chapitre 2", resume: "Tous les exercices du chapitre, avec leur correction.", ajout: "2026-09-11" },
            { id: "cahier-geometrie", type: "jeu", titre: "Mon cahier de géométrie", resume: "Six mini-jeux pour réviser à la maison, à ton rythme.", ajout: "2026-09-11" }
          ]
        },
        {
          id: "6e-ch3", num: 3, titre: "Les fractions",
          resume: "Partager en parts égales, placer une fraction sur une demi-droite graduée.",
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
