import Button from '@/src/components/button/Button'
import Portal from '@/src/components/portal/Portal'
import { PATH } from '@/src/constants/path.constant'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Review_Footer({ id }: { id: string }) {
  const { replace } = useRouter()

  return (
    <Portal target="footer">
      <Button
        text="리뷰/평가 등록하기"
        className="w-[343px] bottom-0"
        onClick={() => replace(PATH.EQUIPMENT_REVIEW_FORM.replace('[param1]', id))}
      />
    </Portal>
  )
}
