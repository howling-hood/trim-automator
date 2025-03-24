import { app, BrowserWindow } from "electron";

import isDev from "electron-is-dev";

const prodEnv = Boolean(process.env.NODE_ENV === "production");
const isProd = !isDev || prodEnv;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Trim Automator",
    width: 480,
    height: 1080,
    backgroundColor: "#11171d",
    webPreferences: {
      devTools: true,
      nodeIntegration: true
    }
  });

  if (isProd || app.isPackaged) {
    mainWindow.loadFile("ui/index.html");
    mainWindow.webContents.openDevTools();
    return;
  }
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL("http://localhost:3030");
  return;
};
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
