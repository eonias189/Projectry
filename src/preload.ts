import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
    getApp: () => ipcRenderer.invoke("app"),
});
