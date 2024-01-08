import { ReactNode, useState } from "react";
import ModalWindow from "../components/modalWindow";

export const useModalWindow = (children: ReactNode): [show: () => void, modalWindow: ReactNode] => {
    const [isShowing, setIsShowing] = useState(false);
    const show = () => {
        setIsShowing(true);
    };

    const modalWindow = (
        <ModalWindow isShowing={isShowing} close={() => setIsShowing(false)}>
            {children}
        </ModalWindow>
    );

    return [show, modalWindow];
};
