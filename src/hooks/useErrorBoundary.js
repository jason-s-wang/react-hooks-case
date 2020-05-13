import React, {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";


/**
 * Return configured error bundary 
 * @param {Object} config
 * @param {Object} config.errorBoundary - custom error boundary
 * @param {Object} config.fallback - fallback component when error happened
 * @param {Object} config.error - error object
 * @param {Function} config.reset - reset error
 */
export const useErrorBoundary = (config = {}) => {
  const { errorBoundary, fallback, error, reset } = config;

  const CustomErrorBoundary = useMemo(() =>
    errorBoundary || DefaultErrorBoundary,
    [errorBoundary]
  );

  const ErrorBoundary = useCallback(props => (
    <CustomErrorBoundary
      fallback={fallback}
      reset={reset}
      {...props}
    >
      {error ? null : props.children}
      <ErrorEmitter
        error={error}
      />
    </CustomErrorBoundary>
  ), [error, fallback, reset]);

  return ErrorBoundary;
};

/*********************************************************************************************/

class DefaultErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.props.fallback) {
      return <this.props.fallback error={this.state.error} onReset={this.props.reset} />;
    }

    return this.props.children;
  }
}

/*********************************************************************************************/

function ErrorEmitter(props) {
  const { error } = props;
  const [curError, setCurError] = useState(error);

  // New error come
  useEffect(() => {
    error && setCurError(error);
  }, [error]);

  // Emit error
  useEffect(() => {
    if (curError) {
      throw new Error(curError);
    }
  }, [curError]);

  return null;
}