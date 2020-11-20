import React from 'react';
import PropTypes from 'prop-types';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';

class EditorView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.setDomEditorRef = ref => this.domEditor = ref;
        this.focus = () => this.domEditor.focus();
    }

    componentDidMount(){
        this.domEditor.focus();
    }

    onChange(editorState) {
        this.setState({editorState});
    }

    handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _onBoldClick() {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }

    render() {
        return (
            <div className={"view type-editor"}>
                <button onClick={this._onBoldClick.bind(this)}>Bold</button>
                <Editor
                    editorState={this.state.editorState}
                    placeholder={"Typing something, anything, make a list..."}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
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

export default EditorView;
