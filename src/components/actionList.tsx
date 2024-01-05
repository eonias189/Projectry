import { FC, ReactNode, useState } from "react";
import styles from "./actionList.module.css";
import CardsList, { FlexDirection } from "./cardsList";

interface ActionListProps {
    primaryElement: ReactNode;
    actions: ReactNode[];
    className?: string;
}

const ActionList: FC<ActionListProps> = ({ primaryElement, actions, className }) => {
    const [showActions, setShowActions] = useState(false);
    return (
        <>
            <div
                className={`${styles.actionList} ${!showActions ? styles.collapsed : ""} ${
                    className ?? ""
                }`}
                onClick={() => setShowActions(false)}
            >
                {actions.map((action) => action)}
            </div>
            <div
                className={`${styles.primary} ${showActions ? styles.noDisplay : ""}`}
                onClick={() => setShowActions(true)}
            >
                {primaryElement}
            </div>
            <div
                className={`${styles.background} ${!showActions ? styles.noDisplay : ""}`}
                onClick={() => setShowActions(false)}
            ></div>
        </>
    );
};

export default ActionList;
