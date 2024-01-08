import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    id: string;
    children: ReactNode;
}

const PORTAL_ERROR_MSG =
    "There is no portal container in markup. Please add portal container with proper id attribute.";

interface containerOptinos {
    id: string;
    mountNode?: HTMLElement;
}
export const createContainer = ({ id, mountNode = document.body }: containerOptinos) => {
    console.log("+");
    if (document.getElementById(id)) {
        return;
    }
    const portalContainer = document.createElement("div");
    portalContainer.setAttribute("id", id);
    mountNode.appendChild(portalContainer);
};

const Portal: FC<PortalProps> = ({ id, children }) => {
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) {
                throw new Error(PORTAL_ERROR_MSG);
            }

            setContainer(portalContainer);
        }
    }, [id]);
    return container ? createPortal(children, container) : null;
};

export default Portal;
