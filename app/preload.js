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
  onBeginProcess: (cb) => ipcRenderer.on(eventList.onBeginProcess, (_, value) => cb(value)),
  onBeginSetup: (cb) => ipcRenderer.on(eventList.onBeginSetup, (_, value) => cb(value)),
  onEndSetup: (cb) => ipcRenderer.on(eventList.onEndSetup, (_, value) => cb(value)),
  onBeginTimeConversion: (cb) => ipcRenderer.on(eventList.onBeginTimeConversion, (_, value) => cb(value)),
  onTimeConversionProgress: (cb) => ipcRenderer.on(eventList.onTimeConversionProgress, (_, value) => cb(value)),
  onEndTimeConversion: (cb) => ipcRenderer.on(eventList.onEndTimeConversion, (_, value) => cb(value)),
  onBeginCutPhase: (cb) => ipcRenderer.on(eventList.onBeginCutPhase, (_, value) => cb(value)),
  onCutPhaseProgress: (cb) => ipcRenderer.on(eventList.onCutPhaseProgress, (_, value) => cb(value)),
  onEndCutPhase: (cb) => ipcRenderer.on(eventList.onEndCutPhase, (_, value) => cb(value)),
  onEndProcess: (cb) => ipcRenderer.on(eventList.onEndProcess, (_, value) => cb(value))
});
