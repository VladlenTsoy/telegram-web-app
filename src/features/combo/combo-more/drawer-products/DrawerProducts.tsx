import React from "react"
import {Combo} from "types/Combo"
import ComboProductCard from "./ProductCard"
import styles from "./DrawerProducts.module.css"
import {ProductSize} from "types/Menu"
import Modal from "components/modal/Modal"

interface GridProductsProps {
    show: string | null
    combo: Combo
    selectedProducts: any
    addComboProductHandler: any
}

const DrawerProducts: React.FC<GridProductsProps> = (
    {
        show,
        combo,
        selectedProducts,
        addComboProductHandler
    }
) => {
    const selectedGroup = combo.items.find(g => g.id === show)

    return (
        <Modal visible={!!show} onClose={() => null}>
            <div className={styles.container}>
                {selectedGroup &&
                    selectedGroup.products.map((product) =>
                            product && (
                                <ComboProductCard
                                    key={product.id}
                                    comboProduct={product as ProductSize}
                                    items={selectedProducts}
                                    addItem={addComboProductHandler}
                                    selected={show}
                                />
                            )
                    )}
            </div>
        </Modal>
    )
}

export default DrawerProducts
