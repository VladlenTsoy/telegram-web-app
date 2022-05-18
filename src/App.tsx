import React, {useEffect} from "react"
import styles from "./App.module.css"
import MenuList from "./features/menu/MenuList"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import PizzaList from "./features/menu/pizza/PizzaList"
import {useDispatch} from "./store"
import {fetchMenu} from "./features/menu/fetchMenu"
import Loader from "./components/Loader"
import {useGetMenuLoading} from "./features/menu/menuSlice"

function App() {
    const isLoading = useGetMenuLoading()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (isLoading)
        return <Loader />

    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MenuList />} />
                    <Route path="/pizza-list" element={<PizzaList />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
