import { Section } from "./Section";

export const Footrer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <Section className="py-6 flex items-center justify-between flex-wrap gap-2">
        <p className="font-mono text-xs text-emerald-400 tracking-widest">
          © 2026 Louis Olivier
        </p>
        <p className="text-xs text-muted-foreground">
          Fait avec React · TypeScript · Tailwind
        </p>
      </Section>
    </footer>
  );
};
