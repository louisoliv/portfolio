'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { Panel } from './panels'

// Card width in CSS pixels, and its size in the scene: drei's <Html transform>
// maps 1px to distanceFactor / 400 world units
const CARD_WIDTH_PX = 440
const CARD_WIDTH_WORLD = 0.4
const DISTANCE_FACTOR = (CARD_WIDTH_WORLD * 400) / CARD_WIDTH_PX

// Card placement relative to the panel, in the panel's own frame:
// sideways towards the window, slightly off the wall
const SIDE_OFFSET = 0.38
const WALL_OFFSET = 0.06

type PanelCardProps = {
  panel: Panel
  visible: boolean
  children: React.ReactNode
}

// Hangs a DOM card next to a panel, facing the same way as the panel
export function PanelCard({ panel, visible, children }: PanelCardProps) {
  const quaternion = useMemo(() => {
    const center = new THREE.Vector3(...panel.position)
    const normal = new THREE.Vector3(...panel.normal).normalize()
    const m = new THREE.Matrix4().lookAt(center.clone().add(normal), center, new THREE.Vector3(0, 1, 0))
    return new THREE.Quaternion().setFromRotationMatrix(m)
  }, [panel])

  if (!visible) return null

  // Panels left of the window (+x) have the window on their local +x side
  const side = panel.position[0] > 0 ? 1 : -1

  return (
    <group position={panel.position} quaternion={quaternion}>
      <Html transform distanceFactor={DISTANCE_FACTOR} position={[side * SIDE_OFFSET, 0, WALL_OFFSET]}>
        <div
          style={{ width: CARD_WIDTH_PX }}
          className="duration-500 animate-in fade-in zoom-in-95 fill-mode-backwards delay-300 motion-reduce:animate-none"
        >
          {children}
        </div>
      </Html>
    </group>
  )
}
