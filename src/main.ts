import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'node:path'


const rootDir = dirname(__dirname); // entry point is in <root>/dist
const windowDir = join(rootDir, "window")

function createWindow(width: number, height: number): void {
    console.log(__dirname);
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            preload: join(__dirname, 'preload.js')
        }
    });
    win.loadFile(join(windowDir, 'index.html'));
}


const application = {
    name: 'projectry',
}

app.whenReady().then(() => {
    createWindow(800, 600);
    ipcMain.handle('app', () => application)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(800, 600);
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});