import React, {useEffect, useState} from "react"
import styles from "./SwitchButtons.module.css"
import cn from "classnames"

interface SwitchButtonsProps {
    label?: string
    data: {
        id: string
        title: string
        groupId?: string
        amount?: number
        code?: string
        price?: number
        type?: string
    }[]
    onClick: (id: string) => void
    value?: string | number
    margin?: string
}

const SwitchButtons: React.FC<SwitchButtonsProps> = (
    {
        label,
        data,
        value,
        onClick,
        margin
    }
) => {
    const [choose, setChoose] = useState(0)
    const [selected, setSelected] = useState(value)

    const onClickHandler = (id: string, index: number) => {
        onClick && onClick(id)
        setSelected(id)
        setChoose(index)
    }

    useEffect(() => {
        setChoose(0)
        setSelected(value)
    }, [value])

    return (
        <div className={styles.switcher}>
            {label && <div className={styles.label}>{label}</div>}
            <div className={styles.container}
                 style={{
                     gridTemplateColumns: `repeat(3, calc(100%/${data.length}))`,
                     margin
                 }}>
                {
                    data.map((i, index) =>
                        <div
                            onClick={() => onClickHandler(i.id, index)}
                            className={cn(styles.section, {[styles.active]: selected === i.id})}
                            key={i.id}
                        >
                            {i.title}
                        </div>
                    )
                }
                <div
                    style={{
                        width: `calc((100%/${data.length}) - ${6 / data.length}px)`,
                        transform: `translateX(${choose * 100}%)`
                    }}
                    className={styles.chooseBlock}
                />
            </div>
        </div>
    )
}

export default SwitchButtons
