import { useFlowerPage } from "./hooks/useFlowerPage";
import styles from "./flower-list-page.module.css";
import { FlowerList } from "./components/FlowerList/FlowerList";
import { FlowerSearch } from "./components/FlowerSearch/FlowerSearch";

export const FlowerListPage = () => {
    const { data, error, onSearch, handleSearchChange, isLoading, query } = useFlowerPage();

    return (
        <section className={styles.page}>
            <FlowerSearch onChange={handleSearchChange} onSearch={onSearch} value={query} />
            <FlowerList data={data} isLoading={isLoading} error={error} />
        </section>
    );
};
