import { Input } from "@/components/ui/input/Input";
import { type FC, type SubmitEvent } from "react";
import styles from "./flowerSearch.module.css";
import { SearchIcon } from "./SearchIcon";

type FlowerSearchProps = {
    onChange: (value: string) => void;
    onSearch: () => void;
    value: string;
};

export const FlowerSearch: FC<FlowerSearchProps> = ({ onChange, onSearch, value }) => {
    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.flowerSearch}>
            <Input
                type="search"
                placeholder="Busca en nuestra tienda"
                value={value}
                prefixIcon={<SearchIcon />}
                onChange={(e) => onChange(e.target.value)}
            />
        </form>
    );
};
