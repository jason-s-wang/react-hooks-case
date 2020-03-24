import { renderHook } from '@testing-library/react-hooks';
import { useDebounce } from '../src/hooks';


describe('useDebounce', () => {
  const WAIT = 1500;

  test('debounce is a function', () => {
    const mockFunc = jest.fn();
    const { result } = renderHook(() => useDebounce(mockFunc, WAIT));
    expect(typeof result.current).toBe('function');
  });

  test('debounce will be called only once', done => {
    let parm = 1;
    expect.assertions(1);

    const mockFunc = jest.fn((data) => {
      try {
        expect(data).toBe(parm);
        done();
      } catch (error) {
        done(error);
      }
    });

    const { result, rerender } = renderHook(() => useDebounce(() => mockFunc(parm), WAIT));

    [1, 2, 3].forEach(result.current);
    parm = 2;
    rerender();
    result.current();
  });
});