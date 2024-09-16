'use client'

import clsx from 'clsx'
import MyLink from 'components/link/MyLink'
import { COMMUNITY_CATRGORY, CommunityCategory } from 'constants/community.constant'
import { PATH, PATH_PARAMS } from 'constants/path.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import { communityContext } from 'providers/community/CommunityProvider'
import { useContext } from 'react'

export default function Community_Categories() {
  const { category } = useContext(communityContext)
  const { t } = useMyTranslate('community.category')

  return (
    <>
      {Object.values(COMMUNITY_CATRGORY).map((_category: CommunityCategory) => (
        <MyLink
          key={_category}
          href={PATH.COMMUNITY + PATH_PARAMS.COMMUNITY.replace('[communityCategory]', _category)}
          className={clsx('h-[41px] typograph-14 px-6', category === _category && 'font-bold')}
          replace
          useLoadingOverlay={false}
        >
          {t(_category)}
        </MyLink>
      ))}
    </>
  )
}
