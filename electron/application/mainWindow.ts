import { ConfigInterface } from "../config";
import { BrowserWindow } from "electron";
import { join } from "path";

export class MainWindow {
    public window: BrowserWindow;
    private static instance: MainWindow;
    private constructor(cfg: ConfigInterface, appPackaged: boolean) {
        const win = new BrowserWindow({
            width: cfg.width,
            height: cfg.height,
            autoHideMenuBar: appPackaged,
            webPreferences: {
                nodeIntegration: true,
                preload: cfg.preloadURL,
            },
        });
        if (appPackaged) {
            // 'build/index.html'
            win.loadURL(`file://${cfg.buildDir}/index.html`);
        } else {
            win.loadURL("http://localhost:3000/index.html");

            win.webContents.openDevTools();

            // Hot Reloading on 'node_modules/.bin/electronPath'
            require("electron-reload")(__dirname, {
                electron: join(
                    cfg.rootDir,
                    "node_modules",
                    ".bin",
                    "electron" + (process.platform === "win32" ? ".cmd" : "")
                ),
                forceHardReset: true,
                hardResetMethod: "exit",
            });
        }
        this.window = win;
    }
    public static getInstance(cfg: ConfigInterface, appPackaged: boolean) {
        if (!MainWindow.instance) {
            MainWindow.instance = new MainWindow(cfg, appPackaged);
        }
        return MainWindow.instance;
    }
}
