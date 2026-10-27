'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { PANELS, Panel } from './panels'

// Temporary debug overlay (step 3): shows where each panel hitbox sits
function Marker({ panel }: { panel: Panel }) {
  const quaternion = useMemo(() => {
    const center = new THREE.Vector3(...panel.position)
    const normal = new THREE.Vector3(...panel.normal).normalize()
    // Matrix4.lookAt points +z from target to eye, so the plane faces the interior
    const m = new THREE.Matrix4().lookAt(center.clone().add(normal), center, new THREE.Vector3(0, 1, 0))
    return new THREE.Quaternion().setFromRotationMatrix(m)
  }, [panel])

  return (
    <group position={panel.position} quaternion={quaternion}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[0.35, 0.45]} />
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.6} />
      </mesh>
      <Html
        center
        className="pointer-events-none whitespace-nowrap rounded bg-black/70 px-2 py-1 font-mono text-base font-semibold text-cyan-300"
      >
        {panel.label}
      </Html>
    </group>
  )
}

export function PanelMarkers() {
  return (
    <>
      {PANELS.map((panel) => (
        <Marker key={panel.id} panel={panel} />
      ))}
    </>
  )
}
