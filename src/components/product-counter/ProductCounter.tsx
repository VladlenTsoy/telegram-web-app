import React from "react"
import styles from "./ProductCounter.module.css"

interface ProductCounterProps {
    amount: number
    increment: () => void
    decrement: () => void
}

const ProductCounter: React.FC<ProductCounterProps> = ({amount, decrement, increment}) => {
    return (
        <div className={styles.wrapper}>
            <div onClick={decrement} className={styles.decrementBlock}>
                <span />
            </div>
            <span className={styles.amount}>
                {amount}
            </span>
            <div onClick={increment} className={styles.incrementBlock}>
                <span />
                <span />
            </div>
        </div>
    )
}

export default ProductCounter
