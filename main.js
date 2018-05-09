const path = require('path');
const glob = require('glob');
const {app, BrowserWindow} = require('electron');

let mainWindow = null;
const debug = /--debug/.test(process.argv[2]);

function initialize () {
    const shouldQuit = makeSingleInstance();
    if (shouldQuit) return app.quit();

    loadDemos();

    function createWindow () {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName(),
        };


        mainWindow = new BrowserWindow(windowOptions);
        mainWindow.loadURL(path.join('file://', __dirname, '/app/index.html'));

        // Launch fullscreen with DevTools open, usage: npm run debug
            mainWindow.webContents.openDevTools();
            mainWindow.maximize();

        global.mainWindow=mainWindow;


        require('./server/main')();

        mainWindow.on('closed', () => {
            mainWindow = null
        })
    }

    app.on('ready', () => {
        createWindow();
        global.app = app;
    });

    app.commandLine.appendSwitch('remote-debugging-port', '9222');

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });

    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow()
        }
    })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
    if (process.mas) return false;

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus()
        }
    })
}

// Require each JS file in the main-process dir
function loadDemos () {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));
    files.forEach((file) => { require(file) });
}

// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        break;
    case '--squirrel-uninstall':
        break;
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit();
        break;
    default:
        initialize()
}