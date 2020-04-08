import React from 'react';
import { useStorage } from '../../src/hooks';

const DemoStorage = () => {
  const KEY = 'key';
  const INITIAL_VALUE = 'initial';
  const { value, setValue, removeValue } = useStorage(KEY, INITIAL_VALUE, {
    storage: 'sessionStorage'
  });

  const handleClickRemove = () => {
    removeValue();
  };

  return (
    <div>
      <h4>sessionStorage</h4>
      <div>
        <input type="text" value={value || ''} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div>
        <p>Memory Value: {value}</p>
        <p>Stored Value: {JSON.parse(sessionStorage.getItem(KEY))}</p>
      </div>
      <div>
        <button onClick={handleClickRemove}>remove</button>
      </div>
    </div>
  )
};

export default DemoStorage;