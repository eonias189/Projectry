import { app, BrowserWindow, ipcMain } from "electron";
import { ConfigInterface } from "../config";
import { apiHandlers } from "../api";
import { join } from "node:path";

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
        win.loadFile(join(this.cfg.frontendDir, "index.html"));
    }

    public handleAllApi() {
        for (let handler of apiHandlers) {
            ipcMain.handle(handler.name, handler);
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
        });
    }
}
