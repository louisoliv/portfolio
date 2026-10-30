'use client'

import { Html } from '@react-three/drei'
import { cn } from '@/lib/utils'
import { Panel } from './panels'
// Same pixel-to-world scale as the info cards
import { DISTANCE_FACTOR, usePanelQuaternion } from './PanelCard'

// Below the panel, in its own frame, just off the wall
const LABEL_POSITION: [number, number, number] = [0, -0.29, 0.02]

type PanelLabelProps = {
  panel: Panel
  code: string
  highlighted: boolean
}

// Stencilled marking painted on the wall under a panel, lit up while the panel is hovered
export function PanelLabel({ panel, code, highlighted }: PanelLabelProps) {
  const quaternion = usePanelQuaternion(panel)

  return (
    <group position={panel.position} quaternion={quaternion}>
      <Html transform distanceFactor={DISTANCE_FACTOR} position={LABEL_POSITION} pointerEvents="none">
        <p
          aria-hidden
          className={cn(
            'select-none whitespace-nowrap font-mono text-base font-semibold uppercase tracking-[0.35em] transition-colors duration-300',
            highlighted
              ? 'text-red-400 [text-shadow:0_0_8px_rgb(239_68_68/0.8)]'
              : 'text-zinc-200/85 [text-shadow:0_1px_3px_rgb(0_0_0/0.9)]',
          )}
        >
          {code} · {panel.label}
        </p>
      </Html>
    </group>
  )
}
