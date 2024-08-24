'use client'

import React, { useMemo, useState } from 'react'
import { Review } from 'types/review.types'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import { ListItemProps } from 'types/components/list/list.interface'
import clsx from 'clsx'
import Badge_Handy from 'components/badge/Badge_Handy'
import Badge_BodySpec from 'components/badge/Badge_BodySpec'
import Button_Like from 'components/button/Button_Like'

export default function ListItem_Review({ item: review }: ListItemProps<Review>) {
  const [like, setLike] = useState<boolean>(false)

  const user = useMemo(() => {
    return review?.user
  }, [review])

  return (
    <div className={clsx('list-item flex-col items-start gap-3 p-6')}>
      <div className="w-full h-[65px] flex-row-start gap-3">
        <Thumbnail_Profile src={user?.imageUrl} width={56} />
        <div className="w-full flex flex-col gap-[6px]">
          {review ? (
            <>
              <h3 className="typograph-16 font-semibold">{user?.nickname}</h3>
              <div className="flex gap-1">
                <Badge_Handy {...{ ...user }} />
                <Badge_BodySpec {...{ ...user }} />
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
          <p className="typograph-16">{review?.content}</p>
        </>
      ) : (
        <>
          <div className="h-4 skeleton" />
          <div className="h-4 skeleton w-half" />
        </>
      )}
      {Boolean(review?.imageUrls?.length) && (
        <div className="w-full flex-row-start gap-3 pt-3 pb-4 overflow-auto hide-scrollbar">
          {review.imageUrls.map((imageUrl) => (
            <Thumbnail_Primary key={imageUrl} src={imageUrl} width={80} className="rounded-lg" />
          ))}
        </div>
      )}
      {review && (
        <div className="w-full flex justify-between items-center">
          <span className="typograph-14 text-text-label-100">3 시간 전</span>
          <Button_Like like={like} onClick={() => setLike(!like)} />
        </div>
      )}
    </div>
  )
}
