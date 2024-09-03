'use client'

import clsx from 'clsx'
import { COMMUNITY_CATEGORY, CommunityCategoryType } from 'constants/community.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { communityContext } from 'providers/community/CommunityProvider'
import { useContext } from 'react'

export default function Community_Categories() {
  const { category, setCategory } = useContext(communityContext)
  const { t } = useMyTranslate('community.category')

  return (
    <>
      {Object.keys(COMMUNITY_CATEGORY).map((_category: CommunityCategoryType) => (
        <button
          key={_category}
          className={clsx('h-[41px] typograph-14 px-6', category === _category && 'font-bold')}
          onClick={() => setCategory(_category)}
        >
          {t(_category)}
        </button>
      ))}
    </>
  )
}
