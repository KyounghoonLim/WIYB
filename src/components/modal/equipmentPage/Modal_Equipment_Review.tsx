'use client'

import { useCallback } from 'react'
import Modal from '../Modal'
import ModalHeader from '../ModalHeader'
import Form_Review from 'components/form/Form_Review'

export default function Modal_Equipment_Review() {
  const Modal_Equipment_Review_Header = useCallback(() => {
    return (
      <ModalHeader
        title="<strong>평가 점수/리뷰</strong>작성하기"
        className="font-normal justify-start"
      />
    )
  }, [])

  return (
    <Modal HeaderComponent={Modal_Equipment_Review_Header}>
      <Form_Review />
    </Modal>
  )
}
