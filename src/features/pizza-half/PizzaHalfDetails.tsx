import React, {useCallback, useEffect, useState} from "react"
import {ProductSize, TranslationTitle} from "types/Menu"
import Banner from "./banner/Banner"
import styles from "./PizzaHalfDetails.module.css"
import SelectHalfBlock from "./select-half-block/SelectHalfBlock"
import HeaderBack from "components/header-back/HeaderBack"
import {useLanguage} from "utils/i18n.config"
import SwitchButtons from "components/switch-buttons/SwitchButtons"
import {useDispatch} from "store"
import {CartProductModifier} from "types/Cart"
import {formatPrice} from "utils/formatPrice"
import Button from "components/button/Button"
import {addToCart} from "features/cart/cartSlice"
import {navigate} from "features/app/appSlice"
import {message} from "components/message/notice"
import md5 from "md5"

export type CrustType = {title: string; id: string; price: number}

export interface SelectedHalf {
    id: string
    title: TranslationTitle
    desc: []
    price: number
    parentGroup: string
    image: string
    image2: string
}

interface PizzaHalfDetailsProps {
    half: ProductSize
}

const PizzaHalfDetails: React.FC<PizzaHalfDetailsProps> = ({half}) => {
    const {lang, t} = useLanguage()
    const [selected, setSelected] = useState<{left: SelectedHalf | null, right: SelectedHalf | null}>({
        left: null,
        right: null
    })
    const dispatch = useDispatch()
    const [halfs, setHalfs] = useState<SelectedHalf[]>([])
    const [titleCrust, setTitleCrust] = useState<string>()
    const [crusts, setCrusts] = useState<CrustType[]>([])
    const [modifiers, setModifiers] = useState<CartProductModifier[]>([])
    const totalPrice = half.price + modifiers.reduce((acc, modifier) => acc + modifier.price, 0)

    // Смена теста
    const onChangeCrustHandler = (id: string) => {
        const crust = half.crusts.products.find(crust => crust.id === id)
        if (crust)
            setModifiers([
                {
                    productId: crust.id,
                    price: crust.price,
                    amount: 1,
                    productGroupId: crust.parentGroup,
                    title: crust.translations.title,
                    type: "crust"
                }
            ])
    }

    useEffect(() => {
        if (half && half.halfs) {
            if (half.halfs.products.length)
                setHalfs(
                    half.halfs.products.map(product => ({
                        id: product.id,
                        title: product.translations.title,
                        desc: product.translations.desc,
                        price: product.price,
                        image: product.image,
                        image2: product.image2,
                        parentGroup: product.parentGroup
                    }))
                )
            if (half.crusts.products.length) {
                setTitleCrust(half.crusts.translations.title[lang])
                const _crusts: CrustType[] = JSON.parse(
                    JSON.stringify(
                        half.crusts.products.map(product => ({
                            title: product.translations.title[lang] || product.name,
                            id: product.id,
                            price: product.price
                        }))
                    )
                )
                _crusts.sort((a, b) => a.price - b.price)
                setCrusts(_crusts)
            }
        }
    }, [half, lang, dispatch])

    useEffect(() => {
        const crust = half.crusts.products[0]
        if (crust)
            setModifiers([
                {
                    productId: crust.id,
                    price: crust.price,
                    amount: 1,
                    productGroupId: crust.parentGroup,
                    title: crust.translations.title,
                    type: "crust"
                }
            ])
    }, [half, dispatch])

    useEffect(() => {
        if (halfs.length) {
            setSelected({right: halfs[0], left: halfs[1]})
        }
    }, [halfs])

    const onClickHandler = useCallback(() => {
        if (selected.left && selected.right) {
            // @ts-ignore
            const arrSelected: SelectedHalf[] = Object.values(selected)
            if (arrSelected.length === 2 && modifiers.length) {
                const selectedModifiers: CartProductModifier[] = arrSelected.map(item => ({
                    productId: item.id,
                    amount: 1,
                    productGroupId: item.parentGroup,
                    price: item.price,
                    comboInformation: null,
                    title: item.title,
                    type: "half"
                }))
                // Добавление в корзину
                dispatch(
                    addToCart({
                        uid:
                            md5(half.id +
                                arrSelected.reduce((acc, val) => (acc + val.id), "") +
                                modifiers.reduce((acc, val) => (acc + val.productId), "")),
                        productId: half.id,
                        type: "pizza",
                        title: half.translations.title,
                        defaultTitle: half.name,
                        image: half.image,
                        price: half.price,
                        amount: 1,
                        comboInformation: null,
                        modifiers: [...selectedModifiers, ...modifiers]
                    })
                )
                // Вывод сообщения
                message({content: half.translations.title[lang] || half.name})
                //
                // dispatch(clear())
                //
                dispatch(navigate(`menu`))
            }
        }
    }, [half, selected, dispatch, lang, modifiers])

    const selectProduct = useCallback((selectHalf: SelectedHalf, left?: boolean) => {
        setSelected(prevState => ({...prevState, [left ? "left" : "right"]: selectHalf}))
    }, [])

    return (
        <div className={styles.container}>
            <HeaderBack back="menu" title={half.translations.title[lang] || half.name} />
            {half.halfs && <Banner
                leftImg={selected.left?.image2}
                rightImg={selected.right?.image}
            />}
            <div className={styles.selectHalfs}>
                <SelectHalfBlock
                    title={"Левая половинка"}
                    products={halfs}
                    selectedProduct={selected.left}
                    selectProduct={selectProduct}
                    isLeft
                />
                <SelectHalfBlock
                    title={"Правая половинка"}
                    products={halfs}
                    selectedProduct={selected.right}
                    selectProduct={selectProduct}
                />
            </div>
            <div className={styles.switches}>
                <SwitchButtons label={t("selectSize")} data={[{id: "1", title: t("большая")}]} value="1" />
                <SwitchButtons label={titleCrust} data={crusts} onClick={onChangeCrustHandler} value={crusts[0]?.id} />
            </div>
            <div className={styles.actions}>
                <div className={styles.price}>
                    {formatPrice(totalPrice)} {t("sum")}
                </div>
                <Button type="secondary" onClick={onClickHandler}
                        disabled={!(selected.left && selected.right)}>{t("addToCart")}</Button>
            </div>
        </div>
    )
}

export default PizzaHalfDetails
