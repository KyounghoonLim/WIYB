'use client'

import Badge_BodySpec from 'components/badge/Badge_BodySpec'
import Badge_Handy from 'components/badge/Badge_Handy'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import { CommunityComment } from 'types/community.types'

export default function ListItem_Community_Comment({ item: comment }: { item: CommunityComment }) {
  return (
    <>
      {comment ? (
        <div className="list-item w-full flex-col-start py-6">
          <div className="w-full h-8 flex-row-start gap-2">
            <Thumbnail_Profile src={comment.user.imageUrl} width={32} className="mr-1" />
            <p>{comment.user.nickname}</p>
            <Badge_Handy handy={comment.user.handy} />
            <Badge_BodySpec weight={comment.user.weight} height={comment.user.height} />
          </div>
          <div className="w-full py-3 typograph-16 leading-[22px]">{comment.content}</div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
