import React from 'react';
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import ViewWrapper from "./ViewWrapper";
import editorStateWrap from "../features/editor/editorStateWrap";

const default_datasource = 'local';

class DataWrapper extends React.Component {

    constructor(props) {
        super(props);
        // create metadata object for all views
        const params = props.match.params;
        const datasource = params.datasource || default_datasource;
        const path = '/' + (params.path || "");
        this.state = { metadata: {
            'path': path,
            'datasource': datasource
        }};
        // load data to store
        this.loadData(datasource, path);
    }

    loadData(datasource, path) {
        // @todo replace stub with proper load operation
        const text = "one\ntwo\nthree\nfour five six";
        this.props.updateEditorRawText(text);
    }

    render() {
        return <ViewWrapper location={this.props.location} metadata={this.state.metadata} {...this.props} />;
    }

    static get propTypes() {
        return {
            match: PropTypes.object.isRequired,
            location: PropTypes.object.isRequired
        };
    }
}

// editorStateWrap to dispatch actions to store, withRouter to receive match and location props
export default withRouter(editorStateWrap(DataWrapper));
