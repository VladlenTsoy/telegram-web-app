import React from "react"
import styles from "./CartEmpty.module.css"
import EmptyCartImage from "assets/images/empty-cart.svg"
import {useLanguage} from "utils/i18n.config"

const CartEmpty = () => {
    const {t} = useLanguage()

    return (
        <div className={styles.container}>
            <img src={EmptyCartImage} alt={t("emptyCart")} />
            <div className={styles.text}>{t("emptyCart")}</div>
        </div>
    )
}

export default CartEmpty
