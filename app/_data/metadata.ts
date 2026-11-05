import type { Metadata } from "next";
import { fr } from "./content.fr";
import { en } from "./content.en";
import { cockpitPath, type Lang } from "./i18n";

const TEXTS = { fr, en };

// Base for absolute URLs such as canonical links: change it if the site gets its own domain
export const METADATA_BASE = new URL("https://portfolio-louisolivier.vercel.app");

export const cockpitMetadata = (lang: Lang): Metadata => ({
  title: TEXTS[lang].meta.title,
  description: TEXTS[lang].meta.description,
  alternates: {
    canonical: cockpitPath(lang),
    // Tells search engines that these are the two language versions of one page
    languages: { fr: cockpitPath("fr"), en: cockpitPath("en") },
  },
});

export const classicMetadata = (lang: Lang): Metadata => ({
  title: TEXTS[lang].meta.classicTitle,
  description: TEXTS[lang].meta.description,
  // Same content as the cockpit's text version: search engines should list the cockpit
  alternates: { canonical: cockpitPath(lang) },
});
