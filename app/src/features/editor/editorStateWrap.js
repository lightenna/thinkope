import React, {Component} from 'react';
import {connect} from "react-redux";
import {EditorState, convertToRaw, convertFromRaw} from "draft-js";
import {update} from "./editorStateSlice";

const editorStateWrap = (WrappedComponent) => {
    class InnerEditorWrapper extends Component {
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    const mapStateToProps = (state) => {
        // create an editorState object based on 'raw' object persisted in redux store
        const raw_object = state.editored.jlob;
        return {
            editorState: EditorState.createWithContent(convertFromRaw(raw_object))
        };
        // const editorState = EditorState.createEmpty();
        // return { editorState };
    };

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            updateEditorState: (editorState) => {
                const contentState = editorState.getCurrentContent();
                return dispatch(update(convertToRaw(contentState)));
            },
            reload: () => dispatch({ type: 'RELOAD' })
        }
    };

    return connect(mapStateToProps, mapDispatchToProps)(InnerEditorWrapper);
};

export default editorStateWrap;