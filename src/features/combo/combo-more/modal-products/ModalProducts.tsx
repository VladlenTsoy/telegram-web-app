import React from "react"
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
    selectedProducts: CartComboProduct[]
    addComboProduct: (comboProduct: ProductSize | Product, groupId: string) => void
}

const ModalProducts: React.FC<ModalProductsProps> = (
    {
        onClose,
        visible,
        selectGroupId,
        combo,
        selectedProducts,
        addComboProduct
    }
) => {
    const selectedGroup = combo.items.find(g => g.id === selectGroupId)

    return (
        <Modal visible={visible} onClose={onClose}>
            <div className={styles.scroll}>
                <div className={styles.container}>
                    {selectedGroup &&
                        selectedGroup.products.map((product) =>
                                product && (
                                    <ComboProductCard
                                        key={product.id}
                                        comboProduct={product as ProductSize}
                                        items={selectedProducts}
                                        addItem={addComboProduct}
                                        selected={selectGroupId}
                                    />
                                )
                        )}
                </div>
            </div>
        </Modal>
    )
}

export default ModalProducts
