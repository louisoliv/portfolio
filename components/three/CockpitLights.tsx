'use client'

// Lighting moods. The red panel lights, the console screen and the stars are emissive:
// they keep their brightness, so a darker cockpit makes them stand out.
export const LIGHTING_PRESETS = {
  dark: { label: 'Sombre', ambient: 0.15, ceiling: 0.6, redFill: 0 },
  combat: { label: 'Alerte rouge', ambient: 0.1, ceiling: 0.35, redFill: 0.5 },
} as const

export type LightingPreset = keyof typeof LIGHTING_PRESETS

// Faint red glow on each side, as if cast by the panel lights
const RED_FILL_POSITIONS: [number, number, number][] = [
  [0.6, 0, 0.45],
  [-0.6, 0, 0.45],
]

export function CockpitLights({ preset }: { preset: LightingPreset }) {
  const { ambient, ceiling, redFill } = LIGHTING_PRESETS[preset]
  return (
    <>
      <ambientLight intensity={ambient} />
      <pointLight position={[0, 0.3, 0]} intensity={ceiling} distance={4} />
      {/* Always mounted: adding lights at runtime would recompile every material */}
      {RED_FILL_POSITIONS.map((position) => (
        <pointLight key={position[0]} position={position} intensity={redFill} distance={1.5} color="#ff3020" />
      ))}
    </>
  )
}
