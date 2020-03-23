import { renderHook, act } from '@testing-library/react-hooks';
import { useStoredReducer } from '../src/hooks';


describe('useStoredReducer', () => {
  const KEY = 'key';
  const INITIAL_STATE = {
    count: 0
  };
  const NEXT_STATE = {
    count: 1
  }

  const mockReducer = jest.fn();
  mockReducer.mockReturnValue(NEXT_STATE);

  describe('Setup', () => {
    beforeEach(() => {
      window.sessionStorage.clear();
    });

    test('Dispatch as array[1] is a function', () => {
      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));
      expect(typeof result.current[1]).toBe('function');
    });

    test('Returns initial state as array[0]', () => {
      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));
      expect(result.current[0]).toEqual(INITIAL_STATE);
    });

    test('Returns stored state', () => {
      window.sessionStorage.setItem(KEY, JSON.stringify(NEXT_STATE));
      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));
      expect(result.current[0]).toEqual(NEXT_STATE);
    });

    test('sessionStorage as default', () => {
      renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));
      expect(JSON.parse(window.sessionStorage.getItem(KEY))).toEqual(INITIAL_STATE);
    });
  });

  describe('Config', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    test('Switch to localStorage', () => {
      const config = {
        storage: 'localStorage'
      };
      renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE, config));
      expect(JSON.parse(window.localStorage.getItem(KEY))).toEqual(INITIAL_STATE);
    });
  });

  describe('Dispatch action', () => {
    beforeEach(() => {
      window.sessionStorage.clear();
    });

    test('State turns into next state', () => {
      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));

      act(() => {
        result.current[1]();
      });

      expect(result.current[0]).toEqual(NEXT_STATE);
    });

    test('sessionStorage value change with state', () => {
      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE));

      act(() => {
        result.current[1]();
      });

      expect(JSON.parse(window.sessionStorage.getItem(KEY))).toEqual(NEXT_STATE);
    });
  });
});