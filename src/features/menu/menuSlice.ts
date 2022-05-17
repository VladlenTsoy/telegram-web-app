import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {fetchMenu} from "./fetchMenu"
import {Category} from "types/Menu"
import {StoreState} from "../../store"
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
        builder.addCase(fetchMenu.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchMenu.fulfilled, (state, action) => {
            menuAdapter.setAll(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchMenu.rejected, (state, action) => {
            state.loading = false
        })
    }
})

const {selectAll, selectById} = menuAdapter.getSelectors<StoreState>(state => state.menu)

export const useGetMenu = () => useSelector(selectAll)
export const useGetMenuLoading = () => useSelector((state: StoreState) => state.menu.loading)
export const useGetPizza = () => {
    const categories = useGetMenu()
    return categories.find(category => category.menuType === "pizza")?.groups
}


export default menuSlice.reducer
