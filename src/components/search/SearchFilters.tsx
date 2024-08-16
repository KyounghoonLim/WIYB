'use client'

import { searchContext } from '@/src/providers/SearchProvider'
import { useCallback, useContext, useMemo } from 'react'
import Bedge from '../bedge/Bedge'
import CloseIcon from 'i/icon_close.svg'
import useSearchResources from '@/src/hooks/constant/useSearchResources'
import { Resource_Brand, Resource_EquipmentType } from '@/src/@types/constant.types'

export default function SearchFilters() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const { brandList, equipTypeList } = useSearchResources()

  const filterList = useMemo(
    (): Array<Resource_Brand | Resource_EquipmentType> => [
      ...(brandList || []),
      ...(equipTypeList || []),
    ],
    [brandList, equipTypeList]
  )

  const getLabel = useCallback(
    (name: string) => {
      const selectedItem: Resource_Brand | Resource_EquipmentType = filterList.find(
        (filter) => filter.name === name || filter.nameKo === name
      )

      return selectedItem?.nameKo || selectedItem?.name
    },
    [filterList]
  )

  const removeSearchFilter = useCallback((filter: string) => {
    setSearchFilters((temp) => temp.filter((_filter) => _filter !== filter))
  }, [])

  return (
    <div className="w-full flex-row-start gap-1 overflow-auto hide-scrollbar">
      {searchFilters.map((filter) => (
        <Bedge
          key={filter}
          text={getLabel(filter)}
          className="rounded-3xl bg-@-button-primary text-white pr-2"
        >
          <CloseIcon
            width={18}
            height={18}
            viewBox="0 0 24 24"
            className="cursor-pointer fill-white"
            onClick={() => removeSearchFilter(filter)}
          />
        </Bedge>
      ))}
    </div>
  )
}
