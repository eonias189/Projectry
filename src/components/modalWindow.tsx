import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./modalWindow.module.css";
import { createPortal } from "react-dom";
import Portal, { createContainer } from "./portal";
import IconBtn from "./UI/iconBtn";
import { cancelIcon } from "./UI/icons";

interface ModalWindowProps {
    isShowing: boolean;
    children: ReactNode;
    close: () => void;
}

const modalId = "modal-window-id";

const ModalWindow: FC<ModalWindowProps> = ({ isShowing, children, close }) => {
    useEffect(() => {
        createContainer({ id: modalId });
    }, []);

    return isShowing ? (
        <Portal id={modalId}>
            <div className={styles.overlay}></div>
            <div className={styles.modalWindow}>
                <div className={styles.content}>
                    <IconBtn onClick={() => close()} className={styles.closeBtn}>
                        {cancelIcon}
                    </IconBtn>
                    {children}
                </div>
            </div>
        </Portal>
    ) : (
        <></>
    );
};

export default ModalWindow;
