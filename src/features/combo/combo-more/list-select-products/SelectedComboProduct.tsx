import SwitchButtons from "components/switch-buttons/SwitchButtons"
import React, {useEffect, useState} from "react"
import styles from "./SelectedComboProduct.module.css"
// import {AiFillEdit} from "react-icons/ai"
import {CrustProduct, Product, ProductSize} from "types/Menu"
import {useLanguage} from "utils/i18n.config"

interface SelectedComboProductProps {
    item: ProductSize | Product
    changeType: (id: number | string, item: ProductSize | Product) => void
}

const SelectedComboProduct: React.FC<SelectedComboProductProps> = ({item, changeType}) => {
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
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={item.image} width="60px" height="60px"  alt=""/>
                </div>
                <div className={styles.details}>
                    <h3 className={styles.title}>{item?.translations.title[lang] || item.name}</h3>
                    {item?.translations.desc[lang] && (
                        <div className={styles.desc}>{item?.translations.desc[lang]}</div>
                    )}
                </div>
                {/*<Button icon={<AiFillEdit />} ghost />*/}
            </div>
            <div className="crusts-types">
                {crusts && (
                    <SwitchButtons
                        value={crusts[0]?.id}
                        onClick={id => changeType(id, item)}
                        // @ts-ignore
                        data={crusts.map(crust => ({
                            id: crust.id,
                            label: crust.translations.title[lang] || crust.name,
                            groupId: crust.parentGroup,
                            amount: 1,
                            code: crust.code,
                            price: crust.price,
                            type: "crust"
                        }))}
                    />
                )}
            </div>
        </>
    )
}
export default SelectedComboProduct
