const { contextBridge, ipcRenderer } = require("electron/renderer");

const { fileStorage, eventList, processor } = require("./utils/const.js");

contextBridge.exposeInMainWorld("fileStorage", {
  clearFile: (key) => ipcRenderer.invoke(fileStorage.clearFile, key),
  retrieveFile: (key) => ipcRenderer.invoke(fileStorage.retrieveFile, key),
  storeFile: (key, data) => ipcRenderer.invoke(fileStorage.storeFile, key, data)
});

contextBridge.exposeInMainWorld("processor", {
  initiate: (times) => ipcRenderer.invoke(processor.initiate, times)
});

contextBridge.exposeInMainWorld("mainEvents", {
  eventTrigger: (cb) => ipcRenderer.on(eventList.eventTrigger, (_, value) => cb(value))
});
