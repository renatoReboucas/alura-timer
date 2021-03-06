const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const { ipcRenderer } = require('electron/renderer');
const data = require('./data');
const {
  geraTrayTemplate,
  adicionaCursoNoTray,
  geraMenuPrincipalTemplate,
} = require("./tamplate");

let tray = null
let mainWindow = null
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  //icon 16x16
  tray = new Tray(__dirname + "/app/img/icon-tray.png");
  let template = geraTrayTemplate(mainWindow);
  //gera menu tray
  let trayMenu = Menu.buildFromTemplate(template);
  //seta itens do menu
  tray.setContextMenu(trayMenu);

  //envia os dados pro restante do programa
  // mainWindow.send('curso-trocado',)

  globalShortcut.register("CmdOrCtrl+Shift+S", () =>{
    mainWindow.send('atalho-iniciar-parar')
  })

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // mainWindow.webContents.openDevTools()

  let templateMenu = geraMenuPrincipalTemplate(app)
  let menuPrincipal = Menu.buildFromTemplate(templateMenu)
  Menu.setApplicationMenu(menuPrincipal)
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

ipcMain.on("curso-adicionado", (event, novoCurso) => {
  let novoTemplate = adicionaCursoNoTray(novoCurso, mainWindow);
  //gera menu tray
  let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
  //seta itens do menu
  tray.setContextMenu(novoTrayMenu);
});