import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { EXPERIENCES, SIDE_PROJECTS, WORKS, SKILL_GROUPS, EMAIL, LINKEDIN } from '@/app/_data/portfolio'
import { cn } from '@/lib/utils'
import { SectionId } from './panels'

// Cards are rendered by drei's <Html> in a separate React root, outside the
// Next.js router: plain <a> instead of next/link. External links open a new tab
// so the visitor keeps their place in the cockpit.
export function ExternalLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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

// Long lists scroll inside the card instead of growing it
const SCROLL_AREA =
  'max-h-[380px] overflow-y-auto pr-2 [scrollbar-color:rgb(var(--hud-line)/0.5)_transparent] [scrollbar-width:thin]'

function ExperienceCard() {
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

function ProjectsCard() {
  return (
    <div className={SCROLL_AREA}>
      <SubTitle>Tous les projets</SubTitle>
      <ul className="space-y-2">
        {SIDE_PROJECTS.map((project) => (
          <li key={project.title}>
            <ExternalLink
              href={project.url}
              className={cn(
                'group flex gap-3 border p-2 transition-colors hover:border-hud-line/60 hover:bg-hud-line/10',
                project.featured ? 'border-hud-muted/40 bg-hud-muted/5' : 'border-transparent',
              )}
            >
              <project.Logo size={14} className="mt-0.5 shrink-0 text-hud-accent" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-hud-title">{project.title}</h3>
                  {project.featured && <Tag>Alternance</Tag>}
                  <ArrowUpRight size={12} className="ml-auto shrink-0 text-hud-line/60 group-hover:text-hud-accent" />
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
            </ExternalLink>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <SubTitle>Formations</SubTitle>
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

function SkillsCard() {
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

function ContactCard() {
  const contacts = [
    { label: 'Email', value: EMAIL.address, url: EMAIL.url, icon: EMAIL.icon },
    { label: 'LinkedIn', value: 'Louis Olivier', url: LINKEDIN.url, icon: LINKEDIN.icon },
  ]
  return (
    <div>
      <p className="mb-3 text-xs text-hud-fg/70">Un projet, une opportunité ? N&apos;hésite pas.</p>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <ExternalLink
              href={contact.url}
              className="group flex items-center gap-3 border border-hud-line/30 bg-hud-line/5 p-2 transition-colors hover:border-hud-line/70 hover:bg-hud-line/10"
            >
              <span className="flex size-8 shrink-0 items-center justify-center bg-hud-fg/90">
                <Image src={contact.icon} alt={contact.label} width={20} height={20} className="object-contain" />
              </span>
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

export const SECTION_CARDS: Record<SectionId, { code: string; Content: () => JSX.Element }> = {
  experience: { code: 'SEC-01', Content: ExperienceCard },
  projects: { code: 'SEC-02', Content: ProjectsCard },
  skills: { code: 'SEC-03', Content: SkillsCard },
  contact: { code: 'SEC-04', Content: ContactCard },
}
