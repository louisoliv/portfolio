import { Card } from "@/components/ui/card";
import { Section } from "./Section";
import Link from "next/link";
import imageLouis from "../Fond-blanc2.jpg";

import {
  ArrowUpRight,
  ChartLine,
  Home,
  ImageUp,
  Joystick,
  LucideIcon,
  StickyNote,
} from "lucide-react";
import { SideProject, SideProjectProps } from "./SideProject";
import { ContactCard } from "./ContactCard";
import { Work, WorkProps } from "./Work";

export const Status = () => {
  return (
    <Section className="flex max-lg:flex-col items-start gap-4 ">
      <div className="flex-[3] w-full">
        <Card className="p-4 w-full flex flex-col gap-2 ">
          <p className="text-lg text-muted-foreground">Side Project</p>
          <div className="flex flex-col gap-4">
            {SIDE_PROJECTS.map((project, index) => (
              <SideProject
                key={index}
                Logo={project.Logo}
                title={project.title}
                description={project.description}
                url={project.url}
              />
            ))}
          </div>
        </Card>
      </div>
      <div className="flex-[2] w-full flex flex-col gap-4">
        <Card className="p-4 flex-1">
          <p className="text-lg text-muted-foreground">Work</p>
          <div className="flex flex-col gap-4">
            {WORKS.map((work, index) => (
              <Work key={index} {...work} />
            ))}
          </div>
        </Card>
        <Card className="p-4 flex-1 flex flex-col gap-2">
          <p className="text-lg text-muted-foreground">Contact me</p>
          <ContactCard
            name="Louis Olivier"
            // image="../Fond-blanc2.jpg"
            image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
            mediumImage="https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp"
            descritpon="My email : louisolivier7602@gmail.com"
            url="louisolivier7602@gmail.com"
          ></ContactCard>
          <ContactCard
            name="Louis Olivier"
            image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
            mediumImage="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
            descritpon="My linkedIn profile"
            url="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BJhkPPMP9T9maiVk6RlhmwQ%3D%3D"
          ></ContactCard>
        </Card>
      </div>
    </Section>
  );
};

const SIDE_PROJECTS: SideProjectProps[] = [
  {
    Logo: ImageUp,
    title: "Forum Image Upload",
    description:
      "Create an entire forum / blog with the posts, comments, likes systems.",
    url: "https://github.com/louisoliv/Forum-Image-Upload",
  },
  {
    Logo: Joystick,
    title: "Make Your Game History",
    description: "An entire Space Invaders game in Javascript, Html and Css.",
    url: "https://github.com/louisoliv/Make-Your-Game-History",
  },
  {
    Logo: ChartLine,
    title: "GraphQL",
    description:
      "Re-create our school website using multiple fetches and GraphQL requests.",
    url: "https://github.com/louisoliv/louisoliv.github.io",
  },
];

const WORKS: WorkProps[] = [
  {
    image:
      "data:image/png;base64,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",
    title: "Hangan game",
    role: "Training",
    date: "2024",
    url: "https://github.com/louisoliv/A-hanged-man",
  },
];
