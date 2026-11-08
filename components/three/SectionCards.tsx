import Image from 'next/image'
import { ArrowUpRight, FileText, Mail, MapPin } from 'lucide-react'
import { getPortfolio, EMAIL, LINKEDIN, GITHUB, LOCATIONS } from '@/app/_data/portfolio'
import type { Lang } from '@/app/_data/i18n'
import { GithubIcon } from '@/app/_components/icons/GithubIcon'
import { LinkedInIcon } from '@/app/_components/icons/LinkedIn'
import { cn } from '@/lib/utils'
import { SectionId } from './panels'

// Cards are rendered by drei's <Html> in a separate React root, outside the
// Next.js router: plain <a> instead of next/link. External links and documents (CV)
// open a new tab so the visitor keeps their place in the cockpit.
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const newTab = href.startsWith('http') || href.endsWith('.pdf')
  return (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="border border-hud-line/30 bg-hud-line/5 px-1.5 py-0.5 text-[10px] text-hud-fg/80">{children}</span>
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-hud-accent/80">{children}</p>
}

type CardContentProps = { lang: Lang }

function ExperienceCard({ lang }: CardContentProps) {
  const { EXPERIENCES } = getPortfolio(lang)
  return (
    <ol className="space-y-4">
      {EXPERIENCES.map((exp) => (
        <li key={exp.title} className="border-l-2 border-hud-line/50 pl-3">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold text-hud-title">{exp.title}</h3>
            <span className="shrink-0 text-[10px] text-hud-muted/80">{exp.date}</span>
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-2">
            {exp.companyUrl && exp.companyUrl !== '#' ? (
              <ExternalLink href={exp.companyUrl} className="text-xs text-hud-accent hover:text-hud-title hover:underline">
                {exp.company}
              </ExternalLink>
            ) : (
              <p className="text-xs text-hud-accent">{exp.company}</p>
            )}
            <Tag>{exp.badge}</Tag>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-hud-fg/70">{exp.description}</p>
        </li>
      ))}
    </ol>
  )
}

// Projects without a public repository are a plain block instead of a link
function ProjectLink({ href, className, children }: { href?: string; className?: string; children: React.ReactNode }) {
  return href ? (
    <ExternalLink href={href} className={className}>
      {children}
    </ExternalLink>
  ) : (
    <div className={className}>{children}</div>
  )
}

function ProjectsCard({ lang }: CardContentProps) {
  const { t, SIDE_PROJECTS, WORKS } = getPortfolio(lang)
  return (
    <div>
      <SubTitle>{t.classic.allProjects}</SubTitle>
      <ul className="space-y-2">
        {SIDE_PROJECTS.map((project) => (
          <li key={project.title}>
            <ProjectLink
              href={project.url}
              className={cn(
                'group flex gap-3 border p-2 transition-colors',
                project.url && 'hover:border-hud-line/60 hover:bg-hud-line/10',
                project.featured ? 'border-hud-muted/40 bg-hud-muted/5' : 'border-transparent',
              )}
            >
              <project.Logo size={14} className="mt-0.5 shrink-0 text-hud-accent" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-hud-title">{project.title}</h3>
                  {project.featured && <Tag>{project.featuredBadge}</Tag>}
                  {project.privateNote && <Tag>{project.privateNote}</Tag>}
                  {project.url && (
                    <ArrowUpRight size={12} className="ml-auto shrink-0 text-hud-line/60 group-hover:text-hud-accent" />
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-hud-fg/70">{project.description}</p>
                {project.tags && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </ProjectLink>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <SubTitle>{t.classic.trainings}</SubTitle>
        <ul className="space-y-1">
          {WORKS.map((work) => (
            <li key={work.title}>
              <ExternalLink
                href={work.url}
                className="flex items-center gap-3 border border-transparent p-2 transition-colors hover:border-hud-line/60 hover:bg-hud-line/10"
              >
                <Image src={work.image} alt={work.title} width={28} height={28} className="size-7 object-contain" />
                <div>
                  <h3 className="text-sm font-semibold text-hud-title">{work.title}</h3>
                  <p className="text-[10px] text-hud-fg/60">{work.role}</p>
                </div>
                <span className="ml-auto text-[10px] text-hud-muted/80">{work.date}</span>
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SkillsCard({ lang }: CardContentProps) {
  const { SKILL_GROUPS } = getPortfolio(lang)
  return (
    <div className="space-y-4">
      {SKILL_GROUPS.map((group) => (
        <section key={group.category}>
          <SubTitle>{group.category}</SubTitle>
          <ul className="flex flex-wrap gap-1.5">
            {group.skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center gap-2 border border-hud-line/30 bg-hud-line/5 px-2 py-1 text-xs text-hud-fg"
              >
                <span className="flex size-5 items-center justify-center [&_svg]:size-4">{skill.icon}</span>
                {skill.name}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function ContactCard({ lang }: CardContentProps) {
  const { t, CV } = getPortfolio(lang)
  const contacts = [
    { label: 'Email', value: EMAIL.address, url: EMAIL.url, icon: <Mail size={18} aria-hidden className="text-black" /> },
    { label: 'LinkedIn', value: 'Louis Olivier', url: LINKEDIN.url, icon: <LinkedInIcon size={18} aria-hidden className="text-black" /> },
    { label: 'GitHub', value: GITHUB.handle, url: GITHUB.url, icon: <GithubIcon size={18} aria-hidden className="text-black" /> },
    { label: CV.label, value: CV.description, url: CV.url, icon: <FileText size={18} aria-hidden className="text-black" /> },
  ]
  return (
    <div>
      <p className="text-xs text-hud-fg/70">{t.contact.pitch}</p>
      <p className="mb-3 mt-1 flex items-center gap-1.5 text-xs text-hud-muted">
        <MapPin size={12} aria-hidden className="text-hud-accent" />
        {LOCATIONS}
      </p>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <ExternalLink
              href={contact.url}
              className="group flex items-center gap-3 border border-hud-line/30 bg-hud-line/5 p-2 transition-colors hover:border-hud-line/70 hover:bg-hud-line/10"
            >
              <span className="flex size-8 shrink-0 items-center justify-center bg-hud-fg/90">{contact.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-hud-title">{contact.label}</p>
                <p className="truncate text-xs text-hud-fg/70">{contact.value}</p>
              </div>
              <ArrowUpRight size={14} className="ml-auto shrink-0 text-hud-line/60 group-hover:text-hud-accent" />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const SECTION_CARDS: Record<SectionId, { code: string; Content: (props: CardContentProps) => JSX.Element }> = {
  experience: { code: 'SEC-01', Content: ExperienceCard },
  projects: { code: 'SEC-02', Content: ProjectsCard },
  skills: { code: 'SEC-03', Content: SkillsCard },
  contact: { code: 'SEC-04', Content: ContactCard },
}
