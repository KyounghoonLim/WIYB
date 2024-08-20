import { dummy_recentCommunityPosts } from '@/@dummy'

export { getRecentPosts }

function getRecentPosts() {
  return Promise.resolve(dummy_recentCommunityPosts)
}
