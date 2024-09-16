'use client'

import useMyQuery from 'hooks/useMyQuery'
import { createContext, ReactNode } from 'react'
import { getCommunityPostDetailApi } from 'services/communityApi'
import { CommunityPost } from 'types/community.types'

export const communityPostContext = createContext<{
  post: CommunityPost
  isLoading: boolean
}>(null)

export default function CommunityPostProvider({
  children,
  postId,
}: {
  children: ReactNode
  postId: string
}) {
  const { data: post, isLoading } = useMyQuery([postId], getCommunityPostDetailApi)

  return (
    <communityPostContext.Provider value={{ post, isLoading }}>
      {children}
    </communityPostContext.Provider>
  )
}
