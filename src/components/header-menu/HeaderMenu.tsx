import React from "react"
import styles from "./HeaderMenu.module.css"
import cn from "classnames"
import {icons} from "utils/variables"
import {Category} from "types/Menu"
import {useLanguage} from "utils/i18n.config"
import {useCartQtyItems} from "features/cart/cartSlice"

interface HeaderMenuProps {
    categories: Category[]
    selectCategoryId?: string
    onClickHandler: (categoryId: string) => void
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({categories, selectCategoryId, onClickHandler}) => {
    const {lang} = useLanguage()
    const cartCountItems = useCartQtyItems()

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
                    <span className={styles.icon}>{icons["promotions"]}</span>
                    <div className={styles.title}>Акции</div>
                </div>
                <div
                    key="cart"
                    className={cn(styles.cart, {
                        [styles.active]: "cart" === selectCategoryId,
                        [styles.disabled]: !cartCountItems
                    })}
                    onClick={() => onClickHandler("cart")}
                >
                    <div>
                        <div className={styles.title}>Корзина</div>
                        <div className={styles.count}>{cartCountItems} шт.</div>
                    </div>
                    <div className={styles.icon}>{icons["cart"]}</div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenu
