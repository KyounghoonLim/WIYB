'use client'

import { useCallback, useContext } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import useSearchResources from '@/src/hooks/constant/useSearchResources'
import { Resource_Brand } from '@/src/@types/constant.types'
import useDropdown from '@/src/hooks/dropdown/useDropdown'

export default function BottomSheet_SearchOptions_BrandFilter() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const { brandList } = useSearchResources()
  const { isOpen, changeDropdown, DropDown, DropDownArrow } = useDropdown()

  const isExist = useCallback(
    (item: Resource_Brand) => {
      return searchFilters.includes(item.name) || searchFilters.includes(item.nameKo)
    },
    [searchFilters]
  )

  const clickHandler = useCallback((brand: Resource_Brand) => {
    setSearchFilters((temp) => {
      if (temp.includes(brand.name)) return temp.filter((ele) => ele !== brand.name)
      else return [...temp, brand.name]
    })
  }, [])

  return (
    <>
      {Boolean(brandList?.length) && (
        <section className={clsx('w-full flex flex-col', isOpen ? 'gap-4' : 'gap-2')}>
          <span className="self-start flex-row-start cursor-pointer" onClick={changeDropdown}>
            <h3 className="typograph-14 text-@-text-label">브랜드</h3>
            <DropDownArrow width={17} height={17} viewBox="0 0 24 24" />
          </span>
          <DropDown>
            <div className={clsx('w-full flex flex-wrap gap-x-2 gap-y-3')}>
              {brandList.map((brand) => (
                <Bedge
                  key={brand.id}
                  text={brand.nameKo || brand.name}
                  className={clsx(
                    'cursor-pointer',
                    isExist(brand) && 'bg-@-button-primary hover:bg-@-button-hover text-white'
                  )}
                  onClick={() => clickHandler(brand)}
                />
              ))}
            </div>
          </DropDown>
          {!isOpen &&
            (brandList.some(isExist) ? (
              <div className={clsx('w-full flex gap-2 overflow-auto hide-scrollbar')}>
                {brandList
                  .filter((brand) => isExist(brand))
                  .map((brand) => (
                    <Bedge
                      key={brand.id}
                      text={brand.nameKo || brand.name}
                      className="cursor-pointer bg-@-button-primary hover:bg-@-button-hover text-white"
                      onClick={() => clickHandler(brand)}
                    />
                  ))}
              </div>
            ) : (
              <span className="typograph-14 text-@-text-label">선택된 브랜드가 없습니다.</span>
            ))}
        </section>
      )}
    </>
  )
}
