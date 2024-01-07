import { FC, ReactElement, ReactNode, useState } from "react";
import styles from "./dropDown.module.css";
import { expandedIcon, collapsedIcon } from "./UI/icons";

interface DropDownProps {
    children?: ReactNode;
    primaryElement?: ReactNode;
    className?: string;
    expandElement?: ReactNode;
}

const DropDown: FC<DropDownProps> = ({ children, primaryElement, className, expandElement }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={className}>
            <div className={`${styles.dropDown} ${expanded ? styles.expanded : ""}`}>
                <span
                    className={`${styles.actionBtn} ${expanded ? styles.expanded : ""} ${
                        primaryElement ? "" : styles.noPrimary
                    }`}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expandElement ?? collapsedIcon}
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
