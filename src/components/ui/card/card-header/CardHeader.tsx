import { type ReactNode } from "react";
import styles from "./card-header.module.css";

type CardHeaderProps = {
    children: ReactNode;
};

export const CardHeader = ({ children }: CardHeaderProps) => {
    return <div className={styles.header}>{children}</div>;
};
