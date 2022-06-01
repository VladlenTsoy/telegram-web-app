import React, {useEffect, useState} from "react"
import {ProductSize} from "../../types/Menu"
import {CrustOption} from "./ProductMore"
import {useLanguage} from "../../utils/i18n.config"
import SwitchButtons from "../switch-buttons/SwitchButtons"

interface CrustsSelectProps {
    productSize: ProductSize
    crusts: CrustOption[]
    updateModifier: (modifierId: any) => void
}

const CrustSelect: React.FC<CrustsSelectProps> = ({productSize, crusts, updateModifier}) => {
    const {lang} = useLanguage()
    const [sortedCrust, setSortedCrust] = useState<CrustOption[]>([])

    useEffect(() => {
        try {
            // Сортировка размеров по стоимости
            setSortedCrust((JSON.parse(JSON.stringify(crusts)) as CrustOption[])
                .sort((a, b) => a.price - b.price))
        } catch (e) {
        }
    }, [crusts])

    if (!sortedCrust.length) return null

    return (
        <SwitchButtons
            data={sortedCrust}
            value={sortedCrust[0].id}
            onClick={updateModifier}
            label={productSize.crusts.translations.title[lang] || productSize.crusts.name}
        />
    )
}

export default CrustSelect
