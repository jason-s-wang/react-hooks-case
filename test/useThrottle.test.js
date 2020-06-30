import { renderHook } from '@testing-library/react-hooks';
import { useThrottle } from '../src/hooks';


describe('useThrottle', () => {
  const WAIT = 1000;

  test('throttle is a function', () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useThrottle(mockFunc, WAIT));
    expect(typeof result.current).toBe('function');
  });

  test('throttle will be called only once', () => {
    return new Promise(done => {
      expect.assertions(1);

      const mockFunc = jest.fn(() => {
        expect(true).toBeTruthy();
        done();
      });

      const { result, rerender } = renderHook(() => useThrottle(mockFunc, WAIT));

      [1, 2, 3].forEach(result.current);
      rerender();
      result.current(2);
    });
  });

  test('throttle callback has correct params', () => {
    return new Promise(done => {
      let params = [1, 2];

      const mockFunc = jest.fn((d1, d2) => {
        expect(d1).toBe(params[0]);
        expect(d2).toBe(params[1]);
        done();
      });

      const { result } = renderHook(() => useThrottle((v1, v2) => mockFunc(v1, v2), WAIT));

      result.current(...params);
    });
  });

  test('throttle return callback result', () => {
    return new Promise(done => {
      const retVal = {
        a: 'a',
        b: 'b'
      };

      const mockFunc = jest.fn(() => {
        done();
        return retVal;
      });

      const { result } = renderHook(() => useThrottle(mockFunc, WAIT));

      expect(result.current()).toEqual(retVal);
    });
  });

  test('throttle return null if callback is throttled', () => {
    const mockFunc = jest.fn(() => 'returned value');

    const { result } = renderHook(() => useThrottle(mockFunc, WAIT));
    let retVal = result.current();
    retVal = result.current();  // second call will not happen

    expect(retVal).toBe(null);
  });
});