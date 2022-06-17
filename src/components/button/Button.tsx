import React from "react"
import styles from "./Button.module.css"
import cn from "classnames"

interface ButtonProps {
    type?: "primary" | "secondary"
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
        onClick
    }
) => {
    return (
        <button
            className={cn(styles.button, styles[type], className)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
