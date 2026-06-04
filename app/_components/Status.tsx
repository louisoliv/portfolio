import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { SideProject, SideProjectProps } from "./SideProject";
import { ContactCard } from "./ContactCard";
import { Work, WorkProps } from "./Work";
import {
  Briefcase,
  ImageUp,
  Joystick,
  ChartLine,
  Rocket,
  BarChart3,
} from "lucide-react";

export const Status = () => {
  return (
    <Section className="flex flex-col gap-6" id="projects">
      <div>
        <Badge variant="outline">Travaux</Badge>
        <h2 className="mt-3 pb-2 text-3xl font-semibold tracking-tight">
          Projets
        </h2>
        <p className="text-sm text-muted-foreground">
          Side projects &amp; projets d&apos;école
        </p>
      </div>

      <div className="flex max-lg:flex-col items-start gap-4">
        {/* Projets */}
        <div className="flex-[3] w-full">
          <Card className="p-4 w-full flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Tous les projets
            </p>
            <div className="flex flex-col gap-1">
              {SIDE_PROJECTS.map((project, index) => (
                <SideProject
                  key={index}
                  Logo={project.Logo}
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  tags={project.tags}
                  featured={project.featured}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Work + Contact */}
        <div className="flex-[2] w-full flex flex-col gap-4">
          <Card className="p-4 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Formations
            </p>
            <div className="flex flex-col gap-2">
              {WORKS.map((work, index) => (
                <Work key={index} {...work} />
              ))}
            </div>
          </Card>

          <Card className="p-4 flex-1 flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Contact rapide
            </p>
            <ContactCard
              name="Louis Olivier"
              image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
              mediumImage="https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp"
              descritpon="louisolivier7603@gmail.com"
              url="mailto:louisolivier7603@gmail.com"
            />
            <ContactCard
              name="Louis Olivier"
              image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
              mediumImage="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
              descritpon="Profil LinkedIn"
              url="https://www.linkedin.com/in/louis-olivier"
            />
          </Card>
        </div>
      </div>
    </Section>
  );
};

const SIDE_PROJECTS: SideProjectProps[] = [
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

const WORKS: WorkProps[] = [
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
