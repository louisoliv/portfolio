import type { Metadata } from "next";
import SceneClient from "@/components/three/SceneClient";
import { PortfolioText } from "./_components/PortfolioText";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function CockpitPage() {
  return (
    <main className="h-screen w-full bg-black">
      {/* Skip link: first Tab stop, only shown on keyboard focus. Above everything,
          including the boot screen and drei's <Html> layers (huge z-index). */}
      <a
        href="/classique"
        className="sr-only font-mono text-sm uppercase tracking-widest focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[2147483647] focus:rounded focus:border focus:border-red-500 focus:bg-black focus:px-4 focus:py-2 focus:text-red-300"
      >
        Aller à la version classique
      </a>
      <PortfolioText />
      <SceneClient />
    </main>
  );
}
