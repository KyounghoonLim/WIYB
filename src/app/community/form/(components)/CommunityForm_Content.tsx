'use client'

import Textarea from 'components/textarea/Textarea'

export default function CommunityForm_Content({
  content,
  onChange,
}: {
  content: string
  onChange: (value: string) => void
}) {
  return (
    <label
      htmlFor="community-form-content"
      className="w-full text-text-label-100 flex flex-col gap-3 typograph-16"
    >
      내용
      <Textarea
        id="community-form-content"
        value={content}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        className="h-[450px] text-black placeholder:text-text-label-000"
        maxLength={2000}
      />
    </label>
  )
}
