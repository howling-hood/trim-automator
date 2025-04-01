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
  onBeginProcess: "onBeginProcess",
  onBeginSetup: "onBeginSetup",
  onEndSetup: "onEndSetup",
  onBeginTimeConversion: "onBeginTimeConversion",
  onTimeConversionProgress: "onTimeConversionProgress",
  onEndTimeConversion: "onEndTimeConversion",
  onBeginCutPhase: "onBeginCutPhase",
  onCutPhaseProgress: "onCutPhaseProgress",
  onEndCutPhase: "onEndCutPhase",
  onEndProcess: "onEndProcess"
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
