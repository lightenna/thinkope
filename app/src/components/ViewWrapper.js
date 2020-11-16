import React from 'react';
import { withRouter } from "react-router";
import qs from 'qs';
import GenericLazyLoad from './GenericLazyLoad';
// directly loaded views
import GenericView from './views/GenericView';
import ContainerView from './views/ContainerView';
import PropTypes from "prop-types";
// lazy-loaded views
const EditorView = React.lazy(() => import('./views/EditorView'));

const default_datasource = 'local';
const default_view = {
    type: 'generic',
};

class ViewWrapper extends React.Component {

    isString(str) {
        return (typeof str === "string");
    };

    isJSONString(str) {
        return (str.indexOf('"') !== -1);
    };

    getView(query) {
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

    render_specialised_view(type, view, key, datasource, path, subviews) {
        switch (type) {
            case 'container' :
                const container_view = <ContainerView view={view} key={key} datasource={datasource} path={path} sub={subviews} />;
                return <GenericLazyLoad target={container_view} detectIfLazy={ContainerView}/>;
            case 'editor' :
                const editor_view = <EditorView view={view} key={key} datasource={datasource} path={path} sub={subviews} />;
                return <GenericLazyLoad target={editor_view} detectIfLazy={EditorView}/>;
            case 'generic' :
            default :
                return <GenericView view={view} key={key} datasource={datasource} path={path} sub={subviews} />;
        }
    };

    render_view(view, key, datasource, path) {
        const subviews = (view.sub || []).map((subview, i) => this.render_view(subview, i, datasource, path));
        const type = view.type || 'editor';
        return this.render_specialised_view(type, ...arguments, subviews);
    };

    render() {
        const params = this.props.match.params;
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        // derived
        const view = this.getView(query);
        const datasource = params.datasource || default_datasource;
        const path = '/' + (params.path || "");
        return this.render_view(view, 0, datasource, path);
    }
}

export default withRouter(ViewWrapper);
