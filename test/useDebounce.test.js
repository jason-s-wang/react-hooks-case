import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from '../src/hooks';


describe('useDebounce', () => {
  const WAIT = 1000;

  test('debounce is a function', () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunc, WAIT));
    expect(typeof result.current).toBe('function');
  });

  test('debounce will be called only once', () => {
    return new Promise(done => {
      expect.assertions(1);

      const mockFunc = jest.fn(() => {
        expect(true).toBeTruthy();
        done();
      });

      const { result, rerender } = renderHook(() => useDebounce(() => mockFunc(), WAIT));

      [1, 2, 3].forEach(result.current);
      rerender();
      result.current(2);
    });
  });

  test('debounce callback has correct params', () => {
    return new Promise(done => {
      let params = [1, 2];

      const mockFunc = jest.fn((d1, d2) => {
        expect(d1).toBe(params[0]);
        expect(d2).toBe(params[1]);
        done();
      });

      const { result } = renderHook(() => useDebounce((v1, v2) => mockFunc(v1, v2), WAIT));

      result.current(...params);
    });
  });
});