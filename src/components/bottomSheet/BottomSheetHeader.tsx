'use client'

import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'
import CloseIcon from 'i/icon_close_bold.svg'
import { useContext } from 'react'

export default function BottomSheetHeader({ title }: { title?: string }) {
  const { closeBottomSheet } = useContext(bottomSheetContext)

  return (
    <section className="bottom-sheet-header">
      <CloseIcon onClick={closeBottomSheet} className="absolute left-0 cursor-pointer" />
      {title && <h3 className="typograph-16 font-bold whitespace-pre-wrap">{title}</h3>}
    </section>
  )
}
