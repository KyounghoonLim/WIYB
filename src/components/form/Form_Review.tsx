'use client'

import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import Form from './Form'
import { SyntheticEvent, useCallback, useContext, useLayoutEffect, useState } from 'react'
import Island from 'components/island/Island'
import ReviewEvaluationMap from 'constants/json/review.evaluationMap.json'
import ImageUploader_Multiple from 'components/uploader/ImageUploader_Multiple'
import Textarea from 'components/textarea/Textarea'
import { modalContext } from 'providers/ModalProvider'
import Button_Primary from 'components/button/Button_Primary'

export default function Form_Review() {
  const { modalData: equipment, setModalMetadata } = useContext(modalContext)

  const [evaluationMap, setEveluationMap] = useState<any>(
    ReviewEvaluationMap['IRON']?.map((obj) => ({ ...obj, score: null }))
    // ReviewEvaluationMap[equipment?.type]?.map((obj) => ({ ...obj, score: null }))
  )
  const [reviewFileList, setReviewFileList] = useState<Array<File | string>>([])
  const [reviewMessage, setReviewMessage] = useState<string>('')

  const changeHandler = useCallback((key: string, score: number) => {
    setEveluationMap((temp) => {
      return temp.reduce((prev, curr, idx) => {
        if (curr.key !== key) return [...prev, curr]
        else {
          const newItem = { ...curr, score }
          return [...prev, newItem]
        }
      }, [])
    })
  }, [])

  useLayoutEffect(() => {
    if (!evaluationMap?.some((ele) => ele.score) && !reviewFileList.length && !reviewMessage) return
    else {
      setModalMetadata({
        close: {
          condition: false,
          message: '정말로 나가시겠습니까?\n작성중인 내용은 삭제됩니다.',
        },
      })
    }
  }, [evaluationMap, reviewFileList, reviewMessage])

  return (
    <Form onSubmit={null} className="gap-8">
      <article className="flex gap-3">
        <section className="flex-col-start gap-3">
          {/* 장비 간단 정보 */}
          <Island className="w-[360px] h-[102px] flex-row-start gap-4 p-4 rounded-lg">
            <Thumbnail_Primary src={equipment?.imageUrls?.[0]} width={64} />
            <div className="w-full h-full flex flex-col justify-between typograph-12 text-text-label-100">
              <div className="w-full flex flex-col gap-1">
                <p>{equipment?.brand}</p>
                <h4 className="typograph-20 font-bold text-black">{equipment?.name}</h4>
              </div>
              <p>{equipment?.type}</p>
            </div>
          </Island>
          {/* 라디오 섹션 */}
          <Island className="w-[360px] h-auto flex-col-start gap-[10px] p-4">
            {evaluationMap.map((obj) => (
              <RadioGroup_Review
                key={obj?.label}
                title={obj?.label}
                description={obj?.description}
                onChange={(score) => changeHandler(obj?.key, score)}
              />
            ))}
          </Island>
        </section>
        <section>
          <Island className="w-[508px] h-full flex-col-start gap-[10px] p-4">
            <span className="w-full typograph-16">
              <h4 className="font-bold inline-block">사진</h4>을 추가해보세요!
            </span>
            <ImageUploader_Multiple fileList={reviewFileList} onUpload={setReviewFileList} />
            <Textarea
              value={reviewMessage}
              onChange={setReviewMessage}
              placeholder="이 장비에 대해 리뷰를 남겨주세요."
              className="h-full"
            />
          </Island>
        </section>
      </article>
      <Button_Primary
        type="submit"
        text="평가 점수/리뷰 작성하기"
        className="w-[576px] rounded-xl"
      />
    </Form>
  )
}

function RadioGroup_Review({ title, description = '', onChange }) {
  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      onChange?.(value)
    },
    [onChange]
  )

  return (
    <div className="w-full flex flex-col gap-1">
      <span className="typograph-14">
        <h5 className="font-bold inline-block">{title}</h5>
        &nbsp;평가
      </span>
      <p className="w-full typograph-10 text-text-label-000 truncate" title={description}>
        {description}
      </p>
      <div className="flex-row-start">
        {Array(5)
          .fill(undefined)
          .map((_, index) => {
            const id = title + '-' + index
            return (
              <label
                className="w-[65.6px] h-[33px] flex-row-center gap-2 typograph-12 cursor-pointer"
                key={id}
                htmlFor={id}
              >
                <input
                  id={id}
                  name={title}
                  type="radio"
                  onChange={changeHandler}
                  value={index}
                  className="w-3 h-3 accent-black"
                />
                {index + '점'}
              </label>
            )
          })}
      </div>
    </div>
  )
}
