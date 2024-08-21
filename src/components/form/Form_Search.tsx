'use client'

import { useContext } from 'react'
import Input_Search from '../Input/Input_Search'
import Form from './Form'
import { searchOptionContext } from 'providers/SearchOptionProvider'
import { searchContext } from 'providers/SearchProvider'

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
