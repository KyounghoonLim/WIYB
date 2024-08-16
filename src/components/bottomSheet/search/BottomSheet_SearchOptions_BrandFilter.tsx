'use client'

import { useCallback, useContext } from 'react'
import Bedge from '../../bedge/Bedge'
import { searchContext } from '@/src/providers/SearchProvider'
import clsx from 'clsx'
import useSearchResources from '@/src/hooks/constant/useSearchResources'
import { Resource_Brand } from '@/src/@types/constant.types'

export default function BottomSheet_SearchOptions_BrandFilter() {
  const { searchFilters, setSearchFilters } = useContext(searchContext)

  const { brandList } = useSearchResources()

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
        <section className="w-full flex flex-col gap-4">
          <h3 className="typograph-14 text-@-text-label">브랜드</h3>
          <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
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
        </section>
      )}
    </>
  )
}
