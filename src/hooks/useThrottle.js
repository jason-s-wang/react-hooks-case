import { useCallback, useRef } from 'react';


/**
 * Generate throttled function
 * @param {function} func function to be throttled
 * @param {number} wait throttle duration time
 * @returns {*} return func() or null if func is not called
 */
export const useThrottle = (func, wait) => {
  let isThrottledRef = useRef(false);

  const throttle = useCallback((...params) => {
    try {
      if (!isThrottledRef.current) {
        isThrottledRef.current = true;

        window.setTimeout(() => {
          isThrottledRef.current = false
        }, wait);

        return func(...params);
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
    }
  }, [func, wait]);

  return throttle;
};