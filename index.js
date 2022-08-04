const { app, BrowserWindow } = require("electron");
const UTILS = require("./utils");

let mainWindow;
let secondWindow;

const createWindow = () => {
  mainWindow = UTILS.createWindowInstance(
    UTILS.defaultConfig(600, 800),
    "./src/static/index.html"
  );
  // secondWindow = UTILS.createWindowInstance(
  //   { ...UTILS.defaultConfig(300, 400), parent: mainWindow },
  //   "secondary.html"
  // );
  const mainWC = mainWindow.webContents;
  mainWC.on("did-finish-loaded", () => {
    console.log("hola");
  });

  mainWC.on("before-input-event", (e, input) => {
    console.log(input.key, input.type);
  });

  mainWC.on("context-menu", (e, params) => {
    let selectedText = params.selectionText;
    mainWC.executeJavaScript(`console.log("${selectedText}")`);
  });
};

// win.once("ready-to-ahow", () => { app })

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// app.on("before-quit", () => {
//   console.log("antes de cerrar");
// });

// app.on("browser-window-focus", () => {
//   console.log("estas en mi app bb");
// });
// app.on("browser-window-blur", () => {
//   console.log("estas en mi app bb");
// });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("close", () => {
//   console.log("Closed");
// });
