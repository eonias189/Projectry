import { useState, ReactNode } from "react";
import InputField from "../components/UI/inputField";
import { getEntries } from "../utils";

const useEditAble = <T extends Record<string, string>>(
    defaultValues: T
): [
    values: T,
    element: ReactNode,
    isAditind: boolean,
    startEdit: () => void,
    finishEdit: () => void,
    calcelEdit: () => void
] => {
    const [isAditing, setIsAditing] = useState(false);
    const [values, setValues] = useState(defaultValues);
    const [lastValues, setLastValues] = useState(defaultValues);

    const startEdit = () => setIsAditing(true);
    const finishEdit = () => {
        setLastValues(values);
        setIsAditing(false);
    };
    const cancelEditing = () => {
        setValues(lastValues);
        setIsAditing(false);
    };

    const element = (
        <>
            {getEntries(values).map(([key, value], id) =>
                isAditing ? (
                    <InputField
                        onFocus={() => {
                            console.log("focused");
                        }}
                        key={id}
                        onChange={(e) => {
                            e.preventDefault();
                            setValues({ ...values, [key]: e.currentTarget.value });
                        }}
                        value={value}
                    />
                ) : (
                    <p key={id}>{value}</p>
                )
            )}
        </>
    );

    return [values, element, isAditing, startEdit, finishEdit, cancelEditing];
};

export default useEditAble;
