import React from "react"
import {
    useCartCombos,
    useCartCountItems,
    useCartEntitiesProducts,
    useCartProducts,
    useCartTotalPrice
} from "./cartSlice"
import {useLanguage} from "../../utils/i18n.config"
import CartProductItem from "./CartProductItem"
import CartComboItem from "./CartComboItem"
import ProductItem from "components/cart-product-item/CartProductItem"
import styles from "./Cart.module.css"
import HeaderBack from "../../components/header-back/HeaderBack"
import EmptyPage from "../../components/empty-page/EmptyPage"

const Cart = () => {
    const {t} = useLanguage()
    const cartEntitiesProducts = useCartEntitiesProducts()
    const cartProducts = useCartProducts()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()
    const cartComboProducts = useCartCombos()

    const onClickHandler = () => {
        window.Telegram.WebApp.sendData(JSON.stringify({
            cartEntitiesProducts,
            cartTotalPrice,
            cartCountItems
        }))
    }

    if (!(cartProducts.length || cartComboProducts.length))
        return <EmptyPage type="cart" title={t("cart")} back="menu" />

    return (
        <>
            <HeaderBack back="menu" title={t("cart")} />
            <div className={styles.container}>
                {cartProducts && cartProducts.map(product =>
                    <CartProductItem Component={ProductItem} product={product} key={product.uid} />)}
                {cartComboProducts && cartComboProducts.map(combo =>
                    <CartComboItem combo={combo} key={combo.id} />)}
            </div>
            <button className={styles.button} onClick={onClickHandler}>
                {t("pay")}
            </button>
        </>
    )
}

export default Cart
