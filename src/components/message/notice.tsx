import * as React from "react"
import {createRoot} from "react-dom/client"
import Message from "./Message"

interface ParamsProps {
    content: string | number
    key?: string
    duration?: number
}

type MessageProps = (params: ParamsProps) => void

export const message: MessageProps = ({content, duration = 3}) => {
    const modal = document.createElement("div")
    const root = createRoot(modal)

    const destroy = () => {
        root.unmount()
        document.body.removeChild(modal)
    }

    setTimeout(() => {
        document.body.appendChild(modal)
        root.render(<Message content={content} onDestroy={destroy} duration={duration} />)
    })
}
