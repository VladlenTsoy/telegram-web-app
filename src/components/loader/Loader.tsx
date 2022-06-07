import React, {useEffect, useState} from "react"
import styles from "./Loader.module.css"
import {icons} from "../../utils/variables"
import cn from "classnames"

interface LoaderProps {
    text?: string
}

const Loader: React.FC<LoaderProps> = ({text}) => {
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
        <div className={styles.loader}>
            <div className={styles.content}>
                <div className={styles.icons}>
                    {Object.values(icons).map((item, key) =>
                        <span className={cn(styles.icon, {[styles.active]: key === visible})}>{item}</span>
                    )}
                </div>
                {text && <div className={styles.text}>{text}</div>}
            </div>
        </div>
    )
}

export default Loader
