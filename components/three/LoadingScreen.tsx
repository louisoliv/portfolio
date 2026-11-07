'use client'

import { useEffect, useState } from 'react'

// Decorative boot sequence: each step is marked OK once the real loading progress passes it
const BOOT_STEP_THRESHOLDS = [0, 15, 45, 75, 100]

export type BootTexts = {
  sequence: string
  title: string
  progressLabel: string
  // One per threshold
  steps: string[]
}

// Plain class join: this screen is in the first JS payload, so no tailwind-merge (no conflicting classes here)
const cx = (...classes: (string | false)[]) => classes.filter(Boolean).join(' ')

const SEGMENTS = 24
const FADE_MS = 700

// The boot sequence lasts at least this long, even when everything is already cached:
// the displayed progress never runs ahead of the real one, nor of this timer
const MIN_BOOT_MS = 2500

// Shared by both screens (the dynamic import placeholder, then the scene's own one)
// so the timer does not restart when the scene takes over
let bootStart: number | null = null

type LoadingScreenProps = {
  // 0 to 100
  progress: number
  texts: BootTexts
  done?: boolean
  // Called once, when the fade-out starts
  onFinished?: () => void
}

// Full-screen overlay shown while the 3D code and the cockpit model load.
// No three.js import: it is also the placeholder of the dynamically imported scene.
export function LoadingScreen({ progress, texts, done = false, onFinished }: LoadingScreenProps) {
  const [elapsed, setElapsed] = useState(0)
  const shown = Math.min(progress, (elapsed / MIN_BOOT_MS) * 100)
  const finished = done && shown >= 100

  // Advance the timer every frame until the sequence is over
  useEffect(() => {
    bootStart ??= performance.now()
    if (finished) return
    let frame = requestAnimationFrame(function tick() {
      setElapsed(performance.now() - bootStart!)
      frame = requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [finished])

  // Stay mounted during the fade-out, then leave the DOM
  const [removed, setRemoved] = useState(false)
  useEffect(() => {
    if (!finished) return
    onFinished?.()
    const timer = setTimeout(() => setRemoved(true), FADE_MS)
    return () => clearTimeout(timer)
  }, [finished, onFinished])

  if (removed) return null

  const rounded = Math.round(shown)
  const filled = Math.round((rounded / 100) * SEGMENTS)

  return (
    <div
      className={cx(
        'absolute inset-0 z-20 flex items-center justify-center bg-black font-mono transition-opacity ease-out motion-reduce:transition-none',
        finished && 'pointer-events-none opacity-0',
      )}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="w-full max-w-md px-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-red-400">
          <span aria-hidden className="mr-2 inline-block size-1.5 bg-red-500 motion-safe:animate-pulse" />
          SEC-00 {'//'} {texts.sequence}
        </p>
        {/* Not a heading: the page h1 is the name, in the text version */}
        <p className="mt-3 text-lg uppercase tracking-[0.2em] text-zinc-100">{texts.title}</p>

        <div
          role="progressbar"
          aria-label={texts.progressLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          className="mt-5 flex gap-1"
        >
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span
              key={i}
              className={cx('h-3 flex-1 transition-colors', i < filled ? 'bg-red-500' : 'bg-red-500/15')}
            />
          ))}
        </div>
        <p className="mt-2 text-right text-xs tabular-nums text-zinc-400">{rounded} %</p>

        <ul className="mt-4 space-y-1.5 text-xs">
          {texts.steps.map((label, i) => {
            const started = rounded >= BOOT_STEP_THRESHOLDS[i]
            // A step is OK once the next one has started (the last one at 100 %)
            const ok = rounded >= (BOOT_STEP_THRESHOLDS[i + 1] ?? 100)
            return (
              <li
                key={label}
                className={cx('flex justify-between gap-4', started ? 'text-zinc-300' : 'text-zinc-700')}
              >
                <span>{label}</span>
                <span className={ok ? 'text-red-400' : 'text-zinc-600'}>{ok ? '[ OK ]' : started ? '[ … ]' : '[    ]'}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
