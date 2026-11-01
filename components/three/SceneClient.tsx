'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { LoadingScreen } from './LoadingScreen'

const BOOT_PLACEHOLDER = (
  <div className="relative h-full w-full">
    <LoadingScreen progress={0} />
  </div>
)

// The R3F Canvas must never render on the server.
// While the 3D code downloads, show the boot screen at 0 %: the scene takes over with the same screen.
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => BOOT_PLACEHOLDER })

// Opens the cockpit even on a device below the thresholds (link in AutoRedirectNotice)
const FORCE_3D_PARAM = 'force3d'

type ExtendedNavigator = Navigator & {
  // Chrome / Android only, in GB, rounded down (0.25 to 8)
  deviceMemory?: number
  // Chrome / Android only
  connection?: { saveData?: boolean }
}

// Devices that should get the classic page straight away, before downloading the 3D code
// and the 7 MB model. Returns why, or null when the cockpit can run.
function getModestDeviceReason(): string | null {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
  if (!gl) return 'webgl'
  gl.getExtension('WEBGL_lose_context')?.loseContext()

  const nav = navigator as ExtendedNavigator
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return 'memory'
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2) return 'cpu'
  if (nav.connection?.saveData) return 'save-data'
  return null
}

export default function SceneClient() {
  const router = useRouter()
  const [canRun3d, setCanRun3d] = useState(false)

  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has(FORCE_3D_PARAM)
    if (forced || getModestDeviceReason() === null) setCanRun3d(true)
    else router.replace('/classique?auto=1')
  }, [router])

  // Until the check passes, the scene (and its download) is not even requested
  return canRun3d ? <Scene /> : BOOT_PLACEHOLDER
}
