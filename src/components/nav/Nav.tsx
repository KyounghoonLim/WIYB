'use client'

import { createDummies } from '@/src/services/testApi'

export default function Nav() {
  return (
    <nav id="nav" className="NAV">
      <button className="absolute top-0 right-0" onClick={createDummies}>
        create dummies
      </button>
    </nav>
  )
}
