'use client'

import ModalSwitch from 'components/modal/ModalSwitch'
import { ModalType } from 'constants/modal.constant'
import { createContext, Dispatch, SetStateAction, useCallback, useState } from 'react'
import { ModalMetadata } from 'types/modal.types'

export const modalContext = createContext<{
  modalType: ModalType
  modalData: any
  openModal: (type: ModalType, data?: any, metadata?: ModalMetadata) => void
  closeModal: () => void
  setModalMetadata: Dispatch<SetStateAction<ModalMetadata>>
}>(null)

export default function ModalProvider({ children }) {
  /**
   * 현재 오픈된 모달
   */
  const [modalType, setModalType] = useState<ModalType>(null)
  const [modalData, setModalData] = useState<any>(null)
  const [modalMetadata, setModalMetadata] = useState<ModalMetadata>(null)

  const openModal = useCallback((type: ModalType, data?: any, medatada?: ModalMetadata) => {
    setModalType(type)
    setModalData(data)
    setModalMetadata(medatada)
  }, [])

  const closeModal = useCallback(() => {
    if (!modalMetadata?.close || modalMetadata.close.condition) setModalType(null)
    else {
      if (window.confirm(modalMetadata.close.message || '정말로 나가시겠습니까?')) {
        setModalType(null)
      }
    }
  }, [modalMetadata])

  return (
    <modalContext.Provider
      value={{
        modalType,
        modalData,
        openModal,
        closeModal,
        setModalMetadata,
      }}
    >
      {children}
      <ModalSwitch />
    </modalContext.Provider>
  )
}
