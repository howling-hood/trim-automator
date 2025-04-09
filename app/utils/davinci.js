import { Key, keyboard, Point } from "@nut-tree-fork/nut-js";
import { Button, mouse, straightTo } from "@nut-tree-fork/nut-js";

import { keyMapping } from "./const.js";

keyboard.config.autoDelayMs = 100;

const getMappedShortcut = (shortcut) =>
  shortcut.split("+").map((k) => {
    let ky = k.toUpperCase();
    return keyMapping[ky] || Key[ky] || ky;
  });

const performShortcut = async (shortcut) => {
  await keyboard.type(...getMappedShortcut(shortcut));
};

const clickPointOnScreen = async (x, y) => {
  let point = new Point(x, y);
  await mouse.move(straightTo(point));
  await mouse.click(Button.LEFT);
};

export const switchToDavinci = async () => {
  await keyboard.type(process.platform === "darwin" ? Key.LeftCmd : Key.LeftAlt, Key.Tab);
};

export const gotoTimecode = async (timecode, timecodeShortcut = "=") => {
  await performShortcut(timecodeShortcut);
  await keyboard.type(timecode.toString());
  await keyboard.type(Key.Enter);
};

export const performBladeCut = async (bladeShortcut = "CTRL+B") => performShortcut(bladeShortcut);

export const performSelection = async (selectionShortcut = "SHIFT+V") => performShortcut(selectionShortcut);

export const performDeletion = async (deleteShortcut = "DELETE") => performShortcut(deleteShortcut);

export const goToRenderPage = async (deliverPageShortcut = "SHIFT+D") => {
  await keyboard.pressKey(...getMappedShortcut(deliverPageShortcut));
  await keyboard.releaseKey(...getMappedShortcut(deliverPageShortcut));
};

export const setupRender = async (presetLocation = [30, 135], addToQueueLocation = [350, 990]) => {
  // Go to preset
  await clickPointOnScreen(...presetLocation);
  // Add to Render Queue
  await clickPointOnScreen(...addToQueueLocation);
};

export const startRender = async (replaceLocation = [1100, 610], renderAllLocation = [1835, 400]) => {
  // click replace if popup shows up
  await clickPointOnScreen(...replaceLocation);
  // click on render all
  await clickPointOnScreen(...renderAllLocation);
};
