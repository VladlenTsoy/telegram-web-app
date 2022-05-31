import React from "react"
import styles from "./LabelTextToggleBtn.module.css"
import TextToggleBtn from "components/text-toggle-btn/TextToggleBtn"

interface LabelToggleBtnProps {
    label: string
    additionalBlock?: any
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

const LabelTextToggleBtn: React.FC<LabelToggleBtnProps> = ({label, additionalBlock, data, value, width}) => {
    return (
        <div>
            <div className={styles.additionalBlock}>
                <p className={styles.label}>
                    {label}
                </p>
            </div>
            <TextToggleBtn data={data} width={width} value={value} />
        </div>
    )
}

export default LabelTextToggleBtn
