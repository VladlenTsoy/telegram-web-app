import React from "react"
import styles from "./CartEmpty.module.css"
import EmptyImage from "assets/images/empty.svg"
import {useLanguage} from "utils/i18n.config"

const CartEmpty = () => {
    const {t} = useLanguage()

    return (
        <div className={styles.container}>
            <img src={EmptyImage} alt={t("emptyCart")} />
            {t("emptyCart")}
        </div>
    )
}

export default CartEmpty
