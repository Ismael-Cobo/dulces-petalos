import { useEffect, useState } from "react";
import type { Flower } from "../models/flower.model";
import { getFlowerList } from "../api/flowers.api";

export const useFlowerPage = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState<Flower[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleSearchChange = (value: string) => {
        setQuery(value);
    };

    const onSearch = () => {
        if (!query.trim()) {
            getData();
            return;
        }

        // TODO: Cuando el filtro se haga en el backend, esta función solo debería llamar a getData({ q: query })
        setData((prev) => prev.filter((flower) => flower.name.toLowerCase().includes(query.toLowerCase())));
    };

    const getData = async ({ q }: { q?: string } = {}) => {
        setIsLoading(true);

        const params = new URLSearchParams();
        if (q) params.append("q", q);

        const { data: flowerData, error: flowerError } = await getFlowerList();
        setData(flowerData ?? []);
        setError(flowerError?.message ?? null);
        setIsLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return { query, data, isLoading, error, handleSearchChange, onSearch };
};
