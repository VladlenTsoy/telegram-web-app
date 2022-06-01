import React from "react"
import styles from "./ExtraCard.module.css"
import {Group} from "types/Menu"
import cn from "classnames"
import {useLanguage} from "../../utils/i18n.config"

interface ConstructorCardProps {
    item: Group
    type: "constructor" | "half"
}

const ExtraCard: React.FC<ConstructorCardProps> = ({item, type}) => {
    const {lang} = useLanguage()

    return (
        <div className={cn(styles.card, styles[type])}>
            <div className={styles.icon}>{type === "constructor" ? "👷" : "🌓"}</div>
            <div className={styles.title}>
                {item.translations.title[lang]}
            </div>
        </div>
    )
}

export default ExtraCard
