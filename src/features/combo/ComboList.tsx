import React, {useEffect} from "react"
import {useDispatch} from "store"
import {fetchCombo} from "./fetchCombo"
import {useGetCombos} from "./comboSlice"
import {useLanguage} from "utils/i18n.config"
import styles from "./ComboList.module.css"

const ComboList = () => {
    const {lang} = useLanguage()
    const dispatch = useDispatch()
    const combos = useGetCombos()

    useEffect(() => {
        const promise = dispatch(fetchCombo())
        return () => {
            promise.abort()
        }
    }, [dispatch])

    return (
        <div className={styles.container}>
            {combos.map(combo =>
                <div key={combo.sourceActionId} className={styles.combo}>
                    <div className={styles.image}>
                        {combo.image && <img src={combo.image} alt={combo.name} />}
                    </div>
                    <div className={styles.details}>
                        <h4>{combo.translations.title[lang] || combo.name}</h4>
                        {combo.translations.desc && <p className={styles.desc}>{combo.translations.desc[lang]}</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ComboList
