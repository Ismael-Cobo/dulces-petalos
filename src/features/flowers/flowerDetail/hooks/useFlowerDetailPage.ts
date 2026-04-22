import { useEffect, useState } from "react";
import type { Flower } from "../../flowerListPage/models/flower.model";
import { getFlower } from "../../flowerListPage/api/flowers.api";
import { redirect, useParams } from "react-router";

export const useFlowerDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const [data, setData] = useState<Flower | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getData = async () => {
        if (!id) {
            redirect("/");
            return;
        }

        setIsLoading(true);

        const { data: flowerData, error: flowerError } = await getFlower(id);

        setData(flowerData ?? null);
        setError(flowerError?.message ?? null);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return { data, isLoading, error };
};
