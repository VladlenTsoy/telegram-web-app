import React, {useEffect, useState} from "react"
import styles from "./ModalPizzaCard.module.css"
import {motion, useMotionValue} from "framer-motion"
import {Group, ProductSize, TranslationTitle} from "types/Menu"
import LabelTextToggleBtn from "../lable-text-toggle-btn/LabelTextToggleBtn"
import {useLanguage} from "../../utils/i18n.config"

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

interface ModalPizzaCardProps {
    group: Group
    onClose: () => void
}

const ModalPizzaCard: React.FC<ModalPizzaCardProps> = ({group, onClose}) => {
    const {lang, t} = useLanguage()
    const y = useMotionValue(0)
    const [sizes, setSizes] = useState<{id: string, title: string, price: number}[]>([])
    const [productSize, setProductSize] = useState<ProductSize>()
    const [crusts, setCrusts] = useState<CrustOption[]>([])
    const [modifier, setModifier] = useState<CartProductModifier>()

    const onDragListener = (e: any) => {
        console.log(y.get())
        if (y.get() >= 100) onClose()
    }

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
        <div className={styles.wrapper}>
            <motion.div
                className={styles.card}
                drag="y"
                onDragEnd={onDragListener}
                dragElastic={{
                    top: 0,
                    bottom: 1
                }}
                dragConstraints={{
                    top: 0,
                    bottom: 0
                }}
                style={{y}}
                initial={{opacity: 0, y: "100%"}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "linear", duration: 0.2}}
                exit={{opacity: 0, y: "100%"}}
            >
                <img src={group.image} alt={group.translations.title[lang]} className={styles.image} />
                <div className={styles.details}>
                    <h1 className={styles.title}>{group.translations.title[lang]}</h1>
                    <p className={styles.description}>{group.translations.desc[lang]}</p>
                    <LabelTextToggleBtn value={productSize?.id} data={sizes} label={"Выберите тип теста"} />
                    {crusts.length &&
                        <LabelTextToggleBtn value={crusts[0].id} data={crusts} label={"Выберите тип теста"} />}
                    <div className={styles.priceAndAction}>
                        <div className={styles.price}>90 000 сум</div>
                        <button className={styles.action}>Добавить в корзину</button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ModalPizzaCard
