import { FC, ButtonHTMLAttributes } from "react";
import styles from "./btn.module.css";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Btn: FC<BtnProps> = ({ children, className, ...props }: BtnProps) => {
    return (
        <button className={`${styles.btn} ${className ?? ""}`} {...props}>
            {children}
        </button>
    );
};

export default Btn;
