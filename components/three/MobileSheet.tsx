'use client'

import { useRef } from 'react'

// A downward swipe on the handle longer than this closes the sheet (px)
const SWIPE_CLOSE_DISTANCE = 60

type MobileSheetProps = {
  label: string
  onClose: () => void
  children: React.ReactNode
}

// Compact layout: the info card slides up from the bottom, above the section bar,
// instead of hanging next to its panel in the scene
export function MobileSheet({ label, onClose, children }: MobileSheetProps) {
  const swipeStart = useRef<number | null>(null)

  return (
    <section
      aria-label={label}
      className="absolute inset-x-0 bottom-14 z-30 flex max-h-[55%] flex-col [@media(max-height:499px)]:max-h-[45%] duration-300 animate-in slide-in-from-bottom motion-reduce:animate-none"
    >
      {/* The whole strip is the close button: the visible bar alone is too thin to aim at */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="group flex h-7 w-full shrink-0 touch-none items-center justify-center"
        onTouchStart={(e) => (swipeStart.current = e.touches[0].clientY)}
        onTouchEnd={(e) => {
          if (swipeStart.current !== null && e.changedTouches[0].clientY - swipeStart.current > SWIPE_CLOSE_DISTANCE) {
            onClose()
          }
          swipeStart.current = null
        }}
      >
        <span aria-hidden className="h-1.5 w-14 rounded-full bg-zinc-400/70 transition-colors group-hover:bg-zinc-200" />
      </button>
      <div className="overflow-y-auto overscroll-contain px-2 pb-2">{children}</div>
    </section>
  )
}
