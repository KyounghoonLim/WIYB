'use client'

import { ListItemProps } from 'types/components/list/list.interface'
import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import { CommunityPost } from 'types/community.types'

export default function ListItem_Community({ item: post }: ListItemProps<CommunityPost>) {
  return (
    <MyLink
      href={
        post
          ? PATH.COMMUNITY +
            PATH_PARAMS.COMMUNITY.replace('[communityType]', post.category) +
            PATH_PARAMS.COMMUNITY_POST.replace('[postId]', post.id)
          : '#'
      }
      className={clsx('list-item justify-between h-[90px]')}
    >
      <div className="w-[calc(100%-76px)] h-full flex flex-col gap-[6px] no-auto-size">
        {post ? (
          <>
            {/* title */}
            <div className="flex-row-start typograph-14 text-nowrap gap-1">
              <h3 className="truncate">{post?.title}</h3>
              <p className="text-text-comment">{`[${post?.commentCount}]`}</p>
            </div>
            {/* detail */}
            <div className="max-w-[300px] h-full flex flex-col justify-between typograph-12 text-text-label-000">
              <p>14시간 전</p>
              <p className="truncate">{post?.user?.nickname}</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-[14px] skeleton" />
            <div className="w-full h-full flex flex-col justify-between">
              <div className="h-[14px] skeleton" />
              <div className="h-[14px] skeleton" />
            </div>
          </>
        )}
      </div>
      <Thumbnail_Primary src={post?.images?.[0]} width={64} className="rounded-sm" />
    </MyLink>
  )
}
