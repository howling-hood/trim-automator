import { ipcMain } from "electron/main";

import { fileStorage } from "../const.js";

import { clearFile, retrieveFile, storeFile } from "./storage.js";

const setupStorageHandlers = () => {
  ipcMain.handle(fileStorage.clearFile, (_, key) => clearFile(key));
  ipcMain.handle(fileStorage.retrieveFile, (_, key) => retrieveFile(key));
  ipcMain.handle(fileStorage.storeFile, (_, key, data) => storeFile(key, data));
};

const setupHandlers = () => {
  setupStorageHandlers();
};

export default setupHandlers;
