'use client'

import List_Primary from '../List_Primary'
import { CommunityComment } from 'types/community.types'
import ListItem_Community_Comment from '../listItems/ListItem_Community_Comment'

export default function List_Community_Comments({ comments }: { comments: CommunityComment[] }) {
  return <List_Primary items={comments} Component={ListItem_Community_Comment} />
}
