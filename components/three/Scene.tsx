'use client'

import { Fragment, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX } from 'lucide-react'
import { Canvas, ComputeFunction } from '@react-three/fiber'
import { PerformanceMonitor, useProgress } from '@react-three/drei'
import { Cockpit, pickModelUrl } from './Cockpit'
import { CameraRig } from './CameraRig'
import { HeroCard, HeroCardContent } from './HeroCard'
import { DevToolbar } from './DevToolbar'
import { PanelCard } from './PanelCard'
import { ImperialCard, CardTheme } from './ImperialCard'
import { SECTION_CARDS } from './SectionCards'
import { PanelLabel } from './PanelLabel'
import { BootTexts, LoadingScreen } from './LoadingScreen'
import { Starfield } from './Starfield'
import { CockpitLights } from './CockpitLights'
import { playSound, readStoredSoundMuted, setSoundMuted } from './sounds'
import { MobileSheet } from './MobileSheet'
import { MobileNav } from './MobileNav'
import { useCompactLayout } from './useCompactLayout'
import { OVERVIEW_VIEW, PANELS, SectionId, ViewId } from './panels'
import { getPortfolio } from '@/app/_data/portfolio'
import { classicPath, cockpitPath, LANGS, type Lang } from '@/app/_data/i18n'

const isDev = process.env.NODE_ENV === 'development'

// Same length as the alert sound (public/sounds/alert.mp3)
const ALERT_DURATION_MS = 6000

// Rendering resolution: device pixel ratio capped at 2, dropped to 1 when the scene struggles
const MAX_DPR = 2
const LOW_DPR = 1
// Average frame rate below 25 fps counts as struggling (upper bound: back to fine)
const PERF_BOUNDS = (): [number, number] => [25, 55]

// R3F computes the pointer from offsetX/Y, which are relative to the hovered element:
// over an <Html> card they point to the wrong place in the scene. Use the canvas rect instead.
const computePointer: ComputeFunction = (event, state) => {
  const rect = state.gl.domElement.getBoundingClientRect()
  state.pointer.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  )
  state.raycaster.setFromCamera(state.pointer, state.camera)
}

type SceneProps = {
  initialLang: Lang
  boot: BootTexts
}

