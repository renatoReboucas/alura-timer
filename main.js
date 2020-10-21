const { app, BrowserWindow, ipcMain } = require('electron');
const { ipcRenderer } = require('electron/renderer');
const data = require('./data')

app.on('ready', () => {
  let mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // mainWindow.webContents.openDevTools()
})

app.on('window-all-closed', () => {
  app.quit()
})

// escuta o evento disparado do app.js
let sobreWindow = null
ipcMain.on("abrir-janela-sobre", () => {
  if(sobreWindow === null){
    sobreWindow = new BrowserWindow({
      width: 300,
      height: 250,
      alwaysOnTop: true,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    // evita de deletar a variavel sobreWindow
    sobreWindow.on("closed", () => {
      sobreWindow = null;
    });
  }
   
  sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
  // sobreWindow.webContents.openDevTools();
});

ipcMain.on("fechar-janela-sobre", () => {
  sobreWindow.close()
});

ipcMain.on("curso-parado", (event, curso, tempoEstudado) => {
  // console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
  data.salvaDados(curso,tempoEstudado)
});