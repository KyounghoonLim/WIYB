'use client'

import { dummy_community } from '@/@dummy'
import Island from 'components/island/Island'
import List_Primary from 'components/list/List_Primary'
import Paginator from 'components/paginator/Paginator'
import ListItem_Community from '../listItems/ListItem_Community'
import { useContext, useMemo } from 'react'
import { communityContext } from 'providers/community/CommunityProvider'
import LoadingSpinner from 'components/loading/LoadingSpinner'

export default function List_Community_Pagination() {
  const { posts, metadata, communityOffset, setCommunityOffset, isLoading } =
    useContext(communityContext)

  return (
    <Paginator
      page={communityOffset}
      onChange={setCommunityOffset}
      totalPage={metadata?.totalOffset || 1}
    >
      {Boolean(posts?.length) ? (
        <Island className="w-full h-auto overflow-hidden">
          <List_Primary items={posts} Component={ListItem_Community} />
        </Island>
      ) : isLoading ? (
        <div className="w-full h-[500px] flex-col-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="w-full h-[500px] typograph-16 text-text-label-000 flex-col-center gap-3">
          게시글이 없습니다.
        </div>
      )}
    </Paginator>
  )
}
