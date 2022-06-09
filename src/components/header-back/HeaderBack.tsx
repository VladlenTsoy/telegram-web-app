import React from "react"
import styles from "./HeaderBack.module.css"
import {navigate} from "features/app/appSlice"
import {useDispatch} from "store"
import {BsChevronLeft} from "react-icons/bs"

interface HeaderBackProps {
    title?: string
    back?: string
}

const HeaderBack: React.FC<HeaderBackProps> = ({title, back}) => {
    const dispatch = useDispatch()

    const onBackHandler = () => {
        dispatch(navigate(back || "menu"))
    }

    return (
        <div className={styles.header}>
            {!!back && <div className={styles.back} onClick={onBackHandler}>
                <BsChevronLeft className={styles.icon} />
            </div>}
            {!!title && <div className={styles.title}>
                {title}
            </div>}
        </div>
    )
}

export default HeaderBack
