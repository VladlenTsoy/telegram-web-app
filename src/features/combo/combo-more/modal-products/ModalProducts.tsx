import React, {useCallback, useState} from "react"
import {Combo, ComboProduct} from "types/Combo"
import ComboProductCard from "./ProductCard"
import styles from "./ModalProducts.module.css"
import {Product, ProductSize} from "types/Menu"
import Modal from "components/modal/Modal"
import {CartComboProduct} from "types/Cart"
import Button from "../../../../components/button/Button"
import {useTranslation} from "react-i18next"

interface ModalContentProps {
    selectedGroup: ComboProduct
    selectGroupId: string
    addComboProduct: (comboProduct: ProductSize | Product, groupId: string) => void
}

const ModalContent: React.FC<ModalContentProps> = ({selectedGroup, selectGroupId, addComboProduct}) => {
    const {t} = useTranslation()
    const [selectedProduct, setSelectedProduct] = useState<CartComboProduct>()

    const selectProduct = useCallback((product: CartComboProduct) => {
        setSelectedProduct(product)
    }, [])

    const onClickHandler = () => {
        selectedProduct && addComboProduct(selectedProduct, selectGroupId)
    }

    return <>
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
            <Button type="secondary" onClick={onClickHandler}>{t("add")}</Button>
        </div>
    </>
}

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

    return (
        <Modal visible={visible} onClose={onClose} title={selectedGroup?.name}>
            {!!(selectedGroup && selectGroupId) && <ModalContent
                selectedGroup={selectedGroup}
                selectGroupId={selectGroupId}
                addComboProduct={addComboProduct}
            />}
        </Modal>
    )
}

export default ModalProducts
