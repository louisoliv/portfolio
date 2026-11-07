// All the site's text in English. Same keys as content.fr.ts (TypeScript checks it).
// Links, tags and icons, shared by both languages, are in portfolio.tsx.

import type { Content } from "./content.fr";

export const en: Content = {
  meta: {
    shareImageAlt: "View from the pilot's seat of a TIE Fighter cockpit, facing the starry window",
    title: "Louis OLIVIER",
    classicTitle: "Louis OLIVIER - Classic version",
    description:
      "Portfolio of Louis Olivier, full stack developer: experience, projects, skills and contact.",
  },

  hero: {
    availability: "Apprenticeship · ROAV7",
    role: "Application Designer · Full Stack Developer",
    // The sentence is split around its two links (Zone01 and GitHub)
    introBeforeSchool:
      "Full stack developer passionate about building modern interfaces and robust APIs. Training at",
    introAfterSchool:
      "Rouen and working as an apprentice, I build real projects from frontend to backend - and I publish them on",
    viewProjects: "View my projects",
    contactMe: "Contact me",
    photoAlt: "Photo of Louis",
  },

  stats: {
    projects: "Projects",
    years: "Years of code",
    techs: "Techs",
  },

  experiences: {
    roav7: {
      title: "Software Developer",
      company: "ROAV7 · Apprenticeship",
      description:
        "Development of software for data collected by drones. Autonomous work, supervised by my mentor, head of the R&D department. Stack: Node.js, Electron, React, TypeScript, Tailwind and SQLite3.",
      badge: "Apprenticeship",
    },
    ares: {
      title: "Lead Developer",
      company: "Arès (McDonald's franchisee) · Apprenticeship completed",
      description:
        "Development of a business application (McDonald's ERP) in a professional environment. Worked solo, then in a team (for 2 months), Git version control, continuous deployment. Stack: Python, Flask, SQLAlchemy, React, TypeScript, Tailwind, Docker and PostgreSQL.",
      badge: "Apprenticeship",
    },
    zone01: {
      title: "Student Developer",
      company: "Zone01 · Rouen, Normandy",
      description:
        "Hands-on coding school - collaborative projects in Go, JavaScript and Rust. Teaching based on real projects and pair programming. Building autonomy and technical rigor.",
      badge: "Training",
    },
  },

  projects: {
    featuredBadge: "Apprenticeship",
    // Projects without a link: professional code, not published
    privateCode: "Private code",
    erp: {
      title: "McDonald's ERP",
      description:
        "Built a complete ERP for a McDonald's franchisee - stock, order and employee management.",
    },
    game2048: {
      title: "App: 2048",
      description: "Mobile app of the 2048 game, built with Dart and Flutter.",
    },
    socialNetwork: {
      title: "Social Network",
      description: "A social network inspired by Instagram, Facebook and Discord.",
    },
    forum: {
      title: "Forum Image Upload",
      description:
        "Complete forum / blog with posts, comments, likes and image upload.",
    },
    makeYourGame: {
      title: "Make Your Game",
      description: "Full Space Invaders in vanilla JavaScript, HTML and CSS.",
    },
    graphql: {
      title: "GraphQL",
      description:
        "Recreation of the school's website with multiple fetches and GraphQL queries.",
    },
  },

  works: {
    role: "Training",
    hangman: "Hangman game",
    quiz: "Quiz App",
  },

  skills: {
    frontend: "Frontend",
    backend: "Backend & Infra",
    tools: "Mobile, Desktop & Tools",
    ai: "AI · Claude, Copilot, Gemini",
  },

  contact: {
    pitch: "A project, an opportunity? Don't hesitate.",
    cvDescription: "Download my CV (PDF, in French)",
    linkedinProfile: "LinkedIn profile",
  },

  // Classic page
  classic: {
    nav: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    cockpitLink: "3D Cockpit",
    experienceBadge: "Background",
    experienceTitle: "Experience & Education",
    projectsBadge: "Work",
    projectsTitle: "Projects",
    projectsSubtitle: "Side projects & school projects",
    allProjects: "All projects",
    trainings: "Training",
    quickContact: "Quick contact",
    skillsBadge: "Skills",
    skillsTitle: "Tech stack",
    skillsSubtitle: "The tools I work with every day",
    // Paragraphs under the grid: { code } parts are displayed as code
    skillsDetails: [
      {
        title: "Web frontend",
        parts: [
          "Solid web foundations. I use ",
          { code: "Tailwind CSS" },
          " and ",
          { code: "TypeScript" },
          " every day with ",
          { code: "React" },
          " and ",
          { code: "Next.js" },
          ".",
        ],
      },
      {
        title: "Backend",
        parts: [
          "REST APIs with ",
          { code: "Go" },
          " and ",
          { code: "Python · Flask" },
          ". ",
          { code: "Docker" },
          " containerization, ",
          { code: "PostgreSQL" },
          " databases and ",
          { code: "GraphQL" },
          " queries.",
        ],
      },
      {
        title: "Mobile",
        parts: [
          "Cross-platform mobile development with ",
          { code: "Flutter" },
          " and ",
          { code: "Dart" },
          ". Actively learning to round out my full stack skills.",
        ],
      },
    ],
    contactBadge: "Contact",
    contactTitle: "Get in touch",
    footer: "Made with React · TypeScript · Tailwind",
    autoRedirectNotice:
      "You are seeing the classic version because your device may struggle to display the 3D cockpit.",
    autoRedirectLink: "Try the cockpit anyway",
    switchLanguage: "Passer en français",
  },

  // 3D cockpit
  cockpit: {
    sections: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
    },
    profile: "Profile",
    profileCardTitle: "Pilot profile",
    backToOverview: "← Overview",
    classicVersion: "Classic version",
    skipToClassic: "Go to the classic version",
    accessGranted: "Access granted",
    network: "Imperial network · Terminal 7-4",
    close: "Close",
    sectionsNav: "Sections",
    muteOn: "Turn sound on",
    muteOff: "Turn sound off",
    switchLanguage: "Passer en français",
    slowDevice: "Your device seems to be struggling to display the cockpit.",
    stayHere: "Stay here",
  },

  // Boot screen
  boot: {
    sequence: "Boot sequence",
    title: "Initializing systems…",
    progressLabel: "Loading the cockpit",
    steps: [
      "Connecting to the Imperial network",
      "Loading the cockpit structure",
      "Calibrating the control panels",
      "Aligning the targeting computer",
      "Systems operational",
    ],
  },
};
