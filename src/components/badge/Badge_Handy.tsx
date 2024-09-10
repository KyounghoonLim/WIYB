'use client'

import Badge from './Badge'

export default function Badge_Handy({ handy }: { handy?: number }) {
  return (
    <Badge
      text={'핸디' + '<strong>' + (handy ? `${handy}${handy > 0 ? '+' : ''}` : '???') + '</strong>'}
      className="px-3 rounded-[14px] gap-1"
    />
  )
}
