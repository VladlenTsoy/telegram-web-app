import React, {useEffect} from "react"
import {useTranslation} from "react-i18next"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {fetchMenu} from "./features/menu/fetchMenu"
import {useDispatch} from "./store"
import Loader from "./components/loader/Loader"

const MenuList = React.lazy(() => import("./features/menu/MenuList"))
const Cart = React.lazy(() => import("./features/cart/Cart"))


function App() {
    const {i18n} = useTranslation()
    const dispatch = useDispatch()

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
            // Смена языка
        ;(async () => {
            await i18n.changeLanguage(lang || "uz")
        })()
    }, [i18n])

    useEffect(() => {
        // Загрузка меню
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <React.Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default App
