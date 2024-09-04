'use client'

import Badge_BodySpec from 'components/badge/Badge_BodySpec'
import Badge_Handy from 'components/badge/Badge_Handy'
import Island from 'components/island/Island'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import useMyQuery from 'hooks/useMyQuery'
import useMyTranslate from 'hooks/useMyTranslate'
import { getPostDetail } from 'services/communityApi'
import ClockIcon from 'icons/icon_clock.svg'
import ViewsIcon from 'icons/icon_views.svg'
import { numberAddComma } from 'utils/numberUtils'
import List_Community_Comments from 'components/list/communityPage/List_Community_Comments'
import Form_Comment from 'components/form/Form_Comment'

export default function CommunityPostPage({ params: { postId } }) {
  const { data: post, isLoading } = useMyQuery([postId], getPostDetail)
  const { t } = useMyTranslate('community.category')

  return (
    <section className="w-[800px] pt-6 pb-[72px]">
      <Island className="rounded-none">
        {isLoading ? (
          <div className="w-full h-[500px] flex-col-center">
            <LoadingSpinner />
          </div>
        ) : post ? (
          <>
            <div className="w-full h-[51px] flex-row-start typograph-16 gap-3">
              <div className="font-bold">{t(post.category)}</div>
              <div className="w-[1px] h-[19px] bg-[#F0F0F0]" />
              <div className="max-w-[600px] flex-row-start gap-1 truncate">
                {post.title}
                <p className="text-text-comment">{`[${post?.commentCount}]`}</p>
              </div>
            </div>
            <div className="w-full h-8 flex-row-start typograph-14 gap-2">
              <Thumbnail_Profile src={post.user.imageUrl} width={32} className="mr-1" />
              <p>{post.user.nickname}</p>
              <Badge_Handy handy={post.user.handy} />
              <Badge_BodySpec weight={post.user.weight} height={post.user.handy} />
            </div>
            <div className="w-full h-[50px] flex justify-between items-center typograph-13 text-text-label-100 border-b border-[#F0F0F0] border-solid">
              <div className="flex-row-start gap-[6px]">
                <ClockIcon />
                {post.createdAt}
              </div>
              <div className="flex-row-start gap-[6px]">
                <ViewsIcon />
                {numberAddComma(post.viewCount)}
              </div>
            </div>
            <div className="w-full px-2 py-8 typograph-16 leading-6 border-b border-[#F0F0F0] border-solid">
              {post.content}
            </div>
            <div className="w-full flex-col-start">
              <div className="w-full h-14 flex-row-start typograph-16">
                댓글&nbsp;
                <h3 className="font-bold">{post.commentCount} 개</h3>
              </div>
              <List_Community_Comments comments={post.comments} />
              <Form_Comment />
            </div>
          </>
        ) : (
          <></>
        )}
      </Island>
    </section>
  )
}
