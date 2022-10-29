const {app, BrowserWindow, ipcMain, shell} = require('electron');
const { getWindowSettings, savePosition} = require('./settings')

const path = require('path');
const url = require('url');
const ipc = ipcMain

let win;

function createWindow(){

  const winpos = getWindowSettings()
  
  win = new BrowserWindow({
    // width: 1200,
    // height: 800,
    width: 600,
    height: 800,
    x: winpos[0],
    y: winpos[1],
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    icon: __dirname+'/src/img/icon.png',
    frame: false,
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
      devTools: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });


  win.on('moved', () => savePosition(win.getPosition()))


  win.loadFile('index.html') // Загрузить файл при открытии
  win.setBackgroundColor('#261935') // Цвет фона окна приложения


  // Открытие линков _blank в браузере по умолчанию
  win.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });


  /////// КНОПКИ ТАЙТЛ бАРА
  //// МИНИМАЙЗ
  ipc.on('minimizeApp', ()=> {
    win.minimize()
  })

  //// ЗАКРЫТЬ
  ipc.on('closeApp', ()=> {
    win.close()
  })
  /////////////////////////


  //// ЗАКРЫТИЕ ОКОН (НЕ ОТНОСИТСЯ К КНОПКАМ)
  win.on('closed', () => {
    win = null;
  })


  //// SPLASH СКРИН
  var splash = new BrowserWindow({ 
    width: 500,
    height: 300,
    maximizable: false,
    fullscreen: false,
    fullscreenable: false,
    resizable: false,
    transparent: true, 
    frame: false, 
    alwaysOnTop: true,
    icon: __dirname+'/src/img/icon.png',
    webPreferences: {
      devTools: false
    }
  });

  splash.loadFile('splash.html');
  splash.center();
  win.once('ready-to-show', () => {
    splash.close();
    win.center(); // Центрирует окно в любом случаи!
    win.show();
  });
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Если все окна закрыты - закрыть приложение, малое отношение к виндовс, но имеет к маку
app.on('window-all-closed', () =>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
});
