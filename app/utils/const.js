const { Key } = require("@nut-tree-fork/nut-js");

const processor = {
  initiate: "processor:initiate"
};

const fileStorage = {
  clearFile: "fileStorage:clearFile",
  retrieveFile: "fileStorage:retrieveFile",
  storeFile: "fileStorage:storeFile"
};

const eventList = {
  eventTrigger: "eventTrigger",
  onBeginProcess: "Process Started",
  onBeginSetup: "Setup Started",
  onEndSetup: "Setup done",
  onBeginTimeConversion: "Time Conversion Started",
  onTimeConversionProgress: "Time Conversion Progress",
  onEndTimeConversion: "Time Conversion Completed",
  onBeginCutPhase: "Cut Phase Started",
  onCutPhaseProgress: "Cut Phase Progress",
  onEndCutPhase: "Cut Phase Completed",
  onBeginRemovePhase: "Remove Phase Started",
  onRemovePhaseProgress: "Remove Phase Progress",
  onEndRemovePhase: "Remove Phase Completed",
  onBeginRenderSetupPhase: "Render Setup Phase Started",
  onEndRenderSetupPhase: "Render Setup Phase Completed",
  onEndProcess: "Process Completed"
};

const keyMapping = {
  CTRL: Key.LeftControl,
  SHIFT: Key.LeftShift,
  ALT: Key.LeftAlt,
  SPACE: Key.Space,
  DELETE: Key.Delete
};

// needs to use the module.exports
module.exports = {
  fileStorage,
  eventList,
  processor,
  keyMapping
};
