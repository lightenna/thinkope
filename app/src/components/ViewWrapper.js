import React from 'react';
import qs from 'qs';
import GenericLazyLoad from './GenericLazyLoad';
import PropTypes from "prop-types";
// directly loaded views
import TestEditor from '../features/editor/components/TestEditor';
import ContainerView from './views/ContainerView';
import ViewErrorBoundary from "./boundaries/ViewErrorBoundary";
// lazy-loaded views
const DefaultEditor = React.lazy(() => import('../features/editor/components/DefaultEditor'));

const default_view = {
    type: 'editor',
};

class ViewWrapper extends React.Component {

    isString(str) {
        return (typeof str === "string");
    };

    isJSONString(str) {
        return (str.indexOf('"') !== -1);
    };

    getView(query) {
        const view = Object.assign({}, default_view);
        if (query.view) {
            if (this.isString(query.view)) {
                if (this.isJSONString(query.view)) {
                    // parse view and use to override defaults
                    Object.assign(view, JSON.parse(query.view));
                } else {
                    // return default view with type overridden
                    Object.assign(view, default_view, {type: query.view});
                }
            }
        }
        return view;
    };

    wrap(type, view) {
        return (
            <ViewErrorBoundary>
                <div className={`view type-${type}`}>
                    {view}
                </div>
            </ViewErrorBoundary>
        );
    };

    render_specialised_view(view, subviews, key) {
        const {type} = view;
        // use type to instantiate correct view type
        switch (type) {
            case 'container' :
                const container_view = <ContainerView view={view} key={key} sub={subviews}/>;
                return <GenericLazyLoad target={container_view} detectIfLazy={ContainerView}/>;
            case 'editor' :
                const editor_view = this.wrap(type, <DefaultEditor view={view} key={key} {...this.props}/>);
                return <GenericLazyLoad target={editor_view} detectIfLazy={DefaultEditor}/>;
            case 'test' :
            default :
                return this.wrap(type, <TestEditor view={view} key={key} {...this.props}/>);
        }
    };

    render_view_recursive(view, metadata, key) {
        const subviews = (view.sub || []).map((subview, i) => this.render_view_recursive(subview, i));
        const view_with_metadata = Object.assign({}, view, this.props.metadata);
        return this.render_specialised_view(view_with_metadata, subviews, key);
    };

    render() {
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        const view = this.getView(query);
        const rendered_views = this.render_view_recursive(view, this.props.metadata, 0);
        return (
            <div id="view-wrapper">
                {rendered_views}
            </div>
        )
    }

    static get propTypes() {
        return {
            location: PropTypes.object.isRequired,
            metadata: PropTypes.object.isRequired,
            editorState: PropTypes.object.isRequired,
        };
    }
}

export default ViewWrapper;
