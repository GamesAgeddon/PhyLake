// Define constants
const Electron = require('electron');
const App = Electron.app;
const { Menu } = require('electron');
const Path = require('path');
const URL = require('url');
const BrowserWindow = Electron.BrowserWindow;

let mainWindow;

function startApp() {
  var screenSize = Electron.screen.getPrimaryDisplay().size;

  // Create splashscreen
  var splash = new BrowserWindow({
    width: 1116,
    height: 540,
    frame: false,
    alwaysOnTop: true,
    icon: Path.join(__dirname, 'dist/assets/icons/png/64x64.png'),
    transparent: true,
    vibrancy: 'ultra-dark',
  });

  splash.loadURL(URL.format({
    pathname: Path.join(__dirname, 'SplashScreen.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Create the main window.
  var mainWindow = new BrowserWindow({
    frame: true,
    width: 0.75 * screenSize.width,
    height: 0.55 * screenSize.height,
    minWidth: 600,
    minHeight: 300,
    show: false,
    icon: Path.join(__dirname, 'dist/assets/icons/png/64x64.png'),
    vibrancy: 'ultra-dark',
  });

  mainWindow.loadURL(URL.format({
    pathname: Path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Reset menu
  Menu.setApplicationMenu(null);

  // Open the DevTools
  //splash.webContents.openDevTools();
  mainWindow.webContents.openDevTools();

  // Show main page when ready to show and destroy the splashscreen
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
    splash = null;
  });

  // Remove main window
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

App.on('ready', startApp);

App.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    App.quit();
  }
});

App.on('activate', function () {
  if (mainWindow === null) {
    startApp();
  }
});