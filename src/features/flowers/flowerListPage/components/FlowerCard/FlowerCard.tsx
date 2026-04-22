import { Card } from "@/components/card/Card";
import type { Flower } from "../../models/flower.model";

type FlowerCardProps = {
    flower: Flower;
};

export const FlowerCard = ({ flower }: FlowerCardProps) => {
    return (
        <Card to={`/flowers/${flower.id}`}>
            <Card.Header>
                <Card.Title>{flower.name}</Card.Title>
                <Card.Subtitle>{flower.binomialName}</Card.Subtitle>
            </Card.Header>
            <Card.Media src={flower.imgUrl} alt={flower.name}>
                <Card.Footer>
                    <Card.Badge>€{flower.price.toFixed(2)}</Card.Badge>
                    <Card.Badge rounded>↗</Card.Badge>
                </Card.Footer>
            </Card.Media>
        </Card>
    );
};
