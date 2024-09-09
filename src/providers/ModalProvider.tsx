'use client'

import ModalSwitch from 'components/modal/ModalSwitch'
import { ModalType } from 'constants/modal.constant'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { ModalMetadata } from 'types/modal.types'

export const modalContext = createContext<{
  modalType: ModalType
  modalData: any
  modalMetadata: ModalMetadata
  openModal: (type: ModalType, data?: any, metadata?: ModalMetadata) => void
  closeModal: () => void
  setModalMetadata: Dispatch<SetStateAction<ModalMetadata>>
}>(null)

export default function ModalProvider({ children }) {
  const metadataRef = useRef<ModalMetadata>(null)
  /**
   * 현재 오픈된 모달
   */
  const [modalType, setModalType] = useState<ModalType>(null)
  const [modalData, setModalData] = useState<any>(null)

  const setModalMetadata = useCallback((metadata: ModalMetadata) => {
    metadataRef.current = metadata
  }, [])

  const openModal = useCallback(
    (type: ModalType, data?: any, medatada?: ModalMetadata) => {
      setModalType(type)
      setModalData(data)
      setModalMetadata(medatada)
    },
    [setModalMetadata]
  )

  const closeModal = useCallback(() => {
    if (!metadataRef.current?.close || metadataRef.current?.close.condition) setModalType(null)
    else {
      if (window.confirm(metadataRef.current?.close.message || '정말로 나가시겠습니까?')) {
        setModalType(null)
        setModalData(null)
        setModalMetadata(null)
      }
    }
  }, [setModalMetadata])

  /// 모달이 열려있을 때 스크롤 방지 ///
  useLayoutEffect(() => {
    if (!modalType) return
    else {
      document.body.classList.add('overflow-hidden')
      return () => document.body.classList.remove('overflow-hidden')
    }
  }, [modalType])

  return (
    <modalContext.Provider
      value={{
        modalType,
        modalData,
        modalMetadata: metadataRef.current,
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
