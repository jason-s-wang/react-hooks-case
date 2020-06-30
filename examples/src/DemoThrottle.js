import React, { useState } from 'react';
import { useThrottle } from '../../src/hooks';


const DemoThrottle = () => {
  const [count, setCount] = useState(0);
  const throttle = useThrottle((nextValue) => {
    setCount(nextValue);
  }, 1000);

  const handleChange = () => {
    throttle(pre => pre + 1);
  };

  return (
    <div>
      <h4>throttle</h4>
      <div>
        <button onClick={handleChange}>Add Count</button>
      </div>
      <div>
        <p>Count: {count}</p>
        <p>Increment will take effect only one time per second</p>
      </div>
    </div>
  );
}

export default DemoThrottle;