import { useCallback, useRef } from 'react';

export const useDebounce = (func, wait) => {
  const timer = useRef(null);

  const debounce = useCallback(() => {
    try {
      timer.current && clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        func();
      }, wait);
    } catch (error) {
      console.error(error);
    }
  }, [func, wait]);

  return debounce;
};