'use strict';

const path = require('path');
const { app, BrowserWindow } = require('electron');

// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  app: require(`${__dirname}/node_modules/electron`)
});

function main() {

  // create new window
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 800,
    height: 600,
  })

  // load app/index.html as the window content
  mainWindow.loadFile(path.join('app', 'index.html'));

  // Wait until the window is ready
  mainWindow.webContents.on('dom-ready', () => {
    // Enable dark theme for DevTools
    mainWindow.webContents.openDevTools({
      theme: 'dark'
    });
  });
}

app.on('ready', main);

app.on('window-all-closed', function () {
  app.quit();
});