import React, {useEffect, useRef} from "react"
import styles from "./Modal.module.css"
import Portal from "components/portal/Portal"
import {AnimatePresence, motion, useMotionValue, useTransform} from "framer-motion"

interface ModalProps {
    children?: React.ReactNode
    title?: string
    visible: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = (
    {
        title,
        visible,
        onClose,
        children
    }
) => {
    const ref = useRef<HTMLDivElement>(null)
    const cardY = useMotionValue(0)
    const y = useMotionValue(0)
    const scale = useTransform(y, [0, 20], [1, 0])

    useEffect(() => {
        // Нет возможности скролить body
        document.body.style.overflow = visible ? "hidden" : "auto"
        // Отступ 5px при открытии окна
        if (window.scrollY === 0 && visible)
            window.scrollTo(0, 5)
        // Если вывод окна, то открыть на всю высоту
        if (visible)
            window.Telegram.WebApp.expand()
    }, [visible])

    // Закрыть
    const onCloseHandler = () => {
        onClose()
    }

    // useEffect(() => {
    //     ref.current && console.log(ref.current)
    // }, [ref])

    return <Portal visible={visible} destroyOnClose>
        <AnimatePresence>
            {visible &&
                <>
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, transition: {duration: 0.075}}}
                        transition={{duration: 0.1, delay: 0.075}}
                        style={{pointerEvents: "auto"}}
                        className={styles.overlay}
                        onClick={onCloseHandler}
                    >
                    </motion.div>
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <motion.div
                                className={styles.card}
                                initial={{opacity: 0, y: "100%"}}
                                animate={{opacity: 1, y: 0}}
                                transition={{ease: "linear", duration: 0.2}}
                                exit={{opacity: 0, y: "100%"}}
                                style={{y: cardY}}
                            >
                                <motion.div
                                    drag={"y"}
                                    onDrag={(e, pan) => {
                                        pan.offset.y > 0 && cardY.set(pan.offset.y)
                                    }}
                                    onDragEnd={(e, pan) => {
                                        if (pan.offset.y >= 100) onClose()
                                        else cardY.set(0)
                                    }}
                                    dragElastic={{
                                        top: 0,
                                        bottom: 1
                                    }}
                                    dragConstraints={{
                                        top: 0,
                                        bottom: 0
                                    }}
                                    className={styles.dragClose}
                                    style={{y, scale}}
                                >
                                    <span className={styles.dragBorder} />
                                </motion.div>
                                <div className={styles.scroll} ref={ref}>
                                    {!!title && <div className={styles.title}>{title}</div>}
                                    {children}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </>
            }
        </AnimatePresence>
    </Portal>
}

export default Modal
