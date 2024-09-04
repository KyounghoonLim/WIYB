'use client'

import { dummy_community } from '@/@dummy'
import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import Paginator from 'components/paginator/Paginator'
import ListItem_Community from '../listItems/ListItem_Community'
import { useContext, useMemo } from 'react'
import { communityContext } from 'providers/community/CommunityProvider'

export default function List_Community_Pagination() {
  const { category } = useContext(communityContext)

  const posts = useMemo(() => {
    switch (category) {
      case 'ALL':
        return dummy_community
      default:
        return dummy_community.filter((post) => post.category === category)
    }
  }, [category])

  return (
    <Paginator page={1} onChange={null} totalPage={1}>
      <Island className="w-full h-auto p-4 overflow-hidden">
        <List_Primary items={posts} Component={ListItem_Community} />
      </Island>
    </Paginator>
  )
}
