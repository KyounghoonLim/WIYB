'use client'

import MyLink from 'components/link/MyLink'
import { PATH } from 'constants/path.constant'
import { useContext } from 'react'

export default function Nav() {
  return (
    <nav className="NAV">
      <div className="NAV-CONTENT">
        {/* 링크 섹션 */}
        <section className="flex-row-center typograph-16 font-normal">
          <MyLink href={PATH.MAIN} className="p-4">
            WIYB
          </MyLink>
          <MyLink href={PATH.EQUIPMENT_LIST} className="p-4">
            장비
          </MyLink>
          <MyLink href={PATH.COMMUNITY} className="p-4">
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
