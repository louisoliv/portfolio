'use client'

import dynamic from 'next/dynamic'

// The R3F Canvas must never render on the server
const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneClient() {
  return <Scene />
}
