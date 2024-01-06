import { FC, ReactElement, ReactNode, useState } from "react";
import styles from "./dropDown.module.css";
import IconBtn from "./UI/iconBtn";

interface DropDownProps {
    children?: ReactNode;
    primaryElement?: ReactNode;
    className?: string;
}

const DropDown: FC<DropDownProps> = ({ children, primaryElement, className }) => {
    const [expanded, setExpanded] = useState(false);

    const collapsedIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
    );
    const expandedIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
        </svg>
    );

    return (
        <div className={className}>
            <div className={`${styles.dropDown} ${expanded ? styles.expanded : ""}`}>
                <span
                    className={`${styles.actionBtn} ${primaryElement ? "" : styles.noPrimary}`}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? expandedIcon : collapsedIcon}
                </span>
                <div className={styles.primaryElement}>{primaryElement ?? <p></p>}</div>
                <div className={`${styles.items} ${primaryElement ? "" : styles.noPrimary}`}>
                    {children ?? ""}
                </div>
            </div>
        </div>
    );
};

export default DropDown;
