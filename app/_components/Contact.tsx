import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { ContactCard } from "./ContactCard";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
        <ContactCard
          name="Email"
          image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
          mediumImage="https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp"
          descritpon="louisolivier7603@gmail.com"
          url="mailto:louisolivier7603@gmail.com"
        />
        <ContactCard
          name="LinkedIn"
          image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
          mediumImage="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          descritpon="Louis Olivier"
          url="https://www.linkedin.com/in/louis-olivier"
        />
      </div>
    </Section>
  );
};
