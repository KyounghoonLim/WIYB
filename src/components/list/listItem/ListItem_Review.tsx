'use client'

import React, { useMemo } from 'react'
import { Review } from 's/@types/review.types'
import Thumbnail from '../../thumbnail/Thumbnail'
import Bedge from '../../bedge/Bedge'
import { ListItemProps } from '@/src/@types/components/list/list.interface'
import UserThumbnail from '../../thumbnail/UserThumbnail'

export default function ListItem_Review({ item: review, index }: ListItemProps<Review>) {
  const user = useMemo(() => {
    return review?.user
  }, [review])

  return (
    <div className="list-item flex-col items-start gap-5">
      <div className="w-full flex-row-start gap-[6px]">
        <UserThumbnail src={user?.imageUrl} width={40} />
        <div className="w-full flex flex-col gap-1">
          {review ? (
            <>
              <h3 className="typograph-14 font-semibold">{user?.nickname}</h3>
              <div className="flex gap-1">
                <Bedge
                  text={
                    user?.handy
                      ? `${user?.handy}${user?.handy > 0 ? '+' : ''}`
                      : '핸디 정보가 없습니다.'
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
            </>
          ) : (
            <>
              <div className="h-4 skeleton w-half" />
              <div className="h-4 skeleton w-half" />
            </>
          )}
        </div>
      </div>
      {review ? (
        <>
          <p className="typograph-14">{review?.content}</p>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col gap-1">
            <div className="h-4 skeleton w-half" />
            <div className="h-4 skeleton" />
            <div className="h-4 skeleton w-half" />
          </div>
        </>
      )}
      {Boolean(review?.imageUrls?.length) && (
        <div className="w-full flex-row-start gap-2">
          {review.imageUrls.map((imageUrl) => (
            <Thumbnail key={imageUrl} src={imageUrl} width={56} className="rounded-[20px]" />
          ))}
        </div>
      )}
    </div>
  )
}
