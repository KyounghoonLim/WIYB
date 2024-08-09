import React, { useMemo } from 'react'
import UserThumbnail from '../thumbnail/UserThumbnail'
import Bedge from '../bedge/Bedge'
import { PATH } from '@/src/constants/path.constant'
import Link from 'next/link'
import { UserCardProps } from '@/src/@types/components/card/userCard.interface'
import clsx from 'clsx'

export default function UserCardPrimary({ user }: UserCardProps) {
  const userProfileUrl = useMemo(() => (user ? PATH.PROFILE : '#'), [user])

  return (
    <Link href={userProfileUrl}>
      <article className="card-user-primary">
        <div className="flex w-full gap-3">
          <UserThumbnail src={user?.imageUrl} />
          <div className="w-full flex-col items-center typograph-24">
            {user ? (
              <>
                안녕하세요 👋
                <h3 className="font-bold">{user?.nickname}</h3>
              </>
            ) : (
              <>
                <div className={!user && 'h-5 my-2 skeleton w-quarter'} />
                <div className={!user && 'h-5 my-2 skeleton w-half'} />
              </>
            )}
          </div>
        </div>
        <div className={clsx('flex gap-3 py-[6px]', !user && 'w-full')}>
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Bedge className="h-5 skeleton my-[6px] max-w-half" />
            </>
          )}
        </div>
      </article>
    </Link>
  )
}
