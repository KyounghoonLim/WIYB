'use client'

import { getPopularKeywordsApi } from '@/src/services/searchApi'
import useMyQuery from '../useMyQuery'

export default function usePopularSearchKeywords() {
  const { data } = useMyQuery(['getPopularSearchKeywords'], getPopularKeywordsApi)

  return { popularSearchKeywords: data }
}
