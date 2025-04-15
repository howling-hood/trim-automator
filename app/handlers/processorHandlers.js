import { ipcMain } from "electron";

import { processor } from "../utils/const.js";
import mainProcess from "../utils/processor.js";

const setupProcessHandlers = () => {
  ipcMain.handle(processor.initiate, (_, times, toRun) => mainProcess(times, toRun));
};

export default setupProcessHandlers;
