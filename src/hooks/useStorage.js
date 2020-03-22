import { useState } from 'react';

/**
 * useStorage is a hook which is used to control localStorage or sessionStorage
 * @param {string} key - the key in storage
 * @param {*} initialValue - any value
 * @param {Object} config - set storage config
 * @param {string} config.storage - localStorage or sessionStorage
 * @returns {Array} value and setValue
 */
export const useStorage = (key, initialValue = '', config = {}) => {
  const storage = config.storage === 'localStorage' ?
    window.localStorage : window.sessionStorage;

  const [value, setValue] = useState(() => {
    let tempValue = initialValue;

    try {
      const item = storage.getItem(key);
      tempValue = item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
    }

    // console.log(tempValue);
    return tempValue;
  });

  const setStorageValue = newValue => {
    try {
      // Compute next value if newValue is function
      const nextValue = newValue instanceof Function ? newValue(value) : newValue;
      setValue(nextValue);
      storage.setItem(key, JSON.stringify(nextValue));
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setStorageValue];
};

export const useLocalStorage = (key, initialValue) =>
  useStorage(key, initialValue, {
    storage: 'localStorage'
  });

export const useSessionStorage = (key, initialValue) =>
  useStorage(key, initialValue, {
    storage: 'sessionStorage'
  });