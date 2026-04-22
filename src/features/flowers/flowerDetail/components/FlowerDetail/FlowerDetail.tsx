import type { Flower } from "../../../flowerListPage/models/flower.model";
import { Button } from "@/components/ui/button/Button";
import styles from "./flower-detail.module.css";
import { useWindowSize } from "@/hooks/useWindowSize";

type FlowerDetailProps = {
    flower: Flower;
};

export const FlowerDetail = ({ flower }: FlowerDetailProps) => {
    const { isMobile } = useWindowSize();

    return (
        <article className={styles.container}>
            <div className={styles.imageBlock}>
                <img src={flower.imgUrl} alt={flower.name} className={styles.image} />
            </div>

            <div className={styles.info}>
                <h1 className={styles.name}>{flower.name}</h1>
                <p className={styles.binomialName}>{flower.binomialName}</p>

                <p className={styles.price}>€{flower.price.toFixed(2)}</p>

                <ul className={styles.careTips}>
                    <li>· Regar {flower.wateringsPerWeek} vez por semana</li>
                    <li>· Fertilizar con {flower.fertilizerType}</li>
                </ul>

                <Button variant="primary" fullWidth={isMobile}>
                    Añadir al carrito
                </Button>
            </div>
        </article>
    );
};
