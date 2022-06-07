import React, {useEffect, useState} from "react"
import styles from "./LoadingBlock.module.css"
import {icons} from "../../utils/variables"
import cn from "classnames"

const LoadingBlock = () => {
    const [visible, setVisible] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(prevState => prevState < 5 ? prevState + 1 : 0)
        }, 1500)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={styles.loading}>
            <div className={styles.icons}>
                {Object.values(icons).map((item, key) =>
                    <span className={cn(styles.icon, {[styles.active]: key === visible})}>{item}</span>
                )}
            </div>
        </div>
    )
}

export default LoadingBlock
