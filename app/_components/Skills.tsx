import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { Code } from "./Code";
import { getPortfolio } from "../_data/portfolio";
import type { Lang } from "../_data/i18n";

// type SkillLevel = "Solide" | "Maîtrisé" | "En cours";

// const levelStyle: Record<SkillLevel, string> = {
//   Solide: "text-emerald-400 font-mono text-[10px] font-bold",
//   Maîtrisé: "text-primary    font-mono text-[10px] font-bold",
//   "En cours": "text-amber-400  font-mono text-[10px] font-bold",
// };

export const Skills = ({ lang }: { lang: Lang }) => {
  const { t, SKILL_GROUPS } = getPortfolio(lang);
  return (
    <Section className="flex flex-col items-start gap-4" id="skills">
      <Badge variant="outline">{t.classic.skillsBadge}</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight">
        {t.classic.skillsTitle}
      </h2>
      <p className="text-sm text-muted-foreground -mt-2 mb-2">
        {t.classic.skillsSubtitle}
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
        {t.classic.skillsDetails.map((detail) => (
          <div key={detail.title} className="flex flex-col gap-2 flex-1">
            <h3 className="text-base font-semibold">{detail.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {detail.parts.map((part, i) =>
                typeof part === "string" ? part : <Code key={i}>{part.code}</Code>
              )}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};
