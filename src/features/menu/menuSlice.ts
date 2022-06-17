import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchMenu} from "./fetchMenu"
import {Category} from "types/Menu"
import {StoreState} from "store"
import {useSelector} from "react-redux"

export const menuAdapter = createEntityAdapter<Category>({})

interface StateProps {
    loading: boolean
}

const initialState = menuAdapter.getInitialState<StateProps>({
    loading: false
})

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Загрузка меню
        builder.addCase(fetchMenu.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchMenu.fulfilled, (state, action) => {
            menuAdapter.setAll(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchMenu.rejected, state => {
            state.loading = false
        })
    }
})

const {selectAll} = menuAdapter.getSelectors<StoreState>(state => state.menu)

// Вывод меню
export const useGetMenu = () => useSelector(selectAll)
// Вывод загрузки
export const useGetMenuLoading = () => useSelector((state: StoreState) => state.menu.loading)
// Вывод пицц
export const useGetPizza = () => {
    const categories = useGetMenu()
    return categories.find(category => category.menuType === "pizza")?.groups
}
// Вывод пицц
export const useGetById = (key: string) => {
    const categories = useGetMenu()
    return categories.find(category => category.menuType === key || category.icon === key)?.products
}
// Вывод конструктора
export const useGetConstructor = () => {
    const categories = useGetMenu()
    const category = categories.find(category => category.menuType === "pizza")
    if (!category) return null
    const group = category.groups.find(group => group.menuType === "constructor")
    if (!group) return null
    return group
}
// Вывод пицца половинки
export const useGetHalf = () => {
    const categories = useGetMenu()
    const category = categories.find(category => category.menuType === "pizza")
    if (!category) return null
    const group = category.groups.find(group => group.menuType === "half")
    if (!group) return null
    return group.products[0]
}

export default menuSlice.reducer
