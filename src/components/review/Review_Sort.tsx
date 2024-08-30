'use client'

import { REVIEW_SORT, ReviewSortType } from 'constants/review.constant'
import useMyTranslate from 'hooks/useMyTranslate'
import dynamic from 'next/dynamic'
import { reviewContext } from 'providers/review/ReviewProvider'
import { useCallback, useContext, useMemo } from 'react'
import { SelectOption } from 'types/components/select/select.interface'

const Select_Primary = dynamic(() => import('components/select/Select_Primary'), { ssr: false })

export default function Review_Sorts() {
  const { contents, reviewSort, changeSort } = useContext(reviewContext)
  const { t } = useMyTranslate('review.sort')

  const reviewSortOptions = useMemo((): SelectOption[] => {
    return Object.keys(REVIEW_SORT).map((key) => ({
      value: REVIEW_SORT[key],
      label: t(key),
    }))
  }, [])

  const changeHandler = useCallback((value: string) => {
    changeSort(value as ReviewSortType)
  }, [])

  return (
    <>
      {Boolean(contents?.length) && (
        <Select_Primary options={reviewSortOptions} value={reviewSort} onChange={changeHandler} />
      )}
    </>
  )
}
