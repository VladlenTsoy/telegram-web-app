import React, {useCallback, useEffect, useState} from "react"
import {Group, ProductSize, ToppingProduct} from "types/Menu"
import {CartProductModifier} from "../../types/Cart"
import HeaderBack from "../../components/header-back/HeaderBack"
import Banner from "./banner/Banner"
import SwitchButtons from "../../components/switch-buttons/SwitchButtons"
import ConstructorPageBtn from "./constructor-page-btn/ConstructorPageBtn"
import {useLanguage} from "../../utils/i18n.config"
import styles from "./ConstructorDetails.module.css"
import AddedModifiers from "./added-modifiers/AddedModifiers"
import ModificatorBlock from "./modificator-block/ModificatorBlock"

interface Crust {
    id: string
    title: string
    groupId: string
    amount: number
    price: number
    type: string
}

export interface Mode {
    id: string
    label: string
    amount: number
    price: number
    image: string
}

interface Size {
    id: string
    title: string
}

interface ConstructorDetailsProps {
    constructorGroup: Group
}

const ConstructorDetails: React.FC<ConstructorDetailsProps> = ({constructorGroup}) => {
    const {lang, t} = useLanguage()
    const [selectedConstructor, setSelectedConstructor] = useState<ProductSize | null>(null)
    const [modifiers, setModifiers] = useState<CartProductModifier[]>([])
    const [sizes, setSizes] = useState<Size[]>([])
    const [crusts, setCrusts] = useState<Crust[]>([])
    const [mods, setMods] = useState<Mode[]>([])

    useEffect(() => {
        if (selectedConstructor) {
            const _products: ProductSize[] = JSON.parse(JSON.stringify(selectedConstructor.crusts.products))
            _products.sort((a, b) => a.price - b.price)
            setCrusts(
                _products.map(product => ({
                    id: product.id,
                    title: product.translations.title[lang],
                    groupId: selectedConstructor.parentGroup,
                    amount: 1,
                    price: product.price,
                    type: product.type,
                    code: product.code
                }))
            )
            if (selectedConstructor.toppings) {
                const _toppings: ToppingProduct[] = JSON.parse(JSON.stringify(selectedConstructor.toppings.products))
                _toppings.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                })
                setMods(
                    _toppings.map(topping => {
                        return {
                            id: topping.id,
                            label: topping.translations.title[lang] || topping.name,
                            groupId: topping.parentGroup,
                            price: topping.price,
                            amount: 1,
                            code: topping.code,
                            image: topping.imagePng
                        }
                    })
                )
            }
        }
    }, [selectedConstructor, lang])

    useEffect(() => {
        if (constructorGroup) {
            const _products: ProductSize[] = JSON.parse(JSON.stringify(constructorGroup.products))
            const reverse = _products.reverse()
            setSelectedConstructor(reverse[0])
            setSizes(
                reverse.map(product => ({
                    id: product.id,
                    title: product.translations.title[lang].replace(lang === "ru" ? " конструктор" : " Konstruktor", "").replace(" konstruktor", "")
                }))
            )
            const crust = reverse[0].crusts.products[0]
            const crustModifier: CartProductModifier = {
                productId: crust.id,
                productGroupId: crust.parentGroup,
                amount: 1,
                price: crust.price,
                title: crust.translations.title,
                type: "crust"
            }
            setModifiers([crustModifier])
        }
    }, [constructorGroup, lang])

    const onChangeSizeHandler = useCallback((id: string) => {
        const constructor = constructorGroup.products.find(item => item.id === id)
        if (constructor) {
            setSelectedConstructor(constructor)
            const crust = constructor.crusts.products[0]
            const crustModifier: CartProductModifier = {
                productId: crust.id,
                productGroupId: crust.parentGroup,
                amount: 1,
                price: crust.price,
                title: crust.translations.title,
                type: "crust"
            }
            setModifiers([crustModifier])
        }
    }, [])

    const onAddToppingHandler = useCallback(
        (modeId: string) => {
            if (selectedConstructor && selectedConstructor.toppings?.products) {
                const topping = selectedConstructor.toppings.products.find(_mod => _mod.id === modeId)
                if (!topping) return
                const toppingModifier: CartProductModifier = {
                    productId: topping.id,
                    productGroupId: topping.parentGroup,
                    amount: 1,
                    price: topping.price,
                    title: topping.translations.title,
                    type: "topping"
                }
                setModifiers(prevState => {
                    const all = prevState.filter(modifier => modifier.productId !== toppingModifier.productId)
                    if (prevState.find(modifier => modifier.productId === toppingModifier.productId)) return all
                    else return [...all, toppingModifier]
                })
            }
        },
        [selectedConstructor]
    )

    const onChangeCrustHandler = useCallback(
        (crustId: string) => {
            if (selectedConstructor) {
                const crust = selectedConstructor.crusts.products.find(_crust => _crust.id === crustId)
                if (!crust) return
                const crustModifier: CartProductModifier = {
                    productId: crust.id,
                    productGroupId: crust.parentGroup,
                    amount: 1,
                    price: crust.price,
                    title: crust.translations.title,
                    type: "crust"
                }
                setModifiers(prevState => {
                    return [
                        ...prevState.filter(modifier => modifier.productGroupId !== crust.parentGroup),
                        crustModifier
                    ]
                })
            }
        },
        [selectedConstructor]
    )

    return (
        <div className={styles.container}>
            <HeaderBack back="menu" title={constructorGroup.translations.title[lang]} />
            <Banner />
            {/*<AddedModifiers data={} />*/}
            <div className={styles.actions}>
                <SwitchButtons
                    label={t("selectSize")}
                    data={sizes}
                    onClick={onChangeSizeHandler}
                    value={sizes[0]?.id}
                />
                <SwitchButtons
                    label={selectedConstructor?.crusts.translations.title[lang] || selectedConstructor?.crusts.name}
                    data={crusts}
                    onClick={onChangeCrustHandler}
                    value={crusts[0]?.id}
                />
            </div>
            <div className={styles.modifiers}>
                {
                    mods &&
                    mods.length > 0 &&
                    mods.map((item, index) =>
                        <ModificatorBlock
                            key={item.id}
                            id={item.id}
                            title={item.label}
                            price={item.price}
                            image={item.image}
                            onAddToppingHandler={onAddToppingHandler}
                        />
                    )
                }
            </div>
            {selectedConstructor &&
                <ConstructorPageBtn modifiers={modifiers} selectedConstructor={selectedConstructor} />}
        </div>
    )
}

export default ConstructorDetails
