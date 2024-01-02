import { getInvokeFunction, TailAndPromise } from "./invokeFunc";
import * as apiHandlers from "./apiHandlers";

export { apiHandlers };
export type apiType = () => {
    [name in keyof typeof apiHandlers]: TailAndPromise<(typeof apiHandlers)[name]>;
};
const apiHandlersArr = Array.from(Object.values(apiHandlers));
const apiObj = Object.fromEntries(
    apiHandlersArr.map((handler) => [handler.name, getInvokeFunction(handler.name)])
);
export const api = () => apiObj;
