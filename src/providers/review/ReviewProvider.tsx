'use client'

import { REVIEW_SORT, ReviewSortType } from 'constants/review.constant'
import useMyQuery from 'hooks/useMyQuery'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useLayoutEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { getEquipmentReviewsApi } from 'services/reviewApis'
import { ReviewResult } from 'types/review.types'

export const reviewContext = createContext<{
  contents: ReviewResult['content']
  metadata: ReviewResult['metadata']
  reviewSort: ReviewSortType
  changeSort: (sortOption: ReviewSortType) => void
  isLoading: boolean
  isEndOfPage: boolean
  reviewOffset: number
  setReviewOffset: Dispatch<SetStateAction<number>>
  goToNextPage: () => void
}>(null)

export default function ReviewProvider({
  equipmentId,
  children,
}: {
  equipmentId: string
  children: ReactNode
}) {
  const [reviewContextId, setReviewContextId] = useState<string>(null)
  const [reviewOffset, setReviewOffset] = useState<number>(1)
  const [reviewSize, setReviewSize] = useState<number>(20)
  const [reviewSort, setReviewSort] = useState<ReviewSortType>(REVIEW_SORT.POPULAR)

  const [contents, setContents] = useState<ReviewResult['content']>([])
  const [metadata, setMetadata] = useState<ReviewResult['metadata']>(null)
  const [isEndOfPage, setIsEndOfPage] = useState<boolean>(false)

  const isFetchEnable = useMemo(() => {
    if (!reviewContextId) return true
    else return reviewOffset !== 1
  }, [reviewContextId, reviewOffset])

  const goToNextPage = useCallback(() => {
    setReviewOffset((temp) => temp + 1)
  }, [])

  const changeSort = useCallback((sortOption: ReviewSortType) => {
    setReviewSort(sortOption)
    setReviewContextId(null)
    setReviewOffset(1)
  }, [])

  const successHandler = useCallback(({ metadata, content }: ReviewResult) => {
    setIsEndOfPage(metadata.isLast)
    setReviewContextId(metadata.contextId)
    setContents(content)
    setMetadata(metadata)
  }, [])

  const { isLoading } = useMyQuery(
    [equipmentId, reviewContextId, reviewOffset, reviewSize, reviewSort],
    getEquipmentReviewsApi,
    { enabled: isFetchEnable, gcTime: 0 },
    successHandler
  )

  return (
    <reviewContext.Provider
      value={{
        contents,
        metadata,
        reviewSort,
        changeSort,
        isLoading,
        isEndOfPage,
        reviewOffset,
        setReviewOffset,
        goToNextPage,
      }}
    >
      {children}
    </reviewContext.Provider>
  )
}
