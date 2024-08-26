'use client'

import Portal from 'components/portal/Portal'
import ModalHeader from './ModalHeader'
import { FC, ReactNode, SyntheticEvent, useCallback, useContext } from 'react'
import { modalContext } from 'providers/ModalProvider'

export default function Modal({
  children,
  HeaderComponent = ModalHeader,
}: {
  children: ReactNode
  HeaderComponent?: FC
}) {
  const { closeModal } = useContext(modalContext)

  const backgroundClickHandler = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation()
      if (!(e.target as HTMLElement)?.dataset?.['modalBackground']) return
      else closeModal()
    },
    [closeModal]
  )

  return (
    <Portal target="modal">
      <div className="modal-background" onClick={backgroundClickHandler} data-modal-background>
        <dialog className="modal-container">
          <HeaderComponent />
          <section className="modal-body">{children}</section>
        </dialog>
      </div>
    </Portal>
  )
}
