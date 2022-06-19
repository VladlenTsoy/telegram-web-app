import React, {useState} from "react"
import styles from "./SelectHalfBlock.module.css"
import Modal from "components/modal/Modal"
import ProductCard from "./ProductCard"
import Button from "components/button/Button"
import {SelectedHalf} from "../PizzaHalfDetails"
import {useLanguage} from "../../../utils/i18n.config"

interface SelectHalfBlockProps {
    title: string
    products: SelectedHalf[]
    isLeft?: boolean
    selectedProduct: SelectedHalf | null
    selectProduct: (product: SelectedHalf, left?: boolean) => void
}

const SelectHalfBlock: React.FC<SelectHalfBlockProps> = (
    {
        isLeft,
        title,
        products,
        selectedProduct,
        selectProduct
    }
) => {
    const {lang, t} = useLanguage()
    const [selectedHalf, setSelectedHalf] = useState<SelectedHalf>()
    const [visible, setVisible] = useState(false)

    const onClose = () => setVisible(false)

    const selectHalfHandler = (product: SelectedHalf) => {
        setSelectedHalf(product)
    }

    const onClickHandler = () => {
        selectedHalf && selectProduct(selectedHalf, isLeft)
        setVisible(false)
    }

    return <>
        <div onClick={() => setVisible(true)} className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.mainBlock}>
                <div className={styles.label}>{selectedProduct?.title[lang] || t("select")}</div>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M1.41421 0C0.523309 0 0.0771422 1.07714 0.707107 1.70711L4.29289 5.29289C4.68342 5.68342 5.31658 5.68342 5.70711 5.29289L9.29289 1.70711C9.92286 1.07714 9.47669 0 8.58579 0H1.41421Z"
                          fill="black" />
                </svg>
            </div>
        </div>
        <Modal
            onClose={onClose}
            visible={visible}
        >
            <div className={styles.container}>
                {products.map((product) =>
                        product && (
                            <ProductCard
                                selectedProduct={selectedHalf}
                                isLeft={isLeft}
                                key={product.id}
                                product={product}
                                selectProduct={selectHalfHandler}
                            />
                        )
                )}
            </div>
            <div className={styles.actions}>
                <Button type="secondary" onClick={onClickHandler} disabled={!selectedHalf}>{t("addToCart")}</Button>
            </div>
        </Modal>
    </>
}

export default SelectHalfBlock
