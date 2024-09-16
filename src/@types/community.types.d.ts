import { CommunityCategoryType } from 'constants/community.constant'
import { User } from './user.types'

export type CommunityResult = {
  metadata: CommunityMetadata
  content: CommunityPost[]
}

export type CommunityMetadata = {
  contextId: string
  offset: number
  totalOffset: number
  size: number
  totalSize: number
  isLast: boolean
  isEmpty: boolean
}

export type CommunityPost = {
  id: string
  category: CommunityCategoryType
  title: string
  viewCount: number
  commentCount: number
  imageUrls: string[]
  content: string
  comments?: CommunityComment[]
  createdAt: string
  updatedAt: string
  author: User
}

export type CommunityComment = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  author: User
  replies?: CommunityReply[]
  replyTo?: string
}

export type CommunityReply = {
  id: string
  /**
   * comment Id
   */
  replyTo: string
  content: string
  createdAt: string
  updatedAt: string
  author: User
}
