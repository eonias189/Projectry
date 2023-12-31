import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { ConfigInterface } from "../config";
import { apiHandlers } from "../api";

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
        if (app.isPackaged) {
            // 'build/index.html'
            win.loadURL(`file://${this.cfg.buildDir}/index.html`);
        } else {
            win.loadURL("http://localhost:3000/index.html");

            win.webContents.openDevTools();

            // Hot Reloading on 'node_modules/.bin/electronPath'
            require("electron-reload")(__dirname, {
                electron: join(
                    this.cfg.rootDir,
                    "node_modules",
                    ".bin",
                    "electron" + (process.platform === "win32" ? ".cmd" : "")
                ),
                forceHardReset: true,
                hardResetMethod: "exit",
            });
        }
    }

    public handleAllApi() {
        for (let handler of Object.values(apiHandlers)) {
            ipcMain.handle(handler.name, handler.handle);
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
