import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {DOMAIN_API} from "utils/api"

type ReturnedType = string[]

interface AgrProps {
    organizationId: string
}

export const checkProducts = createAsyncThunk<ReturnedType, AgrProps, ThunkProps>(
    "cart/check/products",
    async (data, {getState}) => {
        // const {auth} = getState()
        try {
            const response = await fetch(DOMAIN_API + "/delivery/check", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    // Authorization: "Bearer " + auth.token
                },
                body: JSON.stringify(data)
            })
            if (response.ok) return await response.json()
            else return response.text()
        } catch (e: any) {
            return e.message
        }
    }
)
export default checkProducts
