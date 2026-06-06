/* ===================================================================
   CONTENU.JS — VERSION 2 (NOUVEAU VILLAGE)
   Même structure que la V1 : si le client a déjà modifié son contenu V1,
   il peut le récupérer tel quel et le coller ici. C'est intentionnel.
   =================================================================== */

const contenu = {

  copro: {
    nom: "Nouveau Village",
    sousTitre: "Association Syndicale Libre des Propriétaires",
    ville: "Cesson — 77240",
    nombreLogements: "[nombre à compléter]",
    anneeConstruction: "[année à compléter]"
  },

  annoncePrincipale: {
    afficher: true,
    etiquette: "À REMPLACER",
    titre: "Assemblée Générale Ordinaire et Extraordinaire",
    date: "Jeudi 28 mai 2026 à 20h",
    lieu: "Salle Chipping Sodbury, 9 rue Aimé Césaire — 77240 Cesson",
    complement: "Les convocations ont été envoyées. Venez nombreux !"
  },

  accesRapides: [
    { icone: "🌳", titre: "Espaces verts", texte: "Entretien du patrimoine arboré, jardins partagés et gestion des déchets verts.", lien: "residence.html#vert" },
    { icone: "📄", titre: "Documents", texte: "Statuts, comptes-rendus d'AG, livret d'accueil et règlements à télécharger.", lien: "documents.html" },
    { icone: "🏊", titre: "Piscine", texte: "Horaires d'ouverture, règlement intérieur et informations de saison.", lien: "residence.html#piscine" }
  ],

  actualites: [
    { date: "date", titre: "Livret de bienvenue mis à jour", texte: "Le livret des bonnes pratiques à l'usage des habitants est disponible au téléchargement." },
    { date: "date", titre: "Tout savoir sur la fibre optique", texte: "Un document récapitulatif sur le raccordement à la fibre dans la résidence." },
    { date: "date", titre: "Les Chroniques de Nouveau Village", texte: "Le journal local de la résidence est paru. À consulter dans l'espace documents." }
  ],

  rendezVous: [
    { date: "date", titre: "Prochain comité syndical bénévole", lieu: "lieu" },
    { date: "date", titre: "Rencontre Comité / Délégués de rue", lieu: "lieu" },
    { date: "date", titre: "Assemblée Générale annuelle", lieu: "lieu" }
  ],

  piscine: {
    horaires: "Tous les jours : 10h30 - 20h",
    periode: "Dates à compléter",
    reglementResume: "Accès réservé aux résidents et à leurs invités, baignade surveillée selon les créneaux affichés."
  },

  espacesVerts: {
    intro: "La résidence dispose d'un patrimoine arboré entretenu collectivement : arbres, arbustes, jardins partagés et espaces de promenade.",
    points: [
      "Connaissance des arbres et arbustes de la résidence",
      "Gestion du patrimoine arboricole et programme d'entretien",
      "Gestion des déchets végétaux et compostage",
      "Entretiens à réaliser par les résidents"
    ]
  },

  organisation: {
    intro: "L'ASL est administrée par un comité de bénévoles élus, épaulé par des délégués de rue qui font le lien avec les résidents.",
    elements: [
      { titre: "Statuts de l'ASL", texte: "Le cadre juridique de l'association.", lien: "statuts.html" },
      { titre: "Membres du comité", texte: "Les personnes qui administrent la copropriété.", lien: "membres.html" },
      { titre: "Délégués de rue", texte: "Vos interlocuteurs de proximité par secteur.", lien: "delegues.html" },
      { titre: "Comptes-rendus d'AG", texte: "L'historique des assemblées générales.", lien: "documents.html#cat-organisation" }
    ]
  },

  documents: [
    { categorie: "Présentation", titre: "Livret de bienvenue", date: "[date]", lien: "livret.html", taille: "PDF" },
    { categorie: "Présentation", titre: "Tout sur la fibre optique", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Présentation", titre: "Les Chroniques de Nouveau Village", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Organisation", titre: "Statuts de l'ASL", date: "[date]", lien: "statuts.html", taille: "HTML" },
    { categorie: "Organisation", titre: "Dernier compte-rendu d'AG", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Organisation", titre: "Dernière convocation AG", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Espaces verts", titre: "Programme coupes et entretiens", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Espaces verts", titre: "Bilan annuel espaces verts", date: "[date]", lien: "#", taille: "PDF" },
    { categorie: "Piscine", titre: "Règlement de la piscine", date: "[date]", lien: "#", taille: "PDF" }
  ],

  contact: {
    intro: "Pour toute question, demande ou signalement, le secrétariat de l'ASL est à votre disposition.",
    email: "[email à remplacer]",
    telephone: "[téléphone à remplacer]",
    adresse: "[adresse du secrétariat à remplacer]",
    horairesAccueil: "[horaires d'accueil à remplacer]"
  }

};

window.contenu = contenu;
