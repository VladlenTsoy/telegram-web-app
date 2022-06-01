import React, {useEffect} from "react"
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

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "auto"
        if (window.Telegram.WebApp.MainButton.isVisible) {
            if (visible)
                window.Telegram.WebApp.MainButton.hide()
            else
                window.Telegram.WebApp.MainButton.show()
        }
    }, [visible])


    const onDragListener = (e: any) => {
        if (y.get() >= 100) onClose()
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
