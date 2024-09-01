'use client'

import Button_Primary from '../Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'
import { useCallback, useContext } from 'react'
import { equipmentContext } from 'providers/equipment/EquipmentProvider'
import clsx from 'clsx'
import { modalContext } from 'providers/ModalProvider'
import { MODAL_TYPE } from 'constants/modal.constant'
import { userContext } from 'providers/UserProvider'

export default function Button_Equipment_Review({ className }: { className?: string }) {
  const { userRequiredAction } = useContext(userContext)
  const { equipment } = useContext(equipmentContext)
  const { openModal } = useContext(modalContext)

  const clickHandler = useCallback(() => {
    if (!equipment) return
    else {
      userRequiredAction(() => {
        openModal(MODAL_TYPE.REVIEW, equipment, {
          onSuccess: () => setTimeout(() => location.reload(), 0),
        })
      })
    }
  }, [equipment, userRequiredAction, openModal])

  return (
    <Button_Primary
      icon={() => ReviewIcon({ className: 'fill-white' })}
      text="평가 점수/리뷰 작성하기"
      disabled={!Boolean(equipment)}
      className={clsx('w-full rounded-xl', className)}
      onClick={clickHandler}
    />
  )
}
