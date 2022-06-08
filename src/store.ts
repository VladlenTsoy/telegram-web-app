import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import app from "features/app/appSlice"
import menu from "features/menu/menuSlice"
import cart from "features/cart/cartSlice"
import combo from "features/combo/comboSlice"

export const store = configureStore({
    reducer: {
        app,
        menu,
        cart,
        combo
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({immutableCheck: false})
})

export type StoreState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface ThunkProps {
    dispatch: AppDispatch
    state: StoreState
    extra?: unknown
    rejectValue?: unknown
}

export const useDispatch = () => useDefaultDispatch<AppDispatch>()
