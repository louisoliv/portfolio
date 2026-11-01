'use client'

import { Fragment, Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Canvas, ComputeFunction } from '@react-three/fiber'
import { PerformanceMonitor, useProgress } from '@react-three/drei'
import { Cockpit } from './Cockpit'
import { CameraRig } from './CameraRig'
import { HeroCard } from './HeroCard'
import { DevToolbar } from './DevToolbar'
import { PanelCard } from './PanelCard'
import { ImperialCard, CardTheme } from './ImperialCard'
import { SECTION_CARDS } from './SectionCards'
import { PanelLabel } from './PanelLabel'
import { LoadingScreen } from './LoadingScreen'
import { Starfield } from './Starfield'
import { OVERVIEW_VIEW, PANELS, SectionId, ViewId } from './panels'

const isDev = process.env.NODE_ENV === 'development'

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
  const [freeMode, setFreeMode] = useState(false)
  const [cardTheme, setCardTheme] = useState<CardTheme>('cockpit')
  const [heroVisible, setHeroVisible] = useState(true)
  const [hoveredPanel, setHoveredPanel] = useState<SectionId | null>(null)
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
      setHeroVisible((visible) => !visible)
    } else {
      setView('overview')
      setHeroVisible(true)
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView('overview')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

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
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0.3, 0]} intensity={2} distance={4} />
        <Starfield />
        {/* Measured only after boot: loading the model is expected to be slow */}
        {booted && <PerformanceMonitor bounds={PERF_BOUNDS} onDecline={onPerfDecline} />}
        {/* Loading is shown by the LoadingScreen overlay below */}
        <Suspense fallback={null}>
          <Cockpit onPanelSelect={setView} onPanelHover={onPanelHover} onConsoleClick={onConsoleClick} />
          <HeroCard visible={booted && view === 'overview' && heroVisible} theme={cardTheme} onNavigate={setView} />
          {booted && PANELS.map((panel) => {
            const { code, Content } = SECTION_CARDS[panel.id]
            return (
              <Fragment key={panel.id}>
                {/* The open panel's card already shows its name */}
                {view !== panel.id && <PanelLabel panel={panel} code={code} highlighted={hoveredPanel === panel.id} />}
                <PanelCard panel={panel} visible={view === panel.id}>
                  <ImperialCard code={code} title={panel.label} theme={cardTheme}>
                    <Content />
                  </ImperialCard>
                </PanelCard>
              </Fragment>
            )
          })}
        </Suspense>
        <CameraRig view={view} freeMode={isDev && freeMode} />
      </Canvas>
      {view !== 'overview' && (
        <button
          type="button"
          onClick={() => setView('overview')}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded border border-red-500/60 bg-black/70 px-4 py-2 font-mono text-sm text-red-400 hover:border-red-400 hover:text-red-300"
        >
          ← Vue d&apos;ensemble
        </button>
      )}
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
      {/* Text version for hurried visitors, keyboard and screen reader users */}
      <Link
        href="/classique"
        className="absolute left-3 top-3 rounded border border-zinc-600/60 bg-black/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:border-red-500/60 hover:text-red-300 focus-visible:border-red-500 focus-visible:outline-none"
      >
        Version classique
      </Link>
      <LoadingScreen progress={progress} done={!active && progress === 100} onFinished={onBootFinished} />
      {/* Required by the model's CC BY 4.0 licence */}
      <p className="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-500">
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
          onViewChange={setView}
          freeMode={freeMode}
          onFreeModeChange={setFreeMode}
          cardTheme={cardTheme}
          onCardThemeChange={setCardTheme}
        />
      )}
    </div>
  )
}
