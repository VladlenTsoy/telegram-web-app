import {Product, ProductSize, TranslationTitle} from "./Menu"

// Комбо
export interface CartCombo {
    // Основные для сделки
    id: string
    name: string
    amount: number
    price: number
    sourceId: string
    // Дополнительные параметры для сайта
    image: string | null
    title: TranslationTitle
}

// Продукты комбо
export type CartComboProduct = (ProductSize | Product) & {
    comboParentGroup: string
    modifiers?: CartProductModifier[]
    selectCrust?: string
}

// Продукт
export interface CartProduct {
    // Для redux
    uid: string
    // Основные для сделки
    productId: string // id
    amount: number // Кол-во
    price: number // Цена за единицу
    modifiers: CartProductModifier[] // Модификаторы
    positionId?: string // Если комбо
    comboInformation: {
        comboId: string
        comboSourceId: string
        comboGroupId: string
    } | null // Если комбо
    // Дополнительные параметры для сайта
    type: "pizza" | "dish"
    image: string | null
    title: TranslationTitle
    defaultTitle: string
}

// Модификаторы пиццы
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
}
