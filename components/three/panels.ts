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
const PANEL_VIEW_DISTANCE = 0.45

export function getCameraView(id: ViewId): CameraView {
  const panel = PANELS.find((p) => p.id === id)
  if (!panel) return OVERVIEW_VIEW
  const [px, py, pz] = panel.position
  const [nx, ny, nz] = panel.normal
  return {
    position: [px + nx * PANEL_VIEW_DISTANCE, py + ny * PANEL_VIEW_DISTANCE, pz + nz * PANEL_VIEW_DISTANCE],
    target: panel.position,
  }
}
