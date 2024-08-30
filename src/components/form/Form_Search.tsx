'use client'

import { useContext } from 'react'
import Input_Search from '../input/Input_Search'
import Form from './Form'
import { searchOptionContext } from 'providers/search/SearchOption.wrapper'
import { searchContext } from 'providers/search/SearchProvider'

export default function Form_Search() {
  const { searchKeyword, setSearchKeyword } = useContext(searchOptionContext)
  const { searching } = useContext(searchContext)
  return (
    <Form onSubmit={searching} className="w-auto">
      <Input_Search value={searchKeyword} onChange={setSearchKeyword} />
      <button type="submit" className="hidden" />
    </Form>
  )
}
