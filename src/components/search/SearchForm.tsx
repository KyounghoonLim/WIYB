'use client'

import { useCallback, useContext, useLayoutEffect, useRef } from 'react'

import Form from '../form/Form'
import Input from '../Input/Input'
import Button from '../button/Button'
import { searchContext } from '@/src/providers/SearchProvider'
import { PATH } from '@/src/constants/path.constant'

export default function SearchForm() {
  const { goToSearch, searchKeyword, setSearchKeyword, setSearchHistory } =
    useContext(searchContext)
  const inputRef = useRef<HTMLInputElement>()

  const submitHandler = useCallback(() => {
    goToSearch(searchKeyword)
  }, [searchKeyword, setSearchHistory])

  useLayoutEffect(() => {
    inputRef?.current && inputRef.current.focus()
  }, [inputRef])

  return (
    <Form onSubmit={submitHandler} className="w-full flex gap-1 pr-2 flex-row">
      <Input
        ref={inputRef}
        value={searchKeyword}
        onChange={setSearchKeyword}
        placeholder="장비, 플레이어를 검색해보세요 🧐"
        className="bg-@-bg-light h-9"
        maxLength={null}
      />
      <Button type="submit" className="hidden" />
    </Form>
  )
}
