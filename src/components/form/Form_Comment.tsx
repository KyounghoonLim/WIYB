'use client'

import Textarea from 'components/textarea/Textarea'
import Form from './Form'
import { useCallback, useContext, useState } from 'react'
import { userContext } from 'providers/UserProvider'
import Button_Primary from 'components/button/Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'
import { postCommunityCommentApi } from 'services/communityApi'

export default function Form_Comment({
  postId,
  commentId,
}: {
  postId: string
  commentId?: string
}) {
  const { user, userRequiredAction } = useContext(userContext)
  const [comment, setComment] = useState<string>('')

  const submitHandler = useCallback(() => {
    if (!comment) {
      window.alert('댓글을 입력해주세요.')
    } else {
      userRequiredAction(async () => {
        try {
          await postCommunityCommentApi(postId, comment, commentId)
          window.alert('댓글을 작성했습니다.')
          location.reload()
        } catch {
          window.alert('댓글 작성에 실패했습니다.')
        }
      })
    }
  }, [postId, comment, userRequiredAction])

  return (
    <Form onSubmit={submitHandler} className="p-4 gap-3">
      <Textarea
        value={comment}
        onChange={setComment}
        onFocus={() => userRequiredAction}
        placeholder={user ? '댓글을 입력해주세요.' : '로그인이 필요합니다.'}
        containerClassName="w-full h-[200px] bg-[#FAFAFA] border border-[#C8C8C8] border-solid p-4"
      />
      <div className="w-full h-16 flex justify-end items-center">
        <Button_Primary
          type="submit"
          icon={() => ReviewIcon({ className: 'fill-white' })}
          text="댓글 쓰기"
          className="w-[135px] h-[44px] rounded-lg"
        />
      </div>
    </Form>
  )
}
