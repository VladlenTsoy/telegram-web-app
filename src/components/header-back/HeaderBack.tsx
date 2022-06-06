import React from "react"
import styles from "./HeaderBack.module.css"
import {FiArrowLeft} from "react-icons/fi"
import {useNavigate} from "react-router-dom"
import {useLanguage} from "../../utils/i18n.config"

const HeaderBack = () => {
    const navigate = useNavigate()
    const {t} = useLanguage()

    const onClickHandler = () => navigate("/")

    return (
        <div className={styles.header} onClick={onClickHandler}>
            <FiArrowLeft className={styles.icon} />
            <span className={styles.text}>{t("back")}</span>
        </div>
    )
}

export default HeaderBack
