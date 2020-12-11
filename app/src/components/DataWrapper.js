import React from 'react';
import {withRouter} from "react-router";
import PropTypes from "prop-types";
import ViewWrapper from "./ViewWrapper";
import editorStateWrap from "../features/editor/editorStateWrap";
import {find} from "../datasources/";
import qs from "qs";

const default_datasource = 'local';

class DataWrapper extends React.Component {

    constructor(props) {
        super(props);
        // create metadata object for all views
        const params = props.match.params;
        const datasource = params.datasource || default_datasource;
        const path = '/' + (params.path || "");
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        this.state = { metadata: {
            'path': path,
            'datasource': datasource,
            'query': query,
        }};
        // load data to store
        this.loadData();
    }

    loadData() {
        const locmd = this.state.metadata;
        const dsmetadata = find(locmd.datasource);
        if (dsmetadata) {
            const req_url = dsmetadata.getUrl(locmd.path, locmd.query);
            dsmetadata.getData(req_url)
                .then((data) => {
                    this.props.updateEditorRawText(data);
                })
                .catch((err) => {
                    // @todo throw bad data received exception
                });
        }
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
