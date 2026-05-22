import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import enJSON from "../locales/en.json"
import arJSON from "../locales/ar.json"

const resources = {
  en: {
    translation: enJSON
  },
  ar: {
    translation: arJSON
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
