export const ROUTES = {
  timestamps: "/",
  settings: "/settings",
  davinci: "/davinci"
};

export const SETTINGS = {
  davinci: {
    timecode: "=",
    blade: "CTRL+B",
    selectClip: "SHIFT+V",
    deleteKey: "DELETE",
    deliverPage: "SHIFT+D"
  },
  mousePoints: {
    presetLocation: [0, 0],
    addToQueueLocation: [0, 0],
    replaceLocation: [0, 0],
    renderAllLocation: [0, 0]
  },
  threshold: 30
};

export const DAVINCI_LABELS = {
  timecode: "Shortcut for Timecode",
  blade: "Shortcut for adding a Cut",
  selectClip: "Shortcut for selecting the clip",
  deleteKey: "Shortcut for deleting a selected clip",
  deliverPage: "Shortcut to Activate the Deliver Page"
};

export const MOUSE_POINT_LABELS = {
  presetLocation: "Preset Location on screen",
  addToQueueLocation: "Add to Render Queue Location on screen",
  replaceLocation: "Replace Location on screen",
  renderAllLocation: "Render All Location on screen"
};

export const KEYMAPPING = {
  "⌃": "Ctrl",
  "⇧": "Shift",
  "⌘": "Alt",
  space: "Space",
  del: "Delete"
};
