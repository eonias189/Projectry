import { ipcRenderer } from "electron";

export interface ApiFunc<P extends [...any], R> {
    name: string;
    handle(e: Electron.IpcMainInvokeEvent, ...args: P): R;
    invoke: InvokeFunction<P, R>;
}

export type InvokeFunction<P extends [...any], R> = (
    ...args: P
) => Promise<UnPromise<R>>;

type UnPromise<T> = T extends Promise<infer R> ? UnPromise<R> : T;

function getInvokeFunction<P extends [...any], R>(
    name: string
): InvokeFunction<P, R> {
    return async function (...args: P): Promise<UnPromise<R>> {
        return await ipcRenderer.invoke(name, ...args);
    };
}

export function getApiFunc<P extends [...any], R>(
    func: (e: Electron.IpcMainInvokeEvent, ...args: P) => R
): ApiFunc<P, R> {
    let name = func.name.replace(/Handler/, "");
    return {
        name: name,
        handle: func,
        invoke: getInvokeFunction(name),
    };
}
