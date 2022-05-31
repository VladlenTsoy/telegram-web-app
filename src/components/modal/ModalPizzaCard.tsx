import React from "react"
import styles from "./ModalPizzaCard.module.css"
import {motion} from "framer-motion"
import {Group} from "types/Menu"
import LabelTextToggleBtn from "../lable-text-toggle-btn/LabelTextToggleBtn"


const pizzaSizeData = [
    {
        title: "Маленькая",
        id: 1
    },
    {
        title: "Средняя",
        id: 2
    },
    {
        title: "Большая",
        id: 3
    }
]

const pizzaTypeData = [
    {
        title: "Воздушное",
        id: 1
    }
]


interface ModalPizzaCardProps {
    group: Group
    onClose: () => void
}

const ModalPizzaCard: React.FC<ModalPizzaCardProps> = ({group, onClose}) => {
    const onDragListener = (e: any) => {
        if (e.layerY <= 0) onClose()
    }

    return (
        <motion.div
            className={styles.card}
            drag={"y"}
            onDragEnd={onDragListener}
            dragConstraints={{
                top: 0,
                left: -0,
                right: 0,
                bottom: 0
            }}
            layoutId={`card-container-${group.id}`}
        >
            <img src={group.image} alt={group.translations.title["ru"]} className={styles.image} />
            <div className={styles.details}>
                <h1 className={styles.title}>{group.translations.title["ru"]}</h1>
                <p className={styles.description}>{group.translations.desc["ru"]}</p>
                <LabelTextToggleBtn value={0} data={pizzaSizeData} label={"Выберите тип теста"} />
                <LabelTextToggleBtn value={0} data={pizzaTypeData} label={"Выберите тип теста"} />
                <div className={styles.priceAndAction}>
                    <div className={styles.price}>90 000 сум</div>
                    <button className={styles.action}>Добавить в корзину</button>
                </div>
            </div>
        </motion.div>
    )
}

export default ModalPizzaCard
