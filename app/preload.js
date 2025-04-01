const { contextBridge, ipcRenderer } = require("electron/renderer");

const { fileStorage } = require("./const.js");

contextBridge.exposeInMainWorld("fileStorage", {
  clearFile: (key) => ipcRenderer.invoke(fileStorage.clearFile, key),
  retrieveFile: (key) => ipcRenderer.invoke(fileStorage.retrieveFile, key),
  storeFile: (key, data) => ipcRenderer.invoke(fileStorage.storeFile, key, data)
});
