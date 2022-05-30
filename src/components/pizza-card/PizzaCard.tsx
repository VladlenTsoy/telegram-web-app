import React, {useState} from "react"
import styles from "./PizzaCard.module.css"
import {formatPrice} from "utils/formatPrice"
import {Group} from "types/Menu"

interface PizzaCardProps {
    pizza: Group
}

const PizzaCard: React.FC<PizzaCardProps> = ({pizza}) => {
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => {
        if (window && window?.Telegram) {
            window.Telegram.WebApp.MainButton.text = "Добавить в корзину"
            window.Telegram.WebApp.MainButton.show()
        }
        setVisible(true)
    }

    const onCloseHandler = () => {
        setVisible(false)
        if (window && window?.Telegram) {
            console.log(window?.Telegram)
            window.Telegram.WebApp.MainButton.hide()
        }
    }

    return (
        <>
            {visible &&
                <div className={styles.modal} onClick={onCloseHandler}>
                    <div className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores at blanditiis
                        commodi,
                        delectus dolore dolorum eligendi est et ex mollitia nemo officiis provident quas quasi
                        reprehenderit ut
                        velit voluptas.
                        <div>-----</div>
                    </div>
                </div>
            }
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
                        <button className={styles.action} onClick={onClickHandler}>+</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PizzaCard
