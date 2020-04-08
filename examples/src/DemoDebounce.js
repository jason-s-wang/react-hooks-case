import React, { useState } from 'react';
import { useDebounce } from '../../src/hooks';

const DemoDebounce = () => {
  const [value, setValue] = useState('');
  const [delayedValue, setDelayedValue] = useState('');
  const debounce = useDebounce((nextValue) => {
    setDelayedValue(nextValue);
  }, 1000);

  const handleChange = (e) => {
    setValue(e.target.value);
    debounce(e.target.value);
  };

  return (
    <div>
      <h4>debounce</h4>
      <div>
        <input type="text" value={value} onChange={handleChange} />
      </div>
      <div>
        <p>Value: {value}</p>
        <p>Debounced Value: {delayedValue}</p>
      </div>
    </div>
  );
}

export default DemoDebounce;