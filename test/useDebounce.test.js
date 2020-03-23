import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../src/hooks';


describe('useDebounce', () => {
  const WAIT = 500;
  const mockFunc = jest.fn();
  mockFunc.mockReturnValue(1);

  test('debounce is a function', () => {
    const { result } = renderHook(() => useDebounce(mockFunc, WAIT));
    expect(typeof result.current).toBe('function');
  });
});