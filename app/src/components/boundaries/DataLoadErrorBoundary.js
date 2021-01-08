import React from 'react'
import GenericErrorBoundary from "./GenericErrorBoundary";

class DataLoadErrorBoundary extends GenericErrorBoundary {
    render() {
        if (this.state.hasError) {
            return <h1 className="error">Something went wrong while trying to load data for these views.</h1>;
        }
        return this.props.children;
    }
}

export default DataLoadErrorBoundary;