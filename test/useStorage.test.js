import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../src/hooks';


describe('useLocalStorage', () => {
  const KEY = 'key';
  const VALUE = {
    INITIAL: 'initial',
    STORED: 'stored',
    CHANGED: 'changed',
    NONE: ''
  };

  describe('Setup', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    test('setValue is a function', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(typeof result.current.setValue).toBe('function')
    });

    test('Returns initial value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current.value).toBe(VALUE.INITIAL);
    });

    test('Returns an empty string as default', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));
      expect(result.current.value).toBe(VALUE.NONE);
    });

    test('Returns stored value', () => {
      window.localStorage.setItem(KEY, JSON.stringify(VALUE.STORED));
      const { result } = renderHook(() => useLocalStorage(KEY, VALUE.INITIAL));
      expect(result.current.value).toBe(VALUE.STORED);
    });
  });

  describe('Change', () => {
    test('Set value to changed value', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.setValue(VALUE.CHANGED);
      });

      expect(result.current.value).toBe(VALUE.CHANGED);
    });

    test('localStorage value is set to changed after setValue', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.setValue(VALUE.CHANGED);
      });

      expect(JSON.parse(window.localStorage.getItem(KEY))).toBe(VALUE.CHANGED);
    });

    test('localStorage value is set to null after removeValue', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.removeValue();
      });

      expect(JSON.parse(window.localStorage.getItem(KEY))).toBe(null);
    });

    test('value is set to null after removeValue', () => {
      const { result } = renderHook(() => useLocalStorage(KEY));

      act(() => {
        result.current.removeValue();
      });

      expect(result.current.value).toBe(null);
    });
  });
});