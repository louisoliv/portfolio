import type { Metadata } from "next";
import { fr } from "./content.fr";
import { en } from "./content.en";
import { classicPath, cockpitPath, type Lang } from "./i18n";

const TEXTS = { fr, en };

const LOCALES = { fr: "fr_FR", en: "en_US" };

// Preview shown when a link is shared (LinkedIn, WhatsApp, Discord…).
// The picture has no text on purpose: it stays readable when small, in both languages.
const sharePreview = (lang: Lang, title: string, path: string): Metadata => ({
  openGraph: {
    type: "website",
    title,
    description: TEXTS[lang].meta.description,
    url: path,
    siteName: "Louis OLIVIER",
    locale: LOCALES[lang],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: TEXTS[lang].meta.shareImageAlt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
});

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
  ...sharePreview(lang, TEXTS[lang].meta.title, cockpitPath(lang)),
});

export const classicMetadata = (lang: Lang): Metadata => ({
  title: TEXTS[lang].meta.classicTitle,
  description: TEXTS[lang].meta.description,
  // Same content as the cockpit's text version: search engines should list the cockpit
  alternates: { canonical: cockpitPath(lang) },
  ...sharePreview(lang, TEXTS[lang].meta.classicTitle, classicPath(lang)),
});
