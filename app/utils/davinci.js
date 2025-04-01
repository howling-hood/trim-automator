import { Key, keyboard } from "@nut-tree-fork/nut-js";
import { keyMapping } from "./const.js";

keyboard.config.autoDelayMs = 200;

const getMappedShortcut = (shortcut) =>
  shortcut.split("+").map((k) => {
    let ky = k.toUpperCase();
    console.log("jere", ky, Key[ky], keyMapping[ky], shortcut);
    return Key[ky] || keyMapping[ky] || ky;
  });

export const switchToDavinci = async () => {
  await keyboard.type(Key.LeftAlt, Key.Tab);
};

export const gotoTimecode = async (timecode, shortcut) => {
  await keyboard.type(...getMappedShortcut(shortcut));
  await keyboard.type(timecode.toString());
  await keyboard.type(Key.Enter);
};

export const performBladeCut = async (shortcut) => {
  await keyboard.type(...getMappedShortcut(shortcut));
};
