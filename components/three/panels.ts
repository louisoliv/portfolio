// Interactive panels around the octagonal front window.
// The cockpit's panel lights are a single mesh (triangles_lights), so each
// section gets its own hitbox placed from the light islands' world positions.
// "left"/"right" are from the pilot's point of view, facing the window (+z):
// screen-left is +x.

export type SectionId = 'experience' | 'projects' | 'skills' | 'contact'
export type ViewId = 'overview' | SectionId

type Vec3 = [number, number, number]

export type Panel = {
  id: SectionId
  label: string
  position: Vec3
  // Unit vector pointing from the panel towards the cockpit interior
  normal: Vec3
}

export type CameraView = {
  position: Vec3
  target: Vec3
}

export const PANELS: Panel[] = [
  { id: 'experience', label: 'Expérience', position: [0.83, 0.33, 0.72], normal: [-0.74, -0.11, -0.67] },
  { id: 'projects', label: 'Projets', position: [-0.83, 0.33, 0.72], normal: [0.74, -0.11, -0.67] },
  { id: 'skills', label: 'Compétences', position: [0.83, -0.33, 0.72], normal: [-0.73, 0.36, -0.57] },
  { id: 'contact', label: 'Contact', position: [-0.83, -0.33, 0.72], normal: [0.73, 0.36, -0.57] },
]

// Pilot seat: behind the center, facing the octagonal front window (+z)
export const OVERVIEW_VIEW: CameraView = { position: [0, 0.05, -0.35], target: [0, 0, 0] }

// How far in front of a panel the camera stops, along the panel normal
const PANEL_VIEW_DISTANCE = 0.6

// Distance from the panel center to its info card center, towards the window
export const CARD_SIDE_OFFSET = 0.40

// +1 or -1 along the panel's local x axis: the side where the window (and the card) is.
// Panels left of the window (+x) have it on their local +x side.
export function getCardSide(panel: Panel) {
  return panel.position[0] > 0 ? 1 : -1
}

// World direction from the panel center towards its card: the panel's local x axis
// (up × normal, as built by Matrix4.lookAt), oriented towards the window
function getCardDirection(panel: Panel): Vec3 {
  const [nx, , nz] = panel.normal
  const length = Math.hypot(nx, nz)
  const side = getCardSide(panel)
  return [(side * nz) / length, 0, (side * -nx) / length]
}

export function getCameraView(id: ViewId): CameraView {
  const panel = PANELS.find((p) => p.id === id)
  if (!panel) return OVERVIEW_VIEW
  // Aim between the panel and its card so both are centered on screen,
  // and shift the camera by the same amount to keep facing the wall straight on
  const [dx, , dz] = getCardDirection(panel)
  const shift = CARD_SIDE_OFFSET / 2
  const target: Vec3 = [panel.position[0] + dx * shift, panel.position[1], panel.position[2] + dz * shift]
  const [nx, ny, nz] = panel.normal
  return {
    position: [target[0] + nx * PANEL_VIEW_DISTANCE, target[1] + ny * PANEL_VIEW_DISTANCE, target[2] + nz * PANEL_VIEW_DISTANCE],
    target,
  }
}
