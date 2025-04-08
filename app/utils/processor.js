import { dialog } from "electron";
import { getMainWindow } from "electron-main-window";

import { retrieveFile } from "./storage.js";
import { eventList, processor } from "./const.js";
import { switchToDavinci, gotoTimecode, performBladeCut } from "./davinci.js";

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
    .join("");

const getPercent = (index, total) => `${Math.floor(((parseInt(index) + 1) / total) * 100)}%`;

const setupProcess = async (times, id) => {
  sendToBrowser(eventList.onBeginSetup);
  const settings = await retrieveFile("/settings");
  sendToBrowser(eventList.onEndSetup);
  return { ...settings.davinci };
};

const getConvertedTimestrings = (times) => {
  sendToBrowser(eventList.onBeginTimeConversion);
  const len = times?.length;
  let converted = [];
  times.forEach((time, index) => {
    const start = time[0];
    const end = time[1];
    sendToBrowser(`${eventList.onTimeConversionProgress} ${getPercent(index, len)}`, true);
    converted.push(`${getPaddedHMSTime(start)}00`);
    converted.push(`${getPaddedHMSTime(end)}00`);
  });
  sendToBrowser(eventList.onEndTimeConversion);
  return converted;
};

const beginCuttingPhase = async (times = [], timecode = "=", blade = "CTRL+B") => {
  const len = times?.length;
  sendToBrowser(eventList.onBeginCutPhase);
  await switchToDavinci();
  for (let i = 0; i < len; i++) {
    sendToBrowser(`${eventList.onCutPhaseProgress} ${getPercent(i, len)}`, true);
    await gotoTimecode(times[i], timecode);
    await performBladeCut(blade);
  }
  sendToBrowser(eventList.onEndCutPhase);
};

const mainProcess = async (times) => {
  if (!sendToBrowser) {
    dialog.showErrorBox("Error", "Something went wrong");
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  sendToBrowser(eventList.onBeginProcess);
  const { timecode, blade } = await setupProcess(times);
  const timestrings = await getConvertedTimestrings(times);
  await beginCuttingPhase(timestrings, timecode, blade);
  sendToBrowser(eventList.onEndProcess);
};

export default mainProcess;
