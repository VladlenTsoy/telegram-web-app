import React from "react"
import styles from "./Banner.module.css"
import LogoImage from "assets/images/constructor/logo-white.png"
import PizzaConstructorImage from "assets/images/constructor/pizza-constructor.svg"
import PizzaBGImage from "assets/images/constructor/pizza-bg.svg"

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.textImgBlock}>
                <img
                    width={120}
                    height={33}
                    className={styles.logo}
                    src={LogoImage}
                    alt=""
                />
                <p>
                    Собери свою пиццу <br /> с любимых ингредиентов
                </p>
            </div>
            <div className={styles.pizzaImg}>
                <img
                    src={PizzaConstructorImage}
                    alt=""
                />
            </div>
            <img
                className={styles.pizzaBg}
                src={PizzaBGImage}
                alt=""
            />
        </div>
    )
}

export default Banner
