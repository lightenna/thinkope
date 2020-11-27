import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import 'draft-js/dist/Draft.css';

const mapStateToProps = ({editorState}) => {
    return editorState;
};

const mapDispatchToProps = (dispatch) => ({
    onSaveEditorState: (editorState) => {
        console.log('UPDATE_EDITOR_STATE dispatched');
        const contentState = editorState.getCurrentContent();
        dispatch({
            type: 'UPDATE_EDITOR_STATE',
            // redux stores require serializable objects (!== editorState)
            // payload: convertToRaw(contentState),
            payload: contentState,
        })
    }
});

class EditorView extends React.Component {
    constructor(props) {
        super(props);
        this.setDomEditorRef = ref => this.domEditor = ref;
        this.focus = () => this.domEditor.focus();
    }

    componentDidMount() {
        this.domEditor.focus();
    }

    render() {
        console.log('pass in editorState:', this.props.editorState);
        return (
            <div className={"view type-editor"}>
                <Editor
                    editorState={this.props.editorState}
                    placeholder={"Typing something, anything, make a list..."}
                    onChange={this.props.onSaveEditorState}
                    ref={this.setDomEditorRef}
                />
            </div>
        );
    }

    static get propTypes() {
        return {
            data: PropTypes.object.isRequired,
            view: PropTypes.object.isRequired
        };
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorView);
