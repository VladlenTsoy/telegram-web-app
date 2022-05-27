import React from "react"
import {useGetPizza} from "../menuSlice"
import styles from "./PizzaList.module.css"
import PizzaCard from "components/pizza-card/PizzaCard"
import ExtraCard from "components/extra-card/ExtraCard"

const constructorId = "3d8d6a24-5595-4116-a19a-997ad6b27a60"
const halfPizzaId = "30a219fa-4065-4390-9fb7-d71b5d6974e2"

const PizzaList = () => {
    const pizza = useGetPizza()
    const constructor = pizza && pizza.find(item => item.id === constructorId)
    const halfPizza = pizza && pizza.find(item => item.id === halfPizzaId)
    return (
        <div className={styles.container}>
            <div className={styles.extra}>
                {constructor && <ExtraCard item={constructor} icon={"👷"} color="linear-gradient(140deg, rgba(255, 207, 0, 0.15), rgba(255, 207, 0, 0.30))"/>}
                {halfPizza && <ExtraCard item={halfPizza} icon={"🌓"} color="linear-gradient(140deg, rgba(0, 220, 255, 0.15), rgba(0, 220, 255, 0.30))"/>}
            </div>
            {pizza && pizza
                .filter(item => item.id !== constructorId && item.id !== halfPizzaId)
                .map(item =>
                    <PizzaCard pizza={item} key={item.id}/>
                )
            }
        </div>
    )
}

export default PizzaList
