import { FC, ReactNode } from "react";
import styles from "./cardsList.module.css";

export enum FlexDirection {
    row = "row",
    column = "column",
}

interface CardsListProps {
    children?: ReactNode[];
    emptyCase?: ReactNode;
    direction: FlexDirection;
    className?: string;
}

const CardsList: FC<CardsListProps> = ({ children, emptyCase, direction, className }) => {
    return (
        <div className={`${styles.list} ${styles[direction]} ${className ?? ""}`}>
            {children
                ? children.length
                    ? children.map((child, id) => (
                          <div key={id} className={styles.item}>
                              {child}
                          </div>
                      ))
                    : emptyCase
                : emptyCase}
        </div>
    );
};

export default CardsList;
