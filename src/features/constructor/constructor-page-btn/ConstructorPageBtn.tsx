import React from "react"
import styles from "./ConstructorPageBtn.module.css"
import {formatPrice} from "../../../utils/formatPrice"
import {CartProductModifier} from "../../../types/Cart"
import {ProductSize} from "../../../types/Menu"
import {useDispatch} from "../../../store"

interface ConstructorPageBtnProps {
    modifiers: CartProductModifier[]
    selectedConstructor: ProductSize
}

const ConstructorPageBtn: React.FC<ConstructorPageBtnProps> = ({modifiers, selectedConstructor}) => {
    const dispatch = useDispatch()
    // const {locale, push} = useRouter()
    // const {t} = useTranslation()
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
        // if (selectedConstructor && modifiers.length) {
        //     // Добавление в корзину
        //     dispatch(
        //         addToCart({
        //             uid: selectedConstructor.id + modifiers.reduce((acc, val) => (acc + val.productId), ""),
        //             productId: selectedConstructor.productId,
        //             title: selectedConstructor.translations.title,
        //             defaultTitle: selectedConstructor.name,
        //             comboInformation: null,
        //             amount: 1,
        //             image: selectedConstructor.image,
        //             price: selectedConstructor.price,
        //             modifiers,
        //             type: "pizza"
        //         })
        //     )
        //     // Вывод сообщения
        //     dispatch(
        //         showMessage({
        //             title: selectedConstructor.translations.title[locale] || selectedConstructor.name,
        //             image: selectedConstructor.image
        //         })
        //     )
        // }
        // //
        // ConstructorAddToCart({
        //     productId: selectedConstructor.id,
        //     title: selectedConstructor.name,
        //     amount: 1,
        //     price: totalPrice,
        //     sizeTitle: selectedConstructor.translations.title.ru.replace(" конструктор", "")
        // }, modifiers)
        // //
        // push("/")
    }

    return (
        <div className={styles.btnPriceWrapper}>
            <p className={styles.price}>
                {formatPrice(totalPrice)} сум
            </p>
            {/*<LabelBtn type={"primary"} margin={"0"} fillW>Добавить в корзину</LabelBtn>*/}
        </div>
    )
}

export default ConstructorPageBtn
