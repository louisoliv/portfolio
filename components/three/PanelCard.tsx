'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { CARD_SIDE_OFFSET, getCardSide, Panel } from './panels'

// Card width in CSS pixels, and its size in the scene: drei's <Html transform>
// maps 1px to distanceFactor / 400 world units
const CARD_WIDTH_PX = 440
const CARD_WIDTH_WORLD = 0.4
export const DISTANCE_FACTOR = (CARD_WIDTH_WORLD * 400) / CARD_WIDTH_PX

// Card placement relative to the panel, in the panel's own frame:
// sideways towards the window (CARD_SIDE_OFFSET), slightly off the wall
const WALL_OFFSET = 0.06

// Clicks on a card must not reach the 3D objects behind it
const stop = (e: React.SyntheticEvent) => e.stopPropagation()
export const STOP_SCENE_CLICKS = { onPointerDown: stop, onPointerUp: stop, onClick: stop }

type PanelCardProps = {
  panel: Panel
  visible: boolean
  children: React.ReactNode
}

// Orientation of a panel's own frame: local +z along its normal, local +y roughly up
export function usePanelQuaternion(panel: Panel) {
  return useMemo(() => {
    const center = new THREE.Vector3(...panel.position)
    const normal = new THREE.Vector3(...panel.normal).normalize()
    // Matrix4.lookAt points +z from target to eye, so the frame faces the interior
    const m = new THREE.Matrix4().lookAt(center.clone().add(normal), center, new THREE.Vector3(0, 1, 0))
    return new THREE.Quaternion().setFromRotationMatrix(m)
  }, [panel])
}

// Hangs a DOM card next to a panel, facing the same way as the panel
export function PanelCard({ panel, visible, children }: PanelCardProps) {
  const quaternion = usePanelQuaternion(panel)

  if (!visible) return null

  return (
    <group position={panel.position} quaternion={quaternion}>
      <Html
        transform
        distanceFactor={DISTANCE_FACTOR}
        position={[getCardSide(panel) * CARD_SIDE_OFFSET, 0, WALL_OFFSET]}
      >
        <div
          {...STOP_SCENE_CLICKS}
          style={{ width: CARD_WIDTH_PX }}
          className="duration-500 animate-in fade-in zoom-in-95 fill-mode-backwards delay-300 motion-reduce:animate-none"
        >
          {children}
        </div>
      </Html>
    </group>
  )
}
