// convert these to async await

export const retrieve = async (key) => {
  if (!key) throw Error("Key needed for retrieval");
  return (await window?.fileStorage?.retrieveFile(key)) ?? JSON.parse(localStorage.getItem(key));
};

export const store = async (key, value) => {
  if (!key) throw Error("Key needed for storage");
  if (!value) throw Error("Value/Data needed for storage");
  // store in both places
  localStorage.setItem(key, JSON.stringify(value));
  await window?.fileStorage?.storeFile(key, value);
};

export const remove = async (key) => {
  if (!key) throw Error("Key needed for removal");
  return (await window?.fileStorage?.clearFile(key)) ?? localStorage.removeItem(key);
};
