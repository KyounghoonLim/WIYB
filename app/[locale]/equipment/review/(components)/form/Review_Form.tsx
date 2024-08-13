'use client'

import { RadioOption } from '@/src/@types/components/radio/radio.types'
import Form from '@/src/components/form/Form'
import { REVIEW_SCORE, ReviewScoreType } from '@/src/constants/review.constnat'
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import Review_Radio from './Review_Radio'
import Textarea from '@/src/components/textarea/Textarea'
import Button from '@/src/components/button/Button'
import FileListUploader from '@/src/components/fileUploader/FileListUploader'
import { setEquipmentReviewApi } from '@/src/services/equipmentApi'
import { uploadImageApi } from '@/src/services/commonApi'
import { EquipmentEvaluationMetric } from '@/src/@types/equipment.types'
import { PATH } from '@/src/constants/path.constant'
import { EquipmentType } from '@/src/constants/equipment.constant'

export const reviewFormContext = createContext<{
  reviewScoreOptions: RadioOption<ReviewScoreType>[]
  state: [
    value: EquipmentEvaluationMetric,
    setter: Dispatch<SetStateAction<EquipmentEvaluationMetric>>
  ]
}>(null)

export default function Review_Form({
  id,
  type,
  onSucceed,
  onFailed,
}: {
  id: string
  type: EquipmentType
  onSucceed?: () => any
  onFailed?: () => any
}) {
  const [reviewScoreMetric, setReviewScoreMetric] = useState<EquipmentEvaluationMetric>(
    Array(6).fill(undefined)
  )
  const [reviewContent, setReviewContent] = useState<string>('')
  const [reviewImageList, setReviewImageList] = useState<File[]>([])

  const reviewScoreOptions: RadioOption<ReviewScoreType>[] = useMemo(
    () =>
      REVIEW_SCORE.map((score: ReviewScoreType) => ({
        label: score as string,
        value: score,
      })),
    []
  )

  const isDisabled = useMemo(() => {
    return reviewScoreMetric.some((score) => !score)
  }, [reviewScoreMetric])

  const submitHandler = useCallback(async () => {
    try {
      let uploadedUrl
      console.log(reviewImageList)
      if (reviewImageList.length) {
        const formData = new FormData()
        // const blob = new Blob(reviewImageList)
        // formData.append('images', blob)
        reviewImageList.forEach((file) => {
          formData.append('images', file)
        })
        uploadedUrl = await uploadImageApi(formData)
      }
      await setEquipmentReviewApi(
        id,
        reviewContent,
        uploadedUrl && [uploadedUrl],
        reviewScoreMetric.map((score) => Number(score))
      )
      window.alert('리뷰가 작성이 되었습니다.')
      onSucceed?.()
    } catch {
      window.alert('리뷰 작성에 실패했습니다.')
      onFailed?.()
    } finally {
      location.replace(PATH.EQUIPMENT_REVIEW.replace('[param1]', id).replace('[param2]', type))
    }
  }, [id, reviewScoreMetric, reviewContent, reviewImageList, onSucceed, onFailed])

  return (
    <reviewFormContext.Provider
      value={{
        reviewScoreOptions,
        state: [reviewScoreMetric, setReviewScoreMetric],
      }}
    >
      <Form onSubmit={submitHandler} className="px-4 py-6 gap-6">
        {/* 비거리 */}
        <Review_Radio
          name="range"
          title="<strong>비거리</strong>가 얼마나 나가나요?"
          idx={0}
          measureMessage={['짧게', '멀리']}
        />
        {/* 난이도 */}
        <Review_Radio
          name="difficulty"
          title="<strong>난이도</strong>가 어렵나요?"
          idx={1}
          measureMessage={['어려움', '쉬움']}
        />
        {/* 디자인 */}
        <Review_Radio
          name="design"
          title="<strong>디자인</strong>이 멋진가요?"
          idx={2}
          measureMessage={['안 멋짐', '멋짐']}
        />
        {/* 정확도 */}
        <Review_Radio
          name="accuracy"
          title="<strong>정확도</strong>가 좋은가요?"
          idx={3}
          measureMessage={['안 좋음', '좋음']}
        />
        {/* 가격 */}
        <Review_Radio
          name="price"
          title="<strong>가격</strong>은 저렴한가요?"
          idx={4}
          measureMessage={['비쌈', '저렴']}
        />
        {/* 관용성 */}
        <Review_Radio
          name="generality"
          title="<strong>관용성</strong>이 좋은가요?"
          idx={5}
          measureMessage={['안 좋음', '좋음']}
        />
        {/* 리뷰 콘텐츠 */}
        <Textarea
          value={reviewContent}
          onChange={setReviewContent}
          placeholder="상세한 리뷰를 적어주세요 (300자 이하)"
          maxLength={300}
        />
        <FileListUploader fileList={reviewImageList} onUpload={setReviewImageList} />
        <Button type="submit" text="리뷰/평가 등록하기" disabled={isDisabled} />
      </Form>
    </reviewFormContext.Provider>
  )
}
