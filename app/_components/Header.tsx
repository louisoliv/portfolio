"use client";

import { buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Expérience", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <Section className="flex items-center py-3 gap-6">
        {/* Logo */}
        <span className="font-mono text-sm font-semibold text-emerald-400 tracking-widest shrink-0">
          louisOl.dev
        </span>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          {NAV_LINKS.map((link) => (
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

        {/* Icons */}
        <ul className="flex items-center gap-2">
          <Link
            href="https://github.com/louisoliv/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-8 p-0 rounded-lg border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-colors"
            )}
          >
            <GithubIcon size={16} className="text-foreground" />
          </Link>
          <Link
            href="https://linkedin.com"
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
