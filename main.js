const { app, BrowserWindow, Menu } = require('electron');

const dev = false;

let isSingleInstance = app.requestSingleInstanceLock();

const menuTemplate = [{
    label : "File",
    submenu : [
        { role: 'quit' }
    ]
}];

const menu = Menu.buildFromTemplate(menuTemplate);

function createWindow() {
    console.log("createWindow");
    let expressWindow = null;
    let appWindow = null;
    
    expressWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width: 1150,
        height: 500,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        }
    });

    if (expressWindow !== null) {
        expressWindow.loadFile('index.html');
        console.log("load url...");
        setTimeout(function() {
            console.log("load url");
            appWindow = new BrowserWindow({
                x: 0,
                y: 0,
                width: 1920,
                height: 1080,
                minWidth: 1920,
                minHeight: 1080,
                fullscreen: true,
                resizable: false,
                movable: false,
                minimizable: false,
                kiosk: true,
                autoHideMenuBar: true,
                frame: false,
                alwaysOnTop: true,
                skipTaskbar: true,
                hasShadow: false,
                simpleFullscreen: false,
                titleBarStyle: "hidden",
                webPreferences: {
                    textAreasAreResizable: false,
                }
            });
            appWindow.loadURL('http://127.0.0.1:5550/');
            if (dev === true) {
                appWindow.webContents.openDevTools();
            }
        }, 4000);
        Menu.setApplicationMenu(menu);
        if (dev === true) {
            expressWindow.webContents.openDevTools();
        }
    }
}

app.whenReady().then(() => {
    console.log('appReady');
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    app.quit();
});
if (!isSingleInstance) {
    app.quit();
}