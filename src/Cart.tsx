import React, {useEffect} from "react"
import {useCartCountItems, useCartProducts, useCartTotalPrice} from "./features/cart/cartSlice"
import {formatPrice} from "./utils/formatPrice"

const Cart = () => {
    const cartProducts = useCartProducts()
    const cartTotalPrice = useCartTotalPrice()
    const cartCountItems = useCartCountItems()

    useEffect(() => {
        window.Telegram.WebApp.MainButton.text = "Оплатить"
        window.Telegram.WebApp.MainButton.onClick(() => {
            window.Telegram.WebApp.sendData(JSON.stringify({
                cartProducts,
                cartTotalPrice,
                cartCountItems
            }))
        })
    }, [cartCountItems, cartTotalPrice, cartProducts])

    const clickHandler = () => {
        window.Telegram.WebApp.sendData(JSON.stringify({
            cartProducts,
            cartTotalPrice,
            cartCountItems
        }))
    }

    return (
        <div>
            <p>Общая стоимость: ${formatPrice(cartTotalPrice)} сум</p>
            <button onClick={clickHandler}>Отправить</button>
        </div>
    )
}

export default Cart
