import { type ReactNode } from "react";
import styles from "./card-media.module.css";

type CardMediaProps = {
    src: string;
    alt: string;
    children?: ReactNode;
};

export const CardMedia = ({ src, alt, children }: CardMediaProps) => {
    return (
        <div className={styles.media}>
            <img src={src} alt={alt} className={styles.image} />
            {children}
        </div>
    );
};
