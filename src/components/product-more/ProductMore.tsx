import React, {useCallback, useEffect, useState} from "react"
import styles from "./ProductMore.module.css"
import {Group, ProductSize} from "types/Menu"
import {useLanguage} from "../../utils/i18n.config"
import CrustAndAction from "./CrustAndAction"

export interface CrustOption {
    id: string
    title: string
    price: number
}

interface ProductMoreProps {
    group: Group
    onClose: () => void
}

const ProductMore: React.FC<ProductMoreProps> = ({group, onClose}) => {
    const {lang, t} = useLanguage()
    const [sizes, setSizes] = useState<{id: string, title: string, price: number}[]>([])
    const [productSize, setProductSize] = useState<ProductSize>()

    // Изменен размер
    const onChangeSizeHandler = useCallback((productSizeId: string) => {
        setProductSize(group.products.find(item => item.id === productSizeId))
    }, [group])

    useEffect(() => {
        const _sizes: ProductSize[] = JSON.parse(JSON.stringify(group.products)).sort((a: any, b: any) => a.price - b.price)
        const __sizes = _sizes.map(i => {
            const title = i.translations.title[lang] || i.name
            return {
                id: i.id,
                // @ts-ignore
                title: t(title?.trim()?.split(" ").pop().toLocaleLowerCase()),
                price: i.price
            }
        })
        setProductSize(_sizes[0])
        setSizes(__sizes)
    }, [group, lang, t])

    return (
        <>
            <div className={styles.imageContainer}>
                <img src={group.image} alt={group.translations.title[lang]} className={styles.image} />
            </div>
            <div className={styles.details}>
                <h2 className={styles.title}>{group.translations.title[lang]}</h2>
                <p className={styles.description}>{group.translations.desc[lang]}</p>
                {
                    productSize && sizes.length &&
                    <CrustAndAction
                        onClose={onClose}
                        productSize={productSize}
                        sizes={sizes}
                        selectProductSize={onChangeSizeHandler}
                    />
                }
            </div>
        </>
    )
}

export default ProductMore
