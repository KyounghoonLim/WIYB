'use client'

import { REVIEW_SORT, REVIEW_SORT_LABEL, ReviewSortType } from 'constants/review.constant'
import dynamic from 'next/dynamic'
import { reviewContext } from 'providers/ReviewProvider'
import { useCallback, useContext, useMemo } from 'react'
import { SelectOption } from 'types/components/select/select.interface'

const Select_Primary = dynamic(() => import('components/select/Select_Primary'), { ssr: false })

export default function Review_Sorts() {
  const { reviews, reviewSort, changeSort } = useContext(reviewContext)

  const reviewSortOptions = useMemo((): SelectOption[] => {
    return Object.keys(REVIEW_SORT).map((key) => ({
      value: REVIEW_SORT[key],
      label: REVIEW_SORT_LABEL[key],
    }))
  }, [])

  const changeHandler = useCallback((value: string) => {
    changeSort(value as ReviewSortType)
  }, [])

  return (
    <>
      {Boolean(reviews.length) && (
        <Select_Primary options={reviewSortOptions} value={reviewSort} onChange={changeHandler} />
      )}
    </>
  )
}
