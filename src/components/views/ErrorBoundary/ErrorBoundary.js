import React from 'react';
import NotFound from '../NotFound/NotFound';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError() {
    // process the error
    return { hasErrored: true };
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <NotFound />
      );
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any,
};

export default ErrorBoundary;
