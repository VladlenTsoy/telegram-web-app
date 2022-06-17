import React from "react"
import styles from "./SelectModifierBlock.module.css"
import cn from "classnames"
import {formatPrice} from "../../../utils/formatPrice"

interface SelectModifierBlockProps {
    title: string
    price: number
    added?: boolean
}

const SelectModifierBlock: React.FC<SelectModifierBlockProps> = ({title, price, added}) => {
    return (
        <div className={cn(styles.mainWrapper, {[styles.added]: added})}>
            <div className={styles.addBlock}>
                <span />
                <span />
            </div>
            <img width={40} height={40} src="/images/barbeque-souce.png" alt="" />
            <div>
                <p className={styles.title}>{title}</p>
                <p className={styles.price}>{formatPrice(price)} сум</p>
            </div>
        </div>
    )
}

export default SelectModifierBlock
