'use client'

import Button_Secondary from 'components/button/Button_Secondary'
import Input_Checkbox from 'components/input/Input_Checkbox'
import { searchOptionContext } from 'providers/search/SearchOption.wrapper'
import { useCallback, useContext } from 'react'

export default function Search_Filters() {
  const { equipmentTypeResource, searchFilters, setSearchFilters, resetSearchOptions } =
    useContext(searchOptionContext)

  const changeHandler = useCallback((value: string) => {
    setSearchFilters((temp) => {
      if (temp.includes(value)) return temp.filter((val) => val !== value)
      else return [...temp, value]
    })
  }, [])

  const isChecked = useCallback(
    (value: string) => {
      return searchFilters.some((val) => val === value)
    },
    [searchFilters]
  )

  return (
    <>
      {Boolean(equipmentTypeResource?.length) ? (
        <article className="float-search-options">
          <div className="w-full h-14 flex justify-between items-center border-b-[1px] border-b-neutral-100 border-solid px-4">
            <h3 className="typograph-16 font-bold">검색 필터</h3>
            <Button_Secondary text="초기화" onClick={resetSearchOptions} />
          </div>
          <div className="w-full h-auto flex-col-start px-4 pb-4">
            <h3 className="typograph-16 font-bold w-full h-14 flex-row-start">종류</h3>
            <div className="w-full h-full flex-col-start">
              {equipmentTypeResource.map((equipType) => (
                <Input_Checkbox
                  key={equipType.name}
                  name={equipType.name}
                  value={equipType.name}
                  isChecked={isChecked(equipType.name)}
                  label={equipType.nameKo || equipType.name}
                  onChange={changeHandler}
                />
              ))}
            </div>
          </div>
        </article>
      ) : (
        <></>
      )}
    </>
  )
}
