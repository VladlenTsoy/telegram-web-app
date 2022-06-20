import React from "react"
import styles from "./ConstructorPageBtn.module.css"
import {formatPrice} from "utils/formatPrice"
import {CartProductModifier} from "types/Cart"
import {ProductSize} from "types/Menu"
import {useDispatch} from "store"
import Button from "components/button/Button"
import {addToCart} from "features/cart/cartSlice"
import {message} from "components/message/notice"
import {useLanguage} from "utils/i18n.config"
import {navigate} from "features/app/appSlice"
import md5 from "md5"

interface ConstructorPageBtnProps {
    modifiers: CartProductModifier[]
    selectedConstructor: ProductSize
}

const ConstructorPageBtn: React.FC<ConstructorPageBtnProps> = ({modifiers, selectedConstructor}) => {
    const dispatch = useDispatch()
    const {lang} = useLanguage()
    const countTopping = modifiers.filter(mod => mod.type === "topping").length
    const isDisabled = countTopping < 1 || countTopping > 10
    const totalPrice = selectedConstructor.price +
        (
            modifiers.length > 0
                ? modifiers
                    .map(item => item.price)
                    .reduce((prev, next) => prev + next)
                : 0
        )

    const onClickHandler = () => {
        if (selectedConstructor && modifiers.length) {
            // Добавление в корзину
            dispatch(
                addToCart({
                    uid: md5(selectedConstructor.id + modifiers.reduce((acc, val) => (acc + val.productId), "")),
                    productId: selectedConstructor.productId,
                    title: selectedConstructor.translations.title,
                    defaultTitle: selectedConstructor.name,
                    comboInformation: null,
                    amount: 1,
                    image: selectedConstructor.image,
                    price: selectedConstructor.price,
                    modifiers,
                    type: "pizza"
                })
            )
            // Вывод сообщения
            message({content: selectedConstructor.translations.title[lang] || selectedConstructor.name})
            //
            dispatch(navigate("menu"))
        }
    }

    return (
        <div className={styles.actions}>
            <div className={styles.price}>
                {formatPrice(totalPrice)} сум
            </div>
            <Button type="secondary" onClick={onClickHandler} disabled={isDisabled}>Добавить</Button>
        </div>
    )
}

export default ConstructorPageBtn
