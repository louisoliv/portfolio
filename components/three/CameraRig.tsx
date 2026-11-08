'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { getCameraView, ViewId } from './panels'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

// Vertical field of view: 70° on wide screens. Narrower screens widen it so the window
// keeps roughly the same horizontal extent, up to 100° (beyond that the cockpit distorts too much).
const BASE_FOV = 70
const MAX_FOV = 100
// tan of the horizontal half-angle to keep: the front window spans about ±0.55 at 16:9
const TARGET_HALF_WIDTH_TAN = 0.6

function getFov(aspect: number) {
  const fov = THREE.MathUtils.radToDeg(2 * Math.atan(TARGET_HALF_WIDTH_TAN / aspect))
  return THREE.MathUtils.clamp(fov, BASE_FOV, MAX_FOV)
}

// Compact layout: where the panel sits vertically on screen (NDC, 1 = top edge),
// to stay visible above the bottom sheet
const COMPACT_PANEL_SCREEN_Y = 0.5
// Compact layout: camera distance to a panel. Landscape phones are short,
// so the camera backs off for the panel to fit above the sheet.
const COMPACT_DISTANCE_PORTRAIT = 0.5
const COMPACT_DISTANCE_LANDSCAPE = 0.9

type CameraRigProps = {
  view: ViewId
  compact?: boolean
  // Dev only: lets the mouse move the camera freely
  freeMode?: boolean
}

export function CameraRig({ view, compact = false, freeMode = false }: CameraRigProps) {
  const controls = useRef<CameraControls>(null)
  const reducedMotion = usePrefersReducedMotion()
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera
  const aspect = useThree((state) => state.size.width / state.size.height)
  const fov = getFov(aspect)
  const compactDistance = compact ? (aspect > 1 ? COMPACT_DISTANCE_LANDSCAPE : COMPACT_DISTANCE_PORTRAIT) : undefined

  // three.js objects are updated imperatively, as React Three Fiber intends
  // (the rule reports both the effect and the assignment)
  // eslint-disable-next-line react-hooks/immutability
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [camera, fov])

  // Also re-runs when leaving free mode, to snap back to the current view
  useEffect(() => {
    const { position, target } = getCameraView(view, compactDistance)
    controls.current?.setLookAt(...position, ...target, !reducedMotion)
    // The overview sits at an azimuth of exactly 180°, where the angle wraps around:
    // without this, moving to the left panels (-132°) spins the camera the long way (~312°).
    // camera-controls 3 no longer picks the shortest path by itself.
    controls.current?.normalizeRotations()
    // Compact panel views: move the camera down (in its own frame) so the panel
    // shows in the upper part of the screen, above the bottom sheet.
    // camera-controls negates y: a positive focal offset moves the camera down.
    const lift =
      compactDistance !== undefined && view !== 'overview'
        ? COMPACT_PANEL_SCREEN_Y * compactDistance * Math.tan(THREE.MathUtils.degToRad(fov / 2))
        : 0
    controls.current?.setFocalOffset(0, lift, 0, !reducedMotion)
  }, [view, compactDistance, fov, freeMode, reducedMotion])

  // `enabled` only locks user input: drei (10+) calls update() every frame, so transitions still run
  return <CameraControls ref={controls} makeDefault enabled={freeMode} smoothTime={0.6} />
}
