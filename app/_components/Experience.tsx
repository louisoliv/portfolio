import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import Link from "next/link";
import { EXPERIENCES } from "../_data/portfolio";

export type ExperienceItemProps = {
  title: string;
  company: string;
  companyUrl?: string;
  date: string;
  description: string;
  badge: string;
  badgeVariant: "alternance" | "formation";
};

export const Experience = () => {
  return (
    <Section className="flex flex-col items-start gap-4" id="experience">
      <Badge variant="outline">Parcours</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight">
        Expérience &amp; Formation
      </h2>

      <div className="flex flex-col w-full divide-y divide-border">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="flex gap-6 py-6 max-sm:flex-col max-sm:gap-2">
            {/* Date */}
            <div className="w-36 shrink-0">
              <p className="font-mono text-xs text-muted-foreground pt-1">
                {exp.date}
              </p>
            </div>

            {/* Dot */}
            <div className="relative flex flex-col items-center shrink-0 max-sm:hidden">
              <div
                className={`size-2.5 rounded-full mt-1.5 ${
                  exp.badgeVariant === "alternance"
                    ? "bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                    : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-3 mb-1.5 flex-wrap">
                <div>
                  <p className="text-base font-semibold">{exp.title}</p>
                  {exp.companyUrl ? (
                    <Link
                      href={exp.companyUrl}
                      className="text-sm text-primary hover:underline font-medium"
                    >
                      {exp.company}
                    </Link>
                  ) : (
                    <p className="text-sm text-primary font-medium">
                      {exp.company}
                    </p>
                  )}
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                    exp.badgeVariant === "alternance"
                      ? "bg-primary/10 text-primary border-primary/25"
                      : "bg-emerald-400/10 text-emerald-400 border-emerald-400/25"
                  }`}
                >
                  {exp.badge}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
