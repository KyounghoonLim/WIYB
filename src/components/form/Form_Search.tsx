'use client'

import Input_Search from '../Input/Input_Search'
import Form from './Form'

export default function Form_Search() {
  return (
    <Form onSubmit={() => null} className="w-auto">
      <Input_Search />
      <button type="submit" className="hidden" />
    </Form>
  )
}
