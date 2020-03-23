import { useCallback } from 'react';


export const useDebounce = (func, wait) => {
  const timer = null;

  const debounce = useCallback(() => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  }, [func, wait]);

  return debounce;
};