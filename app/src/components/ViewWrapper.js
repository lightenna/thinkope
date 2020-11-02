import React from 'react';
import View from './View';
import { withRouter } from "react-router";
import qs from 'qs';

const default_datasource = 'local';
const default_view = {
    type: 'editor',
};

class ViewWrapper extends React.Component {

    isString = (str) => {
        return (typeof str === "string");
    };

    isJSONString = (str) => {
        return (str.indexOf('"') !== -1);
    };

    getView = (query) => {
        if (query.view) {
            if (this.isString(query.view)) {
                if (this.isJSONString(query.view)) {
                    // parse view and use to override defaults
                    return Object.assign({}, JSON.parse(query.view));
                } else {
                    // return default view with type overridden
                    return Object.assign({}, default_view, {type: query.view});
                }
            }
        }
        return default_view;
    };

    render() {
        const params = this.props.match.params;
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        // derived
        const datasource = params.datasource || default_datasource;
        const view = this.getView(query);
        console.log(this.props);
        return (
            <View view={view} datasource={datasource} path={params.path}/>
        );
    }
}

export default withRouter(ViewWrapper);
