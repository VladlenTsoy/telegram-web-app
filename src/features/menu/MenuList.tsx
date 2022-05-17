import React, {useEffect} from "react"
import {useDispatch} from "store"
import {fetchMenu} from "./fetchMenu"
import {useGetMenuLoading, useGetPizza} from "./menuSlice"
import Loader from "components/Loader"

const MenuList: React.FC = () => {
    const pizza = useGetPizza()
    const loading = useGetMenuLoading()
    const dispatch = useDispatch()

    useEffect(() => {
        const promise = dispatch(fetchMenu())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading)
        return <Loader />

    return (
        <>
            {pizza && pizza.map(item =>
                <div key={item.id}>
                    {item.name}
                </div>
            )}
        </>
    )
}

export default MenuList
