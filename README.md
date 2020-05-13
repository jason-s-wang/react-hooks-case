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

### useErrorBoundary
```javascript
import { useErrorBoundary } from 'react-hooks-case';

const [error, setError] = useState(null);

const boundaryConfig = useMemo(() => ({
  fallback: FallBack, // Fallback component when error happened, accept error and reset
  errorBoundary: MyErrorBoundary,  // If not defined, a default boundary will be offered
  error,  // Extra error to track, should use reset to clear state
  reset: () => setError(null) // Used to clear extra error in fallback
}), []);

// If no config passed, errorBoundary will be returned as well
const ErrorBoundary = useErrorBoundary(boundaryConfig);

return (
  // Props will be passed down to fallback component by default boundary
  // fallback can be defined here as well
  <ErrorBoundary /*fallback={FallBack}*/ >
    <YourPage />
  </ErrorBoundary>
);
```