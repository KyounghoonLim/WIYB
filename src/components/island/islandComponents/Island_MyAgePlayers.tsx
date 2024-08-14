import Island from '@/src/components/island/Island'
import React from 'react'
import UserCardSecondary from 's/components/card/UserCardSecondary'
import Carousel from 's/components/carousel/Carousel'

export default function Island_MyAgePlayers() {
  return (
    <Island className="bg-transparent px-0">
      <div className="w-full flex justify-between items-center">
        <h3 className="typograph-16">
          나와 <strong className="font-semibold">비슷한 연령대의 플레이어</strong>는?
        </h3>
        <span className="typograph-12 text-@-text-label cursor-pointer">더보기</span>
      </div>
      <Carousel
        name="similar-users"
        items={Array(10).fill(true)}
        renderFunction={UserCardSecondary}
      />
    </Island>
  )
}
