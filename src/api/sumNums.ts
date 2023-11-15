import { ipcRenderer } from "electron";
import { someFeature } from "../testCases";

export function sumNumsHandler(event: any, ...nums: number[]): number {
    return someFeature(...nums);
}

export function sumNums(...nums: number[]): Promise<number> {
    return ipcRenderer.invoke("sumNumsHandler", ...nums);
}
