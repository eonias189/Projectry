import { ChangeEvent, FC, HTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./inputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {}

const InputField: FC<InputFieldProps> = ({ className, ...props }) => {
    return <input className={`${styles.input} ${className ?? ""}`} {...props} />;
};

export default InputField;
