import style from "./header.module.css";

export const Header = () => {
    return (
        <div className={style.header}>
            <img src="/Logo.svg" alt="Logo dulces pétalos" className={style.logo} />
        </div>
    );
};
