'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { ThreeEvent, useFrame } from '@react-three/fiber'
import { Edges, useCursor } from '@react-three/drei'
import { SectionId } from './panels'
import { getLocalPanelNormal } from './panelGeometry'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// How far the panel rises out of the wall on hover (world units)
const HOVER_LIFT = 0.02

type InteractivePanelProps = {
  id: SectionId
  plate: THREE.BufferGeometry
  lights: THREE.BufferGeometry
  plateMaterial: THREE.Material
  lightsMaterial: THREE.Material
  onSelect: (id: SectionId) => void
  onHoverChange: (id: SectionId, hovered: boolean) => void
}

export function InteractivePanel({
  id,
  plate,
  lights,
  plateMaterial,
  lightsMaterial,
  onSelect,
  onHoverChange,
}: InteractivePanelProps) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const lifted = useMemo(() => getLocalPanelNormal(id).multiplyScalar(HOVER_LIFT), [id])
  useCursor(hovered)

  // Lets the scene light up the panel's wall marking
  useEffect(() => onHoverChange(id, hovered), [id, hovered, onHoverChange])

  useFrame((_, delta) => {
    if (!group.current) return
    const target = hovered ? lifted : new THREE.Vector3()
    if (reducedMotion) group.current.position.copy(target)
    else group.current.position.lerp(target, 1 - Math.exp(-12 * delta))
  })

  // The plate is only the triangular frame, the inner surface belongs to the lights mesh:
  // both handle pointer events (moving between them fires out then over, which cancels out)
  const handlers = {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      setHovered(true)
    },
    onPointerOut: () => setHovered(false),
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      onSelect(id)
    },
  }

  return (
    <group ref={group}>
      <mesh geometry={plate} material={plateMaterial} {...handlers}>
        <Edges visible={hovered} threshold={15} lineWidth={2} color="#ff4d4d" />
      </mesh>
      <mesh geometry={lights} material={lightsMaterial} {...handlers} />
    </group>
  )
}
