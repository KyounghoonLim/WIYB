'use client'

import { useCallback, useContext } from 'react'
import Button from '../../button/Button'
import BottomSheetContainer from '../BottomSheetContainer'
import BottomSheet_SearchOptions_BrandFilter from './BottomSheet_SearchOptions_BrandFilter'
import BottomSheet_SearchOptions_Engine from './BottomSheet_SearchOptions_Engine'
import BottomSheet_SearchOptions_EquipTypeFilter from './BottomSheet_SearchOptions_EquipTypeFilter'
import BottomSheet_SearchOptions_Sort from './BottomSheet_SearchOptions_Sort'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'
import RestoreIcon from 'i/icon_restore.svg'
import { searchContext } from '@/src/providers/SearchProvider'

export default function BottomSheet_SearchOptions() {
  const { setSearchFilters } = useContext(searchContext)
  const { closeBottomSheet } = useContext(bottomSheetContext)

  const clickHandler = useCallback(() => setSearchFilters([]), [])

  return (
    <BottomSheetContainer title="검색 옵션">
      <div className="w-full flex-col-center gap-6 relative">
        <span
          title="필터 초기화"
          className="flex-col-center typograph-12 text-@-neutral-400 hover:text-@-neutral-500 fill-@-neutral-400 hover:fill-@-neutral-500 absolute top-0 right-0 cursor-pointer"
          onClick={clickHandler}
        >
          <RestoreIcon className="fill-inherit" />
          필터 초기화
        </span>
        <BottomSheet_SearchOptions_Engine />
        <BottomSheet_SearchOptions_Sort />
        <BottomSheet_SearchOptions_BrandFilter />
        <BottomSheet_SearchOptions_EquipTypeFilter />
        <Button
          text="완료"
          onClick={closeBottomSheet}
          className="sticky bottom-0 shadow-lg shadow-[#00000033]"
        />
      </div>
    </BottomSheetContainer>
  )
}
