import React from "react"
import styles from "./AddedModifiers.module.css"

interface AddedModifiersProps {
    data: string[]
}

const AddedModifiers: React.FC<AddedModifiersProps> = ({data}) => {
    return (
        <div className={styles.mainWrapper}>
            {
                data.map((i) => {
                    return <p key={`${i}`}>{i}</p>
                })
            }
        </div>
    )
}

export default AddedModifiers