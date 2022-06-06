import React, {useCallback} from "react"
import {minusAmount, plusAmount} from "./cartSlice"
import {CartProduct} from "types/Cart"
import {useDispatch} from "store"
import {useLanguage} from "utils/i18n.config"

interface CartProductItemProps {
    product: CartProduct
    coupon?: boolean
    Component: any
}

const CartProductItem: React.FC<CartProductItemProps> = ({product, coupon = false, Component}) => {
    const {lang} = useLanguage()
    const dispatch = useDispatch()
    const modifiers = product.modifiers || []
    const crust = modifiers.find(item => item.type === "crust")
    const toppings = modifiers.filter(i => i.title[lang] && !i.type)
    const halfs = modifiers.filter(i => i.type === "half")

    let desc
    if (crust && crust.title[lang])
        desc = crust.title[lang]
    if (halfs.length > 0)
        desc = halfs?.map(i => i.title[lang]).join(" + ")
    if (toppings.length > 0)
        desc = toppings.map(i => i.title[lang] + " ")

    const toppingPrices =
        modifiers.length > 0 ? modifiers.map(item => item.price).reduce((prev, next) => prev + next) : 0

    const incrementHandler = useCallback(() => {
        product.amount < 99 && dispatch(plusAmount(product.uid))
    }, [dispatch, product])

    const decrementHandler = useCallback(() => {
        dispatch(minusAmount(product.uid))
    }, [dispatch, product])

    const control = {
        increment: incrementHandler,
        decrement: decrementHandler
    }

    return <Component
        key={product.uid}
        uid={product.uid}
        id={product.productId}
        title={product.title}
        image={product.image}
        defaultTitle={product.defaultTitle}
        price={product.price + toppingPrices}
        amount={product.amount}
        desc={desc}
        positionId={product.positionId}
        control={coupon ? undefined : control}
    />
}

export default CartProductItem
