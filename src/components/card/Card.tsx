import { type ReactNode } from "react";
import { Link } from "react-router";
import { CardHeader } from "./card-header/CardHeader";
import { CardTitle } from "./card-title/CardTitle";
import { CardSubtitle } from "./card-subtitle/CardSubtitle";
import { CardMedia } from "./card-media/CardMedia";
import { CardFooter } from "./card-footer/CardFooter";
import { CardBadge } from "./card-badge/CardBadge";
import styles from "./card.module.css";

// ─── Root ────────────────────────────────────────────────────────────────────

type CardProps = {
    children: ReactNode;
    to?: string;
};

export const Card = ({ children, to }: CardProps) => {
    if (to) {
        return (
            <Link to={to} className={styles.card}>
                {children}
            </Link>
        );
    }

    return <div className={styles.card}>{children}</div>;
};

// ─── Compound assignment ──────────────────────────────────────────────────────

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Media = CardMedia;
Card.Footer = CardFooter;
Card.Badge = CardBadge;
