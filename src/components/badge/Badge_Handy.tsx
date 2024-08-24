'use client'

import Badge from './Badge'

export default function Badge_Handy({ handy }: { handy?: number }) {
  return (
    <Badge
      text={handy ? `${handy}${handy > 0 ? '+' : ''}` : '핸디 정보가 없습니다.'}
      className="px-3 rounded-[14px]"
    />
  )
}
