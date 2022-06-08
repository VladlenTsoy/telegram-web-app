import React from "react"
import styles from "./HeaderBack.module.css"
import {FiArrowLeft} from "react-icons/fi"
import {useLanguage} from "utils/i18n.config"
import {navigate} from "features/app/appSlice"
import {useDispatch} from "store"

const HeaderBack = () => {
    const dispatch = useDispatch()
    const {t} = useLanguage()

    const onClickHandler = () => dispatch(navigate("menu"))

    return (
        <div className={styles.header} onClick={onClickHandler}>
            <FiArrowLeft className={styles.icon} />
            <span className={styles.text}>{t("back")}</span>
        </div>
    )
}

export default HeaderBack
