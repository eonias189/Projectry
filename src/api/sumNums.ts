import { ipcRenderer } from "electron";

export function sumNums(event: any, ...nums: number[]): number {
    return nums.reduce((sum: number, curNumber: number) => sum + curNumber);
}

export function getSumNums(...nums: number[]): Promise<number> {
    return ipcRenderer.invoke("sumNums", ...nums);
}
