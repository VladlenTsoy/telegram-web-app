import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {CartProduct} from "types/Cart"
import {useSelector} from "react-redux"
import {StoreState} from "store"
import {uuidv4} from "utils/uuid"
import {checkPromoCode} from "./checkPromoCode"
import {Coupon} from "./promoCode"

export const promoCodeAdapter = createEntityAdapter<CartProduct>({
    selectId: cartProduct => cartProduct.uid
})

export interface StateProps {
    uuid: string | null
    name: string | null
    productIds: string[] | null
    conditions: {
        minTotalPrice: number | null
    }
    discount: {
        summa: number
    }
    error: {
        code: string | null
        message: string | null
    }
    loading: boolean
}

const initialState = promoCodeAdapter.getInitialState<StateProps>({
    uuid: null,
    name: null,
    productIds: null,
    conditions: {
        minTotalPrice: null
    },
    discount: {
        summa: 0
    },
    error: {
        code: null,
        message: null
    },
    loading: false
})

const UpdateItems = (state: any, actions: Coupon["actions"], positionUid: string) => {
    let items: CartProduct[] = []
    let ids: string[] = []
    try {
        // @ts-ignore
        items = actions[0].items.map(product => {
            const productUid = uuidv4()
            ids.push(productUid)
            const modifier = product.crusts?.products[0]
            const modifiers = product.crusts ? [
                {
                    productId: modifier.id,
                    amount: 1,
                    productGroupId: modifier.parentGroup,
                    price: modifier.price,
                    title: modifier.translations.title,
                    defaultTitle: modifier.name,
                    type: modifier.type
                }
            ] : []

            return {
                uid: productUid,
                productId: product.id,
                amount: 1,
                price: product.price,
                modifiers: modifiers,
                comboInformation: null,
                positionId: positionUid,
                type: "pizza",
                image: product.image,
                title: product.translations.title,
                defaultTitle: product.name
            }
        })
        state.productIds = ids
        promoCodeAdapter.addMany(state, items)
    } catch (e) {
        ids = []
    }
}

const promoCodeSlice = createSlice({
    name: "promo-code",
    initialState,
    reducers: {
        updateLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        cancelPromoCode: state => {
            state.uuid = null
            state.name = null
            state.productIds = null
            state.conditions = {
                minTotalPrice: null
            }
            state.discount = {
                summa: 0
            }
            state.error = {
                code: null,
                message: null
            }
            promoCodeAdapter.removeAll(state)
        }
    },
    extraReducers: builder => {
        builder.addCase(checkPromoCode.pending, (state) => {
            state.error.message = null
            state.error.code = null
            state.loading = true
        })
        builder.addCase(checkPromoCode.fulfilled, (state, action) => {
            const {upsales, conditions, actions, freeProducts, discounts, name} = action.payload
            state.loading = false
            if (upsales.length) {
                state.error.message = upsales[0].suggestionText
                return
            }
            if (!(discounts.length || freeProducts.length) || name === "Test") {
                state.error.code = "ErrorInvalidPromoCode"
                return
            }
            const data = action.meta.arg
            // console.log(state.name)
            // if (state.name && !state.error.code) return
            if (conditions.length) {
                conditions.map(condition => {
                    if (condition.typeName === "LoyaltyProgramEngine.Conditions.OrderSumCondition")
                        state.conditions.minTotalPrice = condition.settings.OrderSum
                })
            }
            const positionUid = uuidv4()
            state.uuid = positionUid
            if (actions.length) {
                UpdateItems(state, actions, positionUid)
            }
            if (discounts.length) {
                try {
                    state.discount.summa = discounts.reduce(
                        (acc, discount) => (acc + discount.discountSum),
                        0
                    )
                } catch (e) {
                    console.error(e)
                }
            }
            state.name = data.coupon
        })
        builder.addCase(checkPromoCode.rejected, (state, action) => {
            if (action.error?.message) state.error.code = action.error?.message
            state.loading = false
        })
    }
})

const {selectAll} = promoCodeAdapter.getSelectors<StoreState>(state => state.promoCode)
//
export const {cancelPromoCode, updateLoading} = promoCodeSlice.actions
//
export const useGetPromoCodeProducts = () => useSelector(selectAll)
//
export const useGetPromoCode = () => useSelector((state: StoreState) => state.promoCode)

export default promoCodeSlice.reducer
