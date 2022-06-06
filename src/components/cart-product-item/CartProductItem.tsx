import React from "react"
import styles from "./CartProductItem.module.css"
import {formatPrice} from "utils/formatPrice"
import cn from "classnames"
import {TranslationTitle} from "types/Menu"
import {useLanguage} from "utils/i18n.config"
import ProductCounter from "../product-counter/ProductCounter"

interface CartProductItemProps {
    id: string
    uid: string
    image?: string
    title?: TranslationTitle
    defaultTitle: string
    desc?: string
    price: number
    amount: number
    positionId?: string
    control?: {
        decrement: () => void
        increment: () => void
    }
    notPrice?: boolean
    checkStop?: boolean
}

const CartProductItem: React.FC<CartProductItemProps> = (
    {
        id,
        uid,
        image,
        title,
        defaultTitle,
        desc,
        price,
        amount,
        positionId,
        control,
        notPrice,
        checkStop
    }
) => {
    const {lang, t} = useLanguage()

    const totalPrice = !notPrice && (checkStop
        ? t("notEnough")
        : positionId
            ? t("free")
            : formatPrice(price * amount) + " " + t("sum"))


    return (
        <div className={cn(styles.mainWrapper, {[styles.giftWrapper]: false})} id={id}>
            <div className={styles.productInfoBlock}>
                <div className={styles.imgWrapper}>
                    <img src={image || "/images/default-image.png"} alt={defaultTitle} />
                </div>
                <div className={styles.textBlock}>
                    <h3 className={styles.productName}>
                        {(title && title[lang]) || defaultTitle}
                    </h3>
                    {desc && <div className={styles.productDescription}>
                        {desc.substring(0, 60)}{desc.length > 60 ? "..." : ""}
                    </div>}
                </div>
            </div>
            <div className={styles.counterBlock}>
                {control && <ProductCounter
                    amount={amount}
                    increment={control.increment}
                    decrement={control.decrement}
                />}
                <div className={styles.currPrice}>
                    {totalPrice}
                </div>
            </div>
        </div>
    )
}

export default React.memo(CartProductItem)
