import { ROUTES, SETTINGS } from "./configs.js";
import { retrieveLocal } from "./storage.js";

const secsInHours = 60 * 60;
const secsInMins = 60;

export const calculateTotalDuration = (timeArray = []) => {
  return getHMSfromSecs(timeArray.reduce((total, curr) => total + getTimeDifference(...curr), 0)).join(":");
};

export const timeReduction = (times = []) => {
  const threshold = parseInt(retrieveLocal(ROUTES.settings)?.threshold ?? SETTINGS.threshold);
  const sortedTimes = times.sort((a, b) => a[0] - b[0]);
  let newTimes = [];
  let mergedTill = -1;
  // 0,1,0
  for (let primary = 0; primary < sortedTimes.length; primary++) {
    // skip the iteration if we have merged ahead
    if (mergedTill >= primary) {
      continue;
    }
    let entryStart = sortedTimes[primary][0];
    let entryEnd = sortedTimes[primary][1];

    // start checking from the next entry
    // 1,2,0
    for (let secondary = primary + 1; secondary < sortedTimes.length; secondary++) {
      if (
        // if the current end time is near threshold secs of start time of next entry merge it
        getTimeDifference(entryEnd, sortedTimes[secondary][0]) <= threshold
      ) {
        entryEnd = sortedTimes[secondary][1];
        mergedTill = secondary;
      } else {
        // if the next entry is not near the threshold set then break out of the loop
        break;
      }
    }
    newTimes.push([entryStart, entryEnd]);
  }

  return newTimes;
};

export const getTimeDifference = (start, end) => {
  return Math.abs(end - start);
};

export const getHMSfromSecs = (time) => {
  let totalSecs = parseInt(time) || 0;
  const hours = Math.floor(totalSecs / 3600);
  const mins = Math.floor(totalSecs / 60 - hours * 60);
  const secs = totalSecs % 60;
  return [hours, mins, secs];
};

export const getSecsFromHMS = (hours, minutes, seconds) => {
  return (parseInt(hours) || 0) * secsInHours + (parseInt(minutes) || 0) * secsInMins + (parseInt(seconds) || 0);
};
