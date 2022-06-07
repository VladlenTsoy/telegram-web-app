import {createAsyncThunk} from "@reduxjs/toolkit"
import {ThunkProps} from "store"
import {DOMAIN_API, request} from "utils/api"
import {Combo} from "types/Combo"

type ReturnedType = Combo[]

export const fetchCombo = createAsyncThunk<ReturnedType, undefined, ThunkProps>(
    "combo/fetch",
    async (_, {signal}) => {
        return await request<ReturnedType>(DOMAIN_API + `/combos`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            signal
        })
    }, {
        condition(_: undefined, {getState}) {
            const {combo} = getState()
            return !combo.ids.length
        }
    }
)
