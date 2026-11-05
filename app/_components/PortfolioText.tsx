import {
  getPortfolio,
  TECH_TAGS,
  EMAIL,
  LINKEDIN,
  GITHUB,
  LOCATIONS,
} from "../_data/portfolio";
import type { Lang } from "../_data/i18n";

// Invisible on screen, so kept out of the Tab order: sighted keyboard users would land on
// links they cannot see. Screen readers still read and follow them.
const TextLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} tabIndex={-1}>
    {children}
  </a>
);

// Server-rendered text version of the portfolio for the cockpit page.
// The 3D scene only exists in the browser: this keeps the content in the HTML
// for search engines and screen readers, hidden on screen (sr-only).
// Its language is fixed at render time: when the visitor switches language in the
// cockpit, the scene hides it (see Scene) rather than leaving a stale version to read.
export const PortfolioText = ({ lang }: { lang: Lang }) => {
  const { t, HERO, STATS, EXPERIENCES, SIDE_PROJECTS, WORKS, SKILL_GROUPS, CV } = getPortfolio(lang);
  return (
    <div id="portfolio-text" lang={lang} className="sr-only">
      <header>
        <p>{HERO.availability}</p>
        <h1>{`${HERO.firstName} ${HERO.lastName}`}</h1>
        <p>{HERO.role}</p>
        <p>
          {HERO.intro.beforeSchool}{" "}
          <TextLink href={HERO.intro.school.url}>{HERO.intro.school.label}</TextLink>{" "}
          {HERO.intro.afterSchool}{" "}
          <TextLink href={HERO.intro.github.url}>{HERO.intro.github.label}</TextLink>
          {HERO.intro.end}
        </p>
        <ul>
          {TECH_TAGS.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <dl>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="text-experience">
        <h2 id="text-experience">{t.classic.experienceTitle}</h2>
        <ul>
          {EXPERIENCES.map((exp) => (
            <li key={exp.title}>
              <h3>{exp.title}</h3>
              <p>
                {exp.company} · {exp.date} · {exp.badge}
              </p>
              <p>{exp.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="text-projects">
        <h2 id="text-projects">{t.classic.projectsTitle}</h2>
        <ul>
          {SIDE_PROJECTS.map((project) => (
            <li key={project.title}>
              <h3>
                <TextLink href={project.url}>{project.title}</TextLink>
              </h3>
              <p>{project.description}</p>
              {project.tags && <p>{project.tags.join(", ")}</p>}
            </li>
          ))}
        </ul>
        <h3>{t.classic.trainings}</h3>
        <ul>
          {WORKS.map((work) => (
            <li key={work.title}>
              <TextLink href={work.url}>{work.title}</TextLink> · {work.role} · {work.date}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="text-skills">
        <h2 id="text-skills">{t.cockpit.sections.skills}</h2>
        {SKILL_GROUPS.map((group) => (
          <div key={group.category}>
            <h3>{group.category}</h3>
            <ul>
              {group.skills.map((skill) => (
                <li key={skill.name}>{skill.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section aria-labelledby="text-contact">
        <h2 id="text-contact">{t.classic.contactBadge}</h2>
        <p>{LOCATIONS}</p>
        <ul>
          <li>
            <TextLink href={EMAIL.url}>{EMAIL.address}</TextLink>
          </li>
          <li>
            <TextLink href={LINKEDIN.url}>LinkedIn</TextLink>
          </li>
          <li>
            <TextLink href={GITHUB.url}>GitHub</TextLink>
          </li>
          <li>
            <TextLink href={CV.url}>{CV.description}</TextLink>
          </li>
        </ul>
      </section>
    </div>
  );
};
