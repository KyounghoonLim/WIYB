'use client'

import Button_Community_Post from 'components/button/communityPage/Button_Community_Post'
import List_Community_Pagination from 'components/list/communityPage/List_Community_Pagination'

export default function Community_Post_Section() {
  return (
    <section className="w-[800px] flex-col-start py-6">
      <div className="w-full h-[72px] flex-row-start">
        <Button_Community_Post />
      </div>
      <List_Community_Pagination />
      <div className="w-full h-[72px] flex-row-start">
        <Button_Community_Post />
      </div>
    </section>
  )
}
