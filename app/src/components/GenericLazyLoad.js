import React from 'react';
import LazyLoadErrorBoundary from './boundaries/LazyLoadErrorBoundary';

class GenericLazyLoad extends React.Component {

    render() {
        // respect off-switch, if set
        const parent_is_lazy = (typeof this.props.detectIfLazy === 'undefined') || (typeof this.props.detectIfLazy === 'object' && this.props.detectIfLazy.$$typeof !== 'undefined');
        if (parent_is_lazy === false) {
            return this.props.target;
        }
        // otherwise lazy-load
        return (
            <LazyLoadErrorBoundary>
                <React.Suspense fallback={<div>Loading...</div>}>
                    {this.props.target}
                </React.Suspense>
            </LazyLoadErrorBoundary>
        );
    }
}

export default GenericLazyLoad;