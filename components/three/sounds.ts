// Cockpit sound effects, served from public/sounds (see the README there).
// They only ever play in response to a click: browsers block sound before any interaction.
const SOUND_FILES = {
  alert: '/sounds/alert.mp3',
  heroShow: '/sounds/hero-show.wav',
  heroHide: '/sounds/back.wav',
  sectionOpen: '/sounds/section-open.wav',
  overview: '/sounds/back.wav',
}

export type SoundName = keyof typeof SOUND_FILES

const VOLUME = 0.6
const MUTED_STORAGE_KEY = 'cockpit-sound-muted'

const players: Partial<Record<SoundName, HTMLAudioElement>> = {}
let muted = false

export function playSound(name: SoundName) {
  if (muted) return
  const player = (players[name] ??= new Audio(SOUND_FILES[name]))
  player.volume = VOLUME
  player.currentTime = 0
  // Rejected when the file is missing: a missing sound must not break anything
  player.play().catch(() => {})
}

export function setSoundMuted(value: boolean) {
  muted = value
  try {
    localStorage.setItem(MUTED_STORAGE_KEY, String(value))
  } catch {
    // Storage can be blocked (private mode): the choice just won't be remembered
  }
}

export function readStoredSoundMuted() {
  try {
    muted = localStorage.getItem(MUTED_STORAGE_KEY) === 'true'
  } catch {
    muted = false
  }
  return muted
}
