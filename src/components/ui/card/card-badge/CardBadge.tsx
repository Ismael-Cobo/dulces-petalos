import { type ReactNode } from "react";
import styles from "./card-badge.module.css";

type CardBadgeProps = {
    children: ReactNode;
    rounded?: boolean;
};

export const CardBadge = ({ children, rounded = false }: CardBadgeProps) => {
    return (
        <span className={`${styles.badge} ${rounded ? styles.rounded : ""}`}>
            {children}
        </span>
    );
};
