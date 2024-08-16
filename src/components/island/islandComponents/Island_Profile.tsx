'use client'

import Island from '@/src/components/island/Island'
import React from 'react'
import dynamic from 'next/dynamic'
import { CardUserPrimary_Skeleton } from 'comp/card/UserCardPrimary'

const CardUserPrimary = dynamic(() => import('comp/card/UserCardPrimary'), {
  loading: () => <CardUserPrimary_Skeleton />,
  ssr: false,
})

/// 유저 프로필 섹션 ///
export default function Island_Profile() {
  return (
    <Island className="bg-transparent p-0">
      <CardUserPrimary />
    </Island>
  )
}
