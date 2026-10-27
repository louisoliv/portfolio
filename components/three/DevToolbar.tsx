'use client'

import { PANELS, ViewId } from './panels'

type DevToolbarProps = {
  view: ViewId
  onViewChange: (view: ViewId) => void
  freeMode: boolean
  onFreeModeChange: (freeMode: boolean) => void
}

// Temporary dev controls (step 4): jump between viewpoints, toggle free camera
export function DevToolbar({ view, onViewChange, freeMode, onFreeModeChange }: DevToolbarProps) {
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
    </div>
  )
}
