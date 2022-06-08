import React from "react"
import {Combo} from "types/Combo"
import styles from "./ListSelectProducts.module.css"
import SelectedComboProduct from "./SelectedComboProduct"
// import Button from "components/button/Button"
// import {AiOutlineRight} from "react-icons/ai"
import {CartComboProduct} from "types/Cart"
import {useTranslation} from "react-i18next"

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
                    return <div
                        className={styles.item}
                        key={comboItem.id}
                        onClick={(e: any) => {
                            if (!e.target.closest(".crusts-types")) onClickComboGroup(comboItem)
                        }}
                    >
                        {
                            selectedProduct ?
                                <SelectedComboProduct item={selectedProduct} changeType={changeType} /> :
                                <div className={styles.details}>
                                    <div className={styles.desc}>{t("select")}</div>
                                    <div className={styles.title}>{comboItem.name}</div>
                                </div>
                        }
                    </div>
                }
            )}
        </div>
    )
}

export default ListSelectProducts
