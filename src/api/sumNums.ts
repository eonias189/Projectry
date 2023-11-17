import { ipcRenderer } from "electron";

export function sumNumsHandler(event: any, ...nums: number[]): number {
    return nums.reduce((sum, item) => sum + item);
}

export function sumNums(...nums: number[]): Promise<number> {
    return ipcRenderer.invoke("sumNumsHandler", ...nums);
}
