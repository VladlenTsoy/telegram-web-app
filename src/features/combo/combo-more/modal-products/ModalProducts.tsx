import React, {useCallback, useState} from "react"
import {Combo} from "types/Combo"
import ComboProductCard from "./ProductCard"
import styles from "./ModalProducts.module.css"
import {Product, ProductSize} from "types/Menu"
import Modal from "components/modal/Modal"
import {CartComboProduct} from "types/Cart"

interface ModalProductsProps {
    onClose: () => void
    visible: boolean
    selectGroupId: string | null
    combo: Combo
    addComboProduct: (comboProduct: ProductSize | Product, groupId: string) => void
}

const ModalProducts: React.FC<ModalProductsProps> = (
    {
        onClose,
        visible,
        selectGroupId,
        combo,
        addComboProduct
    }
) => {
    const selectedGroup = combo.items.find(g => g.id === selectGroupId)
    const [selectedProduct, setSelectedProduct] = useState<CartComboProduct>()

    const selectProduct = useCallback((product: CartComboProduct) => {
        setSelectedProduct(product)
    }, [])

    const onClickHandler = () => {
        selectGroupId && selectedProduct && addComboProduct(selectedProduct, selectGroupId)
    }

    return (
        <Modal visible={visible} onClose={onClose} title={selectedGroup?.name}>
            <div className={styles.container}>
                {selectedGroup && selectedGroup.products.length &&
                    selectedGroup.products.map((product) =>
                            product && (
                                <ComboProductCard
                                    key={product.id}
                                    comboProduct={product as CartComboProduct}
                                    selectedProduct={selectedProduct}
                                    selectProduct={selectProduct}
                                />
                            )
                    )}
            </div>
            <div className={styles.actions}>
                <button className={styles.button} onClick={onClickHandler}>Добавить</button>
            </div>
        </Modal>
    )
}

export default ModalProducts
