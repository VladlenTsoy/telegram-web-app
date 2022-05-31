import React, {useEffect} from "react"
import styles from "./Modal.module.css"
import Portal from "components/portal/Portal"
import {AnimatePresence, motion} from "framer-motion"

interface ModalProps {
    children?: React.ReactNode
    visible: boolean
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({visible, onClose, children}) => {

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "auto"
    }, [visible])

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
                        exit={{opacity: 0, transition: {duration: 0.15}}}
                        transition={{duration: 0.2, delay: 0.15}}
                        style={{pointerEvents: "auto"}}
                        className={styles.overlay}
                        onClick={onCloseHandler}
                    >
                    </motion.div>
                    <div className={styles.container}>
                        {children}
                    </div>
                </>
            }
        </AnimatePresence>
    </Portal>
}

export default Modal
