import { type ReactNode } from "react";
import styles from "./breadcrumb-list.module.css";

type BreadcrumbListProps = {
    children: ReactNode;
};

export const BreadcrumbList = ({ children }: BreadcrumbListProps) => {
    return <ol className={styles.list}>{children}</ol>;
};
