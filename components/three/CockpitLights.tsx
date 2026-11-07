'use client'

import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Lighting moods. The red panel lights, the console screen and the stars are emissive:
// they keep their brightness, so a darker cockpit makes them stand out.
const NORMAL = { ambient: 0.15, ceiling: 0.6, redFill: 0 }
const ALERT = { ambient: 0.1, ceiling: 0.35, redFill: 0.5 }

// Faint red glow on each side, as if cast by the panel lights
const RED_FILL_POSITIONS: [number, number, number][] = [
  [0.6, 0, 0.45],
  [-0.6, 0, 0.45],
]

// How fast the lights move to the target mood (higher is faster): a soft ramp, never a flash
const FADE_SPEED = 3

export function CockpitLights({ alert }: { alert: boolean }) {
  const ambient = useRef<THREE.AmbientLight>(null)
  const ceiling = useRef<THREE.PointLight>(null)
  const redFills = useRef<(THREE.PointLight | null)[]>([])
  const reducedMotion = usePrefersReducedMotion()

  useFrame((_, delta) => {
    const target = alert ? ALERT : NORMAL
    const blend = reducedMotion ? 1 : 1 - Math.exp(-FADE_SPEED * delta)
    if (ambient.current) ambient.current.intensity += (target.ambient - ambient.current.intensity) * blend
    if (ceiling.current) ceiling.current.intensity += (target.ceiling - ceiling.current.intensity) * blend
    for (const light of redFills.current) {
      if (light) light.intensity += (target.redFill - light.intensity) * blend
    }
  })

  return (
    <>
      <ambientLight ref={ambient} intensity={NORMAL.ambient} />
      <pointLight ref={ceiling} position={[0, 0.3, 0]} intensity={NORMAL.ceiling} distance={4} />
      {/* Always mounted: adding lights at runtime would recompile every material */}
      {RED_FILL_POSITIONS.map((position, i) => (
        <pointLight
          key={position[0]}
          ref={(light) => {
            redFills.current[i] = light
          }}
          position={position}
          intensity={NORMAL.redFill}
          distance={1.5}
          color="#ff3020"
        />
      ))}
    </>
  )
}
