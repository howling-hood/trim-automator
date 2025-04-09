import setupStorageHandlers from "./handlers/storageHandlers.js";
import setupProcessHandlers from "./handlers/processorHandlers.js";
import setupMouseHandlers from "./handlers/mouseHandlers.js";

const setupHandlers = () => {
  setupStorageHandlers();
  setupProcessHandlers();
  setupMouseHandlers();
};

export default setupHandlers;
