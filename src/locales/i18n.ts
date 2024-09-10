import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation_ko from './ko/translate_ko.json'
import { DATE_TO_SECOND_CONSTANT } from 'constants/date.constant'

const rtf = new Intl.RelativeTimeFormat('ko', { style: 'short' })

i18n.use(initReactI18next).init({
  resources: {
    ko: {
      translation: translation_ko,
    },
  },
  ns: ['translation'],
  lng: 'ko',
  fallbackLng: 'ko',
})

i18n.services.formatter.add('relativeTime', (value) => {
  const d = new Date(value)
  const now = new Date()

  const sub = Math.floor((now.getTime() - d.getTime()) / 1000)
  const { Y, M, D, h, m } = DATE_TO_SECOND_CONSTANT

  if (sub > Y) {
    return rtf.format(-Math.round(sub / Y), 'years')
  } else if (sub > M) {
    return rtf.format(-Math.round(sub / M), 'months')
  } else if (sub > D) {
    return rtf.format(-Math.round(sub / D), 'days')
  } else if (sub > h) {
    return rtf.format(-Math.round(sub / h), 'hours')
  } else if (sub > m) {
    return rtf.format(-Math.round(sub / m), 'minutes')
  } else {
    return '방금전'
  }
})

export default i18n
