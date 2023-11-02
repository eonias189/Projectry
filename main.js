const { app, BrowserWindow } = require('electron');
const path = require('node:path');

class Window {
    constructor(name, withPreload) {
        this.name = name;
        this.withPreload = withPreload;
    }
}

const windows = [
    new Window('start_window', true),
    new Window('another_window', false),
];

function createWindow(dirPath, withPreload=false) {
    const options = {
        width: 800,
        height: 600,
    };
    if (withPreload) {
        options.webPreferences = {
            preload: path.join(__dirname, dirPath, 'preload.js')
        };
    }
    const win = new BrowserWindow(options);

    win.loadFile(path.join(dirPath, 'index.html'));
}

function createAllWindows() {
    windows.forEach(window => {
        const dirPath = path.join('windows', window.name);
        createWindow(dirPath, window.withPreload);
    });
}

app.whenReady().then(() => {
    createAllWindows();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createAllWindows();
        }
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});