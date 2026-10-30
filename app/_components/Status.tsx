import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { SideProject } from "./SideProject";
import { ContactCard } from "./ContactCard";
import { Work } from "./Work";
import {
  SIDE_PROJECTS,
  WORKS,
  EMAIL,
  LINKEDIN,
  CONTACT_PHOTO,
} from "../_data/portfolio";

export const Status = () => {
  return (
    <Section className="flex flex-col gap-6" id="projects">
      <div>
        <Badge variant="outline">Travaux</Badge>
        <h2 className="mt-3 pb-2 text-3xl font-semibold tracking-tight">
          Projets
        </h2>
        <p className="text-sm text-muted-foreground">
          Side projects &amp; projets d&apos;école
        </p>
      </div>

      <div className="flex max-lg:flex-col items-start gap-4">
        {/* Projets */}
        <div className="flex-[3] w-full">
          <Card className="p-4 w-full flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Tous les projets
            </p>
            <div className="flex flex-col gap-1">
              {SIDE_PROJECTS.map((project, index) => (
                <SideProject
                  key={index}
                  Logo={project.Logo}
                  title={project.title}
                  description={project.description}
                  url={project.url}
                  tags={project.tags}
                  featured={project.featured}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* Work + Contact */}
        <div className="flex-[2] w-full flex flex-col gap-4">
          <Card className="p-4 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Formations
            </p>
            <div className="flex flex-col gap-2">
              {WORKS.map((work, index) => (
                <Work key={index} {...work} />
              ))}
            </div>
          </Card>

          <Card className="p-4 flex-1 flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
              Contact rapide
            </p>
            <ContactCard
              name="Louis Olivier"
              image={CONTACT_PHOTO}
              mediumImage={EMAIL.icon}
              descritpon={EMAIL.address}
              url={EMAIL.url}
            />
            <ContactCard
              name="Louis Olivier"
              image={CONTACT_PHOTO}
              mediumImage={LINKEDIN.icon}
              descritpon="Profil LinkedIn"
              url={LINKEDIN.url}
            />
          </Card>
        </div>
      </div>
    </Section>
  );
};
