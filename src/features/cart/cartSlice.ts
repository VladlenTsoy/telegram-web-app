import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
// import createOrder from "features/order/createOrder"
import {useSelector} from "react-redux"
import {StoreState} from "store"
import {CartCombo, CartProduct} from "types/Cart"
// import checkProducts from "./checkProducts"

export const cartAdapter = createEntityAdapter<CartProduct>({
    selectId: cartProduct => cartProduct.uid
})

const updateTotalPrice = (state: StoreState["cart"]) => {
    let totalPrice = (Object.values(state.entities) as CartProduct[])
        .reduce((acc, product) => {
            if (!product.positionId) {
                acc += product.price * product.amount
                if (product.modifiers && product.modifiers.length)
                    acc += product.modifiers.reduce(
                        (_acc, modifier) => (_acc + modifier.price * product.amount),
                        0
                    )
            }
            return acc
        }, 0)
    totalPrice += state.combos.reduce((acc, combo) => (acc + combo.price * combo.amount), 0)

    // if (state.couponInfo.minAmount && state.couponInfo.minAmount >= totalPrice) {
    //     state.couponInfo.message = "!!!"
    // } else {
    //     state.couponInfo.message = null
    // }

    state.totalPrice = totalPrice
}

export interface StateProps {
    totalPrice: number
    finishedProductIds: string[]
    comment: string
    change: number
    inTime: string | null
    paymentUrl: string | null
    combos: CartCombo[]
    comboItems: {[key: string]: CartProduct[]}
    promoCode: {
        productIds: string[]
    }
}

const initialState = cartAdapter.getInitialState<StateProps>({
    totalPrice: 0,
    finishedProductIds: [],
    comment: "",
    change: 0,
    inTime: null,
    paymentUrl: null,
    combos: [],
    comboItems: {},
    promoCode: {
        productIds: []
    }
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartProduct>) => {
            const findProduct = state.entities[action.payload.uid]
            if (findProduct)
                cartAdapter.updateOne(state, {
                    id: action.payload.uid,
                    changes: {
                        amount: (findProduct.amount += 1)
                    }
                })
            else cartAdapter.addOne(state, action.payload)
            updateTotalPrice(state)
        },
        removeFromCart: (state, action: PayloadAction<CartProduct["uid"]>) => {
            cartAdapter.removeOne(state, action.payload)
            updateTotalPrice(state)
        },
        plusAmount: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const findProduct = state.entities[action.payload]
            if (findProduct) {
                cartAdapter.updateOne(state, {
                    id: action.payload,
                    changes: {
                        amount: (findProduct.amount += 1)
                    }
                })
            }
            updateTotalPrice(state)
        },
        minusAmount: (state, action: PayloadAction<CartProduct["uid"]>) => {
            const findProduct = state.entities[action.payload]
            if (findProduct) {
                if (findProduct.amount === 1) {
                    cartAdapter.removeOne(state, action.payload)
                } else
                    cartAdapter.updateOne(state, {
                        id: action.payload,
                        changes: {
                            amount: (findProduct.amount -= 1)
                        }
                    })
            }
            updateTotalPrice(state)
        },
        updateChange: (state, action: PayloadAction<StateProps["change"]>) => {
            state.change = action.payload
        },
        updateComment: (state, action: PayloadAction<StateProps["comment"]>) => {
            state.comment = action.payload
        },
        updatePaymentUrl: (state, action: PayloadAction<StateProps["paymentUrl"]>) => {
            state.paymentUrl = action.payload
        },
        addComboToCart: (state, action: PayloadAction<{combo: CartCombo; items: CartProduct[]}>) => {
            const {combo, items} = action.payload
            const idx = state.combos.findIndex(_combo => _combo.id === combo.id)
            if (idx === -1) {
                state.combos = [...state.combos, combo]
                state.comboItems[combo.id] = items
            } else {
                state.combos[idx].amount += 1
                state.comboItems[combo.id] = state.comboItems[combo.id].map(item => ({
                    ...item,
                    amount: item.amount + 1
                }))
            }
            updateTotalPrice(state)
        },
        removeComboFromCart: (state, action: PayloadAction<CartCombo["id"]>) => {
            const idx = state.combos.findIndex(_combo => _combo.id === action.payload)
            if (idx !== -1) {
                state.combos = state.combos.filter(combo => combo.id !== action.payload)
                delete state.comboItems[action.payload]
            }
            updateTotalPrice(state)
        },
        plusComboAmount: (state, action: PayloadAction<CartCombo["id"]>) => {
            const idx = state.combos.findIndex(_combo => _combo.id === action.payload)
            state.combos[idx].amount += 1
            state.comboItems[action.payload] = state.comboItems[action.payload].map(item => ({
                ...item,
                amount: item.amount + 1
            }))
            updateTotalPrice(state)
        },
        minusComboAmount: (state, action: PayloadAction<CartCombo["id"]>) => {
            const idx = state.combos.findIndex(_combo => _combo.id === action.payload)

            if (state.combos[idx].amount === 1) {
                state.combos = state.combos.filter(combo => combo.id !== action.payload)
                delete state.comboItems[action.payload]
            } else {
                state.combos[idx].amount -= 1
                state.comboItems[action.payload] = state.comboItems[action.payload].map(item => ({
                    ...item,
                    amount: item.amount - 1
                }))
            }
            updateTotalPrice(state)
        },
        clearState: state => {
            cartAdapter.removeAll(state)
            state.totalPrice = 0
            state.finishedProductIds = []
            state.comment = ""
            state.change = 0
            state.inTime = null
            state.paymentUrl = null
            state.combos = []
            state.comboItems = {}
        }
    },
    extraReducers: builder => {
        // builder.addCase(checkProducts.fulfilled, (state, action) => {
        //     state.finishedProductIds = action.payload
        // })
        // builder.addCase(createOrder.fulfilled, state => {
        //     cartAdapter.removeAll(state)
        //     state.totalPrice = 0
        //     state.finishedProductIds = []
        //     state.comment = ""
        //     state.change = 0
        //     state.inTime = null
        //     state.paymentUrl = null
        //     state.combos = []
        //     state.comboItems = {}
        // })
    }
})

