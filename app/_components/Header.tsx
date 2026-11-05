"use client";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GITHUB, LINKEDIN } from "../_data/profiles";
import { classicPath, cockpitPath, type Lang } from "../_data/i18n";

// Client component: labels come as props so it does not bundle the texts of both languages
type HeaderProps = {
  lang: Lang;
  labels: {
    nav: { experience: string; projects: string; skills: string; contact: string };
    cockpitLink: string;
    switchLanguage: string;
  };
};

export const Header = ({ lang, labels }: HeaderProps) => {
  const otherLang: Lang = lang === "fr" ? "en" : "fr";
  const navLinks = [
    { label: labels.nav.experience, href: "#experience" },
    { label: labels.nav.projects, href: "#projects" },
    { label: labels.nav.skills, href: "#skills" },
    { label: labels.nav.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Section className="flex items-center py-3 gap-6">
        {/* Logo */}
        <span className="font-mono text-sm font-semibold text-emerald-400 tracking-widest shrink-0">
          louisOl.dev
        </span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 md:flex-none" />

        {/* Language switch and 3D version, kept outside the nav so they stay visible on mobile */}
        <Link
          href={classicPath(otherLang)}
          hrefLang={otherLang}
          aria-label={labels.switchLanguage}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 px-2 rounded-lg border-border/60 font-mono text-xs uppercase hover:border-primary/50 hover:bg-primary/5 transition-colors"
          )}
        >
          {otherLang}
        </Link>
        <Link
          href={cockpitPath(lang)}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-8 px-3 rounded-lg border-border/60 font-mono text-xs uppercase tracking-widest hover:border-primary/50 hover:bg-primary/5 transition-colors"
          )}
        >
          {labels.cockpitLink}
        </Link>

        {/* Icons */}
        <ul className="flex items-center gap-2">
          <Link
            href={GITHUB.url}
            aria-label="GitHub"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-8 p-0 rounded-lg border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            )}
          >
            <GithubIcon size={16} className="text-foreground" />
          </Link>
          <Link
            href={LINKEDIN.url}
            aria-label="LinkedIn"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-8 p-0 rounded-lg border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            )}
          >
            <LinkedInIcon size={16} className="text-foreground" />
          </Link>
        </ul>
      </Section>
    </header>
  );
};
