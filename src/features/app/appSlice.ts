import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {StoreState} from "store"
import {defaultPizzaId} from "utils/variables"

const appSlice = createSlice({
    name: "app",
    initialState: {
        router: "menu",
        categoryId: defaultPizzaId
    },
    reducers: {
        navigate: (state, action: PayloadAction<string>) => {
            state.router = action.payload
        },
        selectCategoryId: (state, action: PayloadAction<string>) => {
            state.categoryId = action.payload
        }
    }
})

export default appSlice.reducer

export const {navigate, selectCategoryId} = appSlice.actions

export const useApp = () => useSelector((state: StoreState) => state.app)
