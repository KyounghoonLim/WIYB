'use client'

import { useCallback, useContext } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import useSearchResources from '@/src/hooks/constant/useSearchResources'
import { Resource_EquipmentType } from '@/src/@types/constant.types'
import useDropdown from '@/src/hooks/dropdown/useDropdown'

export default function BottomSheet_SearchOptions_EquipTypeFilter() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const { equipTypeList } = useSearchResources()
  const { isOpen, changeDropdown, DropDown, DropDownArrow } = useDropdown()

  const isExist = useCallback(
    (item: Resource_EquipmentType) => {
      return searchFilters.includes(item.name) || searchFilters.includes(item.nameKo)
    },
    [searchFilters]
  )

  const clickHandler = useCallback((equipType: Resource_EquipmentType) => {
    setSearchFilters((temp) => {
      if (temp.includes(equipType.name)) return temp.filter((ele) => ele !== equipType.name)
      else return [...temp, equipType.name]
    })
  }, [])

  return (
    <>
      {Boolean(equipTypeList?.length) && (
        <section className={clsx('w-full flex flex-col', isOpen ? 'gap-4' : 'gap-2')}>
          <span className="self-start flex-row-start cursor-pointer" onClick={changeDropdown}>
            <h3 className="typograph-14 text-@-text-label">장비 종류</h3>
            <DropDownArrow width={17} height={17} viewBox="0 0 24 24" />
          </span>
          <DropDown>
            <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
              {equipTypeList.map((equipType) => (
                <Bedge
                  key={equipType.name}
                  text={equipType.nameKo || equipType.name}
                  className={clsx(
                    'cursor-pointer',
                    isExist(equipType) && 'bg-@-button-primary hover:bg-@-button-hover text-white'
                  )}
                  onClick={() => clickHandler(equipType)}
                />
              ))}
            </div>
          </DropDown>
          {!isOpen &&
            (equipTypeList.some(isExist) ? (
              <div className={clsx('w-full flex gap-2 overflow-auto hide-scrollbar')}>
                {equipTypeList
                  .filter((equipType) => isExist(equipType))
                  .map((equipType) => (
                    <Bedge
                      key={equipType.name}
                      text={equipType.nameKo || equipType.name}
                      className="cursor-pointer bg-@-button-primary hover:bg-@-button-hover text-white"
                      onClick={() => clickHandler(equipType)}
                    />
                  ))}
              </div>
            ) : (
              <span className="typograph-14 text-@-text-label">선택된 장비 종류가 없습니다.</span>
            ))}
        </section>
      )}
    </>
  )
}
