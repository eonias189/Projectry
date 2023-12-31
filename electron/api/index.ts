import {
    getProjects,
    addProject,
    newProject,
    removeProject,
} from "./recentProjects";
import { ApiFunc, InvokeFunction } from "./apiFunc";

export const apiHandlers = {
    getProjects,
    addProject,
    newProject,
    removeProject,
};

export type apiType = () => {
    [name in keyof typeof apiHandlers]: (typeof apiHandlers)[name]["invoke"];
};

const apiObj = Object.fromEntries(
    Object.values(apiHandlers).map((handler) => [handler.name, handler.invoke])
);
export const api = () => apiObj;
