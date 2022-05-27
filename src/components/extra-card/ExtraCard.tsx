import React from "react"
import styles from "./ExtraCard.module.css"
import {Group} from "types/Menu"
import cn from "classnames"

interface ConstructorCardProps {
    item: Group
    type: "constructor" | "half"
}

const ExtraCard: React.FC<ConstructorCardProps> = ({item, type}) => {
    return (
        <div className={cn(styles.card, styles[type])}>
            <div className={styles.icon}>{type === "constructor" ? "👷" : "🌓"}</div>
            <div className={styles.title}>
                {item.translations.title["ru"]}
            </div>
        </div>
    )
}

export default ExtraCard
