import { useEffect, useReducer, useRef } from 'react';
import { useStorage } from './useStorage';


/**
 * useStoredReducer is a hook which returns what useReducer returns and keep state in storage
 * @param {string} key - the key in storage
 * @param {function} reducer - same as reducer in useReducer
 * @param {Object} initialState - same as initialState in useReducer
 * @param {Object} config - set hook config
 * @param {string} config.storage - localStorage or sessionStorage
 * @param {[string]} config.keys - properties in keys will be stored in storage
 * @returns {Array} state and dispatch
 */
export const useStoredReducer = (key, reducer, initialState = {}, config = {}) => {
  const { value, setValue } = useStorage(key, null, config);
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (initialState && typeof initialState === 'object' &&
      value && typeof value === 'object') {
      // Combine value and initialstate
      return Object.assign(initialState, value);
    } else {
      return value || initialState;
    }
  });
  const configRef = useRef(config);

  // Update configRef
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  // Store state
  useEffect(() => {
    try {
      if (Array.isArray(configRef.current.keys) &&
        state && typeof state === 'object') {
        let storedState = {};

        for (let key in state) {
          if (configRef.current.keys.includes(key)) {
            storedState[key] = state[key];
          }
        }

        // Skip store if no key matched
        Object.keys(storedState).length > 0 && setValue(storedState);
      } else {
        setValue(state);
      }

    } catch (error) {
      console.error(error);
    }
  }, [state, setValue]);

  return [state, dispatch];
};