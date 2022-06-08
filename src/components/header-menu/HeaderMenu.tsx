import React from "react"
import styles from "./HeaderMenu.module.css"
import cn from "classnames"
import {icons, successPriceCart} from "utils/variables"
import {Category} from "types/Menu"
import {useLanguage} from "utils/i18n.config"
import {useCartQtyItems, useCartTotalPrice} from "features/cart/cartSlice"
import {navigate} from "features/app/appSlice"
import {useDispatch} from "store"

interface HeaderMenuProps {
    categories: Category[]
    selectCategoryId?: string
    onClickHandler: (categoryId: string) => void
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({categories, selectCategoryId, onClickHandler}) => {
    const {lang} = useLanguage()
    const dispatch = useDispatch()
    const cartCountItems = useCartQtyItems()
    const cartTotalPrice = useCartTotalPrice()

    const toCartHandler = () => dispatch(navigate("cart"))

    const cartGradient = (cartTotalPrice / successPriceCart) * 100
    const totalCartGradient = cartGradient > 100 ? 100 : cartGradient

    return (
        <>
            <div className={styles.list}>
                {
                    categories.map(category =>
                        <div
                            key={category.id}
                            className={cn(styles.card, {[styles.active]: category.id === selectCategoryId})}
                            onClick={() => onClickHandler(category.id)}
                        >
                            <span className={styles.icon}>{icons[category.id]}</span>
                            <div className={styles.title}>{category.translations.title[lang] || category.name}</div>
                        </div>
                    )
                }
            </div>
            <div className={styles.extra}>
                <div
                    key="promotions"
                    className={cn(styles.promotions, {[styles.active]: "promotions" === selectCategoryId})}
                    onClick={() => onClickHandler("promotions")}
                >
                    <span className={styles.icon}>🎉</span>
                    <div>
                        <div className={styles.title}>Новые</div>
                        <div className={styles.count}>Акции</div>
                    </div>
                </div>
                <div
                    key="cart"
                    className={cn(styles.cart)}
                    style={{backgroundPosition: `${totalCartGradient}% 50%`}}
                    onClick={toCartHandler}
                >
                    <div>
                        <div className={styles.title}>Корзина</div>
                        <div className={styles.count}>{cartCountItems} шт.</div>
                    </div>
                    <div className={styles.icon}>🛒</div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu
