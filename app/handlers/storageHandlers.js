import { ipcMain } from "electron";

import { fileStorage } from "../utils/const.js";
import { clearFile, retrieveFile, storeFile } from "../utils/storage.js";

const setupStorageHandlers = () => {
  ipcMain.handle(fileStorage.clearFile, (_, key) => clearFile(key));
  ipcMain.handle(fileStorage.retrieveFile, (_, key) => retrieveFile(key));
  ipcMain.handle(fileStorage.storeFile, (_, key, data) => storeFile(key, data));
};

export default setupStorageHandlers;
