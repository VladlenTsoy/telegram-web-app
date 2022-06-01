import i18n from "i18next"
import {initReactI18next, useTranslation} from "react-i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "uz",
        interpolation: {
            escapeValue: false
        }
    })

export const useLanguage = () => {
    const {i18n, t} = useTranslation()
    return {t, lang: i18n.language as "ru" | "uz"}
}
