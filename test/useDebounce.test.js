import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../src/hooks';


describe('useDebounce', () => {
  const WAIT = 1000;

  test('debounce is a function', () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunc, WAIT));
    expect(typeof result.current).toBe('function');
  });

  test('debounce args will pass down', () => {
    const testParm = 'test';
    const mockFunc = jest.fn((data) => {
      expect(data).toBe(testParm);
    });

    const { result } = renderHook(() => useDebounce(() => mockFunc(testParm), WAIT));

    result.current();
  });

  test('debounce will be called only once', done => {
    expect.assertions(1);

    const mockFunc = jest.fn((data) => {
      try {
        expect(data).toBe(1);
        done();
      } catch (error) {
        done(error);
      }
    });

    const { result } = renderHook(() => useDebounce(() => mockFunc(1), WAIT));

    [1, 2, 3].forEach(result.current);
  });
});