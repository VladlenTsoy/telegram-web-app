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
import {formatPrice} from "../../utils/formatPrice"
import cn from "classnames"

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
            <div className={styles.recommended}>
                <div className={styles.card}>
                    <div className={styles.icon}>🥤</div>
                    <div className={styles.text}>Напитки</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🍟</div>
                    <div className={styles.text}>Закуски</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🥗</div>
                    <div className={styles.text}>Салаты</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🍰</div>
                    <div className={styles.text}>Десерты</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>😋</div>
                    <div className={styles.text}>Соус</div>
                </div>
            </div>
            <div className={styles.bottomInfo}>
                <div className={styles.totalInfo}>
                    <div className={styles.item}>
                        <div className={styles.title}>Доставка</div>
                        <div className={styles.value}>Бесплатно</div>
                    </div>
                    <div className={cn(styles.item, styles.totalPrice)}>
                        <div className={styles.title}>К оплате</div>
                        <div className={styles.value}>{formatPrice(cartTotalPrice)} {t("sum")}</div>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.button} onClick={onClickHandler}>
                        {t("pay")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Cart
