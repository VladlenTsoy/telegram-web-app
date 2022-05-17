import React, {useEffect} from "react"
import {useDispatch} from "store"
import {fetchMenu} from "./fetchMenu"
import {useGetMenuLoading, useGetPizza} from "./menuSlice"
import Loader from "components/Loader"
import styles from "./MenuList.module.css"
import {formatPrice} from "../../utils/formatPrice"

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
        <div className={styles.container}>
            {pizza && pizza.map(item =>
                <div key={item.id} className={styles.card}>
                    <div className={styles.image}>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.title}>{item.translations.title["ru"]}</div>
                        <div className={styles.desc}>{item.translations.desc["ru"]}</div>
                        <div className={styles.priceAndButton}>
                            <div className={styles.price}>
                                от <span>{formatPrice(item.price)}</span> сум
                            </div>
                            <button className={styles.action}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuList
