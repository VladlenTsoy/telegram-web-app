import React from "react"
import cn from "classnames"
import styles from "./ProductCard.module.css"
import {ProductSize} from "types/Menu"
import {CartComboProduct} from "types/Cart"
import {useLanguage} from "utils/i18n.config"

interface ComboProductCardProps {
    comboProduct: ProductSize
    selected: any
    items: CartComboProduct[]
    addItem: any
}

const ProductCard: React.FC<ComboProductCardProps> = ({comboProduct, selected, items, addItem}) => {
    const {lang} = useLanguage()
    const isActive = items.filter(item => item.comboParentGroup === selected && item.id === comboProduct.id)

    return (
        <div id={`p-${comboProduct.productId}`}
             className={cn(styles.card, {[styles.active]: !!isActive.length})}
             onClick={() => addItem(comboProduct, selected)}>
            <div className={styles.image}>
                <img
                    src={comboProduct.image}
                    height={140}
                    width={164}
                    alt=""
                />
            </div>
            <div className={styles.title}>{comboProduct.translations.title[lang] || comboProduct.name}</div>
            {comboProduct.translations.desc[lang] && (
                <div className={styles.desc}>{comboProduct.translations.desc[lang]}</div>
            )}
        </div>
    )
}

export default React.memo<ComboProductCardProps>(ProductCard)
