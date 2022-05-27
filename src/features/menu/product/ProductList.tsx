import React from "react"
import styles from "./ProductList.module.css"
import {useGetById} from "../menuSlice"
import ProductCard from "components/product-card/ProductCard"

interface ProductListProps {
    type: string
    scale?: string
}

const ProductList: React.FC<ProductListProps> = ({type, scale = "1.5"}) => {
    const products = useGetById(type)
    return (
        <div className={styles.container}>
            {products && products.map(product =>
                <ProductCard product={product} scale={scale} key={product.id} />)
            }
        </div>
    )
}

export default ProductList
