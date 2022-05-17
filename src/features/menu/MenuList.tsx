import React, {useEffect, useState} from "react"
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
    const [visible, setVisible] = useState(false)

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
            {visible &&
                <div className={styles.modal} onClick={() => setVisible(false)}>
                    <div className={styles.content}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam asperiores at blanditiis
                        commodi,
                        delectus dolore dolorum eligendi est et ex mollitia nemo officiis provident quas quasi
                        reprehenderit ut
                        velit voluptas.
                    </div>
                </div>
            }
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
                            <button className={styles.action} onClick={() => setVisible(true)}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MenuList
