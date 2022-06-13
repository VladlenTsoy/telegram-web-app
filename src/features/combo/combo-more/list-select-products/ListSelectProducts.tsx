import React from "react"
import {Combo} from "types/Combo"
import styles from "./ListSelectProducts.module.css"
import SelectedComboProduct from "./SelectedComboProduct"
import {CartComboProduct} from "types/Cart"
import {useTranslation} from "react-i18next"
import {FaChevronRight} from "react-icons/fa"

interface SelectProductProps {
    combo: Combo
    selectedProducts: CartComboProduct[]
    onClickComboGroup: any
    changeType: any
}

const ListSelectProducts: React.FC<SelectProductProps> = (
    {
        combo,
        selectedProducts,
        onClickComboGroup,
        changeType
    }
) => {
    const {t} = useTranslation()
    return (
        <div className={styles.card}>
            {combo.items.map(comboItem => {
                const selectedProduct = selectedProducts.find(item => item.comboParentGroup === comboItem.id)
                return <div className={styles.item} key={comboItem.id}>
                    {
                        selectedProduct ?
                            <SelectedComboProduct
                                item={selectedProduct}
                                changeType={changeType}
                                label={comboItem.name}
                            /> :
                            <div className={styles.details} onClick={() => onClickComboGroup(comboItem)}>
                                <div className={styles.info}>
                                    <div className={styles.desc}>{t("select")}</div>
                                    <div className={styles.title}>{comboItem.name}</div>
                                </div>
                                <FaChevronRight className={styles.arrow} />
                            </div>
                    }
                </div>
            })}
        </div>
    )
}

export default ListSelectProducts
