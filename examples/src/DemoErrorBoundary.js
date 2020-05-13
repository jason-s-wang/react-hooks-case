import React, { useMemo, useState } from 'react';
import { useErrorBoundary } from '../../src/hooks';


const DemoErrorBoundary = () => {
  const boundaryConfig = useMemo(() => ({
    fallback: FallBack
  }), []);
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
  const { error } = props;

  return (
    <div>
      <div>
        <p>Oops! Page collapsed</p>
        <p>{error.message}</p>
      </div>
    </div>
  );
};

export default DemoErrorBoundary;