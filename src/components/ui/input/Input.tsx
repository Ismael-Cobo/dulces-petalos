import { type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    prefixIcon?: ReactNode;
};

export const Input = ({ prefixIcon, ...props }: InputProps) => {
    return (
        <div className={styles.wrapper}>
            {prefixIcon && <span className={styles.prefixIcon}>{prefixIcon}</span>}
            <input className={styles.input} {...props} />
        </div>
    );
};
