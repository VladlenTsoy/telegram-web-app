import React, {useEffect, useState} from "react"
import styles from "./ProductMore.module.css"
import {Group, ProductSize, TranslationTitle} from "types/Menu"
import LabelTextToggleBtn from "../lable-text-toggle-btn/LabelTextToggleBtn"
import {useLanguage} from "../../utils/i18n.config"
import {formatPrice} from "../../utils/formatPrice"

export interface CrustOption {
    id: string
    title: string
    price: number
}

export interface CartProductModifier {
    // Обязательные для сделки
    productId: string // id
    amount: number // Кол-во
    productGroupId: string // parentGroup
    price: number // Цена за единицу
    positionId?: string // Если комбо
    // Дополнительные параметры для сайта
    title: TranslationTitle
    type: "crust" | "half" | "topping"
    // type: string
    // image: string | null
    // label?: string
}

interface ProductMoreProps {
    group: Group
    onClose: () => void
}

const ProductMore: React.FC<ProductMoreProps> = ({group, onClose}) => {
    const {lang, t} = useLanguage()
    const [sizes, setSizes] = useState<{id: string, title: string, price: number}[]>([])
    const [productSize, setProductSize] = useState<ProductSize>()
    const [crusts, setCrusts] = useState<CrustOption[]>([])
    const [modifier, setModifier] = useState<CartProductModifier>()

    const selectModifier = (modifierId: string) => {
        if (productSize) {
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
        }
    }

    useEffect(() => {
        const _sizes: ProductSize[] = JSON.parse(JSON.stringify(group.products)).sort((a: any, b: any) => a.price - b.price)
        const __sizes = _sizes.map(i => ({
            id: i.id,
            // @ts-ignore
            title: t(i.translations.title[lang].trim().split(" ").pop().toLocaleLowerCase()),
            price: i.price
        }))
        setProductSize(_sizes[0])
        setSizes(__sizes)
    }, [group])

    useEffect(() => {
        if (productSize) {
            const _crusts = productSize.crusts?.products
                .sort((a, b) => a.price - b.price)
                .map(crust => ({
                    id: crust.id,
                    title: crust.translations.title[lang] ?? crust.name,
                    price: crust.price
                }))
            if (_crusts) {
                setCrusts(_crusts)
                selectModifier(_crusts[0].id)
            }
        }
    }, [productSize])

    return (
        <>
            <div className={styles.imageContainer}>
                <img src={group.image} alt={group.translations.title[lang]} className={styles.image} />
            </div>
            <div className={styles.details}>
                <h2 className={styles.title}>{group.translations.title[lang]}</h2>
                <p className={styles.description}>{group.translations.desc[lang]}</p>
                <LabelTextToggleBtn value={productSize?.id} data={sizes} label={"Выберите тип теста"} />
                {crusts.length &&
                    <LabelTextToggleBtn value={crusts[0].id} data={crusts} label={"Выберите тип теста"} />}
                <div className={styles.priceAndAction}>
                    <div className={styles.price}>{formatPrice(group.price)} сум</div>
                    <button className={styles.action}>Добавить в корзину</button>
                </div>
            </div>
        </>
    )
}

export default ProductMore
