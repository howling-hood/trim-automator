const { contextBridge, ipcRenderer } = require("electron/renderer");

const { fileStorage, eventList, processor, mouse } = require("./utils/const.js");

contextBridge.exposeInMainWorld("fileStorage", {
  clearFile: (key) => ipcRenderer.invoke(fileStorage.clearFile, key),
  retrieveFile: (key) => ipcRenderer.invoke(fileStorage.retrieveFile, key),
  storeFile: (key, data) => ipcRenderer.invoke(fileStorage.storeFile, key, data)
});

contextBridge.exposeInMainWorld("processor", {
  initiate: (times, toRun) => ipcRenderer.invoke(processor.initiate, times, toRun)
});

contextBridge.exposeInMainWorld("mainEvents", {
  eventTrigger: (cb) => ipcRenderer.on(eventList.eventTrigger, (_, value) => cb(value))
});

contextBridge.exposeInMainWorld("mouseEvents", {
  getMousePosition: () => ipcRenderer.invoke(mouse.getMousePosition)
});
