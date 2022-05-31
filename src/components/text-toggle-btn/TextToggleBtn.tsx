import React, {useState} from "react"
import styles from "./TextToggleBtn.module.css"
import cn from "classnames"

interface TextToggleBtnProps {
    data: {
        id?: string | number
        title: string | any
        groupId?: string
        amount?: number
        code?: string
        price?: number
        type?: string
    }[]
    value?: string | number
    onPress?: (id: string | number) => void
    m?: string
    width?: string
}

const TextToggleBtn: React.FC<TextToggleBtnProps> = ({value, data, m = "1em 0 2em 0", width}) => {
    const [selected, setSelected] = useState(value)
    const [choose, setChoose] = useState(0)
    
    return (
        <div className={styles.btnWrapper} style={{margin: `${m}`, width: width, gridTemplateColumns: `repeat(3, calc(100%/${data.length}))`}}>
            {
                data.map((i, index) => {
                    return (
                        <div
                            onClick={() => setChoose(index)}
                            className={cn(styles.selection, {[styles.active]: String(i.id) === selected})}
                            key={i.id}
                        >
                            <p className={index === choose ? styles.textActive : styles.text}>
                                {i.title}
                            </p>
                        </div>
                    )
                })
            }
            <div style={{width: `calc((100%/${data.length}) - ${6/data.length}px)`, transform: `translateX(${choose * 100}%)`}}
                 className={styles.chooseBlock}
            />
        </div>
    )
}

export default TextToggleBtn