import { Outlet } from "react-router";
import styles from "./mainLayout.module.css";
import { Header } from "../Header/Header";

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
