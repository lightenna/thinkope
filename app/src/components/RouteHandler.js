import React from 'react'
import DataWrapper from "./DataWrapper";
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import DataLoadErrorBoundary from "./boundaries/DataLoadErrorBoundary";

class RouteHandler extends React.Component {
    render() {
        // set up DataWrapper inside error boundary to catch thrown errors
        // console.log('ping');
        return (
            <DataLoadErrorBoundary>
                <DataWrapper {...this.props}/>
            </DataLoadErrorBoundary>
        );
    }

    static get propTypes() {
        return {
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired
        };
    }
}

export default withRouter(RouteHandler);
