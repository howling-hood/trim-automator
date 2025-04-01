import fs from "fs";
import path from "node:path";

const getFilePath = (key) => {
  return path.join(path.resolve(), "data", `${key.replace("/", "_")}.json`);
};

const setup = () => {
  const dir = path.join(path.resolve(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};

/**
 * stores the given data locally to the "Key" file
 * @param {string} key - The key to store the data under
 * @param {object} data - The data to store
 */
export const storeFile = (key, data) => {
  if (!key) throw Error("Key needed for storage");
  if (!data) throw Error("Value/Data needed for storage");
  try {
    return fs.writeFileSync(getFilePath(key), JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return null;
  }
};

/***
 * Retrieves the data from the "Key" file
 * @param {string} key - The key to retrieve the data from
 */

export const retrieveFile = (key) => {
  if (!key) throw Error("Key needed for retrieval");
  try {
    return JSON.parse(fs.readFileSync(getFilePath(key)));
  } catch (err) {
    console.error(err);
    return null;
  }
};

/***
 * deletes the data from the "Key" file
 * @param {string} key - The key to retrieve the data from
 */

export const clearFile = (key) => {
  if (!key) throw Error("Key needed for removal");
  try {
    return fs.unlinkSync(getFilePath(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

setup();
