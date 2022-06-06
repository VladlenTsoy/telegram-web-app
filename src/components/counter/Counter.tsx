import React from "react"
import styles from "./Counter.module.css"
import cn from "classnames"

interface CounterProps {
    decrement: any
    increment: any
    amount: any
}

const Counter: React.FC<CounterProps> = ({decrement, amount, increment}) => {
    return (
        <div className={styles.counter}>
            <div className={cn(styles.button, "add")} onClick={decrement}>
                <span className={styles.icon} />
            </div>
            <div className={styles.text}>{amount}</div>
            <div className={cn(styles.button, "sub")} onClick={increment}>
                <span className={styles.icon} />
                <span className={cn(styles.icon, styles.sub)} />
            </div>
        </div>
    )
}

export default Counter