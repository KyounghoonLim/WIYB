'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const Button_User = dynamic(() => import('components/button/nav/Button_User'), { ssr: false })

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
            href={PATH.EQUIPMENT_POPULAR}
            className={clsx('p-4', pathname.includes(PATH.EQUIPMENT_POPULAR) && 'font-bold')}
          >
            장비
          </MyLink>
          <MyLink
            href={PATH.COMMUNITY}
            className={clsx('p-4', pathname.includes(PATH.COMMUNITY) && 'font-bold')}
          >
            커뮤니티
          </MyLink>
        </section>
        <section className="flex-row-center typograph-16 font-normal">
          {pathname !== PATH.LOGIN && pathname !== PATH.SIGN && <Button_User />}
        </section>
      </div>
    </nav>
  )
}
