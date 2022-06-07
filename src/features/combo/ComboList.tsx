import React, {useEffect} from "react"
import {useDispatch} from "store"
import {fetchCombo} from "./fetchCombo"
import {useGetCombos, useGetCombosLoading} from "./comboSlice"
// import {useLanguage} from "utils/i18n.config"
import styles from "./ComboList.module.css"
import LoadingBlock from "../../components/loading-block/LoadingBlock"

const ComboList = () => {
    // const {lang} = useLanguage()
    const dispatch = useDispatch()
    const combos = useGetCombos()
    const loading = useGetCombosLoading()

    useEffect(() => {
        const promise = dispatch(fetchCombo())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading || !combos.length)
        return <LoadingBlock />

    return (
        <div className={styles.container}>
            {combos.map(combo =>
                <div key={combo.sourceActionId} className={styles.combo}>
                    <div className={styles.image}>
                        {combo.image && <img src={combo.image} alt={combo.name} />}
                    </div>
                    <button className={styles.btn}>Собрать</button>
                </div>
            )}
        </div>
    )
}

export default ComboList
