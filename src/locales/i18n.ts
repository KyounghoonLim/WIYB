import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translation_ko from './ko/translate_ko.json'

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

export default i18n
