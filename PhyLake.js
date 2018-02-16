// Define constants
const Electron = require('electron');
const App = Electron.app;
const {Menu} = require('electron');
const Path = require('path');
const URL = require('url');
const BrowserWindow = Electron.BrowserWindow;

let mainWindow;

function startApp() {
  var screenSize = Electron.screen.getPrimaryDisplay().size;
  var dir = 'file://' + App.getAppPath();
	
  // Create the browser window.
  var mainWindow = new BrowserWindow({frame: true, width: 0.75 * screenSize.width, height: 0.5 * screenSize.height, show: false});
  mainWindow.loadURL(dir+'/dist/index.html');

  // Create splashscreen
  var splash = new BrowserWindow({width: 800, height: 600, frame: false, alwaysOnTop: true});
  splash.loadURL(dir+'/SplashScreen.html');
  
  // Reset menu
  Menu.setApplicationMenu(null);
  
  // Open the DevTools
  mainWindow.webContents.openDevTools();

  // Show main page when ready to show and destroy the splashscreen
  mainWindow.once('ready-to-show', () => {
    splash.destroy();
    mainWindow.show();
  });
  
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