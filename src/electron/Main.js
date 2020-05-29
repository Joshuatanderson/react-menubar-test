const { app, BrowserWindow } = require("electron");
const { menubar } = require("menubar");
const path = require("path");
const url = require("url");
let mainWindow;

const startUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true,
  });

const mb = menubar({
  index: startUrl,
});

mb.on("ready", () => {
  console.log("app is ready");
});

mb.on("closed", function () {
  mainWindow = null;
});

mb.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
// function createWindow() {
//   const startUrl =
//     process.env.ELECTRON_START_URL ||
//     url.format({
//       pathname: path.join(__dirname, "../index.html"),
//       protocol: "file:",
//       slashes: true,
//     });
//   mainWindow = new BrowserWindow({ width: 800, height: 600 });
//   mainWindow.loadURL(startUrl);
//   mainWindow.on("closed", function () {
//     mainWindow = null;
//   });
// }
// app.on("ready", createWindow);
// app.on("window-all-closed", function () {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });
// app.on("activate", function () {
//   if (mainWindow === null) {
//     createWindow();
//   }
// });
