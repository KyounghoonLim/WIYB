'use client'

import React, { ReactNode, useCallback } from 'react'
import { createRoot } from 'react-dom/client'

export default function usePortal(target: string) {
  const attach = useCallback((children: ReactNode) => {
    const container = document.getElementById(target)

    if (!container) return
    else {
      const portalRoot = createRoot(container)
      portalRoot?.render(children)
    }
  }, [])

  const detach = useCallback(() => {
    const container = document.getElementById(target)

    if (!container) return
    else {
      const portalRoot = createRoot(container)
      portalRoot?.unmount()
    }
  }, [])

  return { attach, detach }
}
