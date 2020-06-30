import { useCallback, useRef } from 'react';


/**
 * Generate debounced function
 * @param {function} func function to be debounced
 * @param {number} wait debounce wait time
 */
export const useDebounce = (func, wait) => {
  const timer = useRef(null);

  const debounce = useCallback((...params) => {
    try {
      timer.current && clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        func(...params);
      }, wait);
    } catch (error) {
      console.error(error);
    }
  }, [func, wait]);

  return debounce;
};