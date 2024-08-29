'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="NAV">
      <div className="NAV-CONTENT">
        {/* 링크 섹션 */}
        <section className="flex-row-center typograph-16 font-normal">
          <MyLink href={PATH.MAIN} className={clsx('p-4', pathname === PATH.MAIN && 'font-bold')}>
            WIYB
          </MyLink>
          <MyLink
            href={PATH.POPULAR}
            className={clsx('p-4', pathname === PATH.POPULAR && 'font-bold')}
          >
            장비
          </MyLink>
          <MyLink
            href={PATH.COMMUNITY}
            className={clsx('p-4', pathname === PATH.COMMUNITY && 'font-bold')}
          >
            커뮤니티
          </MyLink>
        </section>
        {/* <section className="flex-row-center typograph-16 font-normal">
          <MyLink href={PATH.LOGIN} className="p-4">
            로그인해주세요.
          </MyLink>
        </section> */}
      </div>
    </nav>
  )
}
