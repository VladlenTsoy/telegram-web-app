import React from "react"
import {useGetPizza} from "../menuSlice"
import styles from "./PizzaList.module.css"
import PizzaCard from "../../../components/pizza-card/PizzaCard"

const PizzaList = () => {
    const pizza = useGetPizza()


    return (
        <div className={styles.container}>
            {pizza && pizza.map(item =>
                <PizzaCard pizza={item} />
            )}
        </div>
    )
}

export default PizzaList
