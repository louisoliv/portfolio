// Interactive panels around the octagonal front window.
// The cockpit's panel lights are a single mesh (triangles_lights), so each
// section gets its own hitbox placed from the light islands' world positions.
// "left"/"right" are from the pilot's point of view, facing the window (+z):
// screen-left is +x.

export type SectionId = 'experience' | 'projects' | 'skills' | 'contact'

export type Panel = {
  id: SectionId
  label: string
  position: [number, number, number]
  // Unit vector pointing from the panel towards the cockpit interior
  normal: [number, number, number]
}

export const PANELS: Panel[] = [
  { id: 'experience', label: 'Expérience', position: [0.83, 0.33, 0.72], normal: [-0.74, -0.11, -0.67] },
  { id: 'projects', label: 'Projets', position: [-0.83, 0.33, 0.72], normal: [0.74, -0.11, -0.67] },
  { id: 'skills', label: 'Compétences', position: [0.83, -0.33, 0.72], normal: [-0.73, 0.36, -0.57] },
  { id: 'contact', label: 'Contact', position: [-0.83, -0.33, 0.72], normal: [0.73, 0.36, -0.57] },
]
