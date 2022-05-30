import React, {useEffect} from "react"
import styles from "./App.module.css"
import MenuList from "./features/menu/MenuList"
import {useDispatch} from "./store"
import {fetchMenu} from "./features/menu/fetchMenu"
import Loader from "./components/loader/Loader"
import {useGetMenuLoading} from "./features/menu/menuSlice"
import cn from "classnames"

function App() {
    const isLoading = useGetMenuLoading()
    const dispatch = useDispatch()

    useEffect(() => {
        window.Telegram.WebApp.ready()
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (isLoading)
        return <Loader />

    return (
        <div className={cn(styles.app)} data-theme={window?.Telegram?.WebApp?.colorScheme || "light"}>
            <MenuList />
        </div>
    )
}

export default App
