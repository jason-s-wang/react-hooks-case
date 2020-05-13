import React, { useState } from 'react';
import { render } from 'react-dom';
import DemoStorage from './DemoStorage';
import DemoDebounce from './DemoDebounce';
import DemoReducer from './DemoReducer';
import DemoErrorBoundary from './DemoErrorBoundary';


const App = () => {
  const DEMO_TYPE = {
    STORAGE: 'storage',
    DEBOUNCE: 'debounce',
    REDUCER: 'reducer',
    ERROR_BOUNDARY: 'errorBoundary'
  };
  const [demo, setDemo] = useState(DEMO_TYPE.STORAGE);

  return (
    <div>
      <div>
        <label>Select a demo:</label>
        <select name="demo" value={demo} onChange={(e) => setDemo(e.target.value)}>
          <option value={DEMO_TYPE.STORAGE}>useStorage</option>
          <option value={DEMO_TYPE.REDUCER}>useStoredReducer</option>
          <option value={DEMO_TYPE.DEBOUNCE}>useDebounce</option>
          <option value={DEMO_TYPE.ERROR_BOUNDARY}>useErrorBoundary</option>
        </select>
      </div>
      <div>
        {demo === DEMO_TYPE.STORAGE && <DemoStorage />}
        {demo === DEMO_TYPE.REDUCER && <DemoReducer />}
        {demo === DEMO_TYPE.DEBOUNCE && <DemoDebounce />}
        {demo === DEMO_TYPE.ERROR_BOUNDARY && <DemoErrorBoundary />}
      </div>
    </div>
  )
};

render(<App />, document.getElementById("root"));