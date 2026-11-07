import { Suspense } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Spacing } from "./Spacing";
import { Experience } from "./Experience";
import { Status } from "./Status";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { Footrer } from "./Footer";
import { AutoRedirectNotice } from "./AutoRedirectNotice";
import { getPortfolio } from "../_data/portfolio";
import { cockpitPath, type Lang } from "../_data/i18n";

// The classic (2D) version of the portfolio, in the given language
export const ClassicPage = ({ lang }: { lang: Lang }) => {
  const { t } = getPortfolio(lang);
  return (
    <main>
      {/* useSearchParams needs a Suspense boundary to keep this page static */}
      <Suspense fallback={null}>
        <AutoRedirectNotice
          text={t.classic.autoRedirectNotice}
          linkLabel={t.classic.autoRedirectLink}
          cockpitHref={`${cockpitPath(lang)}?force3d=1`}
        />
      </Suspense>
      <Header
        lang={lang}
        labels={{
          nav: t.classic.nav,
          cockpitLink: t.classic.cockpitLink,
          switchLanguage: t.classic.switchLanguage,
        }}
      />
      <Spacing size="md" />
      <Hero lang={lang} />
      <Spacing size="md" />
      <Experience lang={lang} />
      <Spacing size="md" />
      <Status lang={lang} />
      <Spacing size="md" />
      <Skills lang={lang} />
      <Spacing size="md" />
      <Contact lang={lang} />
      <Spacing size="md" />
      <Footrer lang={lang} />
    </main>
  );
};
