import React, {
  useEffect,
  useMemo,
  useCallback
} from "react";


/**
 * Return configured error bundary 
 * @param {Object} config
 * @param {Object} config.errorBoundary - custom error boundary
 * @param {Object} config.fallback - fallback component when error happened
 * @param {Object} config.error - extra error to track
 * @param {Function} config.reset - reset error extra error
 * @param {any} config.snapshot - used to reset errorBoundray if changed
 */
export const useErrorBoundary = (config = {}) => {
  const { errorBoundary, fallback, error, reset, snapshot } = config;

  const CustomErrorBoundary = useMemo(() =>
    errorBoundary || DefaultErrorBoundary,
    [errorBoundary]
  );

  const ErrorBoundary = useCallback(props => (
    <CustomErrorBoundary
      fallback={fallback}
      reset={reset}
      snapshot={snapshot}
      {...props}
    >
      {error ? null : props.children}
      <ErrorEmitter
        error={error}
      />
    </CustomErrorBoundary>
  ), [error, fallback, reset, snapshot]);

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
      return <this.props.fallback error={this.state.error} {...this.props} />;
    }

    return this.props.children;
  }
}

/*********************************************************************************************/

function ErrorEmitter(props) {
  const { error } = props;

  // Emit error
  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return null;
}