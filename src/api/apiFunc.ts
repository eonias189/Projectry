import { ipcRenderer } from "electron";

export interface ApiFunc<P extends [...any], R> {
    name: string;
    handle(e: Electron.IpcMainInvokeEvent, ...args: P): R;
    invoke(...args: P): Promise<R>;
}

export type InvokeFunction<P extends [...any], R> = (...args: P) => Promise<R>;

function getInvokeFunction<P extends [...any], R>(
    name: string
): InvokeFunction<P, R> {
    return function (...args: P): Promise<R> {
        return ipcRenderer.invoke(name, ...args);
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
