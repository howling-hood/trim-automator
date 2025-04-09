import { ipcMain } from "electron";

import { mouse } from "../utils/const.js";
import { getMousePosition } from "../utils/mouse.js";

const setupMouseHandlers = () => {
  ipcMain.handle(mouse.getMousePosition, () => getMousePosition());
};

export default setupMouseHandlers;
