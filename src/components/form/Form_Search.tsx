'use client'

import { useContext, useState } from 'react'
import Input_Search from '../input/Input_Search'
import Form from './Form'
import { searchOptionContext } from 'providers/search/SearchOption.wrapper'
import { searchContext } from 'providers/search/SearchProvider'

export default function Form_Search() {
  const { searchKeyword } = useContext(searchOptionContext)
  const { goToSearch } = useContext(searchContext)

  /**
   * UI 표시 및 검색 페이지 이동용
   */
  const [keyword, setKeyword] = useState<string>(searchKeyword)

  return (
    <Form onSubmit={() => goToSearch(keyword)} className="w-auto">
      <Input_Search value={keyword} onChange={setKeyword} />
      <button type="submit" className="hidden" />
    </Form>
  )
}
