'use client'

import { createContext, useContext, useEffect, useSyncExternalStore } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { classicPath, type Lang } from '@/app/_data/i18n'
import { BootTexts, LoadingScreen } from './LoadingScreen'

// dynamic()'s loading component takes no props: its texts come through context
const BootTextsContext = createContext<BootTexts | null>(null)

function BootPlaceholder() {
  const texts = useContext(BootTextsContext)
  return (
    <div className="relative h-full w-full">
      {texts && <LoadingScreen progress={0} texts={texts} />}
    </div>
  )
}

// The R3F Canvas must never render on the server.
// While the 3D code downloads, show the boot screen at 0 %: the scene takes over with the same screen.
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <BootPlaceholder /> })

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

// Computed once per page load (it creates a WebGL context to test it)
let canRun3dCache: boolean | null = null
function canRun3d() {
  canRun3dCache ??=
    new URLSearchParams(window.location.search).has(FORCE_3D_PARAM) || getModestDeviceReason() === null
  return canRun3dCache
}
const noSubscription = () => () => {}

type SceneClientProps = {
  lang: Lang
  boot: BootTexts
}

export default function SceneClient({ lang, boot }: SceneClientProps) {
  const router = useRouter()
  // false on the server and during hydration, then the real answer: no hydration mismatch
  const ready = useSyncExternalStore(noSubscription, canRun3d, () => false)

  useEffect(() => {
    // Read directly, not `ready`: the first effect runs before the real value is rendered
    if (!canRun3d()) router.replace(`${classicPath(lang)}?auto=1`)
  }, [router, lang])

  // Until the check passes, the scene (and its download) is not even requested
  return (
    <BootTextsContext.Provider value={boot}>
      {ready ? <Scene initialLang={lang} boot={boot} /> : <BootPlaceholder />}
    </BootTextsContext.Provider>
  )
}
