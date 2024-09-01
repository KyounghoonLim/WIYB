'use client'

import LikeIcon from 'icons/icon_like.svg'
import DisLikeIcon from 'icons/icon_dislike.svg'

import clsx from 'clsx'
import { useCallback } from 'react'

export default function Button_Like({
  isLiked,
  className,
  onClick,
}: {
  isLiked: boolean
  className?: string
  onClick?: () => any
}) {
  return (
    <button
      className={clsx(
        'flex-row-center gap-1 typograph-14',
        isLiked ? 'font-bold text-[#FE4545]' : 'text-text-label-100',
        className
      )}
      onClick={onClick}
    >
      {isLiked ? <LikeIcon className="no-auto-size" /> : <DisLikeIcon className="no-auto-size" />}
      좋아요
    </button>
  )
}
