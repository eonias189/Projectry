import { app, BrowserWindow, ipcMain } from "electron";
import { join, dirname } from "node:path";
import { apiHandlers } from "./api";

const rootDir = dirname(__dirname); // entry point is in <root>/dist/
const frontendDir = join(rootDir, "frontend");

function createWindow(width: number, height: number): void {
    console.log(__dirname);
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            preload: join(__dirname, "preload.js"),
        },
    });
    win.loadFile(join(frontendDir, "index.html"));
}

function handleAllApi(): void {
    for (let handler of apiHandlers) {
        ipcMain.handle(handler.name, handler);
    }
}

app.whenReady().then(() => {
    createWindow(800, 600);
    handleAllApi();
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(800, 600);
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
