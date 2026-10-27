'use client'

import { Suspense, useState } from 'react'
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

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: OVERVIEW_VIEW.position, fov: 70, near: 0.01, far: 100 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0.3, 0]} intensity={2} distance={4} />
        <Suspense fallback={<Loader />}>
          <Cockpit />
          {isDev && <PanelMarkers />}
        </Suspense>
        <CameraRig view={view} freeMode={isDev && freeMode} />
      </Canvas>
      {isDev && (
        <DevToolbar view={view} onViewChange={setView} freeMode={freeMode} onFreeModeChange={setFreeMode} />
      )}
    </div>
  )
}
