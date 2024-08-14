'use client'

import { BOTTOMSHEET_TYPE } from '@/src/constants/bottomSheet.constant'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'
import { useContext, useMemo } from 'react'
import BottomSheet_SearchOptions from './search/BottomSheet_SearchOptions'

export default function BottomSheetSwitch() {
  const { bottomSheetType } = useContext(bottomSheetContext)

  const bottomSheetSwitch = useMemo(() => {
    switch (bottomSheetType) {
      case BOTTOMSHEET_TYPE.BOTTOMSHEET_SEARCH_FILTER:
        return <BottomSheet_SearchOptions />
      default:
        return <></>
    }
  }, [bottomSheetType])

  return <>{bottomSheetSwitch}</>
}
