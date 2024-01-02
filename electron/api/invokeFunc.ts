import { ipcRenderer } from "electron";

export type TailAndPromise<T extends (...args: any) => any> = T extends (
    arg0: any,
    ...rest: infer P
) => infer R
    ? (...args: P) => Promise<UnPromise<R>>
    : never;

export type InvokeFunction<P extends [...any], R> = (...args: P) => Promise<UnPromise<R>>;

type UnPromise<T> = T extends Promise<infer R> ? UnPromise<R> : T;

export function getInvokeFunction<P extends [...any], R>(name: string): InvokeFunction<P, R> {
    return async function (...args: P): Promise<UnPromise<R>> {
        return await ipcRenderer.invoke(name, ...args);
    };
}
