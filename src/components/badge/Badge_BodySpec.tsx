'use client'

import Badge from './Badge'

export default function Badge_BodySpec({ height, weight }: { height?: number; weight?: number }) {
  return (
    <Badge
      text={'신체스펙' + '<strong>' + `${height || '???'}cm/${weight || '???'}kg` + '</strong>'}
      className="px-3 rounded-[14px] gap-1 max-w-[180px]"
    />
  )
}
