'use client'

import { searchContext } from '@/src/providers/SearchProvider'
import { useContext, useMemo } from 'react'
import Button from '../../button/Button'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'

export default function BottomSheet_SearchOptions_Button() {
  const { searchKeyword, goToSearch } = useContext(searchContext)
  const { closeBottomSheet } = useContext(bottomSheetContext)

  const isFastSearchable = useMemo(() => searchKeyword.length > 2, [searchKeyword])

  return (
    <Button
      text={isFastSearchable ? '검색' : '적용'}
      onClick={isFastSearchable ? goToSearch : closeBottomSheet}
      className="sticky bottom-0 shadow-lg shadow-[#00000033]"
    />
  )
}
