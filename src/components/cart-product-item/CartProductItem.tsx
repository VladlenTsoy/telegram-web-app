import React from "react"
import styles from "./CartProductItem.module.css"
import {formatPrice} from "utils/formatPrice"
import Counter from "components/counter/Counter"
import cn from "classnames"
import {TranslationTitle} from "types/Menu"
import Button from "components/button/Button"
import {AiFillDelete} from "react-icons/ai"
import {useDispatch} from "store"
import {removeFromCart} from "features/cart/cartSlice"
import {useLanguage} from "utils/i18n.config"

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
    const dispatch = useDispatch()

    const removeHandler = () => {
        dispatch(removeFromCart(uid))
    }

    return (
        <div className={styles.cartItem} id={id}>
            <div className={styles.image}>
                {image && <img src={image} alt="" />}
            </div>
            <div className={styles.details}>
                <div className={styles.info}>
                    <div className={styles.title}>{(title && title[lang]) || defaultTitle}</div>
                    {desc && <div className={styles.desc}>{desc.substring(0, 60)}{desc.length > 60 ? "..." : ""}</div>}
                </div>
                <div className={styles.actions}>
                    <span className={cn(styles.price, {[styles.red]: checkStop})}>
                        {
                            !notPrice && (checkStop
                                ? t("notEnough")
                                : positionId
                                    ? t("free")
                                    : formatPrice(price * amount) + " " + t("sum"))
                        }
                    </span>
                    {
                        control ?
                            <Counter amount={amount} decrement={control.decrement} increment={control.increment} /> :
                            <span>{amount} {t("count")}</span>
                    }
                    {
                        checkStop &&
                        <Button size="small" danger ghost icon={<AiFillDelete />} onClick={removeHandler} />
                    }
                </div>
            </div>
        </div>
    )
}

export default React.memo(CartProductItem)
