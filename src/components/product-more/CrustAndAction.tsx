import React, {useCallback, useEffect, useState} from "react"
import SwitchButtons from "components/switch-buttons/SwitchButtons"
import styles from "./ProductMore.module.css"
import {formatPrice} from "utils/formatPrice"
import {CrustOption} from "./ProductMore"
import {CrustProduct, ProductSize} from "types/Menu"
import {useLanguage} from "utils/i18n.config"
import {useDispatch} from "store"
import {CartProductModifier} from "types/Cart"
import {addToCart} from "../../features/cart/cartSlice"
import CrustSelect from "./CrustSelect"

interface CrustsSelectProps {
    onClose: () => void
    sizes: {id: string, title: string, price: number}[]
    productSize: ProductSize
    selectProductSize: (productSizeId: ProductSize["id"]) => void
}

const CrustAndAction: React.FC<CrustsSelectProps> = ({productSize, sizes, selectProductSize, onClose}) => {
    const {lang, t} = useLanguage()
    const dispatch = useDispatch()
    // Борта
    const [crusts, setCrusts] = useState<CrustOption[]>([])
    // Модификаторы (Тесто? )
    const [modifier, setModifier] = useState<CartProductModifier>()

    const selectModifier = useCallback((modifierId: string) => {
        const _modifier = productSize.crusts.products.find(product => product.id === modifierId)
        if (_modifier)
            setModifier({
                productId: _modifier.id,
                title: _modifier.translations.title,
                price: _modifier.price,
                amount: 1,
                productGroupId: _modifier.parentGroup,
                type: "crust"
            })
    }, [productSize])

    useEffect(() => {
        const switchCrusts = (JSON.parse(JSON.stringify(productSize.crusts.products)) as CrustProduct[])
            .sort((a, b) => a.price - b.price)
            .map(crust => ({
                id: crust.id,
                title: crust.translations.title[lang] || crust.name,
                price: crust.price
            }))

        if (switchCrusts) {
            setCrusts(switchCrusts)
            selectModifier(switchCrusts[0].id)
        }
    }, [productSize, lang, selectModifier])

    // Добавление в корзину
    const onClickAddHandler = () => {
        // Добавить в корзину
        dispatch(
            addToCart({
                uid: productSize.id + modifier?.productId,
                productId: productSize.id,
                type: "pizza",
                title: productSize.translations.title,
                defaultTitle: productSize.name,
                comboInformation: null,
                image: productSize.image,
                amount: 1,
                modifiers: modifier ? [modifier] : [],
                price: productSize.price
            })
        )
        // Закрыть подробнее
        onClose()
    }

    const price = formatPrice(productSize.price + (modifier?.price || 0)) + " " + t("sum")

    return (
        <>
            <SwitchButtons
                value={sizes[0].id}
                data={sizes}
                label={t("selectSize")}
                onClick={selectProductSize}
            />
            {!!crusts.length &&
                <CrustSelect
                    productSize={productSize}
                    crusts={crusts}
                    updateModifier={selectModifier}
                />
            }
            <div className={styles.priceAndAction}>
                <div className={styles.price}>{price}</div>
                <button
                    className={styles.action}
                    onClick={onClickAddHandler}
                >
                    {t("addToCart")}
                </button>
            </div>
        </>
    )
}

export default CrustAndAction
