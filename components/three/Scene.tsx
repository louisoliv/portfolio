'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'
import { Cockpit } from './Cockpit'
import { PanelMarkers } from './PanelMarkers'
import { CameraRig } from './CameraRig'
import { DevToolbar } from './DevToolbar'
import { OVERVIEW_VIEW, ViewId } from './panels'

const isDev = process.env.NODE_ENV === 'development'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center className="font-mono text-sm text-red-500">
      Chargement… {progress.toFixed(0)}%
    </Html>
  )
}

export default function Scene() {
  const [view, setView] = useState<ViewId>('overview')
  const [freeMode, setFreeMode] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView('overview')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: OVERVIEW_VIEW.position, fov: 70, near: 0.01, far: 100 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0.3, 0]} intensity={2} distance={4} />
        <Suspense fallback={<Loader />}>
          <Cockpit onPanelSelect={setView} />
          {isDev && <PanelMarkers />}
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
      {isDev && (
        <DevToolbar view={view} onViewChange={setView} freeMode={freeMode} onFreeModeChange={setFreeMode} />
      )}
    </div>
  )
}
