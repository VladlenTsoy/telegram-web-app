import React from "react"
import cn from "classnames"
import styles from "./ProductCard.module.css"
import {CartComboProduct} from "types/Cart"
import {useLanguage} from "utils/i18n.config"
import {BsCheckLg} from "react-icons/bs"

interface ComboProductCardProps {
    comboProduct: CartComboProduct
    selectedProduct?: CartComboProduct
    selectProduct: (product: CartComboProduct) => void
}

const ProductCard: React.FC<ComboProductCardProps> = ({comboProduct, selectedProduct, selectProduct}) => {
    const {lang} = useLanguage()
    const isActive = selectedProduct?.id === comboProduct.id

    return (
        <div
            id={`p-${comboProduct.productId}`}
            className={cn(styles.card, {[styles.active]: isActive})}
            onClick={() => selectProduct(comboProduct)}
        >
            {isActive && <div className={styles.check}><BsCheckLg /></div>}
            <div className={styles.image}>
                <img
                    src={comboProduct.image}
                    height={140}
                    width={164}
                    alt=""
                />
            </div>
            <div className={styles.title}>{comboProduct.translations.title[lang] || comboProduct.name}</div>
        </div>
    )
}

export default React.memo<ComboProductCardProps>(ProductCard)
