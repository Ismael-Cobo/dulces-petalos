import { type ReactElement, cloneElement } from "react";
import styles from "./breadcrumb-link.module.css";

type BreadcrumbLinkProps = {
    render: ReactElement<{ className?: string }>;
};

export const BreadcrumbLink = ({ render }: BreadcrumbLinkProps) => {
    return cloneElement(render, {
        className: [render.props.className, styles.link].filter(Boolean).join(" "),
    });
};
