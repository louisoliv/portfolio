'use client'

import { PANELS, ViewId } from './panels'
import { CARD_THEMES, CardTheme } from './ImperialCard'

type DevToolbarProps = {
  view: ViewId
  onViewChange: (view: ViewId) => void
  freeMode: boolean
  onFreeModeChange: (freeMode: boolean) => void
  cardTheme: CardTheme
  onCardThemeChange: (theme: CardTheme) => void
}

// Temporary dev controls: jump between viewpoints, toggle free camera, compare card themes
export function DevToolbar({
  view,
  onViewChange,
  freeMode,
  onFreeModeChange,
  cardTheme,
  onCardThemeChange,
}: DevToolbarProps) {
  const views: { id: ViewId; label: string }[] = [
    { id: 'overview', label: "Vue d'ensemble" },
    ...PANELS.map(({ id, label }) => ({ id, label })),
  ]

  return (
    <div className="absolute left-1/2 top-4 flex -translate-x-1/2 flex-wrap items-center gap-2 rounded bg-black/70 p-2 font-mono text-sm text-cyan-300">
      {views.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() => onViewChange(id)}
          className={`rounded border px-2 py-1 ${view === id ? 'border-cyan-300 bg-cyan-300/20' : 'border-cyan-300/30'}`}
        >
          {label}
        </button>
      ))}
      <label className="ml-2 flex cursor-pointer items-center gap-1">
        <input type="checkbox" checked={freeMode} onChange={(e) => onFreeModeChange(e.target.checked)} />
        Mode libre
      </label>
      <label className="ml-2 flex items-center gap-1">
        Thème
        <select
          value={cardTheme}
          onChange={(e) => onCardThemeChange(e.target.value as CardTheme)}
          className="border border-cyan-300/30 bg-black px-1 py-0.5"
        >
          {(Object.keys(CARD_THEMES) as CardTheme[]).map((theme) => (
            <option key={theme} value={theme}>
              {CARD_THEMES[theme].label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
