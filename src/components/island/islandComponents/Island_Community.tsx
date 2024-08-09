import Button from '@/src/components/button/Button'
import Island from '@/src/components/island/Island'
import ListItem_Community from '@/src/components/list/listItem/ListItem_Community'
import React from 'react'
import ListPrimary from '../../list/ListPrimary'

export default function Island_Community() {
  return (
    <Island>
      <div className="w-full flex items-center">
        <h3 className="typograph-16">
          다들 <strong className="font-semibold">어떤 이야기</strong>를 하고 있을까요?
        </h3>
      </div>
      <ListPrimary items={[1, 2, 3, 4, 5]} Component={ListItem_Community} className="mt-4" />
      <Button text="커뮤니티 더 보러 가기" className="mt-2 button-secondary" />
    </Island>
  )
}
