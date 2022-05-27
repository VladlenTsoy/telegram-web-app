import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useDefaultDispatch} from "react-redux"
import menu from "features/menu/menuSlice"
import cart from "features/cart/cartSlice"

export const store = configureStore({
    reducer: {
        menu,
        cart
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
