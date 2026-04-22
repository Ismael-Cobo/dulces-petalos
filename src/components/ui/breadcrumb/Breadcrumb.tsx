import { type ReactElement, type ReactNode, cloneElement } from "react";
import styles from "./breadcrumb.module.css";

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

export const BreadcrumbList = ({ children }: BreadcrumbProps) => {
    return <ol className={styles.list}>{children}</ol>;
};

export const BreadcrumbItem = ({ children }: BreadcrumbProps) => {
    return <li className={styles.item}>{children}</li>;
};

type BreadcrumbLinkProps = {
    render: ReactElement<{ className?: string }>;
};

export const BreadcrumbLink = ({ render }: BreadcrumbLinkProps) => {
    return cloneElement(render, {
        className: [render.props.className, styles.link].filter(Boolean).join(" "),
    });
};

export const BreadcrumbSeparator = () => {
    return (
        <span aria-hidden="true" className={styles.separator}>
            ›
        </span>
    );
};

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
