'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useProgress, Html } from '@react-three/drei'
import { Cockpit } from './Cockpit'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center className="font-mono text-sm text-red-500">
      Chargement… {progress.toFixed(0)}%
    </Html>
  )
}

export default function Scene() {
  // Pilot seat: behind the center, facing the octagonal front window (+z)
  return (
    <Canvas camera={{ position: [0, 0.05, -0.35], fov: 70, near: 0.01, far: 100 }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0.3, 0]} intensity={2} distance={4} />
      <Suspense fallback={<Loader />}>
        <Cockpit />
      </Suspense>
      {/* Temporary: free exploration to locate panels (step 3) */}
      <OrbitControls target={[0, 0, 0]} makeDefault />
    </Canvas>
  )
}
