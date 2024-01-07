import { ChangeEvent, FC, HTMLAttributes } from "react";
import styles from "./inputField.module.css";

interface InputFieldProps extends HTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({ className, ...props }) => {
    return <input className={`${styles.input} ${className ?? ""}`} {...props} />;
};

export default InputField;
