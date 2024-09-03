'use client'

import { dummy_community, dummy_recentCommunityPosts } from '@/@dummy'
import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import Paginator from 'components/paginator/Paginator'
import ListItem_Community from '../listItems/ListItem_Community'

export default function List_Community_Pagination() {
  return (
    <Paginator page={1} onChange={null} totalPage={1}>
      <Island className="w-full h-auto p-4 overflow-hidden">
        <List_Primary items={dummy_community} Component={ListItem_Community} />
      </Island>
    </Paginator>
  )
}
