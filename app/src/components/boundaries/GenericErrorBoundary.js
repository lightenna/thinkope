import React from 'react'

class GenericErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // can also log the error to an error reporting service
        console.log(this.constructor.name, error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h1 className="error">Something went wrong generically.</h1>;
        }
        return this.props.children;
    }
}

export default GenericErrorBoundary;