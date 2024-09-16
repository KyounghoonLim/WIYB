'use client'

import Button_Primary from '../Button_Primary'
import ReviewIcon from 'icons/icon_review.svg'
import { useCallback, useContext } from 'react'
import clsx from 'clsx'
import { userContext } from 'providers/UserProvider'
import { PATH } from 'constants/path.constant'
import { setStorageItem } from 'utils/storageUtils'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'
import { communityContext } from 'providers/community/CommunityProvider'
import { COMMUNITY_CATRGORY } from 'constants/community.constant'
import MyLink from 'components/link/MyLink'

export default function Button_Community_Post({ className }: { className?: string }) {
  const { category } = useContext(communityContext)
  const { userRequiredAction } = useContext(userContext)

  const clickHandler = useCallback(() => {
    return userRequiredAction(() => {
      const cat = category === COMMUNITY_CATRGORY.ALL ? COMMUNITY_CATRGORY.GENERAL : category
      setStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.COMMUNITY.LATEST_CATEGORY, cat)
      return Promise.resolve(true)
    }, PATH.COMMUNITY_FORM)
  }, [userRequiredAction, category])

  return (
    <MyLink href={PATH.COMMUNITY_FORM} onClick={clickHandler}>
      <Button_Primary
        icon={() => ReviewIcon({ className: 'fill-white' })}
        text="커뮤니티 글 작성하기"
        className={clsx('w-[212px] h-[44px] rounded-lg text-nowrap', className)}
      />
    </MyLink>
  )
}
