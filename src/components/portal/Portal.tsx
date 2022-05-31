import React, {useEffect, useRef} from "react"
import ReactDOM from "react-dom"

interface PortalProps {
    children?: React.ReactNode
    visible: boolean
    destroyOnClose?: boolean
    getContainer?: string
}

const Portal: React.FC<PortalProps> = (
    {
        children,
        visible,
        getContainer = "body",
        destroyOnClose = false
    }
) => {
    const containerRef = useRef<HTMLElement>()
    const initRef = useRef<boolean>(false)

    if (visible && !initRef.current) {
        const modal = document.createElement("div")
        if (getContainer === "body") document.body.appendChild(modal)
        else {
            const container = document.querySelector(getContainer)
            if (container) container.appendChild(modal)
        }

        initRef.current = true
        containerRef.current = modal
    }

    useEffect(() => {
        if (!visible && destroyOnClose) {
            const timeout = setTimeout(() => {
                initRef.current = false
                containerRef.current?.parentNode?.removeChild(containerRef.current)
            }, 300)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [destroyOnClose, visible])

    useEffect(() => {
        return () => {
            containerRef.current?.parentNode?.removeChild(containerRef.current)
        }
    }, [])

    return containerRef.current ? ReactDOM.createPortal(children, containerRef.current) : null
}

export default Portal
