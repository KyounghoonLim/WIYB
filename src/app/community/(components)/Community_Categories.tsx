'use client'

import clsx from 'clsx'
import { COMMUNITY_CATEGORY, CommunityCategoryType } from 'constants/community.constant'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { useRouter } from 'next/navigation'
import { communityContext } from 'providers/community/CommunityProvider'
import { useContext } from 'react'

export default function Community_Categories() {
  const { category, setCategory } = useContext(communityContext)
  const { t } = useMyTranslate('community.category')
  const { replace } = useRouter()

  return (
    <>
      {Object.keys(COMMUNITY_CATEGORY).map((_category: CommunityCategoryType) => (
        <button
          key={_category}
          className={clsx('h-[41px] typograph-14 px-6', category === _category && 'font-bold')}
          onClick={() => {
            setCategory(_category)
            replace(PATH.COMMUNITY + PATH_PARAMS.COMMUNITY.replace('[category]', category))
          }}
        >
          {t(_category)}
        </button>
      ))}
    </>
  )
}
