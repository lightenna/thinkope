import React, {Component} from 'react';
import {connect} from "react-redux";
import {update, getEmptyState} from "./valueSlice";

const valueWrap = (WrappedComponent) => {
    class InnerEditorWrapper extends Component {
        render() {
            // create value if not passed in props, in order to make this component unit testable
            const value = this.props.value || getEmptyState();
            return <WrappedComponent editorState={value} {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        // create an object based on 'raw' object persisted in redux store
        return {
            value: state.prosemi_value_reducer.value
        };
    };

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            updateEditorRawText: (raw_text) => {
                return dispatch(update(raw_text));
            },
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(InnerEditorWrapper);
};

export default valueWrap;