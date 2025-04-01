import setupStorageHandlers from "./handlers/storageHandlers.js";
import setupProcessHandlers from "./handlers/processorHandlers.js";

const setupHandlers = () => {
  setupStorageHandlers();
  setupProcessHandlers();
};

export default setupHandlers;
