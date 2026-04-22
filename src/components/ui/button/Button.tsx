import { type ButtonHTMLAttributes } from "react";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost";
    fullWidth?: boolean;
};

export const Button = ({
    variant = "primary",
    fullWidth = false,
    type = "button",
    className,
    children,
    ...props
}: ButtonProps) => {
    const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : "", className ?? ""]
        .filter(Boolean)
        .join(" ");

    return (
        <button type={type} className={classes} {...props}>
            {children}
        </button>
    );
};
