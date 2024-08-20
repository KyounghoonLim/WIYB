'use client'

import { ReactNode, useCallback } from 'react'
import { createRoot } from 'react-dom/client'

/**
 * jsx 가 아닌 함수 내에서 포탈을 사용
 * @param target id or tagName
 * @returns
 */
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
