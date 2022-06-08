import React from "react"
import styles from "./ExtraCard.module.css"
import {Group} from "types/Menu"
import cn from "classnames"
import {useLanguage} from "utils/i18n.config"
import {navigate} from "../../features/app/appSlice"

interface ConstructorCardProps {
    item: Group
    link?: string
    type: "constructor" | "half"
}

const ExtraCard: React.FC<ConstructorCardProps> = ({item, type, link}) => {
    const {lang} = useLanguage()

    const clickHandler = () => {
        if (link) navigate(link)
    }

    return (
        <div className={cn(styles.card, styles[type])} onClick={clickHandler}>
            <div className={styles.icon}>{type === "constructor" ? "👷" : "🌓"}</div>
            <div className={styles.title}>
                {item.translations.title[lang]}
            </div>
        </div>
    )
}

export default ExtraCard
