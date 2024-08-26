'use client'

import clsx from 'clsx'
import CloseIcon from 'icons/icon_close.svg'
import { modalContext } from 'providers/ModalProvider'
import { useContext } from 'react'
import { convertStringToTSX } from 'utils/convertStringToJSX'

export default function ModalHeader({ title, className }: { title?: string; className?: string }) {
  const { closeModal } = useContext(modalContext)

  return (
    <section className={clsx('modal-header font-bold', className)}>
      {title && <h3 className="typograph-16 whitespace-pre-wrap">{convertStringToTSX(title)}</h3>}
      <CloseIcon className="absolute right-0 cursor-pointer" onClick={closeModal} />
    </section>
  )
}
