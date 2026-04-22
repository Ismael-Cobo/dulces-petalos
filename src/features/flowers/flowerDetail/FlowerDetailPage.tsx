import { useFlowerDetailPage } from "./hooks/useFlowerDetailPage";
import { FlowerDetail } from "./components/FlowerDetail/FlowerDetail";
import { FlowerBreadcrumb } from "./components/FlowerBreadcrumb/FlowerBreadcrumb";
import styles from "./flower-detail-page.module.css";

export const FlowerDetailPage = () => {
    const { data, isLoading, error } = useFlowerDetailPage();

    if (isLoading) {
        return (
            <section className={styles.page}>
                <p className={styles.status}>Cargando...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles.page}>
                <p className={styles.status}>{error}</p>
            </section>
        );
    }

    if (!data) {
        return (
            <section className={styles.page}>
                <p className={styles.status}>Flor no encontrada.</p>
            </section>
        );
    }

    return (
        <section className={styles.page}>
            <FlowerBreadcrumb name={data.name} />
            <FlowerDetail flower={data} />
        </section>
    );
};
