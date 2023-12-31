import React, { ButtonHTMLAttributes } from "react";
import "./StyledButton.css";

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    ...props
}: StyledButtonProps) => {
    return (
        <button className={"btn"} {...props}>
            {children}
        </button>
    );
};

export default StyledButton;
