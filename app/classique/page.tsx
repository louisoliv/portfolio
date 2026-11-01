import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Spacing } from "../_components/Spacing";
import { Experience } from "../_components/Experience";
import { Status } from "../_components/Status";
import { Skills } from "../_components/Skills";
import { Contact } from "../_components/Contact";
import { Footrer } from "../_components/Footer";
import { AutoRedirectNotice } from "../_components/AutoRedirectNotice";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Louis OLIVIER - Version classique",
  // Same content as the cockpit's text version: search engines should list the cockpit
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main>
      {/* useSearchParams needs a Suspense boundary to keep this page static */}
      <Suspense fallback={null}>
        <AutoRedirectNotice />
      </Suspense>
      <Header />
      <Spacing size="md" />
      <Hero />
      <Spacing size="md" />
      <Experience />
      <Spacing size="md" />
      <Status />
      <Spacing size="md" />
      <Skills />
      <Spacing size="md" />
      <Contact />
      <Spacing size="md" />
      <Footrer />
    </main>
  );
}
