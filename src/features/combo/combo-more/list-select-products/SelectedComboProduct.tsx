import SwitchButtons from "components/switch-buttons/SwitchButtons"
import React, {useEffect, useState} from "react"
import styles from "./SelectedComboProduct.module.css"
import {AiOutlineDelete} from "react-icons/ai"
import {CrustProduct, Product, ProductSize} from "types/Menu"
import {useLanguage} from "utils/i18n.config"

interface SelectedComboProductProps {
    item: ProductSize | Product
    label: string
    changeType: (id: number | string, item: ProductSize | Product) => void
}

const SelectedComboProduct: React.FC<SelectedComboProductProps> = ({item, label, changeType}) => {
    const {lang} = useLanguage()
    const [crusts, setCrusts] = useState<any[] | null>(null)

    useEffect(() => {
        if (!!item?.crusts && !!item?.crusts?.products) {
            setCrusts(
                (JSON.parse(JSON.stringify(item?.crusts?.products)) as CrustProduct[])
                    .sort((a, b) => a.price - b.price)
            )
        }
    }, [item])

    return (
        <>
            <div className={styles.labelAndAction}>
                <div className={styles.label}>{label}</div>
                <div className={styles.action}><AiOutlineDelete /></div>
            </div>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={item.image} alt={item?.translations.title[lang] || item.name} />
                </div>
                <div className={styles.details}>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{item?.translations.title[lang] || item.name}</h3>
                        {item?.translations.desc[lang] && (
                            <div className={styles.desc}>{item?.translations.desc[lang]}</div>
                        )}
                    </div>
                    {crusts && (
                        <SwitchButtons
                            value={crusts[0]?.id}
                            onClick={id => changeType(id, item)}
                            margin="0"
                            data={crusts.map(crust => ({
                                id: crust.id,
                                title: crust.translations.title[lang] || crust.name,
                                groupId: crust.parentGroup,
                                amount: 1,
                                code: crust.code,
                                price: crust.price,
                                type: "crust"
                            }))}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
export default SelectedComboProduct
