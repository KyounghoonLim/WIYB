//@ts-nocheck

import { dummy_community, dummy_recentCommunityPosts } from '@/@dummy'
import { CommunityCategoryType } from 'constants/community.constant'
import { SERVICE_PATH } from 'constants/path.constant'
import { CommunityComment, CommunityPost, CommunityResult } from 'types/community.types'
import myAxios from 'utils/axios/myAxios'

export {
  getRecentPostsApi,
  getCommunityPostsApi,
  getCommunityPostDetailApi,
  postCommunityPostApi,
  updateCommunityPostApi,
  deleteCommunityPostApi,
  postCommunityCommentApi,
  updateCommunityCommentApi,
  deleteCommunityCommentApi,
}

function getRecentPostsApi(): Promise<CommunityResult> {
  return myAxios.get(SERVICE_PATH.GET_COMMUNITY_POSTS, { offset: 0, size: 5 })
}

// function getCommunityPostsApi(): Promise<CommunityPost[]> {
//   return dummy_community
// }
function getCommunityPostsApi(
  category: CommunityCategoryType,
  contextId: string,
  offset: number,
  size: number
): Promise<CommunityResult> {
  const params = {
    category,
    contextId,
    offset,
    size,
  }
  return myAxios.get(SERVICE_PATH.GET_COMMUNITY_POSTS, { params })
}

function getCommunityPostDetailApi(postId: string): Promise<CommunityPost> {
  return myAxios.get(SERVICE_PATH.GET_COMMUNITY_POST_DETAIL.replace('[postId]', postId))
}

function postCommunityPostApi(
  category: CommunityCategoryType,
  title: string,
  content: string,
  imageUrls?: string[]
): Promise<CommunityPost> {
  return myAxios.post(SERVICE_PATH.POST_COMMUNITY_POST, {
    category,
    title,
    content,
    imageUrls,
  })
}

function updateCommunityPostApi(
  postId: string,
  category?: CommunityCategoryType,
  title?: string,
  content?: string,
  imageUrls?: string[]
): Promise<void> {
  return myAxios.patch(SERVICE_PATH.UPDATE_COMMUNITY_POST.replace('[postId]', postId), {
    category,
    title,
    content,
    imageUrls,
  })
}

function deleteCommunityPostApi(postId: string): Promise<void> {
  return myAxios.delete(SERVICE_PATH.DELETE_COMMUNITY_POST.replace('[postId]', postId))
}

function postCommunityCommentApi(
  postId: string,
  content: string,
  replyTo?: string
): Promise<CommunityComment> {
  return myAxios.post(SERVICE_PATH.POST_COMMUNITY_COMMENT.replace('[postId]', postId), {
    content,
    replyTo,
  })
}

function updateCommunityCommentApi(
  postId: string,
  commentId: string,
  content: string
): Promise<void> {
  return myAxios.patch(
    SERVICE_PATH.UPDATE_COMMUNITY_COMMENT.replace('[postId]', postId).replace(
      '[commentId]',
      commentId
    ),
    {
      content,
    }
  )
}

function deleteCommunityCommentApi(postId: string, commentId: string): Promise<void> {
  return myAxios.delete(
    SERVICE_PATH.UPDATE_COMMUNITY_COMMENT.replace('[postId]', postId).replace(
      '[commentId]',
      commentId
    )
  )
}
