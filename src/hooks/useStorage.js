import { useState, useMemo, useCallback, useRef, useEffect } from 'react';

/**
 * useStorage is a hook which is used to control localStorage or sessionStorage
 * @param {string} key - the key in storage
 * @param {*} initialValue - any value
 * @param {Object} config - set storage config
 * @param {string} config.storage - localStorage or sessionStorage
 * @returns {Object} value, setValue and removeValue
 */
export const useStorage = (key, initialValue = '', config = {}) => {
  const storage = useMemo(
    () => config.storage === 'localStorage' ? window.localStorage : window.sessionStorage,
    [config.storage]
  );

  const [value, setValue] = useState(() => {
    let tempValue = initialValue;

    try {
      const item = storage.getItem(key);
      tempValue = item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
    }

    return tempValue;
  });

  const curValueRef = useRef(value);

  useEffect(() => {
    curValueRef.current = value;
  }, [value]);

  const setStoredValue = useCallback((newValue) => {
    try {
      // Compute next value if newValue is function
      const nextValue = newValue instanceof Function ? newValue(curValueRef.current) : newValue;
      setValue(nextValue);
      storage.setItem(key, JSON.stringify(nextValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storage]);

  const removeValue = useCallback(() => {
    try {
      storage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(error);
    }
  }, [key, storage]);

  return {
    value,
    setValue: setStoredValue,
    removeValue
  };
};

export const useLocalStorage = (key, initialValue) =>
  useStorage(key, initialValue, {
    storage: 'localStorage'
  });

export const useSessionStorage = (key, initialValue) =>
  useStorage(key, initialValue, {
    storage: 'sessionStorage'
  });