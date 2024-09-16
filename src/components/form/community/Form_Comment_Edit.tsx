import { useCallback, useState } from 'react'
import { updateCommunityCommentApi } from 'services/communityApi'
import { CommunityComment } from 'types/community.types'
import Form from '../Form'
import Textarea from 'components/textarea/Textarea'

export default function Form_Comment_Edit({
  postId,
  comment,
  renderedContent,
  setRenderedContent,
  closeEditMode,
}: {
  postId: string
  comment: CommunityComment
  renderedContent: string
  setRenderedContent: (value: string) => void
  closeEditMode: () => void
}) {
  const [content, setContent] = useState<string>(renderedContent)

  const submitHandler = useCallback(async () => {
    if (!postId || !comment || comment.content === content) return
    else if (!content.length) {
      window.alert('댓글을 입력해주세요.')
    } else {
      try {
        await updateCommunityCommentApi(postId, comment.id, content)
        setRenderedContent(content)
        window.alert('댓글이 수정되었습니다.')
        closeEditMode()
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
        maxLength={500}
      />
      <div className="flex-row-center self-start gap-2">
        <button type="submit" className="button-secondary">
          수정
        </button>
        <button className="button-secondary text-text-warn" onClick={closeEditMode}>
          취소
        </button>
      </div>
    </Form>
  )
}
