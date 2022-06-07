import {Product, ProductSize, TranslationTitle} from "types/Menu"

export interface Combo {
    sourceActionId: string
    name: string
    priceModification: number
    items: ComboProduct[]
    translations: {
        title: TranslationTitle
        desc: TranslationTitle
    }
    image: string | null
}

export interface ComboProduct {
    id: string
    name: string
    products: (ProductSize | Product)[]
}
