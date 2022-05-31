import React, {useState} from "react"
import styles from "./PizzaCard.module.css"
import {formatPrice} from "utils/formatPrice"
import {Group} from "types/Menu"
import Modal from "../modal/Modal"
import {motion} from "framer-motion"
import ModalPizzaCard from "../modal/ModalPizzaCard"

interface PizzaCardProps {
    pizza: Group
}

const PizzaCard: React.FC<PizzaCardProps> = ({pizza}) => {
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => {
        setVisible(true)
    }

    const onCloseHandler = () => {
        setVisible(false)
    }

    return (
        <>
            <Modal visible={visible} onClose={onCloseHandler}>
                <ModalPizzaCard group={pizza} />
            </Modal>
            <div key={pizza.id} className={styles.card}>
                <div className={styles.image}>
                    <img src={pizza.image} alt={pizza.name} />
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>{pizza.translations.title["ru"]}</div>
                    <div className={styles.desc}>{pizza.translations.desc["ru"]}</div>
                    <div className={styles.priceAndButton}>
                        <div className={styles.price}>
                            от<span>{formatPrice(pizza.price)}</span>сум
                        </div>
                        <motion.button
                            className={styles.action}
                            layoutId={`card-container-${pizza.id}`}
                            onClick={onClickHandler}
                        >
                            +
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PizzaCard
