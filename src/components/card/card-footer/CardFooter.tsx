import { type ReactNode } from "react";
import styles from "./card-footer.module.css";

type CardFooterProps = {
    children: ReactNode;
};

export const CardFooter = ({ children }: CardFooterProps) => {
    return <div className={styles.footer}>{children}</div>;
};
