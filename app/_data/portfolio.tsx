// Portfolio data for each language, shared by the classic page and the 3D cockpit cards.
// Texts are in content.fr.ts / content.en.ts; links, tags and icons, common to both, are here.

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
import { fr, type Content } from "./content.fr";
import { en } from "./content.en";
import type { Lang } from "./i18n";
import { GITHUB, LINKEDIN } from "./profiles";

// ─── Common to both languages ────────────────────────────────────────────

// GitHub and LinkedIn profiles live in profiles.ts (see there why)
export { GITHUB, LINKEDIN };

export const CONTACT_PHOTO = "/_next/static/media/Fond-blanc2.1203aefd.jpg";

export const EMAIL = {
  address: "louisolivier7603@gmail.com",
  url: "mailto:louisolivier7603@gmail.com",
  icon: "https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp",
};

// The PDF goes in public/, it is served at this path
const CV_URL = "/cv-louis-olivier.pdf";

export const LOCATIONS = "Rouen · Le Havre";

export const TECH_TAGS = [
  "React · Next.js",
  "TypeScript",
  "Golang",
  "Python",
  "Docker",
  "Vagrant",
  "SQL · SQLite",
  "Electron",
];

const SCHOOL = {
  label: "Zone01",
  url: "https://zone01rouennormandie.org/",
  logo: "https://zone01rouennormandie.org/wp-content/uploads/2024/02/ZONE01-ROUEN-NORMANDIE-HORIZON-FOND-NOIR-BONNE-TAILLE.png",
};

// ─── Per language ────────────────────────────────────────────────────────

const buildHero = (t: Content) => ({
  availability: t.hero.availability,
  firstName: "Louis",
  lastName: "OLIVIER",
  role: t.hero.role,
  // The intro sentence is split around its two inline links
  intro: {
    beforeSchool: t.hero.introBeforeSchool,
    school: SCHOOL,
    afterSchool: t.hero.introAfterSchool,
    github: { label: "GitHub", url: GITHUB.url },
    end: ".",
  },
});

const buildStats = (t: Content) => [
  { value: "50+", label: t.stats.projects },
  { value: "3", label: t.stats.years },
  { value: "10+", label: t.stats.techs },
];

const buildExperiences = (t: Content): ExperienceItemProps[] => [
  {
    ...t.experiences.roav7,
    companyUrl: "https://www.roav7.com/",
    date: "2026 - 2028",
    badgeVariant: "alternance",
  },
  {
    ...t.experiences.ares,
    date: "2025 - 2026",
    badgeVariant: "alternance",
  },
  {
    ...t.experiences.zone01,
    companyUrl: "https://zone01rouennormandie.org/",
    date: "2023 - 2028",
    badgeVariant: "formation",
  },
];

const buildSideProjects = (t: Content): SideProjectProps[] => [
  {
    ...t.projects.erp,
    Logo: Briefcase,
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
    featuredBadge: t.projects.featuredBadge,
  },
  {
    ...t.projects.game2048,
    Logo: Rocket,
    url: "https://github.com/louisoliv/",
    tags: ["Dart", "Flutter"],
  },
  {
    ...t.projects.socialNetwork,
    Logo: BarChart3,
    url: "https://github.com/louisoliv/",
    tags: ["Go", "Next.js", "JavaScript", "Docker", "SQLite3"],
  },
  {
    ...t.projects.forum,
    Logo: ImageUp,
    url: "https://github.com/louisoliv/Forum-Image-Upload",
    tags: ["Go", "HTML", "CSS"],
  },
  {
    ...t.projects.makeYourGame,
    Logo: Joystick,
    url: "https://github.com/louisoliv/Make-Your-Game-History",
    tags: ["JS", "HTML", "CSS"],
  },
  {
    ...t.projects.graphql,
    Logo: ChartLine,
    url: "https://github.com/louisoliv/louisoliv.github.io",
    tags: ["GraphQL", "JS"],
  },
];

const buildWorks = (t: Content): WorkProps[] => [
  {
    image: "/hangman.png",
    title: t.works.hangman,
    role: t.works.role,
    date: "2024",
    url: "https://github.com/louisoliv/A-hanged-man",
  },
  {
    image: "/milkyway.png",
    title: t.works.quiz,
    role: t.works.role,
    date: "2024-2025",
    url: "https://github.com/louisoliv/Stars-Wars-Quiz-App",
  },
];

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

const buildSkillGroups = (t: Content): SkillGroup[] => [
  {
    category: t.skills.frontend,
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
    category: t.skills.backend,
    skills: [
      {
        icon: <GoLangIcon size={22} />,
        name: "Golang",
        // level: "Maîtrisé",
      },
      {
        icon: (
          <span className="text-green-500 font-bold text-[11px] font-mono leading-none">
            NODE
          </span>
        ),
        name: "Node.js",
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
          <span className="text-blue-400 font-bold text-[11px] font-mono leading-none">
            VG
          </span>
        ),
        name: "Vagrant",
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
          <span className="text-sky-500 font-bold text-[11px] font-mono leading-none">
            SQ3
          </span>
        ),
        name: "SQLite3",
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
    category: t.skills.tools,
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
        icon: (
          <span className="text-cyan-300 font-bold text-[11px] font-mono leading-none">
            EL
          </span>
        ),
        name: "Electron",
      },
      {
        icon: <span className="text-orange-500 text-base leading-none">⎇</span>,
        name: "Git · GitHub",
        // level: "Solide",
      },
      {
        icon: (
          <span className="text-lime-400 font-bold text-[11px] font-mono leading-none">
            VT
          </span>
        ),
        name: "Vitest",
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
      {
        icon: (
          <span className="text-violet-400 font-bold text-[11px] font-mono leading-none">
            IA
          </span>
        ),
        name: t.skills.ai,
      },
    ],
  },
];

const buildPortfolio = (t: Content) => ({
  // All the texts, for what is not structured data (titles, buttons…)
  t,
  HERO: buildHero(t),
  STATS: buildStats(t),
  EXPERIENCES: buildExperiences(t),
  SIDE_PROJECTS: buildSideProjects(t),
  WORKS: buildWorks(t),
  SKILL_GROUPS: buildSkillGroups(t),
  CV: { label: "CV", description: t.contact.cvDescription, url: CV_URL },
});

const PORTFOLIOS = { fr: buildPortfolio(fr), en: buildPortfolio(en) };

export const getPortfolio = (lang: Lang) => PORTFOLIOS[lang];
