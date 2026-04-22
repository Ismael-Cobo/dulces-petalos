import { Header } from "./components/Header/Header";
import { Outlet } from "react-router";
import styles from "./mainLayout.module.css";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <main className={styles.mainPage}>
                <Outlet />
            </main>
        </>
    );
};
