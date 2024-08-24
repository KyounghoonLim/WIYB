'use client'

import Select_Primary from 'components/select/Select_Primary'
import { REVIEW_SORT, REVIEW_SORT_LABEL, ReviewSortType } from 'constants/review.constant'
import { reviewContext } from 'providers/ReviewProvider'
import { useCallback, useContext, useMemo } from 'react'
import { SelectOption } from 'types/components/select/select.interface'

export default function Review_Sorts() {
  const { reviewSort, changeSort } = useContext(reviewContext)

  const reviewSortOptions = useMemo((): SelectOption[] => {
    return Object.keys(REVIEW_SORT).map((key) => ({
      value: REVIEW_SORT[key],
      label: REVIEW_SORT_LABEL[key],
    }))
  }, [])

  const changeHandler = useCallback((value: string) => {
    changeSort(value as ReviewSortType)
  }, [])

  return <Select_Primary options={reviewSortOptions} value={reviewSort} onChange={changeHandler} />
}
