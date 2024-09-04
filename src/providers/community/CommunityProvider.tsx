'use client'

import { CommunityType } from 'constants/community.constant'
import useMyQuery from 'hooks/useMyQuery'
import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { getCommunityPosts } from 'services/communityApi'
import { CommunityPost } from 'types/community.types'

export const communityContext = createContext<{
  category: CommunityType
  setCategory: Dispatch<SetStateAction<CommunityType>>
  posts: CommunityPost[]
  isLoading: boolean
}>(null)

export default function CommunityProvider({ children, communityType }) {
  const [category, setCategory] = useState<CommunityType>(communityType)

  const { data: posts, isLoading } = useMyQuery([category], getCommunityPosts)

  return (
    <communityContext.Provider value={{ category, setCategory, posts, isLoading }}>
      {children}
    </communityContext.Provider>
  )
}
