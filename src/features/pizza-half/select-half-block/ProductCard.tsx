import React from "react"
import cn from "classnames"
import styles from "./ProductCard.module.css"
import {useLanguage} from "utils/i18n.config"
import {BsCheckLg} from "react-icons/bs"
import {SelectedHalf} from "../PizzaHalfDetails"

interface ComboProductCardProps {
    isLeft?: boolean
    selectedProduct?: SelectedHalf
    product: SelectedHalf
    selectProduct: (product: SelectedHalf) => void
}

const ProductCard: React.FC<ComboProductCardProps> = ({isLeft, selectedProduct, product, selectProduct}) => {
    const {lang} = useLanguage()
    const isActive = selectedProduct?.id === product.id

    return (
        <div
            id={`p-${product.id}`}
            className={cn(styles.card, {[styles.active]: isActive})}
            onClick={() => selectProduct(product)}
        >
            {isActive && <div className={styles.check}><BsCheckLg /></div>}
            <div className={styles.image}>
                <img
                    src={isLeft ? product.image2 : product.image}
                    height={140}
                    width={164}
                    alt=""
                />
            </div>
            <div className={styles.title}>{product.title[lang].replace(lang === "ru" ? "0,5 " : "50", "")}</div>
        </div>
    )
}

export default React.memo<ComboProductCardProps>(ProductCard)
