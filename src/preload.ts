import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld('app', () => ipcRenderer.invoke('app') );