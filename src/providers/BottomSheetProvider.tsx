'use client'

import { createContext, useCallback, useState } from 'react'
import {
  BOTTOMSHEET_ANIMATION_DURATION,
  BOTTOMSHEET_STATE,
  BottomsheetState,
  BottomSheetType,
} from '../constants/bottomSheet.constant'
import useCaptureHistoryBack from '../hooks/useCaptureHistoryBack'
import BottomSheetSwitch from '../components/bottomSheet/BottomSheetSwitch'

export const bottomSheetContext = createContext<{
  bottomSheetType: BottomSheetType
  bottomSheetState: BottomsheetState
  openBottomSheet: (type: BottomSheetType) => Promise<void>
  closeBottomSheet: () => Promise<void>
}>(null)

export default function BottomSheetProvider({ children }) {
  /**
   * 현재 랜더링 되어있는 바텀시트를 표현
   */
  const [bottomSheetType, setBottomSheetType] = useState<BottomSheetType>(null)
  /**
   * 바텀시트의 애니메이션 상태를 표현
   */
  const [bottomSheetState, setBottomSheetState] = useState<BottomsheetState>(null)

  const openBottomSheet = useCallback(
    (type: BottomSheetType): Promise<void> => {
      return new Promise(async (resolve) => {
        if (bottomSheetType) await closeBottomSheet()
        setBottomSheetType(type)
        setBottomSheetState(BOTTOMSHEET_STATE.OPEN)
        resolve()
      })
    },
    [bottomSheetType]
  )

  const closeBottomSheet = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      setBottomSheetState(BOTTOMSHEET_STATE.CLOSE)
      setTimeout(() => {
        setBottomSheetType(null)
        resolve()
      }, BOTTOMSHEET_ANIMATION_DURATION)
    })
  }, [])

  /**
   * 바텀시트가 열려있을 때 back 버튼을 눌렸을 때 바텀시트를 끄기 위해
   */
  useCaptureHistoryBack(closeBottomSheet, Boolean(bottomSheetType))

  return (
    <bottomSheetContext.Provider
      value={{
        bottomSheetType,
        bottomSheetState,
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
      <BottomSheetSwitch />
    </bottomSheetContext.Provider>
  )
}
