import React from "react"
import styles from "./ProductCard.module.css"
import {Product} from "types/Menu"
import {formatPrice} from "../../utils/formatPrice"
import cn from "classnames"

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={product.image} alt={product.translations.title["ru"]} />
                <div className={styles.count}>{2}</div>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{product.translations.title["ru"]}</div>
                <div className={styles.priceAndButton}>
                    <div className={styles.price}>
                        <span>{formatPrice(product.price)}</span>сум
                    </div>
                    <div className={styles.actions}>
                        <button className={cn(styles.action, styles.remove)}>
                            <span>-</span>
                        </button>
                        <button className={cn(styles.action, styles.add)}>
                            <span>+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
