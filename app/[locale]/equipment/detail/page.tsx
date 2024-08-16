'use client'

import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import MyLink from '@/src/components/link/MyLink'
import Button from '@/src/components/button/Button'
import { PATH } from '@/src/constants/path.constant'
import dynamic from 'next/dynamic'

const EquipmentDetail_Container = dynamic(
  () => import('./(components)/EquipmentDetail_Container'),
  { ssr: false }
)

export default function EquipmentDetailPage({
  searchParams: { id, type },
}: {
  searchParams: { id: string; type: string }
}) {
  return (
    <main className="SCROLLABLE-CONTAINER gap-4">
      <ErrorBoundary errorComponent={EquipmentDetailPage_ErrorBoundary}>
        <EquipmentDetail_Container id={id} type={type} />
      </ErrorBoundary>
    </main>
  )
}

function EquipmentDetailPage_ErrorBoundary() {
  return (
    <div className="w-screen h-screen flex-col-center gap-6">
      <h3 className="typograph-24 font-bold">잘못된 요청입니다.</h3>
      <MyLink href={PATH.MAIN}>
        <Button text="메인으로 돌아가기" />
      </MyLink>
    </div>
  )
}
