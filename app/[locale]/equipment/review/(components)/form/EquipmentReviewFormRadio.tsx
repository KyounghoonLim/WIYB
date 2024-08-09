import { ReviewScoreType } from '@/src/constants/review.constnat'
import React, { useCallback, useContext } from 'react'
import { equipmentReviewFormContext } from './EquipmentReviewForm'
import Radio from '@/src/components/radio/Radio'
import { convertStringToTSX } from '@/src/utils/convertStringToJSX'

export default function EquipmentReviewFormRadio({
  name,
  title,
  idx,
  measureMessage,
}: {
  name: string
  title: string
  idx: number
  measureMessage: string[]
}) {
  const {
    reviewScoreOptions,
    state: [value, setter],
  } = useContext(equipmentReviewFormContext)

  const changeHandler = useCallback(
    (value) => {
      setter((temp) => {
        const temp2 = [...temp]
        temp2[idx] = value
        return temp2
      })
    },
    [idx]
  )

  return (
    <article className="flex flex-col w-full gap-3 py-4">
      <span className="flex-row-start typograph-16">{convertStringToTSX(title)}</span>
      <Radio options={reviewScoreOptions} value={value[idx]} name={name} onChange={changeHandler} />
      <span className="w-full flex justify-between items-center typograph-12 text-@-text-label">
        {measureMessage.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </span>
    </article>
  )
}
