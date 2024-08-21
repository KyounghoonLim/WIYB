'use client'

import { ReactNode, useCallback, useRef } from 'react'
import { createRoot, Root } from 'react-dom/client'

/**
 * jsx 가 아닌 함수 내에서 포탈을 사용
 * @param target id or tagName
 * @returns
 */
export default function usePortal(target: string) {
  const rootRef = useRef<Root>()

  const attach = useCallback((children: ReactNode) => {
    try {
      const root =
        rootRef.current ||
        (() => {
          const container = document.getElementById(target)
          const portalRoot = createRoot(container)
          rootRef.current = portalRoot
          return portalRoot
        })()

      if (!root) return
      else {
        root?.render(children)
      }
    } catch {
      /// pass
    }
  }, [])

  const detach = useCallback(() => {
    try {
      const root =
        rootRef.current ||
        (() => {
          const container = document.getElementById(target)
          const portalRoot = createRoot(container)
          rootRef.current = portalRoot
          return portalRoot
        })()

      if (!root) return
      else {
        root?.unmount()
      }
    } catch {
      /// pass
    }
  }, [])

  return { attach, detach }
}
