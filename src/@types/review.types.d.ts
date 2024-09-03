import { User } from './user.types'

export type ReviewResult = {
  content: Review[]
  metadata: ReviewMetadata
}

export type Review = {
  id: string
  content: string
  imageUrls: string[]
  createdAt: Date | string
  updatedAt: Date | string
  isLiked: boolean
  user: User
}

export type ReviewMetadata = {
  contextId: string
  offset: number
  /**
   * 총 페이지 수
   */
  totalOffset: number
  /**
   * 총 데이터 수
   */
  totalSize: number
  size: number
  isEmpty: boolean
  isLast: boolean
}
