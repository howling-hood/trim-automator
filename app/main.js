import { app, BrowserWindow } from "electron";
import path from "node:path";
import isDev from "electron-is-dev";
import setupHandlers from "./handlers.js";

const prodEnv = Boolean(process.env.NODE_ENV === "production");
const isProd = !isDev || prodEnv || app.isPackaged;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: "Trim Automator",
    width: 480,
    height: 720,
    backgroundColor: "#FFFFFF",
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: path.join(path.resolve(), "preload.js"),
      contextIsolation: true
    }
  });

  if (isProd) {
    mainWindow.loadFile("ui/index.html");
    return;
  }
  mainWindow.webContents.openDevTools();
  mainWindow.loadURL("http://localhost:3030");
  return;
};

app.whenReady().then(() => {
  setupHandlers();

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
