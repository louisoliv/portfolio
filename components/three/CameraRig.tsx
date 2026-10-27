'use client'

import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei'
import { getCameraView, ViewId } from './panels'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

type CameraRigProps = {
  view: ViewId
  // Dev only: lets the mouse move the camera freely
  freeMode?: boolean
}

export function CameraRig({ view, freeMode = false }: CameraRigProps) {
  const controls = useRef<CameraControls>(null)
  const reducedMotion = usePrefersReducedMotion()

  // Also re-runs when leaving free mode, to snap back to the current view
  useEffect(() => {
    const { position, target } = getCameraView(view)
    controls.current?.setLookAt(...position, ...target, !reducedMotion)
  }, [view, freeMode, reducedMotion])

  // drei only calls update() while enabled, so drive transitions ourselves when input is locked
  useFrame((_, delta) => {
    if (!freeMode) controls.current?.update(delta)
  })

  return <CameraControls ref={controls} makeDefault enabled={freeMode} smoothTime={0.6} />
}
