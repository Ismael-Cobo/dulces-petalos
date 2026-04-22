import { type ReactNode } from "react";
import styles from "./breadcrumb-page.module.css";

type BreadcrumbPageProps = {
    children: ReactNode;
};

export const BreadcrumbPage = ({ children }: BreadcrumbPageProps) => {
    return (
        <span aria-current="page" className={styles.page}>
            {children}
        </span>
    );
};
