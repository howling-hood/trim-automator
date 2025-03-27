export const retrieve = (key) => {
  if (!key) throw Error("Key needed for retrieval");
  return JSON.parse(localStorage.getItem(key)) ?? null;
};

export const store = (key, value) => {
  if (!key) throw Error("Key needed for storage");
  if (!value) throw Error("Value/Data needed for storage");
  localStorage.setItem(key, JSON.stringify(value));
};
