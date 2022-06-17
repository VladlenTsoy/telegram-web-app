import React from "react"
import styles from "./ModificatorBlock.module.css"
import {formatPrice} from "utils/formatPrice"

interface ModificatorBlockProps {
    id: string
    title: string
    price: number
    image: string
    onAddToppingHandler: (modeId: any) => void
}

const ModificatorBlock: React.FC<ModificatorBlockProps> = ({id, image, title, price, onAddToppingHandler}) => {
    return (
        <div className={styles.modificatorBlock}>
            <div>
                <img src={image || "/images/default-image.jpeg"} alt={title} width={40} height={40} />
                <h3>{title}</h3>
            </div>
            <div className={styles.bottomBlock}>
                <p>{formatPrice(price)} сум</p>
                <button onClick={() => onAddToppingHandler(id)}>+</button>
            </div>
        </div>
    )
}

export default ModificatorBlock
