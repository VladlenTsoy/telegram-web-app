import React from "react"
import styles from "./ProductCard.module.css"
import {Product} from "types/Menu"
import {formatPrice} from "utils/formatPrice"
import cn from "classnames"
import {useDispatch} from "store"
import {addToCart, minusAmount, useCartGetByUID} from "features/cart/cartSlice"
import {BsPlus, BsDash} from "react-icons/bs"
import {useLanguage} from "../../utils/i18n.config"

interface ProductCardProps {
    product: Product
    scale: string
}

const ProductCard: React.FC<ProductCardProps> = ({product, scale}) => {
    const {lang, t} = useLanguage()
    const dispatch = useDispatch()
    const cartProduct = useCartGetByUID(product.id)

    const onClickAddHandler = () => {
        dispatch(
            addToCart({
                uid: product.id,
                productId: product.id,
                type: "dish",
                title: product.translations.title,
                defaultTitle: product.name,
                comboInformation: null,
                image: product.image,
                amount: 1,
                modifiers: [],
                price: product.price
            })
        )
    }

    const onClickMinusHandler = () => {
        dispatch(minusAmount(product.id))
    }

    return (
        <div className={styles.card}>
            <div
                className={styles.image}
                onClick={onClickAddHandler}
            >
                <img
                    src={product.image}
                    alt={product.translations.title[lang]}
                    style={{transform: `scale(${scale})`}}
                />
                {!!cartProduct && <div className={styles.count} key={cartProduct.amount}>{cartProduct.amount}</div>}
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{product.translations.title[lang]}</div>
                <div className={styles.priceAndButton}>
                    <div className={styles.price}>
                        <span>{formatPrice(product.price)}</span>{t("sum")}
                    </div>
                    <div className={styles.actions}>
                        <button
                            disabled={!cartProduct}
                            onClick={onClickMinusHandler}
                            className={cn(styles.action, styles.remove)}
                        >
                            <span><BsDash /></span>
                        </button>
                        <button
                            onClick={onClickAddHandler}
                            className={cn(styles.action, styles.add, {[styles.block]: !cartProduct})}
                        >
                            {!!cartProduct ? <span><BsPlus /></span> : <span>{t("add")}</span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
