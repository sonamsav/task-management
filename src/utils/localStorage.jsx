const updateLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorageData = (key) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export { updateLocalStorage, getLocalStorageData };
