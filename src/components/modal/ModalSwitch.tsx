'use client'

import { MODAL_TYPE } from 'constants/modal.constant'
import { modalContext } from 'providers/ModalProvider'
import { useContext } from 'react'
import Modal_Equipment_Review from './equipmentPage/Modal_Equipment_Review'

export default function ModalSwitch() {
  const { modalType } = useContext(modalContext)

  switch (modalType) {
    case MODAL_TYPE.REVIEW:
      return <Modal_Equipment_Review />
  }
}
