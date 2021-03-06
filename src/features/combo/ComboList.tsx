import React, {useEffect} from "react"
import {useDispatch} from "store"
import {fetchCombo} from "./fetchCombo"
import {useGetCombos, useGetCombosLoading} from "./comboSlice"
import styles from "./ComboList.module.css"
import LoadingBlock from "components/loading-block/LoadingBlock"
import {navigate} from "../app/appSlice"
import {useLanguage} from "utils/i18n.config"

const ComboList = () => {
    const {t} = useLanguage()
    const dispatch = useDispatch()
    const combos = useGetCombos()
    const loading = useGetCombosLoading()

    const onClickHandler = (id: string) => dispatch(navigate(`combo/${id}`))

    useEffect(() => {
        const promise = dispatch(fetchCombo())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    if (loading || !combos.length)
        return <LoadingBlock text={t("loading")} />

    return (
        <div className={styles.container}>
            {combos.map(combo =>
                <div
                    key={combo.sourceActionId}
                    className={styles.combo}
                    onClick={() => onClickHandler(combo.sourceActionId)}
                >
                    <div className={styles.image}>
                        {combo.image && <img src={combo.image} alt={combo.name} />}
                    </div>
                    <button className={styles.btn}>{t("collect")}</button>
                </div>
            )}
        </div>
    )
}

export default ComboList
