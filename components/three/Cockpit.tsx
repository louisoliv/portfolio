'use client'

/*
Hand-written in the gltfjsx format (no --transform) from assets/models/cockpit.glb
Model: "Tie Fighter Cockpit Version 2" by MichaelEGA, licensed under CC BY 4.0
*/

import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { ThreeElements, ThreeEvent } from '@react-three/fiber'
import { useCursor, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { PANELS, SectionId } from './panels'
import { splitPanels } from './panelGeometry'
import { InteractivePanel } from './InteractivePanel'
import { isCompactScreen } from './useCompactLayout'

// Optimized copies of cockpit.glb (Draco geometry, WebP textures), meshes kept separate.
// Must stay Draco, not meshopt: panelGeometry.ts relies on the original vertex positions.
const MODEL_URL = '/models/cockpit-optimized.glb'
// Same model with 512 px textures: about 31 MB of GPU memory instead of 103 MB
const MODEL_URL_MOBILE = '/models/cockpit-mobile.glb'

// Chosen once on arrival: rotating a phone or resizing the window must not reload the model.
// Not preloaded on purpose, a phone would download the desktop version too.
export const pickModelUrl = () => (isCompactScreen() ? MODEL_URL_MOBILE : MODEL_URL)

// Self-hosted decoder (from three/examples/jsm/libs/draco/gltf) rather than Google's CDN
useGLTF.setDecoderPath('/draco/')

type GLTFResult = GLTF & {
  nodes: {
    bolts_canopy_bolts_canopy_0: THREE.Mesh
    bolts_hull_bolts_hull_0: THREE.Mesh
    brackets_brackets_0: THREE.Mesh
    canopy_brace_canopy_brace_0: THREE.Mesh
    canopy_struts_canopy_struts_0: THREE.Mesh
    canopy_struts_bolts_canopy_struts_bolts_0: THREE.Mesh
    canopy_struts_center_inset_canopy_struts_center_inset_0: THREE.Mesh
    canopy_struts_insets_canopy_struts_inset_0: THREE.Mesh
    detail_metal_painted_black_detail_metal_painted_black_0: THREE.Mesh
    detail_metal_painted_grey_detail_metal_painted_grey_0: THREE.Mesh
    detail_metal_shiny_detail_metal_shiny_0: THREE.Mesh
    detail_pipes_detail_pipes_0: THREE.Mesh
    floor_floor_0: THREE.Mesh
    hatch_hatch_0: THREE.Mesh
    hull_hull_0: THREE.Mesh
    red_lights_red_lights_0: THREE.Mesh
    screen_screen_0: THREE.Mesh
    sensors_sensors_0: THREE.Mesh
    triangles_triangles_0: THREE.Mesh
    triangles_lights_triangles_lights_0: THREE.Mesh
    window_back_glass_0: THREE.Mesh
    window_front_glass_0: THREE.Mesh
    window_top_glass_0: THREE.Mesh
    yellow_lights_yellow_lights_0: THREE.Mesh
  }
  materials: {
    bolts_canopy: THREE.MeshStandardMaterial
    bolts_hull: THREE.MeshStandardMaterial
    brackets: THREE.MeshStandardMaterial
    canopy_brace: THREE.MeshStandardMaterial
    canopy_struts: THREE.MeshStandardMaterial
    canopy_struts_bolts: THREE.MeshStandardMaterial
    canopy_struts_center_inset: THREE.MeshStandardMaterial
    canopy_struts_inset: THREE.MeshStandardMaterial
    detail_metal_painted_black: THREE.MeshStandardMaterial
    detail_metal_painted_grey: THREE.MeshStandardMaterial
    detail_metal_shiny: THREE.MeshStandardMaterial
    detail_pipes: THREE.MeshStandardMaterial
    floor: THREE.MeshStandardMaterial
    hatch: THREE.MeshStandardMaterial
    hull: THREE.MeshStandardMaterial
    red_lights: THREE.MeshStandardMaterial
    screen: THREE.MeshStandardMaterial
    sensors: THREE.MeshStandardMaterial
    triangles: THREE.MeshStandardMaterial
    triangles_lights: THREE.MeshStandardMaterial
    glass: THREE.MeshStandardMaterial
    yellow_lights: THREE.MeshStandardMaterial
  }
}

type CockpitProps = ThreeElements['group'] & {
  modelUrl: string
  // Panel whose section is open, kept highlighted
  openPanel?: SectionId
  onPanelSelect: (id: SectionId) => void
  onPanelHover: (id: SectionId, hovered: boolean) => void
  onConsoleClick: () => void
  onAlertClick: () => void
  alertActive: boolean
}

// Brightness of the targeting computer's round screen, at rest and on hover
const SCREEN_GLOW = 1
const SCREEN_GLOW_HOVER = 2.5

// World-space box around the console head: front face with the round screen and
// buttons (x ±0.16, y -0.27..-0.07, z from 0.45) and the small unit behind it
const CONSOLE_HITBOX_POSITION: [number, number, number] = [0, -0.17, 0.52]
const CONSOLE_HITBOX_SIZE: [number, number, number] = [0.34, 0.22, 0.14]

// Left round button of the console: triggers the red alert. Its hitbox sticks out in front
// of the console hitbox (front at z 0.45) so it is the one hit first.
const ALERT_BUTTON_POSITION: [number, number, number] = [0.1, -0.2, 0.455]
const ALERT_BUTTON_SIZE: [number, number, number] = [0.05, 0.05, 0.05]
// Red ring around the button, shown on hover and during the alert
const ALERT_RING_POSITION: [number, number, number] = [0.1, -0.201, 0.452]

export function Cockpit({
  modelUrl,
  openPanel,
  onPanelSelect,
  onPanelHover,
  onConsoleClick,
  onAlertClick,
  alertActive,
  ...props
}: CockpitProps) {
  const { nodes, materials } = useGLTF(modelUrl) as unknown as GLTFResult
  // Interactive panels are cut out of the shared meshes so they can move on hover
  const plates = useMemo(() => splitPanels(nodes.triangles_triangles_0.geometry), [nodes])
  const lights = useMemo(() => splitPanels(nodes.triangles_lights_triangles_lights_0.geometry), [nodes])

  const [consoleHovered, setConsoleHovered] = useState(false)
  const [alertHovered, setAlertHovered] = useState(false)
  // One shared cursor: separate useCursor calls would overwrite each other when moving between the two
  useCursor(consoleHovered || alertHovered)
  useEffect(() => {
    // The screen material is only used by the round screen. three.js materials are
    // updated imperatively, as React Three Fiber intends
    // eslint-disable-next-line react-hooks/immutability
    materials.screen.emissiveIntensity = consoleHovered ? SCREEN_GLOW_HOVER : SCREEN_GLOW
  }, [consoleHovered, materials])

  return (
    <group {...props} dispose={null}>
      {/* Targeting computer hitbox. The console meshes also hold its pole, feet and the large
          round plate below it, so an invisible box over the console head is used instead
          (raycasting ignores `visible`) */}
      <mesh
        position={CONSOLE_HITBOX_POSITION}
        visible={false}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setConsoleHovered(true)
        }}
        onPointerOut={() => setConsoleHovered(false)}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          onConsoleClick()
        }}
      >
        <boxGeometry args={CONSOLE_HITBOX_SIZE} />
      </mesh>
      <mesh
        position={ALERT_BUTTON_POSITION}
        visible={false}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setAlertHovered(true)
        }}
        onPointerOut={() => setAlertHovered(false)}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          onAlertClick()
        }}
      >
        <boxGeometry args={ALERT_BUTTON_SIZE} />
      </mesh>
      <mesh position={ALERT_RING_POSITION} visible={alertHovered || alertActive}>
        <ringGeometry args={[0.02, 0.024, 32]} />
        <meshBasicMaterial color="#ff3020" side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[0, Math.PI, 0]}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh geometry={nodes.bolts_canopy_bolts_canopy_0.geometry} material={materials.bolts_canopy} />
              <mesh geometry={nodes.bolts_hull_bolts_hull_0.geometry} material={materials.bolts_hull} />
              <mesh geometry={nodes.brackets_brackets_0.geometry} material={materials.brackets} />
              <mesh geometry={nodes.canopy_brace_canopy_brace_0.geometry} material={materials.canopy_brace} />
              <mesh geometry={nodes.canopy_struts_canopy_struts_0.geometry} material={materials.canopy_struts} />
              <mesh geometry={nodes.canopy_struts_bolts_canopy_struts_bolts_0.geometry} material={materials.canopy_struts_bolts} />
              <mesh geometry={nodes.canopy_struts_center_inset_canopy_struts_center_inset_0.geometry} material={materials.canopy_struts_center_inset} />
              <mesh geometry={nodes.canopy_struts_insets_canopy_struts_inset_0.geometry} material={materials.canopy_struts_inset} />
              <mesh geometry={nodes.detail_metal_painted_black_detail_metal_painted_black_0.geometry} material={materials.detail_metal_painted_black} />
              <mesh geometry={nodes.detail_metal_painted_grey_detail_metal_painted_grey_0.geometry} material={materials.detail_metal_painted_grey} />
              <mesh geometry={nodes.detail_metal_shiny_detail_metal_shiny_0.geometry} material={materials.detail_metal_shiny} />
              <mesh geometry={nodes.detail_pipes_detail_pipes_0.geometry} material={materials.detail_pipes} />
              <mesh geometry={nodes.floor_floor_0.geometry} material={materials.floor} />
              <mesh geometry={nodes.hatch_hatch_0.geometry} material={materials.hatch} />
              <mesh geometry={nodes.hull_hull_0.geometry} material={materials.hull} />
              <mesh geometry={nodes.red_lights_red_lights_0.geometry} material={materials.red_lights} />
              <mesh geometry={nodes.screen_screen_0.geometry} material={materials.screen} />
              <mesh geometry={nodes.sensors_sensors_0.geometry} material={materials.sensors} />
              <mesh geometry={plates.rest} material={materials.triangles} />
              <mesh geometry={lights.rest} material={materials.triangles_lights} />
              {PANELS.map(({ id }) => (
                <InteractivePanel
                  key={id}
                  id={id}
                  plate={plates.panels.get(id)!}
                  lights={lights.panels.get(id)!}
                  plateMaterial={materials.triangles}
                  lightsMaterial={materials.triangles_lights}
                  open={openPanel === id}
                  onSelect={onPanelSelect}
                  onHoverChange={onPanelHover}
                />
              ))}
              <mesh geometry={nodes.window_back_glass_0.geometry} material={materials.glass} />
              <mesh geometry={nodes.window_front_glass_0.geometry} material={materials.glass} />
              <mesh geometry={nodes.window_top_glass_0.geometry} material={materials.glass} />
              <mesh geometry={nodes.yellow_lights_yellow_lights_0.geometry} material={materials.yellow_lights} />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
