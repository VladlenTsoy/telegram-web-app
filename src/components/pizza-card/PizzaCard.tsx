import React, {useState} from "react"
import styles from "./PizzaCard.module.css"
import {formatPrice} from "utils/formatPrice"
import {Group} from "types/Menu"
import Modal from "../modal/Modal"
import {motion} from "framer-motion"
import ProductMore from "../product-more/ProductMore"
import {useLanguage} from "utils/i18n.config"
import {useTranslation} from "react-i18next"

interface PizzaCardProps {
    pizza: Group
}

const PizzaCard: React.FC<PizzaCardProps> = ({pizza}) => {
    const {t} = useTranslation()
    const {lang} = useLanguage()
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
                <ProductMore group={pizza} onClose={onCloseHandler} />
            </Modal>
            <div key={pizza.id} className={styles.card} onClick={onClickHandler}>
                <div className={styles.image}>
                    <img src={pizza.image} alt={pizza.name} />
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>{pizza.translations.title[lang]}</div>
                    <div className={styles.desc}>{pizza.translations.desc[lang]}</div>
                    <div className={styles.priceAndButton}>
                        <div className={styles.price}>
                            {lang === "ru" && "от"}<span>{formatPrice(pizza.price)}</span>{t("sum")}
                        </div>
                        <motion.button
                            className={styles.action}
                            layoutId={`card-container-${pizza.id}`}
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
