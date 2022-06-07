import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {DOMAIN_API, request} from "utils/api"
import {Category} from "types/Menu"

type ReturnedType = Category[]

export const fetchMenu = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "menu/fetch",
    async (_, {signal}) => {
        return await request<ReturnedType>(DOMAIN_API + `/menu`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal
        })
    },
    {
        condition(_: undefined, {getState}) {
            const {menu} = getState()
            return !menu.ids.length
        }
    }
)
