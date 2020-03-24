import { useCallback } from 'react';


export const useDebounce = (func, wait) => {
  let timer = null;

  const debounce = useCallback(() => {
    try {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        func();
      }, wait);
    } catch (error) {
      console.error(error);
    }
  }, [func, wait]);

  return debounce;
};