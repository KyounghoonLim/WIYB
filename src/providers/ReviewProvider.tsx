'use client'

import { dummy_review } from '@/@dummy'
import { REVIEW_SORT, ReviewSortType } from 'constants/review.constant'
import useMyQuery from 'hooks/useMyQuery'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { getEquipmentReviewsApi } from 'services/equipmentApi'
import { Review } from 'types/review.types'

export const reviewContext = createContext<{
  reviews: Review[]
  reviewSort: ReviewSortType
  changeSort: (value: ReviewSortType) => void
  isEndOfPage: boolean
  goToNextPage: () => void
}>(null)

export default function ReviewProvider({ children, id }: { children: ReactNode; id: string }) {
  /// 최초 리뷰 저장용 ///
  //@ts-ignore
  const [reviews, setReviews] = useState<Review[]>(dummy_review)
  /// 리뷰 정렬 ///
  const [reviewSort, setReviewSort] = useState<ReviewSortType>(REVIEW_SORT.POPULAR)
  /// 리뷰 페이지네이션 ///
  const [reviewPage, setReviewPage] = useState<number>(1)

  const [pageOfView] = useState<number>(3)

  const isEndOfPage = useMemo(() => {
    return reviewPage * pageOfView >= reviews.length
  }, [reviews, reviewPage, pageOfView])

  /// 소팅 관련 리뷰 데이터 메모이제이션 ///
  const [popularReviews, descReviews, ascReviews] = useMemo(() => {
    if (!reviews.length) {
      return Array(3).fill([])
    } else {
      const popluarReviews = reviews
      const descReviews = reviews.toSorted((a, b) => {
        const ts_a = new Date(a.createdAt).getTime()
        const ts_b = new Date(b.createdAt).getTime()
        return ts_a - ts_b
      })
      const ascReviews = reviews.toSorted((a, b) => {
        const ts_a = new Date(a.createdAt).getTime()
        const ts_b = new Date(b.createdAt).getTime()
        return ts_a - ts_b
      })

      return [popluarReviews, descReviews, ascReviews]
    }
  }, [reviews])

  /// 실제로 랜더링 되는 데이터 ///
  const toRenderReviews = useMemo(() => {
    switch (reviewSort) {
      case REVIEW_SORT.POPULAR:
        return popularReviews.slice(0, pageOfView * reviewPage)
      case REVIEW_SORT.DESC:
        return descReviews.slice(0, pageOfView * reviewPage)
      case REVIEW_SORT.ASC:
        return ascReviews.slice(0, pageOfView * reviewPage)
    }
  }, [popularReviews, descReviews, ascReviews, reviewSort, reviewPage, pageOfView])

  const postReview = useCallback(() => {}, [])

  const goToNextPage = useCallback(() => setReviewPage((temp) => temp + 1), [])

  const changeSort = useCallback((value: ReviewSortType) => {
    setReviewPage(1)
    setReviewSort(value)
  }, [])
  // useMyQuery([id], getEquipmentReviewsApi, { enabled: Boolean(reviews.length) }, setReviews)

  return (
    <reviewContext.Provider
      value={{ reviews: toRenderReviews, reviewSort, changeSort, isEndOfPage, goToNextPage }}
    >
      {children}
    </reviewContext.Provider>
  )
}
