import { type ReactNode } from "react";
import styles from "./card-subtitle.module.css";

type CardSubtitleProps = {
    children: ReactNode;
};

export const CardSubtitle = ({ children }: CardSubtitleProps) => {
    return <p className={styles.subtitle}>{children}</p>;
};
