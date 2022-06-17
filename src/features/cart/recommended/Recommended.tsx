import React from "react"
import styles from "./Recommended.module.css"

const Recommended = () => {
    return (
        <div className={styles.container}>
            <h3>Рекомендуем</h3>
            <div className={styles.recommended}>
                <div className={styles.card}>
                    <div className={styles.icon}>🥤</div>
                    <div className={styles.text}>Напитки</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🍟</div>
                    <div className={styles.text}>Закуски</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🥗</div>
                    <div className={styles.text}>Салаты</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>🍰</div>
                    <div className={styles.text}>Десерты</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.icon}>😋</div>
                    <div className={styles.text}>Соус</div>
                </div>
            </div>
        </div>
    )
}

export default Recommended
