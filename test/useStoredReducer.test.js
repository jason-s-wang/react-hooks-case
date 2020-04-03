import { renderHook, act } from '@testing-library/react-hooks';
import { useStoredReducer } from '../src/hooks';


describe('useStoredReducer', () => {
  const KEY = 'key';
  const INITIAL_STATE = {
    count: 0
  };
  const NEXT_STATE = {
    count: 1
  };

  const mockReducer = jest.fn();
  mockReducer.mockReturnValue(NEXT_STATE);

  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  /*******************************************************************************************************/

  describe('Setup', () => {
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

    test('intitial value is not an object', () => {
      const initialValue = 1;

      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, initialValue));

      expect(result.current[0]).toEqual(initialValue);
      expect(JSON.parse(window.sessionStorage.getItem(KEY))).toEqual(initialValue);
    });
  });

  /*******************************************************************************************************/

  describe('Config', () => {
    test('Switch to localStorage', () => {
      const config = {
        storage: 'localStorage'
      };
      renderHook(() => useStoredReducer(KEY, mockReducer, INITIAL_STATE, config));
      expect(JSON.parse(window.localStorage.getItem(KEY))).toEqual(INITIAL_STATE);
    });

    test('Only store properties in config.keys', () => {
      const storedState = {
        stored1: 1,
        stored2: {
          test: 'test'
        },
        noStored: 'noStored'
      };

      const { result } = renderHook(() => useStoredReducer(KEY, () => storedState, {}, {
        keys: ['stored1', 'stored2']
      }));

      act(() => {
        result.current[1]();
      });

      const storageItem = JSON.parse(window.sessionStorage.getItem(KEY));
      expect(storageItem.stored1).toEqual(storedState.stored1);
      expect(storageItem.noStored).toBeUndefined();
    });

    test('Will combine stored state with initial state', () => {
      const initialState = {
        part1: 1,
        part2: 2
      };
      const storedState = {
        part1: 5,
        part3: 99
      };
      window.sessionStorage.setItem(KEY, JSON.stringify(storedState));

      const { result } = renderHook(() => useStoredReducer(KEY, mockReducer, initialState, { keys: ['part1'] }));

      expect(result.current[0].part1).toEqual(storedState.part1);
      expect(result.current[0].part2).toEqual(initialState.part2);
      expect(result.current[0].part3).toEqual(storedState.part3);
    });
  });

  /*******************************************************************************************************/

  describe('Dispatch action', () => {
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