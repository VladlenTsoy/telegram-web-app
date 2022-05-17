export interface ConstructorHalf {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: {
        title: {
            ru: string
            uz: string
        }
        desc: []
    }
    image: string
    image2: null
    imagePng: null
    crusts: {
        id: string
        name: string
        icon: null
        menuType: string
        translations: {
            title: {
                ru: string
                uz: string
            }
            desc: []
        }
        price: number
        image: null
        products: Crust[]
    }
    toppings: null
    halfs: {
        id: string
        name: string
        icon: null
        menuType: string
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
        products: Half[]
    }
}

export interface Crust {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: {
        title: {
            ru: string
            uz: string
        }
        desc: []
    }
    image: null
    image2: null
    imagePng: null
    crusts: null
    toppings: null
    halfs: null
}

export interface Half {
    id: string
    name: string
    code: string
    parentGroup: string
    type: string
    orderItemType: string
    price: number
    productId: string
    translations: {
        title: {
            ru: string
            uz: string
        }
        desc: []
    }
    image: string
    image2: string
    imagePng: null
    crusts: null
    toppings: null
    halfs: null
}
