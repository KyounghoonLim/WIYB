'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import ArrowIcon from 'icons/icon_arrow_thin.svg'

export default function Button_SeeMore({ href, className }: { href: string; className?: string }) {
  return (
    <MyLink href={href} className={clsx('flex-row-center gap-1', className)}>
      <p className="typograph-12 text-text-label-100">더 보기</p>
      <ArrowIcon />
    </MyLink>
  )
}
