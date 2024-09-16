'use client'

import Input_Primary from 'components/input/Input_Primary'

export default function CommunityForm_Title({
  title,
  onChange,
}: {
  title: string
  onChange: (value: string) => void
}) {
  return (
    <label
      htmlFor="community-form-title"
      className="w-full text-text-label-100 flex flex-col gap-3 typograph-16"
    >
      제목
      <Input_Primary
        id="community-form-title"
        placeholder="제목을 입력해주세요."
        maxLength={100}
        className="bg-bg-light px-6 h-12 rounded-xl placeholder:text-text-label-000"
        value={title}
        onChange={onChange}
      />
    </label>
  )
}
