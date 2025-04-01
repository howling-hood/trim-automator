import { dialog } from "electron";
import { getMainWindow } from "electron-main-window";

import { retrieveFile } from "./storage.js";
import { eventList } from "./const.js";
import { gotoTimecode, performBladeCut } from "./davinci.js";

import { ROUTES } from "../../src/utils/configs.js";
import { getHMSfromSecs } from "../../src/utils/time.js";

let sendToBrowser = (event, data) => getMainWindow().webContents.send(event, data);

// gets the H,M,S from seconds passed in the param
// and converts them to strings with a padded 0
const getPaddedHMSTime = (timeInSec) =>
  getHMSfromSecs(timeInSec)
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");

const getPercent = (index, total) => ((parseInt(index) + 1) / total) * 100;

const setupProcess = async (times, id) => {
  sendToBrowser(eventList.onBeginSetup);
  const settings = await retrieveFile(ROUTES.settings);
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
    sendToBrowser(eventList.onTimeConversionProgress, getPercent(index, len));
    converted.push(`${getPaddedHMSTime(start)}:00`);
    converted.push(`${getPaddedHMSTime(end)}:00`);
  });
  sendToBrowser(eventList.onEndTimeConversion);
  return converted;
};

const beginCuttingPhase = async (times = [], timecode = "=", blade = "CTRL+B") => {
  const len = times?.length;
  sendToBrowser(eventList.onBeginCutPhase);
  for (let i = 0; i < len; i++) {
    sendToBrowser(eventList.onCutPhaseProgress, getPercent(i, len));
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
