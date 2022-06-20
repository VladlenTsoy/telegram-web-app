import React, {ButtonHTMLAttributes} from "react"
import styles from "./Button.module.css"
import cn from "classnames"

interface ButtonProps {
    htmlType?: ButtonHTMLAttributes<any>["type"]
    type?: "primary" | "secondary" | "danger"
    className?: string
    disabled?: boolean
    children?: React.ReactNode
    onClick?: (e: React.FormEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = (
    {
        type = "primary",
        className,
        children,
        disabled,
        onClick,
        htmlType
    }
) => {
    return (
        <button
            type={htmlType}
            className={cn(styles.button, styles[type], className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
