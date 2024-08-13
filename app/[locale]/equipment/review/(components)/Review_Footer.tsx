import Button from '@/src/components/button/Button'
import Portal from '@/src/components/portal/Portal'
import { EquipmentType } from '@/src/constants/equipment.constant'
import { PATH } from '@/src/constants/path.constant'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Review_Footer({ id, type }: { id: string; type: EquipmentType }) {
  const { replace } = useRouter()

  return (
    <Portal target="footer">
      <Button
        text="리뷰/평가 등록하기"
        className="w-[343px] bottom-0"
        onClick={() =>
          replace(PATH.EQUIPMENT_REVIEW_FORM.replace('[param1]', id).replace('[param2]', type))
        }
      />
    </Portal>
  )
}
