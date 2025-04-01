import { ipcMain } from "electron";

import { processor } from "../utils/const.js";
import mainProcess from "../utils/processor.js";

const setupProcessHandlers = () => {
  ipcMain.handle(processor.initiate, (_, times) => mainProcess(times));
};

export default setupProcessHandlers;
