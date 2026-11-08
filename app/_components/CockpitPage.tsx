import SceneClient from "@/components/three/SceneClient";
import { PortfolioText } from "./PortfolioText";
import { getPortfolio } from "../_data/portfolio";
import { classicPath, type Lang } from "../_data/i18n";

// The 3D cockpit page, starting in the given language
export const CockpitPage = ({ lang }: { lang: Lang }) => {
  const { t } = getPortfolio(lang);
  return (
    // h-dvh, not h-screen: on phones 100vh ignores the browser's own bars, which then
    // cover the bottom of the page (the section bar disappeared under them)
    <main className="h-dvh w-full bg-black">
      {/* Skip link: first Tab stop, only shown on keyboard focus. Above everything,
          including the boot screen and drei's <Html> layers (huge z-index). */}
      <a
        href={classicPath(lang)}
        className="sr-only font-mono text-sm uppercase tracking-widest focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[2147483647] focus:rounded focus:border focus:border-red-500 focus:bg-black focus:px-4 focus:py-2 focus:text-red-300"
      >
        {t.cockpit.skipToClassic}
      </a>
      <PortfolioText lang={lang} />
      <SceneClient lang={lang} boot={t.boot} />
    </main>
  );
};
