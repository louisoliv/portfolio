'use client'

import { useEffect, useState } from 'react'

// Phones (portrait or landscape) and small windows: cards move to a bottom sheet
// and a section bar replaces clicking on panels that may be off screen
const COMPACT_QUERY = '(max-width: 767px), (max-height: 499px)'

// Browser only (the scene never renders on the server)
export const isCompactScreen = () => window.matchMedia(COMPACT_QUERY).matches

export function useCompactLayout() {
  const [compact, setCompact] = useState(isCompactScreen)
  useEffect(() => {
    const query = window.matchMedia(COMPACT_QUERY)
    setCompact(query.matches)
    const onChange = (e: MediaQueryListEvent) => setCompact(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return compact
}
