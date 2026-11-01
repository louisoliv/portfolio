'use client'

import { PANELS, ViewId } from './panels'

const ITEMS: { id: ViewId; label: string }[] = [
  { id: 'overview', label: 'Profil' },
  ...PANELS.map(({ id, label }) => ({ id, label })),
]

type MobileNavProps = {
  view: ViewId
  onSelect: (id: ViewId) => void
}

// Compact layout: in portrait the four panels cannot all be on screen, so this bar
// gives direct access to every section (and back to the profile)
export function MobileNav({ view, onSelect }: MobileNavProps) {
  return (
    <nav
      aria-label="Sections"
      className="absolute inset-x-0 bottom-0 z-30 grid h-14 grid-cols-5 border-t border-red-500/40 bg-black/90 font-mono"
    >
      {ITEMS.map(({ id, label }) => {
        const active = view === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={active}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] uppercase tracking-tight transition-colors ${
              active ? 'text-red-300' : 'text-zinc-400'
            }`}
          >
            <span aria-hidden className={`h-0.5 w-6 ${active ? 'bg-red-500' : 'bg-zinc-700'}`} />
            {label}
          </button>
        )
      })}
    </nav>
  )
}
