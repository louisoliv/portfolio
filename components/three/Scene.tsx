'use client'

import { Fragment, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX } from 'lucide-react'
import { Canvas, ComputeFunction } from '@react-three/fiber'
import { PerformanceMonitor, useProgress } from '@react-three/drei'
import { Cockpit } from './Cockpit'
import { CameraRig } from './CameraRig'
import { HeroCard, HeroCardContent } from './HeroCard'
import { DevToolbar } from './DevToolbar'
import { PanelCard } from './PanelCard'
import { ImperialCard, CardTheme } from './ImperialCard'
import { SECTION_CARDS } from './SectionCards'
import { PanelLabel } from './PanelLabel'
import { LoadingScreen } from './LoadingScreen'
import { Starfield } from './Starfield'
import { CockpitLights } from './CockpitLights'
import { playSound, readStoredSoundMuted, setSoundMuted } from './sounds'
import { MobileSheet } from './MobileSheet'
import { MobileNav } from './MobileNav'
import { useCompactLayout } from './useCompactLayout'
import { OVERVIEW_VIEW, PANELS, SectionId, ViewId } from './panels'

const isDev = process.env.NODE_ENV === 'development'

const ALERT_DURATION_MS = 8000

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

export default function Scene() {
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
  const [cardTheme, setCardTheme] = useState<CardTheme>('cockpit')
  // Red alert: triggered by the console's left button, ends by itself
  const [alertActive, setAlertActive] = useState(false)
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
            openPanel={openPanel?.id}
            onPanelSelect={goTo}
            onPanelHover={onPanelHover}
            onConsoleClick={onConsoleClick}
            onAlertClick={onAlertClick}
            alertActive={alertActive}
          />
          <HeroCard visible={booted && !compact && view === 'overview' && heroVisible} theme={cardTheme} onNavigate={goTo} />
          {booted && PANELS.map((panel) => {
            const { code, Content } = SECTION_CARDS[panel.id]
            return (
              <Fragment key={panel.id}>
                {/* The open panel's card already shows its name */}
                {view !== panel.id && <PanelLabel panel={panel} code={code} highlighted={hoveredPanel === panel.id} />}
                <PanelCard panel={panel} visible={!compact && view === panel.id}>
                  <ImperialCard code={code} title={panel.label} theme={cardTheme}>
                    <Content />
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
          ← Vue d&apos;ensemble
        </button>
      )}
      {compact && booted && view === 'overview' && heroVisible && (
        <MobileSheet
          label="Profil pilote"
          onClose={() => {
            playSound('heroHide')
            setHeroVisible(false)
          }}
        >
          <HeroCardContent theme={cardTheme} onNavigate={goTo} />
        </MobileSheet>
      )}
      {compact && booted && openPanel && OpenContent && (
        <MobileSheet label={openPanel.label} onClose={() => goTo('overview')}>
          <ImperialCard code={SECTION_CARDS[openPanel.id].code} title={openPanel.label} theme={cardTheme}>
            <OpenContent />
          </ImperialCard>
        </MobileSheet>
      )}
      {compact && booted && <MobileNav view={view} onSelect={onNavSelect} />}
      {showSlowBanner && (
        <div
          role="status"
          className="absolute left-1/2 top-16 flex w-[min(36rem,calc(100%-2rem))] -translate-x-1/2 flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded border border-red-500/60 bg-black/85 px-4 py-3 text-center font-mono text-xs text-zinc-200"
        >
          <span>Ton appareil semble avoir du mal à afficher le cockpit.</span>
          <span className="flex gap-2">
            <Link
              href="/classique"
              className="rounded border border-red-500/70 px-3 py-1 uppercase tracking-widest text-red-300 hover:bg-red-500/20"
            >
              Version classique
            </Link>
            <button
              type="button"
              onClick={() => setSlowBannerDismissed(true)}
              className="rounded border border-zinc-600 px-3 py-1 uppercase tracking-widest text-zinc-300 hover:border-zinc-400"
            >
              Rester ici
            </button>
          </span>
        </div>
      )}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        {/* Text version for hurried visitors, keyboard and screen reader users */}
        <Link
          href="/classique"
          className="rounded border border-zinc-600/60 bg-black/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-red-500/60 hover:text-red-300 focus-visible:border-red-500 focus-visible:outline-none"
        >
          Version classique
        </Link>
        <button
          type="button"
          onClick={toggleMuted}
          aria-label={muted ? 'Activer le son' : 'Couper le son'}
          aria-pressed={muted}
          className="rounded border border-zinc-600/60 bg-black/60 p-1.5 text-zinc-300 hover:border-red-500/60 hover:text-red-300 focus-visible:border-red-500 focus-visible:outline-none"
        >
          {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
        </button>
      </div>
      <LoadingScreen progress={progress} done={!active && progress === 100} onFinished={onBootFinished} />
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
          cardTheme={cardTheme}
          onCardThemeChange={setCardTheme}
          compact={compact}
        />
      )}
    </div>
  )
}
