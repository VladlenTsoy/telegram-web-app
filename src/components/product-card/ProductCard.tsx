import React from "react"
import styles from "./ProductCard.module.css"
import {Product} from "types/Menu"
import {formatPrice} from "../../utils/formatPrice"

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={product.image} alt={product.translations.title["ru"]} />
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{product.translations.title["ru"]}</div>
                <div className={styles.priceAndButton}>
                    <div className={styles.price}>
                        <span>{formatPrice(product.price)}</span>сум
                    </div>
                    <button className={styles.action}>+</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
