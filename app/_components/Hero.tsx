import { Section } from "./Section";
import imageLouis from "../Fond-blanc2.jpg";
import { GithubIcon } from "./icons/GithubIcon";
import { Code } from "./Code";
import { ComponentInstanceIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const Hero = () => {
  return (
    <Section className="flex max-lg:flex-col items-start gap-4">
      <div className="flex-[3] w-full flex flex-col gap-2">
        <h2 className="font-caption font-bold text-5xl text-primary">
          Louis OLIVIER
        </h2>
        <h3 className="text-3xl font-caption">Aspring full stack developer </h3>
        <p className="text-base">
          Coding and posting on
          <Link href="https://github.com/louisoliv">
            <Code className="inline-flex items-center gap-1">
              <GithubIcon size={16} className="inline" />
              Github
            </Code>
          </Link>
          , currently working / studying at{" "}
          <Link href="https://zone01rouennormandie.org/">
            <Code className="inline-flex items-center gap-1">
              <img
                src="https://zone01rouennormandie.org/wp-content/uploads/2024/02/ZONE01-ROUEN-NORMANDIE-HORIZON-FOND-NOIR-BONNE-TAILLE.png"
                style={{ width: 20, height: "auto" }}
                alt="Zone01 image"
              />
              Zone01
            </Code>{" "}
            Rouen, Normandy.
          </Link>
        </p>
      </div>
      <div className="flex-[2] max-md:m-auto ml-auto">
        <img
          src={imageLouis.src}
          className="w-full h-auto max-w-xs max-md:w-56 rounded"
          alt="louis's picture"
        />
      </div>
    </Section>
  );
};
