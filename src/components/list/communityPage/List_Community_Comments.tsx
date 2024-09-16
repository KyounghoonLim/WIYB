'use client'

import List_Primary from '../List_Primary'
import { CommunityComment } from 'types/community.types'
import ListItem_Community_Comment from '../listItems/ListItem_Community_Comment'

export default function List_Community_Comments({
  postId,
  comments,
}: {
  postId: string
  comments: CommunityComment[]
}) {
  return (
    <List_Primary
      items={comments}
      Component={({ item, index }) => ListItem_Community_Comment({ item, index, postId })}
      className="px-2"
    />
  )
}
