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
    image?: string | null
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
        <div className={cn(styles.container, {[styles.gift]: false})} id={id}>
            <div className={styles.info}>
                <div className={styles.image}>
                    <img src={image || "/images/default-image.png"} alt={defaultTitle} />
                </div>
                <div className={styles.details}>
                    <h3 className={styles.title}>
                        {(title && title[lang]) || defaultTitle}
                    </h3>
                    {desc && <div className={styles.desc}>
                        {desc.substring(0, 60)}{desc.length > 60 ? "..." : ""}
                    </div>}
                </div>
            </div>
            <div className={styles.counter}>
                {control && <ProductCounter
                    amount={amount}
                    increment={control.increment}
                    decrement={control.decrement}
                />}
                <div className={styles.prices}>
                    <div>

                    </div>
                    <div className={styles.price}>
                        {totalPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CartProductItem)
