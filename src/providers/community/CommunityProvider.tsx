'use client'

import { COMMUNITY_CATEGORY, CommunityCategoryType } from 'constants/community.constant'
import { createContext, Dispatch, SetStateAction, useState } from 'react'

export const communityContext = createContext<{
  category: CommunityCategoryType
  setCategory: Dispatch<SetStateAction<CommunityCategoryType>>
}>(null)

export default function CommunityProvider({ children }) {
  const [category, setCategory] = useState<CommunityCategoryType>(COMMUNITY_CATEGORY.ALL)

  return (
    <communityContext.Provider value={{ category, setCategory }}>
      {children}
    </communityContext.Provider>
  )
}
