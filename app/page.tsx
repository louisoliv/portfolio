import Image from "next/image";
import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Spacing } from "./_components/Spacing";
import { Status } from "./_components/Status";
import { Skills } from "./_components/Skills";
import { Contact } from "./_components/Contact";
import { Footrer } from "./_components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Spacing size="md"></Spacing>
      <Hero />
      <Spacing size="md"></Spacing>
      <Status />
      <Spacing size="md"></Spacing>
      <Skills />
      <Spacing size="md"></Spacing>
      <Contact />
      <Spacing size="md"></Spacing>
      <Footrer />
    </main>
  );
}
