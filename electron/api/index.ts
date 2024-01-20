import { getInvokeFunction, TailAndPromise } from "./invokeFunc";
import { allHandlers } from "./apiHandlers";

export { allHandlers };
export type apiType = () => {
    [name in keyof typeof allHandlers]: TailAndPromise<(typeof allHandlers)[name]>;
};
const apiHandlersArr = Array.from(Object.values(allHandlers));
const apiObj = Object.fromEntries(
    apiHandlersArr.map((handler) => [handler.name, getInvokeFunction(handler.name)])
);
export const api = () => apiObj;
