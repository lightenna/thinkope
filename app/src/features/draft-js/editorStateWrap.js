import React, {Component} from 'react';
import {connect} from "react-redux";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";
import {update} from "./editorStateSlice";

const editorStateWrap = (WrappedComponent) => {
    class InnerEditorWrapper extends Component {
        render() {
            // create editorState if not passed in props, in order to make this component unit testable
            const editorState = this.props.editorState || EditorState.createEmpty();
            return <WrappedComponent editorState={editorState} {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        // create an editorState object based on 'raw' object persisted in redux store
        const raw_object = state.draftjs_editorstate_reducer.jlob;
        return {
            editorState: EditorState.createWithContent(convertFromRaw(raw_object))
        };
    };

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            updateEditorState: (editorState) => {
                const contentState = editorState.getCurrentContent();
                return dispatch(update(convertToRaw(contentState)));
            },
            updateEditorRawText: (raw_text) => {
                const editorState = EditorState.createWithText(raw_text);
                const contentState = editorState.getCurrentContent();
                return dispatch(update(convertToRaw(contentState)));
            },
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(InnerEditorWrapper);
};

export default editorStateWrap;