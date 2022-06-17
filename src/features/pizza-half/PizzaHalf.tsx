import React from "react"
import {useGetHalf} from "features/menu/menuSlice"
import EmptyPage from "components/empty-page/EmptyPage"
import PizzaHalfDetails from "./PizzaHalfDetails"

const PizzaHalf = () => {
    const pizzaHalf = useGetHalf()

    if (!pizzaHalf)
        return <EmptyPage back="menu" />

    return <PizzaHalfDetails half={pizzaHalf}/>
}

export default PizzaHalf
