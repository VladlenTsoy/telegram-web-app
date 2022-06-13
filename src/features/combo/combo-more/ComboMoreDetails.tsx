import React from "react"
import styles from "./ComboMoreDetails.module.css"
import {FiArrowLeft} from "react-icons/fi"
import ComboMoreActions from "./ComboMoreActions"
import {Combo} from "types/Combo"
import {useDispatch} from "store"
import {navigate} from "features/app/appSlice"
import {useLanguage} from "utils/i18n.config"

interface ComboMoreDetailsProps {
    combo: Combo
}

const ComboMoreDetails: React.FC<ComboMoreDetailsProps> = ({combo}) => {
    const dispatch = useDispatch()
    const {lang} = useLanguage()

    // Назад в меню
    const onClickHandler = () => dispatch(navigate("menu"))

    return (
        <div className={styles.wrapper}>
            <div className={styles.backAndImage}>
                <button className={styles.back} onClick={onClickHandler}>
                    <FiArrowLeft />
                </button>
                <div className={styles.image}>
                    {combo.image && <img src={combo.image} alt={combo.image} />}
                </div>
            </div>
            <div className={styles.container}>
                <h2 className={styles.title}>{combo.translations.title[lang] || combo.name}</h2>
                <p className={styles.desc}>{combo.translations.desc[lang]}</p>
                <ComboMoreActions combo={combo} />
            </div>
        </div>
    )
}

export default ComboMoreDetails
