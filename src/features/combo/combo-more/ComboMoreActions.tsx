import React, {useCallback, useState} from "react"
// import styles from "./ComboMoreActions.module.css"
import {Combo, ComboProduct} from "types/Combo"
import {useDispatch} from "store"
import {useLanguage} from "utils/i18n.config"
import {CartCombo, CartComboProduct, CartProduct} from "types/Cart"
import {Product, ProductSize} from "types/Menu"
import {addComboToCart} from "features/cart/cartSlice"
import {uuidv4} from "utils/uuid"
import ListSelectProducts from "./list-select-products/ListSelectProducts"
import DrawerProducts from "./drawer-products/DrawerProducts"
import {navigate} from "../../app/appSlice"

interface ComboMoreActionsProps {
    combo: Combo
}

const ComboMoreActions: React.FC<ComboMoreActionsProps> = ({combo}) => {
    const {lang} = useLanguage()
    const dispatch = useDispatch()
    // Выбранные продукты
    const [selectedProducts, setSelectedProducts] = useState<CartComboProduct[]>([])
    //  Выбранная группа
    const [selectedGroup, setSelectedGroup] = useState<ComboProduct["id"] | null>(null)
    // Выбранное комбо для корзины
    const [selectedCombo, setSelectedCombo] = useState<CartCombo>({
        id: uuidv4(),
        name: combo.name,
        title: combo.translations.title,
        amount: 1,
        price: combo.priceModification,
        sourceId: combo.sourceActionId,
        image: combo.image
    })

    //
    const mobileCloseProducts = useCallback(() => {
        setSelectedGroup(null)
        window?.scrollTo(0, 0)
    }, [])

    // Добавить продукт в комбо
    const addComboProductHandler = useCallback(
        (comboProduct: ProductSize | Product, groupId: string) => {
            const crustId = comboProduct.crusts?.products[0].id
            setSelectedProducts(prevState => {
                if (prevState.find(item => item.comboParentGroup === groupId && item.id === comboProduct.id))
                    return prevState.filter(
                        item => !(item.comboParentGroup === groupId && item.id === comboProduct.id)
                    )
                else if (prevState.find(item => item.comboParentGroup === groupId)) {
                    mobileCloseProducts()
                    return [
                        ...prevState.filter(item => item.comboParentGroup !== groupId),
                        {...comboProduct, comboParentGroup: groupId, selectCrust: crustId}
                    ]
                }
                mobileCloseProducts()
                return [...prevState, {...comboProduct, comboParentGroup: groupId, selectCrust: crustId}]
            })
        },
        [mobileCloseProducts]
    )

    // Изменить тип
    const changeType = useCallback((id: string, product: CartComboProduct) => {
        setSelectedProducts(prevState => {
            prevState.map(productSize => {
                if (
                    productSize.id === product.id &&
                    productSize.comboParentGroup === product.comboParentGroup
                )
                    productSize.selectCrust = id
                return productSize
            })
            return prevState
        })
        return product
    }, [])

    // Добавить в корзину
    const addToCart = useCallback(() => {
        // dispatch(
        //     showMessage({
        //         image: combo.image,
        //         title: combo.translations.title[locale] || combo.name
        //     })
        // )
        // Подготовить комбо для корзины
        const comboItems = comboToCart(selectedCombo, selectedProducts)
        // Отправить в корзину
        dispatch(addComboToCart({combo: selectedCombo, items: comboItems}))
        // Обновить id следующего комбо
        setSelectedCombo(prevState => ({...prevState, id: uuidv4()}))
        // Очистить выбранные продукты
        setSelectedProducts([])
        // Очистить промокод
        // dispatch(cancelPromoCode())
        //
        dispatch(navigate("menu"))
    }, [dispatch, combo, selectedCombo, selectedProducts, lang])

    // При нажатии на группу
    const onClickComboGroup = useCallback((comboItem: ComboProduct) => setSelectedGroup(comboItem.id), [])

    return (
        <>
            {/* Блок выбранных продуктов */}
            <ListSelectProducts
                selectedProducts={selectedProducts}
                combo={combo}
                changeType={changeType}
                onClickComboGroup={onClickComboGroup}
            />
            {/* Список продуктов */}
            <DrawerProducts
                selectedProducts={selectedProducts}
                combo={combo}
                show={selectedGroup}
                addComboProductHandler={addComboProductHandler}
            />
        </>
    )
}

export default ComboMoreActions

type ComboToCartType = (selectedCombo: CartCombo, selectedProducts: CartComboProduct[]) => CartProduct[]

const comboToCart: ComboToCartType = (selectedCombo, selectedProducts) => {
    return selectedProducts.map(comboProduct => {
        const modifiers = []
        if (comboProduct.crusts && comboProduct.crusts.products.length) {
            const crust =
                comboProduct.crusts.products.find(product => product.id === comboProduct.selectCrust) ||
                comboProduct.crusts.products[0]
            modifiers.push({
                productId: crust.id,
                amount: 1,
                productGroupId: crust.parentGroup,
                price: crust.price,
                title: crust.translations.title,
                type: "crust" as "crust"
            })
        }
        return {
            uid: comboProduct.id + selectedCombo.id,
            productId: comboProduct.id,
            type: "pizza" as "pizza",
            title: comboProduct.translations.title,
            defaultTitle: comboProduct.name,
            comboInformation: {
                comboId: selectedCombo.id,
                comboSourceId: selectedCombo.sourceId,
                comboGroupId: comboProduct.comboParentGroup
            },
            image: comboProduct.image,
            amount: 1,
            modifiers,
            price: comboProduct.price
        }
    })
}
