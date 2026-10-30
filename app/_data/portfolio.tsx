// Single source of truth for the portfolio content,
// shared by the classic page and the 3D cockpit cards.

import {
  Briefcase,
  ImageUp,
  Joystick,
  ChartLine,
  Rocket,
  BarChart3,
} from "lucide-react";
import type { ExperienceItemProps } from "../_components/Experience";
import type { SideProjectProps } from "../_components/SideProject";
import type { WorkProps } from "../_components/Work";
import { HtmlIcon } from "../_components/icons/HtmlLogo";
import { CssIcon } from "../_components/icons/CssLogo";
import { JavascriptIcon } from "../_components/icons/Javascript.Logo";
import { GoLangIcon } from "../_components/icons/GoLogo";
import { PythonIcon } from "../_components/icons/PythonLogo";
import { FlaskIcon } from "../_components/icons/FlaskLogo";
import { DartIcon } from "../_components/icons/DartLogo";
import { FlutterIcon } from "../_components/icons/FlutterLogo";

// ─── Hero ────────────────────────────────────────────────────────────────

export const HERO = {
  availability: "Disponible · Alternance",
  firstName: "Louis",
  lastName: "OLIVIER",
  role: "Full Stack Developer",
  // The intro sentence is split around its two inline links
  intro: {
    beforeSchool:
      "Développeur full stack passionné par la création d'interfaces modernes et d'APIs robustes. En formation à",
    school: {
      label: "Zone01",
      url: "https://zone01rouennormandie.org/",
      logo: "https://zone01rouennormandie.org/wp-content/uploads/2024/02/ZONE01-ROUEN-NORMANDIE-HORIZON-FOND-NOIR-BONNE-TAILLE.png",
    },
    afterSchool:
      "Rouen et en alternance, je construis des projets concrets du frontend au backend - et je publie sur",
    github: { label: "GitHub", url: "https://github.com/louisoliv" },
    end: ".",
  },
};

export const TECH_TAGS = [
  "React · Next.js",
  "TypeScript",
  "Golang",
  "Python",
  "Docker",
  "SQL",
];

export const STATS = [
  { value: "50+", label: "Projets" },
  { value: "2,5", label: "Ans de code" },
  { value: "10+", label: "Techs" },
];

// ─── Expérience ──────────────────────────────────────────────────────────

export const EXPERIENCES: ExperienceItemProps[] = [
  {
    title: "Développeur Full Stack",
    company: "Entreprise Arès (franchisé McDonalds) · Alternance",
    companyUrl: "#",
    date: "2025 - 2026",
    description:
      "Développement d'une application métier (ERP McDonald's) en environnement professionnel. Travail solitaire puis en équipe (sur 2 mois), gestion de versions Git, déploiement continu. Stack Python, Flask, SQLAlchemy, React, TypeScript, Tailwind, Docker et PostgreSQL.",
    badge: "Alternance",
    badgeVariant: "alternance",
  },
  {
    title: "Étudiant développeur",
    company: "Zone01 · Rouen, Normandie",
    companyUrl: "https://zone01rouennormandie.org/",
    date: "2023 - 2026",
    description:
      "École de code par la pratique - projets collaboratifs en Go, JavaScript et Rust. Pédagogie basée sur des projets réels et du pair-programming. Développement de l'autonomie et de la rigueur technique.",
    badge: "Formation",
    badgeVariant: "formation",
  },
];

// ─── Projets ─────────────────────────────────────────────────────────────

export const SIDE_PROJECTS: SideProjectProps[] = [
  {
    Logo: Briefcase,
    title: "ERP McDonald's",
    description:
      "Création d'un ERP complet pour un franchisé McDonald's - gestion des stocks, commandes et employés.",
    url: "https://github.com/louisoliv/",
    tags: [
      "Python",
      "Flask",
      "React",
      "TypeScript",
      "Tailwind",
      "Docker",
      "PostgreSQL",
    ],
    featured: true,
  },
  {
    Logo: Rocket,
    title: "Application : 2048",
    description:
      "Développement d'une application mobile en Dart - Flutter du jeu 2048",
    url: "https://github.com/louisoliv/",
    tags: ["Dart", "Flutter"],
  },
  {
    Logo: BarChart3,
    title: "Social Network",
    description:
      "Un réseau social s'inspirant d'Instagram, Facebook et Discord",
    url: "https://github.com/louisoliv/",
    tags: ["Go", "Next.js", "JavaScript", "Docker", "SQLite3"],
  },
  {
    Logo: ImageUp,
    title: "Forum Image Upload",
    description:
      "Forum / blog complet avec posts, commentaires, likes et upload d'images.",
    url: "https://github.com/louisoliv/Forum-Image-Upload",
    tags: ["Go", "HTML", "CSS"],
  },
  {
    Logo: Joystick,
    title: "Make Your Game",
    description: "Space Invaders entier en JavaScript vanilla, HTML et CSS.",
    url: "https://github.com/louisoliv/Make-Your-Game-History",
    tags: ["JS", "HTML", "CSS"],
  },
  {
    Logo: ChartLine,
    title: "GraphQL",
    description:
      "Recréation du site de l'école avec fetches multiples et requêtes GraphQL.",
    url: "https://github.com/louisoliv/louisoliv.github.io",
    tags: ["GraphQL", "JS"],
  },
];

