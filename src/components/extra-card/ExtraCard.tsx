import React from "react"
import styles from "./ExtraCard.module.css"
import {Group} from "types/Menu"

interface ConstructorCardProps {
    item: Group
    icon: string
    color: string
}

const ExtraCard: React.FC<ConstructorCardProps> = ({item, icon, color}) => {
    return (
        <div className={styles.card} style={{background: color}}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.title}>
                {item.translations.title["ru"]}
            </div>
        </div>
    )
}

export default ExtraCard
