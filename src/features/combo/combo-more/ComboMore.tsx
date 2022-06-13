import React from "react"
import {useGetComboById} from "../comboSlice"
import {useApp} from "features/app/appSlice"
import EmptyPage from "components/empty-page/EmptyPage"
import {useTranslation} from "react-i18next"
import ComboMoreDetails from "./ComboMoreDetails"

const ComboMore = () => {
    const {t} = useTranslation()
    const {router} = useApp()
    const comboId = router.replace("combo/", "")
    const combo = useGetComboById(comboId)

    return !combo ?
        <EmptyPage back="menu" title={t("promotions")} /> :
        <ComboMoreDetails combo={combo} />
}

export default ComboMore
