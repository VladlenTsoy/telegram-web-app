import {TranslationTitle} from "./Menu"

export interface CartCombo {
    // Основные для сделки
    id: string
    name: string
    amount: number
    price: number
    sourceId: string
    // Дополнительные параметры для сайта
    image: string
    title: TranslationTitle
}

export interface CartProduct {
    // Для redux
    uid: string
    // Основные для сделки
    productId: string // id
    amount: number // Кол-во
    price: number // Цена за единицу
    modifiers: CartProductModifier[] // Модицикаторы
    positionId?: string // Если комбо
    comboInformation: ComboInformation | null // Если комбо
    // Дополнительные параметры для сайта
    type: "pizza" | "dish"
    image: string
    title: TranslationTitle
    defaultTitle: string
}

export interface ComboInformation {
    comboId: string
    comboSourceId: string
    comboGroupId: string
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

// export interface Modifier {
//     id: string
//     code: string
//     name: string
//     name_ru: string
//     name_uz: string
//     amount: number
//     price: number
//     sum: number
//     groupId: string
// }

// export interface _CartProduct {
//     id: string
//     type: string
//     image: string
//     modifiers?: Modifier[]
//     comboInformation?: any
// }

// interface Product {
//     id: string
//     name: string
//     code: string | null
//     parentGroup: string | null
//     type: "Dish" | "Good" | "Modifier" | null
//     orderItemType: "Product" | "Compound"
//     price: number
//     productId: string
//     translations: {
//         title: {
//             ru: string
//             uz: string
//         }
//         desc: []
//     }
//     image: null
//     image2: null
//     imagePng: null
//     crusts: null
//     toppings: null
//     halfs: null
// }
