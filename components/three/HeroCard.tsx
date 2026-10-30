'use client'

import Image from 'next/image'
import { Html } from '@react-three/drei'
import { HERO, TECH_TAGS, STATS } from '@/app/_data/portfolio'
import { GithubIcon } from '@/app/_components/icons/GithubIcon'
import { ImperialCard, CardTheme } from './ImperialCard'
import { ExternalLink, Tag } from './SectionCards'
import { SectionId } from './panels'
import { STOP_SCENE_CLICKS } from './PanelCard'

// Card size: drei's <Html transform> maps 1px to distanceFactor / 400 world units
const CARD_WIDTH_PX = 640
const CARD_WIDTH_WORLD = 0.95
const DISTANCE_FACTOR = (CARD_WIDTH_WORLD * 400) / CARD_WIDTH_PX

// Inside the front window, above the targeting computer (its top sits near the window center).
// Kept vertical, parallel to the window, facing the pilot (-z).
const CARD_POSITION: [number, number, number] = [0, 0.28, 0.85]
const CARD_ROTATION: [number, number, number] = [0, Math.PI, 0]

const INLINE_LINK =
  'inline-flex items-center gap-1 border border-hud-line/40 bg-hud-line/10 px-1 text-hud-title hover:border-hud-line/80'

// Same neutral look for both actions, highlighted only on hover or keyboard focus
const BUTTON =
  'border border-hud-line/40 px-3 py-1.5 text-xs uppercase tracking-widest text-hud-fg outline-none transition-colors hover:border-hud-line hover:bg-hud-line/20 hover:text-hud-title focus-visible:border-hud-line focus-visible:bg-hud-line/20 focus-visible:text-hud-title'

type HeroCardProps = {
  visible: boolean
  theme: CardTheme
  onNavigate: (id: SectionId) => void
}

export function HeroCard({ visible, theme, onNavigate }: HeroCardProps) {
  if (!visible) return null

  return (
    <group position={CARD_POSITION} rotation={CARD_ROTATION}>
      <Html transform distanceFactor={DISTANCE_FACTOR}>
        <div
          {...STOP_SCENE_CLICKS}
          style={{ width: CARD_WIDTH_PX }}
          className="duration-500 animate-in fade-in zoom-in-95 fill-mode-backwards delay-300 motion-reduce:animate-none"
        >
          <ImperialCard code="SEC-00" title="Profil pilote" theme={theme} showHeading={false}>
            <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-hud-muted">
              <span aria-hidden className="size-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              {HERO.availability}
            </p>

            <h1 className="mt-2 text-3xl font-semibold uppercase tracking-widest text-hud-title">
              {`${HERO.firstName} `}
              <span className="text-hud-accent">{HERO.lastName}</span>
            </h1>
            <p className="mt-1 text-sm uppercase tracking-[0.2em] text-hud-muted">{HERO.role}</p>

            <p className="mt-3 text-xs leading-relaxed text-hud-fg/80">
              {HERO.intro.beforeSchool}{' '}
              <ExternalLink href={HERO.intro.school.url} className={INLINE_LINK}>
                <Image src={HERO.intro.school.logo} width={12} height={12} alt="" className="rounded-sm" />
                {HERO.intro.school.label}
              </ExternalLink>{' '}
              {HERO.intro.afterSchool}{' '}
              <ExternalLink href={HERO.intro.github.url} className={INLINE_LINK}>
                <GithubIcon size={11} aria-hidden />
                {HERO.intro.github.label}
              </ExternalLink>
              {HERO.intro.end}
            </p>

            <div className="mt-4 flex items-start justify-between gap-4">
              <ul className="flex flex-wrap gap-1">
                {TECH_TAGS.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
              <dl className="flex shrink-0 gap-2">
                {STATS.map((stat) => (
                  // dt before dd for screen readers, value displayed on top
                  <div
                    key={stat.label}
                    className="flex h-14 w-20 flex-col-reverse items-center justify-center border border-hud-line/30"
                  >
                    <dt className="whitespace-nowrap text-[9px] uppercase tracking-wider text-hud-muted">{stat.label}</dt>
                    <dd className="text-base font-semibold text-hud-title">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => onNavigate('projects')} className={BUTTON}>
                Voir mes projets
              </button>
              <button type="button" onClick={() => onNavigate('contact')} className={BUTTON}>
                Me contacter
              </button>
            </div>
          </ImperialCard>
        </div>
      </Html>
    </group>
  )
}
