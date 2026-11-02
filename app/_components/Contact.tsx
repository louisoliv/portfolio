import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { ContactCard } from "./ContactCard";
import { FileText, MapPin } from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";
import {
  EMAIL,
  LINKEDIN,
  GITHUB,
  CV,
  LOCATIONS,
  CONTACT_PHOTO,
} from "../_data/portfolio";

export const Contact = () => {
  return (
    <Section className="flex flex-col items-start gap-4" id="contact">
      <Badge variant="outline">Contact</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight">
        Me contacter
      </h2>
      <p className="text-sm text-muted-foreground -mt-2">
        Un projet, une opportunité ? N&apos;hésite pas.
      </p>
      <p className="text-sm text-muted-foreground -mt-2 flex items-center gap-1.5">
        <MapPin size={14} aria-hidden className="text-primary" />
        {LOCATIONS}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        <ContactCard
          name="Email"
          image={CONTACT_PHOTO}
          mediumImage={EMAIL.icon}
          descritpon={EMAIL.address}
          url={EMAIL.url}
        />
        <ContactCard
          name="LinkedIn"
          image={CONTACT_PHOTO}
          mediumImage={LINKEDIN.icon}
          descritpon="Louis Olivier"
          url={LINKEDIN.url}
        />
        <ContactCard
          name="GitHub"
          image={CONTACT_PHOTO}
          mediumImage=""
          icon={<GithubIcon size={20} aria-hidden className="text-foreground" />}
          descritpon={GITHUB.handle}
          url={GITHUB.url}
        />
        <ContactCard
          name={CV.label}
          image={CONTACT_PHOTO}
          mediumImage=""
          icon={<FileText size={20} aria-hidden className="text-foreground" />}
          descritpon={CV.description}
          url={CV.url}
        />
      </div>
    </Section>
  );
};
