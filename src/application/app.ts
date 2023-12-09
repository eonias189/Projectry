import { app, BrowserWindow, ipcMain } from "electron";
import { ConfigInterface } from "../config";
import { apiHandlers } from "../api";
import { join } from "node:path";

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

    public createWindow() {
        const win = new BrowserWindow({
            width: this.cfg.width,
            height: this.cfg.height,
            webPreferences: {
                nodeIntegration: true,
                preload: this.cfg.preloadURL,
            },
        });
        win.webContents.openDevTools();
        win.loadFile(join(this.cfg.publicDir, "index.html"));
    }

    public handleAllApi() {
        for (let handler of apiHandlers) {
            ipcMain.handle(handler.name, logFunc(handler));
        }
    }

    public run() {
        app.whenReady().then(() => {
            this.createWindow();
            this.handleAllApi();
            app.on("activate", () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    this.createWindow();
                }
            });
        });

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
            app.quit();
        });
    }
}
