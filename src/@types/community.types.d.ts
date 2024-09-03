import { CommunityCategoryType } from 'constants/community.constant'
import { User } from './user.types'

export type CommunityPost = {
  id: string
  category: CommunityCategoryType
  title: string
  viewCount: number
  createdAt: string
  commentCount: number
  images: string[]
  content: string
  comments: CommunityComment[]
  user: User
}

export type CommunityComment = {
  user: User
  content: string
}
