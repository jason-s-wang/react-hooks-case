import { useEffect, useReducer } from 'react';
import { useStorage } from './useStorage';


/**
 * useStoredReducer is a hook which returns what useReducer returns and keep state in storage
 * @param {string} key - the key in storage
 * @param {function} reducer - same as reducer in useReducer
 * @param {Object} initialState - same as initialState in useReducer
 * @param {Object} config - set hook config
 * @param {string} config.storage - localStorage or sessionStorage
 * @returns {Array} state and dispatch
 */
export const useStoredReducer = (key, reducer, initialState = {}, config) => {
  const { value, setValue } = useStorage(key, null, config);
  const [state, dispatch] = useReducer(reducer, value || initialState);

  useEffect(() => {
    try {
      if (config && Array.isArray(config.keys) &&
        state && typeof state === 'object') {
        let storedState = {};

        for (let key in state) {
          if (config.keys.includes(key)) {
            storedState[key] = state[key];
          }
        }

        setValue(storedState);
      } else {
        setValue(state);
      }
    } catch (error) {
      console.error(error);
    }
  }, [state, setValue, config]);

  return [state, dispatch];
};