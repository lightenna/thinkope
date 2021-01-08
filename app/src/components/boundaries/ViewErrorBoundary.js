import React from 'react'
import GenericErrorBoundary from "./GenericErrorBoundary";

class ViewErrorBoundary extends GenericErrorBoundary {
    render() {
        if (this.state.hasError) {
            return <h1 className="error">Something went wrong while trying to create this view.</h1>;
        }
        return this.props.children;
    }
}

export default ViewErrorBoundary;