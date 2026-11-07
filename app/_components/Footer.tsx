import { Section } from "./Section";
import { getPortfolio } from "../_data/portfolio";
import type { Lang } from "../_data/i18n";

export const Footrer = ({ lang }: { lang: Lang }) => {
  const { t } = getPortfolio(lang);
  return (
    <footer className="border-t border-border bg-card/50">
      <Section className="py-6 flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-xs text-emerald-400 tracking-widest">
          © 2026 Louis Olivier
        </p>
        <p className="text-xs text-muted-foreground">
          {t.classic.footer}
        </p>
      </Section>
    </footer>
  );
};
