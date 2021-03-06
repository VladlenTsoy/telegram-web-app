import React, {useEffect} from "react"
import {useTranslation} from "react-i18next"
import {fetchMenu} from "./features/menu/fetchMenu"
import {useDispatch} from "./store"
import Loader from "./components/loader/Loader"
import {getCookie, setCookie} from "./utils/cookie"
import {useApp} from "./features/app/appSlice"
import {useGetMenu, useGetMenuLoading} from "./features/menu/menuSlice"
import Constructor from "./features/constructor/constructor"
import PizzaHalf from "./features/pizza-half/PizzaHalf"
import mixpanel from "mixpanel-browser"

const MenuList = React.lazy(() => import("./features/menu/MenuList"))
const Cart = React.lazy(() => import("./features/cart/Cart"))
const ComboMore = React.lazy(() => import("./features/combo/combo-more/ComboMore"))

function App() {
    const {t} = useTranslation()
    const {router} = useApp()
    const {i18n} = useTranslation()
    const dispatch = useDispatch()
    const categories = useGetMenu()
    const isLoading = useGetMenuLoading()

    useEffect(() => {
        // Запуск телеграм приложения
        window.Telegram.WebApp.ready()
        // Загрузка mixpanel
        mixpanel.init("951f0eb4551cdf581bbf1a2f5af8237d")
        if (window.Telegram?.WebApp?.initDataUnsafe?.chat?.id)
            mixpanel.track("tg_web_app_open", {distinct_id: window.Telegram.WebApp.initDataUnsafe.chat.id})
        else
            mixpanel.track("tg_web_app_open")
        // Тема для приложения
        document.body.dataset.theme = window?.Telegram?.WebApp?.colorScheme || "light"
        // document.body.dataset.theme = "dark"
    }, [])

    useEffect(() => {
        // Определить язык
        const urlParams = new URLSearchParams(window.location.search)
        const lang = urlParams.get("lang")
        const phone = urlParams.get("phone")
        const token = urlParams.get("token")
        lang && setCookie("lang", lang)
        phone && setCookie("phone", phone)
        token && setCookie("token", token)
        // Смена языка
        ;(async () => {
            await i18n.changeLanguage(lang || getCookie("lang") || "uz")
        })()
    }, [i18n])

    useEffect(() => {
        // Загрузка меню
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])


    if (isLoading || !categories.length)
        return <Loader text={t("loading")} />

    return (
        <React.Suspense fallback={<Loader text={t("loading")} />}>
            {router === "menu" && <MenuList />}
            {router === "cart" && <Cart />}
            {router === "constructor" && <Constructor />}
            {router === "half" && <PizzaHalf />}
            {router.includes("combo") && <ComboMore />}
        </React.Suspense>
    )
}

export default App
