import { ButtonHTMLAttributes, FC } from "react";
import styles from "./iconBtn.module.css";
import Btn from ".././btn";

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const IconBtn: FC<IconBtnProps> = ({ children, className, ...props }) => {
    return (
        <Btn className={`${styles.btn} ${className ?? ""}`} {...props}>
            {children}
        </Btn>
    );
};

export default IconBtn;
