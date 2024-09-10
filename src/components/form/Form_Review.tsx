'use client'

import Thumbnail_Primary from 'components/thumbnail/Thumbnail_Primary'
import Form from './Form'
import { SyntheticEvent, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import Island from 'components/island/Island'
import evaluationKeys from 'constants/json/evaluation.keys.json'
import ImageUploader_Multiple from 'components/uploader/ImageUploader_Multiple'
import Textarea from 'components/textarea/Textarea'
import { modalContext } from 'providers/ModalProvider'
import Button_Primary from 'components/button/Button_Primary'
import useMyTranslate from 'hooks/useMyTranslate'
import { uploadImageApi } from 'services/commonApi'
import { postEquipmentReviewApi } from 'services/reviewApis'

export default function Form_Review() {
  const {
    modalData: equipment,
    modalMetadata,
    setModalMetadata,
    closeModal,
  } = useContext(modalContext)

  const { t } = useMyTranslate('equipment.evaluation')

  const [reviewEvaluationMap, setReviewEveluationMap] = useState<Map<string, number>>(
    evaluationKeys[equipment?.type]?.reduce((map, key) => {
      return {
        ...map,
        [key]: null,
      }
    }, new Map())
  )
  const [reviewFileList, setReviewFileList] = useState<Array<File | string>>([])
  const [reviewMessage, setReviewMessage] = useState<string>('')

  const { isChanged, isValid } = useMemo(() => {
    const isChanged =
      Object.values(reviewEvaluationMap).some((score) => score) ||
      reviewFileList.length ||
      reviewMessage
    const isValid =
      Object.values(reviewEvaluationMap).every((score) => score) && /// 모든 평가 항목에 점수가 매겨져 있는지
      reviewMessage.length <= 300 && /// 리뷰 글이 300자 이하인지
      reviewFileList.length <= 5 /// 이미지 파일이 5개 이하인지
    return { isChanged, isValid }
  }, [reviewEvaluationMap, reviewFileList, reviewMessage])

  /**
   * radio group 핸들러
   */
  const changeHandler = useCallback((key: string, score: number) => {
    setReviewEveluationMap((temp) => ({ ...temp, [key]: score }))
  }, [])

  const submitHandler = useCallback(async () => {
    if (!isValid || !equipment?.id) return
    else {
      try {
        let imageUrlList
        if (reviewFileList.length) {
          const formData = new FormData()
          reviewFileList.forEach((file) => {
            formData.append('images', file)
          })
          const uploadResult = (await uploadImageApi(formData)).filter((url) => url)
          uploadResult.length && (imageUrlList = uploadResult)
        }
        await postEquipmentReviewApi(equipment.id, reviewEvaluationMap, reviewMessage, imageUrlList)
        modalMetadata?.onSuccess?.()

        window.alert('리뷰가 작성되었습니다.')
        setModalMetadata(null)
        closeModal()
      } catch (err) {
        window.alert('리뷰 작성에 실패했습니다.')
      }
    }
  }, [
    equipment,
    isValid,
    reviewEvaluationMap,
    reviewFileList,
    reviewMessage,
    modalMetadata,
    setModalMetadata,
    closeModal,
  ])

  /**
   * 리뷰가 작성중일 때 모달 백그라운드 클릭으로 나가는 것 방지
   */
  useLayoutEffect(() => {
    if (!isChanged) {
      setModalMetadata(null)
    } else {
      setModalMetadata({
        close: {
          condition: false,
          message: '정말로 나가시겠습니까?\n작성중인 내용은 삭제됩니다.',
          preventBackgroundTouch: true,
        },
      })
    }
  }, [isChanged, setModalMetadata])

  return (
    <Form onSubmit={submitHandler} className="gap-8">
      <article className="flex gap-3">
        <section className="flex-col-start gap-3">
          {/* 장비 간단 정보 */}
          <Island className="w-[360px] h-[102px] flex-row-start gap-4">
            <Thumbnail_Primary src={equipment?.imageUrls?.[0]} width={64} />
            <div className="w-full h-full flex flex-col justify-between typograph-12 text-text-label-100">
              <div className="w-full flex flex-col gap-1">
                <p>{equipment?.brand}</p>
                <div className="w-[248px]">
                  <h4
                    className="typograph-20 font-bold text-black truncate"
                    title={equipment?.name}
                  >
                    {equipment?.name}
                  </h4>
                </div>
              </div>
              <p>{equipment?.type}</p>
            </div>
          </Island>
          {/* 라디오 섹션 */}
          <Island className="w-[360px] h-auto flex-col-start gap-[10px]">
            {Object.keys(reviewEvaluationMap).map((key) => (
              <RadioGroup_Review
                key={key}
                title={t('key.' + key)}
                description={t('description.' + key)}
                onChange={(score) => changeHandler(key, score)}
              />
            ))}
          </Island>
        </section>
        <section>
          <Island className="w-[508px] h-full flex-col-start gap-[10px]">
            <span className="w-full typograph-16">
              <h4 className="font-bold inline-block">사진</h4>을 추가해보세요!
            </span>
            <ImageUploader_Multiple fileList={reviewFileList} onUpload={setReviewFileList} />
            <Textarea
              value={reviewMessage}
              onChange={setReviewMessage}
              placeholder="이 장비에 대해 리뷰를 남겨주세요."
              maxLength={300}
              className="h-full"
            />
          </Island>
        </section>
      </article>
      <Button_Primary
        type="submit"
        text="평가 점수/리뷰 작성하기"
        className="w-[576px] rounded-xl"
        disabled={!isValid}
      />
    </Form>
  )
}

function RadioGroup_Review({ title, description = '', onChange }) {
  const changeHandler = useCallback(
    (e: SyntheticEvent) => {
      const { value } = e.target as HTMLInputElement
      onChange?.(Number(value))
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
          .map((_, idx) => {
            const id = title + '-' + idx
            const index = idx + 1
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
