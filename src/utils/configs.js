import { retrieve } from "./storage";

export const ROUTES = {
  timestamps: "/",
  settings: "/settings",
  davinci: "/davinci"
};

export const SETTINGS = retrieve("SETTINGS") || {
  davinci: {
    timecode: "",
    blade: "",
    mark: "",
    deliver: "",
    queue: ""
  },
  threshold: 30
};

export const DAVINCI_LABELS = {
  timecode: "Shortcut for Timecode",
  blade: "Shortcut for adding a Cut",
  mark: "Shortcut for Marking",
  deliver: "Shortcut for activating the deliver page",
  queue: "Shorcut for adding to render queue"
};
