import { EquipmentDetail } from '@/src/@types/equipment.types'
import Button from '@/src/components/button/Button'
import Graph from '@/src/components/graph/Graph'
import Island from '@/src/components/island/Island'
import { PATH } from '@/src/constants/path.constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Island_EquipGraph({
  id,
  evaluationMetricAverage,
}: Pick<EquipmentDetail, 'id' | 'evaluationMetricAverage'>) {
  return (
    <Island className="flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <h3 className="typograph-16 font-bold">평가 지표</h3>
        <div className="mx-auto">
          {evaluationMetricAverage ? (
            <Graph evaluationMetric={evaluationMetricAverage} />
          ) : (
            <Image src={'/images/image_loading_spinner.webp'} width={300} height={300} alt="" />
          )}
        </div>
      </div>
      {evaluationMetricAverage && (
        <Link href={PATH.EQUIPMENT_REVIEW_FORM.replace('[param1]', id)}>
          <Button text="리뷰/평가 등록하기" />
        </Link>
      )}
    </Island>
  )
}
