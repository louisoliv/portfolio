// Tous les textes du site en français. Traduction : content.en.ts (mêmes clés).
// Les liens, les tags et les icônes, communs aux deux langues, sont dans portfolio.tsx.

export const fr = {
  meta: {
    title: "Louis OLIVIER",
    classicTitle: "Louis OLIVIER - Version classique",
    description:
      "Portfolio de Louis Olivier, développeur full stack : expérience, projets, compétences et contact.",
  },

  hero: {
    availability: "En alternance · ROAV7",
    role: "Concepteur d'applications · Développeur Full Stack",
    // La phrase est coupée autour de ses deux liens (Zone01 et GitHub)
    introBeforeSchool:
      "Développeur full stack passionné par la création d'interfaces modernes et d'APIs robustes. En formation à",
    introAfterSchool:
      "Rouen et en alternance, je construis des projets concrets du frontend au backend - et je publie sur",
    viewProjects: "Voir mes projets",
    contactMe: "Me contacter",
    photoAlt: "Photo de Louis",
  },

  stats: {
    projects: "Projets",
    years: "Ans de code",
    techs: "Techs",
  },

  experiences: {
    roav7: {
      title: "Développeur logiciel",
      company: "Entreprise ROAV7 · Alternance",
      description:
        "Développement d'un logiciel pour les données collectées par drone. Travail en autonomie, encadré par ma tutrice, responsable du pôle R&D. Stack Node.js, Electron, React, TypeScript, Tailwind et SQLite3.",
      badge: "Alternance",
    },
    ares: {
      title: "Lead developer",
      company: "Entreprise Arès (franchisé McDonald's) · Alternance terminée",
      description:
        "Développement d'une application métier (ERP McDonald's) en environnement professionnel. Travail solitaire puis en équipe (sur 2 mois), gestion de versions Git, déploiement continu. Stack Python, Flask, SQLAlchemy, React, TypeScript, Tailwind, Docker et PostgreSQL.",
      badge: "Alternance",
    },
    zone01: {
      title: "Étudiant développeur",
      company: "Zone01 · Rouen, Normandie",
      description:
        "École de code par la pratique - projets collaboratifs en Go, JavaScript et Rust. Pédagogie basée sur des projets réels et du pair-programming. Développement de l'autonomie et de la rigueur technique.",
      badge: "Formation",
    },
  },

  projects: {
    featuredBadge: "Alternance",
    erp: {
      title: "ERP McDonald's",
      description:
        "Création d'un ERP complet pour un franchisé McDonald's - gestion des stocks, commandes et employés.",
    },
    game2048: {
      title: "Application : 2048",
      description:
        "Développement d'une application mobile en Dart - Flutter du jeu 2048",
    },
    socialNetwork: {
      title: "Social Network",
      description:
        "Un réseau social s'inspirant d'Instagram, Facebook et Discord",
    },
    forum: {
      title: "Forum Image Upload",
      description:
        "Forum / blog complet avec posts, commentaires, likes et upload d'images.",
    },
    makeYourGame: {
      title: "Make Your Game",
      description: "Space Invaders entier en JavaScript vanilla, HTML et CSS.",
    },
    graphql: {
      title: "GraphQL",
      description:
        "Recréation du site de l'école avec fetches multiples et requêtes GraphQL.",
    },
  },

  works: {
    role: "Training",
    hangman: "Hanged game",
    quiz: "Quiz App",
  },

  skills: {
    frontend: "Frontend",
    backend: "Backend & Infra",
    tools: "Mobile, Desktop & Outils",
    ai: "IA · Claude, Copilot, Gemini",
  },

  contact: {
    pitch: "Un projet, une opportunité ? N'hésite pas.",
    cvDescription: "Télécharger mon CV (PDF)",
    linkedinProfile: "Profil LinkedIn",
  },

  // Page classique
  classic: {
    nav: {
      experience: "Expérience",
      projects: "Projets",
      skills: "Skills",
      contact: "Contact",
    },
    cockpitLink: "Cockpit 3D",
    experienceBadge: "Parcours",
    experienceTitle: "Expérience & Formation",
    projectsBadge: "Travaux",
    projectsTitle: "Projets",
    projectsSubtitle: "Side projects & projets d'école",
    allProjects: "Tous les projets",
    trainings: "Formations",
    quickContact: "Contact rapide",
    skillsBadge: "Skills",
    skillsTitle: "Stack technique",
    skillsSubtitle: "Les outils avec lesquels je travaille au quotidien",
    // Paragraphes sous la grille : les { code } s'affichent comme du code
    skillsDetails: [
      {
        title: "Web frontend",
        parts: [
          "Bases solides du web. J'utilise ",
          { code: "Tailwind CSS" },
          " et ",
          { code: "TypeScript" },
          " au quotidien avec ",
          { code: "React" },
          " et ",
          { code: "Next.js" },
          ".",
        ],
      },
      {
        title: "Backend",
        parts: [
          "API REST avec ",
          { code: "Go" },
          " et ",
          { code: "Python · Flask" },
          ". Conteneurisation ",
          { code: "Docker" },
          ", bases de données ",
          { code: "PostgreSQL" },
          " et requêtes ",
          { code: "GraphQL" },
          ".",
        ],
      },
      {
        title: "Mobile",
        parts: [
          "Développement mobile cross-platform avec ",
          { code: "Flutter" },
          " et ",
          { code: "Dart" },
          ". En apprentissage actif pour compléter mon stack full stack.",
        ],
      },
    ],
    contactBadge: "Contact",
    contactTitle: "Me contacter",
    footer: "Fait avec React · TypeScript · Tailwind",
    autoRedirectNotice:
      "Tu vois la version classique car ton appareil risque d'avoir du mal à afficher le cockpit 3D.",
    autoRedirectLink: "Essayer quand même le cockpit",
    switchLanguage: "Switch to English",
  },

  // Cockpit 3D
  cockpit: {
    sections: {
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
    },
    profile: "Profil",
    profileCardTitle: "Profil pilote",
    backToOverview: "← Vue d'ensemble",
    classicVersion: "Version classique",
    skipToClassic: "Aller à la version classique",
    accessGranted: "Accès autorisé",
    network: "Réseau impérial · Terminal 7-4",
    close: "Fermer",
    sectionsNav: "Sections",
    muteOn: "Activer le son",
    muteOff: "Couper le son",
    switchLanguage: "Switch to English",
    slowDevice: "Ton appareil semble avoir du mal à afficher le cockpit.",
    stayHere: "Rester ici",
  },

  // Écran de démarrage
  boot: {
    sequence: "Séquence de démarrage",
    title: "Initialisation des systèmes…",
    progressLabel: "Chargement du cockpit",
    steps: [
      "Connexion au réseau impérial",
      "Chargement de la structure du cockpit",
      "Calibration des panneaux de contrôle",
      "Alignement de l'ordinateur de visée",
      "Systèmes opérationnels",
    ],
  },
};

export type Content = typeof fr;
