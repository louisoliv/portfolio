import { cn } from '@/lib/utils'

// Chamfered corners: top-left and bottom-right cut, Imperial terminal style
const CHAMFER = 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'

// Colour themes, exposed to Tailwind as the `hud-*` colours (see tailwind.config.ts).
// Values are "r g b" so Tailwind opacity modifiers keep working.
export const CARD_THEMES = {
  cockpit: {
    label: 'Cockpit',
    vars: { bg: '10 10 12', line: '239 68 68', title: '255 255 255', fg: '228 228 231', muted: '161 161 170', accent: '248 113 113' },
  },
  datapadDark: {
    label: 'Datapad sombre',
    vars: { bg: '6 7 9', line: '203 213 225', title: '255 255 255', fg: '226 232 240', muted: '148 163 184', accent: '239 68 68' },
  },
} as const

export type CardTheme = keyof typeof CARD_THEMES

type ImperialCardProps = {
  // Decorative sector code shown in the header, e.g. "SEC-01"
  code: string
  title: string
  theme?: CardTheme
  children: React.ReactNode
  className?: string
}

export function ImperialCard({ code, title, theme = 'cockpit', children, className }: ImperialCardProps) {
  const { vars } = CARD_THEMES[theme]
  const style = {
    clipPath: CHAMFER,
    '--hud-bg': vars.bg,
    '--hud-line': vars.line,
    '--hud-title': vars.title,
    '--hud-fg': vars.fg,
    '--hud-muted': vars.muted,
    '--hud-accent': vars.accent,
  } as React.CSSProperties

  return (
    // Outer layer is the border colour, inner layer is inset by 1px with the same shape
    <div className={cn('bg-hud-line/70 p-px font-mono', className)} style={style}>
      <div className="relative bg-hud-bg/90 text-hud-fg" style={{ clipPath: CHAMFER }}>
        {/* Scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]"
        />

        <header className="flex items-center justify-between gap-4 border-b border-hud-line/40 bg-hud-line/10 px-5 py-2 text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2 text-hud-accent">
            <span aria-hidden className="size-1.5 bg-hud-accent motion-safe:animate-pulse" />
            {code} {'//'} <span className="text-hud-title">{title}</span>
          </span>
          <span aria-hidden className="text-hud-muted/70">Accès autorisé</span>
        </header>

        <div className="relative px-5 py-4">
          <h2 className="mb-3 text-lg font-semibold uppercase tracking-widest text-hud-title">{title}</h2>
          {children}
        </div>

        <footer
          aria-hidden
          className="flex items-center justify-between border-t border-hud-line/30 px-5 py-1.5 text-[9px] uppercase tracking-[0.25em] text-hud-line/60"
        >
          <span>Réseau impérial · Terminal 7-4</span>
          <span className="flex gap-0.5">
            <span className="h-2 w-1 bg-hud-accent/80" />
            <span className="h-2 w-1 bg-hud-accent/80" />
            <span className="h-2 w-1 bg-hud-accent/80" />
            <span className="h-2 w-1 bg-hud-accent/30" />
          </span>
        </footer>
      </div>
    </div>
  )
}
