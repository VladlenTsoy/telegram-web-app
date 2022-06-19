import React from "react"
import {
    useCartComboProducts,
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
import Button from "../../components/button/Button"
// import Recommended from "./recommended/Recommended"
import Promocode from "./promocode/cart-promocode/Promocode"
import {useGetPromoCode, useGetPromoCodeProducts} from "./promocode/promoCodeSlice"

const Cart = () => {
    const {t} = useLanguage()
    const cartEntitiesProducts = useCartEntitiesProducts()
    const cartProducts = useCartProducts()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()
    const cartComboProducts = useCartCombos()
    const cartComboProductItems = useCartComboProducts()
    const promoCodeProducts = useGetPromoCodeProducts()
    const promoCode = useGetPromoCode()

    const onClickHandler = () => {
        // console.log(cartComboProducts, cartComboProductItems)
        window.Telegram.WebApp.sendData(JSON.stringify({
            cartEntitiesProducts,
            cartComboProducts,
            cartComboProductItems,
            cartTotalPrice,
            cartCountItems,
            promoCode
        }))
    }

    if (!(cartProducts.length || cartComboProducts.length))
        return <EmptyPage type="cart" title={t("cart")} back="menu" />

    return (
        <div className={styles.wrapper}>
            <HeaderBack back="menu" title={t("cart")} />
            <div className={styles.container}>
                {cartProducts && cartProducts.map(product =>
                    <CartProductItem Component={ProductItem} product={product} key={product.uid} />)}
                {cartComboProducts && cartComboProducts.map(combo =>
                    <CartComboItem combo={combo} key={combo.id} />)}
                {promoCodeProducts && promoCodeProducts.map(product =>
                    <CartProductItem Component={ProductItem} product={product} key={product.uid} coupon />)}
            </div>
            {!cartComboProducts.length && <Promocode />}
            {/*<Recommended />*/}
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
            </div>
            <div className={styles.actions}>
                <Button onClick={onClickHandler}>
                    <div className={styles.button}>
                        <div className={styles.left}>
                            Оформить заказ
                        </div>
                        <div className={styles.right}>
                            {formatPrice(cartTotalPrice)} {t("sum")}
                        </div>
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default Cart
