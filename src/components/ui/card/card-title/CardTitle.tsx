import { type ReactNode } from "react";
import styles from "./card-title.module.css";

type CardTitleProps = {
    children: ReactNode;
};

export const CardTitle = ({ children }: CardTitleProps) => {
    return <h2 className={styles.title}>{children}</h2>;
};
