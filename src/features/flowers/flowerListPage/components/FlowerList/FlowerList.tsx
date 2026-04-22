import { type Flower } from "../../../models/flower.model";
import { FlowerCard } from "../FlowerCard/FlowerCard";
import styles from "./flower-list.module.css";

type FlowerListProps = {
    data: Flower[];
    isLoading: boolean;
    error: string | null;
};

export const FlowerList = ({ data, isLoading, error }: FlowerListProps) => {
    if (isLoading) return <p className={styles.feedback}>Cargando...</p>;
    if (error) return <p className={styles.feedback}>{error}</p>;
    if (!data.length) return <p className={styles.feedback}>No se encontraron resultados.</p>;

    return (
        <ul className={styles.grid}>
            {data.map((flower) => (
                <li key={flower.id}>
                    <FlowerCard flower={flower} />
                </li>
            ))}
        </ul>
    );
};
