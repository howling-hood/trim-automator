export const gotoTimecode = (timecode, shortcut) => {
  return `goto ${timecode}`;
};

export const performBladeCut = (shortcut) => {
  return `goto ${shortcut}`;
};
