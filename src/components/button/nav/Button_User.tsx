'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import { PATH } from 'constants/path.constant'
import useDropdown from 'hooks/dropdown/useDropdown'
import { usePathname } from 'next/navigation'
import { userContext } from 'providers/UserProvider'
import { useContext } from 'react'

export default function Button_User() {
  const { user, manualLogout } = useContext(userContext)
  const pathname = usePathname()

  const { dropdownRef, Dropdown } = useDropdown([
    {
      label: '내 프로필',
      onClick: () => {
        window.alert('개발중입니다!')
      },
    },
    {
      label: '로그아웃',
      onClick: manualLogout,
      className: 'text-red-500',
    },
  ])

  return (
    <>
      {user ? (
        <button ref={dropdownRef} className="flex-row-center gap-[10px] p-[10px]">
          <Thumbnail_Profile src={user.imageUrl} width={32} />
          {user.nickname}
          <Dropdown />
        </button>
      ) : (
        <MyLink href={PATH.LOGIN} className={clsx('p-4', pathname === PATH.LOGIN && 'font-bold')}>
          로그인
        </MyLink>
      )}
    </>
  )
}
