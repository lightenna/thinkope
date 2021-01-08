import React from 'react'
import GenericErrorBoundary from "./GenericErrorBoundary";

class LazyLoadErrorBoundary extends GenericErrorBoundary {
    render() {
        if (this.state.hasError) {
            return <h1 className="error">Something went wrong while trying to load this component.</h1>;
        }
        return this.props.children;
    }
}

export default LazyLoadErrorBoundary;