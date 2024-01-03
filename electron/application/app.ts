import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { ConfigInterface } from "../config";
import { apiHandlers } from "../api";
import { MainWindow } from "./mainWindow";

function logFunc(func: (...args: any[]) => any): (...args: any[]) => any {
    return function (...args: any[]): any {
        console.log(func.name, [...arguments]);
        let res = func(...args);
        console.log(res);
        return res;
    };
}

export class Application {
    private cfg: ConfigInterface;
    constructor(cfg: ConfigInterface) {
        this.cfg = cfg;
    }

    private createWindow() {
        const win = MainWindow.getInstance(this.cfg, app.isPackaged);
    }

    private handleAllApi() {
        for (let handler of Object.values(apiHandlers)) {
            ipcMain.handle(handler.name, handler);
        }
    }

    public run() {
        app.whenReady().then(() => {
            // DevTools
            installExtension(REACT_DEVELOPER_TOOLS)
                .then((name) => console.log(`Added Extension:  ${name}`))
                .catch((err) => console.log("An error occurred: ", err));

            this.createWindow();
            this.handleAllApi();

            app.on("activate", () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    this.createWindow();
                }
            });

            app.on("window-all-closed", () => {
                if (process.platform !== "darwin") {
                    app.quit();
                }
            });
        });
    }
}
