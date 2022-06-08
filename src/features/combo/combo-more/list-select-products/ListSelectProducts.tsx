import React from "react"
import {Combo} from "types/Combo"
import styles from "./ListSelectProducts.module.css"
import SelectedComboProduct from "./SelectedComboProduct"
// import Button from "components/button/Button"
// import {AiOutlineRight} from "react-icons/ai"
import {CartComboProduct} from "types/Cart"

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
                        {selectedProduct ? (
                            <SelectedComboProduct item={selectedProduct} changeType={changeType} />
                        ) : (
                            <div className={styles.desc}>
                                <h3 className={styles.title}>{comboItem.name}</h3>
                                {/*<Button size="small" ghost rIcon={<AiOutlineRight />}>{t("select")}</Button>*/}
                            </div>
                        )}
                    </div>
                }
            )}
        </div>
    )
}

export default ListSelectProducts
