import React from "react"
import styles from "./Banner.module.css"

interface ImgWrapperProps {
    leftImg?: string
    rightImg?: string
}

const Banner: React.FC<ImgWrapperProps> = ({leftImg, rightImg}) => {
    return (
        <div className={styles.banner}>
            <div className={styles.left}>
                {leftImg ? <img src={leftImg} alt="" /> : <div className={styles.leftEmpty}/>}
            </div>
            <div className={styles.right}>
                {rightImg ? <img src={rightImg} alt="" /> : <div className={styles.rightEmpty}/>}
            </div>
        </div>
    )
}

export default Banner
