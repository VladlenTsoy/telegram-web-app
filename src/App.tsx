import React, {useEffect} from "react"
import MenuList from "./features/menu/MenuList"
import {useTranslation} from "react-i18next"
import Cart from "./features/cart/Cart"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
    const {i18n} = useTranslation()

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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuList />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
