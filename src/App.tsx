import React, {useEffect} from "react"
import MenuList from "./features/menu/MenuList"
import {useDispatch} from "./store"
import {fetchMenu} from "./features/menu/fetchMenu"
import Loader from "./components/loader/Loader"
import {useGetMenuLoading} from "./features/menu/menuSlice"
import {useTranslation} from "react-i18next"
import {useCartCountItems, useCartTotalPrice} from "./features/cart/cartSlice"
import Cart from "./features/cart/Cart"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
    const isLoading = useGetMenuLoading()
    const dispatch = useDispatch()
    const {i18n} = useTranslation()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()

    useEffect(() => {
        // Загрузка меню
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const lang = urlParams.get("lang")
            // Смена языка
        ;(async () => {
            await i18n.changeLanguage(lang || "uz")
        })()
    }, [])

    useEffect(() => {
        if (cartTotalPrice > 0) {
            window.Telegram.WebApp.MainButton.text = `Корзина (${cartCountItems})`
            window.Telegram.WebApp.MainButton.show()
        } else
            window.Telegram.WebApp.MainButton.hide()
    }, [cartTotalPrice])

    if (isLoading)
        return <Loader />

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
