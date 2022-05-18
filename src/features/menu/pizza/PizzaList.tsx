import React, {useState} from "react"
import {useGetPizza} from "../menuSlice"
import styles from "./PizzaList.module.css"
import {formatPrice} from "utils/formatPrice"

const PizzaList = () => {
    const pizza = useGetPizza()
    const [visible, setVisible] = useState(false)

    const onClickHandler = () => {
        if (window && window?.Telegram) {
            window.Telegram.WebApp.MainButton.text = "Добавить в корзину"
            window.Telegram.WebApp.MainButton.show()
            window.Telegram.WebApp.MainButton.color = "#006F4C"
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
        <div className={styles.container}>
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
            {pizza && pizza.map(item =>
                <div key={item.id} className={styles.card}>
                    <div className={styles.image}>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.title}>{item.translations.title["ru"]}</div>
                        <div className={styles.desc}>{item.translations.desc["ru"]}</div>
                        <div className={styles.priceAndButton}>
                            <div className={styles.price}>
                                от <span>{formatPrice(item.price)}</span> сум
                            </div>
                            <button className={styles.action} onClick={onClickHandler}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PizzaList
