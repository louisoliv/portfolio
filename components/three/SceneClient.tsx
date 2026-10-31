'use client'

import dynamic from 'next/dynamic'
import { LoadingScreen } from './LoadingScreen'

// The R3F Canvas must never render on the server.
// While the 3D code downloads, show the boot screen at 0 %: the scene takes over with the same screen.
const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => (
    <div className="relative h-full w-full">
      <LoadingScreen progress={0} />
    </div>
  ),
})

export default function SceneClient() {
  return <Scene />
}
