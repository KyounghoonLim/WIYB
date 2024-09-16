'use client'

import Badge_BodySpec from 'components/badge/Badge_BodySpec'
import Badge_Handy from 'components/badge/Badge_Handy'
import Island from 'components/island/Island'
import LoadingSpinner from 'components/loading/LoadingSpinner'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import useMyQuery from 'hooks/useMyQuery'
import useMyTranslate from 'hooks/useMyTranslate'
import { deleteCommunityPostApi, getCommunityPostDetailApi } from 'services/communityApi'
import ClockIcon from 'icons/icon_clock.svg'
import ViewsIcon from 'icons/icon_views.svg'
import { numberAddComma } from 'utils/numberUtils'
import List_Community_Comments from 'components/list/communityPage/List_Community_Comments'
import Form_Comment from 'components/form/Form_Comment'
import Image from 'next/image'
import { useCallback, useContext } from 'react'
import { userContext } from 'providers/UserProvider'
import MyLink from 'components/link/MyLink'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import { setStorageItem } from 'utils/storageUtils'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'
import { COMMUNITY_CATRGORY } from 'constants/community.constant'

export default function CommunityPostPage({ params: { postId } }) {
  const { user, userRequiredAction } = useContext(userContext)
  const { data: post, isLoading } = useMyQuery([postId], getCommunityPostDetailApi)
  const { t, rt } = useMyTranslate()

  const editClickHandler = useCallback(() => {
    if (!post) return false
    else if (window.confirm('수정 페이지로 이동하시겠습니까?')) {
      setStorageItem(
        STORAGE_TYPE.SESSION,
        STORAGE_KEY.COMMUNITY.LATEST_POST,
        JSON.stringify({ ...post, comments: undefined, author: undefined })
      )
      return true
    } else return false
  }, [post])

  const deleteClickHandler = useCallback(() => {
    userRequiredAction(async () => {
      if (!post) return
      else if (user?.id !== post?.author?.id) {
        window.alert('권한이 없습니다.')
      } else if (window.confirm('게시글을 삭제하시겠습니까?\n삭제된 게시글은 복구되지 않습니다.')) {
        await deleteCommunityPostApi(post.id)
        window.alert('삭제되었습니다.')
        location.href =
          PATH.COMMUNITY +
          PATH_PARAMS.COMMUNITY.replace(
            '[communityCategory]',
            (post?.category as string)?.toLowerCase() || COMMUNITY_CATRGORY.ALL
          )
      }
    })
  }, [user, post])

  return (
    <section className="w-[800px] pt-6 pb-[72px]">
      <Island>
        {isLoading ? (
          <div className="w-full h-[500px] flex-col-center">
            <LoadingSpinner />
          </div>
        ) : post ? (
          <>
            <div className="w-full h-[51px] flex-row-start typograph-16 gap-3">
              <div className="font-bold">{t('community.category.' + post.category)}</div>
              <div className="w-[1px] h-[19px] bg-[#F0F0F0]" />
              <div className="max-w-[600px] flex-row-start gap-1 truncate">
                {post.title}
                <p className="text-text-comment">{`[${post?.commentCount}]`}</p>
              </div>
            </div>
            <div className="w-full h-8 flex-row-start typograph-14 gap-2">
              <Thumbnail_Profile src={post.author?.imageUrl} width={32} className="mr-1" />
              <p>{post.author?.nickname}</p>
              <Badge_Handy handy={post.author?.handy} />
              <Badge_BodySpec weight={post.author?.weight} height={post.author?.height} />
              {user?.id === post.author?.id && (
                <div className="flex-row-center gap-2 ml-auto typograph-14">
                  <MyLink
                    href={PATH.COMMUNITY_FORM}
                    className="text-text-label-100"
                    onClick={editClickHandler}
                  >
                    수정
                  </MyLink>
                  <div className="w-[1px] h-[19px] bg-[#F0F0F0]" />
                  <button className="text-text-warn" onClick={deleteClickHandler}>
                    삭제
                  </button>
                </div>
              )}
            </div>
            <div className="w-full h-[50px] flex justify-between items-center typograph-13 text-text-label-100 border-b border-[#F0F0F0] border-solid">
              <div className="flex-row-start gap-[6px]">
                <ClockIcon />
                {rt(post.createdAt)}
              </div>
              <div className="flex-row-start gap-[6px]">
                <ViewsIcon />
                {numberAddComma(post.viewCount)}
              </div>
            </div>
            <div className="w-full min-h-[300px] flex flex-col gap-4 px-2 py-8 typograph-16 leading-6 border-b border-[#F0F0F0] border-solid">
              {post.imageUrls.map((imageUrl) => (
                <Image
                  key={imageUrl}
                  src={imageUrl}
                  className="!static max-w-[75%]"
                  alt={imageUrl}
                  unoptimized
                  fill
                />
              ))}
              <p className="min-h-[100px]">{post.content}</p>
            </div>
            <div className="w-full flex-col-start">
              <div className="w-full h-14 flex-row-start typograph-16">
                댓글&nbsp;
                <h3 className="font-bold">{post.commentCount} 개</h3>
              </div>
              <List_Community_Comments postId={postId} comments={post.comments} />
              <Form_Comment postId={postId} />
            </div>
          </>
        ) : (
          <></>
        )}
      </Island>
    </section>
  )
}
