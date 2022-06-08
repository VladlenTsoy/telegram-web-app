import React, {useEffect} from "react"
import {useCartCombos, useCartCountItems, useCartProducts, useCartTotalPrice} from "./cartSlice"
import {useLanguage} from "../../utils/i18n.config"
import CartProductItem from "./CartProductItem"
import CartComboItem from "./CartComboItem"
import ProductItem from "components/cart-product-item/CartProductItem"
import styles from "./Cart.module.css"
import HeaderBack from "../../components/header-back/HeaderBack"
import CartEmpty from "../../components/cart-empty/CartEmpty"
import EmptyPage from "../../components/empty-page/EmptyPage"

const Cart = () => {
    const {t} = useLanguage()
    const cartProducts = useCartProducts()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()
    const cartComboProducts = useCartCombos()

    useEffect(() => {
        // Изменить кнопку на оплатить
        window.Telegram.WebApp.MainButton.text = t("pay")
        // Вывод корзины
        if (cartTotalPrice > 0) {
            window.Telegram.WebApp.MainButton.show()
        } else
            window.Telegram.WebApp.MainButton.hide()
        return () => {
            window.Telegram.WebApp.MainButton.hide()
            window.Telegram.WebApp.MainButton.onClick(() => null)
        }
    }, [cartCountItems, cartTotalPrice, cartProducts, t])

    const onClickHandler = () => {
        window.Telegram.WebApp.sendData(JSON.stringify({
            cartProducts,
            cartTotalPrice,
            cartCountItems
        }))
    }

    if (!(cartProducts.length || cartComboProducts.length))
        return <EmptyPage type="cart" title={t("cart")} back="menu" />

    return (
        <>
            <HeaderBack />
            <div className={styles.container}>
                {cartProducts && cartProducts.map(product =>
                    <CartProductItem Component={ProductItem} product={product} key={product.uid} />)}
                {cartComboProducts && cartComboProducts.map(combo =>
                    <CartComboItem combo={combo} key={combo.id} />)}
            </div>
            <button onClick={onClickHandler}>
                Отправить
            </button>
        </>
    )
}

export default Cart
