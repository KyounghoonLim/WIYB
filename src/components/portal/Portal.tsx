'use client'

import { PortalProps } from 'types/components/portal/portal.interface'
import { useLayoutEffect, useState } from 'react'
import reactDOM from 'react-dom'

export default function Portal({ target, children }: PortalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement>()

  useLayoutEffect(() => {
    setPortalTarget(
      (document.getElementById(target) ||
        document.getElementsByTagName(target)[0] ||
        document.getElementsByName(target)[0]) as HTMLElement
    )
  }, [target])

  return portalTarget ? reactDOM.createPortal(children, portalTarget) : null
}
