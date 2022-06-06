import React, {ButtonHTMLAttributes} from "react"
import styles from "./Button.module.css"
import cn from "classnames"

interface ButtonProps {
    type?: ButtonHTMLAttributes<any>["type"]
    icon?: React.ReactNode
    rIcon?: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    size?: "small" | "middle" | "large"
    block?: boolean
    circle?: boolean
    children?: React.ReactNode
    outlined?: boolean
    ghost?: boolean
    danger?: boolean
    id?: string
}

interface ButtonRefProps extends ButtonProps {
    innerRef: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonRefProps> = (
    {
        children,
        type,
        disabled,
        icon,
        rIcon,
        onClick,
        size = "middle",
        block = false,
        circle = false,
        outlined = false,
        ghost = false,
        id,
        danger
    }
) => {
    return (
        <button
            id={id}
            type={type}
            className={cn(styles.button, styles[size], {
                [styles.danger]: danger,
                [styles.block]: block,
                [styles.circle]: circle,
                [styles.outlined]: outlined,
                [styles.ghost]: ghost
            }, "a-snow")}
            disabled={disabled}
            onClick={onClick}
        >
            {!!icon && <span className={styles.icon}>{icon}</span>}
            {children}
            {!!rIcon && <span className={styles.rIcon}>{rIcon}</span>}
        </button>
    )
}
export default React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) =>
        <Button innerRef={ref} {...props} >
            {props.children}
        </Button>
)
