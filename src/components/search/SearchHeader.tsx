'use client'

import { useRouter } from 'next/navigation'
import SearchForm from './SearchForm'
import CloseIcon from 'i/icon_close_bold.svg'
import SettingIcon from 'i/icon_setting.svg'
import Button from '../button/Button'
import { useCallback, useContext } from 'react'
import { bottomSheetContext } from '@/src/providers/BottomSheetProvider'
import { BOTTOMSHEET_TYPE } from '@/src/constants/bottomSheet.constant'
import SearchFilters from './SearchFilters'
import { searchContext } from '@/src/providers/SearchProvider'

export default function SearchHeader() {
  const { openBottomSheet } = useContext(bottomSheetContext)
  const { searchFilters } = useContext(searchContext)
  const { back } = useRouter()

  const openSearchFilterBottomSheet = useCallback(() => {
    openBottomSheet(BOTTOMSHEET_TYPE.BOTTOMSHEET_SEARCH_FILTER)
  }, [])

  return (
    <section className="w-full flex flex-col gap-1 px-2">
      <div className="w-full flex items-center gap-1">
        <CloseIcon className="shrink-0 grow-0 cursor-pointer fill-@-neutral-900" onClick={back} />
        <SearchForm />
        <Button
          icon={() => SettingIcon({ className: 'fill-@-neutral-400' })}
          className="button-secondary w-auto h-9 typograph-14 p-2"
          onClick={openSearchFilterBottomSheet}
        />
      </div>
      {Boolean(searchFilters?.length) && <SearchFilters />}
    </section>
  )
}
