import { useEffect } from 'react';
import { useStorage } from './useStorage';


/**
 * useReducerStorage is a hook which returns what useReducer returns and keep state in storage
 * @param {string} key - the key in storage
 * @param {function} reducer - same as reducer in useReducer
 * @param {Object} initialState - same as initialState in useReducer
 * @param {Object} config - set hook config
 * @param {string} config.storage - localStorage or sessionStorage
 * @returns {Array} state and dispatch
 */
const useReducerStorage = (key, reducer, initialState, config) => {
  const [storedState, setStoredState] = useStorage(key, null, config);
  const [state, dispatch] = useReducer(reducer, storedState || initialState);

  useEffect(() => {
    setStoredState(state);
  }, [state, setStoredState]);

  return [state, dispatch];
};