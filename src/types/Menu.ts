import {ConstructorHalf} from "types/ConstructorHalf"

export interface Category {
    id: string
    name: string
    icon: string
    menuType: string
    translations: Translations
    price: null
    image: null
    products: Product[]
    groups: Group[]
}

export interface Product {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: Translations
    image: string
    image2: null
    imagePng: null
    crusts: null
    toppings: null
    halfs: null
}

export interface Group {
    id: string
    name: string
    icon: null
    menuType: null
    translations: {
        title: {
            ru: string
            uz: string
        }
        desc: {
            ru: string
            uz: string
        }
    }
    price: number
    image: string
    products: ProductSize[]
}

export interface ProductSize {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: Translations
    image: string
    image2: null
    imagePng: null
    crusts: Crust
    toppings: Topping | null
    halfs: ConstructorHalf["halfs"] | null
}

export interface Topping {
    id: string
    name: string
    icon: null
    menuType: "toppings"
    translations: Translations
    price: number
    image: null
    products: ToppingProduct[]
}

export interface ToppingProduct {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: Translations
    image: string
    image2: null
    imagePng: string
    crusts: null
    toppings: null
    halfs: null
}

export interface Crust {
    id: string
    name: string
    icon: null
    menuType: "crusts"
    translations: Translations
    price: number
    image: null
    products: CrustProduct[]
}

// Корочка
export interface CrustProduct {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: Translations
    image: null
    image2: null
    imagePng: null
    crusts: null
    toppings: null
    halfs: null
}

export type Translations = {
    title: TranslationTitle
    desc: TranslationTitle
}

export interface TranslationTitle {
    ru: string
    uz: string
}
