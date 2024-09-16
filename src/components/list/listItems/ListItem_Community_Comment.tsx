'use client'

import Badge_BodySpec from 'components/badge/Badge_BodySpec'
import Badge_Handy from 'components/badge/Badge_Handy'
import Form_Comment_Edit from 'components/form/community/Form_Comment_Edit'
import Form_Comment_Reply from 'components/form/community/Form_Comment_Reply'
import Thumbnail_Profile from 'components/thumbnail/Thumbnail_Profile'
import useThrottle from 'hooks/useThrottle'
import { userContext } from 'providers/UserProvider'
import { useCallback, useContext, useMemo, useState } from 'react'
import { deleteCommunityCommentApi } from 'services/communityApi'
import { CommunityComment } from 'types/community.types'
import { ListItemProps } from 'types/components/list/list.interface'
import List_Primary from '../List_Primary'
import clsx from 'clsx'

export default function ListItem_Community_Comment({
  item: comment,
  postId,
}: ListItemProps<CommunityComment>) {
  const { user, userRequiredAction } = useContext(userContext)

  const { throttling } = useThrottle(true)

  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [isReplyMode, setIsReplyMode] = useState<boolean>(false)
  const [commentContent, setCommentContent] = useState<string>(comment?.content || '')
  const [commentReplies, setCommentReplies] = useState<CommunityComment[]>(comment?.replies)

  const replyClickHandler = useCallback(() => {
    userRequiredAction(() => {
      if (isEditMode) {
        if (
          window.confirm(
            '댓글을 수정중입니다.\n댓글 기능을 사용할 시 수정중인 내용은 사라집니다.\n정말 하시겠습니까?'
          )
        ) {
          setIsEditMode(false)
          setIsReplyMode((temp) => !temp)
        }
      } else setIsReplyMode((temp) => !temp)
    })
  }, [userRequiredAction, isEditMode])

  const editClickHandler = useCallback(() => {
    if (!user) return
    else {
      if (isReplyMode) {
        if (
          window.confirm(
            '댓글을 작성중입니다.\n수정 기능을 사용할 시 작성중인 내용은 사라집니다.\n정말 하시겠습니까?'
          )
        ) {
          setIsReplyMode(false)
          setIsEditMode((temp) => !temp)
        }
      } else setIsEditMode((temp) => !temp)
    }
  }, [user, isReplyMode])

  const deleteClickHandler = useCallback(() => {
    if (!user || !comment || !postId) return
    else {
      try {
        if (window.confirm('정말 삭제하시겠습니까?\n삭제된 댓글은 복구되지 않습니다.')) {
          throttling(async () => {
            await deleteCommunityCommentApi(postId, comment.id)
            window.alert('삭제되었습니다.')
            location.reload()
          })
        }
      } catch {
        window.alert('삭제에 실패했습니다.')
      }
    }
  }, [user, comment, postId])

  return (
    <>
      {comment ? (
        <div
          className={clsx('list-item w-full flex-col-start', comment?.replyTo ? 'py-2' : 'py-6')}
        >
          {comment?.deletedAt ? (
            <></>
          ) : (
            <div
              className={clsx(
                'w-full h-8 flex-row-start gap-2 relative',
                comment?.replyTo &&
                  'before:h-full before:flex-row-center before:content-["↳"] before:absolute before:left-[-20px] before:text-neutral-400'
              )}
            >
              <Thumbnail_Profile src={comment.author?.imageUrl} width={32} className="mr-1" />
              <p>{comment.author?.nickname}</p>
              <Badge_Handy handy={comment.author?.handy} />
              <Badge_BodySpec weight={comment.author?.weight} height={comment.author?.height} />
              {user?.id === comment.author?.id && (
                <div className="flex-row-center gap-2 ml-auto typograph-14">
                  <button className="text-text-label-100" onClick={editClickHandler}>
                    수정
                  </button>
                  <div className="w-[1px] h-[19px] bg-[#F0F0F0]" />
                  <button className="text-text-warn" onClick={deleteClickHandler}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="w-full">
            {isEditMode ? (
              <Form_Comment_Edit
                postId={postId}
                comment={comment}
                renderedContent={commentContent}
                setRenderedContent={setCommentContent}
                closeEditMode={() => setIsEditMode(false)}
              />
            ) : (
              <p className="py-3 typograph-16 leading-[22px]">{commentContent}</p>
            )}
          </div>
          <>
            {comment?.replyTo || isEditMode ? (
              <></>
            ) : isReplyMode ? (
              <Form_Comment_Reply
                postId={postId}
                comment={comment}
                setReplies={setCommentReplies}
                closeReplyMode={() => setIsReplyMode(false)}
              />
            ) : (
              <button
                className="text-text-label-100 typograph-14 self-start my-2"
                onClick={replyClickHandler}
              >
                댓글 쓰기
              </button>
            )}
          </>
          <>
            {comment?.replyTo || !Boolean(commentReplies?.length) ? (
              <></>
            ) : (
              <List_Primary
                items={commentReplies}
                Component={({ item, index }) => ListItem_Community_Comment({ item, index, postId })}
                className="pl-8 py-2 border-t border-solid border-neutral-100"
              />
            )}
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
