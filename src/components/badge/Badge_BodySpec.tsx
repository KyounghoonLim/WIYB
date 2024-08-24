'use client'

import Badge from './Badge'

export default function Badge_BodySpec({ height, weight }: { height?: number; weight?: number }) {
  return (
    <Badge
      text={
        height || weight ? `${height || '???'}cm/${weight || '???'}kg` : '체형 정보가 없습니다.'
      }
      className="px-3 rounded-[14px]"
    />
  )
}
