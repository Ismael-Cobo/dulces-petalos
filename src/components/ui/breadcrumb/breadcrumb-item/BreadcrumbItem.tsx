import { type ReactNode } from "react";
import styles from "./breadcrumb-item.module.css";

type BreadcrumbItemProps = {
    children: ReactNode;
};

export const BreadcrumbItem = ({ children }: BreadcrumbItemProps) => {
    return <li className={styles.item}>{children}</li>;
};
