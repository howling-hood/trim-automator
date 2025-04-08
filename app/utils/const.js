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
  onBeginProcess: "Process started",
  onBeginSetup: "Setup started",
  onEndSetup: "Setup done",
  onBeginTimeConversion: "Time Conversion started",
  onTimeConversionProgress: "Time Conversion Progress:: ",
  onEndTimeConversion: "Time Conversion Completed",
  onBeginCutPhase: "Cut Phase started",
  onCutPhaseProgress: "Cut Phase Progress:: ",
  onEndCutPhase: "Cut Phase Completed",
  onEndProcess: "Process Completed"
};

const keyMapping = {
  CTRL: Key.LeftControl,
  SHIFT: Key.Shift,
  ALT: Key.LeftAlt,
  SPACE: Key.Space
};

// needs to use the module.exports
module.exports = {
  fileStorage,
  eventList,
  processor,
  keyMapping
};
