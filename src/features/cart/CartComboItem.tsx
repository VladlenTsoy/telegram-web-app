import React from "react"
import {minusComboAmount, plusComboAmount, useCartComboProductByComboId} from "./cartSlice"
import ProductItem from "components/cart-product-item/CartProductItem"
import {CartCombo} from "types/Cart"
import {useDispatch} from "store"
import {useLanguage} from "utils/i18n.config"

interface CartComboItemProps {
    combo: CartCombo
}

const CartComboItem: React.FC<CartComboItemProps> = ({combo}) => {
    const {lang} = useLanguage()
    const dispatch = useDispatch()

    let desc
    const products = useCartComboProductByComboId(combo.id)
    if (products.length)
        desc = products.map(i => i.title[lang] || i.defaultTitle).join(", ")

    return <ProductItem
        key={"combo" + combo.id}
        uid={combo.id}
        id={combo.id}
        title={combo.title}
        image={combo.image}
        defaultTitle={combo.name}
        price={combo.price}
        amount={combo.amount}
        desc={desc}
        control={{
            increment: () => combo.amount < 99 && dispatch(plusComboAmount(combo.id)),
            decrement: () => dispatch(minusComboAmount(combo.id))
        }}
    />
}

export default CartComboItem
