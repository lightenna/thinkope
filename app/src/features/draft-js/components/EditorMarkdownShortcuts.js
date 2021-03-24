import React, {Component} from 'react';
import {EditorState} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import '../styles/editorView.css';
import PropTypes from "prop-types";
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';

class EditorMarkdownShortcuts extends Component {

    constructor(props) {
        super(props);
        // bind local event handlers
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.focus = this.focus.bind(this);
        // initialise state
        this.state = {
            // non-text state
            editorState: EditorState.createEmpty(),
            plugins: [createMarkdownShortcutsPlugin()]
        };
    }

    componentDidMount() {
        if (this.props.view.focus) {
            this.focus();
        }
    }

    focus() {
        this.editor.focus();
    }

    handleEditorChange(editorState) {
        // update local state to maintain non-text attributes (e.g. selection)
        this.setState({ editorState })
        // call Redux action to update other views
        this.props.updateEditorState(editorState);
    }

    render() {
        // combine text from props with non-text from state
        const combined_editor_state = EditorState.acceptSelection(this.props.editorState, this.state.editorState.getSelection());
        // const combined_editor_state = this.state.editorState;
        return (
            <div className="markdown-editor editor" onClick={this.focus}>
                <Editor
                    ref={(element) => { this.editor = element; }}
                    editorState={combined_editor_state}
                    onChange={this.handleEditorChange}
                    placeholder="write something..."
                    plugins={this.state.plugins}
                />
            </div>
        );
    }

    static get characteristics() {
        return {
            focusable: true
        };
    }

    static get propTypes() {
        return {
            view: PropTypes.object.isRequired,
            editorState: PropTypes.object.isRequired,
        };
    }
}

export default EditorMarkdownShortcuts;
