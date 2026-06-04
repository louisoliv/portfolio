import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";
import { Code } from "./Code";
import Link from "next/link";
import Image from "next/image";
import imageLouis from "../Fond-blanc2.jpg";

const TECH_TAGS = [
  "React · Next.js",
  "TypeScript",
  "Golang",
  "Python",
  "Docker",
  "SQL",
];

const STATS = [
  { value: "50+", label: "Projets" },
  { value: "2,5", label: "Ans de code" },
  { value: "10+", label: "Techs" },
];

export const Hero = () => {
  return (
    <Section className="flex max-lg:flex-col items-center gap-12 py-8">
      {/* Left texte */}
      <div className="flex-[3] w-full flex flex-col gap-3">
        {/* Badge dispo */}
        <div className="flex items-center gap-2 mb-1 w-fit px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="text-xs text-emerald-500 font-semibold tracking-wide uppercase">
            Disponible · Alternance
          </span>
        </div>

        {/* Nom */}
        <h2 className="font-caption font-extrabold text-5xl lg:text-6xl leading-tight">
          <span className="text-foreground">Louis </span>
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            OLIVIER
          </span>
        </h2>

        <h3 className="text-2xl font-caption text-muted-foreground font-medium">
          Full Stack Developer
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mt-1">
          Développeur full stack passionné par la création d&apos;interfaces
          modernes et d&apos;APIs robustes. En formation à{" "}
          <Link href="https://zone01rouennormandie.org/">
            <Code className="inline-flex items-center gap-1">
              <Image
                src="https://zone01rouennormandie.org/wp-content/uploads/2024/02/ZONE01-ROUEN-NORMANDIE-HORIZON-FOND-NOIR-BONNE-TAILLE.png"
                width={16}
                height={16}
                alt="Zone01"
                className="rounded-sm"
              />
              Zone01
            </Code>
          </Link>{" "}
          Rouen et en alternance, je construis des projets concrets du frontend
          au backend - et je publie sur{" "}
          <Link href="https://github.com/louisoliv">
            <Code className="inline-flex items-center gap-1">
              <GithubIcon size={13} className="inline" />
              GitHub
            </Code>
          </Link>
          .
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {TECH_TAGS.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium px-2.5 py-1 rounded-md border border-border text-muted-foreground bg-muted/30 hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3 mt-2">
          <Link
            href="#projects"
            className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Voir mes projets
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
          >
            Me contacter
          </Link>
        </div>
      </div>

      {/* Right: photo + stats */}
      <div className="flex-[2] flex flex-col items-center gap-6 max-md:w-full">
        <Image
          src={imageLouis}
          width={400}
          height={400}
          className="w-full h-auto max-w-[260px] max-md:w-48 rounded-2xl object-cover ring-1 ring-border"
          alt="Photo de Louis"
        />

        {/* Mini stat cards */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center p-3 rounded-xl border border-border bg-card text-center"
            >
              <span className="text-xl font-extrabold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground mt-0.5 leading-tight">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
