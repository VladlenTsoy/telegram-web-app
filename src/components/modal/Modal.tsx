import React, {useEffect, useState} from "react"
import styles from "./Modal.module.css"
import Portal from "components/portal/Portal"
import {GrClose} from "react-icons/gr"
import {AnimatePresence, motion, useMotionValue} from "framer-motion"

interface ModalProps {
    children?: React.ReactNode
    visible: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({visible, onClose, children}) => {
    const y = useMotionValue(0)
    const [mainButtonIsVisible] = useState(window.Telegram.WebApp.MainButton.isVisible)

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "auto"
        //
        if (mainButtonIsVisible) {
            if (visible)
                window.Telegram.WebApp.MainButton.hide()
            else
                window.Telegram.WebApp.MainButton.show()
        }
        //
        if (window.scrollY === 0) {
            if (visible)
                window.scrollTo(0, 20)
            else
                window.scrollTo(0, 0)
        }
        //
        if (visible)
            window.Telegram.WebApp.expand()
    }, [visible, mainButtonIsVisible])

    const onDragListener = () => {
        if (y.get() >= 25) onClose()
    }

    const onDragEndListener = () => {
        if (y.get() >= 100) onClose()
    }

    const onCloseHandler = () => {
        onClose()
    }

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
                                drag="y"
                                onDrag={onDragListener}
                                onDragEnd={onDragEndListener}
                                dragElastic={{
                                    top: 0,
                                    bottom: .3
                                }}
                                dragConstraints={{
                                    top: 0,
                                    bottom: 0
                                }}
                                style={{y}}
                                initial={{opacity: 0, y: "100%"}}
                                animate={{opacity: 1, y: 0}}
                                transition={{ease: "linear", duration: 0.2}}
                                exit={{opacity: 0, y: "100%"}}
                            >
                                <div className={styles.close} onClick={onClose}>
                                    <GrClose />
                                </div>
                                {children}
                            </motion.div>
                        </div>
                    </div>
                </>
            }
        </AnimatePresence>
    </Portal>
}

export default Modal
