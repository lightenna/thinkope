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
    }

    getViewTree(query) {
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
    }

    compileViewTree(view) {
        const {type} = view;
        const subviews = (view.sub || []).map((subview, i) => this.compileViewTree(subview, i));
        const compiled_view = Object.assign({}, view, {
            sub: subviews
        });
        switch (type) {
            case 'container' :
                compiled_view['class_type'] = ContainerView;
                break;
            case 'editor' :
                compiled_view['class_type'] = DefaultEditor;
                break;
            case 'test' :
            default :
                compiled_view['class_type'] = TestEditor;
                break;
        }
        return compiled_view;
    }

    wrap(type, view) {
        return (
            <ViewErrorBoundary>
                <div className={`view type-${type}`}>
                    {view}
                </div>
            </ViewErrorBoundary>
        );
    }

    renderSpecialisedView(view, subviews, key) {
        const {type} = view;
        const rendered_view = React.createElement(view.class_type, {
            view: view,
            key: key,
            sub: subviews,
            ...this.props,
        }, null);
        // always wrap the view in a typed DOM element
        const wrapped_view = this.wrap(type, rendered_view);
        // attempt to lazy-load but fallback if not lazy loadable (see includes/React.lazy)
        return <GenericLazyLoad target={wrapped_view} detectIfLazy={view.class_type}/>;
    }

    renderViewRecursive(view, metadata, key) {
        const subviews = (view.sub || []).map((subview, i) => this.renderViewRecursive(subview, i));
        const view_with_metadata = Object.assign({}, view, this.props.metadata);
        return this.renderSpecialisedView(view_with_metadata, subviews, key);
    }

    render() {
        const query = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
        const top_level_view = this.compileViewTree(this.getViewTree(query));
        const rendered_views = this.renderViewRecursive(top_level_view, this.props.metadata, 0);
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
