import React from 'react';
import { useStoredReducer } from '../../src/hooks';


const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        storedKey: state.storedKey + 1,
        noStoredKey: state.noStoredKey + 1
      };

    default:
      throw new Error('Unexpected action');
  }
};

const INITIAL_STATE = {
  storedKey: 0,
  noStoredKey: 0
};

const KEY = 'state';

const DemoReducer = () => {
  const [state, dispatch] = useStoredReducer(KEY, reducer, INITIAL_STATE, {
    keys: ['storedKey']
  });

  const handleClickIncrement = () => {
    dispatch({
      type: 'INCREMENT'
    });
  };

  return (
    <div>
      <h4>storedReducer</h4>
      <div>
        <p>storedKey Value: {state.storedKey}</p>
        <p>noStoredKey Value: {state.noStoredKey}</p>
        <p>Storage: {sessionStorage.getItem(KEY)}</p>
      </div>
      <div>
        <button onClick={handleClickIncrement}>Increment</button>
      </div>
    </div>
  );
};

export default DemoReducer;