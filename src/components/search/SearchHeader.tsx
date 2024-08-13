'use client'

import { useRouter } from 'next/navigation'
import SearchForm from './SearchForm'
import CloseIconBold from 'i/icon_close_bold.svg'

export default function SearchHeader() {
  const { back } = useRouter()

  return (
    <section className="w-full flex items-center gap-1 pr-2 px-2">
      <CloseIconBold
        width={44}
        height={44}
        className="shrink-0 grow-0 cursor-pointer fill-@-neutral-900"
        onClick={back}
      />
      <SearchForm />
    </section>
  )
}
