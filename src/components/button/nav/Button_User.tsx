'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import { PATH } from 'constants/path.constant'
import { usePathname } from 'next/navigation'
import { userContext } from 'providers/UserProvider'
import { useContext } from 'react'

export default function Button_User() {
  const { user } = useContext(userContext)
  const pathname = usePathname()
  return (
    <>
      {user ? (
        <button className="flex-row-center gap-[10px] p-[10px]">
          <Thumbnail_Profile src={user.imageUrl} width={32} />
          {user.nickname}
        </button>
      ) : (
        <MyLink href={PATH.LOGIN} className={clsx('p-4', pathname === PATH.LOGIN && 'font-bold')}>
          로그인
        </MyLink>
      )}
    </>
  )
}
