import { ipcRenderer } from "electron";

export function myFeature(event: any, name: string): string {
    return `Hello, ${name}!`;
}

export function getMyFeature(name: string): Promise<string> {
    return ipcRenderer.invoke("myFeature", name);
}
