'use client'

import React, { useContext, useState } from 'react'
import Input from '@/src/components/Input/Input'
import SearchIcon from 'i/icon_search.svg'
import Island from '@/src/components/island/Island'
import useCaptureHistoryBack from '@/src/hooks/useCaptureHistoryBack'
import SearchContainer from '../../search/SearchContainer'
import SearchProvider, { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'

/// 검색 섹션 ///
export default function Island_Search() {
  return (
    <Island className="bg-transparent p-0">
      <Island_Search_Input />
    </Island>
  )
}

function Island_Search_Input() {
  const { searchKeyword, setSearchKeyword } = useContext(searchContext)
  const { bottomSheetType: isBottomSheetRendered } = useContext(bottomSheetContext)
  const [isFocus, setIsFocus] = useState<boolean>(false)

  useCaptureHistoryBack(() => setIsFocus(false), isFocus && !isBottomSheetRendered)

  return (
    <>
      <Input
        value={searchKeyword}
        onChange={setSearchKeyword}
        placeholder="장비, 플레이어를 검색해보세요 🧐"
        className={clsx(
          'placeholder:text-@-text-placeholder-secondary',
          isFocus && 'bg-@-bg-light h-9'
        )}
        icon={SearchIcon}
        maxLength={null}
        onFocus={() => setIsFocus(true)}
      />
      {isFocus && <SearchContainer />}
    </>
  )
}
