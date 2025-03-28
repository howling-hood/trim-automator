import { retrieve } from "./storage";

export const ROUTES = {
  timestamps: "/",
  settings: "/settings",
  davinci: "/davinci"
};

export const SETTINGS = retrieve(ROUTES.settings) || {
  davinci: {
    timecode: "",
    blade: ""
  },
  threshold: 30
};

export const DAVINCI_LABELS = {
  timecode: "Shortcut for Timecode",
  blade: "Shortcut for adding a Cut"
};

export const KEYMAPPING = {
  "⌃": "Ctrl",
  "⇧": "Shift",
  "⌥": "Alt",
  space: "Space"
};
