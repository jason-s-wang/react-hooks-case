import React, { useMemo, useState } from 'react';
import { useErrorBoundary } from '../../src/hooks';


const DemoErrorBoundary = () => {
  const [snapshot, setSnapshot] = useState(0);

  const boundaryConfig = useMemo(() => ({
    fallback: FallBack,
    snapshot,
    reset: () => setSnapshot(pre => pre + 1)
  }), [snapshot]);
  const ErrorBoundary = useErrorBoundary(boundaryConfig);

  return (
    <ErrorBoundary>
      <DemoPage />
    </ErrorBoundary>
  );
};

const DemoPage = () => {
  const [error, setError] = useState(null);

  const handleClickTrigger = () => {
    setError('Triggered error');
  };

  if (error) {
    throw new Error(error);
  } else {
    return (
      <div>
        <h4>errorBoundary</h4>
        <div>
          <p>Page worked fine now</p>
        </div>
        <div>
          <button onClick={handleClickTrigger}>Trigger Error</button>
        </div>
      </div>
    );
  }
};

const FallBack = props => {
  const { error, reset } = props;

  return (
    <div>
      <div>
        <p>Oops! Page collapsed</p>
        <p>{error.message}</p>
      </div>
      <div>
        <button onClick={() => reset()}>Reset Error</button>
      </div>
    </div>
  );
};

export default DemoErrorBoundary;