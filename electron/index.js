const { app, BrowserWindow } = require('electron');
const path = require('path');
var express = require("express");
require('dotenv').config()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  // console.log("###############")
  // console.log(path.join(__dirname, '..', 'dist/index.html'))
  // mainWindow.loadFile(path.join(__dirname, '..', 'dist/index.html'));
  // mainWindow.loadURL("http://localhost:3123");
  // if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL("http://127.0.0.1:3000");
  // } else {
  // mainWindow.loadURL("http://127.0.0.1:3123");
  // }

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development')
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);
app.on('ready', function () {

  var expressApp = express();

  expressApp.use(express.static(path.join(__dirname, '..', 'next_out')))

  expressApp.listen(3123, function () {
    console.log("Servidor estático escutando na porta 3123!");
  })

  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
