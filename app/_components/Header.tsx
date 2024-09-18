import { Button, buttonVariants } from "@/components/ui/button";
import { Section } from "./Section";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedIn";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Header = () => {
  return (
    <header className="sticky top-0 py-4">
      <Section className="flex items-baseline">
        <h1 className="text-lg font-bold text-primary-foreground">
          louisOl.com
        </h1>
        <div className="flex-1" />
        <ul className="flex items-center gap-2">
          <Link
            href="https://github.com/louisoliv/" //METTRE LE BON Github !!!!!!!!!!
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-6 p-0 "
            )}
          >
            <GithubIcon size={20} className="text-foreground" />
          </Link>
          <Link
            href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BJhkPPMP9T9maiVk6RlhmwQ%3D%3D" //METTRE le lien LinkedIn !!!!!!!!!!
            className={cn(
              buttonVariants({ variant: "outline" }),
              "size-6 p-0 "
            )}
          >
            <LinkedInIcon size={20} className="text-foreground" />
          </Link>
        </ul>
      </Section>
    </header>
  );
};
