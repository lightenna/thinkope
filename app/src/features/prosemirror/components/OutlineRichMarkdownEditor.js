import React, {Component} from 'react';
import PropTypes from "prop-types";
import Editor from "rich-markdown-editor";

class OutlineRickMarkdownEditor extends Component {

    constructor(props) {
        super(props);
        // bind local event handlers
        this.handleEditorChange = this.handleEditorChange.bind(this);
        // initialise state
        this.state = {
            // non-text state
        };
    }

    componentDidMount() {
    }

    handleEditorChange(value) {
        // call Redux action to update other views
        this.props.updateEditorRawText(value);
    }

    render() {
        return (
            <div className="orme-editor editor" onClick={this.focus}>
                <Editor
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
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

export default OutlineRickMarkdownEditor;
