import styles from "./breadcrumb-separator.module.css";

export const BreadcrumbSeparator = () => {
    return (
        <span aria-hidden="true" className={styles.separator}>
            ›
        </span>
    );
};
