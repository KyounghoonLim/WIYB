'use client'

import Button_Primary from '../Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'
import { useCallback, useContext } from 'react'
import clsx from 'clsx'
import { userContext } from 'providers/UserProvider'

export default function Button_Community_Post({ className }: { className?: string }) {
  const { userRequiredAction } = useContext(userContext)

  const clickHandler = useCallback(() => {
    userRequiredAction(() => {
      window.alert('개발중입니다!')
    })
  }, [userRequiredAction])

  return (
    <Button_Primary
      icon={() => ReviewIcon({ className: 'fill-white' })}
      text="커뮤니티 글 작성하기"
      className={clsx('w-[212px] h-[44px] rounded-lg text-nowrap', className)}
      onClick={clickHandler}
    />
  )
}
