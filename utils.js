const { BrowserWindow } = require("electron");

module.exports = {
  defaultConfig: (h, w) => {
    return {
      width: w,
      height: h,
      show: false,
      webPreferences: { nodeIntegration: true },
    };
  },
  createWindowInstance: (config, html) => {
    let temp = new BrowserWindow(config);
    temp.loadFile(html);

    temp.on("ready-to-show", () => {
      temp.show();
      temp.focus();
    });

    temp.on("closed", () => {
      temp = null;
    });

    return temp;
  },
};
