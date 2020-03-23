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

  describe('Setup', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    test('setValue is a function', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(typeof result.current.setStoredValue).toBe('function')
    });

    test('Returns initial value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current.storedValue).toBe(VALUE.INITIAL);
    });

    test('Returns an empty string as default', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));
      expect(result.current.storedValue).toBe(VALUE.NONE);
    });

    test('Returns stored value', () => {
      window.localStorage.setItem(KEY, JSON.stringify(VALUE.STORED));
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current.storedValue).toBe(VALUE.STORED);
    });
  });

  describe('Change value', () => {
    test('Set value to changed value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.setStoredValue(VALUE.CHANGED);
      });

      expect(result.current.storedValue).toBe(VALUE.CHANGED);
    });

    test('localStorage value change with stored value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.setStoredValue(VALUE.CHANGED);
      });

      expect(JSON.parse(window.localStorage.getItem(KEY))).toBe(VALUE.CHANGED);
    });
  });
});