import React from "react"
import styles from "./EmptyPage.module.css"
import EmptyImage from "assets/images/empty.svg"
import EmptyCartImage from "assets/images/empty-cart.svg"
import {useLanguage} from "utils/i18n.config"
import {useDispatch} from "store"
import {navigate, useApp} from "features/app/appSlice"
import {BsChevronLeft} from "react-icons/bs"

interface EmptyPageProps {
    title?: string
    back?: string
    type?: "page" | "cart"
}

const EmptyPage: React.FC<EmptyPageProps> = ({type = "page", title, back}) => {
    const {t} = useLanguage()
    const dispatch = useDispatch()
    const {router} = useApp()

    const onBackHandler = () => {
        dispatch(navigate(back || "menu"))
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {!!back && <div className={styles.back} onClick={onBackHandler}>
                    <BsChevronLeft className={styles.icon} />
                </div>}
                {!!title && <div className={styles.title}>
                    {title}
                </div>}
            </div>
            <img
                src={type === "page" ? EmptyImage : EmptyCartImage}
                alt={t(type === "page" ? "empty" : "emptyCart")}
            />
            <div className={styles.text}>{t(type === "page" ? "empty" : "emptyCart")}</div>
        </div>
    )
}

export default EmptyPage