export default function Scene({ initialLang, boot }: SceneProps) {
  // Switching language keeps the scene mounted: the URL, <html lang> and page title follow
  // without any navigation, and the matching page exists on the server for direct visits
  const [lang, setLang] = useState(initialLang)
  const { t } = getPortfolio(lang)
  const switchLanguage = (next: Lang) => {
    if (next === lang) return
    setLang(next)
    window.history.replaceState(null, '', cockpitPath(next))
    document.documentElement.lang = next
    document.title = getPortfolio(next).t.meta.title
    // The server-rendered text version only exists in the language the page was loaded in
    const textVersion = document.getElementById('portfolio-text')
    if (textVersion) textVersion.hidden = textVersion.lang !== next
  }

  const [view, setView] = useState<ViewId>('overview')
  // Every camera move goes through here, so that each one has its sound
  const goTo = useCallback(
    (id: ViewId) => {
      if (id === view) return
      playSound(id === 'overview' ? 'overview' : 'sectionOpen')
      setView(id)
    },
    [view],
  )
  const [freeMode, setFreeMode] = useState(false)
  // Red alert: triggered by the console's left button, ends by itself
  const [alertActive, setAlertActive] = useState(false)
  // The info cards turn red with the cockpit during the alert
  const cardTheme: CardTheme = alertActive ? 'alert' : 'normal'
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onAlertClick = () => {
    if (alertTimer.current) return
    playSound('alert')
    setAlertActive(true)
    alertTimer.current = setTimeout(() => {
      setAlertActive(false)
      alertTimer.current = null
    }, ALERT_DURATION_MS)
  }
  useEffect(
    () => () => {
      if (alertTimer.current) clearTimeout(alertTimer.current)
    },
    [],
  )

  const [muted, setMuted] = useState(false)
  useEffect(() => setMuted(readStoredSoundMuted()), [])
  const toggleMuted = () => {
    setSoundMuted(!muted)
    setMuted(!muted)
  }
  const [heroVisible, setHeroVisible] = useState(true)
  const [hoveredPanel, setHoveredPanel] = useState<SectionId | null>(null)
  // Phones and small windows: cards in a bottom sheet, section bar instead of reachable panels
  const compact = useCompactLayout()
  const [modelUrl] = useState(pickModelUrl)
  const { progress, active } = useProgress()
  // drei's <Html> elements sit above every other DOM layer (huge z-index), including the
  // boot screen: only mount them once the boot sequence is over
  const [booted, setBooted] = useState(false)
  const onBootFinished = useCallback(() => setBooted(true), [])

  // Measured smoothness: the first drop below PERF_BOUNDS lowers the resolution,
  // the second one offers the classic page (never forced: it may be a passing slowdown)
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, MAX_DPR))
  const [perfDeclines, setPerfDeclines] = useState(0)
  const [slowBannerDismissed, setSlowBannerDismissed] = useState(false)
  const onPerfDecline = useCallback(() => setPerfDeclines((count) => count + 1), [])
  useEffect(() => {
    if (perfDeclines === 1) setDpr(LOW_DPR)
  }, [perfDeclines])
  const showSlowBanner = perfDeclines >= 2 && !slowBannerDismissed

  // Stable: InteractivePanel reports through an effect that depends on it
  const onPanelHover = useCallback((id: SectionId, hovered: boolean) => {
    setHoveredPanel((current) => (hovered ? id : current === id ? null : current))
  }, [])

  // The targeting computer toggles the overview card; from a panel view it brings the card back
  const onConsoleClick = () => {
    if (view === 'overview') {
      playSound(heroVisible ? 'heroHide' : 'heroShow')
      setHeroVisible(!heroVisible)
    } else {
      goTo('overview')
      setHeroVisible(true)
    }
  }

  // Panel currently zoomed in, if any (its card goes in the bottom sheet in compact layout)
  const openPanel = PANELS.find((panel) => panel.id === view)
  const OpenContent = openPanel && SECTION_CARDS[openPanel.id].Content

  // Section bar: "Profil" goes back to the overview with the profile card open
  const onNavSelect = (id: ViewId) => {
    if (id === 'overview' && view === 'overview' && !heroVisible) playSound('heroShow')
    goTo(id)
    if (id === 'overview') setHeroVisible(true)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') goTo('overview')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo])

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        dpr={dpr}
        camera={{ position: OVERVIEW_VIEW.position, fov: 70, near: 0.01, far: 100 }}
        onCreated={({ gl, setEvents }) => {
          setEvents({ compute: computePointer })
          // Decorative for assistive tech: the content is in the page's text version
          gl.domElement.setAttribute('aria-hidden', 'true')
        }}
      >
        <color attach="background" args={['#000000']} />
        <CockpitLights alert={alertActive} />
        <Starfield compact={compact} />
        {/* Measured only after boot: loading the model is expected to be slow */}
        {booted && <PerformanceMonitor bounds={PERF_BOUNDS} onDecline={onPerfDecline} />}
        {/* Loading is shown by the LoadingScreen overlay below */}
        <Suspense fallback={null}>
          <Cockpit
            modelUrl={modelUrl}
            openPanel={openPanel?.id}
            onPanelSelect={goTo}
            onPanelHover={onPanelHover}
            onConsoleClick={onConsoleClick}
            onAlertClick={onAlertClick}
            alertActive={alertActive}
          />
          <HeroCard visible={booted && !compact && view === 'overview' && heroVisible} lang={lang} theme={cardTheme} onNavigate={goTo} />
          {booted && PANELS.map((panel) => {
            const { code, Content } = SECTION_CARDS[panel.id]
            return (
              <Fragment key={panel.id}>
                {/* The open panel's card already shows its name */}
                {view !== panel.id && (
                  <PanelLabel panel={panel} code={code} label={t.cockpit.sections[panel.id]} highlighted={hoveredPanel === panel.id} />
                )}
                <PanelCard panel={panel} visible={!compact && view === panel.id}>
                  <ImperialCard code={code} title={t.cockpit.sections[panel.id]} lang={lang} theme={cardTheme}>
                    <Content lang={lang} />
                  </ImperialCard>
                </PanelCard>
              </Fragment>
            )
          })}
        </Suspense>
        <CameraRig view={view} compact={compact} freeMode={isDev && freeMode} />
      </Canvas>
      {!compact && view !== 'overview' && (
        <button
          type="button"
          onClick={() => goTo('overview')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded border border-red-500/60 bg-black/70 px-4 py-2 font-mono text-sm text-red-400 hover:border-red-400 hover:text-red-300"
        >
          {t.cockpit.backToOverview}
        </button>
      )}
      {compact && booted && view === 'overview' && heroVisible && (
        <MobileSheet
          label={t.cockpit.profileCardTitle}
          closeLabel={t.cockpit.close}
          onClose={() => {
            playSound('heroHide')
            setHeroVisible(false)
          }}
        >
          <HeroCardContent lang={lang} theme={cardTheme} onNavigate={goTo} />
        </MobileSheet>
      )}
      {compact && booted && openPanel && OpenContent && (
        <MobileSheet label={t.cockpit.sections[openPanel.id]} closeLabel={t.cockpit.close} onClose={() => goTo('overview')}>
          <ImperialCard code={SECTION_CARDS[openPanel.id].code} title={t.cockpit.sections[openPanel.id]} lang={lang} theme={cardTheme}>
            <OpenContent lang={lang} />
          </ImperialCard>
        </MobileSheet>
      )}
      {compact && booted && (
        <MobileNav
          view={view}
          labels={{ overview: t.cockpit.profile, ...t.cockpit.sections }}
          navLabel={t.cockpit.sectionsNav}
          onSelect={onNavSelect}
        />
      )}
      {showSlowBanner && (
        <div
          role="status"
          className="absolute left-1/2 top-16 flex w-[min(36rem,calc(100%-2rem))] -translate-x-1/2 flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded border border-red-500/60 bg-black/85 px-4 py-3 text-center font-mono text-xs text-zinc-200"
        >
          <span>{t.cockpit.slowDevice}</span>
          <span className="flex gap-2">
            <Link
              href={classicPath(lang)}
              className="rounded border border-red-500/70 px-3 py-1 uppercase tracking-widest text-red-300 hover:bg-red-500/20"
            >
              {t.cockpit.classicVersion}
            </Link>
            <button
              type="button"
              onClick={() => setSlowBannerDismissed(true)}
              className="rounded border border-zinc-600 px-3 py-1 uppercase tracking-widest text-zinc-300 hover:border-zinc-400"
            >
              {t.cockpit.stayHere}
            </button>
          </span>
        </div>
      )}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        {/* Text version for hurried visitors, keyboard and screen reader users */}
        <Link
          href={classicPath(lang)}
          className="rounded border border-zinc-600/60 bg-black/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-red-500/60 hover:text-red-300 focus-visible:border-red-500 focus-visible:outline-none"
        >
          {t.cockpit.classicVersion}
        </Link>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? t.cockpit.muteOn : t.cockpit.muteOff}
          aria-pressed={muted}
          className="rounded border border-zinc-600/60 bg-black/60 p-1.5 text-zinc-300 hover:border-red-500/60 hover:text-red-300 focus-visible:border-red-500 focus-visible:outline-none"
        >
          {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
        </button>
        {/* Real links: the other language's page also exists at this address */}
        <div
          role="group"
          aria-label={t.cockpit.switchLanguage}
          className="flex rounded border border-zinc-600/60 bg-black/60 font-mono text-xs uppercase"
        >
          {LANGS.map((code) => (
            <a
              key={code}
              href={cockpitPath(code)}
              hrefLang={code}
              lang={code}
              aria-current={code === lang ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                switchLanguage(code)
              }}
              className={`px-2 py-1.5 ${code === lang ? 'bg-red-500/20 text-red-300' : 'text-zinc-400 hover:text-red-300'}`}
            >
              {code}
            </a>
          ))}
        </div>
      </div>
      <LoadingScreen progress={progress} texts={boot} done={!active && progress === 100} onFinished={onBootFinished} />
      {/* Required by the model's CC BY 4.0 licence */}
      <p
        className={`absolute right-3 font-mono text-[10px] text-zinc-500 ${compact ? 'bottom-16 left-3 text-right' : 'bottom-2'}`}
      >
        « Tie Fighter Cockpit Version 2 » by MichaelEGA, licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-300"
        >
          CC BY 4.0
        </a>
      </p>
      {isDev && (
        <DevToolbar
          view={view}
          onViewChange={goTo}
          freeMode={freeMode}
          onFreeModeChange={setFreeMode}
          sectionLabels={t.cockpit.sections}
          compact={compact}
        />
      )}
    </div>
  )
}
