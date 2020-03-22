import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../src/hooks';


describe('useLocalStorage', () => {
  const KEY = 'key';
  const VALUE = {
    INITIAL: 'initial value',
    STORED: 'stored value',
    CHANGED: 'changed value',
    NONE: ''
  };

  describe('Setup with no stored value', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    test('SetValue is a function', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(typeof result.current[1]).toBe('function')
    });

    test('Returns initial value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current[0]).toBe(VALUE.INITIAL);
    });

    test('Returns stored value', () => {
      window.localStorage.setItem(KEY, JSON.stringify(VALUE.STORED));
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current[0]).toMatch(VALUE.STORED);
    });

    test('When no initial value is passed, returns an empty string', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));
      expect(result.current[0]).toBe(VALUE.NONE);
    });
  });

  // test('When `setValue()` is called, the `value` updates', () => {
  //   const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));

  //   act(() => {
  //     result.current[1](VALUE.CHANGED);
  //   });

  //   expect(result.current[0]).toMatch(VALUE.CHANGED);
  // });

  // test('When `value` changes, `localStorage` is updated', () => {
  //   const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));

  //   act(() => {
  //     result.current[1](VALUE.CHANGED);
  //   });

  //   expect(localStorage.getItem(KEY)).toBe(VALUE.CHANGED);
  // });
});