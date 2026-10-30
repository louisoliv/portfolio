import { cn } from '@/lib/utils'

// Chamfered corners: top-left and bottom-right cut, Imperial terminal style
const CHAMFER = 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)'

type ImperialCardProps = {
  // Decorative sector code shown in the header, e.g. "SEC-01"
  code: string
  title: string
  children: React.ReactNode
  className?: string
}

export function ImperialCard({ code, title, children, className }: ImperialCardProps) {
  return (
    // Outer layer is the border colour, inner layer is inset by 1px with the same shape
    <div className={cn('bg-red-500/70 p-px font-mono', className)} style={{ clipPath: CHAMFER }}>
      <div className="relative bg-black/90 text-amber-100" style={{ clipPath: CHAMFER }}>
        {/* Scanlines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_3px)]"
        />

        <header className="flex items-center justify-between gap-4 border-b border-red-500/40 bg-red-500/10 px-5 py-2 text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2 text-red-400">
            <span aria-hidden className="size-1.5 bg-red-500 motion-safe:animate-pulse" />
            {code} {'//'} <span className="text-amber-300">{title}</span>
          </span>
          <span aria-hidden className="text-amber-500/70">Accès autorisé</span>
        </header>

        <div className="relative px-5 py-4">
          <h2 className="mb-3 text-lg font-semibold uppercase tracking-widest text-amber-300">{title}</h2>
          {children}
        </div>

        <footer
          aria-hidden
          className="flex items-center justify-between border-t border-red-500/30 px-5 py-1.5 text-[9px] uppercase tracking-[0.25em] text-red-500/60"
        >
          <span>Réseau impérial · Terminal 7-4</span>
          <span className="flex gap-0.5">
            <span className="h-2 w-1 bg-red-500/80" />
            <span className="h-2 w-1 bg-red-500/80" />
            <span className="h-2 w-1 bg-red-500/80" />
            <span className="h-2 w-1 bg-red-500/30" />
          </span>
        </footer>
      </div>
    </div>
  )
}
