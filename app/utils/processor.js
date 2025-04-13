import { dialog } from "electron";
import { getMainWindow } from "electron-main-window";

import { retrieveFile } from "./storage.js";
import { eventList } from "./const.js";
import {
  switchToDavinci,
  gotoTimecode,
  performBladeCut,
  performSelection,
  performDeletion,
  goToRenderPage,
  setupRender,
  startRender
} from "./davinci.js";

const waitFor = async (time) =>
  new Promise((res) => {
    setTimeout(res, time * 1000);
  });

let sendToBrowser = (text, isProgressEvent = false) =>
  getMainWindow().webContents.send(eventList.eventTrigger, {
    text,
    isProgressEvent
  });

const getHMSfromSecs = (time) => {
  let totalSecs = parseInt(time) || 0;
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor(totalSecs / 60 - hours * 60);
  const secs = totalSecs % 60;
  return [hours, mins, secs];
};
// gets the H,M,S from seconds passed in the param
// and converts them to strings with a padded 0
const getPaddedHMSTime = (timeInSec) =>
  getHMSfromSecs(timeInSec)
    .map((num) => num.toString().padStart(2, "0"))
    .join("")
    .concat("00");

const getPercent = (index, total) => Math.floor(((parseInt(index) + 1) / total) * 100);

const setupProcess = async () => {
  sendToBrowser(eventList.onBeginSetup);
  const settings = await retrieveFile("/settings");
  await switchToDavinci();
  sendToBrowser(eventList.onEndSetup);
  return { ...settings.davinci, ...settings.mousePoints };
};

const getConvertedTimestrings = (times) => {
  sendToBrowser(eventList.onBeginTimeConversion);
  const len = times?.length;
  let converted = [];
  times.forEach((time, index) => {
    const start = time[0];
    const end = time[1];
    sendToBrowser(`${eventList.onTimeConversionProgress}::${getPercent(index, len)}%`, true);
    converted.push(getPaddedHMSTime(start));
    converted.push(getPaddedHMSTime(end));
  });
  sendToBrowser(eventList.onEndTimeConversion);
  return converted;
};

const beginCuttingPhase = async (times = [], timecode, blade) => {
  const len = times?.length;
  sendToBrowser(eventList.onBeginCutPhase);
  for (let i = 0; i < len; i++) {
    sendToBrowser(`${eventList.onCutPhaseProgress}::${getPercent(i, len)}%`, true);
    await waitFor(1);
    await gotoTimecode(times[i], timecode);
    await waitFor(1);
    await performBladeCut(blade);
  }
  sendToBrowser(eventList.onEndCutPhase);
};

const beginRemovalPhase = async (times = [], timecode, selectClip, deleteKey) => {
  const len = times?.length;
  sendToBrowser(eventList.onBeginRemovePhase);
  for (let i = 0; i < len; i++) {
    sendToBrowser(`${eventList.onRemovePhaseProgress}::${getPercent(i, len)}%`, true);
    await gotoTimecode(times[i], timecode);
    await waitFor(0.5);
    await performSelection(selectClip);
    await waitFor(0.5);
    await performDeletion(deleteKey);
  }
  sendToBrowser(eventList.onEndRemovePhase);
};

const getMiddleTimeStrings = (times) => {
  let timecodes = [];
  // add initial timecode
  let thisEnd = 0;
  let nextStart = parseInt(times[0][0]);
  let midTime = Math.round((thisEnd + nextStart) / 2);
  timecodes.push(getPaddedHMSTime(midTime));
  for (let i = 0; i < times.length - 1; i++) {
    thisEnd = parseInt(times[i][1]);
    nextStart = parseInt(times[i + 1][0] || thisEnd + 120);
    midTime = Math.round((thisEnd + nextStart) / 2);
    timecodes.push(getPaddedHMSTime(midTime));
  }
  // adding ending timecode
  thisEnd = parseInt(times.pop()[1]);
  nextStart = parseInt(thisEnd + 120);
  midTime = Math.round((thisEnd + nextStart) / 2);
  timecodes.push(getPaddedHMSTime(midTime));
  // returning the reverse of the list
  return timecodes.reverse();
};

const beginRenderSetupPhase = async (
  deliverPage,
  presetLocation,
  addToQueueLocation,
  replaceLocation,
  renderAllLocation
) => {
  sendToBrowser(eventList.onBeginRenderSetupPhase);
  await goToRenderPage(deliverPage);
  await waitFor(2);
  await setupRender(presetLocation, addToQueueLocation);
  await waitFor(5);
  await startRender(replaceLocation, renderAllLocation);
  sendToBrowser(eventList.onEndRenderSetupPhase);
};

const mainProcess = async (times) => {
  if (!sendToBrowser) {
    dialog.showErrorBox("Error", "Something went wrong");
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  sendToBrowser(eventList.onBeginProcess);
  const {
    timecode,
    blade,
    selectClip,
    deleteKey,
    deliverPage,
    presetLocation,
    addToQueueLocation,
    replaceLocation,
    renderAllLocation
  } = await setupProcess(times);
  const timestrings = getConvertedTimestrings(times);
  await beginCuttingPhase(timestrings, timecode, blade);
  const midTimes = getMiddleTimeStrings(times);
  await beginRemovalPhase(midTimes, timecode, selectClip, deleteKey);
  await beginRenderSetupPhase(deliverPage, presetLocation, addToQueueLocation, replaceLocation, renderAllLocation);
  sendToBrowser(eventList.onEndProcess);
};

export default mainProcess;
