import React, { useMemo } from 'react'
import UserThumbnail from '../thumbnail/UserThumbnail'
import Bedge from '../bedge/Bedge'
import { PATH } from '@/src/constants/path.constant'
import MyLink from '../link/MyLink'
import useUser from '@/src/hooks/user/useUser'

export default function UserCardPrimary() {
  const { user } = useUser()
  const userProfileUrl = useMemo(() => (user ? PATH.PROFILE : PATH.LOGIN), [user])

  return (
    <MyLink href={userProfileUrl}>
      <article className="card-user-primary">
        {user ? (
          <>
            <div className="flex w-full gap-3">
              <UserThumbnail src={user.imageUrl} />
              <div className="w-full flex-col items-center typograph-24">
                안녕하세요 👋
                <h3 className="font-bold">{user.nickname}</h3>
              </div>
            </div>
            <div className="flex gap-3 py-[6px]">
              <Bedge
                text={
                  user?.handy
                    ? `${user.handy}${user.handy > 0 ? '+' : ''}`
                    : '핸디 정보가 없습니다.'
                }
              />
              <Bedge
                text={
                  user?.height || user?.weight
                    ? `${user?.height || '???'}cm/${user?.weight || '???'}kg`
                    : '체형 정보가 없습니다.'
                }
              />
            </div>
          </>
        ) : (
          <div className="w-full h-[120px] typograph-24 flex-row-center">
            <h3 className="font-bold">로그인</h3>이 필요합니다.
          </div>
        )}
      </article>
    </MyLink>
  )
}

export function CardUserPrimary_Skeleton() {
  return (
    <article className="card-user-primary">
      <div className="flex w-full gap-3">
        <UserThumbnail src={null} />
        <div className="w-full flex-col items-center typograph-24">
          <div className="h-5 my-2 skeleton w-full" />
          <div className="h-5 my-2 skeleton w-full" />
        </div>
      </div>
      <div className="flex gap-3 py-[6px] w-full">
        <Bedge className="h-5 skeleton my-[6px] max-w-full" />
      </div>
    </article>
  )
}
