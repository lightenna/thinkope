import React from 'react';
import View from './View';
import {useParams} from "react-router-dom";
import qs from 'qs';

const default_datasource = 'local';
const default_view = {
    type: 'editor',
};

function isString(str) {
    return (typeof str === "string");
}

function isJSONString(str) {
    return (str.indexOf('"') !== -1);
}

function getView(query) {
    if (query.view) {
        if (isString(query.view)) {
            if (isJSONString(query.view)) {
                // parse view and use to override defaults
                return Object.assign({}, JSON.parse(query.view));
            } else {
                // return default view with type overridden
                return Object.assign({}, default_view, {type: query.view});
            }
        }
    }
    return default_view;
}

function ViewWrapper() {
    const params = useParams();
    const query = qs.parse(window.location.search, {ignoreQueryPrefix: true});
    const datasource = params.datasource || default_datasource;
    const view = getView(query);
    return (
        <View view={view} datasource={datasource} path={params.path}/>
    );
}

export default ViewWrapper;
