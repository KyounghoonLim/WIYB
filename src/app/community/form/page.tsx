'use client'

import Form_Community from 'components/form/Form_Community'
import { STORAGE_KEY, STORAGE_TYPE } from 'constants/storage.constant'
import { useLayoutEffect, useMemo } from 'react'
import { CommunityPost } from 'types/community.types'
import { getStorageItem, removeStorageItem } from 'utils/storageUtils'

export default function CommunityFormPage() {
  /// 직전 페이지의 포스트 데이터 싱크 ///
  const post = useMemo((): CommunityPost => {
    try {
      return JSON.parse(getStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.COMMUNITY.LATEST_POST))
    } catch {
      return undefined
    }
  }, [])

  useLayoutEffect(() => {
    const clearCache = () => {
      removeStorageItem(STORAGE_TYPE.SESSION, STORAGE_KEY.COMMUNITY.LATEST_POST)
    }
    window.addEventListener('beforeunload', clearCache)
    return () => {
      /// 직전 페이지의 포스트 캐싱 삭제 ///
      window.removeEventListener('beforeunload', clearCache)
      clearCache()
    }
  }, [])

  console.log(post)

  return (
    <main className="PAGE-CONTAINER">
      <Form_Community post={post} />
    </main>
  )
}