export const {
    clearState,
    addToCart,
    removeFromCart,
    plusAmount,
    minusAmount,
    updateChange,
    updateComment,
    updatePaymentUrl,
    plusComboAmount,
    addComboToCart,
    minusComboAmount,
    removeComboFromCart
} = cartSlice.actions
// Вывод всех продуктов в козине
const {selectAll, selectById} = cartAdapter.getSelectors<StoreState>(state => state.cart)
// Вывод продуктов в корзине
export const useCartProducts = () => useSelector(selectAll)
// Вывод общую стоимость корзины
export const useCartTotalPrice = () => useSelector((state: StoreState) => state.cart.totalPrice)
// Закончившиеся продукты
export const useCartFinishedProductIds = () =>
    useSelector((state: StoreState) => state.cart.finishedProductIds)
// Сдачи
export const useCartChange = () => useSelector((state: StoreState) => state.cart.change)
// Коментарий
export const useCartCommnet = () => useSelector((state: StoreState) => state.cart.comment)
// Payment Url
export const useCartPaymentUrl = () => useSelector((state: StoreState) => state.cart.paymentUrl)
// Кол-во в корзине
export const useCartCountItems = () =>
    useSelector((state: StoreState) => state.cart.ids.length + state.cart.combos.length)
// Вывод всех комбо
export const useCartCombos = () => useSelector((state: StoreState) => state.cart.combos)
// Вывод комбо продуктов по ID
export const useCartComboProductByComboId = (comboId: string) =>
    useSelector((state: StoreState) => state.cart.comboItems[comboId])
// Вывод всех комбо продуктов
export const useCartComboProducts = () => useSelector((state: StoreState) => state.cart.comboItems)
// Вывод товар из корзины по UID
export const useCartGetByUID = (uid: string) => useSelector((state: StoreState) => selectById(state, uid))

export default cartSlice.reducer
