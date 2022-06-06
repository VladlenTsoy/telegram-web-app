import React, {useEffect} from "react"
import MenuList from "./features/menu/MenuList"
import {useTranslation} from "react-i18next"
import {useCartCountItems, useCartTotalPrice} from "./features/cart/cartSlice"
import Cart from "./features/cart/Cart"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
    const {i18n, t} = useTranslation()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()

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
        // Вывод корзины
        if (cartTotalPrice > 0) {
            window.Telegram.WebApp.MainButton.text = `${t("basket")} (${cartCountItems})`
            window.Telegram.WebApp.MainButton.show()
        } else
            window.Telegram.WebApp.MainButton.hide()
    }, [cartTotalPrice, t, cartCountItems])

    return (
        <div data-theme={window?.Telegram?.WebApp?.colorScheme || "light"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
