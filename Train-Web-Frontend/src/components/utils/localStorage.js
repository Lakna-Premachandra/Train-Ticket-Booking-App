export const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export const setToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}