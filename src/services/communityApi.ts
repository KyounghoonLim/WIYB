//@ts-nocheck

import { dummy_community, dummy_recentCommunityPosts } from '@/@dummy'
import { CommunityCategoryType } from 'constants/community.constant'
import { CommunityPost } from 'types/community.types'

export { getRecentPosts, getCommunityPosts, getPostDetail }

function getRecentPosts(): Promise<CommunityPost[]> {
  return Promise.resolve(dummy_community)
}

function getCommunityPosts(category: CommunityCategoryType): Promise<CommunityPost[]> {
  return Promise.resolve(dummy_community)
}

function getPostDetail(postId: string): Promise<CommunityPost> {
  return Promise.resolve(dummy_community.filter((ele) => ele.id === postId)[0])
}
