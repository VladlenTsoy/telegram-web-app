import React, {useEffect, useState} from "react"
import {AnimatePresence, motion, useMotionValue} from "framer-motion"
import styles from "./Message.module.css"
import {useTranslation} from "react-i18next"

interface MessageProps {
    content: string | number
    duration: number
    onDestroy: () => void
}

const Message: React.FC<MessageProps> = ({content, duration, onDestroy}) => {
    const {t} = useTranslation()
    const [visible, setVisible] = useState(true)
    const y = useMotionValue(0)

    // Скрыть окно
    const onCloseHandler = () => setVisible(false)

    // Движение
    const onDragListener = () => {
        if (y.get() >= -10) setVisible(false)
    }

    // Отпускание
    const onDragEndListener = () => {
        if (y.get() >= -10) setVisible(false)
    }

    useEffect(() => {
        // Скрытие сообщения
        const timeout = setTimeout(() => {
            setVisible(false)
        }, duration * 1000)
        // Удаление сообщения
        const destroyTimeout = setTimeout(() => {
            onDestroy()
        }, duration * 1000 + 500)
        return () => {
            clearTimeout(timeout)
            clearTimeout(destroyTimeout)
        }
    }, [duration, onDestroy])

    return (
        <AnimatePresence>
            {visible && <motion.div
                drag={"y"}
                onDrag={onDragListener}
                onDragEnd={onDragEndListener}
                dragElastic={{
                    top: 1,
                    bottom: 0
                }}
                dragConstraints={{
                    top: 0,
                    bottom: 0
                }}
                style={{y}}
                initial={{top: "-100%"}}
                animate={{top: "1rem"}}
                exit={{top: "-100%"}}
                transition={{ease: "easeInOut", duration: .5}}
                className={styles.message}
                onClick={onCloseHandler}
            >
                <div className={styles.icon}>📥</div>
                <div className={styles.text}>
                    <b>{content}</b>{" "}{t("addedCart")}.
                </div>
            </motion.div>}
        </AnimatePresence>
    )
}

export default Message
