import React, {useEffect} from "react"
import {useCartCombos, useCartCountItems, useCartProducts, useCartTotalPrice} from "./cartSlice"
import {useLanguage} from "../../utils/i18n.config"
import CartProductItem from "./CartProductItem"
import CartComboItem from "./CartComboItem"
import ProductItem from "components/cart-product-item/CartProductItem"
import styles from "./Cart.module.css"

const Cart = () => {
    const {t} = useLanguage()
    const cartProducts = useCartProducts()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()
    const cartComboProducts = useCartCombos()

    useEffect(() => {
        window.Telegram.WebApp.MainButton.text = t("pay")
        window.Telegram.WebApp.MainButton.onClick(() => {
            window.Telegram.WebApp.sendData(JSON.stringify({
                cartProducts,
                cartTotalPrice,
                cartCountItems
            }))
        })
    }, [cartCountItems, cartTotalPrice, cartProducts, t])

    return (
        <div className={styles.productsContainer}>
            {!(cartProducts.length || cartComboProducts.length) &&
                <div className={styles.container}>{t("emptyCart")}</div>}
            {cartProducts && cartProducts.map(product =>
                <CartProductItem Component={ProductItem} product={product} key={product.uid} />)}
            {cartComboProducts && cartComboProducts.map(combo =>
                <CartComboItem combo={combo} key={combo.id} />)}
        </div>
    )
}

export default Cart
