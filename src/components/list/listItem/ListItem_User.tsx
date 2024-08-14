'use client'

import { ListItemProps, ListProps } from '@/src/@types/components/list/list.interface'
import React from 'react'
import Thumbnail from '../../thumbnail/Thumbnail'
import Bedge from '../../bedge/Bedge'
import { User } from '@/src/@types/user.interface'

export default function ListItem_User({ item: user, index, listing }: ListItemProps<User>) {
  return (
    <div className="list-item">
      {listing && <span className="typograph-16 text-neutral-900">{index + '.'}</span>}
      <Thumbnail
        src={'/images/image_dummy_profile.png'}
        // src={user.imageUrl || "/images/image_dummy_profile.png"}
        width={40}
        className="rounded-[50%]"
      />
      <div className="flex flex-col gap-1">
        <h3 className="typograph-14 font-semibold">{user.nickname || '닉네임'}</h3>
        <div className="flex gap-1">
          <Bedge
            text={
              user?.handy ? `${user.handy}${user.handy > 0 ? '+' : ''}` : '핸디 정보가 없습니다.'
            }
            className="bedge-sm"
          />
          <Bedge
            text={
              user?.height || user?.weight
                ? `${user?.height || '???'}cm/${user?.weight || '???'}kg`
                : '체형 정보가 없습니다.'
            }
            className="bedge-sm"
          />
        </div>
      </div>
    </div>
  )
}
