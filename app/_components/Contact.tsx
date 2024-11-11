import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { HtmlIcon } from "./icons/HtmlLogo";
import { Code } from "./Code";
import { JavascriptIcon } from "./icons/Javascript.Logo";
import { GoLangIcon } from "./icons/GoLogo";
import { CssIcon } from "./icons/CssLogo";
import { ContactCard } from "./ContactCard";

export const Contact = () => {
  return (
    <Section className="flex flex-col items-start gap-4">
      <Badge variant={"outline"}>Contact me</Badge>
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Here are the different way to contact me.
      </h2>
      <div className="flex max-md:flex-col w-full gap-4 mb-4">
        <ContactCard
          name="Louis Olivier"
          // image="../Fond-blanc2.jpg"
          image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
          mediumImage="https://banner2.cleanpng.com/20240403/ras/transparent-gmail-icon-google-mail-logo-with-vibrant-colors-and-m660d4ec2bd9db0.46699070.webp"
          descritpon="My email : louisolivier7602@gmail.com"
          url="mailto:louisolivier7602@gmail.com"
        ></ContactCard>
        <ContactCard
          name="Louis Olivier"
          image="/_next/static/media/Fond-blanc2.1203aefd.jpg"
          mediumImage="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
          descritpon="My linkedIn profile"
          url="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BJhkPPMP9T9maiVk6RlhmwQ%3D%3D"
        ></ContactCard>
      </div>
    </Section>
  );
};
