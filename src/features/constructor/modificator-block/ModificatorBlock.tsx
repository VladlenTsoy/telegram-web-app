import React from "react"
import styles from "./ModificatorBlock.module.css"
import {formatPrice} from "utils/formatPrice"
import {CartProductModifier} from "../../../types/Cart"
import cn from "classnames"

interface ModificatorBlockProps {
    id: string
    title: string
    price: number
    image: string
    modifiers: CartProductModifier[]
    onAddToppingHandler: (modeId: any) => void
}

const ModificatorBlock: React.FC<ModificatorBlockProps> = (
    {
        id,
        image,
        title,
        price,
        modifiers,
        onAddToppingHandler
    }
) => {
    const isActive = modifiers.find(modify => modify.productId == id)

    return (
        <div className={styles.modify} onClick={() => onAddToppingHandler(id)}>
            <img src={image} alt="" width={50} height={50} />
            <div className={styles.title}>{title}</div>
            <div className={styles.bottomBlock}>
                <p>{formatPrice(price)} сум</p>
                <button className={cn(styles.button, {[styles.active]: isActive})}>
                    {!isActive ?
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 6.01004C12 6.56233 11.5523 7.01205 11 7.01205H7V11.0201C7 11.5724 6.55228 12.0201 6 12.0201C5.44772 12.0201 5 11.5724 5 11.0201V7.01205H1C0.447715 7.01205 0 6.56233 0 6.01004C0 5.45776 0.447715 5.00803 1 5.00803H5V1C5 0.447716 5.44772 0 6 0C6.55228 0 7 0.447715 7 1V5.00803H11C11.5523 5.00803 12 5.45776 12 6.01004Z"
                                fill="black" />
                        </svg>
                        :
                        <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.59701 8.70149L1.14925 5.25373L0 6.40299L4.59701 11L14.4478 1.14925L13.2985 0L4.59701 8.70149Z"
                                fill="white" />
                        </svg>
                    }
                </button>
            </div>
        </div>
    )
}

export default ModificatorBlock
