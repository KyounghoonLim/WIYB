'use client'

import { BOTTOMSHEET_STATE } from '@/src/constants/bottomSheet.constant'
import Portal from '../portal/Portal'
import { FC, SyntheticEvent, useCallback, useContext, useMemo } from 'react'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'
import clsx from 'clsx'
import BottomSheetHeader from './BottomSheetHeader'
import { BottomSheetContainerProps } from '@/src/@types/components/bottomSheet/bottomSheet.interface'

export default function BottomSheetContainer({ children, title }: BottomSheetContainerProps) {
  const { bottomSheetState, closeBottomSheet } = useContext(bottomSheetContext)

  const bottomSheetAnimation = useMemo(() => {
    switch (bottomSheetState) {
      case BOTTOMSHEET_STATE.OPEN:
        return 'animate-bottomsheet-open'
      default:
        return 'animate-bottomsheet-close'
    }
  }, [bottomSheetState])

  const backgroundClickHandler = useCallback((e: SyntheticEvent) => {
    e.stopPropagation()
    if ((e.target as HTMLElement).id !== 'bottom-sheet-background') return
    else closeBottomSheet()
  }, [])

  return (
    <Portal target="bottom-sheet-portal">
      <div
        id="bottom-sheet-background"
        className="bottom-sheet-background safe-vertical landscape:safe-horizontal"
        onMouseDown={backgroundClickHandler}
      >
        <dialog className={clsx('bottom-sheet-container', bottomSheetAnimation)}>
          <BottomSheetHeader title={title} />
          <section className="bottom-sheet-body">{children}</section>
        </dialog>
      </div>
    </Portal>
  )
}
