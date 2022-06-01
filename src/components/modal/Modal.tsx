import React, {useEffect, useState} from "react"
import styles from "./Modal.module.css"
import Portal from "components/portal/Portal"
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
        if (visible && window.scrollY === 0)
            window.scrollTo(0, 1)
        else
            window.scrollTo(0, 0)
        //
        if (visible)
            window.Telegram.WebApp.expand()
    }, [visible])

    useEffect(() => {

    }, [visible])

    const onDragListener = () => {
        if (y.get() >= 50) onClose()
    }

    const onCloseHandler = () => {
        onClose()
    }

    return <Portal visible={visible}>
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
                                onDragEnd={onDragListener}
                                dragElastic={{
                                    top: 0,
                                    bottom: 1
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
