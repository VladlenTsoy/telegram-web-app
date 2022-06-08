import {createEntityAdapter, createSlice} from "@reduxjs/toolkit"
import {Combo} from "types/Combo"
import {fetchCombo} from "./fetchCombo"
import {useSelector} from "react-redux"
import {StoreState} from "store"

export const comboAdapter = createEntityAdapter<Combo>({
    selectId: (item) => item.sourceActionId
})

interface StateProps {
    loading: boolean
}

const initialState = comboAdapter.getInitialState<StateProps>({
    loading: false
})

const comboSlice = createSlice({
    name: "combo",
    initialState,
    reducers: {},
    extraReducers: builder => {
        // Загрузка меню
        builder.addCase(fetchCombo.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchCombo.fulfilled, (state, action) => {
            comboAdapter.setAll(state, action.payload)
            state.loading = false
        })
        builder.addCase(fetchCombo.rejected, state => {
            state.loading = false
        })
    }
})

const {selectAll} = comboAdapter.getSelectors<StoreState>(state => state.combo)

// Вывод меню
export const useGetCombos = () => useSelector(selectAll)
// Вывод загрузки
export const useGetCombosLoading = () => useSelector((state: StoreState) => state.combo.loading)
// Вывод комбо
export const useGetComboById = (id: string) => useSelector((state: StoreState) => state.combo.entities[id])

export default comboSlice.reducer
