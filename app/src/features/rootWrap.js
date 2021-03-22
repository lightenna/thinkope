import React, {Component} from 'react';
import {connect} from "react-redux";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";
import {update, update as editorState_update} from "./draft-js/editorStateSlice";
import {update as value_update} from "./prosemirror/valueSlice";

const rootWrap = (WrappedComponent) => {
    class InnerRootWrapper extends Component {
        render() {
            // create editor states if not passed in props, in order to make this component unit testable
            const editorState = this.props.editorState || EditorState.createEmpty();
            const value = this.props.value || '';
            return <WrappedComponent editorState={editorState} value={value} {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        // create an editorState object based on 'raw' object persisted in redux store
        return {
            editorState: EditorState.createWithContent(convertFromRaw(state.draftjs_editorstate_reducer.jlob)),
            value: state.prosemi_value_reducer.value
        };
    };

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            updateEditorState: (editorState) => {
                console.log('dispatching editorState');
                const contentState = editorState.getCurrentContent();
                dispatch(editorState_update(convertToRaw(contentState)));
                const value = contentState.getPlainText();
                console.log('value', value);
                dispatch(value_update(value));
            },
            updateValue: (value) => {
                console.log('dispatching value');
                dispatch(value_update(value));
                const editorState = EditorState.createWithText(value);
                const contentState = editorState.getCurrentContent();
                dispatch(editorState_update(convertToRaw(contentState)));
            },
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(InnerRootWrapper);
};

export default rootWrap;