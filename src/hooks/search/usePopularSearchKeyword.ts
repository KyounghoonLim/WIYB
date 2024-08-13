'use client'

import { getPopularKeywordsApi } from '@/src/services/searchApi'
import useMySWR from '../useMySWR'

export default function usePopularSearchKeywords() {
  const { data } = useMySWR('getPopularSearchKeywords', getPopularKeywordsApi)

  return { popularSearchKeywords: data }
}
