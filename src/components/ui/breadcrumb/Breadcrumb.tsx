import { type ReactNode } from "react";
import styles from "./breadcrumb.module.css";

export { BreadcrumbList } from "./breadcrumb-list/BreadcrumbList";
export { BreadcrumbItem } from "./breadcrumb-item/BreadcrumbItem";
export { BreadcrumbLink } from "./breadcrumb-link/BreadcrumbLink";
export { BreadcrumbSeparator } from "./breadcrumb-separator/BreadcrumbSeparator";
export { BreadcrumbPage } from "./breadcrumb-page/BreadcrumbPage";

type BreadcrumbProps = {
    children: ReactNode;
};

export const Breadcrumb = ({ children }: BreadcrumbProps) => {
    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
            {children}
        </nav>
    );
};
