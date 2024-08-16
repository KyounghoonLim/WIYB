'use client'

import { useCallback, useContext, useLayoutEffect, useMemo, useRef } from 'react'

import Form from '../form/Form'
import Input from '../Input/Input'
import Button from '../button/Button'
import { searchContext } from '@/src/providers/SearchProvider'
import { usePathname, useSearchParams } from 'next/navigation'
import { PATH } from '@/src/constants/path.constant'

export default function SearchForm() {
  const { goToSearch, searchKeyword, setSearchKeyword, setSearchHistory } =
    useContext(searchContext)
  const inputRef = useRef<HTMLInputElement>()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const submitHandler = useCallback(() => {
    goToSearch(searchKeyword)
  }, [searchKeyword, setSearchHistory, goToSearch])

  useLayoutEffect(() => {
    inputRef?.current && inputRef.current.focus()
  }, [inputRef])

  const defaultValue = useMemo(() => {
    if (searchKeyword || !pathname.includes(PATH.SEARCH)) return searchKeyword
    else return searchParams.get('keyword') || ''
  }, [searchKeyword])

  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        value={defaultValue}
        onChange={setSearchKeyword}
        placeholder="장비, 플레이어를 검색해보세요 🧐"
        className="bg-@-bg-light h-9 placeholder:text-@-text-placeholder-secondary"
        maxLength={null}
      />
      <Button type="submit" className="hidden" />
    </Form>
  )
}
