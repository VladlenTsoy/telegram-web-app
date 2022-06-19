import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {DOMAIN_API} from "utils/api"
import {CartProduct} from "types/Cart"
import {Coupon, CouponSentDish, CouponSentParams, CouponSentProduct} from "./promoCode"

interface AgrProps {
    coupon: string
    phone: string
    name: string
    token?: string
}

export const checkPromoCode = createAsyncThunk<Coupon, AgrProps, ThunkProps>(
    "order/promo-code/check",
    async (data, {getState}) => {
        const {cart} = getState()
        const {phone, coupon, name, token} = data
        // const {customer} = auth
        const {entities} = cart

        if (!(name && phone && token)) throw new Error("ErrorPromoCodeAuth")

        const items: (CouponSentProduct | CouponSentDish)[] = Object.values(entities).map(
            // @ts-ignore
            (product: CartProduct) => ({
                productId: product.productId,
                name: product.defaultTitle,
                comboInformation: null,
                image: product.image || "",
                category: product.type,
                type: "Product",
                modifiers: product.modifiers,
                amount: product.amount,
                price: product.price + product.modifiers.reduce((acc, modifier) => (acc + modifier.price), 0)
            })
        )

        try {
            const order: CouponSentParams = {
                organizationId: "84f0f1ff-1ba0-4857-bfc6-1ae23b0b4cb1",
                order: {
                    phone: phone,
                    customer: {
                        name: name,
                        phone: phone
                    },
                    orderServiceType: "DeliveryByCourier",
                    items: items
                },
                iikoCard5Info: {
                    coupon
                },
                coupon
            }

            const response = await fetch(DOMAIN_API + "/delivery/coupon", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                body: JSON.stringify(order)
            })

            if (response.ok) return await response.json()
            throw new Error(await response.text())
        } catch (e: any) {
            console.error(e.message)
            throw new Error("ErrorPromoCode")
        }
    }
)
