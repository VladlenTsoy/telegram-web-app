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
        // Тема для приложения
        document.body.dataset.theme = window?.Telegram?.WebApp?.colorScheme || "light"
    }, [])

    useEffect(() => {
        // Определить язык
        const urlParams = new URLSearchParams(window.location.search)
        const lang = urlParams.get("lang")
        lang && setCookie("lang", lang)
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
