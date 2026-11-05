'use client'

import { PANELS, ViewId } from './panels'

type MobileNavProps = {
  view: ViewId
  // Label of each entry, in the current language
  labels: Record<ViewId, string>
  navLabel: string
  onSelect: (id: ViewId) => void
}

// Compact layout: in portrait the four panels cannot all be on screen, so this bar
// gives direct access to every section (and back to the profile)
export function MobileNav({ view, labels, navLabel, onSelect }: MobileNavProps) {
  const items: ViewId[] = ['overview', ...PANELS.map(({ id }) => id)]

  return (
    <nav
      aria-label={navLabel}
      className="absolute inset-x-0 bottom-0 z-30 grid h-14 grid-cols-5 border-t border-red-500/40 bg-black/90 font-mono"
    >
      {items.map((id) => {
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
            {labels[id]}
          </button>
        )
      })}
    </nav>
  )
}
