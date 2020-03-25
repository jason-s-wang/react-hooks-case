# react-hooks-case
![version](https://img.shields.io/npm/v/react-hooks-case?style=flat-square)
![size](https://img.shields.io/bundlephobia/min/react-hooks-case?style=flat-square)
![minzippedsize](https://img.shields.io/bundlephobia/minzip/react-hooks-case?style=flat-square)

## Installation
`$ npm install --save react-hooks-case`

## Hooks Reference
- useLocalStorage(key, initialValue)
- useSessionStorage(key, initialValue)
- useStoredReducer(key, reducer, initialState, config)

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
        storage: 'localStorage' // default is sessionStorage
      };

/**
 * Use reducer and save state in storage
 * State could be initialState or storage state if exists
 */
const [state, dispatch] = useStoredReducer(
    'state ',     // key in storage
    reducer,      // your reducer
    initialState, // your initial state
    config
  );

dispatch(myAction()); // Both state and storage item will be updated
```