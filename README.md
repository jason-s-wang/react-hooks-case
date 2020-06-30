# react-hooks-case
![version](https://img.shields.io/npm/v/react-hooks-case?style=flat-square)
![size](https://img.shields.io/bundlephobia/min/react-hooks-case?style=flat-square)
![minzippedsize](https://img.shields.io/bundlephobia/minzip/react-hooks-case?style=flat-square)

This package includes some useful react hooks.

## Installation
`$ npm install --save react-hooks-case`

## Hooks Reference
- useLocalStorage(key, initialValue)
- useSessionStorage(key, initialValue)
- useStoredReducer(key, reducer, initialState, config)
- useDebounce(callback, delay)
- useThrottle(callback, duration)
- useErrorBoundary(config)

## Usage
### useLocalStorage
```javascript
import { useLocalStorage } from 'react-hooks-case'

const KEY = 'key';

/**
 * Use localStorage item
 * storedValue could be initialValue or storage value if exists
 */
const { value, setValue, removeValue } = useLocalStorage(KEY, 1);

setValue(2);    // set both value and storage item to 2
removeValue();  // remove value from localStorage and set value to null
```

### useStoredReducer
```javascript
import { useStoredReducer } from 'react-hooks-case'

const config = {
        storage: 'localStorage' // default is sessionStorage,
        keys: ['key1', 'key1']  // properties need to be stored. if keys is not specified, store all. 
      };

/**
 * Use reducer and save state in storage
 * State could be initialState or storage state if exists
 * Return combined state, if both storage and initial state exist and is object
 */
const [state, dispatch] = useStoredReducer(
    'state ',     // key in storage
    reducer,      // your reducer
    initialState, // your initial state
    config
  );

dispatch(myAction()); // Both state and storage item will be updated
```

### useDebounce
```javascript
import { useDebounce } from 'react-hooks-case'

const cb = (value) => console.log(value); // Set debounce callback function
const delay = 500;  // Set debounce delay

const debounce = useDebounce(cb, delay);

[1, 2, 3].forEach(debounce);  // Output 3 after 0.5s
```

### useThrottle
```javascript
import { useThrottle } from 'react-hooks-case'

const cb = v => v;
const duration = 500;  // Set throttle duration

const throttle = useThrottle(value => cb(value), duration);

console.log(throttle(1)); // cb is called and output 1
console.log(throttle(2)); // cb is not called and output null
```

### useErrorBoundary
```javascript
import { useErrorBoundary } from 'react-hooks-case';

const [error, setError] = useState(null);
const location = useLocation();

// Config and config props are optional
const boundaryConfig = useMemo(() => ({
  fallback: FallBack, // object; Fallback component when error happened
  errorBoundary: MyErrorBoundary,  // object; Customized error boundary, could be empty
  error,  // string; Extra error to track, should use reset to clear state
  reset: () => setError(null),  // function; Used to clear extra error in fallback
  snapshot: location.pathname   // any; Reset errorBoundary when snapshot changed
}), []);

// If no config passed, a default errorBoundary will be returned as well
const ErrorBoundary = useErrorBoundary(boundaryConfig); // or useErrorBoundary()

return (
  // Props will be passed down to fallback component by default boundary
  // fallback can be defined here as well
  <ErrorBoundary /*fallback={FallBack}*/ >
    <YourPage />
  </ErrorBoundary>
);
```