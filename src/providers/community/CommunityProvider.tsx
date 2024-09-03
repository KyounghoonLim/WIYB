'use client'

import { COMMUNITY_CATEGORY, CommunityCategoryType } from 'constants/community.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { getCommunityPosts } from 'services/communityApi'
import { CommunityPost } from 'types/community.types'

export const communityContext = createContext<{
  category: CommunityCategoryType
  setCategory: Dispatch<SetStateAction<CommunityCategoryType>>
  posts: CommunityPost[]
  isLoading: boolean
}>(null)

export default function CommunityProvider({ children }) {
  const [category, setCategory] = useState<CommunityCategoryType>(COMMUNITY_CATEGORY.ALL)

  const { data: posts, isLoading } = useMyQuery([category], getCommunityPosts)

  return (
    <communityContext.Provider value={{ category, setCategory, posts, isLoading }}>
      {children}
    </communityContext.Provider>
  )
}
