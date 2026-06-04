import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { Code } from "./Code";
import { HtmlIcon } from "./icons/HtmlLogo";
import { CssIcon } from "./icons/CssLogo";
import { JavascriptIcon } from "./icons/Javascript.Logo";
import { GoLangIcon } from "./icons/GoLogo";
import { PythonIcon } from "./icons/PythonLogo";
import { FlaskIcon } from "./icons/FlaskLogo";
import { DartIcon } from "./icons/DartLogo";
import { FlutterIcon } from "./icons/FlutterLogo";

// type SkillLevel = "Solide" | "Maîtrisé" | "En cours";

type SkillItem = {
  icon: React.ReactNode;
  name: string;
  // level: SkillLevel;
};

type SkillGroup = {
  category: string;
  skills: SkillItem[];
};

// const levelStyle: Record<SkillLevel, string> = {
//   Solide: "text-emerald-400 font-mono text-[10px] font-bold",
//   Maîtrisé: "text-primary    font-mono text-[10px] font-bold",
//   "En cours": "text-amber-400  font-mono text-[10px] font-bold",
// };

const SKILL_GROUPS: SkillGroup[] = [
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

export const Skills = () => {
  return (
    <Section className="flex flex-col items-start gap-4" id="skills">
      <Badge variant="outline">Skills</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight">
        Stack technique
      </h2>
      <p className="text-sm text-muted-foreground -mt-2 mb-2">
        Les outils avec lesquels je travaille au quotidien
      </p>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              {group.category}
            </p>
            <div className="flex flex-col gap-3">
              {group.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 flex items-center justify-center shrink-0">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium flex-1">
                    {skill.name}
                  </span>
                  {/* <span className={levelStyle[skill.level]}>{skill.level}</span> */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Descriptions détaillées */}
      <div className="flex max-md:flex-col gap-4 w-full mt-4">
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base font-semibold">Web frontend</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bases solides du web. J&apos;utilise <Code>Tailwind CSS</Code> et{" "}
            <Code>TypeScript</Code> au quotidien avec <Code>React</Code> et{" "}
            <Code>Next.js</Code>.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base font-semibold">Backend</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            API REST avec <Code>Go</Code> et <Code>Python · Flask</Code>.
            Conteneurisation <Code>Docker</Code>, bases de données{" "}
            <Code>PostgreSQL</Code> et requêtes <Code>GraphQL</Code>.
          </p>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-base font-semibold">Mobile</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Développement mobile cross-platform avec <Code>Flutter</Code> et{" "}
            <Code>Dart</Code>. En apprentissage actif pour compléter mon stack
            full stack.
          </p>
        </div>
      </div>
    </Section>
  );
};
