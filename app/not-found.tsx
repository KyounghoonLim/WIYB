import Button from '@/src/components/button/Button'
import MyLink from '@/src/components/link/MyLink'
import { PATH } from '@/src/constants/path.constant'
import React from 'react'

export default function NotFoundPage() {
  return (
    <main className="CONTENT-CONTAINER flex-col-center gap-10">
      <h1 className="typograph-24 font-bold">존재하지 않는 페이지입니다.</h1>
      <MyLink href={PATH.MAIN}>
        <Button text="메인으로 가기" />
      </MyLink>
    </main>
  )
}
