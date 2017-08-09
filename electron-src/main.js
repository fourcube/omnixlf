// ./main.js
const {app, BrowserWindow, Menu} = require('electron')
const {template} = require('./menu');

let win = null;

function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow({width: 1000, height: 800});

  // Specify entry point
  win.loadURL(`file://${__dirname}/index.html`);

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

  const menu = Menu.buildFromTemplate(template(win.webContents));
  Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

