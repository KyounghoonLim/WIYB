'use client'

import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function useMyTranslate(keyPrefix?: string) {
  const { t: _t } = useTranslation('translation', { keyPrefix })
  const t = useCallback(
    (key: string) => {
      return _t(key)
    },
    [_t]
  )

  return { t }
}
