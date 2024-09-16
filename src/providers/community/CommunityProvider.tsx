'use client'

import { COMMUNITY_CATRGORY, CommunityCategory } from 'constants/community.constant'
import useMyQuery from 'hooks/useMyQuery'
import { useParams, useSearchParams } from 'next/navigation'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getCommunityPostsApi } from 'services/communityApi'
import { CommunityMetadata, CommunityPost, CommunityResult } from 'types/community.types'

export const communityContext = createContext<{
  posts: CommunityPost[]
  metadata: CommunityMetadata
  category: CommunityCategory
  setCategory: Dispatch<SetStateAction<CommunityCategory>>
  communityOffset: number
  setCommunityOffset: Dispatch<SetStateAction<number>>
  isEndOfPage: boolean
  isLoading: boolean
}>(null)

export default function CommunityProvider({
  children,
  communityCategory,
}: {
  children: ReactNode
  communityCategory?: CommunityCategory
}) {
  const params = useParams()

  const [category, setCategory] = useState<CommunityCategory>(
    communityCategory || COMMUNITY_CATRGORY.ALL
  )

  const [communityContextId, setCommunityContextId] = useState<string>(null)
  const [communityOffset, setCommunityOffset] = useState<number>(1)
  const [communitySize] = useState<number>(20)

  const [contents, setContents] = useState<CommunityResult['content']>([])
  const [metadata, setMetadata] = useState<CommunityResult['metadata']>(null)
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false)

  const isFetchEnable = useMemo(() => {
    /// 특정 post 페이지에서는 Fetch 하지 않음 ///
    if (params['postId']) return false
    else if (!communityContextId) return true
    else return communityOffset !== 1
  }, [communityContextId, communityOffset])

  const successHandler = useCallback(({ metadata, content }: CommunityResult) => {
    setIsEndOfPage(metadata.isLast)
    setCommunityContextId(metadata.contextId)
    setContents(content)
    setMetadata(metadata)
  }, [])

  const { isLoading } = useMyQuery(
    [category, communityContextId, communityOffset, communitySize],
    getCommunityPostsApi,
    { enabled: isFetchEnable, gcTime: 0 },
    successHandler
  )

  return (
    <communityContext.Provider
      value={{
        posts: contents,
        metadata,
        category,
        setCategory,
        communityOffset,
        setCommunityOffset,
        isEndOfPage,
        isLoading,
      }}
    >
      {children}
    </communityContext.Provider>
  )
}
