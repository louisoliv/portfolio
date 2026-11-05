// Site languages and their URLs. No dependencies: also used by first-payload client code.

export type Lang = "fr" | "en";

export const LANGS: Lang[] = ["fr", "en"];

const PREFIX: Record<Lang, string> = { fr: "", en: "/en" };

export const cockpitPath = (lang: Lang) => PREFIX[lang] || "/";
export const classicPath = (lang: Lang) => `${PREFIX[lang]}/classique`;
