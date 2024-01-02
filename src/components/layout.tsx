import React, { FC } from "react";
import styles from "./layout.module.css";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <header className={styles.header}></header>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Layout;
