import React from "react"
import styles from "./LabelTextToggleBtn.module.css"
import TextToggleBtn from "components/text-toggle-btn/TextToggleBtn"

interface LabelToggleBtnProps {
    label: string
    data: {
        id?: string | number
        title: string
        groupId?: string
        amount?: number
        code?: string
        price?: number
        type?: string
    }[]
    width?: string
    value?: string | number
}

const LabelTextToggleBtn: React.FC<LabelToggleBtnProps> = (
    {
        label,
        data,
        value,
        width
    }
) => {
    return (
        <>
            <div className={styles.label}>
                {label}
            </div>
            <TextToggleBtn data={data} width={width} value={value} />
        </>
    )
}

export default LabelTextToggleBtn
