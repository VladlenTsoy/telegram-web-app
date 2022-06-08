import React from "react"
import styles from "./ComboMore.module.css"
import {useGetComboById} from "../comboSlice"
import {FiArrowLeft} from "react-icons/fi"
import {useLanguage} from "utils/i18n.config"
import ComboMoreActions from "./ComboMoreActions"
import {navigate, useApp} from "features/app/appSlice"
import {useDispatch} from "store"
import EmptyPage from "components/empty-page/EmptyPage"
import {useTranslation} from "react-i18next"

const ComboMore = () => {
    const {t} = useTranslation()
    const {router} = useApp()
    const comboId = router.replace("combo/", "")
    const {lang} = useLanguage()
    const combo = useGetComboById(comboId)
    const dispatch = useDispatch()

    const onClickHandler = () =>
        dispatch(navigate("menu"))

    // if (combo)
        return <EmptyPage back="menu" title={t("promotions")} />
    // return (
    //     <>
    //         <div className={styles.backAndImage}>
    //             <button className={styles.back} onClick={onClickHandler}>
    //                 <FiArrowLeft />
    //             </button>
    //             <div className={styles.image}>
    //                 {combo.image && <img src={combo.image} alt={combo.image} />}
    //             </div>
    //         </div>
    //         <div className={styles.container}>
    //             <h2 className={styles.title}>{combo.translations.title[lang] || combo.name}</h2>
    //             <p className={styles.desc}>{combo.translations.desc[lang]}</p>
    //             <ComboMoreActions combo={combo} />
    //         </div>
    //     </>
    // )
}

export default ComboMore
