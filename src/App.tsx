import React, {useCallback, useEffect} from "react"
import styles from "./App.module.css"
import MenuList from "./features/menu/MenuList"
import {useDispatch} from "./store"
import {fetchMenu} from "./features/menu/fetchMenu"
import Loader from "./components/loader/Loader"
import {useGetMenuLoading} from "./features/menu/menuSlice"
import cn from "classnames"
import {useTranslation} from "react-i18next"
import {useCartCountItems, useCartProducts, useCartTotalPrice} from "./features/cart/cartSlice"

function App() {
    const isLoading = useGetMenuLoading()
    const dispatch = useDispatch()
    const {i18n} = useTranslation()
    const cartTotalPrice = useCartTotalPrice()
    const products = useCartProducts()
    const cartCountItems = useCartCountItems()

    useEffect(() => {
        // Запуск телеграм приложения
        window.Telegram.WebApp.ready()
        // Загрузка меню
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])
    const data = JSON.stringify({products, cartCountItems, cartTotalPrice})

    const updateData = useCallback((data: string) => {
        document.body.innerText = String(cartTotalPrice || "Пусто")
        setTimeout(() => {
            return window.Telegram.WebApp.sendData(data)
        }, 3000)
    }, [products, cartCountItems, cartTotalPrice])

    useEffect(() => {
        // Кнопка
        window.Telegram.WebApp.MainButton.onClick(() => {
            updateData(data)
        })
    }, [updateData])

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
        <div className={cn(styles.app)} data-theme={window?.Telegram?.WebApp?.colorScheme || "light"}>
            <MenuList />
        </div>
    )
}

export default App
