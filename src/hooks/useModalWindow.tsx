import { ReactNode, useState } from "react";
import ModalWindow from "../components/modalWindow";

export const useModalWindow = (): [
    show: () => void,
    close: () => void,
    getWindow: (children: ReactNode) => ReactNode
] => {
    const [isShowing, setIsShowing] = useState(false);
    const show = () => setIsShowing(true);
    const close = () => setIsShowing(false);
    const getWindow = (children: ReactNode): ReactNode => (
        <ModalWindow close={close} isShowing={isShowing}>
            {children}
        </ModalWindow>
    );
    return [show, close, getWindow];
};
