import React, {useEffect} from "react"
import styles from "./Modal.module.css"
import Portal from "components/portal/Portal"
import {AnimatePresence, motion, useMotionValue} from "framer-motion"
import Sheet from "react-modal-sheet"

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
    const y = useMotionValue(0)

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

    // Отпускание
    const onDragEndListener = () => {
        if (y.get() >= 100) onClose()
    }

    // Закрыть
    const onCloseHandler = () => {
        onClose()
    }

    return <Sheet isOpen={visible} onClose={onClose}>
        {/*// @ts-ignore*/}
        <Sheet.Container>
            {/*// @ts-ignore*/}
            <Sheet.Header />
            {/*// @ts-ignore*/}
            <Sheet.Content>{children}</Sheet.Content>
        </Sheet.Container>
        {/*// @ts-ignore*/}
        <Sheet.Backdrop />
    </Sheet>

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
                                drag={"y"}
                                onDrag={(e, pan) => {
                                    console.log(e, pan)
                                    return null
                                }}
                                onDragEnd={onDragEndListener}
                                initial={{opacity: 0, y: "100%"}}
                                animate={{opacity: 1, y: 0}}
                                transition={{ease: "linear", duration: 0.2}}
                                exit={{opacity: 0, y: "100%"}}
                                style={{y}}
                                dragElastic={{
                                    top: 0,
                                    bottom: 1
                                }}
                                dragConstraints={{
                                    top: 0,
                                    bottom: 0
                                }}
                            >
                                <div className={styles.dragClose}>
                                    <span className={styles.dragBorder} />
                                </div>
                                <div className={styles.scroll}>
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