export const WORKS: WorkProps[] = [
  {
    image: "/hangman.png",
    title: "Hanged game",
    role: "Training",
    date: "2024",
    url: "https://github.com/louisoliv/A-hanged-man",
  },
  {
    image: "/milkyway.png",
    title: "Quiz App",
    role: "Training",
    date: "2024-2025",
    url: "https://github.com/louisoliv/Stars-Wars-Quiz-App",
  },
];

// ─── Compétences ─────────────────────────────────────────────────────────

// type SkillLevel = "Solide" | "Maîtrisé" | "En cours";

export type SkillItem = {
  icon: React.ReactNode;
  name: string;
  // level: SkillLevel;
};

export type SkillGroup = {
  category: string;
  skills: SkillItem[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      {
        icon: (
          <span className="flex gap-0.5">
            <HtmlIcon size={22} />
            <CssIcon size={22} />
          </span>
        ),
        name: "HTML · CSS",
        // level: "Solide",
      },
      {
        icon: <JavascriptIcon size={22} />,
        name: "JavaScript",
        // level: "Solide",
      },
      {
        icon: (
          <span className="text-sky-400 font-bold text-base font-mono leading-none">
            TS
          </span>
        ),
        name: "TypeScript",
        // level: "Maîtrisé",
      },
      {
        icon: (
          <span className="text-cyan-400 font-bold text-base leading-none">
            ⚛
          </span>
        ),
        name: "React · Next.js",
        // level: "Maîtrisé",
      },
      {
        icon: (
          <span className="text-sky-300 font-bold text-[11px] font-mono leading-none">
            TW
          </span>
        ),
        name: "Tailwind CSS",
        // level: "Maîtrisé",
      },
    ],
  },
  {
    category: "Backend & Infra",
    skills: [
      {
        icon: <GoLangIcon size={22} />,
        name: "Golang",
        // level: "Maîtrisé",
      },
      {
        icon: <PythonIcon size={22} />,
        name: "Python",
        // level: "Solide",
      },
      {
        icon: <FlaskIcon size={20} className="text-foreground" />,
        name: "Flask",
        // level: "Solide",
      },
      {
        icon: <span className="text-blue-400 text-base leading-none">🐳</span>,
        name: "Docker",
        // level: "En cours",
      },
      {
        icon: (
          <span className="text-orange-400 text-base leading-none">🗄️</span>
        ),
        name: "SQL · PostgreSQL",
        // level: "En cours",
      },
      {
        icon: (
          <span className="text-pink-400 font-bold text-[11px] font-mono leading-none">
            GQL
          </span>
        ),
        name: "GraphQL",
        // level: "En cours",
      },
    ],
  },
  {
    category: "Mobile & Outils",
    skills: [
      {
        icon: <DartIcon size={22} />,
        name: "Dart",
        // level: "En cours",
      },
      {
        icon: <FlutterIcon size={22} />,
        name: "Flutter",
        // level: "En cours",
      },
      {
        icon: <span className="text-orange-500 text-base leading-none">⎇</span>,
        name: "Git · GitHub",
        // level: "Solide",
      },
      {
        icon: (
          <span className="text-blue-500 font-bold text-[11px] font-mono leading-none">
            VS
          </span>
        ),
        name: "VS Code",
        // level: "Solide",
      },
      {
        icon: (
          <span className="text-muted-foreground text-base leading-none">
            🐧
          </span>
        ),
        name: "Linux · Bash",
        // level: "Maîtrisé",
      },
    ],
  },
];

// ─── Contact ─────────────────────────────────────────────────────────────
// Labels differ between the contact section and the quick-contact card,
// so only the shared values live here.

export const CONTACT_PHOTO = "/_next/static/media/Fond-blanc2.1203aefd.jpg";

export const EMAIL = {
  address: "louisolivier7603@gmail.com",
  url: "mailto:louisolivier7603@gmail.com",
  icon: "https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp",
};

export const LINKEDIN = {
  url: "https://www.linkedin.com/in/louis-olivier",
  icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
};
