import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { postCommunityCommentApi, updateCommunityCommentApi } from 'services/communityApi'
import { CommunityComment } from 'types/community.types'
import Form from '../Form'
import Textarea from 'components/textarea/Textarea'

export default function Form_Comment_Reply({
  postId,
  comment,
  setReplies,
  closeReplyMode,
}: {
  postId: string
  comment: CommunityComment
  setReplies: Dispatch<SetStateAction<CommunityComment[]>>
  closeReplyMode: () => void
}) {
  const [content, setContent] = useState<string>('')

  const submitHandler = useCallback(async () => {
    if (!postId || !comment || !content) return
    else if (!content.length) {
      window.alert('댓글을 입력해주세요.')
    } else {
      try {
        const reply = await postCommunityCommentApi(postId, content, comment.id)
        setReplies((temp) => [...temp, reply])
        window.alert('댓글이 작성되었습니다.')
        closeReplyMode()
      } catch {
        window.alert('댓글 수정에 실패했습니다.')
      }
    }
  }, [postId, comment, content])

  return (
    <Form onSubmit={submitHandler} className="gap-2">
      <Textarea
        value={content}
        onChange={setContent}
        containerClassName="w-full h-auto rounded-xl p-3 border border-[#C8C8C8] border-solid"
        placeholder="댓글을 입력해주세요."
        maxLength={500}
      />
      <div className="flex-row-center self-start gap-2">
        <button type="submit" className="button-secondary">
          작성
        </button>
        <button className="button-secondary text-text-warn" onClick={closeReplyMode}>
          취소
        </button>
      </div>
    </Form>
  )
}
