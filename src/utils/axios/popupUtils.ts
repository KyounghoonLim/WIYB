'use client'

import { DEFAULT_POPUP_OPTIONS } from 'src/constants/popup.constant'

export { openPopup }

function openPopup(url: string) {
  const { outerWidth, outerHeight } = window
  const options = {
    ...DEFAULT_POPUP_OPTIONS,
    top: (outerHeight - DEFAULT_POPUP_OPTIONS.height) / 2,
    left: (outerWidth - DEFAULT_POPUP_OPTIONS.width) / 2,
  }
  const serializedOptions = Object.entries(options).reduce((prev, [key, value]) => {
    return `${prev},${key}=${value}`
  }, '')
  window.open(url, '_blank', serializedOptions)
}
