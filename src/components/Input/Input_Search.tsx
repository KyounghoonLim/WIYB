'use client'

import { InputProps } from 'types/components/input/input.interface'
import Input_Primary from './Input_Primary'
import SearchIcon from 'icons/icon_search.svg'

export default function Input_Search({ ...inputProps }: InputProps) {
  return (
    <div className="input-search-container">
      <SearchIcon className="no-auto-size" />
      <Input_Primary {...{ ...inputProps, placeholder: '검색할 장비를 입력해보세요' }} />
    </div>
  )
}
